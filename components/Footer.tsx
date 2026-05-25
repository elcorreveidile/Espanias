'use client'

import { useLanguage } from '@/context/LanguageContext'
import { translations } from '@/lib/translations'

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
          <span className="font-black text-sm tracking-tight select-none">
            <span className="text-[#1C1917]">Espa</span>
            <span className="text-[#BF2638]">n</span>
            <span className="text-[#6D28D9]">ias</span>
          </span>
          <span className="text-[#78716C] text-xs opacity-70">— {t.madeWith}</span>
        </div>
        <p className="text-xs text-[#78716C] opacity-60">
          © {year} · {t.rights}
        </p>
      </div>
    </footer>
  )
}
