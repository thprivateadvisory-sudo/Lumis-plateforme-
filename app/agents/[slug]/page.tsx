'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { agents, getAgentBySlug, type AgentConfig } from '@/lib/agents-config'
import { useAuth } from '@/components/AuthProvider'
import { getSupabase } from '@/lib/supabase'

type Role = 'user' | 'assistant'

interface Message {
  role: Role
  content: string
  id: string
}

const MAX_FREE = 20
const SOFT_UPSELL_AT = 5

function generateId() {
  return Math.random().toString(36).slice(2, 10)
}

function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return ''
  let id = localStorage.getItem('cohesif_session_id')
  if (!id) {
    id = generateId() + generateId()
    localStorage.setItem('cohesif_session_id', id)
  }
  return id
}

function getMessageCount(slug: string): number {
  if (typeof window === 'undefined') return 0
  return parseInt(localStorage.getItem(`cohesif_chat_${slug}`) || '0', 10)
}

function incrementMessageCount(slug: string): number {
  const next = getMessageCount(slug) + 1
  localStorage.setItem(`cohesif_chat_${slug}`, String(next))
  return next
}

const AgentAvatar = ({ agent, size = 32 }: { agent: AgentConfig; size?: number }) => (
  <div style={{
    width: size, height: size, borderRadius: size * 0.28,
    background: agent.color + '22',
    border: `1px solid ${agent.color}44`,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0, fontSize: size * 0.5,
  }}>
    {agent.emoji}
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

function NotFound() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100dvh', gap: 16, paddingTop: 'var(--nav)' }}>
      <h2 style={{ fontSize: 22, fontWeight: 800 }}>Agent introuvable</h2>
      <Link href="/agents" className="btn by">← Voir tous les agents</Link>
    </div>
  )
}

