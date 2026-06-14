import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Manifiesto from '@/components/Manifiesto'
import ExtendedSection from '@/components/ExtendedSection'

export const metadata: Metadata = {
  title: 'Manifiesto',
  description:
    'Espanias es la casa grande desde la que reunimos y gestionamos nuestros proyectos de IA. Tecnología con propósito, construida a través de la agencia Por 2 Duros.',
  alternates: { canonical: 'https://www.espanias.com/manifiesto' },
}

export default function ManifiestoPage() {
  return (
    <>
      <Nav />
      <main className="pt-16">
        <Manifiesto />
        <ExtendedSection page="manifiesto" />
      </main>
      <Footer />
    </>
  )
}
