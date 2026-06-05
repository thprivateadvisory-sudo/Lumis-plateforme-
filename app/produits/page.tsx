import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Produits LUMIS.AI — Toute la puissance de l\'IA souveraine',
  description:
    'LUMIS Ultra, Agents Autonomes, Marketplace IA, API souveraine, Académie et offres Enterprise. Une plateforme complète pour transformer votre entreprise par l\'IA, hébergée 100% en France.',
  openGraph: {
    title: 'Produits LUMIS.AI — Toute la puissance de l\'IA souveraine',
    description: 'De l\'assistant premium à l\'API enterprise, découvrez tous les produits LUMIS.',
    url: 'https://lumis.ai/produits',
  },
}

/* ── SVG VISUALS ── */
const VisualUltra = () => (
  <svg width="120" height="80" viewBox="0 0 120 80" fill="none" aria-hidden="true">
    <defs>
      <radialGradient id="ug" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#d4ff00" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#d4ff00" stopOpacity="0" />
      </radialGradient>
    </defs>
    <circle cx="60" cy="40" r="38" fill="url(#ug)" />
    <circle cx="60" cy="40" r="24" stroke="#d4ff00" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="4 3" />
    <circle cx="60" cy="40" r="10" fill="#d4ff00" fillOpacity="0.15" />
    <circle cx="60" cy="40" r="4" fill="#d4ff00" />
    <line x1="60" y1="4" x2="60" y2="20" stroke="#d4ff00" strokeWidth="1.5" strokeOpacity="0.5" />
    <line x1="96" y1="22" x2="84" y2="29" stroke="#d4ff00" strokeWidth="1.5" strokeOpacity="0.5" />
    <line x1="96" y1="58" x2="84" y2="51" stroke="#d4ff00" strokeWidth="1.5" strokeOpacity="0.5" />
    <line x1="60" y1="76" x2="60" y2="60" stroke="#d4ff00" strokeWidth="1.5" strokeOpacity="0.5" />
    <line x1="24" y1="58" x2="36" y2="51" stroke="#d4ff00" strokeWidth="1.5" strokeOpacity="0.5" />
    <line x1="24" y1="22" x2="36" y2="29" stroke="#d4ff00" strokeWidth="1.5" strokeOpacity="0.5" />
    <circle cx="60" cy="4" r="2.5" fill="#d4ff00" fillOpacity="0.7" />
    <circle cx="96" cy="22" r="2.5" fill="#d4ff00" fillOpacity="0.7" />
    <circle cx="96" cy="58" r="2.5" fill="#d4ff00" fillOpacity="0.7" />
  </svg>
)

const VisualAgents = () => (
  <svg width="80" height="64" viewBox="0 0 80 64" fill="none" aria-hidden="true">
    <rect x="4" y="20" width="28" height="28" rx="8" stroke="#d4ff00" strokeWidth="1.5" strokeOpacity="0.5" />
    <rect x="48" y="20" width="28" height="28" rx="8" stroke="#d4ff00" strokeWidth="1.5" strokeOpacity="0.5" />
    <circle cx="18" cy="10" r="6" fill="#d4ff00" fillOpacity="0.2" stroke="#d4ff00" strokeWidth="1" strokeOpacity="0.5" />
    <circle cx="62" cy="10" r="6" fill="#d4ff00" fillOpacity="0.2" stroke="#d4ff00" strokeWidth="1" strokeOpacity="0.5" />
    <line x1="24" y1="16" x2="30" y2="20" stroke="#d4ff00" strokeWidth="1" strokeOpacity="0.4" />
    <line x1="56" y1="16" x2="50" y2="20" stroke="#d4ff00" strokeWidth="1" strokeOpacity="0.4" />
    <line x1="32" y1="34" x2="48" y2="34" stroke="#d4ff00" strokeWidth="1.5" strokeOpacity="0.6" strokeDasharray="3 2" />
    <circle cx="18" cy="34" r="4" fill="#d4ff00" fillOpacity="0.4" />
    <circle cx="62" cy="34" r="4" fill="#d4ff00" fillOpacity="0.4" />
    <path d="M14 55 L18 50 L22 55" stroke="#d4ff00" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />
    <path d="M58 55 L62 50 L66 55" stroke="#d4ff00" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />
  </svg>
)

