import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
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

function formatDate(d: Date | null): string {
  if (!d) return ''
  return new Date(d).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
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

  const paragraphs = (post.contenido ?? '')
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <>
      <Nav />
      <main className="min-h-screen px-6 py-28 md:py-32">
        <article className="mx-auto max-w-2xl">
          <Link
            href="/blog"
            className="mb-8 inline-block text-sm font-medium text-[#78716C] dark:text-[#A8A29E] transition-colors hover:text-[#6D28D9]"
          >
            ← Volver a Novedades
          </Link>

          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#A8A29E]">
            {formatDate(post.createdAt)}
          </p>
          <h1 className="mb-6 text-4xl font-black leading-tight text-[#1C1917] md:text-5xl dark:text-[#F5F5F4]">
            {post.titulo}
          </h1>

          {post.portadaUrl && (
            <div className="mb-10 overflow-hidden rounded-2xl border border-stone-200 dark:border-white/10">
              <Image
                src={post.portadaUrl}
                alt={post.titulo}
                width={1200}
                height={675}
                sizes="(max-width: 768px) 100vw, 700px"
                className="h-auto w-full"
                priority
              />
            </div>
          )}

          <div className="space-y-5 text-lg leading-relaxed text-[#44403C] dark:text-[#D6D3D1]">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-14 rounded-2xl bg-[#1C1917] p-8 text-center text-white">
            <h2 className="mb-2 text-xl font-black">¿Hablamos de tu proyecto?</h2>
            <p className="mb-5 text-sm text-stone-300">
              Te ayudamos a aplicar la IA en tu negocio.
            </p>
            <Link
              href="/contacto"
              className="inline-block rounded-full bg-gradient-to-r from-[#BF2638] to-[#6D28D9] px-7 py-3 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Contactar
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
