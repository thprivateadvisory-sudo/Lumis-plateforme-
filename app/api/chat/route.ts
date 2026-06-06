import { NextRequest, NextResponse } from 'next/server'
import { getAgentBySlug } from '@/lib/agents-config'
import { getSupabase } from '@/lib/supabase'
import { getCountStatus, incrementCount } from '@/lib/message-counter'
import { getUserPlan, type PlanType } from '@/lib/subscription'

export const dynamic = 'force-dynamic'

const DEFAULT_SYSTEM_PROMPT =
  "Tu es l'assistant IA de la plateforme Cohesif IA. Tu aides les entreprises françaises à être plus productives. Réponds toujours en français, de façon professionnelle mais accessible. Sois concis (max 200 mots). Si on te demande qui tu es, dis que tu es l'assistant de Cohesif IA, la plateforme IA souveraine française."

const ANON_LIMIT = 20

// ── Modèles par plan ──────────────────────────────────────────────────────────
const MODEL_CONFIG: Record<PlanType | 'anon', { model: string; maxTokens: number; label: string }> = {
  anon:     { model: 'llama-3.1-8b-instant',    maxTokens: 600,  label: 'Cohesif Core' },
  free:     { model: 'llama-3.1-8b-instant',    maxTokens: 600,  label: 'Cohesif Core' },
  pro:      { model: 'llama-3.3-70b-versatile', maxTokens: 2000, label: 'Cohesif Ultra' },
  business: { model: 'llama-3.3-70b-versatile', maxTokens: 4000, label: 'Cohesif Ultra' },
}

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface ChatRequest {
  messages: ChatMessage[]
  sessionId?: string
  agentSlug?: string
  anonCount?: number
}

async function resolveUser(authHeader: string | null) {
  if (!authHeader?.startsWith('Bearer ')) return null
  const token = authHeader.slice(7)
  const { data: { user }, error } = await getSupabase().auth.getUser(token)
  if (error || !user) return null
  return user
}

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const body: ChatRequest = await request.json()
    const { messages, agentSlug, anonCount = 0 } = body

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'INVALID_REQUEST' }, { status: 400 })
    }

    const validMessages: ChatMessage[] = messages
      .filter(
        (m) =>
          m &&
          typeof m === 'object' &&
          (m.role === 'user' || m.role === 'assistant') &&
          typeof m.content === 'string' &&
          m.content.trim().length > 0
      )
      .map((m) => ({ role: m.role, content: m.content.trim() }))

    if (validMessages.length === 0) {
      return NextResponse.json({ error: 'INVALID_REQUEST' }, { status: 400 })
    }

    // ── Auth + plan + limit check ─────────────────────────────────────────────
    const authHeader = request.headers.get('Authorization')
    const user = await resolveUser(authHeader)

    let planKey: PlanType | 'anon' = 'anon'

    if (user) {
      const [plan, countStatus] = await Promise.all([
        getUserPlan(user.email!),
        getCountStatus(user.id, user.email!, agentSlug || 'demo'),
      ])
      planKey = plan

      if (countStatus.blocked) {
        return NextResponse.json({ error: 'LIMIT_REACHED' }, { status: 429 })
      }
      incrementCount(user.id, user.email!, agentSlug || 'demo').catch(console.error)
    } else {
      if (anonCount >= ANON_LIMIT) {
        return NextResponse.json({ error: 'LIMIT_REACHED' }, { status: 429 })
      }
    }

    const { model, maxTokens, label } = MODEL_CONFIG[planKey]
    const agent = agentSlug ? getAgentBySlug(agentSlug) : undefined
    const systemPrompt = agent?.systemPrompt ?? DEFAULT_SYSTEM_PROMPT

    // ── Streaming response ────────────────────────────────────────────────────
    const encoder = new TextEncoder()
    const { readable, writable } = new TransformStream()
    const writer = writable.getWriter()

    const writeSSE = async (event: string, data: unknown): Promise<void> => {
      await writer.write(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`))
    }

    ;(async () => {
      try {
        // Envoie le nom du modèle en premier pour l'afficher dans le UI
        await writeSSE('model', { label })

        const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model,
            messages: [
              { role: 'system', content: systemPrompt },
              ...validMessages,
            ],
            stream: true,
            max_tokens: maxTokens,
          }),
        })

        if (!groqRes.ok || !groqRes.body) {
          const errText = await groqRes.text()
          throw new Error(`Groq ${groqRes.status}: ${errText.slice(0, 200)}`)
        }

        const reader = groqRes.body.getReader()
        const decoder = new TextDecoder()
        let buffer = ''

        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          buffer = lines.pop() ?? ''
          for (const line of lines) {
            if (!line.startsWith('data: ')) continue
            const raw = line.slice(6).trim()
            if (!raw || raw === '[DONE]') continue
            try {
              const chunk = JSON.parse(raw)
              const text = chunk.choices?.[0]?.delta?.content
              if (text) await writeSSE('delta', { text })
            } catch {
              // ignore non-JSON chunk
            }
          }
        }

        await writeSSE('done', {})
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err)
        console.error('[chat/route] error:', msg)
        try {
          await writeSSE('error', { message: 'Une erreur est survenue. Veuillez réessayer.' })
        } catch { /* stream closed */ }
      } finally {
        try { await writer.close() } catch { /* already closed */ }
      }
    })()

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
        'X-Accel-Buffering': 'no',
      },
    })
  } catch (error) {
    console.error('[chat/route] Unexpected error:', error)
    return NextResponse.json({ error: 'INTERNAL_ERROR' }, { status: 500 })
  }
}
