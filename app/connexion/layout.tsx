import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Connexion',
  description:
    'Connectez-vous à votre compte Cohesif IA ou créez un nouveau compte pour accéder à la plateforme IA souveraine française.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://cohesif-ia.fr/connexion',
  },
}

export default function ConnexionLayout({ children }: { children: React.ReactNode }) {
  return children
}
