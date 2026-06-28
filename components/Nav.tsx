'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/context/LanguageContext'
import { translations } from '@/lib/translations'
import Logo from '@/components/Logo'
import ThemeToggle from '@/components/ThemeToggle'

export default function Nav() {
  const { lang, toggle } = useLanguage()
  const t = translations[lang].nav
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // En la home, arriba del todo, la barra es transparente sobre la imagen clara
  // del hero: el texto debe ir oscuro aunque el tema sea oscuro.
  const onLight = pathname === '/' && !scrolled

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const close = () => setMenuOpen(false)

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#F9F7F4]/95 backdrop-blur-sm border-b border-[#E7E5E4] dark:bg-[#0C0A09]/95 dark:border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" aria-label="Espanias — inicio">
          <Logo variant="nav" onLightBg={onLight} />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { href: '/manifiesto', label: t.about },
            { href: '/catalogo', label: t.catalog },
            { href: '/servicios', label: t.services },
            { href: '/ia-empresas', label: t.ia },
            { href: '/blog', label: t.blog },
            { href: '/contacto', label: t.contact },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm transition-colors hover:text-[#1C1917] ${
                onLight
                  ? 'text-[#57534E]'
                  : 'text-[#78716C] dark:text-[#A8A29E] dark:hover:text-white'
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/mundial"
            className="text-sm font-bold text-[#BF2638] transition-colors hover:text-[#1C1917] dark:hover:text-white"
          >
            {lang === 'es' ? '🇪🇸 Mundial 2026' : '🇪🇸 World Cup 2026'}
          </Link>
          <Link
            href="/ecr"
            className="text-sm font-bold text-[#2f6b4f] transition-colors hover:text-[#1C1917] dark:text-[#7FB89B] dark:hover:text-white"
          >
            ♻️ ECR
          </Link>
          <button
            onClick={toggle}
            className={`text-sm font-semibold px-3 py-1 rounded-full border border-[#E7E5E4] text-[#78716C] hover:border-[#BF2638] hover:text-[#BF2638] transition-all ${
              onLight ? '' : 'dark:border-white/15 dark:text-[#A8A29E]'
            }`}
          >
            {t.langSwitch}
          </button>
          <ThemeToggle onLightBg={onLight} />
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          <span
            className={`block w-5 h-0.5 transition-all ${onLight ? 'bg-[#1C1917]' : 'bg-[#1C1917] dark:bg-white'} origin-center ${
              menuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block w-5 h-0.5 transition-all ${onLight ? 'bg-[#1C1917]' : 'bg-[#1C1917] dark:bg-white'} ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-5 h-0.5 transition-all ${onLight ? 'bg-[#1C1917]' : 'bg-[#1C1917] dark:bg-white'} origin-center ${
              menuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="bg-[#F9F7F4] border-t border-[#E7E5E4] px-6 py-5 flex flex-col gap-4 dark:bg-[#0C0A09] dark:border-white/10">
          <Link href="/manifiesto" onClick={close} className="text-sm text-[#78716C] dark:text-[#A8A29E]">
            {t.about}
          </Link>
          <Link href="/catalogo" onClick={close} className="text-sm text-[#78716C] dark:text-[#A8A29E]">
            {t.catalog}
          </Link>
          <Link href="/servicios" onClick={close} className="text-sm text-[#78716C] dark:text-[#A8A29E]">
            {t.services}
          </Link>
          <Link href="/ia-empresas" onClick={close} className="text-sm text-[#78716C] dark:text-[#A8A29E]">
            {t.ia}
          </Link>
          <Link href="/blog" onClick={close} className="text-sm text-[#78716C] dark:text-[#A8A29E]">
            {t.blog}
          </Link>
          <Link href="/contacto" onClick={close} className="text-sm text-[#78716C] dark:text-[#A8A29E]">
            {t.contact}
          </Link>
          <Link href="/mundial" onClick={close} className="text-sm font-bold text-[#BF2638]">
            {lang === 'es' ? '🇪🇸 Mundial 2026' : '🇪🇸 World Cup 2026'}
          </Link>
          <Link href="/ecr" onClick={close} className="text-sm font-bold text-[#2f6b4f] dark:text-[#7FB89B]">
            ♻️ ECR
          </Link>
          <div className="flex items-center gap-4 pt-1">
            <button
              onClick={() => { toggle(); close() }}
              className="text-sm font-semibold text-left text-[#BF2638]"
            >
              {t.langSwitch}
            </button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}
