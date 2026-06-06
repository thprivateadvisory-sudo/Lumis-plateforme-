'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn, signUp, resetPassword } from '@/lib/auth'
import { useAuth } from '@/components/AuthProvider'

type Mode = 'login' | 'signup' | 'forgot'

function ConnexionForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, loading } = useAuth()

  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const redirectTo = searchParams.get('redirect') || '/dashboard'

  // Already logged in → redirect
  useEffect(() => {
    if (!loading && user) {
      router.replace(redirectTo)
    }
  }, [user, loading, router, redirectTo])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')
    setSubmitting(true)

    try {
      if (mode === 'forgot') {
        const { error } = await resetPassword(email)
        if (error) throw error
        setSuccess('Email envoyé ! Vérifiez votre boîte mail pour réinitialiser votre mot de passe.')
        setSubmitting(false)
        return
      }

      if (mode === 'signup') {
        if (password.length < 8) {
          setError('Le mot de passe doit contenir au moins 8 caractères.')
          setSubmitting(false)
          return
        }
        const { error } = await signUp(email, password, fullName)
        if (error) throw error
        setSuccess('Compte créé ! Vérifiez votre email pour confirmer votre inscription.')
        setSubmitting(false)
        return
      }

      // login
      const { error } = await signIn(email, password)
      if (error) throw error
      router.replace(redirectTo)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      if (msg.includes('Invalid login credentials')) {
        setError('Email ou mot de passe incorrect.')
      } else if (msg.includes('Email not confirmed')) {
        setError('Veuillez confirmer votre email avant de vous connecter.')
      } else if (msg.includes('User already registered')) {
        setError('Un compte existe déjà avec cet email. Connectez-vous.')
      } else {
        setError(msg || 'Une erreur est survenue. Réessayez.')
      }
      setSubmitting(false)
    }
  }

  if (loading) return null

  const titles: Record<Mode, string> = {
    login: 'Bienvenue',
    signup: 'Créer un compte',
    forgot: 'Mot de passe oublié',
  }

  const subtitles: Record<Mode, string> = {
    login: 'Connectez-vous à votre espace Cohesif IA',
    signup: 'Rejoignez Cohesif IA et accédez aux agents',
    forgot: 'Entrez votre email pour recevoir un lien de réinitialisation',
  }

  return (
    <div style={{
      minHeight: '100dvh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', paddingTop: 'var(--nav)',
      background: 'var(--void)', padding: '80px 24px 40px',
    }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', marginBottom: 28 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 9, background: 'var(--y)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="16" height="16" viewBox="0 0 34 34" fill="none">
                <path d="M9 25V9h4v13h8v3H9z" fill="#000" />
                <circle cx="25" cy="11" r="3" fill="#000" />
              </svg>
            </div>
            <span style={{ fontFamily: 'var(--fh)', fontWeight: 800, fontSize: 16, color: 'var(--snow)' }}>
              Cohesif IA
            </span>
          </Link>
          <h1 style={{
            fontFamily: 'var(--fh)', fontSize: 26, fontWeight: 800,
            letterSpacing: '-.03em', color: 'var(--snow)', marginBottom: 8,
          }}>
            {titles[mode]}
          </h1>
          <p style={{ color: 'var(--fog)', fontSize: 14 }}>
            {subtitles[mode]}
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: 'var(--card)', border: '1px solid var(--w1)',
          borderRadius: 18, padding: '32px',
        }}>
          {/* Mode tabs */}
          {mode !== 'forgot' && (
            <div style={{
              display: 'flex', gap: 0, marginBottom: 28,
              background: 'var(--raise)', borderRadius: 10, padding: 4,
            }}>
              {(['login', 'signup'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => { setMode(m); setError(''); setSuccess('') }}
                  style={{
                    flex: 1, padding: '8px 0', borderRadius: 7, border: 'none',
                    cursor: 'pointer', fontFamily: 'var(--fh)',
                    fontSize: 13, fontWeight: 600,
                    background: mode === m ? 'var(--card)' : 'transparent',
                    color: mode === m ? 'var(--snow)' : 'var(--fog)',
                    transition: 'all .15s',
                    boxShadow: mode === m ? '0 1px 4px rgba(0,0,0,.25)' : 'none',
                  }}
                >
                  {m === 'login' ? 'Connexion' : 'Inscription'}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Full name — signup only */}
            {mode === 'signup' && (
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--fog)', marginBottom: 6 }}>
                  Nom complet
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Marie Dupont"
                  required
                  style={inputStyle}
                  onFocus={(e) => { e.target.style.borderColor = 'rgba(11,200,240,.4)' }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--w1)' }}
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--fog)', marginBottom: 6 }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="marie@entreprise.fr"
                required
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = 'rgba(11,200,240,.4)' }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--w1)' }}
              />
            </div>

            {/* Password */}
            {mode !== 'forgot' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--fog)' }}>
                    Mot de passe
                  </label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => { setMode('forgot'); setError(''); setSuccess('') }}
                      style={{ background: 'none', border: 'none', color: 'var(--y)', fontSize: 12, cursor: 'pointer', fontFamily: 'var(--fh)' }}
                    >
                      Oublié ?
                    </button>
                  )}
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={mode === 'signup' ? 'Minimum 8 caractères' : '••••••••'}
                  required
                  minLength={mode === 'signup' ? 8 : undefined}
                  style={inputStyle}
                  onFocus={(e) => { e.target.style.borderColor = 'rgba(11,200,240,.4)' }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--w1)' }}
                />
              </div>
            )}

            {/* Error / success */}
            {error && (
              <div style={{
                background: 'rgba(255,51,85,.08)', border: '1px solid rgba(255,51,85,.25)',
                borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#ff6688',
              }}>
                {error}
              </div>
            )}
            {success && (
              <div style={{
                background: 'rgba(34,197,94,.08)', border: '1px solid rgba(34,197,94,.25)',
                borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#4ade80',
              }}>
                {success}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              style={{
                width: '100%', padding: '12px', borderRadius: 10, border: 'none',
                background: submitting ? 'var(--raise)' : 'var(--y)',
                color: submitting ? 'var(--fog)' : '#000',
                fontFamily: 'var(--fh)', fontSize: 14, fontWeight: 700,
                cursor: submitting ? 'default' : 'pointer',
                transition: 'all .15s', marginTop: 4,
              }}
            >
              {submitting ? 'Chargement…' : mode === 'login' ? 'Se connecter' : mode === 'signup' ? 'Créer mon compte' : 'Envoyer le lien'}
            </button>
          </form>

          {/* Back link for forgot */}
          {mode === 'forgot' && (
            <button
              onClick={() => { setMode('login'); setError(''); setSuccess('') }}
              style={{
                display: 'block', width: '100%', textAlign: 'center',
                marginTop: 16, background: 'none', border: 'none',
                color: 'var(--fog)', fontSize: 13, cursor: 'pointer',
                fontFamily: 'var(--fh)',
              }}
            >
              ← Retour à la connexion
            </button>
          )}
        </div>

        {/* Footer note */}
        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 12, color: 'var(--mist)', lineHeight: 1.6 }}>
          En créant un compte, vous acceptez nos{' '}
          <Link href="/legal/cgu" style={{ color: 'var(--fog)' }}>CGU</Link>
          {' '}et notre{' '}
          <Link href="/legal/confidentialite" style={{ color: 'var(--fog)' }}>politique de confidentialité</Link>.
        </p>
      </div>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 14px',
  background: 'var(--raise)', border: '1px solid var(--w1)',
  borderRadius: 8, color: 'var(--snow)',
  fontFamily: 'var(--fh)', fontSize: 14,
  outline: 'none', transition: 'border-color .15s',
  boxSizing: 'border-box',
}

export default function ConnexionPage() {
  return (
    <Suspense>
      <ConnexionForm />
    </Suspense>
  )
}
