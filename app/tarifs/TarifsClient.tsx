'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type BillingMode = 'mensuel' | 'annuel'

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    pitchMensuel: 'Découvrez Cohesif sans engagement',
    pitchAnnuel: 'Découvrez Cohesif sans engagement',
    priceMensuel: 0,
    priceAnnuel: 0,
    unit: '/mois',
    badge: null,
    featured: false,
    ctaLabel: 'Commencer gratuitement',
    ctaStyle: 'pghost',
    href: '/demo',
    features: [
      { label: '20 messages / jour', on: true },
      { label: 'Accès Cohesif Core', on: true },
      { label: 'Interface chat web', on: true },
      { label: '1 agent pré-configuré', on: true },
      { label: 'API access', on: false },
      { label: 'Agents personnalisés', on: false },
      { label: 'Intégrations (Slack, Teams…)', on: false },
      { label: 'Support prioritaire', on: false },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    pitchMensuel: 'Pour les indépendants et petites équipes',
    pitchAnnuel: 'Pour les indépendants et petites équipes',
    priceMensuel: 29,
    priceAnnuel: 20,
    unit: '/mois',
    badge: null,
    featured: false,
    ctaLabel: 'Démarrer l\'essai gratuit',
    ctaStyle: 'pghost',
    href: null,
    features: [
      { label: 'Messages illimités', on: true },
      { label: 'Cohesif Ultra (GPT-4o level)', on: true },
      { label: '5 agents personnalisés', on: true },
      { label: 'API access (100K tokens/mois)', on: true },
      { label: 'Intégrations Slack & Teams', on: true },
      { label: 'Historique 90 jours', on: true },
      { label: 'Données sur-mesure (RAG)', on: false },
      { label: 'SLA garanti & support dédié', on: false },
    ],
  },
  {
    id: 'business',
    name: 'Business',
    pitchMensuel: 'Pour les équipes qui veulent scaler',
    pitchAnnuel: 'Pour les équipes qui veulent scaler',
    priceMensuel: 149,
    priceAnnuel: 104,
    unit: '/mois',
    badge: 'Le plus populaire',
    featured: true,
    ctaLabel: 'Démarrer l\'essai gratuit',
    ctaStyle: 'pyel',
    href: null,
    features: [
      { label: 'Tout le plan Pro', on: true },
      { label: 'Agents illimités', on: true },
      { label: 'API illimitée + webhooks', on: true },
      { label: 'RAG sur vos données (50 Go)', on: true },
      { label: 'SSO / SAML', on: true },
      { label: 'Analytics équipe avancés', on: true },
      { label: 'Support prioritaire 4h', on: true },
      { label: 'Audit logs RGPD complets', on: true },
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    pitchMensuel: 'Infrastructure dédiée, SLA 99.99%',
    pitchAnnuel: 'Infrastructure dédiée, SLA 99.99%',
    priceMensuel: null,
    priceAnnuel: null,
    unit: '',
    badge: null,
    featured: false,
    ctaLabel: 'Contacter l\'équipe commerciale',
    ctaStyle: 'pghost',
    href: '/contact',
    features: [
      { label: 'Tout Business, sans limites', on: true },
      { label: 'On-premise ou cloud dédié', on: true },
      { label: 'SLA 99.99% garanti', on: true },
      { label: 'Modèles fine-tunés', on: true },
      { label: 'Support 24/7 dédié', on: true },
      { label: 'Intégrations sur-mesure', on: true },
      { label: 'Facturation sur mesure', on: true },
      { label: 'Audit de sécurité inclus', on: true },
    ],
  },
]

const FAQ_ITEMS = [
  {
    q: 'Est-ce que mes données restent en France ?',
    a: 'Oui, à 100%. Toute l\'infrastructure Cohesif est hébergée dans nos datacenters en Île-de-France, certifiés HDS et ISO 27001. Aucune donnée ne transite hors de l\'Union Européenne. Nous n\'utilisons aucun sous-traitant américain pour le stockage ou le traitement des données.',
  },
  {
    q: 'Puis-je changer de plan à tout moment ?',
    a: 'Absolument. Vous pouvez upgrader ou downgrader votre plan à n\'importe quel moment depuis votre dashboard. En cas de downgrade, vous gardez les fonctionnalités premium jusqu\'à la fin de votre période de facturation en cours. Aucun frais de résiliation.',
  },
  {
    q: 'Comment fonctionne l\'essai gratuit de 14 jours ?',
    a: 'L\'essai gratuit vous donne accès complet au plan choisi pendant 14 jours, sans carte bancaire. À la fin de la période d\'essai, vous recevez un rappel et choisissez si vous souhaitez continuer. Aucun prélèvement automatique sans votre accord explicite.',
  },
  {
    q: 'Qu\'est-ce que le plan Enterprise inclut de plus ?',
    a: 'Le plan Enterprise ajoute un hébergement on-premise ou cloud dédié exclusivement pour votre organisation, un SLA 99.99% contractuel avec pénalités, des modèles fine-tunés sur vos données métier, un Customer Success Manager dédié, et une facturation adaptée (mensuelle, trimestrielle ou annuelle).',
  },
  {
    q: 'Quelle est la différence entre Cohesif Core et Cohesif Ultra ?',
    a: 'Cohesif Core est notre modèle optimisé pour la rapidité (réponse < 1s), idéal pour les tâches courantes. Cohesif Ultra est notre modèle de pointe avec 512K tokens de contexte, raisonnement avancé et performances supérieures à GPT-4o sur les benchmarks francophones. Ultra est inclus à partir du plan Pro.',
  },
]

