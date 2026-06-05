'use client'

const JOBS = [
  { dept: 'Engineering', jobs: [
    { title: 'Senior Full Stack Engineer', location: 'Paris / Remote', level: 'Senior', contract: 'CDI' },
    { title: 'ML Engineer — LLM Fine-tuning', location: 'Paris', level: 'Senior', contract: 'CDI' },
    { title: 'DevOps / SRE', location: 'Remote', level: 'Confirmé', contract: 'CDI' },
    { title: 'Data Engineer', location: 'Paris / Remote', level: 'Confirmé', contract: 'CDI' },
    { title: 'Security Engineer', location: 'Paris', level: 'Senior', contract: 'CDI' },
    { title: 'Frontend Engineer (React/Next.js)', location: 'Remote', level: 'Confirmé', contract: 'CDI' },
  ]},
  { dept: 'Product & Design', jobs: [
    { title: 'Senior Product Manager', location: 'Paris', level: 'Senior', contract: 'CDI' },
    { title: 'UX Designer', location: 'Paris / Remote', level: 'Confirmé', contract: 'CDI' },
    { title: 'Product Designer', location: 'Remote', level: 'Junior', contract: 'CDI' },
  ]},
  { dept: 'Sales & Marketing', jobs: [
    { title: 'Account Executive Enterprise', location: 'Paris', level: 'Senior', contract: 'CDI' },
    { title: 'Growth Hacker', location: 'Paris / Remote', level: 'Confirmé', contract: 'CDI' },
    { title: 'SDR — Business Development', location: 'Paris', level: 'Junior', contract: 'CDI' },
    { title: 'Content Manager (FR/EN)', location: 'Remote', level: 'Confirmé', contract: 'CDI' },
    { title: 'Responsable Partenariats', location: 'Paris', level: 'Senior', contract: 'CDI' },
  ]},
  { dept: 'Customer Success', jobs: [
    { title: 'Customer Success Manager', location: 'Paris / Remote', level: 'Confirmé', contract: 'CDI' },
    { title: 'Technical Support Engineer', location: 'Remote', level: 'Confirmé', contract: 'CDI' },
    { title: 'Onboarding Specialist', location: 'Paris', level: 'Junior', contract: 'CDI' },
  ]},
  { dept: 'Finance & Legal', jobs: [
    { title: 'CFO (Chief Financial Officer)', location: 'Paris', level: 'C-Level', contract: 'CDI' },
    { title: 'Juriste en Droit du Numérique', location: 'Paris', level: 'Senior', contract: 'CDI' },
    { title: 'DPO — Data Protection Officer', location: 'Paris', level: 'Confirmé', contract: 'CDI' },
    { title: 'Contrôleur de Gestion', location: 'Paris', level: 'Confirmé', contract: 'CDI' },
  ]},
]

const PERKS = [
  { icon: '🌍', label: 'Remote-first', desc: 'Travaillez de partout. Bureaux Paris disponibles.' },
  { icon: '📈', label: 'Stock-options', desc: 'BSPCE dès le premier jour pour tous les salariés.' },
  { icon: '🎓', label: '5 000€/an formation', desc: 'Budget annuel pour conférences, cours et livres.' },
  { icon: '🏥', label: 'Mutuelle 100%', desc: 'Alan prise en charge à 100% pour vous et votre famille.' },
  { icon: '⚡', label: 'MacBook Pro offert', desc: 'Équipement premium dès le premier jour.' },
  { icon: '🚀', label: 'Impact réel', desc: "Vos décisions façonnent l'IA européenne de demain." },
]

export default function CarrieresClient() {
  return (
    <>
      <section className="sec" style={{ background: 'radial-gradient(ellipse 70% 40% at 50% 0%,rgba(77,166,255,.05),transparent)', paddingBottom: 0 }}>
        <div className="wm" style={{ textAlign: 'center' }}>
          <div className="tag" style={{ justifyContent: 'center' }}>Carrières</div>
          <h1 className="h2">Construisons ensemble<br /><em>l&apos;IA de demain.</em></h1>
          <p className="lead" style={{ margin: '0 auto 32px' }}>
            Cohesif est la startup IA française à la croissance la plus rapide. +420% ARR, 312K utilisateurs, 40M€ levés. On cherche les meilleurs.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(11,200,240,.08)', border: '1px solid rgba(11,200,240,.2)', borderRadius: 100, padding: '10px 24px', fontSize: 15, fontWeight: 700, color: 'var(--y)' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--y)', animation: 'ping 2s infinite' }} />
            31 postes ouverts — Paris &amp; Remote
          </div>
        </div>
      </section>

      <section className="secm">
        <div className="w">
          <div className="tag">Pourquoi Cohesif ?</div>
          <h2 className="h2" style={{ fontSize: 'clamp(28px,4vw,48px)', marginBottom: 40 }}>Ce que vous<br /><em>trouvez ici.</em></h2>
          <div className="g3" style={{ gap: 16 }}>
            {PERKS.map(p => (
              <div key={p.label} className="rv" style={{ background: 'var(--card)', border: '1px solid var(--w1)', borderRadius: 18, padding: 24 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--yd)', border: '1px solid rgba(11,200,240,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--y)', marginBottom: 14 }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{p.label}</div>
                <div style={{ fontSize: 13, color: 'var(--fog)', lineHeight: 1.6 }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="secm" style={{ background: 'var(--deep)' }}>
        <div className="w">
          <div className="tag">Offres d&apos;emploi</div>
          <h2 className="h2" style={{ fontSize: 'clamp(28px,4vw,48px)', marginBottom: 48 }}>Tous les<br /><em>postes ouverts.</em></h2>

          {JOBS.map(dept => (
            <div key={dept.dept} style={{ marginBottom: 48 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--fog)', marginBottom: 16, fontFamily: 'var(--fm)' }}>
                {dept.dept} — {dept.jobs.length} postes
              </h3>
              <div style={{ border: '1px solid var(--w1)', borderRadius: 16, overflow: 'hidden' }}>
                {dept.jobs.map((job, i) => (
                  <a key={job.title}
                    href={`mailto:jobs@cohesif.ai?subject=Candidature — ${job.title}`}
                    className="job-row"
                    style={{ display: 'flex', alignItems: 'center', padding: '18px 24px', borderBottom: i < dept.jobs.length - 1 ? '1px solid var(--w1)' : 'none', background: 'var(--card)', textDecoration: 'none', gap: 16, transition: 'background .2s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--raise)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'var(--card)')}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 15, color: 'var(--snow)', marginBottom: 4 }}>{job.title}</div>
                      <div style={{ fontSize: 13, color: 'var(--fog)' }}>{job.location} · {job.contract} · {job.level}</div>
                    </div>
                    <span style={{ color: 'var(--y)', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>Postuler →</span>
                  </a>
                ))}
              </div>
            </div>
          ))}

          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <p style={{ fontSize: 15, color: 'var(--fog)', marginBottom: 16 }}>Vous ne trouvez pas votre bonheur ?</p>
            <a href="mailto:jobs@cohesif.ai?subject=Candidature spontanée" className="btn bg blg">
              Candidature spontanée →
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
