import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Bienvenue dans Cohesif IA ! — Abonnement activé',
  description: 'Votre abonnement Cohesif est actif. Commencez à utiliser votre plateforme IA.',
  robots: { index: false, follow: false },
}

export default function CheckoutSuccessPage() {
  return (
    <section
      className="sec"
      style={{
        background: 'radial-gradient(ellipse 60% 50% at 50% 0%,rgba(11, 200, 240, .07),transparent)',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className="ws" style={{ textAlign: 'center', width: '100%' }}>
        {/* Celebration */}
        <div
          style={{
            fontSize: 80,
            marginBottom: 24,
            animation: 'bounce 1s ease-in-out',
          }}
        >
          🎉
        </div>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(11, 200, 240, .1)',
            border: '1px solid rgba(11,200,240,.2)',
            borderRadius: 100,
            padding: '8px 20px',
            marginBottom: 24,
            fontSize: 13,
            fontWeight: 700,
            color: 'var(--y)',
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'var(--y)',
              animation: 'ping 2s infinite',
            }}
          />
          Abonnement activé
        </div>

        <h1 className="h2" style={{ fontSize: 'clamp(40px,6vw,72px)' }}>
          Bienvenue dans
          <br />
          <em>Cohesif IA !</em>
        </h1>

        <p className="lead" style={{ margin: '16px auto 48px', textAlign: 'center' }}>
          Votre abonnement est actif. Un email de confirmation vous a été envoyé.
          Vous pouvez maintenant accéder à toutes les fonctionnalités.
        </p>

        {/* Next steps */}
        <div
          className="g3"
          style={{
            gap: 16,
            marginBottom: 48,
          }}
        >
          {[
            {
              icon: '🚀',
              step: '01',
              title: 'Accédez à votre dashboard',
              desc: 'Votre espace de travail est prêt. Explorez toutes les fonctionnalités.',
            },
            {
              icon: '🤖',
              step: '02',
              title: 'Déployez votre premier agent',
              desc: 'Choisissez parmi 6 agents spécialisés et déployez en 10 minutes.',
            },
            {
              icon: '💬',
              step: '03',
              title: 'Testez Cohesif Ultra',
              desc: 'Commencez à utiliser l\'assistant IA pour vos premières automatisations.',
            },
          ].map((s) => (
            <div
              key={s.step}
              style={{
                background: 'var(--card)',
                border: '1px solid var(--w1)',
                borderRadius: 20,
                padding: 28,
              }}
            >
              <div style={{ fontSize: 36, marginBottom: 12 }}>{s.icon}</div>
              <div
                style={{
                  fontFamily: 'var(--fm)',
                  fontSize: 11,
                  color: 'var(--y)',
                  marginBottom: 8,
                }}
              >
                Étape {s.step}
              </div>
              <div style={{ fontWeight: 700, marginBottom: 6, fontSize: 16 }}>{s.title}</div>
              <div style={{ fontSize: 13, color: 'var(--fog)', lineHeight: 1.6 }}>{s.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/demo" className="btn by blg">
            Accéder à mon espace →
          </Link>
          <Link href="/docs" className="btn bg blg">
            Voir la documentation
          </Link>
        </div>

        <p style={{ marginTop: 20, fontSize: 13, color: 'var(--mist)' }}>
          Des questions ? Contactez-nous à{' '}
          <a href="mailto:support@cohesif-ia.fr" style={{ color: 'var(--fog)' }}>
            support@cohesif-ia.fr
          </a>{' '}
          — réponse sous 4h ouvrées.
        </p>
      </div>
    </section>
  )
}
