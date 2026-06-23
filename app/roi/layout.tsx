import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Calculateur ROI',
  description:
    'Calculez le retour sur investissement de Cohesif IA pour votre organisation. Estimez les gains de productivité, les heures libérées et le délai de rentabilité.',
  alternates: {
    canonical: 'https://cohesif-ia.fr/roi',
  },
  openGraph: {
    title: 'Calculateur ROI | Cohesif IA',
    description:
      'Estimez le ROI de Cohesif IA pour votre organisation : gains de productivité, heures libérées, délai de rentabilité.',
    url: 'https://cohesif-ia.fr/roi',
  },
}

export default function ROILayout({ children }: { children: React.ReactNode }) {
  return children
}
