import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Académie Cohesif — Certifications IA pour professionnels',
  description:
    'Maîtrisez l\'IA en 3 mois avec les parcours certifiants Cohesif. Fondamentaux, Agents Autonomes, IA Enterprise, Prompt Engineering, No-Code et IA & Droit. Certificats reconnus par 480+ entreprises.',
  openGraph: {
    title: 'Académie Cohesif — Certifications IA pour professionnels',
    description: '6 parcours certifiants. 12 400+ diplômés. Maîtrisez l\'IA en 3 mois.',
    url: 'https://cohesif.ai/academie',
  },
}

const COURSES = [
  {
    emoji: '🧠',
    level: 'Débutant',
    levelColor: '#4da6ff',
    title: 'Fondamentaux IA',
    description:
      'Comprenez les bases du machine learning, des LLMs et de l\'IA générative. Aucun prérequis technique. Idéal pour décideurs, managers et consultants.',
    price: '149€',
    rating: '4.9',
    students: '8 240',
    certified: true,
    duration: '4 semaines',
    modules: 12,
  },
  {
    emoji: '🤖',
    level: 'Intermédiaire',
    levelColor: '#0BC8F0',
    title: 'Agents Autonomes',
    description:
      'Concevez, déployez et optimisez des agents IA métier. Apprenez à orchestrer plusieurs agents, gérer les mémoires et construire des pipelines automatisés.',
    price: '349€',
    rating: '4.8',
    students: '3 120',
    certified: true,
    duration: '6 semaines',
    modules: 18,
  },
  {
    emoji: '🏗️',
    level: 'Expert',
    levelColor: '#ff9500',
    title: 'IA Enterprise',
    description:
      'Architecture IA à l\'échelle d\'une organisation. RAG avancé, fine-tuning, MLOps, gouvernance et gestion des risques. Pour DSI et architectes solutions.',
    price: '1 290€',
    rating: '4.9',
    students: '840',
    certified: true,
    duration: '10 semaines',
    modules: 32,
  },
  {
    emoji: '✍️',
    level: 'Débutant',
    levelColor: '#4da6ff',
    title: 'Prompt Engineering',
    description:
      'L\'art de communiquer avec les IA. Techniques avancées de prompting, chain-of-thought, few-shot learning et optimisation des résultats pour usage professionnel.',
    price: '99€',
    rating: '4.9',
    students: '14 600',
    certified: false,
    duration: '2 semaines',
    modules: 8,
  },
  {
    emoji: '⚙️',
    level: 'Intermédiaire',
    levelColor: '#0BC8F0',
    title: 'Automatisation No-Code',
    description:
      'Automatisez vos processus métier sans coder. Connectez Cohesif à vos outils (Make, Zapier, n8n, Notion, Slack) et construisez des workflows IA puissants.',
    price: '199€',
    rating: '4.8',
    students: '5 900',
    certified: true,
    duration: '5 semaines',
    modules: 15,
  },
  {
    emoji: '⚖️',
    level: 'Avancé',
    levelColor: '#ff9500',
    title: 'IA & Droit',
    description:
      'RGPD, AI Act européen, responsabilité algorithmique et conformité. Indispensable pour DPO, juristes et toute organisation déployant de l\'IA en production.',
    price: '490€',
    rating: '4.7',
    students: '1 380',
    certified: true,
    duration: '7 semaines',
    modules: 22,
  },
]

const LEARNING_PATH = [
  {
    step: '01',
    month: 'Mois 1',
    title: 'Fondations',
    desc: 'Maîtrisez les fondamentaux de l\'IA et du prompt engineering. Comprenez les modèles, les cas d\'usage et les limites de l\'IA générative.',
    courses: ['Fondamentaux IA', 'Prompt Engineering'],
    outcome: 'Vous pouvez utiliser efficacement n\'importe quel LLM dans votre quotidien professionnel.',
  },
  {
    step: '02',
    month: 'Mois 2',
    title: 'Application',
    desc: 'Passez à la pratique. Construisez vos premiers agents autonomes et automatisez vos processus métier avec les outils no-code.',
    courses: ['Agents Autonomes', 'Automatisation No-Code'],
    outcome: 'Vous déployez des agents fonctionnels qui économisent 10h+ par semaine à votre équipe.',
  },
  {
    step: '03',
    month: 'Mois 3',
    title: 'Maîtrise',
    desc: 'Devenez le référent IA de votre organisation. Architecture enterprise, conformité légale et gouvernance des systèmes IA.',
    courses: ['IA Enterprise', 'IA & Droit'],
    outcome: 'Vous êtes certifié Cohesif Expert et capable de piloter la transformation IA de toute organisation.',
  },
]

