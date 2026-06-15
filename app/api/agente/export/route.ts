import { NextRequest, NextResponse } from 'next/server'
import { getFullContext } from '@/lib/db/agente-repo'
import { buildContext, buildMarkdown, jsonUtf8 } from '@/lib/agente-context'
import { clientIp, rateLimit } from '@/lib/rate-limit'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  if (!rateLimit(clientIp(req)).ok) {
    return jsonUtf8({ error: 'Demasiadas peticiones. Inténtalo en un minuto.' }, 429)
  }
  const slug = req.nextUrl.searchParams.get('project')
  const format = req.nextUrl.searchParams.get('format') ?? 'md'
  if (!slug) {
    return jsonUtf8({ error: 'Falta el parámetro ?project=' }, 400)
  }
  const ctx = await getFullContext(slug)
  if (!ctx) {
    return jsonUtf8({ error: 'Proyecto no encontrado' }, 404)
  }

  if (format === 'json') {
    return jsonUtf8(buildContext(ctx))
  }

  const md = buildMarkdown(ctx)
  return new NextResponse(md, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Content-Disposition': `attachment; filename="${slug}.md"`,
    },
  })
}
