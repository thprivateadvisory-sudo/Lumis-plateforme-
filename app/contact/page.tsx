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
                { icon: '📍', title: 'Siège social', content: '42 avenue des Champs-Élysées\n75008 Paris, France' },
                { icon: '✉️', title: 'Email', content: 'contact@cohesif.ai\ninvest@cohesif.ai' },
                { icon: '📞', title: 'Téléphone', content: '+33 1 23 45 67 89\nLun–Ven, 9h–18h' },
                { icon: '⚡', title: 'Réponse immédiate', content: 'Notre agent Sofia répond 24/7 via le chat. Réponse humaine : 4h ouvrées.' },
              ].map(card => (
                <div key={card.title} style={{ background: 'var(--card)', border: '1px solid var(--w1)', borderRadius: 16, padding: 22, display: 'flex', gap: 15 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: 'var(--yd)', border: '1px solid rgba(11,200,240,.15)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 19 }}>
                    {card.icon}
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
