import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import EcrClient from '@/components/ecr/EcrClient'
import { getCatalogProjects } from '@/lib/catalog-data'

// Lee de la BD en cada petición (negocios adheridos), con fallback estático.
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Economía Circular Realejo',
  description:
    'Web profesional para tu negocio del Realejo sin descapitalizarte: al contado, a plazos sin intereses o pagando con QPQ, la moneda circular del barrio. Súmate al ECR.',
  alternates: { canonical: 'https://www.espanias.com/ecr' },
  openGraph: {
    title: 'Economía Circular Realejo | Espanias',
    description:
      'Paga tu web como mejor te venga: contado, plazos sin intereses o QPQ, la moneda circular del Realejo.',
    url: 'https://www.espanias.com/ecr',
    type: 'website',
  },
}

export default async function EcrPage() {
  const projects = await getCatalogProjects()
  const adheridos = projects.filter((p) => p.ecrBarrio)
  return (
    <>
      <Nav />
      <main className="pt-16">
        <EcrClient adheridos={adheridos} />
      </main>
      <Footer />
    </>
  )
}
