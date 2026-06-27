import { NextResponse } from 'next/server'
import { getMundialData } from '@/lib/mundial-live'

// TEMPORAL: comprueba si los datos del Mundial llegan en vivo desde API-Football.
// Borrar tras verificar.
export const dynamic = 'force-dynamic'

export async function GET() {
  const data = await getMundialData()
  return NextResponse.json({
    hasKey: Boolean(process.env.API_FOOTBALL_KEY),
    live: data.live,
    matches: data.path.length,
    first: data.path[0] ?? null,
    group: data.group,
  })
}
