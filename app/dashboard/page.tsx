import Link from 'next/link'
import { getStats } from '@/lib/db/projects-repo'
import { statusLabels } from '@/lib/catalogo-labels'

export const dynamic = 'force-dynamic'

const STATUS_ORDER = ['hecho', 'desarrollo', 'planeado', 'idea'] as const

export default async function DashboardOverview() {
  const stats = await getStats()

  return (
    <div>
      <h1 className="mb-2 text-3xl font-black text-[#1C1917]">Resumen</h1>
      <p className="mb-8 text-[#78716C]">
        {stats.total} proyectos en el catálogo.
      </p>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {STATUS_ORDER.map((s) => (
          <div key={s} className="rounded-2xl border border-stone-200 bg-white p-5">
            <p className="text-3xl font-black text-[#1C1917]">{stats.byStatus[s] ?? 0}</p>
            <p className="mt-1 text-sm text-[#78716C]">{statusLabels.es[s]}</p>
          </div>
        ))}
      </div>

      <Link
        href="/dashboard/proyectos"
        className="mt-8 inline-block rounded-lg bg-[#1C1917] px-5 py-2.5 font-semibold text-white transition-colors hover:bg-[#44403C]"
      >
        Gestionar proyectos →
      </Link>
    </div>
  )
}
