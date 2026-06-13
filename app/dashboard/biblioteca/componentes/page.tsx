import Link from 'next/link'
import { listComponents } from '@/lib/db/biblioteca-repo'

export const dynamic = 'force-dynamic'

export default async function ComponentesPage() {
  const rows = await listComponents()
  return (
    <div>
      <Link href="/dashboard/biblioteca" className="mb-6 inline-block text-sm text-[#78716C] hover:text-[#6D28D9]">← Biblioteca</Link>
      <h1 className="mb-6 text-3xl font-black text-[#1C1917]">Componentes</h1>
      {rows.length === 0 ? (
        <p className="text-[#78716C]">Aún no hay componentes.</p>
      ) : (
        <div className="space-y-3">
          {rows.map((c) => (
            <div key={c.slug} id={c.slug} className="rounded-2xl border border-stone-200 bg-white p-5">
              <div className="flex items-center gap-2">
                <h2 className="font-black text-[#1C1917]">{c.nombre}</h2>
                {c.categoria && <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs text-[#78716C]">{c.categoria}</span>}
              </div>
              <p className="mt-1 font-mono text-xs text-[#A8A29E]">{c.slug}</p>
              {c.descripcion && <p className="mt-2 text-sm text-[#57534E]">{c.descripcion}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
