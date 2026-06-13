import Link from 'next/link'
import { categoryColors, type Project } from '@/lib/projects'
import type { Lang } from '@/lib/translations'
import { categoryLabels, statusLabels, statusColors } from '@/lib/catalogo-labels'

interface Props {
  project: Project
  lang: Lang
}

export default function ProjectCard({ project, lang }: Props) {
  const categoryColor = categoryColors[project.category]

  return (
    <Link href={`/catalogo/${project.slug}`} className="group block h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-stone-300 hover:shadow-lg">
        {/* Barra de color de categoría */}
        <div className="h-1" style={{ backgroundColor: categoryColor }} />

        <div className="flex flex-1 flex-col p-6">
          {/* Badge de categoría */}
          <span
            className="mb-3 inline-block w-fit rounded-full px-3 py-1 text-xs font-semibold text-white"
            style={{ backgroundColor: categoryColor }}
          >
            {categoryLabels[lang][project.category]}
          </span>

          {/* Nombre */}
          <h3 className="mb-2 line-clamp-2 text-lg font-black leading-snug text-[#1C1917]">
            {project.name}
          </h3>

          {/* Descripción / claim */}
          <p className="mb-5 line-clamp-3 flex-1 text-sm leading-relaxed text-[#78716C]">
            {project.description[lang]}
          </p>

          {/* Badge de estado */}
          <span
            className={`inline-block w-fit rounded-md px-2.5 py-1 text-xs font-semibold ${statusColors[project.status]}`}
          >
            {statusLabels[lang][project.status]}
          </span>
        </div>
      </article>
    </Link>
  )
}