export default function AcademiePage() {
  return (
    <main>
      {/* ── HERO ── */}
      <section className="sec" style={{ paddingBottom: 0 }}>
        <div className="wm" style={{ textAlign: 'center' }}>
          <div className="tag">Académie Cohesif</div>
          <h1 className="h2">
            Devenez expert IA
            <br />
            <em>en 3 mois.</em>
          </h1>
          <p className="lead" style={{ margin: '20px auto 40px', textAlign: 'center' }}>
            Des parcours conçus avec des professionnels pour des professionnels. Pas de théorie creuse —
            des projets réels, des certifications reconnues, des résultats mesurables.
          </p>

          {/* Social proof */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '24px',
              background: 'var(--panel)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '100px',
              padding: '12px 28px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--y)', fontSize: '0.9rem' }}>★★★★★</span>
              <span style={{ fontWeight: 700, color: 'var(--snow)', fontSize: '0.9rem' }}>4.8/5</span>
              <span style={{ fontSize: '0.8125rem', color: 'var(--fog)' }}>sur 847 avis</span>
            </div>
            <div
              style={{
                width: '1px',
                height: '20px',
                background: 'rgba(255,255,255,0.12)',
              }}
            />
            <div style={{ fontSize: '0.8125rem', color: 'var(--fog)' }}>
              <strong style={{ color: 'var(--snow)' }}>34 080</strong> apprenants formés
            </div>
            <div
              style={{
                width: '1px',
                height: '20px',
                background: 'rgba(255,255,255,0.12)',
              }}
            />
            <div style={{ fontSize: '0.8125rem', color: 'var(--fog)' }}>
              Reconnu par <strong style={{ color: 'var(--snow)' }}>480+</strong> entreprises
            </div>
          </div>
        </div>
      </section>

      {/* ── COURSES GRID ── */}
      <section className="sec" style={{ paddingTop: '64px' }}>
        <div className="w">
          <div style={{ marginBottom: '40px' }}>
            <div className="tag">Nos formations</div>
            <h2 className="h2">
              6 parcours.
              <br />
              <em>Un seul objectif : votre expertise.</em>
            </h2>
          </div>

          <div
            className="g3"
            style={{
              gap: '20px',
            }}
          >
            {COURSES.map((course) => (
              <article
                key={course.title}
                style={{
                  background: 'var(--panel)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '16px',
                  padding: '32px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'border-color 0.2s, transform 0.2s',
                }}
              >
                {/* Header */}
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: '14px',
                    background: 'rgba(11, 200, 240, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.75rem',
                    marginBottom: '20px',
                  }}
                >
                  {course.emoji}
                </div>

                {/* Level badge */}
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '3px 10px',
                      borderRadius: '100px',
                      fontSize: '0.75rem',
                      fontFamily: 'var(--fm)',
                      background: `${course.levelColor}18`,
                      color: course.levelColor,
                      border: `1px solid ${course.levelColor}30`,
                    }}
                  >
                    {course.level}
                  </span>
                  {course.certified && (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '3px 10px',
                        borderRadius: '100px',
                        fontSize: '0.75rem',
                        fontFamily: 'var(--fm)',
                        background: 'rgba(11, 200, 240, 0.08)',
                        color: 'var(--y)',
                        border: '1px solid rgba(11, 200, 240, 0.2)',
                      }}
                    >
                      🏆 Certifiant
                    </span>
                  )}
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--fh)',
                    fontSize: '1.1875rem',
                    fontWeight: 700,
                    color: 'var(--snow)',
                    marginBottom: '12px',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {course.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--fog)',
                    lineHeight: 1.7,
                    flex: 1,
                    marginBottom: '20px',
                  }}
                >
                  {course.description}
                </p>

                {/* Meta */}
                <div
                  className="g2"
                  style={{
                    gap: '8px',
                    marginBottom: '20px',
                    paddingTop: '16px',
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  {[
                    { icon: '⏱', label: course.duration },
                    { icon: '📚', label: `${course.modules} modules` },
                    { icon: '⭐', label: `${course.rating} / 5` },
                    { icon: '👥', label: `${course.students} apprenants` },
                  ].map((m) => (
                    <div
                      key={m.label}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.8125rem',
                        color: 'var(--fog)',
                      }}
                    >
                      <span style={{ fontSize: '0.75rem' }}>{m.icon}</span>
                      {m.label}
                    </div>
                  ))}
                </div>

                {/* Price + CTA */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                  <div
                    style={{
                      fontFamily: 'var(--fh)',
                      fontSize: '1.75rem',
                      fontWeight: 800,
                      letterSpacing: '-0.04em',
                      color: 'var(--snow)',
                    }}
                  >
                    {course.price}
                  </div>
                  <Link href="/tarifs" className="btn by bsm">
                    S&apos;inscrire →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEARNING PATH ── */}
      <section className="sec" style={{ background: 'var(--deep)' }}>
        <div className="w">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div className="tag" style={{ justifyContent: 'center' }}>Parcours recommandé</div>
            <h2 className="h2">
              De zéro à expert
              <br />
              <em>en 3 mois chrono.</em>
            </h2>
            <p className="lead" style={{ margin: '16px auto 0', textAlign: 'center' }}>
              Notre parcours complet combine 6 formations pour vous transformer en référent IA de votre organisation.
            </p>
          </div>

          <div
            className="g3"
            style={{
              gap: '20px',
              marginBottom: '48px',
            }}
          >
            {LEARNING_PATH.map((step, i) => (
              <div
                key={step.step}
                style={{
                  position: 'relative',
                }}
              >
                {/* Connector line */}
                {i < LEARNING_PATH.length - 1 && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '28px',
                      right: '-10px',
                      width: '20px',
                      height: '2px',
                      background: 'linear-gradient(90deg, rgba(11, 200, 240, 0.4), rgba(11, 200, 240, 0.1))',
                      zIndex: 1,
                    }}
                  />
                )}

                <div
                  style={{
                    background: 'var(--panel)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '16px',
                    padding: '32px 28px',
                    height: '100%',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: '50%',
                        background: 'rgba(11, 200, 240, 0.12)',
                        border: '2px solid rgba(11, 200, 240, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'var(--fm)',
                        fontSize: '0.875rem',
                        fontWeight: 700,
                        color: 'var(--y)',
                        flexShrink: 0,
                      }}
                    >
                      {step.step}
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: '0.75rem',
                          fontFamily: 'var(--fm)',
                          color: 'var(--fog)',
                          letterSpacing: '0.06em',
                        }}
                      >
                        {step.month}
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--fh)',
                          fontSize: '1.125rem',
                          fontWeight: 700,
                          color: 'var(--snow)',
                        }}
                      >
                        {step.title}
                      </div>
                    </div>
                  </div>

                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--fog)',
                      lineHeight: 1.65,
                      marginBottom: '16px',
                    }}
                  >
                    {step.desc}
                  </p>

                  <div style={{ marginBottom: '16px' }}>
                    {step.courses.map((c) => (
                      <span
                        key={c}
                        style={{
                          display: 'inline-block',
                          margin: '3px 4px 3px 0',
                          padding: '3px 10px',
                          borderRadius: '100px',
                          background: 'rgba(11, 200, 240, 0.06)',
                          border: '1px solid rgba(11, 200, 240, 0.15)',
                          color: 'var(--y)',
                          fontSize: '0.75rem',
                          fontFamily: 'var(--fm)',
                        }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>

                  <div
                    style={{
                      background: 'rgba(11, 200, 240, 0.05)',
                      borderLeft: '3px solid rgba(11, 200, 240, 0.4)',
                      borderRadius: '0 6px 6px 0',
                      padding: '10px 14px',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '0.75rem',
                        fontFamily: 'var(--fm)',
                        color: 'var(--y)',
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        marginBottom: '4px',
                      }}
                    >
                      Résultat
                    </div>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--fog)', lineHeight: 1.55 }}>
                      {step.outcome}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Parcours complet CTA */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(11, 200, 240, 0.08) 0%, var(--panel) 100%)',
              border: '1px solid rgba(11, 200, 240, 0.25)',
              borderRadius: '18px',
              padding: '44px 48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '32px',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <div className="tag">Offre groupée</div>
              <h3
                style={{
                  fontFamily: 'var(--fh)',
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  marginBottom: '8px',
                }}
              >
                Parcours Complet Cohesif Expert
              </h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--fog)', maxWidth: '480px' }}>
                Les 6 formations incluses. Économisez 678€ par rapport aux cours séparés.
                Certificat Expert reconnu par 480+ partenaires.
              </p>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginTop: '16px',
                  flexWrap: 'wrap',
                }}
              >
                <span
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--fog)',
                    textDecoration: 'line-through',
                  }}
                >
                  1 377€
                </span>
                <span
                  style={{
                    fontFamily: 'var(--fh)',
                    fontSize: '2rem',
                    fontWeight: 800,
                    color: 'var(--y)',
                    letterSpacing: '-0.04em',
                  }}
                >
                  699€
                </span>
                <span className="pill">−49%</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
              <Link href="/tarifs" className="btn by">
                S&apos;inscrire au parcours complet →
              </Link>
              <p
                style={{
                  fontSize: '0.8125rem',
                  color: 'var(--mist)',
                  fontFamily: 'var(--fm)',
                  textAlign: 'center',
                }}
              >
                Accès à vie · Certificat inclus · Mentorat 1-1
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── INSTRUCTORS TRUST ── */}
      <section className="secm">
        <div className="wm" style={{ textAlign: 'center' }}>
          <div className="tag" style={{ justifyContent: 'center' }}>Pédagogie</div>
          <h2
            style={{
              fontFamily: 'var(--fh)',
              fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              marginBottom: '16px',
            }}
          >
            Appris par des praticiens.
            <br />
            <em>Enseigné par des experts.</em>
          </h2>
          <p className="lead" style={{ margin: '0 auto 40px', textAlign: 'center' }}>
            Nos instructeurs sont des professionnels actifs qui utilisent l&apos;IA quotidiennement dans
            des contextes réels. Chaque cours est mis à jour tous les 3 mois.
          </p>
          <div
            className="g4"
            style={{
              gap: '16px',
            }}
          >
            {[
              { initials: 'CM', name: 'Claire Marchand', role: 'Directrice Transformation Digitale, Orange', course: 'IA Enterprise' },
              { initials: 'LG', name: 'Laurent Girard', role: 'Responsable Conformité, Société Générale', course: 'Fondamentaux' },
              { initials: 'NB', name: 'Nadia Benali', role: 'Avocate droit du numérique, Cabinet Clifford Chance', course: 'IA & Droit' },
              { initials: 'SR', name: 'Sébastien Roux', role: 'DSI, Groupe Léa Nature', course: 'Agents Autonomes' },
            ].map((inst) => (
              <div
                key={inst.name}
                style={{
                  background: 'var(--panel)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '14px',
                  padding: '24px 20px',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(11,200,240,.25), rgba(11,200,240,.08))',
                    border: '1px solid rgba(11,200,240,.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px',
                    fontFamily: 'var(--fh)',
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    color: 'var(--y)',
                    letterSpacing: '.02em',
                  }}
                >
                  {inst.initials}
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--snow)', marginBottom: '4px' }}>
                  {inst.name}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--fog)', marginBottom: '8px', lineHeight: 1.4 }}>
                  {inst.role}
                </div>
                <span className="pill" style={{ fontSize: '0.7rem', padding: '2px 8px' }}>
                  {inst.course}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
