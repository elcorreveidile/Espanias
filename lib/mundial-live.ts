// Datos en vivo del Mundial vía API-Football (api-sports.io), con fallback a los
// datos manuales de lib/mundial.ts. NO rompe nada: si no hay clave, si la API
// falla, o si MUNDIAL_FORCE_MANUAL=1, devuelve los datos manuales.
//
// Variables de entorno (en Vercel):
//   API_FOOTBALL_KEY        clave de api-sports.io (obligatoria para el modo vivo)
//   MUNDIAL_FORCE_MANUAL=1  fuerza datos manuales (override de seguridad)
//   MUNDIAL_REVALIDATE      segundos de caché (por defecto 1800 = 30 min)
//   MUNDIAL_LEAGUE_ID       id de liga (por defecto 1 = Mundial)
//   MUNDIAL_SEASON          temporada (por defecto 2026)
//   MUNDIAL_SPAIN_ID        id de España (por defecto 9)

import {
  ESPANA_PATH,
  GROUP_H,
  type EspMatch,
  type GroupRow,
  type MatchStatus,
} from './mundial'

const API_BASE = 'https://v3.football.api-sports.io'
const LEAGUE = process.env.MUNDIAL_LEAGUE_ID || '1'
const SEASON = process.env.MUNDIAL_SEASON || '2026'
const SPAIN = process.env.MUNDIAL_SPAIN_ID || '9'
const REVALIDATE = Number(process.env.MUNDIAL_REVALIDATE || 1800)

const FLAG: Record<string, string> = {
  Spain: '🇪🇸',
  Uruguay: '🇺🇾',
  'Cape Verde': '🇨🇻',
  'Cabo Verde': '🇨🇻',
  'Saudi Arabia': '🇸🇦',
}
const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

interface ApiTeam { id: number; name: string }
interface ApiFixture {
  fixture: { date: string; status: { short: string } }
  league: { round: string }
  teams: { home: ApiTeam; away: ApiTeam }
  goals: { home: number | null; away: number | null }
}
interface ApiStandingRow { team: ApiTeam; points: number }

async function api(path: string): Promise<unknown> {
  const key = process.env.API_FOOTBALL_KEY
  if (!key) return null
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: { 'x-apisports-key': key },
      next: { revalidate: REVALIDATE },
    })
    if (!res.ok) return null
    const json = (await res.json()) as { response?: unknown; errors?: unknown }
    const errs = json.errors
    if (errs && typeof errs === 'object' && Object.keys(errs).length > 0) return null
    return json.response ?? null
  } catch {
    return null
  }
}

function roundToFase(round: string): { es: string; en: string } {
  const r = round.toLowerCase()
  const n = (round.match(/\d+/) || [])[0] || ''
  if (r.includes('group')) return { es: `Fase de grupos · J${n}`, en: `Group stage · MD${n}` }
  if (r.includes('round of 32')) return { es: 'Dieciseisavos', en: 'Round of 32' }
  if (r.includes('round of 16')) return { es: 'Octavos', en: 'Round of 16' }
  if (r.includes('quarter')) return { es: 'Cuartos', en: 'Quarter-final' }
  if (r.includes('semi')) return { es: 'Semifinal', en: 'Semi-final' }
  if (r.includes('final')) return { es: 'FINAL', en: 'FINAL' }
  return { es: round, en: round }
}

async function getLivePath(): Promise<EspMatch[] | null> {
  const resp = await api(`/fixtures?league=${LEAGUE}&season=${SEASON}&team=${SPAIN}`)
  if (!Array.isArray(resp) || resp.length === 0) return null
  const fixtures = resp as ApiFixture[]
  fixtures.sort((a, b) => new Date(a.fixture.date).getTime() - new Date(b.fixture.date).getTime())
  return fixtures.map((f): EspMatch => {
    const spainHome = String(f.teams.home.id) === SPAIN
    const rival = spainHome ? f.teams.away.name : f.teams.home.name
    const status = f.fixture.status.short
    const finished = ['FT', 'AET', 'PEN'].includes(status)
    let estado: MatchStatus = 'proximo'
    let marcador: string | undefined
    if (finished && f.goals.home != null && f.goals.away != null) {
      const sg = spainHome ? f.goals.home : f.goals.away
      const og = spainHome ? f.goals.away : f.goals.home
      estado = sg > og ? 'ganado' : sg < og ? 'perdido' : 'empate'
      marcador = `${sg}–${og}`
    }
    const fase = roundToFase(f.league.round || '')
    const d = new Date(f.fixture.date)
    const roundLc = (f.league.round || '').toLowerCase()
    return {
      faseEs: fase.es,
      faseEn: fase.en,
      rival,
      fechaEs: `${d.getUTCDate()} ${MESES[d.getUTCMonth()]}`,
      fechaEn: `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}`,
      estado,
      marcador,
      esFinal: roundLc.includes('final') && !roundLc.includes('semi'),
    }
  })
}

async function getLiveGroup(): Promise<GroupRow[] | null> {
  const resp = await api(`/standings?league=${LEAGUE}&season=${SEASON}`)
  const groups = (resp as Array<{ league?: { standings?: ApiStandingRow[][] } }> | null)?.[0]?.league
    ?.standings
  if (!Array.isArray(groups)) return null
  for (const g of groups) {
    if (g.some((row) => String(row.team.id) === SPAIN)) {
      return g.map((row): GroupRow => ({
        team: row.team.name,
        flag: FLAG[row.team.name] || '⚽',
        pts: row.points,
        es: String(row.team.id) === SPAIN,
      }))
    }
  }
  return null
}

export async function getMundialData(): Promise<{ path: EspMatch[]; group: GroupRow[]; live: boolean }> {
  if (process.env.MUNDIAL_FORCE_MANUAL === '1' || !process.env.API_FOOTBALL_KEY) {
    return { path: ESPANA_PATH, group: GROUP_H, live: false }
  }
  const [path, group] = await Promise.all([getLivePath(), getLiveGroup()])
  return {
    path: path ?? ESPANA_PATH,
    group: group ?? GROUP_H,
    live: Boolean(path || group),
  }
}
