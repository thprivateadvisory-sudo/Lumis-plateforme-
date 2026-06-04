import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'LUMIS.AI — La Plateforme IA Souveraine Française',
  description:
    'LUMIS combine assistants génératifs, agents autonomes et API souveraine pour les grandes organisations françaises. Certifiée ISO 27001, HDS, SOC 2. Infrastructure 100% hébergée en France.',
  openGraph: {
    title: 'LUMIS.AI — La Plateforme IA Souveraine Française',
    description:
      'Infrastructure IA certifiée ISO 27001 · HDS · SOC 2. 312K utilisateurs. 100% hébergé en France.',
    url: 'https://lumis.ai',
    siteName: 'LUMIS.AI',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "LUMIS.AI — L'IA Souveraine Française",
    description: '4B+ tokens/jour · 312K utilisateurs · 18M€ ARR · SLA 99.99%',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'LUMIS.AI',
  url: 'https://lumis.ai',
  logo: 'https://lumis.ai/logo.png',
  description:
    'Plateforme IA souveraine française. Assistants génératifs, agents autonomes, API certifiée ISO 27001, HDS, SOC 2.',
  foundingDate: '2022',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '42 avenue des Champs-Élysées',
    addressLocality: 'Paris',
    postalCode: '75008',
    addressCountry: 'FR',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+33-1-23-45-67-89',
    contactType: 'customer service',
    availableLanguage: 'French',
  },
  sameAs: [
    'https://twitter.com/lumisai',
    'https://linkedin.com/company/lumisai',
  ],
}

const LOGOS = [
  {
    name: 'BNP Paribas',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18">
        <rect width="18" height="18" rx="4" fill="rgba(255,255,255,.2)" />
        <text x="9" y="13" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="currentColor" fontFamily="sans-serif">BNP</text>
      </svg>
    ),
  },
  {
    name: 'Air France',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M5 9h8M9 5v8" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    name: 'EDF',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
        <path d="M9 1.5L2.5 6v10h5v-5h3v5h5V6L9 1.5z" />
      </svg>
    ),
  },
  {
    name: 'Sanofi',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
        <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <circle cx="9" cy="9" r="2.5" />
      </svg>
    ),
  },
  {
    name: 'Carrefour',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
        <rect x="2" y="2" width="6" height="6" rx="1" />
        <rect x="10" y="2" width="6" height="6" rx="1" />
        <rect x="2" y="10" width="6" height="6" rx="1" />
        <rect x="10" y="10" width="6" height="6" rx="1" />
      </svg>
    ),
  },
  {
    name: 'Renault',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
        <path d="M9 1.5l2.2 4.5h4.8l-3.9 2.8 1.5 4.6L9 10.6l-4.6 2.8 1.5-4.6L1.8 6h4.8z" />
      </svg>
    ),
  },
  {
    name: 'Orange',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
        <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M6.5 9l2 2 3-3.5" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Vinci',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M3 14l4-7 3.5 3.5 2.5-5 3 8.5H3z" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
  },
]

const WHY_ITEMS = [
  {
    n: '01',
    title: 'Souveraineté & conformité totale',
    desc: 'Infrastructure GPU en Île-de-France, certifiée HDS, ISO 27001 et SOC 2. Aucune donnée hors UE, aucune dépendance aux hyperscalers américains. Nos SLA contractuels garantissent votre conformité RGPD de manière native — pas comme un module ajouté après coup.',
    delay: '',
  },
  {
    n: '02',
    title: 'Déploiement en 48 heures, ROI en 30 jours',
    desc: 'Premier agent opérationnel en une journée. Gain moyen de productivité mesuré à 340% dès la première semaine. Nos équipes Customer Success assurent l\'intégration à vos systèmes existants (SAP, Salesforce, SharePoint) sans rupture opérationnelle.',
    delay: 'd1',
  },
  {
    n: '03',
    title: 'Modèles de niveau mondial, en français',
    desc: 'LUMIS Ultra surpasse GPT-4o sur les benchmarks français et tâches métier critiques. 512K tokens de contexte natif, multimodal, raisonnement avancé. Entraîné sur les meilleurs corpus francophones — conçu pour comprendre le droit français, la finance européenne, le secteur industriel.',
    delay: '',
  },
  {
    n: '04',
    title: 'Infrastructure conçue pour les grandes organisations',
    desc: 'SLA 99.99%, latence 38ms P95, auto-scaling sans plafond. Déploiement on-premise sur votre datacenter ou cloud dédié isolé. 14 brevets déposés. Construite pour scaler de 100 à 10 millions d\'utilisateurs sans interruption de service ni renégociation tarifaire.',
    delay: 'd1',
  },
]

