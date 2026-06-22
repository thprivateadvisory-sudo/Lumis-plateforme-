import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Investir dans Cohesif IA',
  description:
    'Investissez dans Cohesif IA, la plateforme IA souveraine française en pleine croissance. Série B, 40M€ levés, +420% ARR. Découvrez notre vision et nos résultats.',
  alternates: {
    canonical: 'https://cohesif-ia.fr/investir',
  },
  openGraph: {
    title: 'Investir dans Cohesif IA',
    description:
      'Investissez dans la plateforme IA souveraine française en pleine croissance. Série B, 40M€ levés.',
    url: 'https://cohesif-ia.fr/investir',
  },
}

export default function InvestirLayout({ children }: { children: React.ReactNode }) {
  return children
}
