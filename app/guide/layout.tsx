import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Guide — 10 Automatisations IA pour PME',
  description:
    'Téléchargez notre guide gratuit : 10 automatisations IA concrètes pour les PME françaises. Prospection, support, finance, marketing, RH — avec ROI estimé.',
  alternates: {
    canonical: 'https://cohesif-ia.fr/guide',
  },
  openGraph: {
    title: 'Guide gratuit — 10 Automatisations IA pour PME | Cohesif IA',
    description:
      '10 automatisations IA concrètes pour les PME françaises, avec ROI estimé pour chacune.',
    url: 'https://cohesif-ia.fr/guide',
  },
}

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return children
}
