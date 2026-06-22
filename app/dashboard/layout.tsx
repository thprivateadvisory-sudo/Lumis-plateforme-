import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tableau de bord',
  description:
    'Votre tableau de bord Cohesif IA. Gérez vos agents, consultez vos statistiques et administrez votre abonnement.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children
}
