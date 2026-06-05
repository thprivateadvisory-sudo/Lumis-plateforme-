'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'

interface ROIResult {
  annualSavings: number
  hoursFree: number
  monthlyCost: number
  roiMultiple: number
  paybackDays: number
  breakdown: {
    label: string
    value: number
    color: string
  }[]
}

function calcROI(
  teamSize: number,
  salary: number,
  repetitivePct: number,
  numAgents: number
): ROIResult {
  const hourlyRate = salary / 1800 // ~1800 working hours/year
  const weeklyHours = 40
  const weeksPerYear = 48

  // Hours freed by AI (60% efficiency gain on repetitive tasks)
  const repetitiveHoursPerYear = teamSize * weeklyHours * weeksPerYear * (repetitivePct / 100)
  const hoursFreePerYear = repetitiveHoursPerYear * 0.60

  // Annual savings
  const laborSavings = hoursFreePerYear * hourlyRate
  const agentProductivity = numAgents * 12000 // €12K/agent/year average extra revenue
  const annualSavings = Math.round(laborSavings + agentProductivity)

  // Monthly Cohesif cost (Business plan per agent + team seats)
  const planCost = teamSize <= 5 ? 29 : teamSize <= 20 ? 149 : 149 + (teamSize - 20) * 8
  const monthlyCost = Math.round(planCost + numAgents * 49)

  // ROI multiple
  const annualCost = monthlyCost * 12
  const roiMultiple = annualCost > 0 ? Math.round((annualSavings / annualCost) * 10) / 10 : 0

  // Payback in days
  const dailySavings = annualSavings / 365
  const paybackDays = dailySavings > 0 ? Math.round(monthlyCost / dailySavings) : 999

  // Breakdown
  const breakdown = [
    { label: 'Temps économisé', value: Math.round(laborSavings), color: '#0BC8F0' },
    { label: 'Productivité agents', value: Math.round(agentProductivity), color: '#4da6ff' },
    { label: 'Réduction erreurs', value: Math.round(teamSize * salary * 0.02), color: '#22c55e' },
    { label: 'Onboarding accéléré', value: Math.round(teamSize * 1200), color: '#f59e0b' },
  ]

  return {
    annualSavings,
    hoursFree: Math.round(hoursFreePerYear),
    monthlyCost,
    roiMultiple,
    paybackDays,
    breakdown,
  }
}

function useAnimatedNumber(target: number, duration = 600) {
  const [displayed, setDisplayed] = useState(target)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef({ value: target, time: 0 })

  useEffect(() => {
    const start = startRef.current.value
    const startTime = performance.now()
    startRef.current = { value: displayed, time: startTime }

    if (rafRef.current) cancelAnimationFrame(rafRef.current)

    const animate = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayed(Math.round(start + (target - start) * eased))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration])

  return displayed
}

