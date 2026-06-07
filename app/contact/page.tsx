'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', company: '', subject: '', message: ''
  })
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
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

  return (
    <>
      <section className="sec" style={{ paddingBottom: 60 }}>
        <div className="w">
          <div className="tag">Contact</div>
          <h1 className="h2">Parlons de votre<br /><em>projet IA.</em></h1>

          <div className="g2" style={{ gap: 52, paddingTop: 48, alignItems: 'start' }}>
            {/* Form */}
            <div style={{ background: 'var(--card)', border: '1px solid var(--w1)', borderRadius: 22, padding: 36 }}>
              {status === 'success' ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(40,200,64,.12)', border: '1px solid rgba(40,200,64,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#28c840" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>
                  <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Message envoyé !</h3>
                  <p style={{ color: 'var(--fog)', fontSize: 15, lineHeight: 1.6 }}>
                    Réponse garantie sous <strong style={{ color: 'var(--snow)' }}>4 heures ouvrées</strong>.<br />
                    Un email de confirmation a été envoyé à <strong style={{ color: 'var(--y)' }}>{form.email}</strong>.
                  </p>
                  <button onClick={() => { setStatus('idle'); setForm({ firstName:'',lastName:'',email:'',company:'',subject:'',message:'' }) }}
                    className="btn bg" style={{ marginTop: 24 }}>
                    Nouveau message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 22 }}>Envoyez-nous un message</h3>
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
                    <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>Email professionnel</label>
                    <input className="fi" type="email" placeholder="thomas@entreprise.fr" required value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                  </div>
                  <div style={{ marginBottom: 18 }}>
                    <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>Entreprise</label>
                    <input className="fi" type="text" placeholder="Nom de votre entreprise" value={form.company}
                      onChange={e => setForm(f => ({ ...f, company: e.target.value }))} />
                  </div>
                  <div style={{ marginBottom: 18 }}>
                    <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>Sujet</label>
                    <select className="fsel" required value={form.subject}
                      onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}>
                      <option value="">Choisir un sujet...</option>
                      <option>Démo Cohesif Ultra</option>
                      <option>Déploiement d&apos;agents IA</option>
                      <option>Solution Enterprise</option>
                      <option>Investissement</option>
                      <option>Partenariat</option>
                      <option>Académie &amp; Formation</option>
                      <option>Autre</option>
                    </select>
                  </div>
                  <div style={{ marginBottom: 22 }}>
                    <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>Message</label>
                    <textarea className="ftxt" placeholder="Décrivez votre projet, vos besoins..." required value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
                  </div>
                  {errorMsg && (
                    <div style={{ background: 'rgba(255,51,85,.08)', border: '1px solid rgba(255,51,85,.2)', borderRadius: 10, padding: '12px 16px', fontSize: 13, color: 'var(--red)', marginBottom: 16 }}>
                      {errorMsg}
                    </div>
                  )}
                  <button type="submit" className="btn by blg" disabled={status === 'loading'}
                    style={{ width: '100%', justifyContent: 'center', opacity: status === 'loading' ? 0.7 : 1 }}>
                    {status === 'loading' ? 'Envoi en cours...' : 'Envoyer le message →'}
                  </button>
                  <p style={{ fontSize: 12, color: 'var(--fog)', textAlign: 'center', marginTop: 10 }}>
                    Vos données sont protégées · Réponse sous 4h ouvrées
                  </p>
                </form>
              )}
            </div>

            {/* Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {[
                { iconSvg: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>', title: 'Siège social', content: '200 rue de la Croix Nivert\nParis, France' },
                { iconSvg: '<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>', title: 'Réponse rapide', content: 'Réponse garantie sous 4 heures ouvrées (lun–ven).' },
                { iconSvg: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>', title: 'Accompagnement', content: 'Audit, déploiement et suivi par notre équipe. Disponible du lundi au vendredi.' },
              ].map(card => (
                <div key={card.title} style={{ background: 'var(--card)', border: '1px solid var(--w1)', borderRadius: 16, padding: 22, display: 'flex', gap: 15, transition: 'border-color 0.2s, transform 0.2s' }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(11,200,240,0.08)', border: '1px solid rgba(11,200,240,.2)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0BC8F0' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: card.iconSvg }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{card.title}</div>
                    <div style={{ fontSize: 14, color: 'var(--fog)', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{card.content}</div>
                  </div>
                </div>
              ))}
              <Link href="/demo" className="btn by blg" style={{ justifyContent: 'center', textAlign: 'center' }}>
                Tester Cohesif gratuitement →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
