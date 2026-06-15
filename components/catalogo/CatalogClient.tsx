'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { type Category, type Project } from '@/lib/projects'
import { useLanguage } from '@/context/LanguageContext'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ProjectCard from '@/components/catalogo/ProjectCard'
import FilterBar from '@/components/catalogo/FilterBar'

const copy = {
  es: {
    eyebrow: 'Catálogo',
    title: 'Aplicaciones web a medida',
    subtitle:
      'Proyectos reales donde la creatividad española y la inteligencia artificial se unen. Filtra por categoría o estado y descubre cada caso.',
    counter: (shown: number, total: number) => `${shown} de ${total} proyectos`,
    empty: 'No se encontraron proyectos. Prueba con otros filtros.',
  },
  en: {
    eyebrow: 'Catalogue',
    title: 'Custom web applications',
    subtitle:
      'Real projects where Spanish creativity meets artificial intelligence. Filter by category or status and explore each case.',
    counter: (shown: number, total: number) => `${shown} of ${total} projects`,
    empty: 'No projects found. Try different filters.',
  },
} as const

export default function CatalogClient({ projects }: { projects: Project[] }) {
  const { lang } = useLanguage()
  const c = copy[lang]

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all')
  const [selectedStatus, setSelectedStatus] = useState<Project['status'] | 'all'>('all')

  const filteredProjects = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    return projects.filter((project) => {
      const matchesSearch =
        term === '' ||
        project.name.toLowerCase().includes(term) ||
        project.description.es.toLowerCase().includes(term) ||
        project.description.en.toLowerCase().includes(term)
      const matchesCategory =
        selectedCategory === 'all' || project.category === selectedCategory
      const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus
      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [projects, searchTerm, selectedCategory, selectedStatus])

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('all')
    setSelectedStatus('all')
  }

  return (
    <>
      <Nav />
      <main className="min-h-screen px-6 py-28 md:py-32">
        <div className="mx-auto max-w-6xl">
          {/* Banda geométrica de cabecera */}
          <div className="mb-10 h-36 overflow-hidden rounded-3xl border border-[#E7E5E4] md:h-52">
            <Image
              src="/geometrico.webp"
              alt=""
              aria-hidden="true"
              width={1500}
              height={1000}
              sizes="(max-width: 768px) 100vw, 1100px"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Encabezado */}
          <div className="mb-12">
            <div className="mb-8 flex items-center gap-3">
              <div className="h-px w-8 bg-[#6D28D9]" />
              <div className="h-px w-3 bg-[#BF2638]" />
              <span className="text-xs font-medium uppercase tracking-[0.35em] text-[#78716C]">
                {c.eyebrow}
              </span>
            </div>
            <h1 className="mb-4 text-4xl font-black text-[#1C1917] md:text-5xl">{c.title}</h1>
            <p className="mb-6 max-w-xl leading-relaxed text-[#78716C]">{c.subtitle}</p>
            <p className="text-sm font-semibold text-[#78716C]">
              {c.counter(filteredProjects.length, projects.length)}
            </p>
          </div>

          {/* Filtros y búsqueda */}
          <FilterBar
            lang={lang}
            projects={projects}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            onClear={clearFilters}
          />

          {/* Grid de proyectos */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} lang={lang} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-lg text-[#78716C]">{c.empty}</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
