import type { Metadata } from 'next'
import MundialClient from '@/components/mundial/MundialClient'

export const metadata: Metadata = {
  title: 'Mundial 2026 · El reto de Espanias',
  description:
    'Cuanto más gana España, menos cuesta tu web. Marca el penalti, rasca tu cupón y apúntate. Si España es campeona del Mundo, tu web es gratis.',
  alternates: { canonical: 'https://www.espanias.com/mundial' },
  openGraph: {
    title: 'Mundial 2026 · El reto de Espanias',
    description:
      'Cuanto más gana España, menos cuesta tu web. Marca el penalti y rasca tu cupón.',
    url: 'https://www.espanias.com/mundial',
    images: ['/blog/espana-uruguay-mundial.webp'],
    type: 'website',
  },
}

export default function MundialPage() {
  return <MundialClient />
}
