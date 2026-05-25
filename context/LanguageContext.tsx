'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { Lang } from '@/lib/translations'

interface LanguageContextType {
  lang: Lang
  toggle: () => void
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'es',
  toggle: () => {},
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('es')

  useEffect(() => {
    const saved = localStorage.getItem('espanias-lang') as Lang
    if (saved === 'es' || saved === 'en') setLang(saved)
  }, [])

  const toggle = () => {
    const next: Lang = lang === 'es' ? 'en' : 'es'
    setLang(next)
    localStorage.setItem('espanias-lang', next)
  }

  return (
    <LanguageContext.Provider value={{ lang, toggle }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
