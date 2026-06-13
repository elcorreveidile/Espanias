import { NextRequest, NextResponse } from 'next/server'
import { getFullContext } from '@/lib/db/agente-repo'
import { buildContext, buildMarkdown } from '@/lib/agente-context'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('project')
  const format = req.nextUrl.searchParams.get('format') ?? 'md'
  if (!slug) {
    return NextResponse.json({ error: 'Falta el parámetro ?project=' }, { status: 400 })
  }
  const ctx = await getFullContext(slug)
  if (!ctx) {
    return NextResponse.json({ error: 'Proyecto no encontrado' }, { status: 404 })
  }

  if (format === 'json') {
    return NextResponse.json(buildContext(ctx))
  }

  const md = buildMarkdown(ctx)
  return new NextResponse(md, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Content-Disposition': `attachment; filename="${slug}.md"`,
    },
  })
}
