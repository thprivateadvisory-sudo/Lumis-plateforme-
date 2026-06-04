import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Conditions Générales d\'Utilisation — LUMIS.AI',
  description: 'CGU de la plateforme LUMIS.AI. Conditions d\'accès et d\'utilisation du service.',
}

export default function CguPage() {
  return (
    <section className="sec">
      <div className="w" style={{ maxWidth: 800 }}>
        <div className="tag">Légal</div>
        <h1 className="h2" style={{ fontSize: 'clamp(28px,4vw,48px)' }}>Conditions générales<br /><em>d&apos;utilisation</em></h1>
        <p style={{ fontSize: 13, color: 'var(--fog)', marginBottom: 48 }}>En vigueur au 1er janvier 2025</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          {[
            { title: '1. Objet', content: `Les présentes Conditions Générales d'Utilisation (CGU) régissent l'accès et l'utilisation de la plateforme LUMIS.AI, éditée par LUMIS SAS. Toute utilisation du service implique l'acceptation pleine et entière des présentes CGU.` },
            { title: '2. Accès au service', content: `L'accès à LUMIS.AI est réservé aux personnes physiques majeures et aux personnes morales. L'inscription nécessite une adresse email valide et la création d'un compte sécurisé. LUMIS se réserve le droit de refuser l'accès à toute personne ne respectant pas les présentes conditions.` },
            { title: '3. Compte utilisateur', content: `Vous êtes responsable de la confidentialité de vos identifiants de connexion. Tout accès effectué depuis votre compte est réputé effectué par vous. En cas de compromission de votre compte, vous devez notifier LUMIS immédiatement à support@lumis.ai.` },
            { title: '4. Plans et facturation', content: `Le plan Free est gratuit et sans limitation de durée. Les plans payants (Pro, Business) sont facturés mensuellement ou annuellement selon votre choix. Les prix sont indiqués HT. La TVA applicable est celle en vigueur au moment de la facturation.

Annulation : vous pouvez résilier votre abonnement à tout moment depuis votre espace client. L'accès reste actif jusqu'à la fin de la période payée. Aucun remboursement proratisé n'est applicable sauf obligation légale.` },
            { title: '5. Utilisation acceptable', content: `Il est interdit d'utiliser LUMIS.AI pour :

• Générer du contenu illégal, diffamatoire, discriminatoire ou portant atteinte aux droits de tiers
• Tenter de contourner les mesures de sécurité ou d'accéder à des données non autorisées
• Utiliser le service pour de la désinformation ou de la manipulation à grande échelle
• Entraîner des modèles concurrents avec les outputs de LUMIS
• Utiliser le service en violation des lois françaises et européennes applicables

LUMIS se réserve le droit de suspendre immédiatement tout compte en cas de violation.` },
            { title: '6. Propriété intellectuelle', content: `La plateforme LUMIS.AI, ses interfaces, ses modèles et sa technologie sont la propriété exclusive de LUMIS SAS, protégés par le droit de la propriété intellectuelle. Les contenus que vous créez restent votre propriété. Vous accordez à LUMIS une licence limitée, non-exclusive, pour traiter vos contenus dans le seul but de fournir le service.` },
            { title: '7. Disponibilité et SLA', content: `LUMIS s'engage à maintenir une disponibilité minimale de 99.9% sur les plans payants (mesuré mensuellement, hors maintenance planifiée). Les maintenances planifiées sont annoncées avec un préavis de 48h minimum.` },
            { title: '8. Limitation de responsabilité', content: `LUMIS ne saurait être tenu responsable des dommages indirects, pertes de revenus ou dommages consécutifs résultant de l'utilisation du service. La responsabilité totale de LUMIS est limitée au montant des sommes versées au cours des 12 derniers mois.

Les outputs de l'IA sont fournis à titre informatif et ne constituent pas des conseils juridiques, médicaux ou financiers. L'utilisateur est seul responsable de l'utilisation des outputs.` },
            { title: '9. Droit applicable', content: `Les présentes CGU sont soumises au droit français. Tout litige relatif à leur interprétation ou exécution sera soumis à la compétence exclusive des tribunaux de Paris, sauf disposition légale contraire.

Pour tout litige de consommation, vous pouvez recourir à la médiation via le Centre de Médiation et d'Arbitrage de Paris (CMAP).` },
          ].map(section => (
            <div key={section.title}>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 14 }}>{section.title}</h2>
              <div style={{ fontSize: 14, color: 'var(--fog)', lineHeight: 1.8, whiteSpace: 'pre-line', background: 'var(--card)', border: '1px solid var(--w1)', borderRadius: 14, padding: 24 }}>
                {section.content}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 48, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/legal/confidentialite" className="btn bg">Politique de confidentialité →</Link>
          <Link href="/contact" className="btn by">Une question ? Contactez-nous →</Link>
        </div>
      </div>
    </section>
  )
}
