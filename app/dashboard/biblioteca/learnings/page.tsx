import Link from 'next/link'
import { listLearnings } from '@/lib/db/biblioteca-repo'

export const dynamic = 'force-dynamic'

export default async function LearningsPage() {
  const rows = await listLearnings()
  return (
    <div>
      <Link href="/dashboard/biblioteca" className="mb-6 inline-block text-sm text-[#78716C] hover:text-[#6D28D9]">← Biblioteca</Link>
      <h1 className="mb-6 text-3xl font-black text-[#1C1917]">Learnings</h1>
      {rows.length === 0 ? (
        <p className="text-[#78716C]">Aún no hay learnings.</p>
      ) : (
        <div className="space-y-3">
          {rows.map((l) => (
            <div key={l.id} className="rounded-2xl border border-stone-200 bg-white p-5">
              <div className="flex items-center gap-2">
                <h2 className="font-black text-[#1C1917]">{l.titulo}</h2>
                {l.tipo && <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs text-[#78716C]">{l.tipo}</span>}
              </div>
              {l.proyecto && <p className="mt-1 text-xs text-[#A8A29E]">{l.proyecto}</p>}
              {l.contenido && <p className="mt-2 text-sm text-[#57534E]">{l.contenido}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
