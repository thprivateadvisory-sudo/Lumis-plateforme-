import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'LUMIS.AI — La Plateforme IA Souveraine Française',
  description:
    'LUMIS combine assistants génératifs, agents autonomes, API souveraine et infrastructure enterprise. Données hébergées en France, RGPD natif, résultats en 48h.',
  openGraph: {
    title: 'LUMIS.AI — La Plateforme IA Souveraine Française',
    description:
      'Productivité ×3 dès la première semaine. 312K utilisateurs. 100% hébergé France.',
    url: 'https://lumis.ai',
    siteName: 'LUMIS.AI',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LUMIS.AI — L’IA Souveraine Française',
    description: '4B+ tokens/jour · 312K users · 18M€ ARR · 99.9% uptime',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'LUMIS.AI',
  url: 'https://lumis.ai',
  logo: 'https://lumis.ai/logo.png',
  description:
    'Plateforme IA souveraine française. Assistants génératifs, agents autonomes, API certifiée ISO 27001.',
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

const Logo = () => (
  <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
    <rect width="34" height="34" rx="9" fill="#d4ff00" />
    <path d="M9 25V9h4v13h8v3H9z" fill="#000" />
    <circle cx="25" cy="11" r="3" fill="#000" />
  </svg>
)

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
    icon: '🇫🇷',
    title: '100% Souverain & RGPD',
    desc: 'Infrastructure GPU en Île-de-France, certifiée HDS et ISO 27001. Aucune donnée hors UE. Aucune dépendance aux Big Tech. La souveraineté numérique n\'est pas un argument marketing — c\'est notre architecture fondamentale.',
    delay: '',
  },
  {
    n: '02',
    icon: '⚡',
    title: 'Résultats en 48 heures',
    desc: 'Déployez votre premier agent en 10 minutes. Gain moyen de productivité de 340% dès la première semaine. Des économies mesurées en euros, un ROI démontrable — pas des promesses floues.',
    delay: 'd1',
  },
  {
    n: '03',
    icon: '🧠',
    title: 'Modèles de niveau mondial',
    desc: 'LUMIS Ultra surpasse GPT-4o sur les benchmarks français et tâches métier. 512K tokens de contexte, multimodal natif, raisonnement avancé. Entraîné sur les meilleurs corpus francophones de haute qualité.',
    delay: '',
  },
  {
    n: '04',
    icon: '🏗️',
    title: 'Infrastructure enterprise',
    desc: 'SLA 99.99%, latence 38ms P95, auto-scaling sans plafond. On-premise ou cloud dédié. 14 brevets déposés. Construite pour scaler de 1 à 10 millions d\'utilisateurs sans interruption.',
    delay: 'd1',
  },
]

