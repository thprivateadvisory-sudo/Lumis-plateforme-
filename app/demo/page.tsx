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
  { icon: '✍️', label: 'Rédige un email commercial percutant' },
  { icon: '📊', label: 'Analyse financière de mes données' },
  { icon: '🚀', label: 'Stratégie marketing B2B pour ma startup' },
  { icon: '⚖️', label: 'Résume et vérifie ce contrat' },
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

const LumisAvatar = () => (
  <div style={{
    width: 32, height: 32, borderRadius: 9, background: 'var(--y)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  }}>
    <svg width="15" height="15" viewBox="0 0 34 34" fill="none">
      <path d="M9 25V9h4v13h8v3H9z" fill="#000" />
      <circle cx="25" cy="11" r="3" fill="#000" />
    </svg>
  </div>
)

const UserAvatar = () => (
  <div style={{
    width: 32, height: 32, borderRadius: 9, background: 'var(--raise)',
    border: '1px solid var(--w2)', display: 'flex', alignItems: 'center',
    justifyContent: 'center', flexShrink: 0,
  }}>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--fog)" strokeWidth="2" strokeLinecap="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  </div>
)

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

    setMessages((prev) => [...prev, { role: 'assistant', content: '', id: assistantId }])

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
            const raw = line.slice(6).trim()
            if (!raw || raw === '{}') continue
            try {
              const parsed = JSON.parse(raw)
              if (parsed.text) {
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantId ? { ...m, content: m.content + parsed.text } : m
                  )
                )
              } else if (parsed.message) {
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantId ? { ...m, content: parsed.message } : m
                  )
                )
              }
            } catch {
              // non-JSON chunk, ignore
            }
          }
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== 'AbortError') {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? { ...m, content: 'Désolé, une erreur est survenue. Veuillez réessayer.' }
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
  const progressColor = messageCount >= 16 ? '#ff3355' : messageCount >= 10 ? '#f59e0b' : 'var(--y)'

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', minHeight: '100vh',
      paddingTop: 'var(--nav)', background: 'var(--void)',
    }}>

      {/* ── HEADER ── */}
      <div style={{
        borderBottom: '1px solid var(--w1)',
        padding: '14px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'var(--panel)',
        gap: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
          <LumisAvatar />
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--snow)', letterSpacing: '-.01em' }}>
              Cohesif Core
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--fog)' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block', flexShrink: 0 }} />
              En ligne · Démonstration gratuite
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: 'var(--fm)', fontSize: 11, color: 'var(--fog)', whiteSpace: 'nowrap' }}>
              {remaining} messages restants
            </span>
            <div style={{ width: 72, height: 3, borderRadius: 100, background: 'var(--w1)', overflow: 'hidden', flexShrink: 0 }}>
              <div style={{
                height: '100%',
                width: `${(messageCount / MAX_FREE) * 100}%`,
                background: progressColor,
                borderRadius: 100,
                transition: 'width .3s',
              }} />
            </div>
          </div>
          <Link href="/tarifs" className="btn by bsm">Passer Pro →</Link>
        </div>
      </div>

      {/* ── CHAT AREA ── */}
      <div style={{
        flex: 1, overflowY: 'auto', padding: '24px',
        display: 'flex', flexDirection: 'column', gap: 20,
        maxWidth: 780, margin: '0 auto', width: '100%',
      }}>

        {/* Welcome state */}
        {messages.length === 0 && (
          <div style={{ padding: '48px 0 32px' }}>
            <div style={{ marginBottom: 20 }}>
              <LumisAvatar />
            </div>
            <h2 style={{
              fontFamily: 'var(--fh)', fontSize: 22, fontWeight: 800,
              letterSpacing: '-.03em', marginBottom: 8, color: 'var(--snow)',
            }}>
              Bonjour. Comment puis-je vous aider ?
            </h2>
            <p style={{ color: 'var(--fog)', fontSize: 14, lineHeight: 1.7, marginBottom: 32, maxWidth: 460 }}>
              Je suis Cohesif, votre assistant IA souverain français. Posez-moi n&apos;importe quelle
              question ou choisissez une suggestion.
            </p>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: 8, width: '100%', maxWidth: 480,
            }}>
              {SUGGESTED_PROMPTS.map((p) => (
                <button
                  key={p.label}
                  onClick={() => sendMessage(p.label)}
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--w1)',
                    borderRadius: 10,
                    padding: '13px 16px',
                    color: 'var(--fog)',
                    fontFamily: 'var(--fh)',
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all .15s',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 10,
                    lineHeight: 1.45,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(11, 200, 240, .3)'
                    e.currentTarget.style.color = 'var(--snow)'
                    e.currentTarget.style.background = 'rgba(11, 200, 240, .04)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--w1)'
                    e.currentTarget.style.color = 'var(--fog)'
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>{p.icon}</span>
                  <span>{p.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.map((msg, i) => (
          <div key={msg.id}>
            {/* Soft upsell after SOFT_UPSELL_AT messages */}
            {msg.role === 'assistant' && messageCount === SOFT_UPSELL_AT && i === messages.length - 1 && showSoftUpsell && (
              <div style={{
                background: 'rgba(11, 200, 240, .05)',
                border: '1px solid rgba(11, 200, 240, .18)',
                borderRadius: 12,
                padding: '14px 20px',
                marginBottom: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 16,
                flexWrap: 'wrap',
              }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--y)', marginBottom: 3 }}>
                    {remaining} messages gratuits restants
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--fog)' }}>
                    Passez Pro pour des conversations illimitées et des agents personnalisés.
                  </div>
                </div>
                <Link href="/tarifs" className="btn by bsm" style={{ whiteSpace: 'nowrap' }}>
                  Passer Pro — 29€/mois
                </Link>
              </div>
            )}

            <div style={{
              display: 'flex',
              flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
              alignItems: 'flex-start',
              gap: 10,
            }}>
              {msg.role === 'user' ? <UserAvatar /> : <LumisAvatar />}

              <div style={{
                maxWidth: '74%',
                background: msg.role === 'user' ? 'rgba(11,200,240,.08)' : 'var(--card)',
                border: `1px solid ${msg.role === 'user' ? 'rgba(11, 200, 240, .16)' : 'var(--w1)'}`,
                borderRadius: msg.role === 'user' ? '14px 3px 14px 14px' : '3px 14px 14px 14px',
                padding: '12px 16px',
                fontSize: 14,
                lineHeight: 1.7,
                color: 'var(--snow)',
                whiteSpace: 'pre-wrap',
              }}>
                {msg.content || (
                  isLoading && i === messages.length - 1 ? (
                    <span style={{ display: 'flex', gap: 4, alignItems: 'center', height: 20 }}>
                      {[0, 1, 2].map((n) => (
                        <span key={n} style={{
                          width: 5, height: 5, borderRadius: '50%',
                          background: 'var(--fog)',
                          animation: `chatBounce 1.2s ease-in-out ${n * 0.18}s infinite`,
                          display: 'inline-block',
                        }} />
                      ))}
                    </span>
                  ) : null
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <LumisAvatar />
            <div style={{
              background: 'var(--card)', border: '1px solid var(--w1)',
              borderRadius: '3px 14px 14px 14px',
              padding: '12px 16px', display: 'flex', gap: 4, alignItems: 'center',
            }}>
              {[0, 1, 2].map((n) => (
                <span key={n} style={{
                  width: 5, height: 5, borderRadius: '50%', background: 'var(--fog)',
                  display: 'inline-block',
                  animation: `chatBounce 1.2s ease-in-out ${n * 0.18}s infinite`,
                }} />
              ))}
            </div>
          </div>
        )}

        {/* Hard limit */}
        {isHardBlocked && (
          <div style={{
            background: 'var(--panel)', border: '1px solid rgba(11, 200, 240, .25)',
            borderRadius: 16, padding: '40px 32px', textAlign: 'center', margin: '8px 0',
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: 12, background: 'var(--yd)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px',
            }}>
              <LumisAvatar />
            </div>
            <h3 style={{
              fontFamily: 'var(--fh)', fontSize: 20, fontWeight: 800,
              letterSpacing: '-.03em', marginBottom: 8,
            }}>
              Limite gratuite atteinte
            </h3>
            <p style={{ color: 'var(--fog)', fontSize: 14, lineHeight: 1.7, marginBottom: 28, maxWidth: 380, margin: '0 auto 28px' }}>
              Passez Pro pour des conversations illimitées, des agents personnalisés
              et l&apos;accès à Cohesif Ultra.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/tarifs" className="btn by">Passer Pro — 29€/mois →</Link>
              <Link href="/tarifs" className="btn bg">Voir tous les plans</Link>
            </div>
            <p style={{ marginTop: 16, fontSize: 11, color: 'var(--mist)', fontFamily: 'var(--fm)' }}>
              14 jours gratuits · Sans carte bancaire · Annulation en 1 clic
            </p>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ── INPUT ── */}
      {!isHardBlocked && (
        <div style={{ borderTop: '1px solid var(--w1)', padding: '14px 24px', background: 'var(--panel)' }}>
          <div style={{ maxWidth: 780, margin: '0 auto', display: 'flex', gap: 10, alignItems: 'flex-end' }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Posez votre question… (Entrée pour envoyer)"
              rows={1}
              disabled={isLoading || isHardBlocked}
              style={{
                flex: 1, background: 'var(--card)',
                border: '1px solid var(--w1)',
                borderRadius: 10, padding: '11px 14px',
                color: 'var(--snow)', fontFamily: 'var(--fh)',
                fontSize: 14, resize: 'none',
                minHeight: 44, maxHeight: 160, overflowY: 'auto', outline: 'none',
                transition: 'border-color .15s',
              }}
              onFocus={(e) => { e.target.style.borderColor = 'rgba(11, 200, 240, .3)' }}
              onBlur={(e) => { e.target.style.borderColor = 'var(--w1)' }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isLoading || isHardBlocked}
              style={{
                width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                background: input.trim() && !isLoading ? 'var(--y)' : 'var(--raise)',
                border: 'none', cursor: input.trim() && !isLoading ? 'pointer' : 'default',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background .15s',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke={input.trim() && !isLoading ? '#000' : 'var(--mist)'}
                strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          </div>
          <p style={{
            textAlign: 'center', marginTop: 8, fontSize: 11,
            color: 'var(--mist)', fontFamily: 'var(--fm)',
            maxWidth: 780, margin: '8px auto 0',
          }}>
            Cohesif peut faire des erreurs · Hébergé en France · RGPD natif
          </p>
        </div>
      )}

      {/* ── FOOTER UPSELL ── */}
      <div style={{ borderTop: '1px solid var(--w1)', padding: '24px', background: 'var(--deep)' }}>
        <div style={{
          maxWidth: 780, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 24, flexWrap: 'wrap',
        }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4, letterSpacing: '-.02em', color: 'var(--snow)' }}>
              Prêt à aller plus loin ?
            </div>
            <div style={{ fontSize: 13, color: 'var(--fog)' }}>
              Messages illimités · Agents personnalisés · API access · Cohesif Ultra
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link href="/tarifs" className="btn by bsm">Pro — dès 29€/mois →</Link>
            <Link href="/roi" className="btn bg bsm">Calculer mon ROI</Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes chatBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: .35; }
          40% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
