import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contactez l\'équipe Cohesif IA. Demandez une démonstration, un devis personnalisé ou posez vos questions sur notre plateforme IA souveraine française.',
  alternates: {
    canonical: 'https://cohesif-ia.fr/contact',
  },
  openGraph: {
    title: 'Contact | Cohesif IA',
    description:
      'Contactez l\'équipe Cohesif IA pour une démonstration ou un devis personnalisé.',
    url: 'https://cohesif-ia.fr/contact',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
