import { NextRequest, NextResponse } from 'next/server'
import { consumeMagicToken, getAllowedUser } from '@/lib/auth/magic'
import {
  createSessionToken,
  SESSION_COOKIE,
  sessionCookieOptions,
} from '@/lib/auth/session'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')
  const signinUrl = new URL('/auth/signin?error=1', req.url)
  const dashUrl = new URL('/dashboard', req.url)

  if (!token) return NextResponse.redirect(signinUrl)

  const email = await consumeMagicToken(token)
  if (!email) return NextResponse.redirect(signinUrl)

  const user = await getAllowedUser(email)
  if (!user) return NextResponse.redirect(signinUrl)

  const session = await createSessionToken({
    email: user.email,
    rol: user.rol,
    nombre: user.nombre ?? undefined,
  })

  const res = NextResponse.redirect(dashUrl)
  res.cookies.set(SESSION_COOKIE, session, sessionCookieOptions)
  return res
}
