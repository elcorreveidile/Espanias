'use client'

import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import { translations } from '@/lib/translations'
import Logo from '@/components/Logo'

export default function Footer() {
  const { lang } = useLanguage()
  const t = translations[lang].footer
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[#E7E5E4]">
      {/* Flag stripe */}
      <div className="h-0.5 bg-gradient-to-r from-[#BF2638] via-[#D4AC0D] to-[#BF2638]" />

      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Logo variant="footer" />
          <span className="text-[#78716C] text-xs">
            — {t.madeWith}{' '}
            <a
              href="https://www.por2duros.com"
              target="_blank"
              rel="noopener noreferrer"
              title={t.por2durosTagline}
              className="group font-semibold text-[#BF2638] transition-colors hover:text-[#D4AC0D]"
            >
              {t.por2duros}
              <span className="opacity-0 transition-opacity group-hover:opacity-100"> 🪙</span>
            </a>
          </span>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-[#78716C]">
          <Link href="/aviso-legal" className="transition-colors hover:text-[#BF2638]">
            {t.legal}
          </Link>
          <Link href="/privacidad" className="transition-colors hover:text-[#BF2638]">
            {t.privacy}
          </Link>
          <Link href="/cookies" className="transition-colors hover:text-[#BF2638]">
            {t.cookies}
          </Link>
        </nav>
        <p className="text-xs text-[#78716C]">
          © {year} · {t.rights}
        </p>
      </div>
    </footer>
  )
}
