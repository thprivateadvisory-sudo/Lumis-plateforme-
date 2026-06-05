import type { Metadata } from 'next'
import TarifsClient from './TarifsClient'

export const metadata: Metadata = {
  title: 'Tarifs Cohesif IA — Prix honnêtes, valeur maximale',
  description:
    "Plans Free, Pro (29€/mois), Business (149€/mois) et Enterprise. 14 jours d’essai gratuit. Données hébergées en France, RGPD natif. Annulation à tout moment.",
  openGraph: {
    title: 'Tarifs Cohesif IA',
    description: 'Commencez gratuitement. Scalez sans limites. ROI moyen ×8 en 3 mois.',
    url: 'https://cohesif.ai/tarifs',
  },
}

export default function TarifsPage() {
  return <TarifsClient />
}
