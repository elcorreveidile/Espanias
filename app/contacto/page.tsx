import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Contacto from '@/components/Contacto'
import ExtendedSection from '@/components/ExtendedSection'

export const metadata: Metadata = {
  title: 'Contacto',
  description:
    'Cuéntanos tu proyecto y te respondemos en 24-48 horas. Atención online para toda España y presencial en Granada y Estepona. La primera conversación es gratis.',
  alternates: { canonical: 'https://www.espanias.com/contacto' },
}

export default function ContactoPage() {
  return (
    <>
      <Nav />
      <main className="pt-16">
        <Contacto />
        <ExtendedSection page="contacto" />
      </main>
      <Footer />
    </>
  )
}
