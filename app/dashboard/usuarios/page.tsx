import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth/current-user'
import { listUsers } from '@/lib/db/biblioteca-repo'
import { addViewer, removeUser } from './actions'

export const dynamic = 'force-dynamic'

const field =
  'w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-[#1C1917] focus:border-[#6D28D9] focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/20'

export default async function UsuariosPage() {
  const session = await getSession()
  if (!session || session.rol !== 'admin') redirect('/auth/signin')

  const rows = await listUsers()

  return (
    <div className="max-w-2xl">
      <h1 className="mb-2 text-3xl font-black text-[#1C1917]">Usuarios</h1>
      <p className="mb-8 text-[#78716C]">Quién puede acceder al panel mediante magic link.</p>

      <form action={addViewer} className="mb-10 grid grid-cols-1 gap-3 rounded-2xl border border-stone-200 bg-white p-5 sm:grid-cols-4">
        <input name="email" type="email" required placeholder="email@dominio.com" className={`${field} sm:col-span-2`} />
        <input name="nombre" placeholder="Nombre" className={field} />
        <select name="rol" defaultValue="viewer" className={field}>
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="rounded-lg bg-[#1C1917] px-4 py-2 text-sm font-semibold text-white hover:bg-[#44403C] sm:col-span-4">
          Añadir usuario
        </button>
      </form>

      <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white">
        <table className="w-full min-w-[480px] text-sm">
          <thead>
            <tr className="border-b border-stone-200 text-left text-xs uppercase tracking-wider text-[#A8A29E]">
              <th className="px-5 py-3 font-semibold">Email</th>
              <th className="px-5 py-3 font-semibold">Nombre</th>
              <th className="px-5 py-3 font-semibold">Rol</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {rows.map((u) => (
              <tr key={u.email} className="border-b border-stone-100 last:border-0">
                <td className="px-5 py-3 font-medium text-[#1C1917]">{u.email}</td>
                <td className="px-5 py-3 text-[#78716C]">{u.nombre ?? '—'}</td>
                <td className="px-5 py-3 text-[#78716C]">{u.rol}</td>
                <td className="px-5 py-3 text-right">
                  {u.email !== session.email && (
                    <form action={removeUser.bind(null, u.email)}>
                      <button type="submit" className="text-sm font-medium text-[#BF2638] hover:text-[#1C1917]">
                        Eliminar
                      </button>
                    </form>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
