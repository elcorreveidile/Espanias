import type { Metadata } from 'next'
import AvisoLegalContent from '@/components/legal/AvisoLegalContent'

export const metadata: Metadata = {
  title: 'Aviso legal',
  description: 'Información legal del titular del sitio web, condiciones de uso y propiedad intelectual.',
  alternates: { canonical: 'https://www.espanias.com/aviso-legal' },
}

export default function AvisoLegalPage() {
  return <AvisoLegalContent />
}
