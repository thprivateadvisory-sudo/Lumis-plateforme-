import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Presse — LUMIS.AI | Kit presse & revue de presse',
  description: 'Dossier de presse LUMIS.AI, revue de presse, chiffres clés et contacts pour les journalistes.',
}

const COVERAGE = [
  { media: 'Le Monde', date: 'Jan 2025', headline: '« LUMIS lève 40M€ et s\'impose comme le champion de l\'IA souveraine en France »', excerpt: 'La startup parisienne confirme sa place de leader face aux géants américains avec une croissance de 420% sur douze mois...', logo: '📰' },
  { media: 'BFM Business', date: 'Déc 2024', headline: '« Ces entrepreneurs français qui veulent battre OpenAI sur son propre terrain »', excerpt: 'LUMIS.AI présente ses résultats impressionnants : 312 000 utilisateurs actifs et un ARR de 18M€ en moins de deux ans...', logo: '📺' },
  { media: 'Les Echos', date: 'Nov 2024', headline: '« L\'IA française sort du laboratoire : le cas LUMIS »', excerpt: 'Alors que la dépendance aux plateformes américaines inquiète les DSI, LUMIS propose une alternative 100% hébergée en France...', logo: '📊' },
  { media: 'TechCrunch France', date: 'Oct 2024', headline: '« LUMIS Series B: French AI startup raises €40M to challenge US giants »', excerpt: 'LUMIS, the Paris-based sovereign AI platform, has closed a €40M Series B round led by European VCs to accelerate its international expansion...', logo: '🌐' },
]

const STATS = [
  { value: '18M€', label: 'ARR actuel', sub: '+420% YoY' },
  { value: '312K', label: 'Utilisateurs actifs', sub: '+18K/mois' },
  { value: '40M€', label: 'Levée Series B', sub: '2024' },
  { value: '14', label: 'Brevets déposés', sub: 'Technologie propriétaire' },
]

export default function PressePage() {
  return (
    <>
      <section className="sec" style={{ background: 'radial-gradient(ellipse 70% 40% at 50% 0%,rgba(212,255,0,.05),transparent)', paddingBottom: 0 }}>
        <div className="wm" style={{ textAlign: 'center' }}>
          <div className="tag" style={{ justifyContent: 'center' }}>Presse</div>
          <h1 className="h2">L&apos;aventure LUMIS<br /><em>vue de l&apos;extérieur.</em></h1>
          <p className="lead" style={{ margin: '0 auto 32px' }}>
            Revue de presse, kit presse et contacts pour les journalistes et partenaires médias.
          </p>
          <a href="mailto:presse@lumis.ai" className="btn by blg">
            Contact presse : presse@lumis.ai →
          </a>
        </div>
      </section>

      {/* Key figures */}
      <section className="secm">
        <div className="w">
          <div className="tag">Chiffres clés</div>
          <h2 className="h2" style={{ fontSize: 'clamp(28px,4vw,48px)', marginBottom: 40 }}>LUMIS <em>en chiffres</em></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
            {STATS.map(s => (
              <div key={s.label} className="rv" style={{ background: 'var(--card)', border: '1px solid var(--w1)', borderRadius: 18, padding: '28px 24px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--fh)', fontSize: 40, fontWeight: 800, letterSpacing: '-.04em', color: 'var(--y)' }}>{s.value}</div>
                <div style={{ fontWeight: 600, marginTop: 6, marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: 12, color: 'var(--fog)' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="secm" style={{ background: 'var(--deep)' }}>
        <div className="w">
          <div className="tag">Revue de presse</div>
          <h2 className="h2" style={{ fontSize: 'clamp(28px,4vw,48px)', marginBottom: 40 }}>Ils parlent<br /><em>de nous.</em></h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
            {COVERAGE.map(item => (
              <div key={item.media} className="rv" style={{ background: 'var(--card)', border: '1px solid var(--w1)', borderRadius: 20, padding: 28 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <span style={{ fontSize: 28 }}>{item.logo}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{item.media}</div>
                    <div style={{ fontSize: 12, color: 'var(--fog)' }}>{item.date}</div>
                  </div>
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.4, marginBottom: 10, fontStyle: 'italic' }}>{item.headline}</div>
                <div style={{ fontSize: 13, color: 'var(--fog)', lineHeight: 1.65 }}>{item.excerpt}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press kit */}
      <section className="secm">
        <div className="w" style={{ maxWidth: 800 }}>
          <div className="tag">Kit presse</div>
          <h2 className="h2" style={{ fontSize: 'clamp(28px,4vw,48px)', marginBottom: 40 }}>Ressources pour<br /><em>les journalistes.</em></h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 40 }}>
            {[
              { icon: '📁', title: 'Dossier de presse', desc: 'Présentation complète, faits & chiffres, biographies équipe', action: 'Télécharger' },
              { icon: '🖼️', title: 'Logos & Visuels', desc: 'Logos HD, captures produit, photos équipe haute résolution', action: 'Télécharger' },
              { icon: '📊', title: 'Data Room investisseurs', desc: 'Métriques, projections financières, deck Series B', action: 'Demander accès' },
              { icon: '🎤', title: 'Interview CEO', desc: 'Demande d\'interview ou de témoignage avec nos fondateurs', action: 'Contacter' },
            ].map(r => (
              <div key={r.title} style={{ background: 'var(--card)', border: '1px solid var(--w1)', borderRadius: 16, padding: 24, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: 32, marginBottom: 14 }}>{r.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{r.title}</div>
                <div style={{ fontSize: 13, color: 'var(--fog)', lineHeight: 1.6, flex: 1, marginBottom: 16 }}>{r.desc}</div>
                <a href="mailto:presse@lumis.ai" style={{ fontSize: 13, fontWeight: 700, color: 'var(--y)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
                  {r.action} →
                </a>
              </div>
            ))}
          </div>

          <div style={{ background: 'linear-gradient(135deg,rgba(212,255,0,.06),var(--card))', border: '1px solid rgba(212,255,0,.15)', borderRadius: 20, padding: '32px 28px', textAlign: 'center' }}>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Contact presse</div>
            <p style={{ color: 'var(--fog)', marginBottom: 20 }}>
              Notre équipe relations presse répond sous 2h ouvrées.
            </p>
            <a href="mailto:presse@lumis.ai" className="btn by">presse@lumis.ai →</a>
          </div>
        </div>
      </section>
    </>
  )
}
