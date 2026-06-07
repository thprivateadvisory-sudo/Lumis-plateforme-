import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Académie Cohesif — Certifications IA pour professionnels',
  description:
    "Maîtrisez l'IA en 3 mois avec les parcours certifiants Cohesif. Fondamentaux, Agents Autonomes, IA Enterprise, Prompt Engineering, No-Code et IA & Droit. Certificats reconnus par 480+ entreprises.",
  openGraph: {
    title: 'Académie Cohesif — Certifications IA pour professionnels',
    description: "6 parcours certifiants. 34 080+ diplômés. Maîtrisez l'IA en 3 mois.",
    url: 'https://cohesif-ia.fr/academie',
  },
}

// ── SVG icons ──────────────────────────────────────────────────────────────

function IcNetwork() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="2.5"/>
      <circle cx="4" cy="19" r="2.5"/>
      <circle cx="20" cy="19" r="2.5"/>
      <circle cx="12" cy="13" r="2.5"/>
      <line x1="12" y1="7.5" x2="12" y2="10.5"/>
      <line x1="10.1" y1="14.6" x2="5.9" y2="17.4"/>
      <line x1="13.9" y1="14.6" x2="18.1" y2="17.4"/>
    </svg>
  )
}

function IcCycle() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
      <polyline points="21 3 21 9 15 9"/>
    </svg>
  )
}

function IcLayers() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/>
      <line x1="12" y1="22" x2="12" y2="15.5"/>
      <polyline points="22 8.5 12 15.5 2 8.5"/>
    </svg>
  )
}

function IcTerminal() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5"/>
      <line x1="12" y1="19" x2="20" y2="19"/>
    </svg>
  )
}

function IcShare() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3"/>
      <circle cx="6" cy="12" r="3"/>
      <circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  )
}

function IcShield() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  )
}

function IcCheck() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}

function IcArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  )
}

// ── Data ──────────────────────────────────────────────────────────────────

type CourseIcon = () => JSX.Element

const COURSES: Array<{
  num: string
  Icon: CourseIcon
  level: string
  levelColor: string
  title: string
  description: string
  price: string
  rating: string
  students: string
  certified: boolean
  duration: string
  modules: number
}> = [
  {
    num: '01',
    Icon: IcNetwork,
    level: 'Débutant',
    levelColor: '#4da6ff',
    title: 'Fondamentaux IA',
    description:
      "Comprenez les bases du machine learning, des LLMs et de l'IA générative. Aucun prérequis technique. Idéal pour décideurs, managers et consultants.",
    price: '149€',
    rating: '4.9',
    students: '8 240',
    certified: true,
    duration: '4 semaines',
    modules: 12,
  },
  {
    num: '02',
    Icon: IcCycle,
    level: 'Intermédiaire',
    levelColor: '#0BC8F0',
    title: 'Agents Autonomes',
    description:
      "Concevez, déployez et optimisez des agents IA métier. Orchestrez plusieurs agents, gérez les mémoires et construisez des pipelines automatisés.",
    price: '349€',
    rating: '4.8',
    students: '3 120',
    certified: true,
    duration: '6 semaines',
    modules: 18,
  },
  {
    num: '03',
    Icon: IcLayers,
    level: 'Expert',
    levelColor: '#ff9500',
    title: 'IA Enterprise',
    description:
      "Architecture IA à l'échelle d'une organisation. RAG avancé, fine-tuning, MLOps, gouvernance et gestion des risques. Pour DSI et architectes solutions.",
    price: '1 290€',
    rating: '4.9',
    students: '840',
    certified: true,
    duration: '10 semaines',
    modules: 32,
  },
  {
    num: '04',
    Icon: IcTerminal,
    level: 'Débutant',
    levelColor: '#4da6ff',
    title: 'Prompt Engineering',
    description:
      "L'art de communiquer avec les IA. Techniques avancées de prompting, chain-of-thought, few-shot learning et optimisation des résultats pour usage professionnel.",
    price: '99€',
    rating: '4.9',
    students: '14 600',
    certified: false,
    duration: '2 semaines',
    modules: 8,
  },
  {
    num: '05',
    Icon: IcShare,
    level: 'Intermédiaire',
    levelColor: '#0BC8F0',
    title: 'Automatisation No-Code',
    description:
      "Automatisez vos processus métier sans coder. Connectez Cohesif à vos outils (Make, Zapier, n8n, Notion, Slack) et construisez des workflows IA puissants.",
    price: '199€',
    rating: '4.8',
    students: '5 900',
    certified: true,
    duration: '5 semaines',
    modules: 15,
  },
  {
    num: '06',
    Icon: IcShield,
    level: 'Avancé',
    levelColor: '#ff9500',
    title: 'IA & Droit',
    description:
      "RGPD, AI Act européen, responsabilité algorithmique et conformité. Indispensable pour DPO, juristes et toute organisation déployant de l'IA en production.",
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
    desc: "Maîtrisez les fondamentaux de l'IA et du prompt engineering. Comprenez les modèles, les cas d'usage et les limites de l'IA générative.",
    courses: ['Fondamentaux IA', 'Prompt Engineering'],
    outcome: "Vous pouvez utiliser efficacement n'importe quel LLM dans votre quotidien professionnel.",
  },
  {
    step: '02',
    month: 'Mois 2',
    title: 'Application',
    desc: "Passez à la pratique. Construisez vos premiers agents autonomes et automatisez vos processus métier avec les outils no-code.",
    courses: ['Agents Autonomes', 'Automatisation No-Code'],
    outcome: "Vous déployez des agents fonctionnels qui économisent 10h+ par semaine à votre équipe.",
  },
  {
    step: '03',
    month: 'Mois 3',
    title: 'Maîtrise',
    desc: "Devenez le référent IA de votre organisation. Architecture enterprise, conformité légale et gouvernance des systèmes IA.",
    courses: ['IA Enterprise', 'IA & Droit'],
    outcome: "Vous êtes certifié Cohesif Expert et capable de piloter la transformation IA de toute organisation.",
  },
]

