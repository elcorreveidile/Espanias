'use client'

import Image from 'next/image'
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
      {/* Fondo del hero (ilustración de marca, centro claro para el texto) */}
      <Image
        src="/hero-bg.webp"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-10 object-cover"
      />

      {/* Flag-stripe top accent */}
      <div className="absolute top-0 left-0 right-0 h-1">
        <div className="h-full w-full bg-gradient-to-r from-[#BF2638] via-[#D4AC0D] to-[#BF2638]" />
      </div>

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
          <span className="bg-gradient-to-r from-[#BF2638] to-[#6D28D9] bg-clip-text text-transparent">Espa</span>
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
          className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#BF2638] to-[#6D28D9] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#6D28D9]/20 transition duration-300 hover:brightness-110 hover:shadow-xl hover:shadow-[#6D28D9]/30"
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
