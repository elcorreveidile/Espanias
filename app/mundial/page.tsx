import type { Metadata } from 'next'
import MundialClient from '@/components/mundial/MundialClient'

export const metadata: Metadata = {
  title: 'Mundial 2026 · España campeona',
  description:
    'El Reto Mundial de Espanias ha terminado. España, campeona del mundo 2026. Se entregaron 7 webs completas gratis.',
  alternates: { canonical: 'https://www.espanias.com/mundial' },
  openGraph: {
    title: 'Mundial 2026 · España campeona | Espanias',
    description:
      'El reto ha terminado: España campeona del mundo y 7 webs completas gratis entregadas.',
    url: 'https://www.espanias.com/mundial',
    type: 'website',
  },
}

export default function MundialPage() {
  return <MundialClient />
}
