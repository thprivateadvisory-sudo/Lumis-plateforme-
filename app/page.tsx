import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cohesif IA — Plateforme IA Souveraine Française | ISO 27001 · HDS · SOC 2',
  description:
    'Cohesif est la plateforme d\'intelligence artificielle souveraine française pour les grandes organisations. Agents IA autonomes, certifiée ISO 27001, HDS, SOC 2. Infrastructure 100% hébergée en France. Déployez en 48h.',
  keywords: 'IA souveraine, intelligence artificielle France, agents IA, ISO 27001, HDS, SOC 2, RGPD, grands comptes, CAC40, LLM français',
  openGraph: {
    title: 'Cohesif IA — Plateforme IA Souveraine Française',
    description:
      'Agents IA autonomes pour les grandes organisations. Certifiée ISO 27001 · HDS · SOC 2. 100% hébergé en France. SLA 99.99%.',
    url: 'https://cohesif-ia.fr',
    siteName: 'Cohesif IA',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Cohesif IA — L'IA Souveraine Française",
    description: 'Agents IA autonomes · ISO 27001 · HDS · 312K utilisateurs · SLA 99.99%',
  },
  alternates: {
    canonical: 'https://cohesif-ia.fr',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Cohesif IA',
  url: 'https://cohesif-ia.fr',
  logo: 'https://cohesif-ia.fr/logo.png',
  description:
    'Plateforme IA souveraine française. Agents autonomes, LLM propriétaires, certifiée ISO 27001, HDS, SOC 2.',
  foundingDate: '2022',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '200 rue de la Croix Nivert',
    addressLocality: 'Paris',
    addressCountry: 'FR',
  },
  sameAs: [
    'https://twitter.com/cohesifai',
    'https://linkedin.com/company/cohesifai',
  ],
}

const LOGOS = [
  { name: 'BNP Paribas' },
  { name: 'Air France' },
  { name: 'EDF' },
  { name: 'Sanofi' },
  { name: 'Carrefour' },
  { name: 'Renault' },
  { name: 'Orange' },
  { name: 'Vinci' },
  { name: 'Société Générale' },
  { name: 'AXA' },
]

const WHY_ITEMS = [
  {
    n: '01',
    title: 'Souveraineté & conformité totale',
    desc: 'Infrastructure GPU en Île-de-France, certifiée HDS, ISO 27001 et SOC 2. Aucune donnée hors UE, aucune dépendance aux hyperscalers américains. Conformité RGPD native — pas un module ajouté après coup.',
  },
  {
    n: '02',
    title: 'Déploiement en 48h, ROI en 30 jours',
    desc: 'Premier agent opérationnel en une journée. Gain moyen de productivité de 340% dès la première semaine. Intégration à vos systèmes existants (SAP, Salesforce, SharePoint) sans rupture opérationnelle.',
  },
  {
    n: '03',
    title: 'Modèles de niveau mondial, en français',
    desc: 'Cohesif Ultra surpasse GPT-4o sur les benchmarks français et tâches métier. 512K tokens de contexte, multimodal natif, raisonnement avancé. Conçu pour le droit français, la finance européenne et l\'industrie.',
  },
  {
    n: '04',
    title: 'Infrastructure conçue pour les grands comptes',
    desc: 'SLA 99.99%, latence 38ms P95, auto-scaling illimité. Déploiement on-premise ou cloud dédié isolé. 14 brevets déposés. Conçue pour scaler de 100 à 10 millions d\'utilisateurs sans interruption.',
  },
]

const TESTIMONIALS = [
  {
    quote: '"En 3 mois, nos agents Cohesif ont généré 2,4M€ de nouveau pipeline commercial. C\'est notre investissement technologique le plus rentable de l\'année, sans aucune exception."',
    initials: 'MD',
    name: 'Maxime Durand',
    role: 'CEO — ScaleX · SaaS B2B',
    metric: '2,4M€',
    metricLabel: 'pipeline généré',
  },
  {
    quote: '"Cohesif analyse nos 50 000 transactions mensuelles en 2 minutes. Avant : 2 jours, 3 personnes. On a récupéré l\'équivalent de 6 ETP par mois."',
    initials: 'CM',
    name: 'Claire Monet',
    role: 'CFO — Groupe Mercure · 80M€ CA',
    metric: '6 ETP',
    metricLabel: 'récupérés / mois',
  },
  {
    quote: '"Hébergement 100% français, certifications HDS — pour un CHU c\'est non-négociable. Cohesif est la seule plateforme IA qui répond à nos exigences de sécurité."',
    initials: 'FL',
    name: 'Dr. François Lemaire',
    role: 'CISO — CHU de Lyon',
    metric: 'HDS',
    metricLabel: 'certifié',
  },
]

