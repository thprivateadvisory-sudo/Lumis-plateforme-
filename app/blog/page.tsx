import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog Cohesif IA — IA, Business & Souveraineté Numérique',
  description:
    "Conseils pratiques, analyses techniques et retours d'expérience sur l'IA en entreprise. Automatisation, RGPD, ROI, benchmarks — par les experts Cohesif.",
  openGraph: {
    title: 'Blog Cohesif IA',
    description: 'IA en entreprise : guides pratiques, benchmarks et analyses réglementaires.',
    url: 'https://cohesif.ai/blog',
  },
}

const ARTICLES = [
  {
    slug: 'automatiser-prospection-commerciale-ia-2025',
    category: 'IA & Business',
    categoryColor: '#4da6ff',
    categoryBg: 'rgba(77,166,255,.12)',
    title: "Comment automatiser votre prospection commerciale avec l'IA en 2025",
    excerpt:
      'La prospection manuelle coûte en moyenne 3h par commercial et par jour — une ressource précieuse gaspillée sur des tâches répétitives. Découvrez comment les équipes commerciales les plus performantes utilisent les agents IA pour qualifier 10× plus de leads sans augmenter leurs effectifs.',
    readTime: '8 min',
    date: '28 janvier 2025',
    author: 'Thomas Renard',
    role: 'Head of Growth, Cohesif IA',
    initials: 'TR',
    avatarColor: '#4da6ff',
    featured: true,
  },
  {
    slug: 'lumis-vs-gpt4o-benchmark-francais',
    category: 'Technique',
    categoryColor: '#0BC8F0',
    categoryBg: 'rgba(11,200,240,.12)',
    title: 'Cohesif vs GPT-4o : Benchmark complet sur le français',
    excerpt:
      'Nous avons soumis Cohesif Ultra et GPT-4o à 847 tâches représentatives du monde professionnel français : rédaction juridique, analyse financière, code Python, compréhension de textes techniques. Les résultats sont sans appel sur 6 des 8 catégories testées.',
    readTime: '12 min',
    date: '21 janvier 2025',
    author: 'Dr. Sophie Lambert',
    role: 'Head of Research, Cohesif IA',
    initials: 'SL',
    avatarColor: '#0BC8F0',
    featured: false,
  },
  {
    slug: 'rgpd-ia-souverainete-donnees-entreprises-francaises',
    category: 'Réglementation',
    categoryColor: '#ff8899',
    categoryBg: 'rgba(255,51,85,.12)',
    title: 'RGPD et IA : pourquoi la souveraineté des données est non-négociable pour les entreprises françaises',
    excerpt:
      "En 2024, la CNIL a prononcé 42 sanctions liées à l'utilisation d'outils IA non conformes, pour un total de 28M€ d'amendes. Cet article explique pourquoi héberger vos données IA hors de l'UE constitue un risque juridique majeur, et comment y remédier.",
    readTime: '6 min',
    date: '15 janvier 2025',
    author: 'Maître Clara Petit',
    role: 'DPO & Juriste, Cohesif IA',
    initials: 'CP',
    avatarColor: '#ff8899',
    featured: false,
  },
  {
    slug: 'roi-ia-entreprise-methode-mesurer',
    category: 'Stratégie',
    categoryColor: '#a78bfa',
    categoryBg: 'rgba(167,139,250,.12)',
    title: "ROI de l'IA en entreprise : notre méthode pour le mesurer objectivement",
    excerpt:
      'La majorité des projets IA échouent non pas pour des raisons techniques, mais parce que les entreprises ne savent pas mesurer leur valeur réelle. Notre framework en 5 étapes vous permet de calculer un ROI précis avant même de lancer votre projet.',
    readTime: '10 min',
    date: '8 janvier 2025',
    author: 'Marc Dubois',
    role: 'CFO & Co-founder, Cohesif IA',
    initials: 'MD',
    avatarColor: '#a78bfa',
    featured: false,
  },
]

const CATEGORIES = ['Tous', 'IA & Business', 'Technique', 'Réglementation', 'Stratégie', 'Produit']