export default function AgentChatPage() {
  const params = useParams()
  const slug = typeof params.slug === 'string' ? params.slug : ''
  const agent = getAgentBySlug(slug)
  const { user } = useAuth()

  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [messageCount, setMessageCount] = useState(0)
  const [isPro, setIsPro] = useState(false)
  const [modelLabel, setModelLabel] = useState('Cohesif Core')
  const [sessionId] = useState(() => (typeof window !== 'undefined' ? getOrCreateSessionId() : ''))
  const chatAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (slug) setMessageCount(getMessageCount(slug))
  }, [slug])

  useEffect(() => {
    if (!user?.email) return
    fetch(`/api/subscription?email=${encodeURIComponent(user.email)}`)
      .then((r) => r.json())
      .then((data) => setIsPro(data.plan === 'pro' || data.plan === 'business'))
      .catch(() => {})
  }, [user])

  useEffect(() => {
    const el = chatAreaRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, isLoading])

  if (!agent) return <NotFound />

  const isHardBlocked = !isPro && messageCount >= MAX_FREE
  const showSoftUpsell = !isPro && messageCount >= SOFT_UPSELL_AT && messageCount < MAX_FREE
  const remaining = isPro ? Infinity : Math.max(0, MAX_FREE - messageCount)
  const progressColor = messageCount >= 16 ? '#ff3355' : messageCount >= 10 ? '#f59e0b' : agent.color

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading || isHardBlocked) return

    const userMsg: Message = { role: 'user', content: text.trim(), id: generateId() }
    const assistantId = generateId()

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsLoading(true)

    const newCount = incrementMessageCount(slug)
    setMessageCount(newCount)

    const allMessages = [...messages, userMsg].map((m) => ({ role: m.role, content: m.content }))
    setMessages((prev) => [...prev, { role: 'assistant', content: '', id: assistantId }])

    try {
      const controller = new AbortController()
      abortRef.current = controller

      const { data: { session: authSession } } = await getSupabase().auth.getSession()
      const headers: Record<string, string> = { 'Content-Type': 'application/json' }
      if (authSession?.access_token) {
        headers['Authorization'] = `Bearer ${authSession.access_token}`
      }

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          messages: allMessages,
          sessionId,
          agentSlug: slug,
          anonCount: newCount,
        }),
        signal: controller.signal,
      })

      if (!res.ok || !res.body) {
        if (res.status === 429) {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? { ...m, content: 'Vous avez atteint la limite de messages gratuits. Passez Pro pour continuer sans limite.' }
                : m
            )
          )
          setIsLoading(false)
          return
        }
        throw new Error(`HTTP ${res.status}`)
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
          if (!line.startsWith('data: ')) continue
          const raw = line.slice(6).trim()
          if (!raw || raw === '{}') continue
          try {
            const parsed = JSON.parse(raw)
            if (parsed.label) {
              setModelLabel(parsed.label)
            } else if (parsed.text) {
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
          } catch { /* ignore */ }
        }
      }
    } catch (err: unknown) {
      const errName = err instanceof Error ? err.name : ''
      if (errName !== 'AbortError') {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, isLoading, isHardBlocked, sessionId, slug])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      height: '100dvh', paddingTop: 'var(--nav)',
      background: 'var(--void)', overflow: 'hidden',
    }}>
      {/* HEADER */}
      <div className="agent-header" style={{
        borderBottom: '1px solid var(--w1)',
        padding: '12px 20px',
        background: 'var(--panel)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}>
        {/* Back link */}
        <Link href="/agents" style={{
          color: 'var(--fog)', fontSize: 13, textDecoration: 'none',
          flexShrink: 0, display: 'flex', alignItems: 'center', gap: 4,
        }}>
          ←
          <span className="back-label"> Agents</span>
        </Link>

        <div style={{ width: 1, height: 16, background: 'var(--w1)', flexShrink: 0 }} />

        {/* Avatar + name + status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, flex: 1, minWidth: 0 }}>
          <AgentAvatar agent={agent} size={30} />
          <div style={{ minWidth: 0 }}>
            <div style={{
              fontWeight: 700, fontSize: 14, color: 'var(--snow)',
              letterSpacing: '-.01em', whiteSpace: 'nowrap',
              overflow: 'hidden', textOverflow: 'ellipsis',
            }}>
              {agent.name}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 1 }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: '#22c55e', display: 'inline-block', flexShrink: 0,
              }} />
              <span style={{ fontSize: 11, color: 'var(--fog)', whiteSpace: 'nowrap' }}>En ligne</span>
              <span style={{ fontSize: 11, color: 'var(--w2)' }}>·</span>
              <span style={{
                fontSize: 11, whiteSpace: 'nowrap',
                color: modelLabel === 'Cohesif Ultra' ? '#0BC8F0' : 'var(--fog)',
                fontWeight: modelLabel === 'Cohesif Ultra' ? 600 : 400,
              }}>{modelLabel}</span>
            </div>
          </div>
        </div>

        {/* Counter + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          {isPro ? (
            <span style={{ fontSize: 11, fontFamily: 'var(--fm)', color: '#0BC8F0', whiteSpace: 'nowrap' }}>
              ∞ Pro
            </span>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{
                fontFamily: 'var(--fm)', fontSize: 11,
                color: remaining <= 5 ? '#f59e0b' : 'var(--fog)',
                whiteSpace: 'nowrap',
              }}>
                {remaining}<span className="counter-suffix"> restants</span>
              </span>
              <div style={{
                width: 44, height: 3, borderRadius: 100,
                background: 'var(--w1)', overflow: 'hidden', flexShrink: 0,
              }}>
                <div style={{
                  height: '100%',
                  width: `${Math.min(100, (messageCount / MAX_FREE) * 100)}%`,
                  background: progressColor, borderRadius: 100, transition: 'width .3s',
                }} />
              </div>
            </div>
          )}
          <Link href="/tarifs" className="btn by bsm header-pro-btn">
            <span className="pro-btn-long">Passer Pro →</span>
            <span className="pro-btn-short">Pro →</span>
          </Link>
        </div>
      </div>

      {/* CHAT AREA */}
      <div ref={chatAreaRef} className="chat-area" style={{
        flex: 1, overflowY: 'auto', padding: '24px',
        display: 'flex', flexDirection: 'column', gap: 20,
        maxWidth: 780, margin: '0 auto', width: '100%',
        WebkitOverflowScrolling: 'touch',
        boxSizing: 'border-box',
      }}>
        {/* Welcome state */}
        {messages.length === 0 && (
          <div style={{ padding: '32px 0 24px' }}>
            <div style={{ marginBottom: 16 }}>
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: agent.color + '18',
                border: `1px solid ${agent.color}33`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26,
              }}>
                {agent.emoji}
              </div>
            </div>
            <h2 style={{
              fontFamily: 'var(--fh)', fontSize: 20, fontWeight: 800,
              letterSpacing: '-.03em', marginBottom: 6, color: 'var(--snow)',
            }}>
              Bonjour, je suis {agent.name}
            </h2>
            <p style={{ color: 'var(--fog)', fontSize: 14, lineHeight: 1.7, marginBottom: 24, maxWidth: 440 }}>
              {agent.tagline}. Posez-moi vos questions ou choisissez une suggestion.
            </p>

            {/* Suggestion cards */}
            <div className="suggestion-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: 8, width: '100%', maxWidth: 480,
            }}>
              {agent.suggestedPrompts.map((p) => (
                <button
                  key={p.label}
                  onClick={() => sendMessage(p.label)}
                  style={{
                    background: 'transparent', border: '1px solid var(--w1)',
                    borderRadius: 10, padding: '12px 14px',
                    color: 'var(--fog)', fontFamily: 'var(--fh)',
                    fontSize: 13, fontWeight: 500,
                    cursor: 'pointer', textAlign: 'left',
                    transition: 'all .15s', display: 'flex',
                    alignItems: 'flex-start', gap: 8, lineHeight: 1.4,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = agent.color + '55'
                    e.currentTarget.style.color = 'var(--snow)'
                    e.currentTarget.style.background = agent.color + '08'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--w1)'
                    e.currentTarget.style.color = 'var(--fog)'
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  <span style={{ fontSize: 15, flexShrink: 0, marginTop: 1 }}>{p.icon}</span>
                  <span>{p.label}</span>
                </button>
              ))}
            </div>

            {/* Other agents */}
            <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--w1)' }}>
              <p style={{ fontSize: 11, color: 'var(--mist)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '.05em' }}>
                Autres agents
              </p>
              <div className="other-agents-row" style={{
                display: 'flex', gap: 8, flexWrap: 'wrap',
              }}>
                {agents.filter(a => a.slug !== slug).map(a => (
                  <Link
                    key={a.slug}
                    href={`/agents/${a.slug}`}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      padding: '6px 11px', borderRadius: 8,
                      border: '1px solid var(--w1)', background: 'transparent',
                      color: 'var(--fog)', fontSize: 12, textDecoration: 'none',
                      transition: 'all .15s', whiteSpace: 'nowrap', flexShrink: 0,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = a.color + '44'
                      e.currentTarget.style.color = 'var(--snow)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--w1)'
                      e.currentTarget.style.color = 'var(--fog)'
                    }}
                  >
                    <span>{a.emoji}</span>
                    <span>{a.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.map((msg, i) => (
          <div key={msg.id}>
            {msg.role === 'assistant' && messageCount === SOFT_UPSELL_AT && i === messages.length - 1 && showSoftUpsell && (
              <div style={{
                background: agent.color + '08',
                border: `1px solid ${agent.color}28`,
                borderRadius: 12, padding: '12px 16px', marginBottom: 16,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap',
              }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: agent.color, marginBottom: 2 }}>
                    {remaining} messages gratuits restants
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--fog)' }}>
                    Passez Pro pour des conversations illimitées.
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
              alignItems: 'flex-start', gap: 10,
            }}>
              {msg.role === 'user' ? <UserAvatar /> : <AgentAvatar agent={agent} />}
              <div style={{
                maxWidth: '78%',
                background: msg.role === 'user' ? agent.color + '0D' : 'var(--card)',
                border: `1px solid ${msg.role === 'user' ? agent.color + '28' : 'var(--w1)'}`,
                borderRadius: msg.role === 'user' ? '14px 3px 14px 14px' : '3px 14px 14px 14px',
                padding: '11px 15px', fontSize: 14, lineHeight: 1.7,
                color: 'var(--snow)', whiteSpace: 'pre-wrap',
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

        {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <AgentAvatar agent={agent} />
            <div style={{
              background: 'var(--card)', border: '1px solid var(--w1)',
              borderRadius: '3px 14px 14px 14px',
              padding: '11px 15px', display: 'flex', gap: 4, alignItems: 'center',
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
            background: 'var(--panel)', border: `1px solid ${agent.color}33`,
            borderRadius: 16, padding: '36px 24px', textAlign: 'center', margin: '8px 0',
          }}>
            <div style={{
              width: 52, height: 52, borderRadius: 14,
              background: agent.color + '18',
              border: `1px solid ${agent.color}33`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 26, margin: '0 auto 18px',
            }}>
              {agent.emoji}
            </div>
            <h3 style={{
              fontFamily: 'var(--fh)', fontSize: 20, fontWeight: 800,
              letterSpacing: '-.03em', marginBottom: 8,
            }}>
              Limite gratuite atteinte
            </h3>
            <p style={{ color: 'var(--fog)', fontSize: 14, lineHeight: 1.7, marginBottom: 24, maxWidth: 340, margin: '0 auto 24px' }}>
              Passez Pro pour continuer avec {agent.name} sans limite et accéder à tous les agents.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/tarifs" className="btn by">Passer Pro — 29€/mois →</Link>
              <Link href="/agents" className="btn bg">Voir tous les agents</Link>
            </div>
            <p style={{ marginTop: 14, fontSize: 11, color: 'var(--mist)', fontFamily: 'var(--fm)' }}>
              14 jours gratuits · Sans carte bancaire · Annulation en 1 clic
            </p>
          </div>
        )}

        <div />
      </div>

      {/* INPUT */}
      {!isHardBlocked && (
        <div className="input-area" style={{
          borderTop: '1px solid var(--w1)', padding: '12px 20px',
          background: 'var(--panel)',
        }}>
          <div style={{ maxWidth: 780, margin: '0 auto', display: 'flex', gap: 8, alignItems: 'flex-end' }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Posez une question à ${agent.name.split(' ')[0]}…`}
              rows={1}
              disabled={isLoading || isHardBlocked}
              style={{
                flex: 1, background: 'var(--card)',
                border: '1px solid var(--w1)', borderRadius: 10,
                padding: '11px 14px', color: 'var(--snow)',
                fontFamily: 'var(--fh)', fontSize: 16,
                resize: 'none', minHeight: 44, maxHeight: 160,
                overflowY: 'auto', outline: 'none', transition: 'border-color .15s',
              }}
              onFocus={(e) => { e.target.style.borderColor = agent.color + '55' }}
              onBlur={(e) => { e.target.style.borderColor = 'var(--w1)' }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isLoading || isHardBlocked}
              style={{
                width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                background: input.trim() && !isLoading ? agent.color : 'var(--raise)',
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
          <p className="footer-note" style={{
            textAlign: 'center', marginTop: 6, fontSize: 11,
            color: 'var(--mist)', fontFamily: 'var(--fm)',
            maxWidth: 780, margin: '6px auto 0',
          }}>
            {agent.name} peut faire des erreurs · Hébergé en France · RGPD natif
          </p>
        </div>
      )}

      <style>{`
        @keyframes chatBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: .35; }
          40% { transform: translateY(-5px); opacity: 1; }
        }

        .pro-btn-short { display: none; }

        @media (max-width: 640px) {
          .chat-area { padding: 14px !important; }
          .input-area { padding: 10px 14px !important; }
          .back-label { display: none; }
          .counter-suffix { display: none; }
          .footer-note { display: none !important; }
          .pro-btn-long { display: none; }
          .pro-btn-short { display: inline; }
          .suggestion-grid {
            grid-template-columns: 1fr !important;
            max-width: 100% !important;
          }
          .other-agents-row {
            flex-wrap: nowrap !important;
            overflow-x: auto !important;
            padding-bottom: 4px;
            -webkit-overflow-scrolling: touch;
          }
        }

        @media (max-width: 400px) {
          .header-pro-btn { display: none !important; }
        }
      `}</style>
    </div>
  )
}
