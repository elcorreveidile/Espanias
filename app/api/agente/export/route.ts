import { NextRequest, NextResponse } from 'next/server'
import { getProjectRow } from '@/lib/db/projects-repo'
import { buildContext, buildMarkdown } from '@/lib/agente-context'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('project')
  const format = req.nextUrl.searchParams.get('format') ?? 'md'
  if (!slug) {
    return NextResponse.json({ error: 'Falta el parámetro ?project=' }, { status: 400 })
  }
  const row = await getProjectRow(slug)
  if (!row) {
    return NextResponse.json({ error: 'Proyecto no encontrado' }, { status: 404 })
  }

  if (format === 'json') {
    return NextResponse.json(buildContext(row))
  }

  const md = buildMarkdown(row)
  return new NextResponse(md, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Content-Disposition': `attachment; filename="${slug}.md"`,
    },
  })
}
