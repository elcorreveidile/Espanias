'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import { translations } from '@/lib/translations'
import Logo from '@/components/Logo'

export default function Nav() {
  const { lang, toggle } = useLanguage()
  const t = translations[lang].nav
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

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
          ? 'bg-[#F9F7F4]/95 backdrop-blur-sm border-b border-[#E7E5E4]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" aria-label="Espanias — inicio">
          <Logo variant="nav" />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { href: '/#manifiesto', label: t.about },
            { href: '/#proyectos', label: t.projects },
            { href: '/catalogo', label: t.catalog },
            { href: '/#servicios', label: t.services },
            { href: '/#contacto', label: t.contact },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-[#78716C] hover:text-[#1C1917] transition-colors"
            >
              {label}
            </Link>
          ))}
          <button
            onClick={toggle}
            className="text-sm font-semibold px-3 py-1 rounded-full border border-[#E7E5E4] text-[#78716C] hover:border-[#BF2638] hover:text-[#BF2638] transition-all"
          >
            {t.langSwitch}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          <span
            className={`block w-5 h-0.5 bg-[#1C1917] transition-all origin-center ${
              menuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-[#1C1917] transition-all ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-[#1C1917] transition-all origin-center ${
              menuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-64' : 'max-h-0'
        }`}
      >
        <div className="bg-[#F9F7F4] border-t border-[#E7E5E4] px-6 py-5 flex flex-col gap-4">
          <Link href="/#manifiesto" onClick={close} className="text-sm text-[#78716C]">
            {t.about}
          </Link>
          <Link href="/#proyectos" onClick={close} className="text-sm text-[#78716C]">
            {t.projects}
          </Link>
          <Link href="/catalogo" onClick={close} className="text-sm text-[#78716C]">
            {t.catalog}
          </Link>
          <Link href="/#servicios" onClick={close} className="text-sm text-[#78716C]">
            {t.services}
          </Link>
          <Link href="/#contacto" onClick={close} className="text-sm text-[#78716C]">
            {t.contact}
          </Link>
          <button
            onClick={() => { toggle(); close() }}
            className="text-sm font-semibold text-left text-[#BF2638]"
          >
            {t.langSwitch}
          </button>
        </div>
      </div>
    </nav>
  )
}
