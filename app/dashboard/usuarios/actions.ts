'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth/current-user'
import { addUser, deleteUser } from '@/lib/db/biblioteca-repo'

async function requireAdmin() {
  const session = await getSession()
  if (!session || session.rol !== 'admin') redirect('/auth/signin')
  return session
}

export async function addViewer(formData: FormData): Promise<void> {
  const me = await requireAdmin()
  const email = String(formData.get('email') ?? '').trim().toLowerCase()
  const nombre = String(formData.get('nombre') ?? '').trim() || null
  const rol = String(formData.get('rol') ?? 'viewer').trim() === 'admin' ? 'admin' : 'viewer'
  if (email && email !== me.email) {
    await addUser(email, nombre, rol)
  }
  revalidatePath('/dashboard/usuarios')
}

export async function removeUser(email: string): Promise<void> {
  const me = await requireAdmin()
  if (email !== me.email) {
    await deleteUser(email)
  }
  revalidatePath('/dashboard/usuarios')
}
