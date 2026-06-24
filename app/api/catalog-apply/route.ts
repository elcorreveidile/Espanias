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
      estado: "hecho",
      demoUrl: null,
      imagenUrl: "/projects/perruqueria-canina.webp",
    },
  },
  {
    slug: "eje-fisioterapia",
    data: {
      url: "https://fisioterapia.espanias.com",
      estado: "hecho",
      demoUrl: null,
      imagenUrl: "/projects/eje-fisioterapia.webp",
    },
  },
  {
    slug: "clinica-dental",
    data: {
      nombre: "Dentista de Barrio",
      url: "https://dentista.espanias.com",
      estado: "hecho",
      demoUrl: null,
      imagenUrl: "/projects/clinica-dental.webp",
    },
  },
  {
    slug: "barberia",
    data: {
      url: "https://barberia.espanias.com",
      estado: "hecho",
      demoUrl: null,
      imagenUrl: "/projects/barberia.webp",
    },
  },
  {
    slug: "bar-de-eric",
    data: {
      url: "https://bardeeric.espanias.com",
      estado: "hecho",
      demoUrl: null,
      imagenUrl: "/projects/bar-de-eric.webp",
    },
  },
  {
    slug: "comite-clm",
    data: {
      url: "https://www.comiteclm.com",
      estado: "hecho",
      demoUrl: null,
      imagenUrl: "/projects/comite-clm.webp",
    },
  },
  {
    slug: "mariano-maresca",
    data: {
      url: "https://www.marianomaresca.com",
      estado: "hecho",
      demoUrl: null,
      category: "personal",
      imagenUrl: "/projects/mariano-maresca.webp",
    },
  },
  {
    slug: "costa-companion",
    data: {
      url: "https://costacompanion.com",
      estado: "hecho",
      demoUrl: null,
      category: "saas",
      imagenUrl: "/projects/costa-companion.webp",
    },
  },
  {
    slug: "turno-claro",
    data: {
      nombre: "PlanTurnos",
      url: "https://planturnos.com",
      demoUrl: "https://planturnos.com/demo",
      imagenUrl: "/projects/plan-turnos.webp",
      category: "saas",
      estado: "hecho",
      descripcionEs:
        "SaaS multiempresa para organizar el trabajo de equipos. Genera cuadrantes de turnos automáticos para residencias y sectores a turnos, y gestiona reparto de docencia y control de horas para academias. Cada cliente con su propio subdominio.",
      descripcionEn:
        "Multi-company SaaS to organize team work. It builds automatic shift rotas for care homes and shift-based sectors, and manages teaching allocation and hours tracking for language academies. Each client gets its own subdomain.",
    },
  },
  {
    slug: "clase-digital-main",
    data: {
      nombre: "La Clase Digital",
      url: "https://laclasedigital.com",
      demoUrl: null,
      imagenUrl: "/projects/clase-digital.webp",
      category: "ia",
      estado: "hecho",
      descripcionEs:
        "Plataforma de formación docente en inteligencia artificial para profesores de Español como Lengua Extranjera (ELE). Curso de 20 horas con módulos sobre ética y prompts (marco FRAME), chatbots a medida, planificación alineada con el MCER y creación de recursos multimodales. Incluye certificado de aprovechamiento.",
      descripcionEn:
        "Teacher-training platform on artificial intelligence for Spanish as a Foreign Language (ELE) teachers. A 20-hour course with modules on AI ethics and prompting (FRAME framework), tailored chatbots, CEFR-aligned planning and multimodal resource creation. Includes a certificate of completion.",
    },
  },
  {
    slug: "ia-ele-course",
    data: {
      nombre: "Clínica Cultural y Lingüística de Español",
      url: "https://www.clinicacultural.com",
      demoUrl: null,
      imagenUrl: "/projects/clinica-cultural.webp",
      category: "educacion",
      estado: "hecho",
      descripcionEs:
        "Experiencia integral de inmersión en español y cultura en Granada. No es un curso al uso: combina el aprendizaje del idioma con inmersión cultural, con un diagnóstico inicial y un itinerario personalizado. Vinculada a la Universidad de Granada.",
      descripcionEn:
        "Immersive Spanish-language and cultural experience in Granada. Not a typical course: it blends language learning with cultural immersion through an initial diagnostic and a personalized itinerary. Linked to the University of Granada.",
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
