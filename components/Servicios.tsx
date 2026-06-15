'use client'

import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import { translations } from '@/lib/translations'

// Iconos propios de Espanias: línea redondeada + un destello (✦) común como
// firma de marca (guiño a la IA). Cada servicio en su color del tricolor.
const sparkle = (
  <path
    d="M17.8 3l.5 1.45 1.45.5-1.45.5L17.8 7l-.5-1.45L15.85 5l1.45-.5z"
    fill="currentColor"
    stroke="none"
  />
)

const services = [
  {
    // Formación → libro abierto
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 8.5v10" />
        <path d="M12 8.5C10.4 7.4 8.3 7 5.8 7.2c-.5 0-.8.4-.8.9v8.4c0 .5.4.9.9.8 2.2-.2 4 .2 6.1 1.2" />
        <path d="M12 8.5c1.6-1.1 3.7-1.5 6.2-1.3.5 0 .8.4.8.9v8.4c0 .5-.4.9-.9.8-2.2-.2-4 .2-6.1 1.2" />
        {sparkle}
      </svg>
    ),
    color: '#BF2638',
    key: 's1',
  },
  {
    // Consultoría → diana / foco
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="13" r="7.2" />
        <circle cx="11" cy="13" r="3.4" />
        <circle cx="11" cy="13" r="0.6" fill="currentColor" stroke="none" />
        {sparkle}
      </svg>
    ),
    color: '#D4AC0D',
    key: 's2',
  },
  {
    // Herramientas a medida → chip / procesador
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <rect x="6.5" y="7.5" width="9" height="9" rx="2" />
        <rect x="9.5" y="10.5" width="3" height="3" rx="0.8" />
        <path d="M9 7.5V5M13 7.5V5M9 19v-2.5M13 19v-2.5M6.5 10H4M6.5 14H4M18.5 10H16M18.5 14H16" />
        {sparkle}
      </svg>
    ),
    color: '#6D28D9',
    key: 's3',
  },
]

export default function Servicios() {
  const { lang } = useLanguage()
  const t = translations[lang].servicios

  const serviceData = [
    { title: t.s1title, desc: t.s1desc },
    { title: t.s2title, desc: t.s2desc },
    { title: t.s3title, desc: t.s3desc },
  ]

  return (
    <section
      id="servicios"
      className="py-28 md:py-36 px-6"
      style={{
        backgroundColor: '#1C1917',
        backgroundImage: [
          'radial-gradient(50% 45% at 12% 8%, rgba(109,40,217,0.35), transparent 70%)',
          'radial-gradient(50% 45% at 92% 96%, rgba(191,38,56,0.30), transparent 70%)',
        ].join(', '),
      }}
    >
      <div className="relative max-w-6xl mx-auto">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-px bg-[#BF2638]" />
          <div className="w-3 h-px bg-[#D4AC0D]" />
          <span className="text-xs uppercase tracking-[0.35em] text-[#78716C] font-medium">
            {t.eyebrow}
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-end mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-[#F9F7F4] leading-tight">
            {t.title}
          </h2>
          <p className="text-[#78716C] leading-relaxed text-lg">{t.subtitle}</p>
        </div>

        {/* Service cards */}
        <div className="grid sm:grid-cols-3 gap-5 mb-14">
          {services.map(({ icon, color, key }, i) => (
            <div
              key={key}
              className="rounded-2xl p-7 border border-white/10 hover:border-white/20 transition-colors"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: `${color}22`, color }}
              >
                {icon}
              </div>
              <h3 className="font-bold text-lg text-[#F9F7F4] mb-2">{serviceData[i].title}</h3>
              <p className="text-[#78716C] text-sm leading-relaxed">{serviceData[i].desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 bg-[#BF2638] text-white px-10 py-4 rounded-full text-sm font-semibold hover:bg-[#A01E30] transition-colors duration-200 group"
          >
            {t.cta}
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
