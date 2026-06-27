import { eq } from 'drizzle-orm'
import { db } from '@/lib/db/client'
import { ensureMundialTable } from '@/lib/db/ensure-schema'
import { mundialCupones } from '@/lib/db/schema'

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
