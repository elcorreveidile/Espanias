import { NextRequest, NextResponse } from "next/server";
import {
  updateProject,
  createProject,
  slugExists,
  type ProjectUpdate,
} from "@/lib/db/projects-repo";

// Endpoint TEMPORAL: aplica a la BD de producción las ediciones del catálogo
// que vamos acordando en la revisión 1×1. Idempotente (UPSERT por slug:
// crea la ficha si no existe y luego la actualiza).
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
      categories: "ia,educacion",
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
  {
    slug: "espanias-main",
    data: {
      url: "https://espanias.com",
      estado: "hecho",
      demoUrl: null,
      category: "otros",
      imagenUrl: "/projects/espanias-main.webp",
      descripcionEs:
        "Portfolio de web apps rápidas y profesionales: catálogo de aplicaciones a medida, panel de gestión y sistema de componentes reutilizables.",
      descripcionEn:
        "Portfolio of fast, professional web apps: a catalogue of custom applications, a management dashboard and a reusable component system.",
    },
  },
  {
    slug: "makicar",
    data: {
      url: "https://makicar.app",
      estado: "hecho",
      demoUrl: null,
      category: "saas",
      imagenUrl: "/projects/makicar.webp",
      descripcionEs:
        "PWA de transporte compartido con un conductor de confianza en la ruta Granada–Algeciras. El conductor publica viajes y el pasajero reserva su plaza, con cálculo automático de tarifas (día/noche y suplementos), confirmación manual y pago directo al conductor. Instalable sin tiendas de apps.",
      descripcionEn:
        "Shared-transport PWA with a trusted driver on the Granada–Algeciras route. The driver posts trips and passengers book a seat, with automatic fare calculation (day/night and surcharges), manual confirmation and payment straight to the driver. Installable without app stores.",
    },
  },
  {
    slug: "versovivo",
    data: {
      url: "https://versovivo.ai",
      estado: "hecho",
      demoUrl: null,
      category: "literatura",
      categories: "literatura,ia",
      imagenUrl: "/projects/versovivo.webp",
      descripcionEs:
        "App de videopoemas: cada poema cobra vida en tres formatos —lectura inmersiva, recitación en vídeo y versión musical generada por IA. Con catálogo de libros de poesía, favoritos y perfil de usuario.",
      descripcionEn:
        "Videopoem app: each poem comes alive in three formats —immersive reading, video recitation and an AI-generated musical version. Includes a poetry-book catalogue, favourites and user profiles.",
    },
  },
  {
    slug: "poedronomo",
    data: {
      url: "https://poedronomo.com",
      estado: "hecho",
      demoUrl: null,
      category: "literatura",
      categories: "literatura,ia",
      imagenUrl: "/projects/poedronomo.webp",
      descripcionEs:
        "Poesía, música y tecnología en un solo lugar: convierte tus palabras en arte visual y sonoro. Crea poemas con acompañamiento visual y musical y publícalos.",
      descripcionEn:
        "Poetry, music and technology in one place: turn your words into visual and sound art. Create poems with visual and musical accompaniment and publish them.",
    },
  },
  {
    slug: "javier-benitez",
    data: {
      url: "https://javier.soy",
      estado: "hecho",
      demoUrl: null,
      category: "personal",
      imagenUrl: "/projects/javier-benitez.webp",
      descripcionEs:
        "Web personal de Javier Benítez Láinez: lengua, poesía, docencia, IA y crítica cultural. Un repositorio vivo con formación, asesoría y blog, donde la IA se trabaja como herramienta crítica.",
      descripcionEn:
        "Personal website of Javier Benítez Láinez: language, poetry, teaching, AI and cultural criticism. A living repository with training, consulting and a blog, where AI is used as a critical tool.",
    },
  },
  {
    slug: "makilibre",
    data: {
      url: "https://makilibre.com",
      estado: "hecho",
      demoUrl: null,
      category: "saas",
      imagenUrl: "/projects/makilibre.webp",
      descripcionEs:
        "Plataforma de apoyo integral para internos y sus familias: conecta, informa y prepara para la reinserción social, con espacios para familiares y para quienes quieren ayudar. Porque empezar de nuevo es más fácil cuando no estás solo.",
      descripcionEn:
        "Comprehensive support platform for inmates and their families: it connects, informs and prepares for social reintegration, with spaces for relatives and for people who want to help. Because starting over is easier when you are not alone.",
    },
  },
  {
    slug: "academia-musica",
    data: {
      url: "https://musica.espanias.com",
      estado: "hecho",
      demoUrl: null,
      category: "educacion",
      imagenUrl: "/projects/academia-musica.webp",
      descripcionEs:
        "Plataforma educativa híbrida de música: clases en vivo (grupos de hasta 8 alumnos) y lecciones grabadas, con catálogo de cursos por instrumento y nivel, comunidad (foro, recitales y jam sessions) y seguimiento del alumno. 7 instrumentos y planes de suscripción.",
      descripcionEn:
        "Hybrid music learning platform: live classes (groups of up to 8 students) and recorded lessons, with a course catalogue by instrument and level, a community (forum, recitals and jam sessions) and student progress tracking. 7 instruments and subscription plans.",
    },
  },
  {
    slug: "blablaele",
    data: {
      nombre: "BlablaELE",
      url: "https://blablaele.com",
      estado: "hecho",
      demoUrl: null,
      category: "educacion",
      imagenUrl: "/projects/blablaele.webp",
      descripcionEs:
        "Plataforma para aprender y enseñar español como lengua extranjera (ELE) a través de la cultura: arte, poesía, cine, música e historia hispánica. Recursos por nivel MCER y destreza, con cursos como Arte y Sociedad (C1), Escuela de Poetas (C1) y Laboratorio de Cine (B2). «Hablamos español».",
      descripcionEn:
        "Platform to learn and teach Spanish as a foreign language through culture: art, poetry, cinema, music and Hispanic history. Resources organised by CEFR level and skill, with courses like Arte y Sociedad (C1), Escuela de Poetas (C1) and Laboratorio de Cine (B2). “Hablamos español”.",
    },
  },
  {
    slug: "cognoscencia",
    data: {
      nombre: "Cognoscencia",
      url: "https://www.cognoscencia.com",
      estado: "hecho",
      demoUrl: null,
      category: "educacion",
      imagenUrl: "/projects/cognoscencia.webp",
      descripcionEs:
        "Plataforma educativa del Centro de Lenguas Modernas de la Universidad de Granada para cursos de español de nivel avanzado (C1–C2). Complementa las clases presenciales con lecturas, ejercicios de escritura y debates culturales: «Producción Escrita» (C2) y «Arte y sociedad en la cultura hispánica» (C1).",
      descripcionEn:
        "Educational platform from the Modern Languages Centre at the University of Granada for advanced Spanish courses (C1–C2). It complements in-person classes with readings, writing exercises and cultural debates: “Producción Escrita” (C2) and “Arte y sociedad en la cultura hispánica” (C1).",
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
      if (!(await slugExists(e.slug))) {
        await createProject({
          slug: e.slug,
          nombre: e.data.nombre ?? e.slug,
          category: e.data.category ?? "otros",
          estado: e.data.estado ?? "hecho",
          descripcionEs: e.data.descripcionEs ?? null,
          descripcionEn: e.data.descripcionEn ?? null,
        });
      }
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
