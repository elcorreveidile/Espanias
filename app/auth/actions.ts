'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getAllowedUser, createMagicToken, sendMagicLink } from '@/lib/auth/magic'
import { SESSION_COOKIE } from '@/lib/auth/session'

// URL base FIJA (no se lee de cabeceras de la petición): así un atacante no
// puede envenenar el enlace mágico con un Host falso y robar el token.
function baseUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.espanias.com').replace(/\/+$/, '')
}

export async function requestMagicLink(formData: FormData): Promise<void> {
  const email = String(formData.get('email') || '').trim().toLowerCase()
  if (!email) redirect('/auth/signin?error=1')

  // Solo enviamos si el email está autorizado. No revelamos si existe o no:
  // en ambos casos llevamos a la página de "revisa tu correo".
  // Si algo falla (BD o Resend) avisamos en vez de reventar con un 500.
  let ok = true
  try {
    const user = await getAllowedUser(email)
    if (user) {
      const token = await createMagicToken(email)
      const url = `${baseUrl()}/auth/callback?token=${token}`
      await sendMagicLink(email, url)
    }
  } catch (err) {
    console.error('[auth] requestMagicLink falló:', err)
    ok = false
  }

  redirect(ok ? '/auth/verify' : '/auth/signin?error=send')
}

export async function signOut(): Promise<void> {
  const c = await cookies()
  c.delete(SESSION_COOKIE)
  redirect('/auth/signin')
}