function formatEur(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M€`
  if (n >= 1000) return `${Math.round(n / 1000)}K€`
  return `${n}€`
}

interface SliderProps {
  label: string
  value: number
  min: number
  max: number
  step?: number
  format: (v: number) => string
  onChange: (v: number) => void
  accent?: string
}

function Slider({ label, value, min, max, step = 1, format, onChange, accent = '#0BC8F0' }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div style={{ marginBottom: '28px' }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        marginBottom: '10px', alignItems: 'baseline',
      }}>
        <span style={{ fontSize: '14px', color: 'var(--fog)', fontWeight: 500 }}>{label}</span>
        <span style={{
          fontFamily: 'var(--fh)', fontSize: '22px', fontWeight: 800,
          color: accent, letterSpacing: '-.03em',
        }}>
          {format(value)}
        </span>
      </div>
      <div style={{ position: 'relative', height: '6px' }}>
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '100px',
          background: 'rgba(255,255,255,.08)',
        }} />
        <div style={{
          position: 'absolute', left: 0, top: 0, height: '100%',
          width: `${pct}%`, borderRadius: '100px',
          background: `linear-gradient(90deg, ${accent}88, ${accent})`,
          transition: 'width .1s',
        }} />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            opacity: 0, cursor: 'pointer', margin: 0,
          }}
        />
        <div style={{
          position: 'absolute', top: '50%', left: `${pct}%`,
          transform: 'translate(-50%, -50%)',
          width: '18px', height: '18px', borderRadius: '50%',
          background: accent, boxShadow: `0 0 0 3px rgba(0,0,0,.8), 0 0 12px ${accent}55`,
          pointerEvents: 'none', transition: 'left .1s',
        }} />
      </div>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        marginTop: '6px', fontSize: '11px', color: 'var(--mist)',
      }}>
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  )
}

export default function ROIPage() {
  const [teamSize, setTeamSize] = useState(5)
  const [salary, setSalary] = useState(45000)
  const [repetitivePct, setRepetitivePct] = useState(30)
  const [numAgents, setNumAgents] = useState(2)

  const result = calcROI(teamSize, salary, repetitivePct, numAgents)

  const animatedSavings = useAnimatedNumber(result.annualSavings)
  const animatedHours = useAnimatedNumber(result.hoursFree)
  const animatedCost = useAnimatedNumber(result.monthlyCost)
  const animatedROI = useAnimatedNumber(Math.round(result.roiMultiple * 10))
  const animatedPayback = useAnimatedNumber(result.paybackDays)

  const maxBreakdown = Math.max(...result.breakdown.map((b) => b.value))

  return (
    <div style={{ paddingTop: 'var(--nav)', background: 'var(--void)', minHeight: '100vh' }}>

      {/* ── HEADER ── */}
      <section className="sec" style={{ paddingBottom: '64px' }}>
        <div className="w" style={{ textAlign: 'center' }}>
          <div className="tag" style={{ justifyContent: 'center' }}>Calculateur ROI</div>
          <h1 className="h2">
            Calculez vos économies
            <br />
            <em>avec Cohesif.</em>
          </h1>
          <p className="lead" style={{ margin: '0 auto', textAlign: 'center' }}>
            Ajustez les paramètres ci-dessous et voyez en temps réel le retour sur
            investissement que Cohesif génère pour votre organisation.
          </p>
        </div>
      </section>

      {/* ── CALCULATOR ── */}
      <section style={{ padding: '0 0 120px' }}>
        <div className="w">
          <div className="g2" style={{
            gap: '32px',
            alignItems: 'start',
          }}>

            {/* LEFT — Sliders */}
            <div style={{
              background: 'var(--card)',
              border: '1px solid rgba(255,255,255,.07)',
              borderRadius: '24px',
              padding: '36px',
            }}>
              <h2 style={{
                fontFamily: 'var(--fh)', fontSize: '20px', fontWeight: 800,
                letterSpacing: '-.03em', marginBottom: '32px',
              }}>
                Votre organisation
              </h2>

              <Slider
                label="Taille de l'équipe"
                value={teamSize}
                min={1}
                max={50}
                format={(v) => `${v} pers.`}
                onChange={setTeamSize}
                accent="#0BC8F0"
              />

              <Slider
                label="Salaire moyen annuel brut"
                value={salary}
                min={25000}
                max={120000}
                step={1000}
                format={(v) => `${Math.round(v / 1000)}K€`}
                onChange={setSalary}
                accent="#4da6ff"
              />

              <Slider
                label="% tâches répétitives automatisables"
                value={repetitivePct}
                min={10}
                max={80}
                step={5}
                format={(v) => `${v}%`}
                onChange={setRepetitivePct}
                accent="#22c55e"
              />

              <Slider
                label="Nombre d'agents IA déployés"
                value={numAgents}
                min={1}
                max={10}
                format={(v) => `${v} agent${v > 1 ? 's' : ''}`}
                onChange={setNumAgents}
                accent="#f59e0b"
              />

              {/* Quick presets */}
              <div style={{ marginTop: '8px' }}>
                <div style={{ fontSize: '12px', color: 'var(--fog)', marginBottom: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em' }}>
                  Profils types
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {[
                    { label: 'Startup', team: 5, sal: 42000, rep: 25, ag: 2 },
                    { label: 'PME', team: 20, sal: 48000, rep: 35, ag: 4 },
                    { label: 'ETI', team: 50, sal: 55000, rep: 40, ag: 8 },
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => {
                        setTeamSize(preset.team)
                        setSalary(preset.sal)
                        setRepetitivePct(preset.rep)
                        setNumAgents(preset.ag)
                      }}
                      style={{
                        padding: '6px 16px',
                        borderRadius: '100px',
                        border: '1px solid rgba(255,255,255,.1)',
                        background: 'transparent',
                        color: 'var(--fog)',
                        fontFamily: 'var(--fh)',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all .2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(11, 200, 240, .3)'
                        e.currentTarget.style.color = 'var(--y)'
                        e.currentTarget.style.background = 'rgba(11, 200, 240, .05)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,.1)'
                        e.currentTarget.style.color = 'var(--fog)'
                        e.currentTarget.style.background = 'transparent'
                      }}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT — Results */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* Main metric */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(11,200,240,.08) 0%, var(--card) 60%)',
                border: '1px solid rgba(11, 200, 240, .25)',
                borderRadius: '24px',
                padding: '36px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '13px', color: 'var(--y)', fontFamily: 'var(--fm)', letterSpacing: '.1em', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Économies annuelles estimées
                </div>
                <div style={{
                  fontFamily: 'var(--fh)', fontSize: 'clamp(48px, 8vw, 72px)',
                  fontWeight: 800, letterSpacing: '-.05em', color: 'var(--y)',
                  lineHeight: 1,
                }}>
                  {formatEur(animatedSavings)}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--fog)', marginTop: '8px' }}>
                  par an · ROI ×{(animatedROI / 10).toFixed(1)} · Retour en {animatedPayback} jours
                </div>
              </div>

              {/* KPI grid */}
              <div className="g2" style={{ gap: '12px' }}>
                {[
                  { label: 'Heures libérées/an', value: animatedHours.toLocaleString('fr'), unit: 'h', color: '#4da6ff', icon: '⏱' },
                  { label: 'Coût Cohesif/mois', value: animatedCost.toLocaleString('fr'), unit: '€', color: '#f59e0b', icon: '💳' },
                  { label: 'Retour sur invest.', value: `×${(animatedROI / 10).toFixed(1)}`, unit: '', color: '#0BC8F0', icon: '📈' },
                  { label: 'Retour en', value: animatedPayback, unit: ' jours', color: '#22c55e', icon: '🚀' },
                ].map((kpi) => (
                  <div key={kpi.label} style={{
                    background: 'var(--card)',
                    border: '1px solid rgba(255,255,255,.07)',
                    borderRadius: '16px',
                    padding: '20px',
                  }}>
                    <div style={{ fontSize: '20px', marginBottom: '6px' }}>{kpi.icon}</div>
                    <div style={{
                      fontFamily: 'var(--fh)', fontSize: '28px', fontWeight: 800,
                      letterSpacing: '-.04em', color: kpi.color,
                    }}>
                      {kpi.value}{kpi.unit}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--fog)', marginTop: '3px' }}>
                      {kpi.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Breakdown bar chart */}
              <div style={{
                background: 'var(--card)',
                border: '1px solid rgba(255,255,255,.07)',
                borderRadius: '20px',
                padding: '24px',
              }}>
                <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '20px', letterSpacing: '-.01em' }}>
                  Répartition des économies
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {result.breakdown.map((item) => (
                    <div key={item.label}>
                      <div style={{
                        display: 'flex', justifyContent: 'space-between',
                        marginBottom: '6px', fontSize: '13px',
                      }}>
                        <span style={{ color: 'var(--fog)' }}>{item.label}</span>
                        <span style={{ fontWeight: 700, color: item.color }}>
                          {formatEur(item.value)}
                        </span>
                      </div>
                      <div style={{
                        height: '8px', borderRadius: '100px',
                        background: 'rgba(255,255,255,.06)', overflow: 'hidden',
                      }}>
                        <div style={{
                          height: '100%',
                          width: maxBreakdown > 0 ? `${(item.value / maxBreakdown) * 100}%` : '0%',
                          background: item.color,
                          borderRadius: '100px',
                          transition: 'width .6s cubic-bezier(.16,1,.3,1)',
                          opacity: .85,
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
                <p style={{
                  fontSize: '11px', color: 'var(--mist)',
                  marginTop: '16px', lineHeight: 1.6,
                }}>
                  * Estimation basée sur des moyennes sectorielles. Vos résultats réels
                  dépendent de votre contexte spécifique.
                </p>
              </div>

              {/* CTA */}
              <div style={{
                background: 'var(--card)',
                border: '1px solid rgba(11,200,240,.2)',
                borderRadius: '20px',
                padding: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                flexWrap: 'wrap',
              }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '16px', marginBottom: '4px', letterSpacing: '-.02em' }}>
                    Prêt à réaliser ces économies ?
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--fog)' }}>
                    Démarrez gratuitement, sans carte bancaire.
                  </div>
                </div>
                <Link href="/tarifs" className="btn by">
                  Voir les plans →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── METHODOLOGY ── */}
      <section className="sec" style={{ background: 'var(--deep)' }}>
        <div className="wm">
          <div className="tag">Méthodologie</div>
          <h2 className="h2">
            Comment nous
            <br />
            <em>calculons le ROI</em>
          </h2>
          <div className="g2" style={{
            gap: '20px', marginTop: '40px',
          }}>
            {[
              {
                icon: '⏱',
                title: 'Temps libéré',
                desc: 'Cohesif automatise 60% des tâches répétitives identifiées. Calculé sur la base du taux horaire moyen et du nombre d\'heures par an.',
              },
              {
                icon: '🤖',
                title: 'Productivité agents',
                desc: 'Chaque agent IA déployé génère en moyenne 12 000€ de valeur annuelle (pipeline commercial, analyses, contenus).',
              },
              {
                icon: '✅',
                title: 'Réduction des erreurs',
                desc: 'Les erreurs humaines sur tâches répétitives représentent en moyenne 2% du coût salarial. L\'IA les réduit de 85%.',
              },
              {
                icon: '🎓',
                title: 'Onboarding accéléré',
                desc: 'Les nouvelles recrues sont opérationnelles 40% plus vite grâce aux agents de formation et base de connaissance IA.',
              },
            ].map((item) => (
              <div key={item.title} style={{
                background: 'var(--card)',
                border: '1px solid rgba(255,255,255,.07)',
                borderRadius: '16px',
                padding: '24px',
              }}>
                <div style={{ fontSize: '28px', marginBottom: '10px' }}>{item.icon}</div>
                <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '8px' }}>{item.title}</div>
                <div style={{ fontSize: '14px', color: 'var(--fog)', lineHeight: 1.7 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="sec" style={{ textAlign: 'center' }}>
        <div className="ws">
          <div className="tag" style={{ justifyContent: 'center' }}>Prêt à commencer ?</div>
          <h2 className="h2">
            Transformez ce calcul
            <br />
            <em>en réalité.</em>
          </h2>
          <p className="lead" style={{ margin: '0 auto 36px', textAlign: 'center' }}>
            Déployez votre premier agent en 10 minutes. Résultats dès la première semaine.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/tarifs" className="btn by blg">
              Démarrer gratuitement →
            </Link>
            <Link href="/demo" className="btn bg blg">
              Essayer la démo
            </Link>
          </div>
          <p style={{ marginTop: '16px', fontSize: '12px', color: 'var(--mist)' }}>
            14 jours gratuits · Sans carte bancaire · Annulation en 1 clic
          </p>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .roi-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
