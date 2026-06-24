export type Category = 'ia' | 'educacion' | 'literatura' | 'personal' | 'salud' | 'derecho' | 'inmobiliaria' | 'hosteleria' | 'comercio' | 'deporte' | 'eventos' | 'saas' | 'gestion' | 'mascotas' | 'belleza' | 'otros'

export interface Project {
  id: string
  name: string
  slug: string
  url: string
  description: { es: string; en: string }
  category: Category
  // Categorías adicionales (multi-categoría). `category` es la principal
  // (color del badge); el filtro y las etiquetas usan la unión de ambas.
  categories?: Category[]
  status: 'idea' | 'planeado' | 'desarrollo' | 'hecho'
  demo?: string
  sector?: string
  image?: string
}

/** Conjunto único de categorías de una ficha (principal + adicionales). */
export function projectCategories(
  p: { category: Category; categories?: Category[] }
): Category[] {
  return Array.from(new Set([p.category, ...(p.categories ?? [])]))
}

export const categoryColors: Record<Category, string> = {
  ia: '#6D28D9',
  educacion: '#0369A1',
  literatura: '#B45309',
  personal: '#065F46',
  salud: '#DC2626',
  derecho: '#7C3AED',
  inmobiliaria: '#0891B2',
  hosteleria: '#EA580C',
  comercio: '#059669',
  deporte: '#D97706',
  eventos: '#DB2777',
  saas: '#1D4ED8',
  gestion: '#0F766E',
  mascotas: '#65A30D',
  belleza: '#C026D3',
  otros: '#78716C',
}

