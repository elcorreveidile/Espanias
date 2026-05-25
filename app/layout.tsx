import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/context/LanguageContext'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Espanias — España en la era de las IAs',
  description:
    'Una colección de proyectos donde la creatividad humana y la potencia de las inteligencias artificiales se encuentran.',
  keywords: ['inteligencia artificial', 'España', 'IA', 'proyectos', 'educación', 'tecnología'],
  openGraph: {
    title: 'Espanias — España en la era de las IAs',
    description:
      'Una colección de proyectos donde la creatividad humana y la potencia de las IAs se encuentran.',
    type: 'website',
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
