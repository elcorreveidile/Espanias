'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { signOut } from '@/app/auth/actions'

const navItems = [
  { href: '/dashboard', label: 'Resumen' },
  { href: '/dashboard/proyectos', label: 'Proyectos' },
  { href: '/dashboard/biblioteca', label: 'Biblioteca' },
  { href: '/dashboard/api', label: 'API / Agentes' },
  { href: '/dashboard/usuarios', label: 'Usuarios' },
]

function isActive(pathname: string, href: string): boolean {
  if (href === '/dashboard') return pathname === '/dashboard'
  return pathname === href || pathname.startsWith(href + '/')
}

export default function DashboardShell({
  email,
  children,
}: {
  email: string
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const close = () => setOpen(false)

  const linkClass = (href: string) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      isActive(pathname, href)
        ? 'bg-stone-100 text-[#1C1917]'
        : 'text-[#57534E] hover:bg-stone-100 hover:text-[#1C1917]'
    }`

  return (
    <div className="flex min-h-screen bg-[#FAFAF9]">
      {/* Barra superior (solo móvil) */}
      <header className="fixed inset-x-0 top-0 z-30 flex h-14 items-center justify-between border-b border-stone-200 bg-white px-4 md:hidden">
        <Link href="/dashboard" className="text-base font-black text-[#1C1917]" onClick={close}>
          Espanias · Panel
        </Link>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Abrir menú"
          className="-mr-2 rounded-lg p-2 text-[#1C1917] hover:bg-stone-100"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </header>

      {/* Fondo oscuro al abrir el menú en móvil */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* Barra lateral */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-stone-200 bg-white p-6 transition-transform duration-200 md:static md:z-auto md:w-60 md:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-8 flex items-center justify-between">
          <Link href="/dashboard" className="text-lg font-black text-[#1C1917]" onClick={close}>
            Espanias · Panel
          </Link>
          <button
            type="button"
            onClick={close}
            aria-label="Cerrar menú"
            className="-mr-2 rounded-lg p-2 text-[#78716C] hover:bg-stone-100 md:hidden"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass(item.href)} onClick={close}>
              {item.label}
            </Link>
          ))}
          <Link
            href="/catalogo"
            className="rounded-lg px-3 py-2 text-sm font-medium text-[#57534E] transition-colors hover:bg-stone-100 hover:text-[#1C1917]"
            onClick={close}
          >
            Ver catálogo público ↗
          </Link>
        </nav>

        <div className="mt-6 border-t border-stone-200 pt-4">
          <p className="mb-2 truncate text-xs text-[#A8A29E]">{email}</p>
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

      {/* Contenido */}
      <main className="min-w-0 flex-1 p-4 pt-20 sm:p-6 md:p-10 md:pt-10">{children}</main>
    </div>
  )
}
