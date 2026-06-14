import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ExtendedSection from '@/components/ExtendedSection'

export const metadata: Metadata = {
  title: 'IA para empresas',
  description:
    'Integra la inteligencia artificial en tu negocio: auditoría, formación, automatizaciones y herramientas a medida. Sin necesidad de un departamento técnico.',
  alternates: { canonical: 'https://www.espanias.com/ia-empresas' },
}

export default function IaEmpresasPage() {
  return (
    <>
      <Nav />
      <main className="pt-16">
        <ExtendedSection page="ia" />
      </main>
      <Footer />
    </>
  )
}
