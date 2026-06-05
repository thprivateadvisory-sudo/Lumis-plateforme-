'use client'

import { useState } from 'react'
import Link from 'next/link'

const GUIDE_CONTENT = `Cohesif IA — Guide Gratuit
10 Automatisations IA pour PME Françaises
=========================================

1. AUTOMATISER LA PROSPECTION COMMERCIALE
   Gain : 15h/semaine | Outil : Agent Axel | ROI ×8 en 30 jours

2. RÉDUIRE LE SUPPORT CLIENT DE 80%
   Gain : 12h/semaine | Outil : Agent Sofia | ROI ×12 en 14 jours

3. GÉNÉRER LES RAPPORTS FINANCIERS AUTOMATIQUEMENT
   Gain : 6h/semaine | Outil : Agent Léa Finance | ROI ×6 en 7 jours

4. RÉDIGER 10× PLUS VITE AVEC L'IA
   Gain : 8h/semaine | Outil : Cohesif Ultra | ROI immédiat dès J+1

5. ANALYSER VOS CONTRATS EN 2 MINUTES
   Gain : 4h/semaine | Outil : Agent Iris Juridique | ROI ×15 en 30 jours

6. AUTOMATISER VOS EMAILS MARKETING
   Gain : 5h/semaine | Outil : Agent Max Marketing | +280% engagement

7. ONBOARDING RH AUTOMATISÉ
   Gain : 10h par recrutement | Outil : Agent Hugo RH | −60% time-to-hire

8. VEILLE CONCURRENTIELLE AUTOMATIQUE
   Gain : 3h/semaine | Outil : Cohesif Ultra + API web

9. BASE DE CONNAISSANCE IA
   Gain : 20h de formation/an | Outil : Cohesif RAG | ×4 vitesse onboarding

10. DEVIS ET FACTURES AUTOMATISÉS
    Gain : 6h/semaine | Outil : Cohesif Ultra + Pennylane | −78% administratif

=========================================
Pour aller plus loin : cohesif-ia.fr | contact@cohesif-ia.fr
© 2025 Cohesif SAS — Paris, France`

export default function GuidePage() {
  const [form, setForm] = useState({ name: '', email: '', company: '' })
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email) { setError('Prénom et email requis.'); return }
    setLoading(true); setError('')

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName: form.name, email: form.email, company: form.company, subject: 'Guide téléchargé', message: 'Téléchargement guide 10 automatisations IA' })
      })
    } catch { /* proceed anyway */ }

    // Download the file
    const blob = new Blob([GUIDE_CONTENT], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'Cohesif-Guide-10-Automatisations-IA.txt'
    document.body.appendChild(a); a.click()
    document.body.removeChild(a); URL.revokeObjectURL(url)

    setLoading(false); setDone(true)
  }

  return (
    <section className="sec" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%,rgba(11,200,240,.06),transparent)' }}>
      <div className="ws" style={{ textAlign: 'center' }}>
        <div className="tag" style={{ justifyContent: 'center' }}>Guide Gratuit</div>
        <h1 className="h2">10 automatisations IA<br /><em>pour PME françaises.</em></h1>
        <p className="lead" style={{ margin: '0 auto 48px' }}>
          Le guide pratique que 12&nbsp;000 dirigeants ont téléchargé. Cas concrets, outils, ROI estimé.
        </p>

        <div style={{ background: 'var(--card)', border: '1px solid rgba(11,200,240,.2)', borderRadius: 24, padding: 44, maxWidth: 560, margin: '0 auto' }}>
          {/* Preview */}
          <div style={{ background: 'var(--panel)', borderRadius: 14, padding: 20, marginBottom: 28, textAlign: 'left' }}>
            <div style={{ fontSize: 12, color: 'var(--y)', fontFamily: 'var(--fm)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 12 }}>
              Ce que vous allez découvrir :
            </div>
            {[
              'Automatiser votre prospection commerciale (−15h/sem)',
              'Réduire vos tickets support de 80% en 2 semaines',
              'Générer vos rapports financiers automatiquement',
              'Rédiger 10× plus vite avec l\'IA générative',
              'Analyser vos contrats en 2 minutes au lieu de 2h',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, marginBottom: 10 }}>
                <span style={{ color: 'var(--y)', fontWeight: 700 }}>✓</span>
                {item}
              </div>
            ))}
            <div style={{ fontSize: 13, color: 'var(--fog)', marginTop: 4 }}>+ 5 autres cas d&apos;usage concrets avec ROI estimé</div>
          </div>

          {done ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: 52, marginBottom: 16 }}>🎉</div>
              <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Guide téléchargé !</h3>
              <p style={{ fontSize: 14, color: 'var(--fog)', marginBottom: 24 }}>
                Prêt à mettre en pratique ces 10 automatisations ?
              </p>
              <Link href="/demo" className="btn by" style={{ width: '100%', justifyContent: 'center' }}>
                Tester Cohesif gratuitement →
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input className="fi" type="text" placeholder="Votre prénom" required value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={{ fontSize: 15, padding: '14px 18px' }} />
              <input className="fi" type="email" placeholder="votre@email-pro.fr" required value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={{ fontSize: 15, padding: '14px 18px' }} />
              <input className="fi" type="text" placeholder="Votre entreprise" value={form.company}
                onChange={e => setForm(f => ({ ...f, company: e.target.value }))} style={{ fontSize: 15, padding: '14px 18px' }} />
              {error && <p style={{ color: 'var(--red)', fontSize: 13 }}>{error}</p>}
              <button type="submit" className="btn by blg" disabled={loading}
                style={{ width: '100%', justifyContent: 'center', fontSize: 16 }}>
                {loading ? 'Préparation...' : '📥 Télécharger gratuitement →'}
              </button>
              <p style={{ fontSize: 12, color: 'var(--mist)', textAlign: 'center' }}>
                🔒 Aucun spam · Données hébergées en France · Désabonnement en 1 clic
              </p>
            </form>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginTop: 32, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 13, color: 'var(--fog)' }}><span style={{ color: 'var(--y)' }}>★★★★★</span> 4.9/5 — 847 avis</span>
          <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--mist)', display: 'inline-block' }} />
          <span style={{ fontSize: 13, color: 'var(--fog)' }}>📥 12&nbsp;400 téléchargements</span>
          <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--mist)', display: 'inline-block' }} />
          <span style={{ fontSize: 13, color: 'var(--fog)' }}>🇫🇷 Données hébergées en France</span>
        </div>
      </div>
    </section>
  )
}
