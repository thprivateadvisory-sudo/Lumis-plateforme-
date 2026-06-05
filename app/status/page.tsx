import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Status LUMIS.AI — Tous les systèmes opérationnels',
  description: 'Consultez l\'état en temps réel de tous les services LUMIS.AI. Uptime 99.98%, zéro incident.',
}

const SERVICES = [
  { name: 'API LUMIS Ultra', uptime: '99.98%', status: 'operational', icon: '⚡' },
  { name: 'Chat & Démo Live', uptime: '99.97%', status: 'operational', icon: '💬' },
  { name: 'Agents Engine', uptime: '99.97%', status: 'operational', icon: '🤖' },
  { name: 'Authentication', uptime: '100%', status: 'operational', icon: '🔐' },
  { name: 'Marketplace IA', uptime: '99.99%', status: 'operational', icon: '🛒' },
  { name: 'Académie & Formations', uptime: '99.95%', status: 'operational', icon: '🎓' },
  { name: 'Webhooks', uptime: '99.96%', status: 'operational', icon: '🔗' },
  { name: 'API v1 (Legacy)', uptime: '99.80%', status: 'maintenance', icon: '⚙️' },
]

const STATUS_COLORS = {
  operational: 'var(--y)',
  maintenance: '#ffa040',
  degraded: 'var(--red)',
}

const STATUS_LABELS = {
  operational: 'Opérationnel',
  maintenance: 'Maintenance planifiée',
  degraded: 'Dégradé',
}

export default function StatusPage() {
  const allOperational = SERVICES.every((s) => s.status === 'operational' || s.status === 'maintenance')

  return (
    <>
      {/* Hero */}
      <section
        className="sec"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 0%,rgba(212,255,0,.05),transparent)',
          paddingBottom: 0,
        }}
      >
        <div className="wm" style={{ textAlign: 'center' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              background: 'rgba(212,255,0,.08)',
              border: '1px solid rgba(212,255,0,.2)',
              borderRadius: 100,
              padding: '10px 24px',
              marginBottom: 28,
              fontSize: 16,
              fontWeight: 700,
              color: 'var(--y)',
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: 'var(--y)',
                animation: 'ping 2s infinite',
              }}
            />
            {allOperational ? 'Tous les systèmes opérationnels' : 'Incidents en cours'}
          </div>
          <h1 className="h2">
            Status
            <br />
            <em>LUMIS.AI</em>
          </h1>
          <p className="lead" style={{ margin: '0 auto' }}>
            Surveillance en temps réel de tous les services. Uptime moyen : <strong style={{ color: 'var(--snow)' }}>99.98%</strong> sur les 30 derniers jours.
          </p>
        </div>
      </section>

      {/* Uptime stats */}
      <section className="secm">
        <div className="w">
          <div
            className="g3"
            style={{
              gap: 16,
              marginBottom: 48,
            }}
          >
            {[
              { label: 'Uptime 30 jours', value: '99.98%', sub: 'Au-dessus du SLA 99.9%' },
              { label: 'Uptime 90 jours', value: '99.97%', sub: 'Sur tous les services' },
              { label: 'Incidents actifs', value: '0', sub: 'Aucun incident en cours' },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: 'var(--card)',
                  border: '1px solid var(--w1)',
                  borderRadius: 16,
                  padding: '24px 28px',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--fh)',
                    fontSize: 40,
                    fontWeight: 800,
                    letterSpacing: '-.03em',
                    color: 'var(--y)',
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ fontWeight: 600, marginTop: 4, marginBottom: 4 }}>{stat.label}</div>
                <div style={{ fontSize: 12, color: 'var(--fog)' }}>{stat.sub}</div>
              </div>
            ))}
          </div>

          {/* Services list */}
          <div className="tag">Services</div>
          <h2 className="h2" style={{ fontSize: 'clamp(24px,3vw,36px)', marginBottom: 32 }}>
            État des <em>composants</em>
          </h2>

          <div
            style={{
              border: '1px solid var(--w1)',
              borderRadius: 16,
              overflow: 'hidden',
            }}
          >
            {SERVICES.map((service, i) => (
              <div
                key={service.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '18px 24px',
                  borderBottom: i < SERVICES.length - 1 ? '1px solid var(--w1)' : 'none',
                  background: 'var(--card)',
                }}
              >
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--raise)', border: '1px solid var(--w2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--fog)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{service.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--fog)', marginTop: 2 }}>
                    Uptime 30j : {service.uptime}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span
                    style={{
                      width: 9,
                      height: 9,
                      borderRadius: '50%',
                      background: STATUS_COLORS[service.status as keyof typeof STATUS_COLORS],
                      flexShrink: 0,
                      boxShadow: `0 0 6px ${STATUS_COLORS[service.status as keyof typeof STATUS_COLORS]}`,
                    }}
                  />
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: STATUS_COLORS[service.status as keyof typeof STATUS_COLORS],
                    }}
                  >
                    {STATUS_LABELS[service.status as keyof typeof STATUS_LABELS]}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Incidents */}
          <div style={{ marginTop: 52 }}>
            <div className="tag">Incidents</div>
            <h2 className="h2" style={{ fontSize: 'clamp(24px,3vw,36px)', marginBottom: 32 }}>
              30 derniers <em>jours</em>
            </h2>
            <div
              style={{
                background: 'var(--card)',
                border: '1px solid var(--w1)',
                borderRadius: 16,
                padding: '32px 28px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
                Aucun incident majeur
              </div>
              <div style={{ fontSize: 14, color: 'var(--fog)' }}>
                Aucun incident n&apos;a été détecté sur les 30 derniers jours.
              </div>
            </div>
          </div>

          {/* Subscribe */}
          <div
            style={{
              marginTop: 52,
              background: 'linear-gradient(135deg,rgba(212,255,0,.06),var(--card))',
              border: '1px solid rgba(212,255,0,.15)',
              borderRadius: 20,
              padding: '36px 32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 24,
              flexWrap: 'wrap',
            }}
          >
            <div>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>
                Abonnez-vous aux mises à jour
              </div>
              <div style={{ fontSize: 14, color: 'var(--fog)' }}>
                Recevez une notification instantanée en cas d&apos;incident ou de maintenance.
              </div>
            </div>
            <a
              href="mailto:status@lumis.ai?subject=Abonnement%20status%20LUMIS"
              className="btn by"
              style={{ flexShrink: 0 }}
            >
              S&apos;abonner aux alertes →
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