const VisualMarketplace = () => (
  <svg width="80" height="64" viewBox="0 0 80 64" fill="none" aria-hidden="true">
    <rect x="6" y="8" width="20" height="20" rx="5" fill="#d4ff00" fillOpacity="0.1" stroke="#d4ff00" strokeWidth="1" strokeOpacity="0.4" />
    <rect x="30" y="8" width="20" height="20" rx="5" fill="#d4ff00" fillOpacity="0.1" stroke="#d4ff00" strokeWidth="1" strokeOpacity="0.4" />
    <rect x="54" y="8" width="20" height="20" rx="5" fill="#d4ff00" fillOpacity="0.1" stroke="#d4ff00" strokeWidth="1" strokeOpacity="0.4" />
    <rect x="6" y="36" width="20" height="20" rx="5" fill="#d4ff00" fillOpacity="0.15" stroke="#d4ff00" strokeWidth="1.5" strokeOpacity="0.6" />
    <rect x="30" y="36" width="20" height="20" rx="5" fill="#d4ff00" fillOpacity="0.1" stroke="#d4ff00" strokeWidth="1" strokeOpacity="0.4" />
    <rect x="54" y="36" width="20" height="20" rx="5" fill="#d4ff00" fillOpacity="0.1" stroke="#d4ff00" strokeWidth="1" strokeOpacity="0.4" />
    <path d="M14 44 l3 3 5-5" stroke="#d4ff00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const VisualAPI = () => (
  <svg width="80" height="64" viewBox="0 0 80 64" fill="none" aria-hidden="true">
    <rect x="4" y="12" width="72" height="40" rx="8" stroke="#d4ff00" strokeWidth="1" strokeOpacity="0.3" />
    <text x="12" y="30" fontFamily="monospace" fontSize="8" fill="#d4ff00" fillOpacity="0.7">POST /api/v2</text>
    <text x="12" y="42" fontFamily="monospace" fontSize="7" fill="#d4ff00" fillOpacity="0.4">{`{ model: "ultra" }`}</text>
    <rect x="4" y="12" width="72" height="10" rx="8" fill="#d4ff00" fillOpacity="0.05" />
    <circle cx="14" cy="17" r="2.5" fill="#d4ff00" fillOpacity="0.5" />
    <circle cx="22" cy="17" r="2.5" fill="#d4ff00" fillOpacity="0.3" />
    <circle cx="30" cy="17" r="2.5" fill="#d4ff00" fillOpacity="0.15" />
  </svg>
)

const VisualAcademie = () => (
  <svg width="80" height="64" viewBox="0 0 80 64" fill="none" aria-hidden="true">
    <path d="M40 8 L72 24 L40 40 L8 24 Z" stroke="#d4ff00" strokeWidth="1.5" strokeOpacity="0.5" fill="#d4ff00" fillOpacity="0.05" />
    <line x1="40" y1="40" x2="40" y2="56" stroke="#d4ff00" strokeWidth="1.5" strokeOpacity="0.4" />
    <line x1="28" y1="48" x2="52" y2="48" stroke="#d4ff00" strokeWidth="1.5" strokeOpacity="0.4" />
    <line x1="64" y1="30" x2="64" y2="46" stroke="#d4ff00" strokeWidth="1.5" strokeOpacity="0.5" />
    <circle cx="64" cy="48" r="3" fill="#d4ff00" fillOpacity="0.6" />
    <circle cx="40" cy="24" r="4" fill="#d4ff00" fillOpacity="0.4" />
  </svg>
)

