import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { categoryColors } from '@/lib/projects'
import { getCatalogProjects, getCatalogProject } from '@/lib/catalog-data'
import { categoryLabels, statusLabels } from '@/lib/catalogo-labels'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

// Lee de la BD en cada petición (con fallback estático).
export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await getCatalogProject(slug)
  if (!project) return {}

  return {
    title: project.name,
    description: project.description.es,
    alternates: { canonical: `https://www.espanias.com/catalogo/${project.slug}` },
    openGraph: {
      title: `${project.name} | Espanias`,
      description: project.description.es,
      url: `https://www.espanias.com/catalogo/${project.slug}`,
      type: 'website',
    },
  }
}

const cleanUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const projects = await getCatalogProjects()
  const project = projects.find((p) => p.slug === slug)
  if (!project) notFound()

  const categoryColor = categoryColors[project.category]
  const index = projects.findIndex((p) => p.slug === slug)
  const prev = index > 0 ? projects[index - 1] : null
  const next = index < projects.length - 1 ? projects[index + 1] : null
  const isLive = project.status === 'hecho'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.name,
    description: project.description.es,
    applicationCategory: 'WebApplication',
    operatingSystem: 'Web',
    url: `https://www.espanias.com/catalogo/${project.slug}`,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  }

  return (
    <>
      <Nav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-white px-6 py-28 md:py-32">
        <div className="mx-auto max-w-4xl">
          {/* Migas */}
          <Link
            href="/catalogo"
            className="mb-8 inline-block text-sm font-medium text-[#78716C] transition-colors hover:text-[#6D28D9]"
          >
            ← Volver al catálogo
          </Link>

          {/* Hero */}
          <div className="mb-12">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span
                className="rounded-full px-3 py-1 text-xs font-semibold text-white"
                style={{ backgroundColor: categoryColor }}
              >
                {categoryLabels.es[project.category]}
              </span>
              <span className="rounded-md bg-stone-100 px-2.5 py-1 text-xs font-semibold text-stone-700">
                {statusLabels.es[project.status]}
              </span>
            </div>
            <h1 className="mb-5 text-4xl font-black leading-tight text-[#1C1917] md:text-5xl">
              {project.name}
            </h1>
            <p className="text-xl leading-relaxed text-[#78716C]">{project.description.es}</p>
          </div>

          {/* Detalles + enlaces */}
          <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-lg font-black text-[#1C1917]">Detalles</h2>
              <dl className="space-y-4">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-[#78716C]">
                    Categoría
                  </dt>
                  <dd className="text-[#1C1917]">{categoryLabels.es[project.category]}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-[#78716C]">
                    Estado
                  </dt>
                  <dd className="text-[#1C1917]">{statusLabels.es[project.status]}</dd>
                </div>
                {project.sector && (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-[#78716C]">
                      Sector
                    </dt>
                    <dd className="text-[#1C1917]">{project.sector}</dd>
                  </div>
                )}
              </dl>
            </div>

            <div className={project.demo || isLive ? '' : 'hidden'}>
              <h2 className="mb-4 text-lg font-black text-[#1C1917]">Enlaces</h2>
              <div className="space-y-3">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-lg bg-[#6D28D9] px-4 py-2.5 text-center font-semibold text-white transition-colors hover:bg-[#5b21b6]"
                  >
                    Ver demo
                  </a>
                )}
                {isLive && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-lg border border-stone-300 px-4 py-2.5 text-center font-semibold text-[#1C1917] transition-colors hover:border-stone-400 hover:bg-stone-50"
                  >
                    Visitar sitio · {cleanUrl(project.url)}
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mb-12 rounded-2xl bg-[#1C1917] p-10 text-center text-white">
            <h2 className="mb-3 text-2xl font-black md:text-3xl">¿Quieres una web como esta?</h2>
            <p className="mb-6 text-stone-300">
              Contáctanos para crear tu aplicación web a medida.
            </p>
            <Link
              href="/#contacto"
              className="inline-block rounded-lg bg-white px-6 py-3 font-semibold text-[#1C1917] transition-colors hover:bg-stone-200"
            >
              Solicitar información
            </Link>
          </div>

          {/* Navegación anterior / siguiente */}
          <nav className="flex items-center justify-between gap-4 border-t border-stone-200 pt-8">
            {prev ? (
              <Link
                href={`/catalogo/${prev.slug}`}
                className="max-w-[45%] text-sm font-medium text-[#6D28D9] transition-colors hover:text-[#BF2638]"
              >
                ← {prev.name}
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/catalogo/${next.slug}`}
                className="max-w-[45%] text-right text-sm font-medium text-[#6D28D9] transition-colors hover:text-[#BF2638]"
              >
                {next.name} →
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </div>
      </main>
      <Footer />
    </>
  )
}
