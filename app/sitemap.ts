import { MetadataRoute } from 'next'
import { projects } from '@/lib/projects'

const BASE = 'https://www.espanias.com'

// Revalida el sitemap cada hora (para que aparezcan artículos nuevos del blog).
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE}/catalogo`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/mundial`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${BASE}/ecr`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
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

  // Artículos del blog publicados (desde la BD; si falla, se omiten sin romper).
  let postRoutes: MetadataRoute.Sitemap = []
  try {
    const { listPublishedPosts } = await import('@/lib/db/posts-repo')
    const posts = await listPublishedPosts()
    postRoutes = posts.map((p) => ({
      url: `${BASE}/blog/${p.slug}`,
      lastModified: p.updatedAt ?? p.createdAt ?? now,
      changeFrequency: 'monthly',
      priority: 0.6,
    }))
  } catch {
    postRoutes = []
  }

  return [...staticRoutes, ...projectRoutes, ...postRoutes]
}
