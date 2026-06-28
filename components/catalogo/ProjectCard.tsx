import Link from 'next/link'
import Image from 'next/image'
import { categoryColors, projectCategories, type Project } from '@/lib/projects'
import type { Lang } from '@/lib/translations'
import { categoryLabels, statusLabels, statusColors } from '@/lib/catalogo-labels'
import SelloECR from '@/components/marca/SelloECR'

interface Props {
  project: Project
  lang: Lang
}

export default function ProjectCard({ project, lang }: Props) {
  const categoryColor = categoryColors[project.category]

  return (
    <Link href={`/catalogo/${project.slug}`} className="group block h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-stone-300 hover:shadow-lg dark:border-white/10 dark:bg-[#1C1917] dark:hover:border-white/20">
        {/* Portada: imagen real si existe, si no portada de color por categoría */}
        <div
          className="relative h-28 overflow-hidden"
          style={{ backgroundColor: categoryColor }}
        >
          {project.image ? (
            <>
              <Image
                src={project.image}
                alt={project.name}
                fill
                sizes="(max-width: 640px) 100vw, 360px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Velo inferior para legibilidad de la etiqueta */}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.35), transparent 45%)' }}
              />
            </>
          ) : (
            <>
              {/* Brillo */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(circle at 25% 18%, rgba(255,255,255,0.40), transparent 55%)',
                }}
              />
              {/* Sombra diagonal */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, transparent 38%, rgba(0,0,0,0.22))',
                }}
              />
              {/* Patrón de puntos */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    'radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1.6px)',
                  backgroundSize: '14px 14px',
                }}
              />
              {/* Destello de marca */}
              <svg
                className="absolute -right-3 -top-2 h-24 w-24 text-white/15 transition-transform duration-500 group-hover:scale-110"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 1.5l1.7 6.8 6.8 1.7-6.8 1.7L12 22.5l-1.7-6.8L3.5 10l6.8-1.7z" />
              </svg>
            </>
          )}
          {/* Sello ECR si el negocio está adherido a la Economía Circular */}
          {project.ecrBarrio && (
            <div className="absolute right-2 top-2 rounded-full bg-white/90 p-0.5 shadow-sm backdrop-blur-sm" title={`Economía Circular ${project.ecrBarrio}`}>
              <SelloECR codigo={project.ecrBarrio} size={36} />
            </div>
          )}
          {/* Etiquetas de categoría (una por categoría) */}
          <div className="absolute bottom-2.5 left-3 flex flex-wrap gap-1.5">
            {projectCategories(project).map((cat) => (
              <span
                key={cat}
                className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold backdrop-blur-sm"
                style={{ color: categoryColors[cat] }}
              >
                {categoryLabels[lang][cat]}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          {/* Nombre */}
          <h3 className="mb-2 line-clamp-2 text-lg font-black leading-snug text-[#1C1917] dark:text-[#F5F5F4]">
            {project.name}
          </h3>

          {/* Descripción / claim */}
          <p className="mb-5 line-clamp-3 flex-1 text-sm leading-relaxed text-[#78716C] dark:text-[#A8A29E]">
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