const VisualEnterprise = () => (
  <svg width="80" height="64" viewBox="0 0 80 64" fill="none" aria-hidden="true">
    <rect x="16" y="8" width="48" height="48" rx="6" stroke="#d4ff00" strokeWidth="1" strokeOpacity="0.3" fill="none" />
    <rect x="22" y="16" width="14" height="14" rx="3" fill="#d4ff00" fillOpacity="0.1" stroke="#d4ff00" strokeWidth="1" strokeOpacity="0.5" />
    <rect x="44" y="16" width="14" height="14" rx="3" fill="#d4ff00" fillOpacity="0.1" stroke="#d4ff00" strokeWidth="1" strokeOpacity="0.5" />
    <rect x="22" y="38" width="14" height="14" rx="3" fill="#d4ff00" fillOpacity="0.1" stroke="#d4ff00" strokeWidth="1" strokeOpacity="0.5" />
    <rect x="44" y="38" width="14" height="14" rx="3" fill="#d4ff00" fillOpacity="0.1" stroke="#d4ff00" strokeWidth="1" strokeOpacity="0.5" />
    <path d="M8 40 L16 32" stroke="#d4ff00" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3 2" />
    <path d="M72 40 L64 32" stroke="#d4ff00" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3 2" />
    <circle cx="8" cy="42" r="3" fill="#d4ff00" fillOpacity="0.3" />
    <circle cx="72" cy="42" r="3" fill="#d4ff00" fillOpacity="0.3" />
  </svg>
)

/* ── PRODUCTS DATA ── */
const products = [
  {
    id: 'ultra',
    badge: 'Flagship',
    badgeColor: 'var(--y)',
    badgeText: '#000',
    title: 'LUMIS Ultra',
    subtitle: 'Assistant IA Premium',
    description:
      'L\'assistant conversationnel le plus avancé du marché français. 512K tokens de contexte, multimodal natif, raisonnement avancé. Surpasse GPT-4o sur les benchmarks métier français.',
    price: '29€',
    priceDetail: '/mois',
    cta: 'Commencer gratuitement',
    ctaHref: '/tarifs',
    ctaStyle: 'by',
    features: ['512K tokens de contexte', 'Multimodal (texte, image, PDF)', 'Mémoire persistante', 'Connecteurs natifs (Slack, Drive…)'],
    visual: <VisualUltra />,
    wide: true,
  },
  {
    id: 'agents',
    badge: 'Autonome',
    title: 'Agents Autonomes',
    subtitle: 'Marketplace d\'agents métier',
    description:
      'Des agents IA spécialisés par fonction — commercial, finance, RH, support, juridique. ROI moyen ×8 en 90 jours. Déploiement en 5 minutes.',
    price: '149€',
    priceDetail: '/agent/mois',
    cta: 'Explorer les agents',
    ctaHref: '/agents',
    ctaStyle: 'bg',
    features: ['6 agents métier prêts', 'Apprentissage continu', 'Intégration CRM/ERP'],
    visual: <VisualAgents />,
    wide: false,
  },
  {
    id: 'marketplace',
    badge: 'Écosystème',
    title: 'Marketplace IA',
    subtitle: 'Vendez & achetez des agents',
    description:
      'Publiez vos propres agents IA et monétisez votre expertise. Accédez à plus de 240 agents spécialisés créés par la communauté et nos partenaires certifiés.',
    price: 'Gratuit',
    priceDetail: '+15% commission',
    cta: 'Accéder à la marketplace',
    ctaHref: '/tarifs',
    ctaStyle: 'bg',
    features: ['240+ agents disponibles', 'Certification partenaire', 'Paiements automatisés'],
    visual: <VisualMarketplace />,
    wide: false,
  },
  {
    id: 'api',
    badge: 'Développeurs',
    title: 'LUMIS API',
    subtitle: 'Infrastructure IA souveraine',
    description:
      'API REST certifiée ISO 27001, hébergée en France. Latence 38ms P95, 99.99% uptime, 4B+ tokens/jour. Compatible OpenAI SDK. Zéro dépendance aux Big Tech.',
    price: '0,80€',
    priceDetail: '/million de tokens',
    cta: 'Lire la documentation',
    ctaHref: '/docs',
    ctaStyle: 'bg',
    features: ['Compatible OpenAI SDK', 'Latence 38ms P95', 'SLA 99.99% garanti', '14 brevets déposés'],
    visual: <VisualAPI />,
    wide: false,
  },
  {
    id: 'academie',
    badge: 'Formation',
    title: 'Académie LUMIS',
    subtitle: 'Maîtrisez l\'IA en 3 mois',
    description:
      'Parcours certifiants conçus avec des experts métier. De l\'initiation à l\'IA jusqu\'aux architectures enterprise. Certificat reconnu par 480+ entreprises partenaires.',
    price: '39€',
    priceDetail: '/mois',
    cta: 'Voir les formations',
    ctaHref: '/academie',
    ctaStyle: 'bg',
    features: ['6 parcours certifiants', 'Projets pratiques réels', 'Mentorat individuel'],
    visual: <VisualAcademie />,
    wide: false,
  },
  {
    id: 'enterprise',
    badge: 'Enterprise',
    title: 'LUMIS Enterprise',
    subtitle: 'Déploiement souverain total',
    description:
      'Infrastructure dédiée, modèles entraînés sur vos données, intégration SI complète et SLA premium. Pour les organisations qui ne peuvent pas se permettre de compromis sur la sécurité.',
    price: 'Sur devis',
    priceDetail: '',
    cta: 'Contacter les ventes',
    ctaHref: '/contact',
    ctaStyle: 'bg',
    features: ['Déploiement on-premise', 'Fine-tuning sur vos données', 'SLA dédié 99.99%', 'CSM dédié'],
    visual: <VisualEnterprise />,
    wide: false,
  },
]

