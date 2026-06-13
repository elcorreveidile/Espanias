import type { Category, Project } from '@/lib/projects'
import type { Lang } from '@/lib/translations'

// Etiquetas bilingües para categorías y estados del catálogo.
// Centralizadas aquí para que tarjeta, filtros y detalle usen lo mismo.

export const categoryLabels: Record<Lang, Record<Category, string>> = {
  es: {
    ia: 'IA',
    educacion: 'Educación',
    literatura: 'Literatura',
    personal: 'Personal',
    salud: 'Salud',
    derecho: 'Derecho',
    inmobiliaria: 'Inmobiliaria',
    hosteleria: 'Hostelería',
    comercio: 'Comercio',
    deporte: 'Deporte',
    eventos: 'Eventos',
    saas: 'SaaS',
    gestion: 'Gestión',
    mascotas: 'Mascotas',
    belleza: 'Belleza',
    otros: 'Otros',
  },
  en: {
    ia: 'AI',
    educacion: 'Education',
    literatura: 'Literature',
    personal: 'Personal',
    salud: 'Health',
    derecho: 'Law',
    inmobiliaria: 'Real Estate',
    hosteleria: 'Hospitality',
    comercio: 'Commerce',
    deporte: 'Sports',
    eventos: 'Events',
    saas: 'SaaS',
    gestion: 'Management',
    mascotas: 'Pets',
    belleza: 'Beauty',
    otros: 'Other',
  },
}

export const statusLabels: Record<Lang, Record<Project['status'], string>> = {
  es: {
    idea: 'Idea',
    planeado: 'Planeado',
    desarrollo: 'En desarrollo',
    hecho: 'Completado',
  },
  en: {
    idea: 'Idea',
    planeado: 'Planned',
    desarrollo: 'In progress',
    hecho: 'Done',
  },
}

// Colores del badge de estado (clases Tailwind, paleta cálida del sitio).
export const statusColors: Record<Project['status'], string> = {
  idea: 'bg-stone-100 text-stone-600',
  planeado: 'bg-amber-100 text-amber-800',
  desarrollo: 'bg-violet-100 text-violet-800',
  hecho: 'bg-emerald-100 text-emerald-800',
}
