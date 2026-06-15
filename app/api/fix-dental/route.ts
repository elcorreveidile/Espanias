import { NextRequest, NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { db } from "@/lib/db/client";

// Endpoint TEMPORAL: renombra "La Fábrica de Sonrisas" → "Clínica Dental"
// (genérico, sin el nombre real) en la base de datos de producción.
// Idempotente. Borrar tras usarlo.
export const dynamic = "force-dynamic";

const TOKEN = "espanias-dental-2026";

export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.get("token") !== TOKEN) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    await db.execute(sql`
      UPDATE projects SET
        slug = 'clinica-dental',
        nombre = 'Clínica Dental',
        url = '',
        demo_url = NULL,
        updated_at = now()
      WHERE slug IN ('fabrica-sonrisas', 'clinica-dental')
    `);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : String(e) },
      { status: 500 }
    );
  }
}
