import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Servicios from '@/components/Servicios'
import ExtendedSection from '@/components/ExtendedSection'

export const metadata: Metadata = {
  title: 'Servicios',
  description:
    'Webs y aplicaciones a medida, formación y consultoría en IA. Un proceso sencillo, de la idea a la web, a través de la agencia Por 2 Duros.',
  alternates: { canonical: 'https://www.espanias.com/servicios' },
}

export default function ServiciosPage() {
  return (
    <>
      <Nav />
      <main className="pt-16">
        <Servicios />
        <ExtendedSection page="servicios" />
      </main>
      <Footer />
    </>
  )
}
