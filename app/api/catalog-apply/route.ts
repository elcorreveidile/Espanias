import { NextRequest, NextResponse } from "next/server";
import { updateProject, type ProjectUpdate } from "@/lib/db/projects-repo";

// Endpoint TEMPORAL: aplica a la BD de producción las ediciones del catálogo
// que vamos acordando en la revisión 1×1. Idempotente (UPDATE por slug).
// Se irá ampliando; borrar al terminar la revisión.
export const dynamic = "force-dynamic";

const TOKEN = "espanias-catalogo-2026";

const EDITS: Array<{ slug: string; data: ProjectUpdate }> = [
  {
    slug: "perruqueria-canina",
    data: {
      url: "https://perruqueria.espanias.com",
      demoUrl: null,
      imagenUrl: "/projects/perruqueria-canina.webp",
    },
  },
  {
    slug: "eje-fisioterapia",
    data: {
      url: "https://fisioterapia.espanias.com",
      demoUrl: null,
      imagenUrl: "/projects/eje-fisioterapia.webp",
    },
  },
  {
    slug: "clinica-dental",
    data: {
      nombre: "Dentista de Barrio",
      url: "https://dentista.espanias.com",
      demoUrl: null,
    },
  },
  {
    slug: "barberia",
    data: {
      url: "https://barberia.espanias.com",
      demoUrl: null,
    },
  },
  {
    slug: "bar-de-eric",
    data: {
      url: "https://bardeeric.espanias.com",
      demoUrl: null,
    },
  },
];

export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.get("token") !== TOKEN) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const applied: string[] = [];
  try {
    for (const e of EDITS) {
      await updateProject(e.slug, e.data);
      applied.push(e.slug);
    }
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : String(e), applied },
      { status: 500 }
    );
  }
  return NextResponse.json({ ok: true, applied });
}