export default function TarifsClient() {
  const [billing, setBilling] = useState<BillingMode>('mensuel')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [loading, setLoading] = useState<string | null>(null)
  const router = useRouter()

  const handlePlanClick = async (plan: typeof PLANS[0]) => {
    if (plan.href) {
      router.push(plan.href)
      return
    }
    setLoading(plan.id)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: plan.id, billing }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch {
      // handle error silently
    } finally {
      setLoading(null)
    }
  }

  return (
    <>
      {/* ── HEADER ── */}
      <section className="sec" style={{ paddingBottom: '64px' }}>
        <div className="w" style={{ textAlign: 'center' }}>
          <div className="tag" style={{ justifyContent: 'center' }}>Tarifs</div>
          <h1 className="h2">
            Prix honnêtes,
            <br />
            <em>valeur maximale.</em>
          </h1>
          <p className="lead" style={{ margin: '0 auto 40px', textAlign: 'center' }}>
            Commencez gratuitement. Scalez sans limites. ROI moyen ×8 en 3 mois.
          </p>

          {/* Billing toggle */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '14px',
            background: 'var(--card)',
            border: '1px solid rgba(255,255,255,.07)',
            borderRadius: '100px',
            padding: '6px 8px',
          }}>
            <button
              onClick={() => setBilling('mensuel')}
              style={{
                padding: '8px 20px',
                borderRadius: '100px',
                border: 'none',
                fontFamily: 'var(--fh)',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all .2s',
                background: billing === 'mensuel' ? 'var(--raise)' : 'transparent',
                color: billing === 'mensuel' ? 'var(--snow)' : 'var(--fog)',
              }}
            >
              Mensuel
            </button>
            <button
              onClick={() => setBilling('annuel')}
              style={{
                padding: '8px 20px',
                borderRadius: '100px',
                border: 'none',
                fontFamily: 'var(--fh)',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all .2s',
                background: billing === 'annuel' ? 'var(--raise)' : 'transparent',
                color: billing === 'annuel' ? 'var(--snow)' : 'var(--fog)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              Annuel
              <span className="apill">-30%</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── PRICING GRID ── */}
      <section style={{ padding: '0 0 108px' }}>
        <div className="w">
          <div className="pgrid">
            {PLANS.map((plan) => {
              const price = billing === 'mensuel' ? plan.priceMensuel : plan.priceAnnuel
              const pitch = billing === 'mensuel' ? plan.pitchMensuel : plan.pitchAnnuel
              return (
                <div
                  key={plan.id}
                  className={`pbox${plan.featured ? ' pf' : ''}`}
                >
                  {plan.badge && (
                    <div className="pbadge">{plan.badge}</div>
                  )}
                  <div className="pname">{plan.name}</div>
                  <div className="pamt">
                    {price === null ? (
                      <span style={{ fontSize: '28px', letterSpacing: '-.02em' }}>Sur devis</span>
                    ) : price === 0 ? (
                      <>
                        <sup>€</sup>0<sub>{plan.unit}</sub>
                      </>
                    ) : (
                      <>
                        <sup>€</sup>{price}<sub>{plan.unit}</sub>
                      </>
                    )}
                  </div>
                  {billing === 'annuel' && price !== null && price > 0 && (
                    <div style={{ fontSize: '12px', color: 'var(--y)', marginTop: '4px', fontWeight: 600 }}>
                      Facturé {price * 12}€ / an
                    </div>
                  )}
                  <p className="ppitch">{pitch}</p>
                  <div className="psep" />
                  <ul className="plist">
                    {plan.features.map((f) => (
                      <li key={f.label} className={f.on ? 'on' : ''}>
                        <span className={f.on ? 'ci' : 'cx'}>
                          {f.on ? '✓' : '×'}
                        </span>
                        {f.label}
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`pbtn ${plan.ctaStyle}`}
                    onClick={() => handlePlanClick(plan)}
                    disabled={loading === plan.id}
                  >
                    {loading === plan.id ? 'Chargement…' : plan.ctaLabel}
                  </button>
                </div>
              )
            })}
          </div>

          <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '13px', color: 'var(--fog)' }}>
            ✓ 14 jours gratuits sans carte bancaire · ✓ Annulation en 1 clic · ✓ Données 100% France
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="sec" style={{ background: 'var(--deep)', paddingTop: '80px' }}>
        <div className="wm">
          <div className="tag" style={{ justifyContent: 'center' }}>FAQ</div>
          <h2 className="h2" style={{ textAlign: 'center' }}>
            Questions fréquentes
          </h2>
          <div className="faq">
            {FAQ_ITEMS.map((item, i) => (
              <div
                key={i}
                className={`fqi${openFaq === i ? ' open' : ''}`}
              >
                <div
                  className="fqq"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {item.q}
                </div>
                {openFaq === i && (
                  <div className="fqa">{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="sec" style={{ textAlign: 'center' }}>
        <div className="ws">
          <div className="tag" style={{ justifyContent: 'center' }}>Vous hésitez encore ?</div>
          <h2 className="h2">Calculez votre ROI</h2>
          <p className="lead" style={{ margin: '0 auto 36px', textAlign: 'center' }}>
            Découvrez en 2 minutes combien Cohesif peut faire économiser à votre équipe.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/roi" className="btn by blg">
              Calculer mon ROI →
            </Link>
            <Link href="/contact" className="btn bg blg">
              Parler à un expert
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
