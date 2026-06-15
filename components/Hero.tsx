'use client'

import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import { translations } from '@/lib/translations'

export default function Hero() {
  const { lang } = useLanguage()
  const t = translations[lang].hero

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Flag-stripe top accent */}
      <div className="absolute top-0 left-0 right-0 h-1">
        <div className="h-full w-full bg-gradient-to-r from-[#BF2638] via-[#D4AC0D] to-[#BF2638]" />
      </div>

      {/* Subtle background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#1C1917 1px, transparent 1px), linear-gradient(90deg, #1C1917 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Soft brand auras (colorido sutil) */}
      <div
        className="pointer-events-none absolute -top-24 -left-24 h-[460px] w-[460px] rounded-full blur-3xl opacity-25"
        style={{ background: 'radial-gradient(circle, #BF2638 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -right-24 h-[520px] w-[520px] rounded-full blur-3xl opacity-20"
        style={{ background: 'radial-gradient(circle, #6D28D9 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute top-1/4 right-1/3 h-[340px] w-[340px] rounded-full blur-3xl opacity-[0.16]"
        style={{ background: 'radial-gradient(circle, #D4AC0D 0%, transparent 70%)' }}
      />

      <div className="relative max-w-5xl w-full mx-auto text-center">
        {/* Small formula label */}
        <p className="text-xs uppercase tracking-[0.4em] text-[#78716C] mb-10 font-medium">
          {t.formula}
        </p>

        {/* Giant wordmark */}
        <h1
          className="font-black leading-[0.9] tracking-tight mb-10 select-none"
          style={{ fontSize: 'clamp(3.5rem, 14vw, 11rem)' }}
        >
          <span className="text-[#1C1917]">Espa</span>
          <span
            className="text-[#BF2638] relative inline-block group cursor-default"
            title="ñ"
          >
            n
            {/* ñ ghost on hover */}
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[0.35em] text-[#BF2638] opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-bold pointer-events-none select-none">
              ñ
            </span>
          </span>
          <span className="text-[#6D28D9]">ias</span>
        </h1>

        {/* Tagline */}
        <p
          className="text-lg md:text-2xl text-[#78716C] max-w-2xl mx-auto mb-5 font-light leading-snug"
        >
          {t.tagline}
        </p>

        {/* Subtitle */}
        <p className="text-sm md:text-base text-[#78716C] max-w-lg mx-auto mb-14 leading-relaxed opacity-80">
          {t.subtitle}
        </p>

        {/* CTA */}
        <Link
          href="/catalogo"
          className="inline-flex items-center gap-2 bg-[#1C1917] text-[#F9F7F4] px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-[#BF2638] transition-colors duration-300 group"
        >
          {t.cta}
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-pulse-line">
        <div className="w-px h-12 bg-[#1C1917]" />
      </div>
    </section>
  )
}
