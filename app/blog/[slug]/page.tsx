import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import PostView, { type BlogPostData } from '@/components/blog/PostView'
import { getPost } from '@/lib/db/posts-repo'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  let post
  try {
    post = await getPost(slug)
  } catch {
    post = undefined
  }
  if (!post || !post.publicado) return {}
  return {
    title: post.titulo,
    description: post.resumen ?? undefined,
    alternates: { canonical: `https://www.espanias.com/blog/${post.slug}` },
    openGraph: {
      title: `${post.titulo} | Espanias`,
      description: post.resumen ?? undefined,
      type: 'article',
      url: `https://www.espanias.com/blog/${post.slug}`,
    },
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  let post
  try {
    post = await getPost(slug)
  } catch {
    post = undefined
  }
  if (!post || !post.publicado) notFound()

  const data: BlogPostData = {
    slug: post.slug,
    titulo: post.titulo,
    tituloEn: post.tituloEn ?? null,
    contenido: post.contenido ?? null,
    contenidoEn: post.contenidoEn ?? null,
    portadaUrl: post.portadaUrl ?? null,
    createdAt: post.createdAt ? new Date(post.createdAt).toISOString() : null,
  }

  return (
    <>
      <Nav />
      <PostView post={data} />
      <Footer />
    </>
  )
}
