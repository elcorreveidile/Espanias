import { NextResponse } from 'next/server'

// TEMPORAL: diagnostica la llamada cruda a API-Football. Borrar tras verificar.
export const dynamic = 'force-dynamic'

async function probe(path: string) {
  const key = process.env.API_FOOTBALL_KEY
  if (!key) return { error: 'no-key' }
  try {
    const res = await fetch(`https://v3.football.api-sports.io${path}`, {
      headers: { 'x-apisports-key': key },
      cache: 'no-store',
    })
    const json = (await res.json()) as {
      errors?: unknown
      results?: number
      response?: unknown
    }
    return {
      status: res.status,
      errors: json.errors,
      results: json.results,
      sample: Array.isArray(json.response) ? json.response.slice(0, 1) : json.response,
    }
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'fetch-failed' }
  }
}

export async function GET() {
  const [standings, fixtures] = await Promise.all([
    probe('/standings?league=1&season=2026'),
    probe('/fixtures?league=1&season=2026&team=9'),
  ])
  return NextResponse.json({ standings, fixtures })
}
