import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Agents IA — Marketplace',
  description:
    'Découvrez notre marketplace d\'agents IA autonomes spécialisés par métier : commercial, finance, marketing, support, juridique, RH. Configurez en 5 minutes, déployez en un clic.',
  alternates: {
    canonical: 'https://cohesif-ia.fr/agents',
  },
  openGraph: {
    title: 'Agents IA — Marketplace | Cohesif IA',
    description:
      'Agents IA autonomes spécialisés par métier. Configurez en 5 minutes, déployez en un clic, mesurez le ROI dès le premier jour.',
    url: 'https://cohesif-ia.fr/agents',
  },
}

export default function AgentsLayout({ children }: { children: React.ReactNode }) {
  return children
}
