import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/context/LanguageContext'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://espanias.com'),
  title: {
    default: 'Espanias — Proyectos, formación y consultoría con IA en España',
    template: '%s | Espanias',
  },
  description:
    'Descubre proyectos reales donde la creatividad española y la inteligencia artificial se unen. Formación, consultoría y herramientas IA a medida para empresas y personas.',
  keywords: [
    'inteligencia artificial',
    'España',
    'IA',
    'consultoría IA',
    'formación inteligencia artificial',
    'proyectos IA',
    'educación digital',
    'transformación digital',
  ],
  authors: [{ name: 'Espanias', url: 'https://espanias.com' }],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    alternateLocale: ['en_US'],
    url: 'https://espanias.com',
    siteName: 'Espanias',
    title: 'Espanias — Proyectos, formación y consultoría con IA en España',
    description:
      'Descubre proyectos reales donde la creatividad española y la inteligencia artificial se unen. Formación, consultoría y herramientas IA a medida.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Espanias — Proyectos, formación y consultoría con IA en España',
    description:
      'Descubre proyectos reales donde la creatividad española y la inteligencia artificial se unen. Formación, consultoría y herramientas IA a medida.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://espanias.com',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="font-[family-name:var(--font-inter)]">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
