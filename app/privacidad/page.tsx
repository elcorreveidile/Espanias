import type { Metadata } from 'next'
import PrivacidadContent from '@/components/legal/PrivacidadContent'

export const metadata: Metadata = {
  title: 'Política de privacidad',
  description:
    'Cómo tratamos tus datos personales conforme al RGPD y la LOPDGDD: finalidad, base jurídica, conservación y tus derechos.',
  alternates: { canonical: 'https://www.espanias.com/privacidad' },
}

export default function PrivacidadPage() {
  return <PrivacidadContent />
}
