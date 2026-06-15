import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { listPublishedPosts } from '@/lib/db/posts-repo'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Novedades',
  description:
    'Artículos, casos y novedades de Espanias: inteligencia artificial aplicada, proyectos y aprendizajes.',
  alternates: { canonical: 'https://www.espanias.com/blog' },
}

function formatDate(d: Date | null): string {
  if (!d) return ''
  return new Date(d).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default async function BlogPage() {
  let posts: Awaited<ReturnType<typeof listPublishedPosts>> = []
  try {
    posts = await listPublishedPosts()
  } catch {
    posts = []
  }

  return (
    <>
      <Nav />
      <main className="min-h-screen px-6 py-28 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12">
            <div className="mb-8 flex items-center gap-3">
              <div className="h-px w-8 bg-[#BF2638]" />
              <div className="h-px w-3 bg-[#D4AC0D]" />
              <span className="text-xs font-medium uppercase tracking-[0.35em] text-[#78716C]">
                Novedades
              </span>
            </div>
            <h1 className="mb-4 text-4xl font-black text-[#1C1917] md:text-5xl">Blog</h1>
            <p className="max-w-xl leading-relaxed text-[#78716C]">
              Ideas, casos y aprendizajes sobre inteligencia artificial aplicada a negocios reales.
            </p>
          </div>

          {posts.length === 0 ? (
            <p className="rounded-2xl border border-stone-200 bg-white/60 p-10 text-center text-[#78716C]">
              Pronto publicaremos las primeras novedades. ¡Vuelve pronto!
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {posts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {p.portadaUrl ? (
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={p.portadaUrl}
                        alt={p.titulo}
                        fill
                        sizes="(max-width: 640px) 100vw, 480px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="h-2 bg-gradient-to-r from-[#BF2638] to-[#6D28D9]" />
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#A8A29E]">
                      {formatDate(p.createdAt)}
                    </p>
                    <h2 className="mb-2 text-xl font-black leading-snug text-[#1C1917]">
                      {p.titulo}
                    </h2>
                    {p.resumen && (
                      <p className="line-clamp-3 text-sm leading-relaxed text-[#78716C]">
                        {p.resumen}
                      </p>
                    )}
                    <span className="mt-4 text-sm font-semibold text-[#BF2638]">
                      Leer más →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
