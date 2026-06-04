import { NextRequest, NextResponse } from 'next/server'
import { getAnthropic } from '@/lib/anthropic'
import { getSupabaseAdmin } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

const SYSTEM_PROMPT =
  "Tu es LUMIS, l'assistant IA français de la plateforme LUMIS.AI. Tu aides les entreprises françaises à être plus productives. Réponds toujours en français, de façon professionnelle mais accessible. Sois concis (max 200 mots). Si on te demande qui tu es, dis que tu es LUMIS, l'IA française souveraine. Ne mentionne jamais Claude ou Anthropic."

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
        // Fallback: fetch current count then update
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

    // Validate and normalise messages
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

    // Rate-limit check via Supabase
    const effectiveSessionId =
      sessionId && sessionId.trim().length > 0
        ? sessionId.trim()
        : `anon-${Date.now()}-${Math.random().toString(36).slice(2)}`

    const session = await getOrCreateSession(effectiveSessionId)

    if (session.message_count >= MESSAGE_LIMIT) {
      return NextResponse.json({ error: 'LIMIT_REACHED' }, { status: 429 })
    }

    // Build SSE stream
    const encoder = new TextEncoder()

    const { readable, writable } = new TransformStream()
    const writer = writable.getWriter()

    const writeSSE = async (event: string, data: unknown): Promise<void> => {
      const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`
      await writer.write(encoder.encode(payload))
    }

    // Stream Anthropic response in the background
    ;(async () => {
      try {
        const stream = getAnthropic().messages.stream({
          model: 'claude-opus-4-5-20251101',
          max_tokens: 800,
          system: SYSTEM_PROMPT,
          messages: validMessages,
        })

        for await (const event of stream) {
          if (
            event.type === 'content_block_delta' &&
            event.delta.type === 'text_delta'
          ) {
            await writeSSE('delta', { text: event.delta.text })
          }
        }

        await writeSSE('done', {})

        // Increment message count after successful streaming
        await incrementMessageCount(effectiveSessionId)
      } catch (streamError) {
        console.error('[chat/route] Anthropic stream error:', streamError)
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
