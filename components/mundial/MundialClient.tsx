'use client'

// Página de cierre del Reto Mundial 2026. El Mundial ha terminado (España
// campeona) y el reto se cierra: se muestran los 7 ganadores de web completa.
// Toda la mecánica activa (porra, juego del penalti, escalera, apuntarse) se
// retira una vez acabado el torneo.

import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

// Nº de webs completas entregadas gratis.
const WINNERS = 7

const copy = {
  es: {
    badge: 'Mundial 2026 · Terminado',
    title: 'España, campeona del mundo 🏆',
    sub: 'El Reto Mundial de Espanias ha terminado. Gracias a todos los que jugasteis y os apuntasteis.',
    finalLine: 'España ganó el Mundial 2026 (1–0 a Argentina en la final).',
    winnersLabel: 'ganadores de una web completa',
    winnersNote: 'Los apuntados que se arriesgaron hasta el final se llevaron su web GRATIS.',
    ctaTitle: '¿También quieres tu web?',
    ctaText: 'El reto se acabó, pero seguimos haciendo webs profesionales a precios de escándalo.',
    ctaBtn: 'Ver el catálogo',
    ctaBtn2: 'Hablar con nosotros',
  },
  en: {
    badge: 'World Cup 2026 · Over',
    title: 'Spain, world champions 🏆',
    sub: 'Espanias’ World Cup Challenge is over. Thanks to everyone who played and signed up.',
    finalLine: 'Spain won the 2026 World Cup (1–0 vs Argentina in the final).',
    winnersLabel: 'winners of a complete website',
    winnersNote: 'Those who signed up and risked it to the end got their website FREE.',
    ctaTitle: 'Want a website too?',
    ctaText: 'The challenge is over, but we keep building professional websites at unbeatable prices.',
    ctaBtn: 'See the catalogue',
    ctaBtn2: 'Talk to us',
  },
}
type Copy = typeof copy.es

export default function MundialClient() {
  const { lang } = useLanguage()
  const t: Copy = copy[lang]

  return (
    <>
      <Nav />
      <main className="min-h-screen px-6 py-28 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          {/* Cabecera */}
          <span className="mb-5 inline-block rounded-full bg-[#BF2638] px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
            🇪🇸 {t.badge}
          </span>
          <h1 className="mb-4 text-4xl font-black leading-tight text-[#1C1917] md:text-5xl dark:text-[#F5F5F4]">
            {t.title}
          </h1>
          <p className="mx-auto mb-3 max-w-xl text-lg leading-relaxed text-[#78716C] dark:text-[#A8A29E]">
            {t.sub}
          </p>
          <p className="mx-auto mb-10 max-w-xl text-sm text-[#A8A29E]">{t.finalLine}</p>

          {/* Ganadores */}
          <div className="mx-auto mb-10 rounded-3xl border-2 border-[#FFC400]/70 bg-gradient-to-b from-[#1C1917] to-[#0c1626] p-8 text-white sm:p-10">
            <div className="text-7xl font-black leading-none text-[#FFC400] md:text-8xl">{WINNERS}</div>
            <div className="mt-2 text-lg font-bold">{t.winnersLabel}</div>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-stone-300">{t.winnersNote}</p>
          </div>

          {/* CTA (el negocio sigue tras el reto) */}
          <div className="rounded-2xl border border-stone-200 bg-white p-8 dark:border-white/10 dark:bg-white/[0.03]">
            <h2 className="mb-2 text-xl font-black text-[#1C1917] md:text-2xl dark:text-[#F5F5F4]">{t.ctaTitle}</h2>
            <p className="mb-5 text-sm text-[#78716C] dark:text-[#A8A29E]">{t.ctaText}</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/catalogo"
                className="rounded-lg bg-[#6D28D9] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#5b21b6]"
              >
                {t.ctaBtn}
              </Link>
              <Link
                href="/contacto"
                className="rounded-lg border border-stone-300 px-6 py-3 font-semibold text-[#1C1917] transition-colors hover:bg-stone-50 dark:border-white/20 dark:text-[#F5F5F4] dark:hover:bg-white/5"
              >
                {t.ctaBtn2}
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