export const projects: Project[] = [
  // ============================================
  // 25 PROYECTOS COMPLETADOS
  // ============================================

  // SERVICIOS PERSONALES
  {
    id: 'perruqueria-canina',
    name: 'Perruquería Canina Realejo',
    slug: 'perruqueria-canina',
    url: 'https://perruqueria.espanias.com',
    image: '/projects/perruqueria-canina.webp',
    category: 'mascotas',
    status: 'hecho',
    sector: 'servicios-personales',
    description: {
      es: 'Plataforma de reservas para peluquería canina en Granada. Sistema de citas online, confirmación automática por email, y gestión de clientes con historial de visitas.',
      en: 'Dog grooming booking platform in Granada. Online appointment system, automatic email confirmations, and customer management with visit history.',
    },
  },

  {
    id: 'eje-fisioterapia',
    name: 'Eje Fisioterapia',
    slug: 'eje-fisioterapia',
    url: 'https://fisioterapia.espanias.com',
    image: '/projects/eje-fisioterapia.webp',
    category: 'salud',
    status: 'hecho',
    sector: 'salud',
    description: {
      es: 'Clínica de fisioterapia con sistema de reservas, planes de tratamiento personalizados, y seguimiento de evolución del paciente.',
      en: 'Physiotherapy clinic with booking system, personalized treatment plans, and patient progress tracking.',
    },
  },

  {
    id: 'clinica-dental',
    name: 'Dentista de Barrio',
    slug: 'clinica-dental',
    url: 'https://dentista.espanias.com',
    image: '/projects/clinica-dental.webp',
    category: 'salud',
    status: 'hecho',
    sector: 'salud',
    description: {
      es: 'Clínica dental con presupuestos online interactivos, galería antes/después, y sistema de reservas por especialista.',
      en: 'Dental clinic with interactive online quotes, before/after gallery, and specialist-based booking system.',
    },
  },

  // EDUCACIÓN E INSTITUCIONAL
  {
    id: 'comite-clm',
    name: 'Comité CLM',
    slug: 'comite-clm',
    url: 'https://www.comiteclm.com',
    image: '/projects/comite-clm.webp',
    category: 'gestion',
    status: 'hecho',
    sector: 'institucional',
    description: {
      es: 'Web del comité de empresa del Centro de Lenguas Modernas de la Universidad de Granada. Información sindical, convenios y comunicaciones internas.',
      en: 'Workers\' committee website for the Modern Languages Centre at the University of Granada. Union information, agreements and internal communications.',
    },
  },

  {
    id: 'mm',
    name: 'Mariano Maresca',
    slug: 'mariano-maresca',
    url: 'https://www.marianomaresca.com',
    image: '/projects/mariano-maresca.webp',
    category: 'personal',
    status: 'hecho',
    sector: 'cultural',
    description: {
      es: 'Exposición digital conmemorativa del editor y figura cultural andaluza Mariano Maresca (1945–2023). Catálogo de sus obras y legado literario.',
      en: 'Digital commemorative exhibition honouring Andalusian cultural editor Mariano Maresca (1945–2023). Catalogue of his works and literary legacy.',
    },
  },

  {
    id: 'ia-ele-course',
    name: 'Clínica Cultural y Lingüística de Español',
    slug: 'ia-ele-course',
    url: 'https://www.clinicacultural.com',
    image: '/projects/clinica-cultural.webp',
    category: 'educacion',
    status: 'hecho',
    sector: 'educacion',
    description: {
      es: 'Experiencia integral de inmersión en español y cultura en Granada. No es un curso al uso: combina el aprendizaje del idioma con inmersión cultural, con un diagnóstico inicial y un itinerario personalizado. Vinculada a la Universidad de Granada.',
      en: 'Immersive Spanish-language and cultural experience in Granada. Not a typical course: it blends language learning with cultural immersion through an initial diagnostic and a personalized itinerary. Linked to the University of Granada.',
    },
  },

  {
    id: 'costa-companion',
    name: 'Costa Companion',
    slug: 'costa-companion',
    url: 'https://costacompanion.com',
    image: '/projects/costa-companion.webp',
    category: 'saas',
    status: 'hecho',
    sector: 'turismo',
    description: {
      es: 'Plataforma multilingüe de acompañamiento lingüístico para la Costa del Sol. Conecta turistas con acompañantes locales para mejorar su español.',
      en: 'Multilingual linguistic accompaniment platform for the Costa del Sol. Connects tourists with local companions to improve their Spanish.',
    },
  },

  {
    id: 'makicar',
    name: 'MakiCar',
    slug: 'makicar',
    url: 'https://makicar.app',
    image: '/projects/makicar.webp',
    category: 'saas',
    status: 'hecho',
    sector: 'transporte',
    description: {
      es: 'PWA de transporte compartido con un conductor de confianza en la ruta Granada–Algeciras. El conductor publica viajes y el pasajero reserva su plaza, con cálculo automático de tarifas (día/noche y suplementos), confirmación manual y pago directo al conductor. Instalable sin tiendas de apps.',
      en: 'Shared-transport PWA with a trusted driver on the Granada–Algeciras route. The driver posts trips and passengers book a seat, with automatic fare calculation (day/night and surcharges), manual confirmation and payment straight to the driver. Installable without app stores.',
    },
  },

  {
    id: 'versovivo',
    name: 'VersoVivo',
    slug: 'versovivo',
    url: 'https://versovivo.ai',
    image: '/projects/versovivo.webp',
    category: 'literatura',
    categories: ['ia'],
    status: 'hecho',
    sector: 'cultura',
    description: {
      es: 'App de videopoemas: cada poema cobra vida en tres formatos —lectura inmersiva, recitación en vídeo y versión musical generada por IA. Con catálogo de libros de poesía, favoritos y perfil de usuario.',
      en: 'Videopoem app: each poem comes alive in three formats —immersive reading, video recitation and an AI-generated musical version. Includes a poetry-book catalogue, favourites and user profiles.',
    },
  },

  {
    id: 'olvidos-granada',
    name: 'Olvidos de Granada',
    slug: 'olvidos-granada',
    url: 'https://olvidosdegranada.es',
    demo: 'https://olvidos-granada-demo.vercel.app',
    category: 'literatura',
    status: 'hecho',
    sector: 'cultural',
    description: {
      es: 'Revista digital de literatura y cultura de Granada. Publicación de artículos, reseñas, entrevistas y obras de autores granadinos.',
      en: 'Digital literary and cultural magazine of Granada. Publishing articles, reviews, interviews and works by Granada-based authors.',
    },
  },

  {
    id: 'clase-digital-main',
    name: 'La Clase Digital',
    slug: 'clase-digital-main',
    url: 'https://laclasedigital.com',
    image: '/projects/clase-digital.webp',
    category: 'ia',
    categories: ['educacion'],
    status: 'hecho',
    sector: 'educacion',
    description: {
      es: 'Plataforma de formación docente en inteligencia artificial para profesores de Español como Lengua Extranjera (ELE). Curso de 20 horas con módulos sobre ética y prompts (marco FRAME), chatbots a medida, planificación alineada con el MCER y creación de recursos multimodales. Incluye certificado de aprovechamiento.',
      en: 'Teacher-training platform on artificial intelligence for Spanish as a Foreign Language (ELE) teachers. A 20-hour course with modules on AI ethics and prompting (FRAME framework), tailored chatbots, CEFR-aligned planning and multimodal resource creation. Includes a certificate of completion.',
    },
  },

  {
    id: 'poedrónomo',
    name: 'Poedrónomo',
    slug: 'poedronomo',
    url: 'https://poedronomo.com',
    image: '/projects/poedronomo.webp',
    category: 'literatura',
    categories: ['ia'],
    status: 'hecho',
    sector: 'literatura',
    description: {
      es: 'Poesía, música y tecnología en un solo lugar: convierte tus palabras en arte visual y sonoro. Crea poemas con acompañamiento visual y musical y publícalos.',
      en: 'Poetry, music and technology in one place: turn your words into visual and sound art. Create poems with visual and musical accompaniment and publish them.',
    },
  },

  {
    id: 'diente-oro',
    name: 'Asociación Cultural Diente de Oro',
    slug: 'diente-oro',
    url: 'https://dientedeoro.es',
    demo: 'https://diente-oro-demo.vercel.app',
    category: 'personal',
    status: 'hecho',
    sector: 'cultural',
    description: {
      es: 'Sitio web de la asociación cultural con información de eventos, actividades, membresía y calendario de programación cultural.',
      en: 'Website of the cultural association with event information, activities, membership and cultural programming calendar.',
    },
  },

  {
    id: 'espanias-main',
    name: 'Espanias',
    slug: 'espanias-main',
    url: 'https://espanias.com',
    image: '/projects/espanias-main.webp',
    category: 'otros',
    status: 'hecho',
    sector: 'saas',
    description: {
      es: 'Portfolio de web apps rápidas y profesionales: catálogo de aplicaciones a medida, panel de gestión y sistema de componentes reutilizables.',
      en: 'Portfolio of fast, professional web apps: a catalogue of custom applications, a management dashboard and a reusable component system.',
    },
  },

  {
    id: 'branding-javier',
    name: 'Javier Benítez — Personal',
    slug: 'javier-benitez',
    url: 'https://javier.soy',
    image: '/projects/javier-benitez.webp',
    category: 'personal',
    status: 'hecho',
    sector: 'personal',
    description: {
      es: 'Web personal de Javier Benítez Láinez: lengua, poesía, docencia, IA y crítica cultural. Un repositorio vivo con formación, asesoría y blog, donde la IA se trabaja como herramienta crítica.',
      en: 'Personal website of Javier Benítez Láinez: language, poetry, teaching, AI and cultural criticism. A living repository with training, consulting and a blog, where AI is used as a critical tool.',
    },
  },

  {
    id: 'makilibre',
    name: 'MakiLibre',
    slug: 'makilibre',
    url: 'https://makilibre.com',
    image: '/projects/makilibre.webp',
    category: 'saas',
    status: 'hecho',
    sector: 'social',
    description: {
      es: 'Plataforma de apoyo integral para internos y sus familias: conecta, informa y prepara para la reinserción social, con espacios para familiares y para quienes quieren ayudar. Porque empezar de nuevo es más fácil cuando no estás solo.',
      en: 'Comprehensive support platform for inmates and their families: it connects, informs and prepares for social reintegration, with spaces for relatives and for people who want to help. Because starting over is easier when you are not alone.',
    },
  },

  // Ideas de apps que aún no están en el catálogo (en exploración).
  {
    id: 'resenas-plus',
    name: 'Reseñas+',
    slug: 'resenas-plus',
    url: '',
    category: 'comercio',
    status: 'idea',
    description: {
      es: 'Centraliza las reseñas de Google y redes en un único panel y responde más rápido con borradores sugeridos por IA. Más reputación local con menos esfuerzo.',
      en: 'Brings your Google and social reviews into one dashboard and helps you reply faster with AI-suggested drafts. More local reputation, less effort.',
    },
  },

  {
    id: 'carta-viva',
    name: 'Carta Viva',
    slug: 'carta-viva',
    url: '',
    category: 'hosteleria',
    status: 'idea',
    description: {
      es: 'Carta digital por QR con fotos, alérgenos y un recomendador con IA. Traducción automática para turistas y cambios de precios al instante.',
      en: 'QR digital menu with photos, allergens and an AI recommender. Automatic translation for tourists and instant price updates.',
    },
  },

  {
    id: 'presu-ia',
    name: 'Presu IA',
    slug: 'presu-ia',
    url: '',
    category: 'saas',
    status: 'idea',
    description: {
      es: 'Presupuestos profesionales en minutos para autónomos: la IA redacta los conceptos y sugiere precios a partir de una breve descripción.',
      en: 'Professional quotes in minutes for freelancers: AI drafts the line items and suggests prices from a short description.',
    },
  },

  {
    id: 'turno-claro',
    name: 'PlanTurnos',
    slug: 'turno-claro',
    url: 'https://planturnos.com',
    demo: 'https://planturnos.com/demo',
    image: '/projects/plan-turnos.webp',
    category: 'saas',
    status: 'hecho',
    sector: 'software',
    description: {
      es: 'SaaS multiempresa para organizar el trabajo de equipos. Genera cuadrantes de turnos automáticos para residencias y sectores a turnos, y gestiona reparto de docencia y control de horas para academias. Cada cliente con su propio subdominio.',
      en: 'Multi-company SaaS to organize team work. It builds automatic shift rotas for care homes and shift-based sectors, and manages teaching allocation and hours tracking for language academies. Each client gets its own subdomain.',
    },
  },

  {
    id: 'voz-cliente',
    name: 'VozCliente',
    slug: 'voz-cliente',
    url: '',
    category: 'saas',
    status: 'idea',
    description: {
      es: 'Encuestas de satisfacción por WhatsApp tras cada servicio y un panel que resume las opiniones con IA para detectar qué mejorar.',
      en: 'Post-service satisfaction surveys via WhatsApp and a dashboard that summarises feedback with AI to spot what to improve.',
    },
  },

  {
    id: 'raices',
    name: 'Raíces',
    slug: 'raices',
    url: '',
    category: 'personal',
    status: 'idea',
    description: {
      es: 'Crea la biografía o el libro de recuerdos de tu familia conversando con una IA que entrevista, ordena las historias y las maqueta.',
      en: "Create your family's biography or memory book by talking to an AI that interviews, organises the stories and lays them out.",
    },
  },

  {
    id: 'anfitrion-ia',
    name: 'Anfitrión IA',
    slug: 'anfitrion-ia',
    url: '',
    category: 'otros',
    status: 'idea',
    description: {
      es: 'Guía digital para alojamientos turísticos: normas de la casa, recomendaciones del barrio y un chat con IA que responde a los huéspedes 24/7.',
      en: 'Digital guide for holiday rentals: house rules, neighbourhood tips and an AI chat that answers guests 24/7.',
    },
  },

  {
    id: 'mercado-local',
    name: 'MercadoLocal',
    slug: 'mercado-local',
    url: '',
    category: 'comercio',
    status: 'idea',
    description: {
      es: 'Tienda online compartida para el comercio de un barrio o pueblo, con catálogo común, recogida en tienda y reparto local.',
      en: "Shared online shop for a neighbourhood's local stores, with a common catalogue, in-store pickup and local delivery.",
    },
  },

  {
    id: 'cuida-mayores',
    name: 'CuidaMayores',
    slug: 'cuida-mayores',
    url: '',
    category: 'salud',
    status: 'idea',
    description: {
      es: 'Coordina en familia el cuidado de un mayor: medicación, citas médicas y turnos, con recordatorios y un historial compartido.',
      en: 'Coordinate eldercare as a family: medication, medical appointments and shifts, with reminders and a shared history.',
    },
  },

  {
    id: 'evento-facil',
    name: 'EventoFácil',
    slug: 'evento-facil',
    url: '',
    category: 'eventos',
    status: 'idea',
    description: {
      es: 'Web para tu evento con invitaciones, confirmaciones de asistencia (RSVP), información práctica y galería de fotos compartida.',
      en: 'A website for your event with invitations, RSVPs, practical info and a shared photo gallery.',
    },
  },

  // ============================================
  // 25 PROYECTOS EN DESARROLLO / PLANEADOS
  // ============================================

  // SALUD
  {
    id: 'psicologia-clinica',
    name: 'Consultorio de Psicología',
    slug: 'psicologia-clinica',
    url: 'https://psicologia-clinica.por2duros.com',
    category: 'salud',
    status: 'planeado',
    sector: 'salud',
    description: {
      es: 'Plataforma para consultorios de psicología. Gestión de citas, historial de sesiones, notas terapéuticas y seguimiento del paciente.',
      en: 'Platform for psychology clinics. Appointment management, session history, therapy notes and patient follow-up.',
    },
  },

  {
    id: 'veterinaria',
    name: 'Clínica Veterinaria',
    slug: 'veterinaria',
    url: 'https://veterinaria.por2duros.com',
    category: 'salud',
    status: 'planeado',
    sector: 'salud',
    description: {
      es: 'Clínica veterinaria online. Reservas de consultas, historial de mascotas, recetas digitales y recordatorios de vacunaciones.',
      en: 'Online veterinary clinic. Consultation booking, pet history, digital prescriptions and vaccination reminders.',
    },
  },

  // DERECHO
  {
    id: 'despacho-abogados',
    name: 'Despacho de Abogados',
    slug: 'despacho-abogados',
    url: 'https://despacho-abogados.por2duros.com',
    category: 'derecho',
    status: 'planeado',
    sector: 'derecho',
    description: {
      es: 'Portal jurídico para despacho de abogados. Consultas online, gestión de casos, documentación y comunicación cliente-abogado.',
      en: 'Legal portal for law firm. Online consultations, case management, documentation and client-lawyer communication.',
    },
  },

  {
    id: 'gestoria-fiscal',
    name: 'Gestoría',
    slug: 'gestoria-fiscal',
    url: 'https://gestoria-fiscal.por2duros.com',
    category: 'derecho',
    status: 'planeado',
    sector: 'derecho',
    description: {
      es: 'Plataforma de gestoría fiscal. Gestión de impuestos, nóminas, contabilidad y asesoramiento empresarial.',
      en: 'Tax advisory platform. Tax management, payroll, accounting and business consulting.',
    },
  },

  // INMOBILIARIA
  {
    id: 'inmobiliaria',
    name: 'Inmobiliaria',
    slug: 'inmobiliaria',
    url: 'https://inmobiliaria.por2duros.com',
    category: 'inmobiliaria',
    status: 'planeado',
    sector: 'inmobiliaria',
    description: {
      es: 'Portal inmobiliario. Listado de propiedades, búsqueda avanzada, visitas virtuales 3D, financiamiento y documentación.',
      en: 'Real estate portal. Property listings, advanced search, 3D virtual tours, financing and documentation.',
    },
  },

  {
    id: 'construccion-reformas',
    name: 'Empresa de Reformas',
    slug: 'construccion-reformas',
    url: 'https://construccion-reformas.por2duros.com',
    category: 'inmobiliaria',
    status: 'planeado',
    sector: 'construccion',
    description: {
      es: 'Plataforma para empresa de construcción y reformas. Presupuestos interactivos, galerías de proyectos, contacto y seguimiento de obras.',
      en: 'Platform for construction and renovation company. Interactive quotes, project galleries, contact and work tracking.',
    },
  },

  {
    id: 'casa-rural',
    name: 'Casa Rural',
    slug: 'casa-rural',
    url: 'https://casa-rural.por2duros.com',
    category: 'inmobiliaria',
    status: 'planeado',
    sector: 'turismo',
    description: {
      es: 'Plataforma de alquiler de casas rurales. Reservas online, calendario de disponibilidad, galerías, reseñas y pagos seguros.',
      en: 'Rural house rental platform. Online booking, availability calendar, galleries, reviews and secure payments.',
    },
  },

  // HOSTELERÍA
  {
    id: 'restaurante',
    name: 'Restaurante',
    slug: 'restaurante',
    url: 'https://restaurante.por2duros.com',
    category: 'hosteleria',
    status: 'planeado',
    sector: 'hosteleria',
    description: {
      es: 'Plataforma para restaurante. Menú online, reservas, pedidos para llevar, integración con servicios de delivery.',
      en: 'Restaurant platform. Online menu, reservations, takeout orders, delivery service integration.',
    },
  },

  {
    id: 'pasteleria',
    name: 'Pastelería',
    slug: 'pasteleria',
    url: 'https://pasteleria.por2duros.com',
    category: 'hosteleria',
    status: 'planeado',
    sector: 'hosteleria',
    description: {
      es: 'Pastelería online. Catálogo de productos, pedidos personalizados, encargos especiales para eventos, y entregas programadas.',
      en: 'Online bakery. Product catalog, custom orders, special event cakes and scheduled deliveries.',
    },
  },

  {
    id: 'aceite-oliva',
    name: 'Productor de Aceite de Oliva',
    slug: 'aceite-oliva',
    url: 'https://aceite-oliva.por2duros.com',
    category: 'hosteleria',
    status: 'planeado',
    sector: 'agroalimentario',
    description: {
      es: 'E-commerce para productor de aceite de oliva. Tienda online, información de origen, degustaciones, suscripciones y distribución.',
      en: 'E-commerce for olive oil producer. Online store, origin information, tastings, subscriptions and distribution.',
    },
  },

  {
    id: 'fruteria',
    name: 'Frutería',
    slug: 'fruteria',
    url: 'https://fruteria.por2duros.com',
    category: 'hosteleria',
    status: 'planeado',
    sector: 'agroalimentario',
    description: {
      es: 'Frutería online. Productos frescos, entregas a domicilio, suscripciones semanales, y cestas personalizadas.',
      en: 'Online greengrocer. Fresh produce, home delivery, weekly subscriptions and custom baskets.',
    },
  },

  // COMERCIO
  {
    id: 'ceramica-artesania',
    name: 'Cerámica y Artesanía',
    slug: 'ceramica-artesania',
    url: 'https://ceramica-artesania.por2duros.com',
    category: 'comercio',
    status: 'planeado',
    sector: 'artesania',
    description: {
      es: 'Tienda de cerámica artesanal. Productos únicos, proceso creativo documentado, talleres, y encargos personalizados.',
      en: 'Handmade pottery store. Unique products, creative process documentation, workshops and custom orders.',
    },
  },

  {
    id: 'libreria',
    name: 'Librería',
    slug: 'libreria',
    url: 'https://libreria.por2duros.com',
    category: 'comercio',
    status: 'planeado',
    sector: 'comercio',
    description: {
      es: 'Librería online. Catálogo de libros, búsqueda avanzada, recomendaciones, club de lectura y eventos literarios.',
      en: 'Online bookstore. Book catalog, advanced search, recommendations, book club and literary events.',
    },
  },

  {
    id: 'marketplace-artesanos',
    name: 'Marketplace de Artesanos',
    slug: 'marketplace-artesanos',
    url: 'https://marketplace-artesanos.por2duros.com',
    category: 'comercio',
    status: 'planeado',
    sector: 'comercio',
    description: {
      es: 'Mercado digital de artesanos. Tiendas individuales, productos únicos, pagos seguros, y comisiones transparentes.',
      en: 'Digital artisan marketplace. Individual shops, unique products, secure payments and transparent commissions.',
    },
  },

  // DEPORTE
  {
    id: 'gimnasio-fitness',
    name: 'Gimnasio',
    slug: 'gimnasio-fitness',
    url: 'https://gimnasio-fitness.por2duros.com',
    category: 'deporte',
    status: 'planeado',
    sector: 'deporte',
    description: {
      es: 'Plataforma de gimnasio. Membresías, clases online, entrenamiento personalizado, nutrición y seguimiento de progreso.',
      en: 'Gym platform. Memberships, online classes, personal training, nutrition and progress tracking.',
    },
  },

  {
    id: 'entrenador-personal',
    name: 'Entrenador Personal',
    slug: 'entrenador-personal',
    url: 'https://entrenador-personal.por2duros.com',
    category: 'deporte',
    status: 'planeado',
    sector: 'deporte',
    description: {
      es: 'Plataforma de entrenador personal. Planes de entrenamiento, videos, seguimiento, nutrición y chat en vivo.',
      en: 'Personal trainer platform. Training plans, videos, tracking, nutrition and live chat.',
    },
  },

  {
    id: 'barberia',
    name: 'Filo Barber Studio',
    slug: 'barberia',
    url: 'https://barberia.espanias.com',
    image: '/projects/barberia.webp',
    category: 'belleza',
    status: 'hecho',
    sector: 'servicios-personales',
    description: {
      es: 'Barbería y estética masculina con reserva de cita por la web y un agente de WhatsApp que conversa y agenda solo. Anti-solapamiento garantizado en base de datos y panel de gestión móvil.',
      en: 'Barbershop and men’s grooming with online web booking and a WhatsApp AI agent that chats and books appointments on its own. Database-level double-booking prevention and a mobile management panel.',
    },
  },

  {
    id: 'bar-de-eric',
    name: 'El Bar de Eric',
    slug: 'bar-de-eric',
    url: 'https://bardeeric.espanias.com',
    image: '/projects/bar-de-eric.webp',
    category: 'hosteleria',
    status: 'hecho',
    sector: 'hosteleria',
    description: {
      es: 'Bar-museo de rock con tienda online, reservas y panel de gestión. Carrito persistente, pago con Stripe, autenticación por magic link y catálogo de productos.',
      en: 'Rock bar-museum with online shop, bookings and admin panel. Persistent cart, Stripe checkout, magic-link authentication and a product catalogue.',
    },
  },

  // EVENTOS
  {
    id: 'venta-entradas',
    name: 'Venta de Entradas',
    slug: 'venta-entradas',
    url: 'https://venta-entradas.por2duros.com',
    category: 'eventos',
    status: 'planeado',
    sector: 'eventos',
    description: {
      es: 'Plataforma de venta de entradas. Eventos, conciertos, teatro, control de aforo, asientos dinámicos y reportes.',
      en: 'Ticket sales platform. Events, concerts, theater, capacity control, dynamic seating and reports.',
    },
  },

  {
    id: 'fotografo',
    name: 'Fotógrafo',
    slug: 'fotografo',
    url: 'https://fotografo.por2duros.com',
    category: 'eventos',
    status: 'planeado',
    sector: 'eventos',
    description: {
      es: 'Portafolio y tienda de fotógrafo. Galería, paquetes de sesión, pedidos de impresión, galerías privadas para clientes.',
      en: 'Photographer portfolio and shop. Gallery, session packages, print orders, private galleries for clients.',
    },
  },

  {
    id: 'wedding-planner',
    name: 'Wedding Planner',
    slug: 'wedding-planner',
    url: 'https://wedding-planner.por2duros.com',
    category: 'eventos',
    status: 'planeado',
    sector: 'eventos',
    description: {
      es: 'Plataforma de planificación de bodas. Presupuesto, lista de invitados, proveedores, timeline y colaboración en tiempo real.',
      en: 'Wedding planning platform. Budget, guest list, vendors, timeline and real-time collaboration.',
    },
  },

  {
    id: 'academia-musica',
    name: 'Academia de Música',
    slug: 'academia-musica',
    url: 'https://academia-musica.por2duros.com',
    category: 'eventos',
    status: 'planeado',
    sector: 'educacion',
    description: {
      es: 'Academia de música online. Clases en vivo, lecciones grabadas, teoría musical, instrumentos y seguimiento del alumno.',
      en: 'Online music academy. Live lessons, recorded lessons, music theory, instruments and student progress tracking.',
    },
  },

  // SaaS
  {
    id: 'facturador',
    name: 'Facturador / ERP',
    slug: 'facturador',
    url: 'https://facturador.por2duros.com',
    category: 'saas',
    status: 'planeado',
    sector: 'saas',
    description: {
      es: 'Software de facturación y ERP. Gestión de facturas, inventario, clientes, reportes y integración fiscal.',
      en: 'Invoicing and ERP software. Invoice management, inventory, customers, reports and tax integration.',
    },
  },

  {
    id: 'asociacion-donaciones',
    name: 'Gestión de Asociación / Donaciones',
    slug: 'asociacion-donaciones',
    url: 'https://asociacion-donaciones.por2duros.com',
    category: 'saas',
    status: 'planeado',
    sector: 'saas',
    description: {
      es: 'Plataforma de gestión para asociaciones. Membresía, donaciones recurrentes, eventos, comunicación y reportes.',
      en: 'Association management platform. Membership, recurring donations, events, communication and reporting.',
    },
  },
]

export function getProjectsByCategory(category: Category): Project[] {
  return projects.filter((project) => project.category === category)
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

export function getProjectsByStatus(status: Project['status']): Project[] {
  return projects.filter((project) => project.status === status)
}

export function getStats() {
  return {
    total: projects.length,
    completed: projects.filter((p) => p.status === 'hecho').length,
    inDevelopment: projects.filter((p) => p.status === 'desarrollo').length,
    planned: projects.filter((p) => p.status === 'planeado').length,
    ideas: projects.filter((p) => p.status === 'idea').length,
  }
}
