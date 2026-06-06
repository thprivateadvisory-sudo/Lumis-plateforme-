'use client'

import { useState } from 'react'
import Link from 'next/link'
import { agents } from '@/lib/agents-config'

type Category = 'Tous' | 'Commercial' | 'Finance' | 'Marketing' | 'Support' | 'Juridique' | 'RH'

const categories: Category[] = ['Tous', 'Commercial', 'Finance', 'Marketing', 'Support', 'Juridique', 'RH']

export default function AgentsPage() {
  const [active, setActive] = useState<Category>('Tous')

  return (
    <main>
      {/* Hero */}
      <section className="sec" style={{ paddingBottom: 0 }}>
        <div className="wm" style={{ textAlign: 'center' }}>
          <div className="tag">Marketplace</div>
          <h1 className="h2">
            Agents IA <em>prêts à déployer</em>
          </h1>
          <p className="lead" style={{ margin: '0 auto 48px' }}>
            Des agents autonomes spécialisés par métier. Configurez en 5 minutes, déployez en un clic, mesurez le ROI dès le premier jour.
          </p>

          {/* Filter bar */}
          <div className="afc">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`afb${active === cat ? ' on' : ''}`}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="secm">
        <div className="w">
          <div className="afgrid">
            {agents.map((agent) => {
              const visible = active === 'Tous' || active === agent.category
              return (
                <article
                  key={agent.name}
                  className="agc"
                  style={{
                    opacity: visible ? 1 : 0.15,
                    pointerEvents: visible ? 'auto' : 'none',
                    transition: 'opacity 0.3s ease, transform 0.3s ease',
                  }}
                >
                  <div className="agh">
                    <div className="agav" style={{ color: agent.color }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: agent.iconSvg }} />
                    </div>
                    <div>
                      <div className="agn">{agent.name}</div>
                      <div className="agr">{agent.version}</div>
                    </div>
                    <div className="aglv" title="En ligne" />
                  </div>

                  <p className="agd">{agent.description}</p>

                  <div className="agf">
                    <div className="agp">
                      {agent.price}€<sub>/mois</sub>
                    </div>
                    <Link href={`/agents/${agent.slug}`} className="agbt">
                      Essayer →
                    </Link>
                  </div>

                  <div className="ags">
                    <span className="agst">
                      ⭐ <b>{agent.rating}</b>
                    </span>
                    <span className="agst">
                      🚀 <b>{agent.deployments}</b> déploiements
                    </span>
                    <span className="agst" style={{ marginLeft: 'auto' }}>
                      <b style={{ color: 'var(--y)' }}>{agent.kpi}</b>
                    </span>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="secm" style={{ paddingTop: 0 }}>
        <div className="ws" style={{ textAlign: 'center' }}>
          <div
            style={{
              background: 'var(--card)',
              border: '1px solid rgba(11,200,240,0.15)',
              borderRadius: 22,
              padding: '48px 36px',
            }}
          >
            <div className="tag" style={{ justifyContent: 'center' }}>Sur mesure</div>
            <h2
              style={{
                fontFamily: 'var(--fh)',
                fontSize: 'clamp(24px,3vw,32px)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                marginBottom: 12,
              }}
            >
              Besoin d&apos;un agent personnalisé ?
            </h2>
            <p className="lead" style={{ margin: '0 auto 28px', fontSize: 15 }}>
              Notre équipe conçoit des agents métier sur mesure, entraînés sur vos données et intégrés à vos outils existants.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn by">
                Demander un devis
              </Link>
              <Link href="/tarifs" className="btn bg">
                Voir les forfaits
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
