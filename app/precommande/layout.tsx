import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Précommande',
  description:
    'Précommandez votre accès à Cohesif IA. Réservez votre place et bénéficiez d\'un tarif préférentiel sur notre plateforme IA souveraine française.',
  alternates: {
    canonical: 'https://cohesif-ia.fr/precommande',
  },
  openGraph: {
    title: 'Précommande | Cohesif IA',
    description:
      'Réservez votre accès à Cohesif IA avec un tarif préférentiel.',
    url: 'https://cohesif-ia.fr/precommande',
  },
}

export default function PrecommandeLayout({ children }: { children: React.ReactNode }) {
  return children
}