const TESTIMONIALS = [
  {
    stars: '★★★★★',
    quote:
      '"En 3 mois, nos agents LUMIS ont généré 2,4M€ de nouveau pipeline. C\'est notre meilleur investissement technologique de l\'année, sans aucune exception."',
    avatar: '👨‍💼',
    name: 'Maxime Durand',
    role: 'CEO — ScaleX · SaaS B2B 50 salariés',
    delay: '',
  },
  {
    stars: '★★★★★',
    quote:
      '"Léa Finance analyse nos 50 000 transactions mensuelles en 2 minutes. Avant : 2 jours, 3 personnes. LUMIS nous a rendu l\'équivalent de 6 ETP par mois."',
    avatar: '👩‍💼',
    name: 'Claire Monet',
    role: 'CFO — Groupe Mercure · PME 80M€ CA',
    delay: 'd1',
  },
  {
    stars: '★★★★★',
    quote:
      '"Hébergement 100% français, certifications HDS — pour un CHU c\'est non-négociable. LUMIS est la seule plateforme IA qui répond à nos exigences de sécurité."',
    avatar: '👨‍⚕️',
    name: 'Dr. François Lemaire',
    role: 'CISO — CHU de Lyon · Données HDS',
    delay: 'd2',
  },
]

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ── */}
      <section id="hero">
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

        <div className="hbadge">
          <div className="bdot" />
          #1 Plateforme IA Souveraine de France · Série B · 40M€
        </div>

        <h1 className="hh1">
          <span className="plain">L&apos;IA qui</span>
          <span className="outline">travaille</span>
          <span className="spark">vraiment.</span>
        </h1>

        <p className="hdesc">
          LUMIS combine <strong>assistants génératifs</strong>,{' '}
          <strong>agents autonomes</strong>, <strong>API souveraine</strong> et{' '}
          <strong>robots humanoïdes</strong>. Vos données restent en France. Vos
          résultats, eux, s&apos;envolent.
        </p>

        <div className="hctas">
          <Link href="/tarifs" className="btn by blg">
            ⚡ Essayer gratuitement
          </Link>
          <Link href="/agents" className="btn bg blg">
            Voir les agents IA →
          </Link>
        </div>

        <div className="htrust">
          <span>🔒 RGPD natif</span>
          <div className="tsep" />
          <span>🇫🇷 Hébergé en France</span>
          <div className="tsep" />
          <strong>14 jours gratuits</strong>
          <div className="tsep" />
          <span>Sans carte bancaire</span>
        </div>

        <div className="hstats w">
          <div className="hs">
            <span className="hsv">
              4<span className="y">B+</span>
            </span>
            <span className="hsl">Tokens / jour</span>
          </div>
          <div className="hs">
            <span className="hsv">
              312<span className="y">K</span>
            </span>
            <span className="hsl">Utilisateurs actifs</span>
          </div>
          <div className="hs">
            <span className="hsv">
              18<span className="y">M€</span>
            </span>
            <span className="hsl">ARR · +420% YoY</span>
          </div>
          <div className="hs">
            <span className="hsv">
              99<span className="y">.9%</span>
            </span>
            <span className="hsl">Uptime SLA</span>
          </div>
        </div>
      </section>

      {/* ── LOGOS MARQUEE ── */}
      <div className="logos">
        <p className="llbl">Ils font confiance à LUMIS</p>
        <div className="lfl" />
        <div className="lfr" />
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
          <div className="tag">Pourquoi LUMIS</div>
          <h2 className="h2">
            Vous méritez une IA
            <br />
            <em>qui performe vraiment.</em>
          </h2>
          <p className="lead">
            Les autres vendent des chatbots. Nous livrons des résultats mesurables dès la
            première semaine.
          </p>
          <div className="wgrid">
            {WHY_ITEMS.map((item) => (
              <div
                key={item.n}
                className={`wcell rv sh ${item.delay}`}
                data-n={item.n}
              >
                <div className="wic">{item.icon}</div>
                <div className="wt">{item.title}</div>
                <div className="wd">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="sec">
        <div className="w">
          <div className="tag">Témoignages</div>
          <h2 className="h2">
            Ils ont choisi LUMIS.
            <br />
            <em>Voici leurs résultats.</em>
          </h2>
          <div className="tgrid" style={{ marginTop: '48px' }}>
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className={`tc rv sh ${t.delay}`}>
                <div className="tst">{t.stars}</div>
                <div className="tq">{t.quote}</div>
                <div className="tp">
                  <div className="tav">{t.avatar}</div>
                  <div>
                    <div className="tn">{t.name}</div>
                    <div className="tt">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="sec" style={{ background: 'var(--deep)', textAlign: 'center' }}>
        <div className="ws">
          <div className="tag" style={{ justifyContent: 'center' }}>
            Prêt à commencer ?
          </div>
          <h2 className="h2" style={{ fontSize: 'clamp(36px,6vw,72px)' }}>
            312 000 équipes
            <br />
            <em>ont déjà sauté le pas.</em>
          </h2>
          <p className="lead" style={{ margin: '0 auto 40px', textAlign: 'center' }}>
            10 minutes pour déployer votre premier agent et mesurer la différence.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/tarifs" className="btn by blg">
              Démarrer gratuitement →
            </Link>
            <Link href="/contact" className="btn bg blg">
              Parler à un expert
            </Link>
          </div>
          <p style={{ marginTop: '16px', fontSize: '12px', color: 'var(--mist)' }}>
            Sans engagement · Sans carte bancaire · Annulation en 1 clic
          </p>
        </div>
      </section>
    </>
  )
}
