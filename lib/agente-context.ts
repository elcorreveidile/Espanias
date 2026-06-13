import type { ProjectRow } from '@/lib/db/projects-repo'

// Stack base compartido por todos los proyectos (heredado de la marca de la casa).
export const STACK_BASE = {
  framework: 'Next.js 15 (App Router)',
  lenguaje: 'TypeScript',
  css: 'Tailwind CSS',
  base_datos: 'Neon (Postgres)',
  orm: 'Drizzle',
  autenticacion: 'Magic Link (Resend)',
  emails: 'Resend',
  despliegue: 'Vercel',
}

export function buildContext(p: ProjectRow) {
  return {
    project: {
      slug: p.slug,
      nombre: p.nombre,
      claim: p.claim,
      sector: p.sector,
      categoria: p.category,
      estado: p.estado,
      descripcion_es: p.descripcionEs ?? p.descripcion,
      descripcion_en: p.descripcionEn,
      url: p.url,
      demo_url: p.demoUrl,
      repositorio_url: p.repositorioUrl,
    },
    stack: STACK_BASE,
    notas_internas: p.notasInternas,
  }
}

export function buildMarkdown(p: ProjectRow): string {
  const lines = [
    `# ${p.nombre} — Tarjeta de Proyecto`,
    '',
    p.claim ? `**Claim:** ${p.claim}` : null,
    p.sector ? `**Sector:** ${p.sector}` : null,
    p.estado ? `**Estado:** ${p.estado}` : null,
    '',
    '## Stack',
    `- ${Object.values(STACK_BASE).join(' · ')}`,
    '',
    '## Descripción',
    p.descripcionEs ?? p.descripcion ?? '—',
    '',
    p.repositorioUrl ? `## Repositorio\n${p.repositorioUrl}` : null,
    p.demoUrl ? `## Demo\n${p.demoUrl}` : null,
    p.notasInternas ? `## Notas internas\n${p.notasInternas}` : null,
    '',
    '---',
    '',
    '*Generado desde espanias.com*',
  ]
  return lines.filter((l) => l !== null).join('\n')
}
