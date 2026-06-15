'use client'

import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import { translations } from '@/lib/translations'

const services = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
    color: '#BF2638',
    key: 's1',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    color: '#D4AC0D',
    key: 's2',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
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