export default function BlogPage() {
  const [featured, ...rest] = ARTICLES

  return (
    <div>

      {/* Hero */}
      <section className="sec" style={{ textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,.06)', paddingBottom: 64 }}>
        <div className="ws">
          <div className="tag" style={{ justifyContent: 'center' }}>Blog Cohesif IA</div>
          <h1 className="h2" style={{ textAlign: 'center' }}>
            IA, Business &<br /><em>Souveraineté</em>
          </h1>
          <p className="lead" style={{ margin: '0 auto 32px', textAlign: 'center' }}>
            Conseils pratiques, benchmarks techniques et analyses réglementaires par les experts Cohesif. Publié chaque semaine.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <div style={{
              background: 'var(--card)',
              border: '1px solid rgba(255,255,255,.08)',
              borderRadius: '8px',
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              width: '320px',
            }}>
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                <circle cx="9" cy="9" r="7" stroke="#8892aa" strokeWidth="2" />
                <path d="m14 14 4 4" stroke="#8892aa" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span style={{ fontSize: '13px', color: 'var(--fog)' }}>Rechercher un article...</span>
            </div>
          </div>
        </div>
      </section>

      {/* Category filter */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,.06)', background: 'var(--panel)' }}>
        <div className="w" style={{ display: 'flex', gap: '4px', padding: '12px 24px', overflowX: 'auto' }}>
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat}
              style={{
                background: i === 0 ? 'var(--y)' : 'transparent',
                color: i === 0 ? '#000' : 'var(--fog)',
                border: i === 0 ? 'none' : '1px solid rgba(255,255,255,.08)',
                borderRadius: '8px',
                padding: '7px 16px',
                fontSize: '13px',
                fontWeight: i === 0 ? 700 : 500,
                cursor: 'pointer',
                fontFamily: 'var(--fh)',
                whiteSpace: 'nowrap',
                transition: 'all .15s',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="w" style={{ padding: '56px 24px 96px' }}>

        {/* Featured article */}
        <div style={{ marginBottom: '64px' }}>
          <div className="g2" style={{
            background: 'var(--card)',
            border: '1px solid rgba(255,255,255,.08)',
            borderRadius: '20px',
            overflow: 'hidden',
          }}>
            {/* Content */}
            <div style={{ padding: '48px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '4px 12px',
                  borderRadius: '100px',
                  background: featured.categoryBg,
                  color: featured.categoryColor,
                }}>
                  {featured.category}
                </span>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '100px',
                  background: 'rgba(11,200,240,.12)',
                  color: 'var(--y)',
                  border: '1px solid rgba(11,200,240,.2)',
                }}>
                  À la une
                </span>
              </div>
              <h2 style={{
                fontSize: 'clamp(22px, 3vw, 32px)',
                fontWeight: 800,
                letterSpacing: '-.03em',
                lineHeight: 1.15,
                marginBottom: '16px',
                color: 'var(--snow)',
              }}>
                {featured.title}
              </h2>
              <p style={{ color: 'var(--fog)', fontSize: '15px', lineHeight: 1.72, marginBottom: '32px' }}>
                {featured.excerpt}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: featured.categoryBg,
                  border: `1px solid ${featured.categoryColor}40`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '13px',
                  fontWeight: 800,
                  color: featured.categoryColor,
                  flexShrink: 0,
                }}>
                  {featured.initials}
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--snow)' }}>{featured.author}</div>
                  <div style={{ fontSize: '12px', color: 'var(--fog)' }}>{featured.role}</div>
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', color: 'var(--fog)' }}>{featured.readTime} de lecture</span>
                  <span style={{ color: 'rgba(255,255,255,.2)', fontSize: '12px' }}>·</span>
                  <span style={{ fontSize: '13px', color: 'var(--fog)' }}>{featured.date}</span>
                </div>
              </div>
              <Link
                href={`/blog/${featured.slug}`}
                className="btn by"
                style={{ display: 'inline-flex', gap: '8px', alignItems: 'center' }}
              >
                Lire l'article
                <span>→</span>
              </Link>
            </div>

            {/* Visual panel */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(77,166,255,.15), rgba(11,200,240,.08))',
              borderLeft: '1px solid rgba(255,255,255,.06)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '48px 32px',
              gap: '20px',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute',
                top: '-40px',
                right: '-40px',
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                background: 'rgba(77,166,255,.08)',
                filter: 'blur(40px)',
              }} />
              {[
                { label: 'Leads qualifiés', value: '×10', color: '#4da6ff' },
                { label: 'Temps économisé', value: '3h/jour', color: '#0BC8F0' },
                { label: 'Taux de réponse', value: '+340%', color: '#a78bfa' },
              ].map((stat) => (
                <div key={stat.label} style={{
                  background: 'rgba(255,255,255,.04)',
                  border: '1px solid rgba(255,255,255,.08)',
                  borderRadius: '12px',
                  padding: '16px 24px',
                  width: '100%',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '28px', fontWeight: 800, color: stat.color, letterSpacing: '-.03em' }}>{stat.value}</div>
                  <div style={{ fontSize: '13px', color: 'var(--fog)', marginTop: '4px' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Article grid */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '24px', color: 'var(--snow)' }}>
            Articles récents
          </h2>
          <div className="g3" style={{ gap: '20px' }}>
            {rest.map((article) => (
              <article
                key={article.slug}
                style={{
                  background: 'var(--card)',
                  border: '1px solid rgba(255,255,255,.06)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'border-color .2s, transform .2s',
                }}
              >
                {/* Color band */}
                <div style={{
                  height: '4px',
                  background: `linear-gradient(90deg, ${article.categoryColor}, ${article.categoryColor}44)`,
                }} />

                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ marginBottom: '14px' }}>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '100px',
                      background: article.categoryBg,
                      color: article.categoryColor,
                    }}>
                      {article.category}
                    </span>
                  </div>

                  <h3 style={{
                    fontSize: '17px',
                    fontWeight: 700,
                    lineHeight: 1.35,
                    letterSpacing: '-.02em',
                    marginBottom: '12px',
                    color: 'var(--snow)',
                    flex: 1,
                  }}>
                    {article.title}
                  </h3>

                  <p style={{
                    fontSize: '13px',
                    color: 'var(--fog)',
                    lineHeight: 1.65,
                    marginBottom: '20px',
                    display: '-webkit-box',
                    WebkitLineClamp: '3',
                    WebkitBoxOrient: 'vertical' as const,
                    overflow: 'hidden',
                  }}>
                    {article.excerpt}
                  </p>

                  {/* Author */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    paddingTop: '16px',
                    borderTop: '1px solid rgba(255,255,255,.06)',
                    marginBottom: '16px',
                  }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: article.categoryBg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      fontWeight: 800,
                      color: article.categoryColor,
                      flexShrink: 0,
                    }}>
                      {article.initials}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--snow)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{article.author}</div>
                      <div style={{ fontSize: '11px', color: 'var(--fog)' }}>{article.date} · {article.readTime}</div>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${article.slug}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '13px',
                      fontWeight: 700,
                      color: article.categoryColor,
                      textDecoration: 'none',
                      padding: '8px 14px',
                      background: article.categoryBg,
                      borderRadius: '8px',
                      alignSelf: 'flex-start',
                      transition: 'opacity .15s',
                    }}
                  >
                    Lire l'article →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="g2-asym" style={{
          background: 'linear-gradient(135deg, var(--card), rgba(11, 200, 240, .04))',
          border: '1px solid rgba(11,200,240,.15)',
          borderRadius: '20px',
          padding: '48px',
          gap: '32px',
          alignItems: 'center',
          marginTop: '48px',
        }}>
          <div>
            <div className="tag">Newsletter</div>
            <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px', letterSpacing: '-.03em' }}>
              L'essentiel de l'IA chaque semaine
            </h3>
            <p style={{ color: 'var(--fog)', fontSize: '14px', lineHeight: 1.7, maxWidth: '480px' }}>
              Rejoignez 18 400 dirigeants et équipes tech qui reçoivent notre veille IA tous les mardis matin. Zéro spam. Désinscription en un clic.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
            <input
              type="email"
              placeholder="votre@email.fr"
              style={{
                background: 'var(--panel)',
                border: '1px solid rgba(255,255,255,.1)',
                borderRadius: '10px',
                padding: '12px 18px',
                fontSize: '14px',
                color: 'var(--snow)',
                fontFamily: 'var(--fh)',
                outline: 'none',
                width: '260px',
              }}
            />
            <button className="btn by" style={{ whiteSpace: 'nowrap' }}>
              S'abonner →
            </button>
          </div>
        </div>
      </div>

      {/* Footer minimal */}
      <footer style={{
        borderTop: '1px solid rgba(255,255,255,.06)',
        padding: '32px 0',
        textAlign: 'center',
      }}>
        <div className="w">
          <p style={{ fontSize: '13px', color: 'var(--fog)' }}>
            © 2025 Cohesif SAS — <Link href="/legal/mentions" style={{ color: 'var(--fog)', textDecoration: 'none' }}>Mentions légales</Link> · <Link href="/legal/confidentialite" style={{ color: 'var(--fog)', textDecoration: 'none' }}>Confidentialité</Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
