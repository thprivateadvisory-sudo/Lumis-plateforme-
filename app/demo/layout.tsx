import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Démo interactive',
  description:
    'Essayez Cohesif IA en direct, sans inscription. Posez vos questions à nos agents IA et découvrez la puissance de notre plateforme souveraine française.',
  alternates: {
    canonical: 'https://cohesif-ia.fr/demo',
  },
  openGraph: {
    title: 'Démo interactive | Cohesif IA',
    description:
      'Essayez Cohesif IA en direct. Testez nos agents IA autonomes sans inscription.',
    url: 'https://cohesif-ia.fr/demo',
  },
}

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return children
}
