import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Mentions Légales — LUMIS.AI',
  description: 'Mentions légales de LUMIS.AI — éditeur, hébergeur, propriété intellectuelle.',
}

export default function MentionsPage() {
  return (
    <section className="sec">
      <div className="w" style={{ maxWidth: 800 }}>
        <div className="tag">Légal</div>
        <h1 className="h2" style={{ fontSize: 'clamp(28px,4vw,48px)' }}>Mentions<br /><em>légales</em></h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32, marginTop: 48 }}>
          {[
            {
              title: 'Éditeur du site',
              items: [
                ['Raison sociale', 'LUMIS SAS'],
                ['Forme juridique', 'Société par Actions Simplifiée (SAS)'],
                ['Capital social', '500 000 €'],
                ['SIRET', '123 456 789 00012'],
                ['RCS', 'Paris B 123 456 789'],
                ['Code APE', '6201Z — Programmation informatique'],
                ['Siège social', '42 avenue des Champs-Élysées, 75008 Paris, France'],
                ['Téléphone', '+33 1 23 45 67 89'],
                ['Email', 'contact@lumis.ai'],
                ['Directeur de publication', 'Alexandre Martin, Président'],
              ]
            },
            {
              title: 'Hébergement',
              items: [
                ['Hébergeur principal', 'OVH Cloud SAS'],
                ['Adresse', '2 rue Kellermann, 59100 Roubaix, France'],
                ['Datacenter', 'Île-de-France DC1 & DC2'],
                ['Certification', 'ISO 27001, HDS (Hébergement Données de Santé)'],
              ]
            },
            {
              title: 'Propriété intellectuelle',
              items: [
                ['Marque', 'LUMIS® est une marque déposée à l\'INPI sous le n° 4 XXX XXX'],
                ['Brevets', '14 brevets déposés en France et à l\'EPO'],
                ['Code source', 'Propriété exclusive de LUMIS SAS. Tous droits réservés.'],
              ]
            },
            {
              title: 'Données personnelles',
              items: [
                ['DPO', 'dpo@lumis.ai'],
                ['Autorité compétente', 'Commission Nationale de l\'Informatique et des Libertés (CNIL)'],
                ['Déclaration CNIL', 'Conformité RGPD — aucune déclaration préalable requise'],
              ]
            },
          ].map(section => (
            <div key={section.title} style={{ background: 'var(--card)', border: '1px solid var(--w1)', borderRadius: 18, overflow: 'hidden' }}>
              <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--w1)', fontWeight: 700, fontSize: 16 }}>
                {section.title}
              </div>
              <div style={{ padding: '8px 0' }}>
                {section.items.map(([key, value]) => (
                  <div key={key} style={{ display: 'flex', gap: 16, padding: '12px 24px', borderBottom: '1px solid rgba(255,255,255,.04)' }}>
                    <span style={{ fontSize: 13, color: 'var(--fog)', flexShrink: 0, minWidth: 200 }}>{key}</span>
                    <span style={{ fontSize: 13, color: 'var(--snow)' }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 48, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/legal/confidentialite" className="btn bg">Confidentialité →</Link>
          <Link href="/legal/cgu" className="btn bg">CGU →</Link>
        </div>
      </div>
    </section>
  )
}