const PLANS = [
  {
    name: 'Pro',
    price: '29€',
    period: '/mois',
    desc: 'Pour les équipes qui démarrent avec l\'IA.',
    cta: 'Démarrer l\'essai gratuit',
    href: '/tarifs',
    featured: false,
  },
  {
    name: 'Business',
    price: '299€',
    period: '/mois',
    desc: 'Pour les organisations en croissance.',
    cta: 'Démarrer maintenant',
    href: '/tarifs',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Sur mesure',
    period: '',
    desc: 'Pour les grands comptes et ETI.',
    cta: 'Demander un devis',
    href: '/contact',
    featured: false,
  },
]

function IconShield() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}
function IconZap() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
}
function IconCpu() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" />
      <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" />
    </svg>
  )
}
function IconBuilding() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="7" width="20" height="14" rx="1" />
      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
      <line x1="12" y1="12" x2="12" y2="12.01" />
    </svg>
  )
}

const WHY_ICONS = [IconShield, IconZap, IconCpu, IconBuilding]

function TerminalPreview() {
  return (
    <div
      style={{
        background: '#0d0d0d',
        border: '1px solid rgba(255,255,255,.1)',
        borderRadius: 14,
        overflow: 'hidden',
        fontFamily: 'var(--fm)',
        fontSize: 13,
        boxShadow: '0 32px 80px rgba(0,0,0,.6)',
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '12px 16px',
          borderBottom: '1px solid rgba(255,255,255,.07)',
          background: '#111',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', gap: 7 }}>
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57', display: 'block' }} />
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e', display: 'block' }} />
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840', display: 'block' }} />
        </div>
        <span style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', fontSize: 11, color: 'rgba(255,255,255,.4)', letterSpacing: '.05em' }}>
          Cohesif · Finance Agent
        </span>
      </div>

      <div style={{ padding: '20px 20px 0', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ background: 'rgba(11,200,240,.12)', border: '1px solid rgba(11,200,240,.2)', borderRadius: '12px 12px 2px 12px', padding: '10px 14px', fontSize: 13, color: 'rgba(255,255,255,.85)', maxWidth: '80%', lineHeight: 1.6 }}>
            Analyse nos 50 000 transactions de mars et identifie les anomalies
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
            <rect width="26" height="26" rx="7" fill="#0a1525"/>
            <g stroke="#5bbcd4" strokeWidth="1" strokeLinecap="round" opacity="0.8">
              <line x1="13" y1="4" x2="21" y2="9"/>
              <line x1="21" y1="9" x2="19" y2="20"/>
              <line x1="19" y1="20" x2="7" y2="20"/>
              <line x1="7" y1="20" x2="5" y2="9"/>
              <line x1="5" y1="9" x2="13" y2="4"/>
              <line x1="5" y1="9" x2="21" y2="9" opacity="0.5"/>
            </g>
            <circle cx="13" cy="4" r="1.5" fill="#7ec8da"/>
            <circle cx="5" cy="9" r="1.5" fill="#7ec8da"/>
            <circle cx="7" cy="20" r="1.5" fill="#7ec8da"/>
            <circle cx="19" cy="20" r="1.5" fill="#7ec8da"/>
            <circle cx="21" cy="9" r="2.2" fill="#0BC8F0"/>
          </svg>
          <div style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.08)', borderRadius: '2px 12px 12px 12px', padding: '10px 14px', fontSize: 13, color: 'rgba(255,255,255,.8)', lineHeight: 1.7, flex: 1 }}>
            Analyse terminée en <strong style={{ color: '#fff' }}>1m 48s</strong>.{' '}
            <strong style={{ color: '#fff' }}>3 anomalies détectées</strong>, dont une fraude potentielle de{' '}
            <strong style={{ color: '#0BC8F0' }}>12 400€</strong> sur le compte #FR-4829.
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, paddingBottom: 20 }}>
          {[{ val: '50K', lbl: 'transactions' }, { val: '1m48s', lbl: 'durée' }, { val: '3', lbl: 'anomalies' }].map((c) => (
            <div key={c.lbl} style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 8, padding: '8px 10px', textAlign: 'center' }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>{c.val}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,.4)', marginTop: 2, letterSpacing: '.04em' }}>{c.lbl}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '0 16px 16px', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 10, padding: '10px 12px' }}>
        <span style={{ flex: 1, fontSize: 12, color: 'rgba(255,255,255,.3)' }}>Posez une question à votre agent…</span>
        <div style={{ width: 28, height: 28, borderRadius: 7, background: '#0BC8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 10V2M2 6l4-4 4 4" stroke="#000" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── HERO ── */}
      <section id="hero">
        <div className="hbg">
          <div className="hglow" />
          <div className="hgrad" />
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.3 }} viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="g" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(11, 200, 240, 0.06)" strokeWidth="1" />
              </pattern>
              <radialGradient id="gm" cx="50%" cy="40%" r="55%">
                <stop offset="0%" stopColor="white" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </radialGradient>
              <mask id="mm"><rect width="1440" height="800" fill="url(#gm)" /></mask>
            </defs>
            <rect width="1440" height="800" fill="url(#g)" mask="url(#mm)" />
          </svg>
        </div>

        <div className="w hero-inner">
          <div className="hero-split">
            {/* Left — copy */}
            <div>
              <p style={{ fontFamily: 'var(--fm)', fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--fog)', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ display: 'inline-block', width: 24, height: 1, background: '#0BC8F0', flexShrink: 0 }} />
                IA Souveraine Française · Série B · 40M€
              </p>

              <h1 style={{ fontSize: 'clamp(2.5rem,4.5vw,4.25rem)', fontWeight: 700, lineHeight: 1.08, letterSpacing: '-.025em', color: 'var(--snow)', margin: 0 }}>
                L&apos;IA souveraine
                <br />
                <em style={{ fontStyle: 'italic', color: '#0BC8F0', fontFamily: 'var(--fi)', fontWeight: 400 }}>pour les grandes</em>
                <br />
                organisations.
              </h1>

              <p style={{ marginTop: 24, maxWidth: 440, fontSize: 16, lineHeight: 1.75, color: 'var(--fog)' }}>
                Cohesif déploie des <strong style={{ color: 'var(--snow)' }}>agents IA autonomes</strong> dans vos
                systèmes métier. Infrastructure certifiée, données hébergées en France,
                contrats adaptés aux exigences des grands comptes.
              </p>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 36 }}>
                <Link href="/contact" className="btn by">Demander une démonstration</Link>
                <Link href="/entreprises" className="btn bg">Explorer nos solutions →</Link>
              </div>

              <p style={{ marginTop: 24, fontFamily: 'var(--fm)', fontSize: 11, color: 'var(--mist)', letterSpacing: '.07em', textTransform: 'uppercase' }}>
                ISO 27001 · HDS · SOC 2 · RGPD natif · SLA 99.99%
              </p>
            </div>

            {/* Right — terminal */}
            <div className="hero-terminal">
              <TerminalPreview />
            </div>
          </div>
        </div>
      </section>

      {/* ── LOGOS ── */}
      <div style={{ borderTop: '1px solid var(--w1)', background: 'var(--deep)', padding: '28px 0', overflow: 'hidden', maskImage: 'linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)', WebkitMaskImage: 'linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)' }}>
        <p style={{ textAlign: 'center', fontSize: 11, fontFamily: 'var(--fm)', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--mist)', marginBottom: 20 }}>
          Ils font confiance à Cohesif
        </p>
        <div className="mq">
          {[...LOGOS, ...LOGOS].map((l, i) => (
            <span key={i} className="li">{l.name}</span>
          ))}
        </div>
      </div>

      {/* ── STATS BAR ── */}
      <div style={{ borderBottom: '1px solid var(--w1)', background: 'var(--panel)' }}>
        <div className="w">
          <div className="hero-stats">
            {[
              { val: '4B+', lbl: 'Tokens traités / jour' },
              { val: '312K', lbl: 'Utilisateurs actifs' },
              { val: '18M€', lbl: 'ARR · +420% YoY' },
              { val: '99.99%', lbl: 'Uptime SLA garanti' },
            ].map((s) => (
              <div key={s.lbl} style={{ padding: '28px 0', textAlign: 'center', borderRight: '1px solid var(--w1)' }}>
                <div style={{ fontSize: 'clamp(1.5rem,2.5vw,2rem)', fontWeight: 700, color: 'var(--snow)', letterSpacing: '-.02em' }}>{s.val}</div>
                <div style={{ marginTop: 4, fontSize: 11, fontFamily: 'var(--fm)', color: 'var(--mist)', letterSpacing: '.06em', textTransform: 'uppercase' }}>{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── POURQUOI Cohesif ── */}
      <section className="sec" style={{ background: 'var(--deep)' }}>
        <div className="w">
          <div className="why-layout">
            <div style={{ position: 'sticky', top: 'calc(var(--nav) + 32px)' }}>
              <div className="tag">Pourquoi Cohesif</div>
              <h2 className="h2" style={{ fontSize: 'clamp(1.6rem,3vw,2.25rem)' }}>
                L&apos;IA qui<br /><em>performe vraiment.</em>
              </h2>
              <p className="txt" style={{ marginTop: 20, lineHeight: 1.75 }}>
                Les autres vendent des chatbots. Nous livrons des résultats mesurables, contractuels et auditables dès la première semaine.
              </p>
              <div style={{ marginTop: 32 }}>
                <Link href="/contact" className="btn by bsm">Planifier un appel →</Link>
              </div>
            </div>

            <div>
              {WHY_ITEMS.map((item, i) => {
                const Icon = WHY_ICONS[i]
                return (
                  <div key={item.n} style={{ display: 'grid', gridTemplateColumns: '52px 1fr', gap: 24, padding: '36px 0', borderBottom: i < WHY_ITEMS.length - 1 ? '1px solid var(--w1)' : 'none', alignItems: 'start' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--yd)', border: '1px solid rgba(11,200,240,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--y)', flexShrink: 0 }}>
                      <Icon />
                    </div>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--snow)', marginBottom: 10 }}>{item.title}</div>
                      <div style={{ fontSize: 14, color: 'var(--fog)', lineHeight: 1.8 }}>{item.desc}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── DEMO CTA ── */}
      <section className="secm" style={{ background: 'var(--void)' }}>
        <div className="w">
          <div style={{ background: 'var(--panel)', border: '1px solid var(--w1)', borderRadius: 20, padding: '48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
            <div style={{ maxWidth: 480 }}>
              <div className="tag">Démo interactive</div>
              <h2 style={{ fontFamily: 'var(--fh)', fontSize: 'clamp(1.4rem,2.5vw,1.875rem)', fontWeight: 700, color: 'var(--snow)', lineHeight: 1.2, marginTop: 8 }}>
                Essayez Cohesif en direct.<br />
                <span style={{ color: 'var(--y)', fontFamily: 'var(--fi)', fontStyle: 'italic', fontWeight: 400 }}>Sans inscription.</span>
              </h2>
              <p style={{ marginTop: 14, fontSize: 15, color: 'var(--fog)', lineHeight: 1.7 }}>
                Posez n&apos;importe quelle question à nos agents. Voyez la différence par vous-même.
              </p>
            </div>
            <Link href="/demo" className="btn by" style={{ fontSize: 15, padding: '15px 32px', flexShrink: 0 }}>
              Accéder à la démo →
            </Link>
          </div>
        </div>
      </section>

      {/* ── TÉMOIGNAGES ── */}
      <section className="sec">
        <div className="w">
          <div className="tag">Témoignages clients</div>
          <h2 className="h2" style={{ fontSize: 'clamp(1.75rem,3.5vw,2.5rem)', marginTop: 8, marginBottom: 40 }}>
            Ils ont mesuré le résultat.
          </h2>

          <div className="g3">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} style={{ background: 'var(--panel)', border: '1px solid var(--w1)', borderRadius: 16, padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ fontSize: 'clamp(1.5rem,3vw,2.25rem)', fontWeight: 700, color: 'var(--y)', letterSpacing: '-.03em', lineHeight: 1 }}>
                  {t.metric}
                  <span style={{ display: 'block', fontSize: 11, fontFamily: 'var(--fm)', color: 'var(--mist)', letterSpacing: '.06em', textTransform: 'uppercase', marginTop: 4, fontWeight: 400 }}>{t.metricLabel}</span>
                </div>
                <p style={{ fontSize: 14, color: 'var(--fog)', lineHeight: 1.75, margin: 0, flex: 1 }}>{t.quote}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, borderTop: '1px solid var(--w1)', paddingTop: 16 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--raise)', border: '1px solid var(--w2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'var(--y)', flexShrink: 0 }}>
                    {t.initials}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--snow)', fontSize: 13 }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--mist)', marginTop: 1 }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TARIFS ── */}
      <section className="sec" style={{ background: 'var(--deep)' }}>
        <div className="w">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
            <div>
              <div className="tag">Tarifs</div>
              <h2 className="h2" style={{ fontSize: 'clamp(1.75rem,3.5vw,2.5rem)', marginTop: 8 }}>
                Transparent,<br /><em>sans surprise.</em>
              </h2>
            </div>
            <Link href="/tarifs" className="btn bg bsm">Voir tous les détails →</Link>
          </div>

          <div className="price-row">
            {PLANS.map((plan) => (
              <div key={plan.name} style={{ background: plan.featured ? 'linear-gradient(135deg,rgba(11,200,240,.06),var(--panel))' : 'var(--panel)', border: plan.featured ? '1px solid rgba(11, 200, 240, .3)' : '1px solid var(--w1)', borderRadius: 16, padding: '32px 28px', position: 'relative' }}>
                {plan.featured && (
                  <span style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'var(--y)', color: '#000', fontSize: 11, fontWeight: 700, padding: '4px 14px', borderRadius: 100, whiteSpace: 'nowrap', fontFamily: 'var(--fm)' }}>
                    Le plus populaire
                  </span>
                )}
                <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--fog)', fontFamily: 'var(--fm)', marginBottom: 12 }}>{plan.name}</div>
                <div style={{ fontFamily: 'var(--fh)', fontSize: plan.price === 'Sur mesure' ? '1.5rem' : '2.5rem', fontWeight: 800, color: 'var(--snow)', letterSpacing: '-.04em', lineHeight: 1 }}>
                  {plan.price}
                  <span style={{ fontSize: '.9rem', fontWeight: 400, color: 'var(--fog)' }}>{plan.period}</span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--fog)', marginTop: 8, marginBottom: 24, lineHeight: 1.6 }}>{plan.desc}</p>
                <Link href={plan.href} className={`btn ${plan.featured ? 'by' : 'bg'}`} style={{ width: '100%', justifyContent: 'center' }}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="sec" style={{ background: 'var(--void)' }}>
        <div className="w">
          <div className="cta-split">
            <div>
              <div className="tag">Passer à l&apos;action</div>
              <h2 className="h2" style={{ fontSize: 'clamp(2rem,4vw,3rem)', marginTop: 16 }}>
                Planifiez votre<br /><em>démonstration.</em>
              </h2>
              <p style={{ marginTop: 16, marginBottom: 32, fontSize: 15, color: 'var(--fog)', lineHeight: 1.75, maxWidth: 420 }}>
                Un expert Cohesif vous présente la plateforme adaptée à vos systèmes, vos contraintes de sécurité et vos cas d&apos;usage métier. Sans engagement.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href="/contact" className="btn by">Planifier une démonstration →</Link>
                <Link href="/entreprises" className="btn bg">Nos solutions entreprise</Link>
              </div>
              <p style={{ marginTop: 16, fontSize: 12, color: 'var(--mist)', fontFamily: 'var(--fm)', letterSpacing: '.04em' }}>
                Réponse sous 24h · Sans engagement · NDA disponible
              </p>
            </div>

            <div className="cta-num" style={{ fontFamily: 'var(--fm)', fontSize: 'clamp(5rem,10vw,9rem)', fontWeight: 700, lineHeight: 0.9, letterSpacing: '-.04em', WebkitTextStroke: '1px rgba(255,255,255,.1)', color: 'transparent', userSelect: 'none', textAlign: 'right' }}>
              312<br />000
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
