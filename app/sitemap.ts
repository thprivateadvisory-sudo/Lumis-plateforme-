import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://cohesif.ai'
  const now = new Date()

  const pages = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/demo', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/tarifs', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/agents', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/produits', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/investir', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/academie', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/entreprises', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/docs', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/blog', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/status', priority: 0.5, changeFrequency: 'daily' as const },
    { path: '/changelog', priority: 0.5, changeFrequency: 'weekly' as const },
    { path: '/carrieres', priority: 0.6, changeFrequency: 'weekly' as const },
    { path: '/presse', priority: 0.5, changeFrequency: 'monthly' as const },
    { path: '/roi', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/guide', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/checkout/success', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/legal/confidentialite', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/legal/cgu', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/legal/mentions', priority: 0.3, changeFrequency: 'yearly' as const },
  ]

  return pages.map(({ path, priority, changeFrequency }) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }))
}
