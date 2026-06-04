'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

/* ── COUNTER HOOK ── */
function useCounter(target: number, duration = 2000, triggered: boolean) {
  const [value, setValue] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!triggered) return
    const start = performance.now()
    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [triggered, target, duration])

  return value
}

/* ── PORTFOLIO WIDGET (real-time fake ticker) ── */
function PortfolioWidget() {
  const [baseValue] = useState(5000)
  const [growth, setGrowth] = useState(0)
  const [history, setHistory] = useState<number[]>([5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000])

  useEffect(() => {
    const interval = setInterval(() => {
      setGrowth((prev) => {
        const delta = (Math.random() - 0.38) * 12
        return +(prev + delta).toFixed(2)
      })
      setHistory((prev) => {
        const last = prev[prev.length - 1]
        const next = last + (Math.random() - 0.38) * 8
        return [...prev.slice(1), +next.toFixed(2)]
      })
    }, 1400)
    return () => clearInterval(interval)
  }, [])

  const currentValue = baseValue + growth
  const pct = ((growth / baseValue) * 100).toFixed(2)
  const isUp = growth >= 0

  // Mini sparkline SVG
  const min = Math.min(...history)
  const max = Math.max(...history)
  const range = max - min || 1
  const points = history
    .map((v, i) => {
      const x = (i / (history.length - 1)) * 180
      const y = 36 - ((v - min) / range) * 32
      return `${x},${y}`
    })
    .join(' ')

  return (
    <div
      style={{
        background: 'var(--panel)',
        border: '1px solid rgba(212,255,0,0.2)',
        borderRadius: '18px',
        padding: '36px',
        maxWidth: '520px',
        margin: '0 auto',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <div
            style={{
              fontSize: '0.75rem',
              fontFamily: 'var(--fm)',
              color: 'var(--fog)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '6px',
            }}
          >
            Portefeuille Growth ★ simulé
          </div>
          <div
            style={{
              fontFamily: 'var(--fh)',
              fontSize: '2.5rem',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              color: 'var(--snow)',
            }}
          >
            {currentValue.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
          </div>
        </div>
        <div
          style={{
            background: isUp ? 'rgba(212,255,0,0.12)' : 'rgba(255,51,85,0.12)',
            color: isUp ? 'var(--y)' : 'var(--red)',
            border: `1px solid ${isUp ? 'rgba(212,255,0,0.25)' : 'rgba(255,51,85,0.25)'}`,
            borderRadius: '8px',
            padding: '6px 12px',
            fontFamily: 'var(--fm)',
            fontSize: '0.875rem',
            fontWeight: 600,
          }}
        >
          {isUp ? '+' : ''}{pct}%
        </div>
      </div>

      {/* Sparkline */}
      <svg
        width="100%"
        height="48"
        viewBox="0 0 180 48"
        preserveAspectRatio="none"
        style={{ display: 'block', marginBottom: '20px' }}
      >
        <defs>
          <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={isUp ? '#d4ff00' : '#ff3355'} stopOpacity="0.3" />
            <stop offset="100%" stopColor={isUp ? '#d4ff00' : '#ff3355'} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline
          points={points}
          fill="none"
          stroke={isUp ? '#d4ff00' : '#ff3355'}
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          opacity="0.8"
        />
        <polygon
          points={`0,48 ${points} 180,48`}
          fill="url(#sparkGrad)"
          opacity="0.4"
        />
      </svg>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '1px',
          background: 'rgba(255,255,255,0.07)',
          borderRadius: '10px',
          overflow: 'hidden',
        }}
      >
        {[
          { label: 'Mise initiale', value: '5 000 €' },
          { label: 'Rendement annuel', value: '+28 %' },
          { label: 'Horizon', value: '5 ans' },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              background: 'var(--card)',
              padding: '14px 16px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--fh)',
                fontSize: '1rem',
                fontWeight: 700,
                color: 'var(--snow)',
                marginBottom: '2px',
              }}
            >
              {s.value}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--fog)', fontFamily: 'var(--fm)' }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <p
        style={{
          marginTop: '16px',
          fontSize: '0.75rem',
          color: 'var(--mist)',
          fontFamily: 'var(--fm)',
          lineHeight: 1.5,
          textAlign: 'center',
        }}
      >
        * Simulation indicative. Les rendements passés ne préjugent pas des rendements futurs.
      </p>
    </div>
  )
}

