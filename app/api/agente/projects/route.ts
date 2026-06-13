import { NextResponse } from 'next/server'
import { listProjects } from '@/lib/db/projects-repo'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const rows = await listProjects()
  const proyectos = rows.map((p) => ({
    slug: p.slug,
    nombre: p.nombre,
    estado: p.estado,
    sector: p.sector,
    demo_url: p.demoUrl,
    url: p.url,
  }))
  return NextResponse.json({
    total: proyectos.length,
    hechas: proyectos.filter((p) => p.estado === 'hecho').length,
    proyectos,
  })
}
