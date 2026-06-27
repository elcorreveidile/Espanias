'use client'

import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'

// Banner del Reto Mundial para la portada (visible sin abrir el menú).
export default function MundialBanner() {
  const { lang } = useLanguage()
  const title = lang === 'es' ? 'Reto Mundial 2026' : 'World Cup 2026'
  const desc =
    lang === 'es'
      ? '· Marca tu penalti y gana hasta una WEB GRATIS'
      : '· Score your penalty and win up to a FREE website'
  const cta = lang === 'es' ? 'Jugar' : 'Play'

  return (
    <div className="mb-8 flex justify-center">
      <Link
        href="/mundial"
        className="group inline-flex max-w-full items-center gap-2.5 rounded-full border border-[#BF2638]/30 bg-white/85 px-3 py-2 text-sm shadow-sm backdrop-blur transition hover:border-[#BF2638] hover:shadow-md dark:bg-white/10"
      >
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#BF2638] opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#BF2638]" />
        </span>
        <span className="text-base leading-none">🇪🇸</span>
        <span className="font-bold text-[#1C1917] dark:text-[#F5F5F4]">{title}</span>
        <span className="hidden text-[#78716C] sm:inline dark:text-[#A8A29E]">{desc}</span>
        <span className="flex shrink-0 items-center gap-1 rounded-full bg-gradient-to-r from-[#BF2638] to-[#6D28D9] px-3 py-1 text-xs font-bold text-white">
          {cta}
          <svg
            className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </Link>
    </div>
  )
}
