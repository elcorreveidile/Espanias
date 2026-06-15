import type { Metadata } from 'next'
import CookiesContent from '@/components/legal/CookiesContent'

export const metadata: Metadata = {
  title: 'Política de cookies',
  description:
    'Información sobre las cookies que utiliza este sitio web. Solo se emplean cookies técnicas estrictamente necesarias.',
  alternates: { canonical: 'https://www.espanias.com/cookies' },
}

export default function CookiesPage() {
  return <CookiesContent />
}
