import Link from 'next/link'
import { listAllPosts } from '@/lib/db/posts-repo'

export const dynamic = 'force-dynamic'

export default async function BlogAdminList() {
  let posts: Awaited<ReturnType<typeof listAllPosts>> = []
  try {
    posts = await listAllPosts()
  } catch {
    posts = []
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="mb-2 text-3xl font-black text-[#1C1917]">Blog</h1>
          <p className="text-[#78716C]">{posts.length} artículos.</p>
        </div>
        <Link
          href="/dashboard/blog/new"
          className="rounded-lg bg-[#1C1917] px-5 py-2.5 font-semibold text-white transition-colors hover:bg-[#44403C]"
        >
          + Nuevo artículo
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="rounded-2xl border border-stone-200 bg-white p-10 text-center text-[#78716C]">
          Aún no hay artículos. Crea el primero con «Nuevo artículo».
        </p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white">
          <table className="w-full min-w-[480px] text-sm">
            <thead>
              <tr className="border-b border-stone-200 text-left text-xs uppercase tracking-wider text-[#A8A29E]">
                <th className="px-5 py-3 font-semibold">Título</th>
                <th className="px-5 py-3 font-semibold">Estado</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.slug} className="border-b border-stone-100 last:border-0">
                  <td className="px-5 py-3 font-medium text-[#1C1917]">{p.titulo}</td>
                  <td className="px-5 py-3">
                    {p.publicado ? (
                      <span className="rounded-md bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                        Publicado
                      </span>
                    ) : (
                      <span className="rounded-md bg-stone-100 px-2 py-0.5 text-xs font-semibold text-stone-600">
                        Borrador
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <Link
                      href={`/dashboard/blog/${p.slug}`}
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
      )}
    </div>
  )
}
