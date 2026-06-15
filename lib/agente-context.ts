import { NextResponse } from 'next/server'
import type { AgenteContext } from '@/lib/db/agente-repo'
import { architectures } from '@/lib/architectures'

/** Respuesta JSON con charset utf-8 explícito (evita mojibake en el navegador). */
export function jsonUtf8(data: unknown, status = 200): NextResponse {
  return new NextResponse(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  })
}

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

export function buildContext(ctx: AgenteContext) {
  const p = ctx.project
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
      plan_maestro_url: p.planMaestroUrl,
    },
    stack: STACK_BASE,
    identidad_visual: {
      paleta_principal: p.paletaPrincipal,
      paleta_secundaria: p.paletaSecundaria,
      paleta_accion: p.paletaAccion,
      tipografia_titulos: p.tipografiaTitulos,
      tipografia_cuerpo: p.tipografiaCuerpo,
    },
    componentes_reutilizables: ctx.componentes.map((c) => ({
      slug: c.slug,
      nombre: c.nombre,
      categoria: c.categoria,
      descripcion: c.descripcion,
      doc_url: c.docUrl,
    })),
    patrones_aprendidos: ctx.patrones.map((d) => ({
      titulo: d.titulo,
      categoria: d.categoria,
      decision: d.decision,
      razon: d.razon,
    })),
    learnings: ctx.learnings.map((l) => ({
      titulo: l.titulo,
      tipo: l.tipo,
      contenido: l.contenido,
    })),
    arquitectura: architectures[p.slug] ?? null,
    notas_internas: p.notasInternas,
  }
}

export function buildMarkdown(ctx: AgenteContext): string {
  const p = ctx.project
  const lines: Array<string | null> = [
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
  ]

  if (p.paletaPrincipal || p.tipografiaTitulos) {
    lines.push('', '## Identidad visual')
    if (p.paletaPrincipal) lines.push(`- Paleta principal: ${p.paletaPrincipal}`)
    if (p.paletaSecundaria) lines.push(`- Paleta secundaria: ${p.paletaSecundaria}`)
    if (p.paletaAccion) lines.push(`- Paleta de acción: ${p.paletaAccion}`)
    if (p.tipografiaTitulos) lines.push(`- Tipografía titulares: ${p.tipografiaTitulos}`)
    if (p.tipografiaCuerpo) lines.push(`- Tipografía cuerpo: ${p.tipografiaCuerpo}`)
  }

  if (ctx.componentes.length) {
    lines.push('', '## Componentes reutilizables')
    for (const c of ctx.componentes) {
      lines.push(`- **${c.nombre}**${c.descripcion ? ` — ${c.descripcion}` : ''}`)
    }
  }

  if (ctx.patrones.length) {
    lines.push('', '## Patrones aprendidos')
    for (const d of ctx.patrones) {
      lines.push(`- **${d.titulo}**: ${d.decision ?? ''}${d.razon ? ` (${d.razon})` : ''}`)
    }
  }

  if (ctx.learnings.length) {
    lines.push('', '## Learnings')
    for (const l of ctx.learnings) {
      lines.push(`- **${l.titulo ?? ''}**: ${l.contenido ?? ''}`)
    }
  }

  const arquitectura = architectures[p.slug]
  if (arquitectura) lines.push('', '## Arquitectura replicable', arquitectura)

  if (p.repositorioUrl) lines.push('', `## Repositorio`, p.repositorioUrl)
  if (p.demoUrl) lines.push('', `## Demo`, p.demoUrl)
  if (p.notasInternas) lines.push('', `## Notas internas`, p.notasInternas)

  lines.push('', '---', '', '*Generado desde espanias.com*')
  return lines.filter((l) => l !== null).join('\n')
}
