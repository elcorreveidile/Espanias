import Link from 'next/link'
import { listProjects } from '@/lib/db/projects-repo'
import { statusLabels } from '@/lib/catalogo-labels'

export const dynamic = 'force-dynamic'

export default async function ProyectosList() {
  const rows = await listProjects()
  rows.sort((a, b) => a.nombre.localeCompare(b.nombre))

  return (
    <div>
      <h1 className="mb-2 text-3xl font-black text-[#1C1917]">Proyectos</h1>
      <p className="mb-8 text-[#78716C]">{rows.length} proyectos. Haz clic para editar.</p>

      <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white">
        <table className="w-full min-w-[480px] text-sm">
          <thead>
            <tr className="border-b border-stone-200 text-left text-xs uppercase tracking-wider text-[#A8A29E]">
              <th className="px-5 py-3 font-semibold">Nombre</th>
              <th className="px-5 py-3 font-semibold">Categoría</th>
              <th className="px-5 py-3 font-semibold">Estado</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.slug} className="border-b border-stone-100 last:border-0">
                <td className="px-5 py-3 font-medium text-[#1C1917]">{p.nombre}</td>
                <td className="px-5 py-3 text-[#78716C]">{p.category ?? '—'}</td>
                <td className="px-5 py-3 text-[#78716C]">
                  {statusLabels.es[(p.estado as keyof typeof statusLabels.es) ?? 'idea'] ?? p.estado}
                </td>
                <td className="px-5 py-3 text-right">
                  <Link
                    href={`/dashboard/proyectos/${p.slug}`}
                    className="font-medium text-[#6D28D9] hover:text-[#BF2638]"
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
