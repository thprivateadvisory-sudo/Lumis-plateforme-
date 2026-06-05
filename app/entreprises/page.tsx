import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Solutions Entreprises — Cohesif IA | IA sur-mesure pour PME et grands comptes',
  description: 'Solutions IA sur-mesure pour PME, scale-ups et grands comptes. Déploiement accompagné, conformité RGPD garantie, ROI mesuré dès le premier mois.',
}

const SOLUTIONS = [
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/></svg>,
    title: 'Audit IA & Roadmap',
    desc: 'Analyse de vos processus, identification des opportunités IA prioritaires, plan de déploiement sur 12 mois avec ROI projeté.',
    cta: 'Demander un audit',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    title: 'Déploiement Accéléré',
    desc: "Mise en production de vos agents en 2 semaines avec notre équipe d'intégration dédiée. Formation de vos équipes incluse.",
    cta: 'En savoir plus',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
    title: 'Enterprise Souverain',
    desc: 'Déploiement on-premise dans votre infrastructure, fine-tuning sur vos données, conformité secteur public et santé.',
    cta: 'Demander un devis',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    title: 'IA Analytics',
    desc: "Transformez vos données en insights actionnables. Tableaux de bord IA, prédictions, détection d'anomalies en temps réel.",
    cta: 'Voir une démo',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
    title: 'Formation Équipes',
    desc: 'Programmes de formation sur-mesure pour vos collaborateurs, du dirigeant au développeur. Certification interne Cohesif.',
    cta: 'Voir les programmes',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    title: 'Partenariat Revendeur',
    desc: 'Rejoignez notre réseau certifié. Marges attractives, leads entrants, support commercial et technique dédié.',
    cta: 'Devenir partenaire',
  },
]

const CASES = [
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>,
    sector: 'Secteur Bancaire · 2 000 employés',
    result: '−78% coût traitement',
    desc: 'Iris Juridique analyse automatiquement 4 000 contrats de prêt par mois. Temps de traitement : de 3 jours à 2 heures.',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.9 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
    sector: 'Transport & Logistique · 500 salariés',
    result: '+340% pipeline commercial',
    desc: 'Axel Commercial a identifié et qualifié 2 400 prospects en un mois, générant 340K€ de nouveaux contrats.',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
    sector: 'Santé · CHU Régional',
    result: '18h économisées/médecin/mois',
    desc: 'Cohesif Ultra déployé pour synthèse de comptes-rendus et recherche bibliographique. Conformité HDS totale, zéro donnée exportée.',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
    sector: 'Retail · 120 magasins',
    result: '4.8/5 satisfaction client',
    desc: 'Sofia Support gère 94% des demandes clients en autonomie sur 3 canaux. Le SAV humain traite uniquement les cas complexes.',
  },
]

const TRUST_ITEMS = [
  { label: 'ISO 27001', desc: 'Sécurité certifiée' },
  { label: 'HDS', desc: 'Hébergement santé' },
  { label: 'SOC 2', desc: 'Audit tiers annuel' },
  { label: 'RGPD natif', desc: 'Données en France' },
  { label: 'SLA 99.99%', desc: 'Disponibilité garantie' },
  { label: 'On-premise', desc: 'Dans votre infra' },
]

