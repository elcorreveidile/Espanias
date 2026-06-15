'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'
import { translations } from '@/lib/translations'

export interface BlogCardData {
  slug: string
  titulo: string
  tituloEn: string | null
  resumen: string | null
  resumenEn: string | null
  portadaUrl: string | null
  createdAt: string | null
}

export default function BlogIndex({ posts }: { posts: BlogCardData[] }) {
  const { lang } = useLanguage()
  const t = translations[lang].blog

  const fmt = (iso: string | null) =>
    iso
      ? new Date(iso).toLocaleDateString(lang === 'en' ? 'en-GB' : 'es-ES', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      : ''
  const pick = (es: string | null, en: string | null) => (lang === 'en' && en ? en : es ?? '')

  return (
    <main className="min-h-screen px-6 py-28 md:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12">
          <div className="mb-8 flex items-center gap-3">
            <div className="h-px w-8 bg-[#BF2638]" />
            <div className="h-px w-3 bg-[#D4AC0D]" />
            <span className="text-xs font-medium uppercase tracking-[0.35em] text-[#78716C] dark:text-[#A8A29E]">
              {t.eyebrow}
            </span>
          </div>
          <h1 className="mb-4 text-4xl font-black text-[#1C1917] md:text-5xl dark:text-[#F5F5F4]">
            {t.title}
          </h1>
          <p className="max-w-xl leading-relaxed text-[#78716C] dark:text-[#A8A29E]">{t.subtitle}</p>
        </div>

        {posts.length === 0 ? (
          <p className="rounded-2xl border border-stone-200 bg-white/60 p-10 text-center text-[#78716C] dark:border-white/10 dark:bg-white/[0.03] dark:text-[#A8A29E]">
            {t.empty}
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {posts.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-[#1C1917]"
              >
                {p.portadaUrl ? (
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={p.portadaUrl}
                      alt={pick(p.titulo, p.tituloEn)}
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
                    {fmt(p.createdAt)}
                  </p>
                  <h2 className="mb-2 text-xl font-black leading-snug text-[#1C1917] dark:text-[#F5F5F4]">
                    {pick(p.titulo, p.tituloEn)}
                  </h2>
                  {pick(p.resumen, p.resumenEn) && (
                    <p className="line-clamp-3 text-sm leading-relaxed text-[#78716C] dark:text-[#A8A29E]">
                      {pick(p.resumen, p.resumenEn)}
                    </p>
                  )}
                  <span className="mt-4 text-sm font-semibold text-[#BF2638]">{t.readMore}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
