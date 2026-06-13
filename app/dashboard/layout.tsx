import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth/current-user'
import { signOut } from '@/app/auth/actions'

export const metadata = { title: 'Panel', robots: { index: false } }
export const dynamic = 'force-dynamic'

const navItems = [
  { href: '/dashboard', label: 'Resumen' },
  { href: '/dashboard/proyectos', label: 'Proyectos' },
  { href: '/dashboard/biblioteca', label: 'Biblioteca' },
  { href: '/dashboard/usuarios', label: 'Usuarios' },
]

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()
  if (!session) redirect('/auth/signin')

  return (
    <div className="flex min-h-screen bg-[#FAFAF9]">
      <aside className="flex w-60 flex-col border-r border-stone-200 bg-white p-6">
        <Link href="/dashboard" className="mb-8 text-lg font-black text-[#1C1917]">
          Espanias · Panel
        </Link>
        <nav className="flex flex-1 flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-[#57534E] transition-colors hover:bg-stone-100 hover:text-[#1C1917]"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/catalogo"
            className="rounded-lg px-3 py-2 text-sm font-medium text-[#57534E] transition-colors hover:bg-stone-100 hover:text-[#1C1917]"
          >
            Ver catálogo público ↗
          </Link>
        </nav>
        <div className="mt-6 border-t border-stone-200 pt-4">
          <p className="mb-2 truncate text-xs text-[#A8A29E]">{session.email}</p>
          <form action={signOut}>
            <button
              type="submit"
              className="text-sm font-medium text-[#BF2638] hover:text-[#1C1917]"
            >
              Cerrar sesión
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 p-10">{children}</main>
    </div>
  )
}
