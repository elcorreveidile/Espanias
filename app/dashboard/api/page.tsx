import { headers } from 'next/headers'
import { listProjects } from '@/lib/db/projects-repo'
import ApiConsole from '@/components/dashboard/ApiConsole'

export const dynamic = 'force-dynamic'

export default async function ApiPage() {
  const h = await headers()
  const host = h.get('x-forwarded-host') || h.get('host') || 'www.espanias.com'
  const proto = h.get('x-forwarded-proto') || 'https'
  const baseUrl = `${proto}://${host}`

  const rows = await listProjects()
  const projects = rows
    .map((p) => ({ slug: p.slug, nombre: p.nombre }))
    .sort((a, b) => a.nombre.localeCompare(b.nombre))

  return (
    <div className="max-w-3xl">
      <h1 className="mb-2 text-3xl font-black text-[#1C1917]">API / Agentes</h1>
      <p className="mb-8 text-[#78716C]">
        URLs que un agente (o tú) puede consultar para obtener el contexto y la
        arquitectura de cada proyecto.
      </p>
      <ApiConsole baseUrl={baseUrl} projects={projects} />
    </div>
  )
}
