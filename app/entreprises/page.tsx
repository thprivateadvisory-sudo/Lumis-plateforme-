import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Solutions Entreprises — LUMIS.AI | IA sur-mesure pour PME et grands comptes',
  description: 'Solutions IA sur-mesure pour PME, scale-ups et grands comptes. Déploiement accompagné, conformité RGPD garantie, ROI mesuré dès le premier mois.',
}

const SOLUTIONS = [
  { icon: '🏗️', title: 'Audit IA & Roadmap', desc: 'Analyse de vos processus, identification des opportunités IA prioritaires, plan de déploiement sur 12 mois avec ROI projeté.', cta: 'Demander un audit' },
  { icon: '🚀', title: 'Déploiement Accéléré', desc: 'Mise en production de vos agents en 2 semaines avec notre équipe d\'intégration dédiée. Formation de vos équipes incluse.', cta: 'En savoir plus' },
  { icon: '🔒', title: 'Enterprise Souverain', desc: 'Déploiement on-premise dans votre infrastructure, fine-tuning sur vos données, conformité secteur public et santé.', cta: 'Demander un devis' },
  { icon: '📊', title: 'IA Analytics', desc: 'Transformez vos données en insights actionnables. Tableaux de bord IA, prédictions, détection d\'anomalies en temps réel.', cta: 'Voir une démo' },
  { icon: '🎓', title: 'Formation Équipes', desc: 'Programmes de formation sur-mesure pour vos collaborateurs, du dirigeant au développeur. Certification interne LUMIS.', cta: 'Voir les programmes' },
  { icon: '🤝', title: 'Partenariat Revendeur', desc: 'Rejoignez notre réseau certifié. Marges attractives, leads entrants, support commercial et technique dédié.', cta: 'Devenir partenaire' },
]

const CASES = [
  { icon: '🏦', sector: 'Secteur Bancaire · 2 000 employés', result: '−78% coût traitement dossiers', desc: 'Iris Juridique analyse automatiquement 4 000 contrats de prêt par mois. Temps de traitement : de 3 jours à 2 heures.' },
  { icon: '✈️', sector: 'Transport & Logistique · 500 salariés', result: '+340% pipeline commercial', desc: 'Axel Commercial a identifié et qualifié 2 400 prospects en un mois, générant 340K€ de nouveaux contrats sans recrutement.' },
  { icon: '🏥', sector: 'Santé · CHU Régional', result: '18h économisées/médecin/mois', desc: 'LUMIS Ultra déployé pour synthèse de comptes-rendus et recherche bibliographique. Conformité HDS totale, zéro donnée exportée.' },
  { icon: '🛒', sector: 'Retail · 120 magasins', result: '4.8/5 satisfaction client', desc: 'Sofia Support gère 94% des demandes clients en autonomie sur 3 canaux. Le SAV humain traite uniquement les cas complexes.' },
]

export default function EntreprisesPage() {
  return (
    <>
      <section className="sec" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%,rgba(77,166,255,.06),transparent)', paddingBottom: 0 }}>
        <div className="wm" style={{ textAlign: 'center' }}>
          <div className="tag" style={{ justifyContent: 'center' }}>Solutions Entreprises</div>
          <h1 className="h2">L&apos;IA au service<br /><em>de votre croissance.</em></h1>
          <p className="lead" style={{ margin: '0 auto' }}>
            Solutions IA sur-mesure pour PME, scale-ups et grands comptes. Déploiement accompagné, conformité garantie, ROI mesuré.
          </p>
        </div>
      </section>

      <section className="secm">
        <div className="w">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 68 }}>
            {SOLUTIONS.map(s => (
              <div key={s.title} className="rv" style={{ background: 'var(--card)', border: '1px solid var(--w1)', borderRadius: 20, padding: 30, transition: 'all .3s', cursor: 'pointer' }}>
                <div style={{ width: 50, height: 50, borderRadius: 14, background: 'var(--yd)', border: '1px solid rgba(212,255,0,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 18 }}>
                  {s.icon}
                </div>
                <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-.02em', marginBottom: 8 }}>{s.title}</div>
                <div style={{ fontSize: 14, color: 'var(--fog)', lineHeight: 1.65, marginBottom: 18 }}>{s.desc}</div>
                <Link href="/contact" style={{ fontSize: 13, fontWeight: 700, color: 'var(--y)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5, transition: 'gap .2s' }}>
                  {s.cta} →
                </Link>
              </div>
            ))}
          </div>

          <div className="tag">Résultats concrets</div>
          <h2 className="h2" style={{ fontSize: 'clamp(28px,4vw,48px)', marginBottom: 40 }}>Ce que nos clients<br /><em>ont accompli.</em></h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
            {CASES.map(c => (
              <div key={c.sector} className="rv" style={{ background: 'var(--card)', border: '1px solid var(--w1)', borderRadius: 20, padding: 30 }}>
                <div style={{ width: 46, height: 46, borderRadius: 12, background: 'var(--raise)', border: '1px solid var(--w2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginBottom: 14 }}>
                  {c.icon}
                </div>
                <div style={{ fontSize: 12, color: 'var(--fog)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 4 }}>{c.sector}</div>
                <div style={{ fontFamily: 'var(--fh)', fontSize: 26, fontWeight: 800, letterSpacing: '-.03em', color: 'var(--y)', marginBottom: 6 }}>{c.result}</div>
                <div style={{ fontSize: 14, color: 'var(--fog)', lineHeight: 1.65 }}>{c.desc}</div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 52 }}>
            <Link href="/contact" className="btn by blg">Discuter de votre projet →</Link>
          </div>
        </div>
      </section>
    </>
  )
}
