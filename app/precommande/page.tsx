'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function PrecommandePage() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', company: '', message: ''
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          subject: 'Précommande Robot Cohesif',
        })
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || 'Erreur serveur')
      }
      setStatus('success')
    } catch (err: unknown) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Une erreur est survenue. Réessayez.')
    }
  }

  const SPECS = [
    { icon: '🤖', label: 'Agent physique autonome', desc: 'Navigation, détection d\'obstacles, tâches répétitives' },
    { icon: '🧠', label: 'IA embarquée souveraine', desc: 'Modèle Cohesif Ultra on-device, 100 % France' },
    { icon: '🔗', label: 'Intégration plateforme', desc: 'Connecté à votre espace Cohesif IA existant' },
    { icon: '🔒', label: 'Sécurité industrielle', desc: 'Certifié CE, protocoles de sécurité renforcés' },
    { icon: '⚡', label: 'Autonomie longue durée', desc: 'Batterie 10h+ · Recharge automatique' },
    { icon: '📡', label: 'Connectivité totale', desc: 'Wi-Fi 6, 5G, Bluetooth 5.2' },
  ]

  return (
    <>
      <section className="sec" style={{ paddingBottom: 0 }}>
        <div className="w">
          {/* Hero */}
          <div style={{ textAlign: 'center', paddingBottom: 64 }}>
            <div className="tag">Précommande — Accès prioritaire</div>
            <h1 className="h1" style={{ marginBottom: 20 }}>
              Le robot IA<br /><em>Cohesif One</em>
            </h1>
            <p style={{ fontSize: 18, color: 'var(--fog)', maxWidth: 560, margin: '0 auto 32px', lineHeight: 1.7 }}>
              L&apos;agent physique autonome conçu pour les entreprises françaises. Piloté par
              l&apos;IA souveraine Cohesif, déployable en 48&nbsp;h dans votre environnement.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(11,200,240,.08)', border: '1px solid rgba(11,200,240,.2)', borderRadius: 50, padding: '10px 22px', fontSize: 13, color: 'var(--y)', fontWeight: 700 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', display: 'inline-block', animation: 'pulse 2s ease-in-out infinite' }} />
              Précommandes ouvertes — Livraisons estimées T3 2026
            </div>
          </div>

          {/* Robot visual */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 64 }}>
            <div style={{
              width: 260, height: 260,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(11,200,240,.12) 0%, rgba(11,200,240,.02) 70%, transparent 100%)',
              border: '1px solid rgba(11,200,240,.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
            }}>
              <svg width="120" height="160" viewBox="0 0 120 160" fill="none" aria-hidden="true">
                {/* Head */}
                <rect x="30" y="10" width="60" height="50" rx="12" fill="rgba(11,200,240,.15)" stroke="#0BC8F0" strokeWidth="1.5" strokeOpacity="0.6" />
                {/* Eyes */}
                <rect x="40" y="25" width="14" height="10" rx="3" fill="#0BC8F0" fillOpacity="0.8" />
                <rect x="66" y="25" width="14" height="10" rx="3" fill="#0BC8F0" fillOpacity="0.8" />
                {/* Mouth */}
                <rect x="45" y="46" width="30" height="4" rx="2" fill="#0BC8F0" fillOpacity="0.4" />
                {/* Antenna */}
                <line x1="60" y1="10" x2="60" y2="2" stroke="#0BC8F0" strokeWidth="1.5" strokeOpacity="0.6" />
                <circle cx="60" cy="1" r="3" fill="#0BC8F0" fillOpacity="0.9" />
                {/* Body */}
                <rect x="22" y="66" width="76" height="60" rx="10" fill="rgba(11,200,240,.1)" stroke="#0BC8F0" strokeWidth="1.5" strokeOpacity="0.5" />
                {/* Chest panel */}
                <rect x="35" y="76" width="50" height="34" rx="6" fill="rgba(11,200,240,.08)" stroke="#0BC8F0" strokeWidth="1" strokeOpacity="0.3" />
                <circle cx="60" cy="85" r="6" fill="#0BC8F0" fillOpacity="0.3" stroke="#0BC8F0" strokeWidth="1" strokeOpacity="0.5" />
                <rect x="40" y="97" width="40" height="3" rx="1.5" fill="#0BC8F0" fillOpacity="0.3" />
                <rect x="46" y="104" width="28" height="3" rx="1.5" fill="#0BC8F0" fillOpacity="0.2" />
                {/* Arms */}
                <rect x="4" y="68" width="16" height="44" rx="8" fill="rgba(11,200,240,.12)" stroke="#0BC8F0" strokeWidth="1" strokeOpacity="0.4" />
                <rect x="100" y="68" width="16" height="44" rx="8" fill="rgba(11,200,240,.12)" stroke="#0BC8F0" strokeWidth="1" strokeOpacity="0.4" />
                {/* Legs */}
                <rect x="32" y="130" width="22" height="26" rx="8" fill="rgba(11,200,240,.12)" stroke="#0BC8F0" strokeWidth="1" strokeOpacity="0.4" />
                <rect x="66" y="130" width="22" height="26" rx="8" fill="rgba(11,200,240,.12)" stroke="#0BC8F0" strokeWidth="1" strokeOpacity="0.4" />
                {/* Feet */}
                <rect x="28" y="150" width="30" height="8" rx="4" fill="rgba(11,200,240,.15)" stroke="#0BC8F0" strokeWidth="1" strokeOpacity="0.5" />
                <rect x="62" y="150" width="30" height="8" rx="4" fill="rgba(11,200,240,.15)" stroke="#0BC8F0" strokeWidth="1" strokeOpacity="0.5" />
              </svg>

              {/* Orbiting dots */}
              <div style={{ position: 'absolute', inset: -1, borderRadius: '50%', border: '1px dashed rgba(11,200,240,.15)', animation: 'spin 20s linear infinite' }} />
            </div>
          </div>

          {/* Specs grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16, marginBottom: 80 }}>
            {SPECS.map(s => (
              <div key={s.label} style={{ background: 'var(--card)', border: '1px solid var(--w1)', borderRadius: 16, padding: 22, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--yd)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
                  {s.icon}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontSize: 13, color: 'var(--fog)', lineHeight: 1.5 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pre-order form */}
      <section className="sec" style={{ background: 'var(--deep)', borderTop: '1px solid var(--w1)' }}>
        <div className="w" style={{ maxWidth: 640 }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div className="tag">Formulaire de précommande</div>
            <h2 className="h2" style={{ fontSize: 'clamp(26px,4vw,42px)' }}>
              Réservez votre<br /><em>robot dès maintenant</em>
            </h2>
            <p style={{ color: 'var(--fog)', fontSize: 15, lineHeight: 1.7, marginTop: 12 }}>
              Les précommandes donnent accès à un tarif préférentiel et à une livraison prioritaire.
              Notre équipe vous contacte sous 24&nbsp;h pour confirmer votre réservation.
            </p>
          </div>

          <div style={{ background: 'var(--card)', border: '1px solid var(--w1)', borderRadius: 22, padding: 36 }}>
            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(40,200,64,.12)', border: '1px solid rgba(40,200,64,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#28c840" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Précommande enregistrée !</h3>
                <p style={{ color: 'var(--fog)', fontSize: 15, lineHeight: 1.6 }}>
                  Notre équipe vous contactera sous <strong style={{ color: 'var(--snow)' }}>24 heures</strong> pour
                  confirmer votre réservation et vous communiquer les conditions tarifaires.
                </p>
                <Link href="/" className="btn bg" style={{ marginTop: 24, display: 'inline-block' }}>
                  Retour à l&apos;accueil
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="g2" style={{ gap: 14, marginBottom: 18 }}>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>Prénom</label>
                    <input className="fi" type="text" placeholder="Thomas" required value={form.firstName}
                      onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>Nom</label>
                    <input className="fi" type="text" placeholder="Dupont" required value={form.lastName}
                      onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))} />
                  </div>
                </div>
                <div style={{ marginBottom: 18 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>Email</label>
                  <input className="fi" type="email" placeholder="thomas@entreprise.fr" required value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                </div>
                <div style={{ marginBottom: 18 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>Entreprise</label>
                  <input className="fi" type="text" placeholder="Nom de votre entreprise" value={form.company}
                    onChange={e => setForm(f => ({ ...f, company: e.target.value }))} />
                </div>
                <div style={{ marginBottom: 22 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>Nombre de robots souhaités & contexte d&apos;usage</label>
                  <textarea className="ftxt" placeholder="Ex : 2 robots pour notre entrepôt logistique, tâches de manutention légère..." required value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
                </div>
                {errorMsg && (
                  <div style={{ background: 'rgba(255,51,85,.08)', border: '1px solid rgba(255,51,85,.2)', borderRadius: 10, padding: '12px 16px', fontSize: 13, color: 'var(--red)', marginBottom: 16 }}>
                    {errorMsg}
                  </div>
                )}
                <button type="submit" className="btn by blg" disabled={status === 'loading'}
                  style={{ width: '100%', justifyContent: 'center', opacity: status === 'loading' ? 0.7 : 1 }}>
                  {status === 'loading' ? 'Envoi en cours...' : 'Précommander mon robot →'}
                </button>
                <p style={{ fontSize: 12, color: 'var(--fog)', textAlign: 'center', marginTop: 10 }}>
                  Sans engagement · Tarif préférentiel garanti · Réponse sous 24&nbsp;h
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .4; } }
      `}</style>
    </>
  )
}
