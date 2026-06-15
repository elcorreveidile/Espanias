'use client'

import { type Category, type Project } from '@/lib/projects'
import type { Lang } from '@/lib/translations'
import { categoryLabels, statusLabels } from '@/lib/catalogo-labels'

interface Props {
  lang: Lang
  projects: Project[]
  searchTerm: string
  onSearchChange: (term: string) => void
  selectedCategory: Category | 'all'
  onCategoryChange: (category: Category | 'all') => void
  selectedStatus: Project['status'] | 'all'
  onStatusChange: (status: Project['status'] | 'all') => void
  onClear: () => void
}

const t = {
  es: {
    search: 'Buscar',
    searchPlaceholder: 'Nombre o descripción…',
    category: 'Categoría',
    status: 'Estado',
    all: 'Todas',
    allStatus: 'Todos',
    clear: 'Limpiar filtros',
  },
  en: {
    search: 'Search',
    searchPlaceholder: 'Name or description…',
    category: 'Category',
    status: 'Status',
    all: 'All',
    allStatus: 'All',
    clear: 'Clear filters',
  },
} as const

export default function FilterBar({
  lang,
  projects,
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  onClear,
}: Props) {
  const tr = t[lang]
  // Solo categorías presentes en los datos, ordenadas alfabéticamente por etiqueta.
  const categories = (Array.from(new Set(projects.map((p) => p.category))) as Category[]).sort(
    (a, b) => categoryLabels[lang][a].localeCompare(categoryLabels[lang][b])
  )
  const statuses: Array<Project['status']> = ['hecho', 'desarrollo', 'planeado', 'idea']

  const hasFilters =
    searchTerm !== '' || selectedCategory !== 'all' || selectedStatus !== 'all'

  const fieldClass =
    'w-full rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-[#1C1917] focus:border-[#6D28D9] focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/20 dark:border-white/15 dark:bg-white/5 dark:text-[#F5F5F4]'
  const labelClass = 'mb-2 block text-xs font-semibold uppercase tracking-wider text-[#78716C] dark:text-[#A8A29E]'

  return (
    <div className="mb-10 rounded-2xl border border-stone-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Búsqueda */}
        <div>
          <label htmlFor="catalog-search" className={labelClass}>
            {tr.search}
          </label>
          <input
            id="catalog-search"
            type="text"
            placeholder={tr.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className={fieldClass}
          />
        </div>

        {/* Categoría */}
        <div>
          <label htmlFor="catalog-category" className={labelClass}>
            {tr.category}
          </label>
          <select
            id="catalog-category"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value as Category | 'all')}
            className={fieldClass}
          >
            <option value="all">{tr.all}</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {categoryLabels[lang][category]}
              </option>
            ))}
          </select>
        </div>

        {/* Estado */}
        <div>
          <label htmlFor="catalog-status" className={labelClass}>
            {tr.status}
          </label>
          <select
            id="catalog-status"
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value as Project['status'] | 'all')}
            className={fieldClass}
          >
            <option value="all">{tr.allStatus}</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {statusLabels[lang][status]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {hasFilters && (
        <button
          onClick={onClear}
          className="mt-4 text-sm font-medium text-[#6D28D9] transition-colors hover:text-[#BF2638]"
        >
          {tr.clear}
        </button>
      )}
    </div>
  )
}
