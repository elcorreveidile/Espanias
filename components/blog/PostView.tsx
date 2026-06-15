'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'
import { translations } from '@/lib/translations'
import PostContent from '@/components/PostContent'

export interface BlogPostData {
  slug: string
  titulo: string
  tituloEn: string | null
  contenido: string | null
  contenidoEn: string | null
  portadaUrl: string | null
  createdAt: string | null
}

export default function PostView({ post }: { post: BlogPostData }) {
  const { lang } = useLanguage()
  const t = translations[lang].blog

  const title = lang === 'en' && post.tituloEn ? post.tituloEn : post.titulo
  const content = lang === 'en' && post.contenidoEn ? post.contenidoEn : post.contenido ?? ''
  const date = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString(lang === 'en' ? 'en-GB' : 'es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : ''

  return (
    <main className="min-h-screen px-6 py-28 md:py-32">
      <article className="mx-auto max-w-2xl">
        <Link
          href="/blog"
          className="mb-8 inline-block text-sm font-medium text-[#78716C] dark:text-[#A8A29E] transition-colors hover:text-[#6D28D9]"
        >
          {t.back}
        </Link>

        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#A8A29E]">{date}</p>
        <h1 className="mb-6 text-4xl font-black leading-tight text-[#1C1917] md:text-5xl dark:text-[#F5F5F4]">
          {title}
        </h1>

        {post.portadaUrl && (
          <div className="mb-10 overflow-hidden rounded-2xl border border-stone-200 dark:border-white/10">
            <Image
              src={post.portadaUrl}
              alt={title}
              width={1200}
              height={675}
              sizes="(max-width: 768px) 100vw, 700px"
              className="h-auto w-full"
              priority
            />
          </div>
        )}

        <PostContent markdown={content} />

        <div className="mt-14 rounded-2xl bg-[#1C1917] p-8 text-center text-white">
          <h2 className="mb-2 text-xl font-black">{t.ctaTitle}</h2>
          <p className="mb-5 text-sm text-stone-300">{t.ctaText}</p>
          <Link
            href="/contacto"
            className="inline-block rounded-full bg-gradient-to-r from-[#BF2638] to-[#6D28D9] px-7 py-3 text-sm font-semibold text-white transition hover:brightness-110"
          >
            {t.ctaButton}
          </Link>
        </div>
      </article>
    </main>
  )
}
