import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { categoryColors, projectCategories } from '@/lib/projects'
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

  const cats = projectCategories(project)
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
      <main className="min-h-screen px-6 py-28 md:py-32">
        <div className="mx-auto max-w-4xl">
          {/* Migas */}
          <Link
            href="/catalogo"
            className="mb-8 inline-block text-sm font-medium text-[#78716C] transition-colors hover:text-[#6D28D9] dark:text-[#A8A29E]"
          >
            ← Volver al catálogo
          </Link>

          {/* Hero */}
          <div className="mb-12">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              {cats.map((cat) => (
                <span
                  key={cat}
                  className="rounded-full px-3 py-1 text-xs font-semibold text-white"
                  style={{ backgroundColor: categoryColors[cat] }}
                >
                  {categoryLabels.es[cat]}
                </span>
              ))}
              <span className="rounded-md bg-stone-100 px-2.5 py-1 text-xs font-semibold text-stone-700 dark:bg-white/10 dark:text-stone-200">
                {statusLabels.es[project.status]}
              </span>
            </div>
            <h1 className="mb-3 text-4xl font-black leading-tight text-[#1C1917] md:text-5xl dark:text-[#F5F5F4]">
              {project.name}
            </h1>
            {project.claim && (
              <p className="mb-4 text-xl font-semibold text-[#6D28D9] dark:text-[#A78BFA]">{project.claim}</p>
            )}
            <p className="text-xl leading-relaxed text-[#78716C] dark:text-[#A8A29E]">{project.description.es}</p>
          </div>

          {/* Captura del proyecto (si existe) */}
          {project.image && (
            <div className="mb-12 overflow-hidden rounded-2xl border border-stone-200 dark:border-white/10">
              <Image
                src={project.image}
                alt={`Captura de ${project.name}`}
                width={1200}
                height={750}
                sizes="(max-width: 768px) 100vw, 900px"
                className="h-auto w-full"
              />
            </div>
          )}

          {/* Detalles + enlaces */}
          <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-lg font-black text-[#1C1917] dark:text-[#F5F5F4]">Detalles</h2>
              <dl className="space-y-4">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-[#78716C] dark:text-[#A8A29E]">
                    Categoría
                  </dt>
                  <dd className="text-[#1C1917] dark:text-[#F5F5F4]">{cats.map((cat) => categoryLabels.es[cat]).join(', ')}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-[#78716C] dark:text-[#A8A29E]">
                    Estado
                  </dt>
                  <dd className="text-[#1C1917] dark:text-[#F5F5F4]">{statusLabels.es[project.status]}</dd>
                </div>
                {project.sector && (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-[#78716C] dark:text-[#A8A29E]">
                      Sector
                    </dt>
                    <dd className="text-[#1C1917] dark:text-[#F5F5F4]">{project.sector}</dd>
                  </div>
                )}
              </dl>
            </div>

            <div className={project.demo || isLive ? '' : 'hidden'}>
              <h2 className="mb-4 text-lg font-black text-[#1C1917] dark:text-[#F5F5F4]">Enlaces</h2>
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
                    className="block rounded-lg bg-gradient-to-r from-[#6D28D9] to-[#BF2638] px-4 py-2.5 text-center font-semibold text-white shadow-sm transition-all hover:shadow-md hover:brightness-110"
                  >
                    Visitar sitio · {cleanUrl(project.url)}
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mb-12 rounded-2xl bg-[#1C1917] p-10 text-center text-white">
            {project.status === 'idea' ? (
              <>
                <h2 className="mb-3 text-2xl font-black md:text-3xl">¿Te interesa esta idea?</h2>
                <p className="mb-6 text-stone-300">
                  Aún no está construida. Si la quieres para tu negocio, cuéntanoslo y la desarrollamos.
                </p>
                <Link
                  href={`/contacto?idea=${encodeURIComponent(project.name)}`}
                  className="inline-block rounded-lg bg-white px-6 py-3 font-semibold text-[#1C1917] transition-colors hover:bg-stone-200"
                >
                  Me interesa esta idea
                </Link>
              </>
            ) : (
              <>
                <h2 className="mb-3 text-2xl font-black md:text-3xl">¿Quieres una web como esta?</h2>
                <p className="mb-6 text-stone-300">
                  Te la desarrollamos a medida, lista en 48 horas.
                </p>
                <a
                  href="https://www.por2duros.com/#precio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-lg bg-white px-6 py-3 font-semibold text-[#1C1917] transition-colors hover:bg-stone-200"
                >
                  Solicitar información
                </a>
              </>
            )}
          </div>

          {/* Navegación anterior / siguiente */}
          <nav className="flex items-center justify-between gap-4 border-t border-stone-200 pt-8 dark:border-white/10">
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
