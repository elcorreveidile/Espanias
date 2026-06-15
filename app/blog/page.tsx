import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import BlogIndex, { type BlogCardData } from '@/components/blog/BlogIndex'
import { listPublishedPosts } from '@/lib/db/posts-repo'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Artículos, casos y novedades de Espanias: inteligencia artificial aplicada, proyectos y aprendizajes.',
  alternates: { canonical: 'https://www.espanias.com/blog' },
}

export default async function BlogPage() {
  let rows: Awaited<ReturnType<typeof listPublishedPosts>> = []
  try {
    rows = await listPublishedPosts()
  } catch {
    rows = []
  }

  const posts: BlogCardData[] = rows.map((p) => ({
    slug: p.slug,
    titulo: p.titulo,
    tituloEn: p.tituloEn ?? null,
    resumen: p.resumen ?? null,
    resumenEn: p.resumenEn ?? null,
    portadaUrl: p.portadaUrl ?? null,
    createdAt: p.createdAt ? new Date(p.createdAt).toISOString() : null,
  }))

  return (
    <>
      <Nav />
      <BlogIndex posts={posts} />
      <Footer />
    </>
  )
}
