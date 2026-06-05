import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Politique de confidentialité — Cohesif IA',
  description: 'Politique de confidentialité et protection des données personnelles de Cohesif IA. Conformité RGPD.',
}

export default function ConfidentialitePage() {
  return (
    <section className="sec">
      <div className="w" style={{ maxWidth: 800 }}>
        <div className="tag">Légal</div>
        <h1 className="h2" style={{ fontSize: 'clamp(28px,4vw,48px)' }}>Politique de<br /><em>confidentialité</em></h1>
        <p style={{ fontSize: 13, color: 'var(--fog)', marginBottom: 48 }}>Dernière mise à jour : 1er janvier 2025</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          {[
            {
              title: '1. Responsable du traitement',
              content: `Cohesif SAS, société par actions simplifiée au capital de 500 000€, immatriculée au RCS de Paris sous le numéro 123 456 789, dont le siège social est situé 42 avenue des Champs-Élysées, 75008 Paris, France (ci-après « Cohesif »).

Contact DPO : dpo@cohesif-ia.fr`
            },
            {
              title: '2. Données collectées',
              content: `Nous collectons les données suivantes :

• Données d'identification : nom, prénom, adresse email professionnelle, nom de l'entreprise
• Données de connexion : adresse IP, logs de session, navigateur utilisé
• Données d'utilisation : messages envoyés à l'IA (chiffrés, non utilisés pour l'entraînement), fonctionnalités utilisées
• Données de facturation : informations de paiement (gérées par Stripe, nous ne stockons pas vos données de carte bancaire)

Nous ne collectons pas de données sensibles au sens de l'article 9 du RGPD.`
            },
            {
              title: '3. Finalités du traitement',
              content: `Vos données sont traitées pour les finalités suivantes :

• Fourniture du service Cohesif IA : exécution du contrat
• Communication et support client : intérêt légitime
• Amélioration du service : intérêt légitime (données agrégées et anonymisées uniquement)
• Envoi de communications commerciales : consentement ou intérêt légitime (clients existants)
• Obligations légales et comptables : obligation légale`
            },
            {
              title: '4. Conservation des données',
              content: `• Données de compte : durée de la relation contractuelle + 3 ans après résiliation
• Données de facturation : 10 ans (obligation légale)
• Logs de connexion : 12 mois
• Messages IA : 30 jours (chiffrés, automatiquement supprimés)

Vous pouvez demander la suppression anticipée de vos données via dpo@cohesif-ia.fr.`
            },
            {
              title: '5. Hébergement et transferts',
              content: `L'intégralité de vos données est hébergée en France, dans nos datacenters certifiés HDS et ISO 27001, situés en Île-de-France. Aucune donnée n'est transférée hors de l'Union Européenne.

Nos sous-traitants sont tous établis dans l'UE et soumis à des contrats de traitement conformes au RGPD (DPA).`
            },
            {
              title: '6. Vos droits RGPD',
              content: `Conformément au Règlement (UE) 2016/679, vous disposez des droits suivants :

• Droit d'accès (art. 15) : obtenir une copie de vos données
• Droit de rectification (art. 16) : corriger des données inexactes
• Droit à l'effacement (art. 17) : demander la suppression de vos données
• Droit à la portabilité (art. 20) : recevoir vos données dans un format structuré
• Droit d'opposition (art. 21) : vous opposer au traitement basé sur l'intérêt légitime
• Droit à la limitation (art. 18) : limiter le traitement de vos données

Pour exercer vos droits : dpo@cohesif-ia.fr | Réponse sous 30 jours.
Vous pouvez également déposer une réclamation auprès de la CNIL : cnil.fr`
            },
            {
              title: '7. Cookies',
              content: `Nous utilisons uniquement des cookies strictement nécessaires au fonctionnement du service. Aucun cookie publicitaire ou de tracking tiers n'est déposé. Vous pouvez gérer vos préférences depuis les paramètres de votre navigateur.`
            },
            {
              title: '8. Sécurité',
              content: `Nous mettons en œuvre des mesures techniques et organisationnelles adaptées pour protéger vos données : chiffrement TLS en transit, AES-256 au repos, authentification multi-facteurs, audits de sécurité trimestriels, certification ISO 27001.`
            },
          ].map(section => (
            <div key={section.title}>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 14, color: 'var(--snow)' }}>{section.title}</h2>
              <div style={{ fontSize: 14, color: 'var(--fog)', lineHeight: 1.8, whiteSpace: 'pre-line', background: 'var(--card)', border: '1px solid var(--w1)', borderRadius: 14, padding: 24 }}>
                {section.content}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 48, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/legal/cgu" className="btn bg">CGU →</Link>
          <Link href="/legal/mentions" className="btn bg">Mentions légales →</Link>
          <a href="mailto:dpo@cohesif-ia.fr" className="btn by">Contacter le DPO →</a>
        </div>
      </div>
    </section>
  )
}