const TESTIMONIALS = [
  {
    stars: '★★★★★',
    quote:
      '"En 3 mois, nos agents LUMIS ont généré 2,4M€ de nouveau pipeline commercial. C\'est notre investissement technologique le plus rentable de l\'année, sans aucune exception."',
    initials: 'MD',
    name: 'Maxime Durand',
    role: 'CEO — ScaleX · SaaS B2B 50 salariés',
    delay: '',
  },
  {
    stars: '★★★★★',
    quote:
      '"Léa Finance analyse nos 50 000 transactions mensuelles en 2 minutes. Avant : 2 jours, 3 personnes. LUMIS nous a rendu l\'équivalent de 6 ETP par mois."',
    initials: 'CM',
    name: 'Claire Monet',
    role: 'CFO — Groupe Mercure · PME 80M€ CA',
    delay: 'd1',
  },
  {
    stars: '★★★★★',
    quote:
      '"Hébergement 100% français, certifications HDS — pour un CHU c\'est non-négociable. LUMIS est la seule plateforme IA qui répond à nos exigences de sécurité et de souveraineté."',
    initials: 'FL',
    name: 'Dr. François Lemaire',
    role: 'CISO — CHU de Lyon · Données HDS',
    delay: 'd2',
  },
]

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
      }}
    >
      {/* Title bar */}
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
        <div style={{ display: 'flex', gap: 7, flexShrink: 0 }}>
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57', display: 'inline-block' }} />
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e', display: 'inline-block' }} />
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840', display: 'inline-block' }} />
        </div>
        <span
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 11,
            color: 'rgba(255,255,255,.4)',
            letterSpacing: '.05em',
            whiteSpace: 'nowrap',
          }}
        >
          LUMIS · Finance Analyst
        </span>
      </div>

      {/* Chat body */}
      <div style={{ padding: '24px 20px 0', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* User message */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div
            style={{
              background: 'rgba(212,255,0,.12)',
              border: '1px solid rgba(212,255,0,.2)',
              borderRadius: '12px 12px 2px 12px',
              padding: '10px 14px',
              fontSize: 13,
              color: 'rgba(255,255,255,.85)',
              maxWidth: '82%',
              lineHeight: 1.6,
            }}
          >
            Analyse nos 50 000 transactions de mars et identifie les anomalies
          </div>
        </div>

        {/* LUMIS response */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <div style={{ flexShrink: 0 }}>
            <svg width="27" height="27" viewBox="0 0 27 27" fill="none">
              <rect width="27" height="27" rx="7" fill="#d4ff00" />
              <path d="M7 20V7h3v10h6v3H7z" fill="#000" />
              <circle cx="20" cy="9" r="2.5" fill="#000" />
            </svg>
          </div>
          <div
            style={{
              background: 'rgba(255,255,255,.05)',
              border: '1px solid rgba(255,255,255,.08)',
              borderRadius: '2px 12px 12px 12px',
              padding: '10px 14px',
              fontSize: 13,
              color: 'rgba(255,255,255,.8)',
              lineHeight: 1.7,
              flex: 1,
            }}
          >
            Analyse terminée en{' '}
            <strong style={{ color: '#fff' }}>1m 48s</strong>.{' '}
            <strong style={{ color: '#fff' }}>3 anomalies détectées</strong>, dont une fraude
            potentielle de{' '}
            <strong style={{ color: '#d4ff00' }}>12 400€</strong> sur le compte #FR-4829.
          </div>
        </div>

        {/* Metric chips */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginTop: 4 }}>
          {[
            { val: '50K', lbl: 'transactions' },
            { val: '1m48s', lbl: 'durée' },
            { val: '3', lbl: 'anomalies' },
          ].map((chip) => (
            <div
              key={chip.lbl}
              style={{
                background: 'rgba(255,255,255,.04)',
                border: '1px solid rgba(255,255,255,.08)',
                borderRadius: 8,
                padding: '8px 10px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>{chip.val}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,.4)', marginTop: 2, letterSpacing: '.04em' }}>
                {chip.lbl}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          margin: '20px 16px 16px',
          background: 'rgba(255,255,255,.05)',
          border: '1px solid rgba(255,255,255,.1)',
          borderRadius: 10,
          padding: '10px 12px',
        }}
      >
        <span style={{ flex: 1, fontSize: 12, color: 'rgba(255,255,255,.3)' }}>
          Posez une question à votre agent…
        </span>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 7,
            background: '#d4ff00',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 10V2M2 6l4-4 4 4" stroke="#000" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  )
}

function InitialsAvatar({ initials }: { initials: string }) {
  return (
    <div
      style={{
        width: 36,
        height: 36,
        borderRadius: '50%',
        background: 'var(--raise)',
        border: '1px solid var(--w2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 13,
        fontWeight: 700,
        color: 'var(--y)',
        flexShrink: 0,
        fontFamily: 'var(--fh)',
        letterSpacing: '-.01em',
      }}
    >
      {initials}
    </div>
  )
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ── */}
      <section id="hero" style={{ paddingLeft: 0, paddingRight: 0 }}>
        <div className="hbg">
          <svg
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.4 }}
            viewBox="0 0 1440 800"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <pattern id="g" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(212,255,0,0.07)" strokeWidth="1" />
              </pattern>
              <radialGradient id="gm" cx="50%" cy="40%" r="55%">
                <stop offset="0%" stopColor="white" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </radialGradient>
              <mask id="mm">
                <rect width="1440" height="800" fill="url(#gm)" />
              </mask>
            </defs>
            <rect width="1440" height="800" fill="url(#g)" mask="url(#mm)" />
            <circle cx="720" cy="400" r="3" fill="rgba(212,255,0,.4)" />
            <circle cx="360" cy="200" r="2" fill="rgba(212,255,0,.2)" />
            <circle cx="1080" cy="200" r="2" fill="rgba(212,255,0,.2)" />
            <circle cx="360" cy="600" r="2" fill="rgba(212,255,0,.2)" />
            <circle cx="1080" cy="600" r="2" fill="rgba(212,255,0,.2)" />
          </svg>
          <div className="hglow" />
          <div className="hgrad" />
        </div>

        <div className="w">
          <div className="hero-split">
            {/* Left column — copy */}
            <div>
              <p
                style={{
                  fontFamily: 'var(--fm)',
                  fontSize: 11,
                  letterSpacing: '.1em',
                  textTransform: 'uppercase',
                  color: 'var(--fog)',
                  marginBottom: 28,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: 24,
                    height: 1,
                    background: '#d4ff00',
                    flexShrink: 0,
                  }}
                />
                IA Souveraine Française · Série B · 40M€
              </p>

              <h1
                style={{
                  fontSize: 'clamp(2.75rem,5vw,4.75rem)',
                  fontWeight: 700,
                  lineHeight: 1.05,
                  letterSpacing: '-.025em',
                  color: 'var(--snow)',
                  margin: 0,
                }}
              >
                L&apos;IA souveraine
                <br />
                <em style={{ fontStyle: 'italic', color: '#d4ff00', fontFamily: 'var(--fi)', fontWeight: 400 }}>
                  pour les grandes
                </em>
                <br />
                organisations.
              </h1>

              <p
                style={{
                  marginTop: 24,
                  maxWidth: 420,
                  fontSize: 16,
                  lineHeight: 1.75,
                  color: 'var(--fog)',
                }}
              >
                LUMIS déploie des <strong style={{ color: 'var(--snow)' }}>agents IA autonomes</strong> dans vos
                systèmes métier. Infrastructure certifiée, données hébergées en France, contrats
                adaptés aux exigences des grands comptes.
              </p>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 36 }}>
                <Link href="/contact" className="btn by">
                  Demander une démonstration
                </Link>
                <Link href="/entreprises" className="btn bg">
                  Explorer nos solutions →
                </Link>
              </div>

              <p
                style={{
                  marginTop: 24,
                  fontFamily: 'var(--fm)',
                  fontSize: 11,
                  color: 'var(--mist)',
                  letterSpacing: '.06em',
                  textTransform: 'uppercase',
                }}
              >
                ISO 27001 · HDS · SOC 2 · RGPD natif · SLA 99.99%
              </p>
            </div>

            {/* Right column — terminal */}
            <div className="hero-terminal">
              <TerminalPreview />
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div
        style={{
          borderTop: '1px solid var(--w1)',
          borderBottom: '1px solid var(--w1)',
          background: 'var(--panel)',
        }}
      >
        <div className="hero-stats w">
          {[
            { val: '4B+', lbl: 'Tokens / jour' },
            { val: '312K', lbl: 'Utilisateurs actifs' },
            { val: '18M€', lbl: 'ARR · +420% YoY' },
            { val: '99.99%', lbl: 'Uptime SLA garanti' },
          ].map((stat) => (
            <div
              key={stat.lbl}
              style={{ padding: '28px 0', textAlign: 'center' }}
            >
              <div
                style={{
                  fontSize: 'clamp(1.5rem,2.5vw,2rem)',
                  fontWeight: 700,
                  color: 'var(--snow)',
                  letterSpacing: '-.02em',
                }}
              >
                {stat.val}
              </div>
              <div
                style={{
                  marginTop: 4,
                  fontSize: 11,
                  fontFamily: 'var(--fm)',
                  color: 'var(--mist)',
                  letterSpacing: '.06em',
                  textTransform: 'uppercase',
                }}
              >
                {stat.lbl}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── LOGOS MARQUEE ── */}
      <div className="logos">
        <p
          style={{
            textAlign: 'center',
            fontSize: 11,
            fontFamily: 'var(--fm)',
            letterSpacing: '.1em',
            textTransform: 'uppercase',
            color: 'var(--mist)',
            marginBottom: 20,
          }}
        >
          Ils font confiance à LUMIS
        </p>
        <div className="mq">
          {[...LOGOS, ...LOGOS].map((logo, i) => (
            <span key={i} className="li">
              {logo.icon}
              {logo.name}
            </span>
          ))}
        </div>
      </div>

      {/* ── POURQUOI LUMIS ── */}
      <section className="sec" style={{ background: 'var(--deep)' }}>
        <div className="w">
          <div className="why-layout">
            {/* Left — sticky */}
            <div style={{ position: 'sticky', top: 'calc(var(--nav) + 32px)' }}>
              <div className="tag">Pourquoi LUMIS</div>
              <h2 className="h2" style={{ fontSize: 'clamp(1.6rem,3vw,2.25rem)' }}>
                L&apos;IA qui
                <br />
                <em>performe vraiment.</em>
              </h2>
              <p className="txt" style={{ marginTop: 20, lineHeight: 1.75 }}>
                Les autres vendent des chatbots. Nous livrons des résultats mesurables dès la
                première semaine — contractuels, auditables, garantis.
              </p>
              <div style={{ marginTop: 32 }}>
                <Link href="/contact" className="btn by bsm">
                  Planifier un appel →
                </Link>
              </div>
            </div>

            {/* Right — numbered list */}
            <div>
              {WHY_ITEMS.map((item, i) => (
                <div
                  key={item.n}
                  className={`rv ${item.delay}`}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '52px 1fr',
                    gap: 28,
                    padding: '36px 0',
                    borderBottom:
                      i < WHY_ITEMS.length - 1 ? '1px solid var(--w1)' : 'none',
                    alignItems: 'start',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--fm)',
                      fontSize: 11,
                      color: 'var(--mist)',
                      letterSpacing: '.08em',
                      paddingTop: 4,
                    }}
                  >
                    {item.n}
                  </span>
                  <div>
                    <div
                      style={{
                        fontSize: 17,
                        fontWeight: 700,
                        color: 'var(--snow)',
                        marginBottom: 10,
                      }}
                    >
                      {item.title}
                    </div>
                    <div style={{ fontSize: 14, color: 'var(--fog)', lineHeight: 1.8 }}>
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TÉMOIGNAGES ── */}
      <section className="sec">
        <div className="w">
          {/* Featured testimonial */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 180px',
              alignItems: 'end',
              borderBottom: '1px solid var(--w1)',
              paddingBottom: 48,
              gap: 40,
            }}
          >
            <div>
              <div className="tag">Témoignages clients</div>
              <blockquote
                style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontStyle: 'italic',
                  fontSize: 'clamp(1.15rem,2.5vw,1.55rem)',
                  color: 'var(--snow)',
                  lineHeight: 1.55,
                  margin: '20px 0 24px',
                  padding: 0,
                  border: 'none',
                }}
              >
                {TESTIMONIALS[0].quote}
              </blockquote>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  fontSize: 13,
                  color: 'var(--fog)',
                }}
              >
                <InitialsAvatar initials={TESTIMONIALS[0].initials} />
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--snow)' }}>{TESTIMONIALS[0].name}</div>
                  <div style={{ marginTop: 2 }}>{TESTIMONIALS[0].role}</div>
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div
                style={{
                  fontSize: 'clamp(2.5rem,5vw,3.75rem)',
                  fontWeight: 700,
                  color: '#d4ff00',
                  lineHeight: 1,
                  letterSpacing: '-.03em',
                }}
              >
                2,4M€
              </div>
              <div
                style={{
                  marginTop: 8,
                  fontSize: 11,
                  fontFamily: 'var(--fm)',
                  color: 'var(--mist)',
                  letterSpacing: '.06em',
                  textTransform: 'uppercase',
                  lineHeight: 1.6,
                }}
              >
                nouveau pipeline
                <br />
                en 3 mois
              </div>
            </div>
          </div>

          {/* Secondary testimonials */}
          <div className="testi-2" style={{ marginTop: 40 }}>
            {TESTIMONIALS.slice(1).map((t) => (
              <div
                key={t.name}
                style={{
                  background: 'var(--panel)',
                  border: '1px solid var(--w1)',
                  borderRadius: 14,
                  padding: '28px 28px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 20,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: 16,
                  }}
                >
                  <p
                    style={{
                      fontSize: 14,
                      color: 'var(--fog)',
                      lineHeight: 1.75,
                      margin: 0,
                      flex: 1,
                    }}
                  >
                    {t.quote}
                  </p>
                  <div
                    style={{
                      fontSize: 'clamp(1.1rem,2vw,1.4rem)',
                      fontWeight: 700,
                      color: '#d4ff00',
                      flexShrink: 0,
                      letterSpacing: '-.02em',
                    }}
                  >
                    {t.name === 'Claire Monet' ? '6 ETP' : 'HDS'}
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    fontSize: 12,
                    color: 'var(--mist)',
                    borderTop: '1px solid var(--w1)',
                    paddingTop: 16,
                  }}
                >
                  <InitialsAvatar initials={t.initials} />
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--snow)', fontSize: 13 }}>
                      {t.name}
                    </div>
                    <div style={{ marginTop: 1 }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="sec" style={{ background: 'var(--deep)' }}>
        <div className="w">
          <div className="cta-split">
            {/* Left — copy */}
            <div>
              <div className="tag">Passer à l&apos;action</div>
              <h2
                className="h2"
                style={{ fontSize: 'clamp(2rem,4vw,3rem)', marginTop: 16 }}
              >
                Planifiez votre
                <br />
                <em>démonstration.</em>
              </h2>
              <p
                style={{
                  marginTop: 16,
                  marginBottom: 32,
                  fontSize: 15,
                  color: 'var(--fog)',
                  lineHeight: 1.75,
                  maxWidth: 400,
                }}
              >
                Un expert LUMIS vous présente la plateforme adaptée à votre contexte, vos
                contraintes de sécurité et vos cas d&apos;usage métier. Sans engagement.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href="/contact" className="btn by">
                  Planifier une démonstration →
                </Link>
                <Link href="/entreprises" className="btn bg">
                  Nos solutions entreprise
                </Link>
              </div>
              <p
                style={{
                  marginTop: 16,
                  fontSize: 12,
                  color: 'var(--mist)',
                  fontFamily: 'var(--fm)',
                  letterSpacing: '.04em',
                }}
              >
                Réponse sous 24h · Sans engagement · NDA disponible
              </p>
            </div>

            {/* Right — decorative number */}
            <div
              className="cta-num"
              style={{
                fontFamily: 'var(--fm)',
                fontSize: 'clamp(5rem,10vw,9rem)',
                fontWeight: 700,
                lineHeight: 0.9,
                letterSpacing: '-.04em',
                WebkitTextStroke: '1px rgba(255,255,255,.1)',
                color: 'transparent',
                userSelect: 'none',
                textAlign: 'right',
              }}
            >
              312
              <br />
              000
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
