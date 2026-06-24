import { NextRequest, NextResponse } from "next/server";

// Endpoint TEMPORAL: lista (solo NOMBRES, sin valores) las variables de entorno
// relacionadas con Blob/token, para diagnosticar la subida de imágenes.
// Borrar tras usarlo.
export const dynamic = "force-dynamic";

const TOKEN = "espanias-diagblob-2026";

export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.get("token") !== TOKEN) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const keys = Object.keys(process.env)
    .filter((k) => /BLOB|TOKEN|VERCEL/i.test(k))
    .sort();
  return NextResponse.json({
    tieneBlobReadWriteToken: !!process.env.BLOB_READ_WRITE_TOKEN,
    variablesRelacionadas: keys,
  });
}
