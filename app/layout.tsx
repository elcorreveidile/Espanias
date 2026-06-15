import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/context/LanguageContext'
import SiteBackground from '@/components/SiteBackground'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.espanias.com'),
  title: {
    default: 'Espanias — Proyectos, formación y consultoría con IA',
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
  authors: [{ name: 'Espanias', url: 'https://www.espanias.com' }],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    alternateLocale: ['en_US'],
    url: 'https://www.espanias.com',
    siteName: 'Espanias',
    title: 'Espanias — Proyectos, formación y consultoría con IA',
    description:
      'Descubre proyectos reales donde la creatividad española y la inteligencia artificial se unen. Formación, consultoría y herramientas IA a medida.',
    images: [
      {
        url: 'https://www.espanias.com/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Espanias — Proyectos, formación y consultoría con IA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Espanias — Proyectos, formación y consultoría con IA',
    description:
      'Descubre proyectos reales donde la creatividad española y la inteligencia artificial se unen. Formación, consultoría y herramientas IA a medida.',
    images: ['https://www.espanias.com/opengraph-image'],
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
    canonical: 'https://www.espanias.com',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="font-[family-name:var(--font-inter)]">
        <SiteBackground />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