/* ── STATS COUNTER ── */
function StatsSection() {
  const [triggered, setTriggered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const arr = useCounter(18, 1800, triggered)
  const users = useCounter(312, 2000, triggered)
  const margin = useCounter(82, 1600, triggered)
  const patents = useCounter(14, 1400, triggered)

  return (
    <div
      ref={ref}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1px',
        background: 'rgba(255,255,255,0.07)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '16px',
        overflow: 'hidden',
        marginBottom: '64px',
      }}
    >
      {[
        { val: `${arr}M€`, suffix: '+420% YoY', label: 'ARR' },
        { val: `${users}K`, suffix: 'utilisateurs actifs', label: 'Base clients' },
        { val: `${margin}%`, suffix: 'marge brute', label: 'Rentabilité' },
        { val: `${patents}`, suffix: 'déposés', label: 'Brevets IA' },
      ].map((s) => (
        <div
          key={s.label}
          style={{ background: 'var(--panel)', padding: '32px 28px', textAlign: 'center' }}
        >
          <div
            style={{
              fontFamily: 'var(--fh)',
              fontSize: 'clamp(1.75rem, 2.5vw, 2.5rem)',
              fontWeight: 800,
              color: 'var(--y)',
              letterSpacing: '-0.04em',
              lineHeight: 1,
            }}
          >
            {s.val}
          </div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--snow)', fontWeight: 600, marginTop: '6px' }}>
            {s.label}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--fog)', marginTop: '2px', fontFamily: 'var(--fm)' }}>
            {s.suffix}
          </div>
        </div>
      ))}
    </div>
  )
}

const PACKS = [
  {
    id: 'starter',
    name: 'Starter',
    badge: null,
    amount: '500€',
    amountDetail: 'investissement minimum',
    yield: '+18%',
    yieldDetail: 'rendement annuel cible',
    horizon: '2 ans',
    description: 'Idéal pour découvrir l\'investissement LUMIS avec un ticket accessible.',
    features: [
      'Accès aux rapports trimestriels',
      'Tableau de bord investisseur',
      'Newsletter exclusive investisseurs',
      'Liquidité partielle à 12 mois',
    ],
    cta: 'Investir maintenant',
    ctaHref: '/tarifs',
    featured: false,
  },
  {
    id: 'growth',
    name: 'Growth ★',
    badge: 'Recommandé',
    amount: '5 000€',
    amountDetail: 'investissement minimum',
    yield: '+28%',
    yieldDetail: 'rendement annuel cible',
    horizon: '5 ans',
    description: 'Notre pack vedette. Accès prioritaire aux nouvelles fonctionnalités et gouvernance.',
    features: [
      'Tout Starter inclus',
      'Droit de vote en AG',
      'Accès beta produits',
      'Call mensuel équipe fondatrice',
      'Rendement boosté garanti',
      'Priorité de liquidité',
    ],
    cta: 'Investir maintenant',
    ctaHref: '/tarifs',
    featured: true,
  },
  {
    id: 'institutionnel',
    name: 'Institutionnel',
    badge: null,
    amount: '100 000€',
    amountDetail: 'investissement minimum',
    yield: 'Négociable',
    yieldDetail: 'conditions sur mesure',
    horizon: 'Sur mesure',
    description: 'Structure dédiée pour fonds d\'investissement, family offices et investisseurs accrédités.',
    features: [
      'Tout Growth inclus',
      'Siège au conseil stratégique',
      'Data room complète',
      'Audit financier dédié',
      'Conditions de sortie personnalisées',
      'Relation banquier dédié',
    ],
    cta: 'Nous contacter',
    ctaHref: '/contact',
    featured: false,
  },
]

