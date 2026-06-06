import { NextRequest, NextResponse } from 'next/server'
import { getGemini } from '@/lib/gemini'
import { getSupabaseAdmin } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

const SYSTEM_PROMPT =
  "Tu es l'assistant IA de la plateforme Cohesif IA. Tu aides les entreprises françaises à être plus productives. Réponds toujours en français, de façon professionnelle mais accessible. Sois concis (max 200 mots). Si on te demande qui tu es, dis que tu es l'assistant de Cohesif IA, la plateforme IA souveraine française."

const MESSAGE_LIMIT = 20

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface ChatRequest {
  messages: ChatMessage[]
  sessionId?: string
}

async function getOrCreateSession(
  sessionId: string
): Promise<{ message_count: number }> {
  const { data, error } = await getSupabaseAdmin()
    .from('chat_sessions')
    .select('message_count')
    .eq('session_id', sessionId)
    .single()

  if (error || !data) {
    const { data: newSession, error: insertError } = await getSupabaseAdmin()
      .from('chat_sessions')
      .insert({ session_id: sessionId, message_count: 0, created_at: new Date().toISOString() })
      .select('message_count')
      .single()

    if (insertError || !newSession) {
      return { message_count: 0 }
    }
    return newSession
  }

  return data
}

async function incrementMessageCount(sessionId: string): Promise<void> {
  await getSupabaseAdmin().rpc('increment_message_count', { p_session_id: sessionId }).then(
    async ({ error }) => {
      if (error) {
        const { data } = await getSupabaseAdmin()
          .from('chat_sessions')
          .select('message_count')
          .eq('session_id', sessionId)
          .single()

        const currentCount = data?.message_count ?? 0
        await getSupabaseAdmin()
          .from('chat_sessions')
          .update({ message_count: currentCount + 1 })
          .eq('session_id', sessionId)
      }
    }
  )
}

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const body: ChatRequest = await request.json()
    const { messages, sessionId } = body

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'INVALID_REQUEST', message: 'messages array is required' },
        { status: 400 }
      )
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
      return NextResponse.json(
        { error: 'INVALID_REQUEST', message: 'No valid messages provided' },
        { status: 400 }
      )
    }

    const effectiveSessionId =
      sessionId && sessionId.trim().length > 0
        ? sessionId.trim()
        : `anon-${Date.now()}-${Math.random().toString(36).slice(2)}`

    const session = await getOrCreateSession(effectiveSessionId)

    if (session.message_count >= MESSAGE_LIMIT) {
      return NextResponse.json({ error: 'LIMIT_REACHED' }, { status: 429 })
    }

    const encoder = new TextEncoder()
    const { readable, writable } = new TransformStream()
    const writer = writable.getWriter()

    const writeSSE = async (event: string, data: unknown): Promise<void> => {
      const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`
      await writer.write(encoder.encode(payload))
    }

    ;(async () => {
      try {
        const model = getGemini().getGenerativeModel({
          model: 'gemini-2.0-flash',
          systemInstruction: SYSTEM_PROMPT,
        })

        const history = validMessages.slice(0, -1).map((m) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }],
        }))

        const lastMessage = validMessages[validMessages.length - 1].content

        const chat = model.startChat({ history })
        const result = await chat.sendMessageStream(lastMessage)

        for await (const chunk of result.stream) {
          const text = chunk.text()
          if (text) {
            await writeSSE('delta', { text })
          }
        }

        await writeSSE('done', {})
        await incrementMessageCount(effectiveSessionId)
      } catch (streamError) {
        console.error('[chat/route] Gemini stream error:', streamError)
        try {
          await writeSSE('error', { message: 'Une erreur est survenue. Veuillez réessayer.' })
        } catch {
          // writer may already be closed
        }
      } finally {
        try {
          await writer.close()
        } catch {
          // already closed
        }
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
    return NextResponse.json(
      { error: 'INTERNAL_ERROR', message: 'Internal server error' },
      { status: 500 }
    )
  }
}
