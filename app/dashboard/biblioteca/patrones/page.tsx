import Link from 'next/link'
import { listDecisions } from '@/lib/db/biblioteca-repo'

export const dynamic = 'force-dynamic'

export default async function PatronesPage() {
  const rows = await listDecisions()
  return (
    <div>
      <Link href="/dashboard/biblioteca" className="mb-6 inline-block text-sm text-[#78716C] hover:text-[#6D28D9]">← Biblioteca</Link>
      <h1 className="mb-6 text-3xl font-black text-[#1C1917]">Patrones</h1>
      {rows.length === 0 ? (
        <p className="text-[#78716C]">Aún no hay patrones.</p>
      ) : (
        <div className="space-y-3">
          {rows.map((d) => (
            <div key={d.id} className="rounded-2xl border border-stone-200 bg-white p-5">
              <div className="flex items-center gap-2">
                <h2 className="font-black text-[#1C1917]">{d.titulo}</h2>
                {d.categoria && <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs text-[#78716C]">{d.categoria}</span>}
              </div>
              {d.decision && <p className="mt-2 text-sm text-[#1C1917]"><strong>Decisión:</strong> {d.decision}</p>}
              {d.razon && <p className="mt-1 text-sm text-[#57534E]"><strong>Razón:</strong> {d.razon}</p>}
              {d.referenciaProyectos && <p className="mt-2 font-mono text-xs text-[#A8A29E]">{d.referenciaProyectos}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
