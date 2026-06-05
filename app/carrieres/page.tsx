import type { Metadata } from 'next'
import CarrieresClient from './CarrieresClient'

export const metadata: Metadata = {
  title: 'Carrières — Rejoignez Cohesif IA | 31 postes ouverts',
  description: "Rejoignez l'équipe qui construit l'IA souveraine française. 31 postes ouverts à Paris. Remote-first, stock-options, mission qui compte.",
}

export default function CarrieresPage() {
  return <CarrieresClient />
}