export default function ProduitsPage() {
  return (
    <main>
      {/* ── HERO ── */}
      <section className="sec" style={{ paddingBottom: 0 }}>
        <div className="wm" style={{ textAlign: 'center' }}>
          <div className="tag">Produits</div>
          <h1 className="h2">
            Une plateforme complète.
            <br />
            <em>Zéro compromis.</em>
          </h1>
          <p className="lead" style={{ margin: '20px auto 0', textAlign: 'center' }}>
            De l&apos;assistant conversationnel à l&apos;infrastructure enterprise, LUMIS couvre chaque
            besoin IA de votre organisation — avec une souveraineté totale.
          </p>
        </div>
      </section>

      {/* ── BENTO GRID ── */}
      <section className="sec" style={{ paddingTop: '56px' }}>
        <div className="w">
          <div className="prd-grid">
            {products.map((p) => (
              <article
                key={p.id}
                style={{
                  background: 'var(--panel)',
                  border: p.id === 'ultra'
                    ? '1px solid rgba(212,255,0,0.25)'
                    : '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '18px',
                  padding: p.wide ? undefined : '36px 32px',
                  display: 'flex',
                  flexDirection: p.wide ? undefined : 'column',
                  gap: p.wide ? '48px' : '20px',
                  alignItems: p.wide ? undefined : 'flex-start',
                  transition: 'border-color 0.2s',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                className={`prd-card${p.wide ? ' prd-card-wide' : ''}`}
              >
                {/* Background glow for flagship */}
                {p.id === 'ultra' && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-40px',
                      right: '-40px',
                      width: '280px',
                      height: '280px',
                      background: 'radial-gradient(ellipse, rgba(212,255,0,0.07) 0%, transparent 70%)',
                      pointerEvents: 'none',
                    }}
                  />
                )}

                {/* Content */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <span
                      className="pill"
                      style={
                        p.id === 'ultra'
                          ? { background: 'var(--y)', color: '#000', borderColor: 'var(--y)', fontWeight: 700 }
                          : {}
                      }
                    >
                      {p.badge}
                    </span>
                    {p.id === 'enterprise' && (
                      <span className="pill" style={{ background: 'rgba(77,166,255,0.12)', color: '#4da6ff', borderColor: 'rgba(77,166,255,0.25)' }}>
                        Sur devis
                      </span>
                    )}
                  </div>

                  <div
                    style={{
                      fontSize: '0.75rem',
                      fontFamily: 'var(--fm)',
                      color: 'var(--fog)',
                      marginBottom: '6px',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {p.subtitle}
                  </div>

                  <h2
                    style={{
                      fontFamily: 'var(--fh)',
                      fontSize: p.wide ? 'clamp(1.8rem, 3vw, 2.5rem)' : '1.25rem',
                      fontWeight: 800,
                      letterSpacing: '-0.03em',
                      color: 'var(--snow)',
                      marginBottom: '14px',
                    }}
                  >
                    {p.title}
                  </h2>

                  <p
                    style={{
                      fontSize: '0.9rem',
                      color: 'var(--fog)',
                      lineHeight: 1.7,
                      marginBottom: '20px',
                      maxWidth: p.wide ? '480px' : undefined,
                    }}
                  >
                    {p.description}
                  </p>

                  {/* Features list */}
                  <ul
                    style={{
                      listStyle: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '7px',
                      marginBottom: '28px',
                    }}
                  >
                    {p.features.map((f) => (
                      <li
                        key={f}
                        style={{
                          fontSize: '0.85rem',
                          color: 'var(--fog)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      >
                        <span style={{ color: 'var(--y)', fontWeight: 700, flexShrink: 0 }}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Price + CTA */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                    <div>
                      <span
                        style={{
                          fontFamily: 'var(--fh)',
                          fontSize: p.wide ? '2.25rem' : '1.75rem',
                          fontWeight: 800,
                          color: 'var(--snow)',
                          letterSpacing: '-0.04em',
                        }}
                      >
                        {p.price}
                      </span>
                      {p.priceDetail && (
                        <span
                          style={{
                            fontSize: '0.85rem',
                            color: 'var(--fog)',
                            marginLeft: '4px',
                          }}
                        >
                          {p.priceDetail}
                        </span>
                      )}
                    </div>
                    <Link href={p.ctaHref} className={`btn ${p.ctaStyle}`}>
                      {p.cta} →
                    </Link>
                  </div>
                </div>

                {/* Visual */}
                <div
                  style={{
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0.9,
                  }}
                >
                  {p.visual}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section className="secm" style={{ paddingTop: '24px' }}>
        <div className="wm">
          <div
            style={{
              background: 'var(--panel)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '18px',
              padding: '40px',
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div className="tag" style={{ justifyContent: 'center' }}>Pourquoi choisir LUMIS</div>
              <h2
                style={{
                  fontFamily: 'var(--fh)',
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                }}
              >
                Conçu pour les exigences françaises
              </h2>
            </div>
            <div className="wgrid" style={{ gap: '24px' }}>
              {[
                { icon: '🇫🇷', title: 'Souveraineté totale', desc: 'Données hébergées en Île-de-France. Certifié HDS et ISO 27001. Zéro transfert hors UE.' },
                { icon: '⚡', title: 'Performance mondiale', desc: 'Latence 38ms P95. 4B+ tokens/jour. Modèles qui surpassent GPT-4o sur les benchmarks français.' },
                { icon: '🔒', title: 'RGPD natif', desc: 'Architecture privacy-by-design. DPA fourni. Registre de traitement automatisé. Conformité intégrée.' },
              ].map((item) => (
                <div key={item.title} style={{ textAlign: 'center', padding: '24px 16px' }}>
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: '12px',
                      background: 'rgba(212,255,0,0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      margin: '0 auto 16px',
                    }}
                  >
                    {item.icon}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--fh)',
                      fontWeight: 700,
                      fontSize: '1rem',
                      marginBottom: '8px',
                    }}
                  >
                    {item.title}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--fog)', lineHeight: 1.65 }}>
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="secm">
        <div className="ws" style={{ textAlign: 'center' }}>
          <h2
            style={{
              fontFamily: 'var(--fh)',
              fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              marginBottom: '12px',
            }}
          >
            Prêt à choisir votre produit ?
          </h2>
          <p className="lead" style={{ margin: '0 auto 28px', textAlign: 'center' }}>
            Commencez gratuitement. Aucune carte bancaire. Résultats mesurables en 48h.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/tarifs" className="btn by">
              Voir les tarifs →
            </Link>
            <Link href="/contact" className="btn bg">
              Parler à un expert
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