export default function InvestirPage() {
  return (
    <main>
      {/* ── HERO ── */}
      <section className="sec" style={{ paddingBottom: 0 }}>
        <div className="wm" style={{ textAlign: 'center' }}>
          <div className="tag">Investir dans LUMIS</div>
          <h1 className="h2">
            Rejoignez la croissance
            <br />
            <em>de l&apos;IA souveraine française.</em>
          </h1>
          <p className="lead" style={{ margin: '20px auto 0', textAlign: 'center' }}>
            18M€ ARR, +420% de croissance YoY, 82% de marge brute. LUMIS est la success story
            deeptech française de cette décennie.
          </p>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="sec" style={{ paddingTop: '64px', paddingBottom: '0' }}>
        <div className="w">
          <StatsSection />
        </div>
      </section>

      {/* ── INVESTMENT PACKS ── */}
      <section className="sec" style={{ paddingTop: '48px' }}>
        <div className="w">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div className="tag" style={{ justifyContent: 'center' }}>Packs d&apos;investissement</div>
            <h2 className="h2">
              Choisissez votre niveau
              <br />
              <em>d&apos;engagement.</em>
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '20px',
              alignItems: 'start',
            }}
          >
            {PACKS.map((pack) => (
              <article
                key={pack.id}
                style={{
                  background: pack.featured
                    ? 'linear-gradient(135deg, rgba(212,255,0,0.05) 0%, var(--panel) 60%)'
                    : 'var(--panel)',
                  border: pack.featured
                    ? '1px solid rgba(212,255,0,0.3)'
                    : '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '18px',
                  padding: '36px 32px',
                  position: 'relative',
                }}
              >
                {pack.badge && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-12px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'var(--y)',
                      color: '#000',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '4px 14px',
                      borderRadius: '100px',
                      whiteSpace: 'nowrap',
                      fontFamily: 'var(--fm)',
                    }}
                  >
                    {pack.badge}
                  </div>
                )}

                <div
                  style={{
                    fontFamily: 'var(--fm)',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    color: pack.featured ? 'var(--y)' : 'var(--fog)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: '20px',
                  }}
                >
                  {pack.name}
                </div>

                <div
                  style={{
                    fontFamily: 'var(--fh)',
                    fontSize: 'clamp(1.75rem, 2.5vw, 2.5rem)',
                    fontWeight: 800,
                    letterSpacing: '-0.04em',
                    color: 'var(--snow)',
                    lineHeight: 1,
                    marginBottom: '4px',
                  }}
                >
                  {pack.amount}
                </div>
                <div
                  style={{ fontSize: '0.8125rem', color: 'var(--fog)', marginBottom: '20px' }}
                >
                  {pack.amountDetail}
                </div>

                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'rgba(212,255,0,0.1)',
                    border: '1px solid rgba(212,255,0,0.2)',
                    borderRadius: '8px',
                    padding: '10px 16px',
                    marginBottom: '20px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--fh)',
                      fontSize: '1.5rem',
                      fontWeight: 800,
                      color: 'var(--y)',
                    }}
                  >
                    {pack.yield}
                  </span>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--fog)' }}>
                    {pack.yieldDetail}
                  </span>
                </div>

                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--fog)',
                    lineHeight: 1.65,
                    marginBottom: '24px',
                  }}
                >
                  {pack.description}
                </p>

                <div
                  style={{
                    fontSize: '0.75rem',
                    fontFamily: 'var(--fm)',
                    color: 'var(--fog)',
                    marginBottom: '6px',
                  }}
                >
                  Horizon recommandé : <strong style={{ color: 'var(--snow)' }}>{pack.horizon}</strong>
                </div>

                <ul
                  style={{
                    listStyle: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '9px',
                    marginTop: '20px',
                    marginBottom: '28px',
                    paddingTop: '20px',
                    borderTop: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  {pack.features.map((f) => (
                    <li
                      key={f}
                      style={{
                        fontSize: '0.875rem',
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

                <Link
                  href={pack.ctaHref}
                  className={`btn ${pack.featured ? 'by' : 'bg'}`}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {pack.cta} →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO SIMULATOR ── */}
      <section className="sec" style={{ background: 'var(--deep)', paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="w">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div className="tag" style={{ justifyContent: 'center' }}>Simulateur</div>
            <h2 className="h2">
              Visualisez votre
              <br />
              <em>portefeuille en temps réel.</em>
            </h2>
            <p className="lead" style={{ margin: '16px auto 0', textAlign: 'center' }}>
              Simulation basée sur nos projections de croissance. Mise à jour toutes les secondes.
            </p>
          </div>
          <PortfolioWidget />
        </div>
      </section>

      {/* ── DISCLAIMER ── */}
      <section className="secm">
        <div className="wm">
          <div
            style={{
              background: 'rgba(255,51,85,0.05)',
              border: '1px solid rgba(255,51,85,0.15)',
              borderRadius: '12px',
              padding: '24px 28px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
              }}
            >
              <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>⚠️</span>
              <div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: '0.9375rem',
                    color: 'var(--snow)',
                    marginBottom: '8px',
                  }}
                >
                  Avertissement sur les risques d&apos;investissement
                </div>
                <p
                  style={{
                    fontSize: '0.8125rem',
                    color: 'var(--fog)',
                    lineHeight: 1.7,
                  }}
                >
                  Investir comporte des risques, notamment de perte en capital. Les rendements indiqués
                  sont des projections basées sur les performances passées et les prévisions internes.
                  Les performances passées ne préjugent pas des performances futures. Tout investissement
                  doit être adapté à votre situation financière personnelle. LUMIS.AI ne fournit pas de
                  conseil en investissement. Consultez un conseiller financier agréé avant toute décision.
                  Investissement réservé aux investisseurs qualifiés conformément à la réglementation AMF.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA INSTITUTIONAL ── */}
      <section className="secm" style={{ paddingTop: 0 }}>
        <div className="ws" style={{ textAlign: 'center' }}>
          <div
            style={{
              background: 'var(--panel)',
              border: '1px solid rgba(212,255,0,0.15)',
              borderRadius: '18px',
              padding: '48px 36px',
            }}
          >
            <div className="tag" style={{ justifyContent: 'center' }}>Pack Institutionnel</div>
            <h2
              style={{
                fontFamily: 'var(--fh)',
                fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                marginBottom: '12px',
              }}
            >
              Vous êtes un investisseur institutionnel ?
            </h2>
            <p
              style={{
                fontSize: '0.9375rem',
                color: 'var(--fog)',
                lineHeight: 1.65,
                marginBottom: '28px',
                maxWidth: '440px',
                margin: '0 auto 28px',
              }}
            >
              Notre équipe vous prépare un mémorandum d&apos;investissement complet, une data room
              dédiée et des conditions négociées pour des tickets supérieurs à 100K€.
            </p>
            <Link href="/contact" className="btn by">
              Contacter l&apos;équipe investisseurs →
            </Link>
            <p
              style={{
                marginTop: '14px',
                fontSize: '0.8125rem',
                color: 'var(--mist)',
                fontFamily: 'var(--fm)',
              }}
            >
              Réponse sous 24h · NDA sur demande · Data room disponible
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
