import { MetadataRoute } from 'next'
import { projects } from '@/lib/projects'

const BASE = 'https://www.espanias.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE}/catalogo`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/servicios`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/ia-empresas`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/manifiesto`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/contacto`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/aviso-legal`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/privacidad`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/cookies`, changeFrequency: 'yearly', priority: 0.3 },
  ].map((r) => ({ ...r, lastModified: now }))

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${BASE}/catalogo/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...projectRoutes]
}
