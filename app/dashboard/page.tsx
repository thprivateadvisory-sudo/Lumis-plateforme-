'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthProvider'
import { signOut } from '@/lib/auth'
import { agents } from '@/lib/agents-config'

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/connexion?redirect=/dashboard')
    }
  }, [user, loading, router])

  if (loading || !user) {
    return (
      <div style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 'var(--nav)' }}>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {[0, 1, 2].map((n) => (
            <span key={n} style={{
              width: 8, height: 8, borderRadius: '50%', background: 'var(--y)',
              display: 'inline-block',
              animation: `chatBounce 1.2s ease-in-out ${n * 0.18}s infinite`,
            }} />
          ))}
        </div>
        <style>{`@keyframes chatBounce{0%,80%,100%{transform:translateY(0);opacity:.35}40%{transform:translateY(-6px);opacity:1}}`}</style>
      </div>
    )
  }

  const displayName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Utilisateur'
  const initials = displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)

  async function handleSignOut() {
    await signOut()
    router.replace('/')
  }

  return (
    <div style={{ minHeight: '100dvh', paddingTop: 'var(--nav)', background: 'var(--void)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>

        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 40, flexWrap: 'wrap', gap: 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 12,
              background: 'var(--y)', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontFamily: 'var(--fh)',
              fontWeight: 800, fontSize: 16, color: '#000', flexShrink: 0,
            }}>
              {initials}
            </div>
            <div>
              <h1 style={{ fontFamily: 'var(--fh)', fontSize: 20, fontWeight: 800, letterSpacing: '-.02em', color: 'var(--snow)', marginBottom: 2 }}>
                Bonjour, {displayName.split(' ')[0]} 👋
              </h1>
              <p style={{ fontSize: 13, color: 'var(--fog)' }}>{user.email}</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link href="/tarifs" className="btn by bsm">Passer Pro →</Link>
            <button
              onClick={handleSignOut}
              style={{
                padding: '8px 16px', borderRadius: 8, border: '1px solid var(--w1)',
                background: 'transparent', color: 'var(--fog)', fontFamily: 'var(--fh)',
                fontSize: 13, cursor: 'pointer', transition: 'all .15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--snow)'; e.currentTarget.style.borderColor = 'var(--w2)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--fog)'; e.currentTarget.style.borderColor = 'var(--w1)' }}
            >
              Déconnexion
            </button>
          </div>
        </div>

        {/* Plan banner */}
        <div style={{
          background: 'rgba(11,200,240,.05)', border: '1px solid rgba(11,200,240,.15)',
          borderRadius: 14, padding: '20px 24px', marginBottom: 36,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              padding: '4px 10px', borderRadius: 6, background: 'var(--raise)',
              border: '1px solid var(--w1)', fontSize: 11, fontFamily: 'var(--fm)', color: 'var(--fog)',
            }}>
              PLAN GRATUIT
            </div>
            <span style={{ fontSize: 13, color: 'var(--fog)' }}>
              20 messages gratuits par agent · Passez Pro pour un accès illimité
            </span>
          </div>
          <Link href="/tarifs" className="btn by bsm">
            Débloquer Pro — 29€/mois
          </Link>
        </div>

        {/* Agents section */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <h2 style={{ fontFamily: 'var(--fh)', fontSize: 17, fontWeight: 800, letterSpacing: '-.02em', color: 'var(--snow)' }}>
              Vos agents IA
            </h2>
            <Link href="/agents" style={{ fontSize: 13, color: 'var(--fog)', textDecoration: 'none' }}>
              Voir tous →
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 16,
          }}>
            {agents.map((agent) => (
              <Link
                key={agent.slug}
                href={`/agents/${agent.slug}`}
                style={{ textDecoration: 'none' }}
              >
                <div style={{
                  background: 'var(--card)', border: '1px solid var(--w1)',
                  borderRadius: 14, padding: '20px',
                  transition: 'all .2s', cursor: 'pointer',
                }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    el.style.borderColor = agent.color + '44'
                    el.style.transform = 'translateY(-2px)'
                    el.style.boxShadow = `0 8px 24px ${agent.color}12`
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
                    el.style.borderColor = 'var(--w1)'
                    el.style.transform = 'translateY(0)'
                    el.style.boxShadow = 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 10,
                      background: agent.color + '18',
                      border: `1px solid ${agent.color}33`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 20, flexShrink: 0,
                    }}>
                      {agent.emoji}
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--fh)', fontWeight: 700, fontSize: 14, color: 'var(--snow)' }}>
                        {agent.name}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--fog)', marginTop: 2 }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                        En ligne
                        <span style={{ color: 'var(--w2)', margin: '0 2px' }}>·</span>
                        <span style={{ color: agent.color }}>{agent.kpi}</span>
                      </div>
                    </div>
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--mist)', lineHeight: 1.5, margin: 0 }}>
                    {agent.tagline}
                  </p>
                  <div style={{
                    marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--w1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}>
                    <span style={{ fontSize: 11, fontFamily: 'var(--fm)', color: 'var(--mist)' }}>
                      {agent.version}
                    </span>
                    <span style={{ fontSize: 12, color: agent.color, fontWeight: 600 }}>
                      Démarrer →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Account section */}
        <div style={{ background: 'var(--card)', border: '1px solid var(--w1)', borderRadius: 14, padding: '24px' }}>
          <h2 style={{ fontFamily: 'var(--fh)', fontSize: 17, fontWeight: 800, letterSpacing: '-.02em', color: 'var(--snow)', marginBottom: 20 }}>
            Mon compte
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--w1)' }}>
              <span style={{ fontSize: 13, color: 'var(--fog)' }}>Email</span>
              <span style={{ fontSize: 13, color: 'var(--snow)', fontFamily: 'var(--fm)' }}>{user.email}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--w1)' }}>
              <span style={{ fontSize: 13, color: 'var(--fog)' }}>Nom</span>
              <span style={{ fontSize: 13, color: 'var(--snow)' }}>{displayName}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--w1)' }}>
              <span style={{ fontSize: 13, color: 'var(--fog)' }}>Plan actuel</span>
              <span style={{ fontSize: 13, padding: '3px 10px', borderRadius: 6, background: 'var(--raise)', border: '1px solid var(--w1)', color: 'var(--fog)', fontFamily: 'var(--fm)' }}>
                GRATUIT
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
              <span style={{ fontSize: 13, color: 'var(--fog)' }}>Membre depuis</span>
              <span style={{ fontSize: 13, color: 'var(--snow)', fontFamily: 'var(--fm)' }}>
                {new Date(user.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
