import { MetadataRoute } from 'next'
import { projects } from '@/lib/projects'

const BASE = 'https://www.espanias.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE}/catalogo`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/servicios`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/ia-empresas`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/manifiesto`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/contacto`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/aviso-legal`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/privacidad`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/cookies`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${BASE}/catalogo/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...projectRoutes]
}
