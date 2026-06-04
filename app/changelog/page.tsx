import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Changelog — LUMIS.AI | Nouveautés et mises à jour',
  description: 'Toutes les mises à jour, nouvelles fonctionnalités et améliorations de la plateforme LUMIS.AI.',
}

const RELEASES = [
  {
    version: 'v3.2.0', date: '15 janvier 2025', title: 'LUMIS Ultra — Contexte 512K tokens',
    tags: [{ label: 'Majeur', color: 'var(--y)' }],
    changes: [
      { type: 'new', text: 'Contexte étendu à 512K tokens pour LUMIS Ultra' },
      { type: 'new', text: 'Mode vision multimodal : analyse d\'images et de documents PDF' },
      { type: 'new', text: 'RAG natif avec connexion à vos bases de données' },
      { type: 'improved', text: 'Latence P95 réduite de 38ms à 24ms' },
      { type: 'improved', text: 'Scores MMLU-FR améliorés de +8 points' },
      { type: 'fixed', text: 'Correction de l\'encodage des caractères spéciaux en streaming' },
    ]
  },
  {
    version: 'v3.1.0', date: '20 décembre 2024', title: 'Agents v3 — Mémoire longue durée',
    tags: [{ label: 'Majeur', color: 'var(--y)' }],
    changes: [
      { type: 'new', text: 'Mémoire persistante entre sessions pour tous les agents' },
      { type: 'new', text: 'Intégration native Slack, Teams et Notion' },
      { type: 'new', text: 'Agent Hugo RH : prise en charge du sourcing sur LinkedIn' },
      { type: 'improved', text: 'Axel Commercial : taux de conversion leads +34%' },
      { type: 'improved', text: 'Dashboard agents : nouveau mode monitoring temps réel' },
    ]
  },
  {
    version: 'v3.0.0', date: '1er décembre 2024', title: 'Refonte complète — Performance ×3',
    tags: [{ label: 'Breaking', color: 'var(--red)' }, { label: 'Majeur', color: 'var(--y)' }],
    changes: [
      { type: 'new', text: 'Architecture inference redessinée — throughput ×3' },
      { type: 'new', text: 'Marketplace IA : 600+ agents disponibles' },
      { type: 'new', text: 'API v2 avec support WebSocket natif' },
      { type: 'improved', text: 'Interface utilisateur entièrement repensée' },
      { type: 'fixed', text: 'Résolution de 47 bugs rapportés par la communauté' },
    ]
  },
  {
    version: 'v2.9.5', date: '15 novembre 2024', title: 'Correctifs et stabilité',
    tags: [{ label: 'Patch', color: 'var(--blue)' }],
    changes: [
      { type: 'fixed', text: 'Correction de la déconnexion intempestive après 30 minutes' },
      { type: 'fixed', text: 'Export CSV corrigé pour les rapports > 10 000 lignes' },
      { type: 'improved', text: 'Amélioration du temps de démarrage des agents (−40%)' },
    ]
  },
]

const TYPE_STYLES = {
  new: { label: 'Nouveau', bg: 'rgba(212,255,0,.1)', color: 'var(--y)', border: 'rgba(212,255,0,.2)' },
  improved: { label: 'Amélioré', bg: 'rgba(77,166,255,.1)', color: 'var(--blue)', border: 'rgba(77,166,255,.2)' },
  fixed: { label: 'Corrigé', bg: 'rgba(255,51,85,.08)', color: 'var(--red)', border: 'rgba(255,51,85,.2)' },
}

export default function ChangelogPage() {
  return (
    <>
      <section className="sec" style={{ background: 'radial-gradient(ellipse 70% 40% at 50% 0%,rgba(212,255,0,.05),transparent)', paddingBottom: 0 }}>
        <div className="wm" style={{ textAlign: 'center' }}>
          <div className="tag" style={{ justifyContent: 'center' }}>Changelog</div>
          <h1 className="h2">Ce qu&apos;on a<br /><em>construit pour vous.</em></h1>
          <p className="lead" style={{ margin: '0 auto' }}>
            Toutes les mises à jour, améliorations et corrections de la plateforme LUMIS.AI. Publié à chaque release.
          </p>
        </div>
      </section>

      <section className="secm">
        <div className="w" style={{ maxWidth: 840 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {RELEASES.map(release => (
              <div key={release.version} className="rv" style={{ background: 'var(--card)', border: '1px solid var(--w1)', borderRadius: 20, overflow: 'hidden' }}>
                <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--w1)', display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'var(--fm)', fontSize: 13, fontWeight: 700, color: 'var(--y)', background: 'rgba(212,255,0,.08)', border: '1px solid rgba(212,255,0,.15)', borderRadius: 6, padding: '4px 10px' }}>
                    {release.version}
                  </span>
                  {release.tags.map(tag => (
                    <span key={tag.label} style={{ fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 100, background: `${tag.color}18`, color: tag.color, border: `1px solid ${tag.color}33` }}>
                      {tag.label}
                    </span>
                  ))}
                  <span style={{ fontSize: 13, color: 'var(--fog)', marginLeft: 'auto' }}>{release.date}</span>
                </div>
                <div style={{ padding: '20px 28px' }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 18 }}>{release.title}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {release.changes.map((change, i) => {
                      const style = TYPE_STYLES[change.type as keyof typeof TYPE_STYLES]
                      return (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                          <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 6, background: style.bg, color: style.color, border: `1px solid ${style.border}`, flexShrink: 0, marginTop: 1, whiteSpace: 'nowrap' }}>
                            {style.label}
                          </span>
                          <span style={{ fontSize: 14, color: 'var(--fog)', lineHeight: 1.6 }}>{change.text}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Subscribe */}
          <div style={{ marginTop: 52, background: 'var(--card)', border: '1px solid var(--w1)', borderRadius: 20, padding: '32px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Abonnez-vous aux releases</div>
              <div style={{ fontSize: 13, color: 'var(--fog)' }}>Recevez un email à chaque nouvelle version de LUMIS.</div>
            </div>
            <a href="mailto:changelog@lumis.ai?subject=Abonnement%20changelog" className="btn by">
              S&apos;abonner →
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