const METHOD = [
  {
    num: '01',
    title: 'Projets réels',
    desc: "Chaque module s'appuie sur un cas concret issu du terrain. Vous repartez avec des livrables utilisables dès le lendemain.",
  },
  {
    num: '02',
    title: 'Contenu actualisé',
    desc: "Le marché IA évolue toutes les semaines. Nos formations sont révisées tous les 3 mois par nos instructeurs actifs en entreprise.",
  },
  {
    num: '03',
    title: 'Mentorat inclus',
    desc: "Chaque apprenant est accompagné par un praticien certifié. Sessions individuelles, retours sur projets, déblocage sous 24h.",
  },
  {
    num: '04',
    title: 'Réseau professionnel',
    desc: "Accès à la communauté de 34 000+ alumni actifs et aux entreprises partenaires qui recrutent des profils certifiés Cohesif.",
  },
]

// ── Page ──────────────────────────────────────────────────────────────────

export default function AcademiePage() {
  return (
    <main>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section
        className="sec"
        style={{
          paddingBottom: 0,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '-160px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '900px',
            height: '600px',
            background:
              'radial-gradient(ellipse at center, rgba(11,200,240,0.065) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />

        <div className="wm" style={{ textAlign: 'center', position: 'relative' }}>
          <div className="tag">Académie Cohesif</div>
          <h1 className="h2">
            Devenez expert IA
            <br />
            <em>en 3 mois.</em>
          </h1>
          <p
            className="lead"
            style={{ margin: '20px auto 36px', textAlign: 'center', maxWidth: '560px' }}
          >
            Des parcours conçus avec des professionnels pour des professionnels. Pas de théorie
            creuse — des projets réels, des certifications reconnues, des résultats mesurables.
          </p>

          <div
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '56px',
            }}
          >
            <Link href="#formations" className="btn by">
              Voir les formations
            </Link>
            <Link
              href="/contact"
              className="btn"
              style={{
                background: 'var(--panel)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'var(--snow)',
              }}
            >
              Parler à un conseiller
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS BAND ──────────────────────────────────────────────────── */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          background: 'var(--deep)',
        }}
      >
        <div className="w">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
            }}
          >
            {[
              { value: '34 080', label: 'professionnels formés' },
              { value: '480+', label: 'entreprises partenaires' },
              { value: '4.8 / 5', label: 'satisfaction moyenne' },
              { value: '93 %', label: 'taux de recommandation' },
            ].map((s, i) => (
              <div
                key={s.label}
                style={{
                  padding: '32px 24px',
                  borderRight:
                    i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--fh)',
                    fontSize: 'clamp(1.375rem, 2vw, 1.875rem)',
                    fontWeight: 800,
                    letterSpacing: '-0.04em',
                    color: 'var(--snow)',
                    lineHeight: 1,
                    marginBottom: '6px',
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--fog)',
                    fontFamily: 'var(--fm)',
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── COURSES GRID ────────────────────────────────────────────────── */}
      <section className="sec" id="formations">
        <div className="w">
          <div style={{ marginBottom: '48px' }}>
            <div className="tag">Nos formations</div>
            <h2 className="h2">
              6 parcours.
              <br />
              <em>Un seul objectif : votre expertise.</em>
            </h2>
          </div>

          <div className="g3" style={{ gap: '16px' }}>
            {COURSES.map((course) => (
              <article
                key={course.title}
                style={{
                  background: 'var(--panel)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '14px',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'border-color 0.2s',
                }}
              >
                {/* Top accent line */}
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: `linear-gradient(90deg, ${course.levelColor}70 0%, transparent 70%)`,
                  }}
                />

                {/* Icon + course number */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '20px',
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '10px',
                      background: `${course.levelColor}14`,
                      border: `1px solid ${course.levelColor}28`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: course.levelColor,
                      flexShrink: 0,
                    }}
                  >
                    <course.Icon />
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--fm)',
                      fontSize: '0.75rem',
                      color: 'var(--mist)',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {course.num}
                  </span>
                </div>

                {/* Badges */}
                <div
                  style={{
                    display: 'flex',
                    gap: '6px',
                    flexWrap: 'wrap',
                    marginBottom: '12px',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '3px 10px',
                      borderRadius: '100px',
                      fontSize: '0.7rem',
                      fontFamily: 'var(--fm)',
                      background: `${course.levelColor}14`,
                      color: course.levelColor,
                      border: `1px solid ${course.levelColor}28`,
                      letterSpacing: '0.03em',
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
                        fontSize: '0.7rem',
                        fontFamily: 'var(--fm)',
                        background: 'rgba(11,200,240,0.07)',
                        color: 'var(--y)',
                        border: '1px solid rgba(11,200,240,0.18)',
                        letterSpacing: '0.03em',
                      }}
                    >
                      <IcCheck />
                      Certifiant
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: 'var(--fh)',
                    fontSize: '1.0625rem',
                    fontWeight: 700,
                    color: 'var(--snow)',
                    marginBottom: '10px',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {course.title}
                </h3>

                {/* Description */}
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
                  style={{
                    fontSize: '0.775rem',
                    color: 'var(--mist)',
                    fontFamily: 'var(--fm)',
                    marginBottom: '20px',
                    paddingTop: '16px',
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex',
                    gap: '5px',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    letterSpacing: '0.01em',
                  }}
                >
                  <span>{course.duration}</span>
                  <span style={{ color: 'var(--raise)', userSelect: 'none' }}>·</span>
                  <span>{course.modules} modules</span>
                  <span style={{ color: 'var(--raise)', userSelect: 'none' }}>·</span>
                  <span style={{ color: 'var(--fog)' }}>{course.rating} / 5</span>
                  <span style={{ color: 'var(--raise)', userSelect: 'none' }}>·</span>
                  <span>{course.students} apprenants</span>
                </div>

                {/* Price + CTA */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--fh)',
                      fontSize: '1.625rem',
                      fontWeight: 800,
                      letterSpacing: '-0.04em',
                      color: 'var(--snow)',
                    }}
                  >
                    {course.price}
                  </div>
                  <Link href="/tarifs" className="btn by bsm">
                    S&apos;inscrire
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── MÉTHODE ─────────────────────────────────────────────────────── */}
      <section
        style={{
          background: 'var(--deep)',
          padding: '80px 0',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div className="w">
          <div className="g2" style={{ gap: '64px', alignItems: 'start' }}>
            {/* Left */}
            <div>
              <div className="tag">Notre approche</div>
              <h2
                style={{
                  fontFamily: 'var(--fh)',
                  fontSize: 'clamp(1.5rem, 2.5vw, 2.125rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.04em',
                  lineHeight: 1.2,
                  marginBottom: '20px',
                }}
              >
                Une pédagogie
                <br />
                <em
                  style={{
                    fontFamily: 'var(--fi)',
                    fontStyle: 'italic',
                    fontWeight: 400,
                  }}
                >
                  pensée pour les pros.
                </em>
              </h2>
              <p
                style={{
                  fontSize: '0.9375rem',
                  color: 'var(--fog)',
                  lineHeight: 1.75,
                  maxWidth: '380px',
                }}
              >
                Pas de MOOC généraliste. Chaque formation Cohesif est construite autour d&apos;un
                objectif métier précis, avec un accompagnement humain tout au long du parcours.
              </p>
            </div>

            {/* Right: 4 items */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {METHOD.map((m, i) => (
                <div
                  key={m.num}
                  style={{
                    display: 'flex',
                    gap: '20px',
                    padding: '24px 0',
                    borderTop:
                      i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--fm)',
                      fontSize: '0.7rem',
                      color: 'var(--y)',
                      letterSpacing: '0.06em',
                      paddingTop: '2px',
                      flexShrink: 0,
                      width: '22px',
                    }}
                  >
                    {m.num}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--fh)',
                        fontSize: '0.9375rem',
                        fontWeight: 700,
                        color: 'var(--snow)',
                        marginBottom: '6px',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {m.title}
                    </div>
                    <p
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--fog)',
                        lineHeight: 1.65,
                        margin: 0,
                      }}
                    >
                      {m.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── LEARNING PATH ───────────────────────────────────────────────── */}
      <section className="sec">
        <div className="w">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div className="tag" style={{ justifyContent: 'center' }}>
              Parcours recommandé
            </div>
            <h2 className="h2">
              De zéro à expert
              <br />
              <em>en 3 mois chrono.</em>
            </h2>
            <p
              className="lead"
              style={{ margin: '16px auto 0', textAlign: 'center', maxWidth: '520px' }}
            >
              Notre parcours complet combine 6 formations pour vous transformer en référent IA de
              votre organisation.
            </p>
          </div>

          {/* 3-step grid — flush with shared border */}
          <div
            className="g3"
            style={{
              gap: '1px',
              background: 'rgba(255,255,255,0.06)',
              borderRadius: '16px',
              overflow: 'hidden',
              marginBottom: '32px',
            }}
          >
            {LEARNING_PATH.map((step) => (
              <div
                key={step.step}
                style={{
                  background: 'var(--panel)',
                  padding: '40px 32px',
                }}
              >
                {/* Month pill */}
                <div style={{ marginBottom: '20px' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '4px 12px',
                      borderRadius: '100px',
                      fontSize: '0.6875rem',
                      fontFamily: 'var(--fm)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      background: 'rgba(11,200,240,0.08)',
                      border: '1px solid rgba(11,200,240,0.2)',
                      color: 'var(--y)',
                    }}
                  >
                    {step.month}
                  </span>
                </div>

                {/* Ghost number */}
                <div
                  style={{
                    fontFamily: 'var(--fm)',
                    fontSize: '3rem',
                    fontWeight: 700,
                    color: 'rgba(255,255,255,0.04)',
                    lineHeight: 1,
                    marginBottom: '-4px',
                    letterSpacing: '-0.04em',
                    userSelect: 'none',
                  }}
                >
                  {step.step}
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--fh)',
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: 'var(--snow)',
                    marginBottom: '12px',
                    letterSpacing: '-0.03em',
                  }}
                >
                  {step.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--fog)',
                    lineHeight: 1.7,
                    marginBottom: '18px',
                  }}
                >
                  {step.desc}
                </p>

                <div
                  style={{
                    display: 'flex',
                    gap: '6px',
                    flexWrap: 'wrap',
                    marginBottom: '24px',
                  }}
                >
                  {step.courses.map((c) => (
                    <span
                      key={c}
                      style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        borderRadius: '100px',
                        background: 'rgba(11,200,240,0.06)',
                        border: '1px solid rgba(11,200,240,0.15)',
                        color: 'var(--fog)',
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
                    borderLeft: '2px solid rgba(11,200,240,0.3)',
                    paddingLeft: '14px',
                  }}
                >
                  <div
                    style={{
                      fontSize: '0.6875rem',
                      fontFamily: 'var(--fm)',
                      color: 'var(--y)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      marginBottom: '5px',
                    }}
                  >
                    À l&apos;issue
                  </div>
                  <p
                    style={{
                      fontSize: '0.8125rem',
                      color: 'var(--fog)',
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {step.outcome}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bundle CTA */}
          <div
            style={{
              background:
                'linear-gradient(135deg, rgba(11,200,240,0.07) 0%, rgba(11,200,240,0.02) 100%)',
              border: '1px solid rgba(11,200,240,0.2)',
              borderRadius: '16px',
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
                  fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.04em',
                  marginBottom: '8px',
                  color: 'var(--snow)',
                }}
              >
                Parcours Complet Cohesif Expert
              </h3>
              <p
                style={{
                  fontSize: '0.9375rem',
                  color: 'var(--fog)',
                  maxWidth: '460px',
                  marginBottom: '16px',
                  lineHeight: 1.65,
                }}
              >
                Les 6 formations incluses. Économisez 678€ par rapport aux cours séparés.
                Certificat Expert reconnu par 480+ partenaires.
              </p>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  flexWrap: 'wrap',
                }}
              >
                <span
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--mist)',
                    textDecoration: 'line-through',
                    fontFamily: 'var(--fm)',
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
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                alignItems: 'flex-start',
              }}
            >
              <Link href="/tarifs" className="btn by">
                S&apos;inscrire au parcours complet
              </Link>
              <p
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--mist)',
                  fontFamily: 'var(--fm)',
                }}
              >
                Accès à vie · Certificat inclus · Mentorat 1-1
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── INSTRUCTORS ─────────────────────────────────────────────────── */}
      <section
        style={{
          background: 'var(--deep)',
          padding: '80px 0',
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div className="w">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '32px',
              flexWrap: 'wrap',
              marginBottom: '40px',
            }}
          >
            <div>
              <div className="tag">Pédagogie</div>
              <h2
                style={{
                  fontFamily: 'var(--fh)',
                  fontSize: 'clamp(1.375rem, 2.5vw, 1.875rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.04em',
                  lineHeight: 1.2,
                }}
              >
                Appris par des praticiens.
                <br />
                <em
                  style={{
                    fontFamily: 'var(--fi)',
                    fontStyle: 'italic',
                    fontWeight: 400,
                  }}
                >
                  Enseigné par des experts.
                </em>
              </h2>
            </div>
            <p
              style={{
                fontSize: '0.9375rem',
                color: 'var(--fog)',
                maxWidth: '360px',
                lineHeight: 1.7,
              }}
            >
              Nos instructeurs sont des professionnels actifs. Chaque cours est révisé tous les
              3&nbsp;mois.
            </p>
          </div>

          <div className="g4" style={{ gap: '12px' }}>
            {[
              {
                initials: 'CM',
                name: 'Claire Marchand',
                role: 'Directrice Transformation Digitale',
                company: 'Orange',
                course: 'IA Enterprise',
              },
              {
                initials: 'LG',
                name: 'Laurent Girard',
                role: 'Responsable Conformité',
                company: 'Société Générale',
                course: 'Fondamentaux IA',
              },
              {
                initials: 'NB',
                name: 'Nadia Benali',
                role: 'Avocate droit du numérique',
                company: 'Clifford Chance',
                course: 'IA & Droit',
              },
              {
                initials: 'SR',
                name: 'Sébastien Roux',
                role: 'Directeur des Systèmes d\'Information',
                company: 'Léa Nature',
                course: 'Agents Autonomes',
              },
            ].map((inst) => (
              <div
                key={inst.name}
                style={{
                  background: 'var(--panel)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '14px',
                  padding: '24px 20px',
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '11px',
                    background:
                      'linear-gradient(135deg, rgba(11,200,240,.18), rgba(11,200,240,.04))',
                    border: '1px solid rgba(11,200,240,.14)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                    fontFamily: 'var(--fh)',
                    fontWeight: 800,
                    fontSize: '0.8rem',
                    color: 'var(--y)',
                    letterSpacing: '.04em',
                  }}
                >
                  {inst.initials}
                </div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    color: 'var(--snow)',
                    marginBottom: '3px',
                    fontFamily: 'var(--fh)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {inst.name}
                </div>
                <div
                  style={{
                    fontSize: '0.78rem',
                    color: 'var(--fog)',
                    marginBottom: '2px',
                    lineHeight: 1.4,
                  }}
                >
                  {inst.role}
                </div>
                <div
                  style={{
                    fontSize: '0.725rem',
                    color: 'var(--mist)',
                    fontFamily: 'var(--fm)',
                    marginBottom: '14px',
                  }}
                >
                  {inst.company}
                </div>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '3px 10px',
                    borderRadius: '100px',
                    fontSize: '0.69rem',
                    fontFamily: 'var(--fm)',
                    background: 'rgba(11,200,240,0.06)',
                    border: '1px solid rgba(11,200,240,0.15)',
                    color: 'var(--y)',
                    letterSpacing: '0.02em',
                  }}
                >
                  {inst.course}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ───────────────────────────────────────────────────── */}
      <section className="secm">
        <div className="wm" style={{ textAlign: 'center' }}>
          <h2
            style={{
              fontFamily: 'var(--fh)',
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1.2,
              marginBottom: '16px',
            }}
          >
            Prêt à piloter
            <br />
            <em style={{ fontFamily: 'var(--fi)', fontStyle: 'italic', fontWeight: 400 }}>
              la transformation IA de votre organisation ?
            </em>
          </h2>
          <p
            style={{
              fontSize: '0.9375rem',
              color: 'var(--fog)',
              lineHeight: 1.7,
              maxWidth: '440px',
              margin: '0 auto 32px',
            }}
          >
            Rejoignez les 34 080 professionnels qui ont déjà choisi Cohesif pour monter en
            compétence sur l&apos;IA.
          </p>
          <div
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Link href="/tarifs" className="btn by">
              Commencer maintenant
            </Link>
            <Link
              href="/contact"
              className="btn"
              style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'var(--fog)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              Nous contacter <IcArrow />
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
