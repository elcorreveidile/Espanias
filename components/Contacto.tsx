'use client'

import { useLanguage } from '@/context/LanguageContext'
import { translations } from '@/lib/translations'

export default function Contacto() {
  const { lang } = useLanguage()
  const t = translations[lang].contact

  return (
    <section id="contacto" className="py-28 md:py-36 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-px bg-[#BF2638]" />
          <div className="w-3 h-px bg-[#D4AC0D]" />
          <span className="text-xs uppercase tracking-[0.35em] text-[#78716C] font-medium">
            {t.eyebrow}
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl font-black text-[#1C1917] mb-5">{t.title}</h2>
        <p className="text-[#78716C] max-w-md mb-12 leading-relaxed text-base md:text-lg">
          {t.subtitle}
        </p>

        <a
          href="mailto:javier@blablaele.com"
          className="inline-flex items-center gap-3 bg-[#BF2638] text-white px-8 py-4 rounded-full text-sm font-semibold hover:bg-[#A01E30] transition-colors duration-200 group"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          {t.email}
          <svg
            className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </section>
  )
}
