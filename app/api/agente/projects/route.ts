import { NextRequest } from 'next/server'
import { listProjects } from '@/lib/db/projects-repo'
import { jsonUtf8 } from '@/lib/agente-context'
import { clientIp, rateLimit } from '@/lib/rate-limit'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  if (!rateLimit(clientIp(req)).ok) {
    return jsonUtf8({ error: 'Demasiadas peticiones. Inténtalo en un minuto.' }, 429)
  }
  const rows = await listProjects()
  const proyectos = rows.map((p) => ({
    slug: p.slug,
    nombre: p.nombre,
    estado: p.estado,
    sector: p.sector,
    demo_url: p.demoUrl,
    url: p.url,
  }))
  return jsonUtf8({
    total: proyectos.length,
    hechas: proyectos.filter((p) => p.estado === 'hecho').length,
    proyectos,
  })
}
