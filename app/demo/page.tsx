'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'

type Role = 'user' | 'assistant'

interface Message {
  role: Role
  content: string
  id: string
}

const SUGGESTED_PROMPTS = [
  { icon: '✍️', label: 'Rédige un email commercial' },
  { icon: '📊', label: 'Analyse financière rapide' },
  { icon: '🚀', label: 'Stratégie marketing B2B' },
  { icon: '⚖️', label: 'Vérifier un contrat' },
]

const MAX_FREE = 20
const SOFT_UPSELL_AT = 5

function generateId() {
  return Math.random().toString(36).slice(2, 10)
}

function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return ''
  let id = localStorage.getItem('lumis_session_id')
  if (!id) {
    id = generateId() + generateId()
    localStorage.setItem('lumis_session_id', id)
  }
  return id
}

function getMessageCount(): number {
  if (typeof window === 'undefined') return 0
  return parseInt(localStorage.getItem('lumis_chat_count') || '0', 10)
}

function incrementMessageCount(): number {
  const next = getMessageCount() + 1
  localStorage.setItem('lumis_chat_count', String(next))
  return next
}

export default function DemoPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [messageCount, setMessageCount] = useState(0)
  const [sessionId] = useState(() => (typeof window !== 'undefined' ? getOrCreateSessionId() : ''))
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    setMessageCount(getMessageCount())
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const isHardBlocked = messageCount >= MAX_FREE

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading || isHardBlocked) return

    const userMsg: Message = { role: 'user', content: text.trim(), id: generateId() }
    const assistantId = generateId()

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsLoading(true)

    const newCount = incrementMessageCount()
    setMessageCount(newCount)

    const allMessages = [...messages, userMsg].map((m) => ({
      role: m.role,
      content: m.content,
    }))

    // Add empty assistant message placeholder
    setMessages((prev) => [
      ...prev,
      { role: 'assistant', content: '', id: assistantId },
    ])

    try {
      const controller = new AbortController()
      abortRef.current = controller

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: allMessages, sessionId }),
        signal: controller.signal,
      })

      if (!res.ok || !res.body) {
        throw new Error('Network error')
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()

      let buffer = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() ?? ''

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const chunk = line.slice(6)
            if (chunk === '[DONE]') break
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId ? { ...m, content: m.content + chunk } : m
              )
            )
          }
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== 'AbortError') {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  content:
                    'Désolé, une erreur est survenue. Veuillez réessayer.',
                }
              : m
          )
        )
      }
    } finally {
      setIsLoading(false)
      abortRef.current = null
      inputRef.current?.focus()
    }
  }, [messages, isLoading, isHardBlocked, sessionId])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  const showSoftUpsell = messageCount >= SOFT_UPSELL_AT && messageCount < MAX_FREE
  const remaining = Math.max(0, MAX_FREE - messageCount)

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      paddingTop: 'var(--nav)',
      background: 'var(--void)',
    }}>

      {/* ── HEADER ── */}
      <div style={{
        borderBottom: '1px solid rgba(255,255,255,.07)',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'var(--card)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'var(--yd)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '18px',
          }}>
            🤖
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '15px' }}>LUMIS Core</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--fog)' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
              En ligne · Démonstration gratuite
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{
            fontFamily: 'var(--fm)', fontSize: '12px', color: 'var(--fog)',
          }}>
            {messageCount} / {MAX_FREE} messages gratuits
          </span>
          <div style={{
            width: '80px', height: '4px', borderRadius: '100px',
            background: 'rgba(255,255,255,.1)', overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${(messageCount / MAX_FREE) * 100}%`,
              background: messageCount >= 16 ? '#ff3355' : messageCount >= 10 ? '#f59e0b' : 'var(--y)',
              borderRadius: '100px',
              transition: 'width .3s',
            }} />
          </div>
          <Link href="/tarifs" className="btn by bsm">
            Passer Pro →
          </Link>
        </div>
      </div>

      {/* ── CHAT AREA ── */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        maxWidth: '800px',
        margin: '0 auto',
        width: '100%',
      }}>

        {/* Welcome state */}
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0 40px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>✨</div>
            <h2 style={{
              fontFamily: 'var(--fh)', fontSize: '28px', fontWeight: 800,
              letterSpacing: '-.03em', marginBottom: '8px',
            }}>
              Bonjour, je suis LUMIS
            </h2>
            <p style={{ color: 'var(--fog)', fontSize: '15px', lineHeight: 1.7, marginBottom: '36px' }}>
              Votre assistant IA souverain français. Posez-moi n&apos;importe quelle question
              ou choisissez une suggestion ci-dessous.
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '10px',
              maxWidth: '480px',
              margin: '0 auto',
            }}>
              {SUGGESTED_PROMPTS.map((p) => (
                <button
                  key={p.label}
                  onClick={() => sendMessage(p.label)}
                  style={{
                    background: 'var(--card)',
                    border: '1px solid rgba(255,255,255,.07)',
                    borderRadius: '12px',
                    padding: '14px 16px',
                    color: 'var(--snow)',
                    fontFamily: 'var(--fh)',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all .2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(212,255,0,.25)'
                    e.currentTarget.style.background = 'rgba(212,255,0,.04)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,.07)'
                    e.currentTarget.style.background = 'var(--card)'
                  }}
                >
                  <span>{p.icon}</span>
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.map((msg, i) => (
          <div key={msg.id}>
            {/* Soft upsell banner after 5 messages */}
            {msg.role === 'assistant' && i > 0 && messageCount === SOFT_UPSELL_AT && i === messages.length - 1 && (
              <div style={{
                background: 'rgba(212,255,0,.06)',
                border: '1px solid rgba(212,255,0,.2)',
                borderRadius: '14px',
                padding: '16px 20px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                flexWrap: 'wrap',
              }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--y)', marginBottom: '4px' }}>
                    ⚡ Vous avez utilisé {SOFT_UPSELL_AT} messages gratuits
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--fog)' }}>
                    Il vous reste {MAX_FREE - SOFT_UPSELL_AT} messages. Passez Pro pour des conversations illimitées.
                  </div>
                </div>
                <Link href="/tarifs" className="btn by bsm">
                  Passer Pro — 29€/mois →
                </Link>
              </div>
            )}

            <div style={{
              display: 'flex',
              flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
              alignItems: 'flex-start',
              gap: '10px',
            }}>
              {/* Avatar */}
              <div style={{
                width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '14px',
                background: msg.role === 'user' ? 'var(--y)' : 'var(--card)',
                color: msg.role === 'user' ? '#000' : 'var(--snow)',
                border: msg.role === 'assistant' ? '1px solid rgba(255,255,255,.07)' : 'none',
              }}>
                {msg.role === 'user' ? '👤' : '🤖'}
              </div>

              {/* Bubble */}
              <div style={{
                maxWidth: '72%',
                background: msg.role === 'user' ? 'rgba(212,255,0,.1)' : 'var(--card)',
                border: `1px solid ${msg.role === 'user' ? 'rgba(212,255,0,.2)' : 'rgba(255,255,255,.07)'}`,
                borderRadius: msg.role === 'user' ? '18px 4px 18px 18px' : '4px 18px 18px 18px',
                padding: '12px 16px',
                fontSize: '15px',
                lineHeight: 1.7,
                color: 'var(--snow)',
                whiteSpace: 'pre-wrap',
              }}>
                {msg.content || (
                  isLoading && i === messages.length - 1 ? (
                    <span style={{ display: 'flex', gap: '4px', alignItems: 'center', height: '20px' }}>
                      {[0, 1, 2].map((n) => (
                        <span key={n} style={{
                          width: '6px', height: '6px', borderRadius: '50%',
                          background: 'var(--fog)',
                          animation: `bounce 1.2s ease-in-out ${n * 0.2}s infinite`,
                        }} />
                      ))}
                    </span>
                  ) : '…'
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Loading dots when waiting for first chunk */}
        {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '14px', background: 'var(--card)',
              border: '1px solid rgba(255,255,255,.07)',
            }}>
              🤖
            </div>
            <div style={{
              background: 'var(--card)',
              border: '1px solid rgba(255,255,255,.07)',
              borderRadius: '4px 18px 18px 18px',
              padding: '12px 16px',
              display: 'flex', gap: '4px', alignItems: 'center',
            }}>
              {[0, 1, 2].map((n) => (
                <span key={n} style={{
                  width: '6px', height: '6px', borderRadius: '50%',
                  background: 'var(--fog)',
                  display: 'inline-block',
                  animation: `bounce 1.2s ease-in-out ${n * 0.2}s infinite`,
                }} />
              ))}
            </div>
          </div>
        )}

        {/* Hard upsell */}
        {isHardBlocked && (
          <div style={{
            background: 'var(--card)',
            border: '1px solid rgba(212,255,0,.3)',
            borderRadius: '18px',
            padding: '32px',
            textAlign: 'center',
            margin: '16px 0',
          }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>⚡</div>
            <h3 style={{
              fontFamily: 'var(--fh)', fontSize: '22px', fontWeight: 800,
              letterSpacing: '-.03em', marginBottom: '8px',
            }}>
              Vous avez atteint la limite gratuite
            </h3>
            <p style={{ color: 'var(--fog)', fontSize: '14px', lineHeight: 1.7, marginBottom: '24px' }}>
              Passez au plan Pro pour des conversations illimitées, des agents personnalisés
              et l&apos;accès à LUMIS Ultra — le modèle le plus avancé de France.
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/tarifs" className="btn by blg">
                Passer Pro — 29€/mois →
              </Link>
              <Link href="/tarifs" className="btn bg">
                Voir tous les plans
              </Link>
            </div>
            <p style={{ marginTop: '16px', fontSize: '12px', color: 'var(--fog)' }}>
              14 jours gratuits · Sans carte bancaire · Annulation en 1 clic
            </p>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ── INPUT AREA ── */}
      {!isHardBlocked && (
        <div style={{
          borderTop: '1px solid rgba(255,255,255,.07)',
          padding: '16px 24px',
          background: 'var(--card)',
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            display: 'flex',
            gap: '10px',
            alignItems: 'flex-end',
          }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Posez votre question… (Entrée pour envoyer, Shift+Entrée pour une nouvelle ligne)"
              rows={1}
              disabled={isLoading || isHardBlocked}
              style={{
                flex: 1,
                background: 'rgba(255,255,255,.04)',
                border: '1px solid rgba(255,255,255,.1)',
                borderRadius: '12px',
                padding: '12px 16px',
                color: 'var(--snow)',
                fontFamily: 'var(--fh)',
                fontSize: '15px',
                resize: 'none',
                minHeight: '48px',
                maxHeight: '160px',
                overflowY: 'auto',
                outline: 'none',
                transition: 'border-color .2s',
              }}
              onFocus={(e) => { e.target.style.borderColor = 'rgba(212,255,0,.35)' }}
              onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,.1)' }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isLoading || isHardBlocked}
              style={{
                width: '48px', height: '48px', borderRadius: '12px',
                background: input.trim() && !isLoading ? 'var(--y)' : 'rgba(255,255,255,.06)',
                border: 'none', cursor: input.trim() ? 'pointer' : 'default',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '20px', flexShrink: 0,
                transition: 'all .2s',
                color: '#000',
              }}
            >
              ↑
            </button>
          </div>
          <p style={{
            textAlign: 'center', marginTop: '8px', fontSize: '11px',
            color: 'var(--mist)', maxWidth: '800px', margin: '8px auto 0',
          }}>
            LUMIS peut faire des erreurs. Vérifiez les informations importantes.
            Hébergé en France · RGPD natif
          </p>
        </div>
      )}

      {/* ── UPSELL BELOW CHAT ── */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,.07)',
        padding: '32px 24px',
        background: 'var(--deep)',
      }}>
        <div style={{
          maxWidth: '800px', margin: '0 auto',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px', flexWrap: 'wrap',
        }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: '18px', marginBottom: '6px', letterSpacing: '-.02em' }}>
              Prêt à aller plus loin ?
            </div>
            <div style={{ fontSize: '14px', color: 'var(--fog)', lineHeight: 1.6 }}>
              Messages illimités · LUMIS Ultra · Agents personnalisés · API access
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <Link href="/tarifs" className="btn by">
              Passer Pro — dès 29€/mois →
            </Link>
            <Link href="/roi" className="btn bg">
              Calculer mon ROI
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: .4; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
