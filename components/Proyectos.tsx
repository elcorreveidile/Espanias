'use client'

import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { translations } from '@/lib/translations'
import { projects, categoryColors, type Category } from '@/lib/projects'

type Filter = Category | 'all'

export default function Proyectos() {
  const { lang } = useLanguage()
  const t = translations[lang].projects
  const [filter, setFilter] = useState<Filter>('all')

  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: t.filterAll },
    { key: 'ia', label: t.filterIA },
    { key: 'educacion', label: t.filterEdu },
    { key: 'literatura', label: t.filterLit },
    { key: 'personal', label: t.filterPersonal },
    { key: 'otros', label: t.filterOtros },
  ]

  const filterColors: Record<Filter, string> = {
    all: '#1C1917',
    ...categoryColors,
  }

  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter)

  const cleanUrl = (url: string) =>
    url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')

  return (
    <section id="proyectos" className="py-28 md:py-36 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-px bg-[#6D28D9]" />
          <div className="w-3 h-px bg-[#BF2638]" />
          <span className="text-xs uppercase tracking-[0.35em] text-[#78716C] font-medium">
            {t.eyebrow}
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl font-black text-[#1C1917] mb-4">{t.title}</h2>
        <p className="text-[#78716C] max-w-xl mb-12 leading-relaxed">{t.subtitle}</p>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-12">
          {filters.map(({ key, label }) => {
            const active = filter === key
            return (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border"
                style={
                  active
                    ? {
                        backgroundColor: filterColors[key],
                        borderColor: filterColors[key],
                        color: '#fff',
                      }
                    : {
                        borderColor: '#E7E5E4',
                        color: '#78716C',
                      }
                }
              >
                {label}
              </button>
            )
          })}
        </div>

        {/* Project grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(project => (
            <a
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block bg-[#F9F7F4] rounded-2xl p-6 border border-[#E7E5E4] hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
              style={{ borderLeftColor: categoryColors[project.category], borderLeftWidth: '3px' }}
            >
              {/* Category dot */}
              <div
                className="absolute top-5 right-5 w-2 h-2 rounded-full opacity-60"
                style={{ backgroundColor: categoryColors[project.category] }}
              />

              <h3 className="font-semibold text-[#1C1917] mb-2 pr-6 group-hover:text-[#BF2638] transition-colors">
                {project.name}
              </h3>
              <p className="text-sm text-[#78716C] leading-relaxed mb-5">
                {project.description[lang]}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-[#78716C] opacity-50 truncate max-w-[160px]">
                  {cleanUrl(project.url)}
                </p>
                <span className="flex items-center gap-1 text-xs font-medium text-[#78716C] group-hover:text-[#1C1917] transition-colors flex-shrink-0">
                  {t.visit}
                  <svg
                    className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Count */}
        <p className="mt-8 text-xs text-[#78716C] opacity-50 text-center">
          {filtered.length} / {projects.length}
        </p>
      </div>
    </section>
  )
}
