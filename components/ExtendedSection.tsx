'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { pageContent, type PageKey } from '@/lib/page-content'

// Convierte enlaces estilo markdown [texto](url) en <a> dentro de un párrafo.
function renderRich(text: string): ReactNode[] {
  const parts: ReactNode[] = []
  const re = /\[([^\]]+)\]\(([^)]+)\)/g
  let last = 0
  let m: RegExpExecArray | null
  let key = 0
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    parts.push(
      <a
        key={key++}
        href={m[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-[#BF2638] underline underline-offset-2 hover:text-[#A01E30]"
      >
        {m[1]}
      </a>
    )
    last = m.index + m[0].length
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts
}

export default function ExtendedSection({ page }: { page: PageKey }) {
  const { lang } = useLanguage()
  const blocks = pageContent[lang][page]

  return (
    <>
      {blocks.map((b, i) => {
        const colClass = b.cols === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
        return (
          <section
            key={i}
            className={`px-6 py-24 md:py-28 ${b.dark ? 'bg-[#1C1917]' : ''}`}
          >
            <div className="mx-auto max-w-6xl">
              {/* Eyebrow */}
              <div className="mb-8 flex items-center gap-3">
                <div className="h-px w-8 bg-[#6D28D9]" />
                <div className="h-px w-3 bg-[#BF2638]" />
                <span className="text-xs font-medium uppercase tracking-[0.35em] text-[#78716C]">
                  {b.eyebrow}
                </span>
              </div>

              <h2
                className={`mb-6 max-w-3xl text-3xl font-black leading-tight md:text-5xl ${
                  b.dark ? 'text-[#F9F7F4]' : 'text-[#1C1917]'
                }`}
              >
                {b.title}
              </h2>

              {b.intro && (
                <p
                  className={`mb-10 max-w-2xl text-lg leading-relaxed ${
                    b.dark ? 'text-[#A8A29E]' : 'text-[#78716C]'
                  }`}
                >
                  {b.intro}
                </p>
              )}

              {b.paragraphs && (
                <div className="mb-10 max-w-2xl space-y-4">
                  {b.paragraphs.map((p, j) => (
                    <p
                      key={j}
                      className={`leading-relaxed ${b.dark ? 'text-[#A8A29E]' : 'text-[#57534E]'}`}
                    >
                      {renderRich(p)}
                    </p>
                  ))}
                </div>
              )}

              {b.links && (
                <div className="mb-10 flex flex-wrap gap-x-6 gap-y-2">
                  {b.links.map((l, j) => (
                    <a
                      key={j}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-[#BF2638] underline underline-offset-4 transition-colors hover:text-[#A01E30]"
                    >
                      {l.label} ↗
                    </a>
                  ))}
                </div>
              )}

              {b.cards && (
                <div className={`mb-10 grid gap-5 sm:grid-cols-2 ${colClass}`}>
                  {b.cards.map((c, j) => (
                    <div
                      key={j}
                      className={`rounded-2xl border p-6 ${
                        b.dark
                          ? 'border-white/10 bg-white/[0.04]'
                          : 'border-stone-200 bg-white'
                      }`}
                    >
                      {b.numbered && (
                        <span className="mb-3 block text-sm font-black text-[#BF2638]">
                          {String(j + 1).padStart(2, '0')}
                        </span>
                      )}
                      <h3
                        className={`mb-2 text-lg font-bold ${
                          b.dark ? 'text-[#F9F7F4]' : 'text-[#1C1917]'
                        }`}
                      >
                        {c.title}
                      </h3>
                      <p
                        className={`text-sm leading-relaxed ${
                          b.dark ? 'text-[#A8A29E]' : 'text-[#78716C]'
                        }`}
                      >
                        {c.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {b.cta && b.ctaHref && (
                <Link
                  href={b.ctaHref}
                  className="group inline-flex items-center gap-2 rounded-full bg-[#BF2638] px-8 py-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#A01E30]"
                >
                  {b.cta}
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
            </div>
          </section>
        )
      })}
    </>
  )
}