export default function EntreprisesPage() {
  return (
    <>
      {/* HERO */}
      <section className="sec" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%,rgba(77,166,255,.08),transparent)', paddingBottom: 0 }}>
        <div className="wm" style={{ textAlign: 'center' }}>
          <div className="tag" style={{ justifyContent: 'center' }}>Solutions Entreprises</div>
          <h1 className="h2" style={{ marginTop: 12 }}>L&apos;IA au service<br /><em>de votre croissance.</em></h1>
          <p className="lead" style={{ margin: '20px auto 0' }}>
            Solutions IA sur-mesure pour PME, scale-ups et grands comptes.<br />Déploiement accompagné, conformité garantie, ROI mesuré.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 36 }}>
            <Link href="/contact" className="btn by blg">Demander une démonstration</Link>
            <Link href="/roi" className="btn bg blg">Calculer mon ROI →</Link>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div style={{ borderTop: '1px solid var(--w1)', borderBottom: '1px solid var(--w1)', background: 'var(--deep)', padding: '28px 0' }}>
        <div className="w">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 16 }} className="tgrid">
            {TRUST_ITEMS.map(t => (
              <div key={t.label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--fm)', fontSize: 13, fontWeight: 700, color: 'var(--y)', letterSpacing: '.04em' }}>{t.label}</div>
                <div style={{ fontSize: 11, color: 'var(--fog)', marginTop: 4, letterSpacing: '.04em', textTransform: 'uppercase' }}>{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SOLUTIONS */}
      <section className="sec">
        <div className="w">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="tag" style={{ justifyContent: 'center' }}>Nos services</div>
            <h2 className="h2" style={{ marginTop: 8 }}>Ce que nous déployons<br /><em>pour vous.</em></h2>
          </div>
          <div className="g3" style={{ gap: 16 }}>
            {SOLUTIONS.map(s => (
              <div key={s.title} style={{ background: 'var(--card)', border: '1px solid var(--w1)', borderRadius: 20, padding: 28, transition: 'border-color .2s' }}>
                <div style={{ width: 46, height: 46, borderRadius: 12, background: 'var(--yd)', border: '1px solid rgba(11,200,240,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--y)', marginBottom: 18 }}>
                  {s.icon}
                </div>
                <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-.02em', marginBottom: 8, color: 'var(--snow)' }}>{s.title}</div>
                <div style={{ fontSize: 14, color: 'var(--fog)', lineHeight: 1.65, marginBottom: 18 }}>{s.desc}</div>
                <Link href="/contact" style={{ fontSize: 13, fontWeight: 700, color: 'var(--y)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  {s.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASES */}
      <section className="sec" style={{ background: 'var(--deep)' }}>
        <div className="w">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="tag" style={{ justifyContent: 'center' }}>Résultats concrets</div>
            <h2 className="h2" style={{ marginTop: 8 }}>Ce que nos clients<br /><em>ont accompli.</em></h2>
          </div>
          <div className="g2" style={{ gap: 20 }}>
            {CASES.map(c => (
              <div key={c.sector} style={{ background: 'var(--panel)', border: '1px solid var(--w1)', borderRadius: 20, padding: 32 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--raise)', border: '1px solid var(--w2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--y)', marginBottom: 16 }}>
                  {c.icon}
                </div>
                <div style={{ fontSize: 11, color: 'var(--fog)', fontFamily: 'var(--fm)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 6 }}>{c.sector}</div>
                <div style={{ fontFamily: 'var(--fh)', fontSize: 'clamp(1.25rem,2.5vw,1.625rem)', fontWeight: 800, letterSpacing: '-.03em', color: 'var(--y)', marginBottom: 10, lineHeight: 1.1 }}>{c.result}</div>
                <div style={{ fontSize: 14, color: 'var(--fog)', lineHeight: 1.65 }}>{c.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 52 }}>
            <Link href="/contact" className="btn by blg">Discuter de votre projet →</Link>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="sec" style={{ background: 'var(--void)' }}>
        <div className="wm" style={{ textAlign: 'center' }}>
          <div className="tag" style={{ justifyContent: 'center' }}>Passer à l&apos;action</div>
          <h2 className="h2" style={{ marginTop: 8 }}>Prêt à transformer<br /><em>votre organisation ?</em></h2>
          <p style={{ marginTop: 16, marginBottom: 36, fontSize: 15, color: 'var(--fog)', lineHeight: 1.75 }}>
            Un expert Cohesif vous présente la plateforme adaptée à vos systèmes, vos contraintes de sécurité et vos cas d&apos;usage métier. Sans engagement.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn by blg">Demander une démonstration</Link>
            <Link href="/tarifs" className="btn bg blg">Voir les tarifs</Link>
          </div>
        </div>
      </section>
    </>
  )
}
