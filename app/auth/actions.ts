'use server'

import { headers, cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getAllowedUser, createMagicToken, sendMagicLink } from '@/lib/auth/magic'
import { SESSION_COOKIE } from '@/lib/auth/session'

async function baseUrl(): Promise<string> {
  const h = await headers()
  const host = h.get('x-forwarded-host') || h.get('host') || 'www.espanias.com'
  const proto = h.get('x-forwarded-proto') || 'https'
  return `${proto}://${host}`
}

export async function requestMagicLink(formData: FormData): Promise<void> {
  const email = String(formData.get('email') || '').trim().toLowerCase()
  if (!email) redirect('/auth/signin?error=1')

  // Solo enviamos si el email está autorizado. No revelamos si existe o no:
  // en ambos casos llevamos a la página de "revisa tu correo".
  const user = await getAllowedUser(email)
  if (user) {
    const token = await createMagicToken(email)
    const url = `${await baseUrl()}/auth/callback?token=${token}`
    await sendMagicLink(email, url)
  }

  redirect('/auth/verify')
}

export async function signOut(): Promise<void> {
  const c = await cookies()
  c.delete(SESSION_COOKIE)
  redirect('/auth/signin')
}
