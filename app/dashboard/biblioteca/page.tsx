import Link from 'next/link'

export const dynamic = 'force-dynamic'

const sections = [
  { href: '/dashboard/biblioteca/componentes', title: 'Componentes', desc: 'Módulos reutilizables entre proyectos.' },
  { href: '/dashboard/biblioteca/patrones', title: 'Patrones', desc: 'Decisiones arquitectónicas compartidas.' },
  { href: '/dashboard/biblioteca/learnings', title: 'Learnings', desc: 'Notas de lo aprendido en cada proyecto.' },
]

export default function BibliotecaIndex() {
  return (
    <div>
      <h1 className="mb-2 text-3xl font-black text-[#1C1917]">Biblioteca</h1>
      <p className="mb-8 text-[#78716C]">Conocimiento compartido que reutiliza el agente.</p>
      <div className="grid gap-4 sm:grid-cols-3">
        {sections.map((s) => (
          <Link key={s.href} href={s.href} className="rounded-2xl border border-stone-200 bg-white p-5 transition-colors hover:border-stone-300">
            <h2 className="mb-1 font-black text-[#1C1917]">{s.title}</h2>
            <p className="text-sm text-[#78716C]">{s.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
