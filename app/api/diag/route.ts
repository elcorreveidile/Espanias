import { NextRequest, NextResponse } from "next/server";
import { getAllowedUser, createMagicToken, sendMagicLink } from "@/lib/auth/magic";

// Endpoint TEMPORAL de diagnóstico. Protegido por token en la query.
// Borrar cuando se resuelva el problema del magic link.
export const dynamic = "force-dynamic";

const DIAG_TOKEN = "espanias-diag-2026";

function maskUrl(url: string): string {
  try {
    const u = new URL(url);
    return `${u.protocol}//${u.username ? "***@" : ""}${u.host}${u.pathname}`;
  } catch {
    return "set (no parseable)";
  }
}

export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.get("token") !== DIAG_TOKEN) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const out: Record<string, unknown> = {};

  out.env = {
    DATABASE_URL: process.env.DATABASE_URL
      ? maskUrl(process.env.DATABASE_URL)
      : "MISSING",
    RESEND_API_KEY: process.env.RESEND_API_KEY ? "set" : "MISSING",
    EMAIL_FROM: process.env.EMAIL_FROM ?? "(por defecto: noreply@espanias.com)",
    AUTH_SECRET: process.env.AUTH_SECRET ? "set" : "MISSING",
  };

  const admin = "informa@blablaele.com";

  // Test de lectura de BD
  try {
    const u = await getAllowedUser(admin);
    out.db = { ok: true, encontradoAdmin: !!u };
  } catch (e) {
    out.db = { ok: false, error: e instanceof Error ? e.message : String(e) };
  }

  // Test de ESCRITURA de BD (igual que el flujo real: crear token)
  try {
    const token = await createMagicToken(admin);
    out.dbWrite = { ok: true, tokenLen: token.length };
  } catch (e) {
    out.dbWrite = { ok: false, error: e instanceof Error ? e.message : String(e) };
  }

  // Test de ENVÍO real (manda un correo de verdad al admin) — solo con &send=1
  if (req.nextUrl.searchParams.get("send") === "1") {
    try {
      await sendMagicLink(admin, "https://www.espanias.com/api/diag-test-link");
      out.send = { ok: true, sentTo: admin };
    } catch (e) {
      out.send = { ok: false, error: e instanceof Error ? e.message : String(e) };
    }
  }

  // Test de Resend (lista dominios, NO envía correo)
  try {
    const key = process.env.RESEND_API_KEY;
    if (!key) {
      out.resend = { ok: false, error: "RESEND_API_KEY ausente" };
    } else {
      const r = await fetch("https://api.resend.com/domains", {
        headers: { Authorization: `Bearer ${key}` },
      });
      const body = await r.json().catch(() => ({}));
      out.resend = { ok: r.ok, status: r.status, body };
    }
  } catch (e) {
    out.resend = { ok: false, error: e instanceof Error ? e.message : String(e) };
  }

  return NextResponse.json(out, { status: 200 });
}
