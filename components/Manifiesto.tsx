'use client'

import { useLanguage } from '@/context/LanguageContext'
import { translations } from '@/lib/translations'

export default function Manifiesto() {
  const { lang } = useLanguage()
  const t = translations[lang].manifiesto

  return (
    <section id="manifiesto" className="py-28 md:py-36 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-16">
          <div className="w-8 h-px bg-[#BF2638]" />
          <div className="w-3 h-px bg-[#D4AC0D]" />
          <span className="text-xs uppercase tracking-[0.35em] text-[#78716C] font-medium">
            {t.eyebrow}
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Left: title + decoration */}
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-[#1C1917] leading-tight mb-8 whitespace-pre-line">
              {t.title}
            </h2>
            {/* Tricolor bar */}
            <div className="flex gap-1">
              <div className="h-1 w-14 bg-[#BF2638] rounded-full" />
              <div className="h-1 w-5 bg-[#D4AC0D] rounded-full" />
              <div className="h-1 w-2 bg-[#6D28D9] rounded-full" />
            </div>
          </div>

          {/* Right: body copy */}
          <div className="space-y-5 text-[#78716C] leading-relaxed text-base md:text-lg">
            <p>{t.p1}</p>
            <p>{t.p2}</p>
            <p>{t.p3}</p>
          </div>
        </div>

        {/* Pull quote */}
        <div className="mt-20 md:mt-24 relative pl-8 border-l-4 border-[#BF2638] py-1">
          <blockquote className="text-2xl md:text-3xl font-light italic text-[#1C1917] leading-snug">
            &ldquo;{t.quote}&rdquo;
          </blockquote>
        </div>
      </div>
    </section>
  )
}
