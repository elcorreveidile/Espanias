import { eq } from 'drizzle-orm'
import { db } from '@/lib/db/client'
import { ensureMundialTable } from '@/lib/db/ensure-schema'
import { mundialCupones, mundialLeads } from '@/lib/db/schema'

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
