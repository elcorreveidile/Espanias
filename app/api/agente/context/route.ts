import { NextRequest, NextResponse } from 'next/server'
import { getFullContext } from '@/lib/db/agente-repo'
import { buildContext } from '@/lib/agente-context'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('project')
  if (!slug) {
    return NextResponse.json({ error: 'Falta el parámetro ?project=' }, { status: 400 })
  }
  const ctx = await getFullContext(slug)
  if (!ctx) {
    return NextResponse.json({ error: 'Proyecto no encontrado' }, { status: 404 })
  }
  return NextResponse.json(buildContext(ctx))
}
