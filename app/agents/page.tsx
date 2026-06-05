'use client'

import { useState } from 'react'
import Link from 'next/link'

type Category = 'Tous' | 'Commercial' | 'Finance' | 'Marketing' | 'Support' | 'Juridique' | 'RH'

interface Agent {
  emoji: string
  name: string
  version: string
  category: Category
  description: string
  price: string
  rating: string
  deployments: string
  kpi: string
}

const agents: Agent[] = [
  {
    emoji: '💼',
    name: 'Axel Commercial',
    version: 'v2.4',
    category: 'Commercial',
    description: 'Agent de vente autonome qui qualifie les leads, personnalise les pitchs et relance automatiquement vos prospects. Connecté à votre CRM en temps réel.',
    price: '149',
    rating: '4.9',
    deployments: '1 840',
    kpi: 'ROI ×12',
  },
  {
    emoji: '📊',
    name: 'Léa Finance',
    version: 'v1.9',
    category: 'Finance',
    description: 'Automatise la consolidation comptable, détecte les anomalies budgétaires et génère vos reportings financiers en quelques secondes.',
    price: '249',
    rating: '4.8',
    deployments: '920',
    kpi: '18h/sem économisées',
  },
  {
    emoji: '🎯',
    name: 'Max Marketing',
    version: 'v3.1',
    category: 'Marketing',
    description: 'Crée, planifie et optimise vos campagnes multicanal en continu. Analyse les performances et réalloue les budgets publicitaires automatiquement.',
    price: '99',
    rating: '4.9',
    deployments: '3 200',
    kpi: '+280% engagement',
  },
  {
    emoji: '🎧',
    name: 'Sofia Support',
    version: 'v2.7',
    category: 'Support',
    description: 'Gère 94 % des tickets clients en autonomie totale, escalade intelligemment les cas complexes et apprend de chaque interaction.',
    price: '79',
    rating: '4.9',
    deployments: '2 600',
    kpi: '94% résolution auto',
  },
  {
    emoji: '⚖️',
    name: 'Iris Juridique',
    version: 'v1.5',
    category: 'Juridique',
    description: 'Analyse les contrats, vérifie la conformité RGPD, rédige des clauses types et surveille les évolutions réglementaires pour votre secteur.',
    price: '299',
    rating: '4.7',
    deployments: '480',
    kpi: '−80% frais juridiques',
  },
  {
    emoji: '👥',
    name: 'Hugo RH',
    version: 'v2.0',
    category: 'RH',
    description: 'Accélère le recrutement en triant les CVs, planifiant les entretiens et onboardant les nouvelles recrues avec des parcours personnalisés.',
    price: '129',
    rating: '4.8',
    deployments: '740',
    kpi: '−60% time-to-hire',
  },
]

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
                    <div className="agav">{agent.emoji}</div>
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
                    <Link href="/tarifs" className="agbt">
                      Déployer →
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
