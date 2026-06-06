'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { agents, getAgentBySlug, type AgentConfig } from '@/lib/agents-config'
import { useAuth } from '@/components/AuthProvider'

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

const AgentAvatar = ({ agent }: { agent: AgentConfig }) => (
  <div style={{
    width: 32, height: 32, borderRadius: 9,
    background: agent.color + '22',
    border: `1px solid ${agent.color}44`,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0, fontSize: 16,
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

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: allMessages, sessionId, agentSlug: slug }),
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
            } catch { /* ignore */ }
          }
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
      <div style={{
        borderBottom: '1px solid var(--w1)', padding: '14px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'var(--panel)', gap: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href="/agents" style={{ color: 'var(--fog)', fontSize: 13, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
            ← Agents
          </Link>
          <div style={{ width: 1, height: 20, background: 'var(--w1)' }} />
          <AgentAvatar agent={agent} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--snow)', letterSpacing: '-.01em' }}>
              {agent.name}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--fog)' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block', flexShrink: 0 }} />
              En ligne · {agent.version}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {isPro ? (
              <span style={{ fontSize: 11, fontFamily: 'var(--fm)', color: '#0BC8F0' }}>
                ∞ illimité · Pro
              </span>
            ) : (
              <>
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
              </>
            )}
          </div>
          <Link href="/tarifs" className="btn by bsm">Passer Pro →</Link>
        </div>
      </div>

      {/* CHAT AREA */}
      <div ref={chatAreaRef} style={{
        flex: 1, overflowY: 'auto', padding: '24px',
        display: 'flex', flexDirection: 'column', gap: 20,
        maxWidth: 780, margin: '0 auto', width: '100%',
        WebkitOverflowScrolling: 'touch',
      }}>
        {/* Welcome state */}
        {messages.length === 0 && (
          <div style={{ padding: '48px 0 32px' }}>
            <div style={{ marginBottom: 20 }}>
              <div style={{
                width: 56, height: 56, borderRadius: 14,
                background: agent.color + '18',
                border: `1px solid ${agent.color}33`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28,
              }}>
                {agent.emoji}
              </div>
            </div>
            <h2 style={{
              fontFamily: 'var(--fh)', fontSize: 22, fontWeight: 800,
              letterSpacing: '-.03em', marginBottom: 8, color: 'var(--snow)',
            }}>
              Bonjour, je suis {agent.name}
            </h2>
            <p style={{ color: 'var(--fog)', fontSize: 14, lineHeight: 1.7, marginBottom: 32, maxWidth: 460 }}>
              {agent.tagline}. Posez-moi vos questions ou choisissez une suggestion ci-dessous.
            </p>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: 8, width: '100%', maxWidth: 480,
            }}>
              {agent.suggestedPrompts.map((p) => (
                <button
                  key={p.label}
                  onClick={() => sendMessage(p.label)}
                  style={{
                    background: 'transparent', border: '1px solid var(--w1)',
                    borderRadius: 10, padding: '13px 16px',
                    color: 'var(--fog)', fontFamily: 'var(--fh)',
                    fontSize: 13, fontWeight: 500,
                    cursor: 'pointer', textAlign: 'left',
                    transition: 'all .15s', display: 'flex',
                    alignItems: 'flex-start', gap: 10, lineHeight: 1.45,
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
                  <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>{p.icon}</span>
                  <span>{p.label}</span>
                </button>
              ))}
            </div>

            {/* Other agents */}
            <div style={{ marginTop: 40, paddingTop: 32, borderTop: '1px solid var(--w1)' }}>
              <p style={{ fontSize: 12, color: 'var(--mist)', marginBottom: 12 }}>Autres agents disponibles</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {agents.filter(a => a.slug !== slug).map(a => (
                  <Link
                    key={a.slug}
                    href={`/agents/${a.slug}`}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      padding: '6px 12px', borderRadius: 8,
                      border: '1px solid var(--w1)', background: 'transparent',
                      color: 'var(--fog)', fontSize: 12, textDecoration: 'none',
                      transition: 'all .15s',
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
                borderRadius: 12, padding: '14px 20px', marginBottom: 20,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap',
              }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: agent.color, marginBottom: 3 }}>
                    {remaining} messages gratuits restants
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--fog)' }}>
                    Passez Pro pour des conversations illimitées avec tous les agents.
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
                maxWidth: '74%',
                background: msg.role === 'user' ? agent.color + '0D' : 'var(--card)',
                border: `1px solid ${msg.role === 'user' ? agent.color + '28' : 'var(--w1)'}`,
                borderRadius: msg.role === 'user' ? '14px 3px 14px 14px' : '3px 14px 14px 14px',
                padding: '12px 16px', fontSize: 14, lineHeight: 1.7,
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
            background: 'var(--panel)', border: `1px solid ${agent.color}33`,
            borderRadius: 16, padding: '40px 32px', textAlign: 'center', margin: '8px 0',
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: 14,
              background: agent.color + '18',
              border: `1px solid ${agent.color}33`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 28, margin: '0 auto 20px',
            }}>
              {agent.emoji}
            </div>
            <h3 style={{
              fontFamily: 'var(--fh)', fontSize: 20, fontWeight: 800,
              letterSpacing: '-.03em', marginBottom: 8,
            }}>
              Limite gratuite atteinte
            </h3>
            <p style={{ color: 'var(--fog)', fontSize: 14, lineHeight: 1.7, marginBottom: 28, maxWidth: 380, margin: '0 auto 28px' }}>
              Passez Pro pour continuer avec {agent.name} sans limite et accéder à tous les agents.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/tarifs" className="btn by">Passer Pro — 29€/mois →</Link>
              <Link href="/agents" className="btn bg">Voir tous les agents</Link>
            </div>
            <p style={{ marginTop: 16, fontSize: 11, color: 'var(--mist)', fontFamily: 'var(--fm)' }}>
              14 jours gratuits · Sans carte bancaire · Annulation en 1 clic
            </p>
          </div>
        )}

        <div />
      </div>

      {/* INPUT */}
      {!isHardBlocked && (
        <div style={{ borderTop: '1px solid var(--w1)', padding: '14px 24px', background: 'var(--panel)' }}>
          <div style={{ maxWidth: 780, margin: '0 auto', display: 'flex', gap: 10, alignItems: 'flex-end' }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Posez votre question à ${agent.name}…`}
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
          <p style={{
            textAlign: 'center', marginTop: 8, fontSize: 11,
            color: 'var(--mist)', fontFamily: 'var(--fm)',
            maxWidth: 780, margin: '8px auto 0',
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
      `}</style>
    </div>
  )
}
