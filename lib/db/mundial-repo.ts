import { and, eq } from 'drizzle-orm'
import { db } from '@/lib/db/client'
import { ensureMundialTable } from '@/lib/db/ensure-schema'
import { mundialCupones, mundialLeads, mundialPorra } from '@/lib/db/schema'

export type CuponRow = typeof mundialCupones.$inferSelect

export async function getCuponByEmail(email: string): Promise<CuponRow | undefined> {
  await ensureMundialTable()
  const rows = await db
    .select()
    .from(mundialCupones)
    .where(eq(mundialCupones.email, email))
    .limit(1)
  return rows[0]
}

export async function countFreeWebs(): Promise<number> {
  await ensureMundialTable()
  const rows = await db.select({ id: mundialCupones.id }).from(mundialCupones).where(eq(mundialCupones.pct, 100))
  return rows.length
}

export async function createCupon(email: string, code: string, pct: number): Promise<void> {
  await ensureMundialTable()
  await db.insert(mundialCupones).values({ email, code, pct })
}

/** Guarda (o actualiza) el lead de quien canjea su cupón: uno por email. */
export async function upsertLead(email: string, code: string, pct: number): Promise<void> {
  await ensureMundialTable()
  const existing = await db
    .select({ id: mundialLeads.id })
    .from(mundialLeads)
    .where(eq(mundialLeads.email, email))
    .limit(1)
  if (existing.length) {
    await db.update(mundialLeads).set({ code, pct, createdAt: new Date() }).where(eq(mundialLeads.email, email))
  } else {
    await db.insert(mundialLeads).values({ email, code, pct })
  }
}

export async function listLeads() {
  await ensureMundialTable()
  return db.select().from(mundialLeads).orderBy(mundialLeads.createdAt)
}

export type PorraRow = typeof mundialPorra.$inferSelect

/** Guarda (o actualiza) el pronóstico: uno por email y partido. */
export async function upsertPorra(
  email: string,
  partido: string,
  golesEs: number,
  golesRival: number,
  desempate: number,
  desempateAdd: number
): Promise<void> {
  await ensureMundialTable()
  const existing = await db
    .select({ id: mundialPorra.id })
    .from(mundialPorra)
    .where(and(eq(mundialPorra.email, email), eq(mundialPorra.partido, partido)))
    .limit(1)
  if (existing.length) {
    await db
      .update(mundialPorra)
      .set({ golesEs, golesRival, desempate, desempateAdd, createdAt: new Date() })
      .where(eq(mundialPorra.id, existing[0].id))
  } else {
    await db.insert(mundialPorra).values({ email, partido, golesEs, golesRival, desempate, desempateAdd })
  }
}

/** Pronósticos de un partido (o todos), más antiguos primero. */
export async function listPorra(partido?: string): Promise<PorraRow[]> {
  await ensureMundialTable()
  const rows = partido
    ? await db.select().from(mundialPorra).where(eq(mundialPorra.partido, partido))
    : await db.select().from(mundialPorra)
  return rows.sort((a, b) => (a.createdAt?.getTime() ?? 0) - (b.createdAt?.getTime() ?? 0))
}
