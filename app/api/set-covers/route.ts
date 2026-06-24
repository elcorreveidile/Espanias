import { NextRequest, NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { ensurePostsTable } from "@/lib/db/ensure-schema";

// Endpoint TEMPORAL: asigna las portadas (en /public/blog) a los 5 artículos.
// Idempotente. Borrar tras usarlo.
export const dynamic = "force-dynamic";

const TOKEN = "espanias-setcovers-2026";

const COVERS: Record<string, string> = {
  "gemini-chatgpt-claude-copilot-tu-negocio": "/blog/gemini-chatgpt-claude-copilot-tu-negocio.webp",
  "mundial-2026-tu-negocio-ia": "/blog/mundial-2026-tu-negocio-ia.webp",
  "segunda-mano-wallapop-vinted-tu-tienda": "/blog/segunda-mano-wallapop-vinted-tu-tienda.webp",
  "ia-renta-citas-papeleo": "/blog/ia-renta-citas-papeleo.webp",
  "web-que-traduce-sola-turistas-ia": "/blog/web-que-traduce-sola-turistas-ia.webp",
};

export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.get("token") !== TOKEN) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const updated: string[] = [];
  try {
    await ensurePostsTable();
    for (const [slug, url] of Object.entries(COVERS)) {
      await db.execute(sql`UPDATE posts SET portada_url = ${url}, updated_at = now() WHERE slug = ${slug}`);
      updated.push(slug);
    }
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : String(e), updated },
      { status: 500 }
    );
  }
  return NextResponse.json({ ok: true, updated });
}
