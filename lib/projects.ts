export type Category = 'ia' | 'educacion' | 'literatura' | 'personal' | 'otros'

export interface Project {
  id: string
  name: string
  url: string
  description: { es: string; en: string }
  category: Category
}

export const categoryColors: Record<Category, string> = {
  ia: '#6D28D9',
  educacion: '#0369A1',
  literatura: '#B45309',
  personal: '#065F46',
  otros: '#78716C',
}

export const projects: Project[] = [
  {
    id: 'costacompanion',
    name: 'Costa Companion',
    url: 'https://www.costacompanion.com',
    description: {
      es: 'Compañero inteligente para explorar la costa.',
      en: 'Smart companion for exploring the coast.',
    },
    category: 'ia',
  },
  // IA & Tech
  {
    id: 'makicar',
    name: 'Makicar',
    url: 'https://makicar.app',
    description: {
      es: 'PWA de reservas de transporte puerta a puerta en rutas del sur de España.',
      en: 'PWA for door-to-door passenger transport reservations along routes in southern Spain.',
    },
    category: 'ia',
  },
  {
    id: 'versovivo',
    name: 'Verso Vivo',
    url: 'https://www.versovivo.ai',
    description: {
      es: 'App móvil multiplataforma que presenta poesía en texto, vídeo y acompañamiento musical con IA.',
      en: 'Cross-platform mobile app presenting poetry through text, video, and AI-generated musical accompaniment.',
    },
    category: 'ia',
  },
  {
    id: 'cognoscencia',
    name: 'Cognoscencia',
    url: 'https://www.cognoscencia.com',
    description: {
      es: 'Plataforma de conocimiento y aprendizaje.',
      en: 'Knowledge and learning platform.',
    },
    category: 'ia',
  },
  {
    id: 'pio8',
    name: 'Pio8',
    url: 'https://pio8.cognoscencia.com',
    description: {
      es: 'Proyecto de cognoscencia aplicada.',
      en: 'Applied cognoscence project.',
    },
    category: 'ia',
  },
  {
    id: 'claude-clase',
    name: 'Claude en Clase',
    url: 'https://claude.laclasedigital.com',
    description: {
      es: 'Plataforma de formación docente de 20 horas sobre el uso de Claude en ELE.',
      en: '20-hour teacher training platform on using Claude in Spanish language teaching.',
    },
    category: 'ia',
  },
  // Educación
  {
    id: 'laclasedigital',
    name: 'La Clase Digital',
    url: 'https://laclasedigital.com',
    description: {
      es: 'Plataforma de educación digital innovadora.',
      en: 'Innovative digital education platform.',
    },
    category: 'educacion',
  },
  {
    id: 'clasesporzoom',
    name: 'Clases por Zoom',
    url: 'https://clasesporzoom.com',
    description: {
      es: 'Clases online personalizadas en directo.',
      en: 'Personalized live online classes.',
    },
    category: 'educacion',
  },
  {
    id: 'auditoria',
    name: 'Auditoría Digital',
    url: 'https://auditoria.laclasedigital.com',
    description: {
      es: 'Herramienta de auditoría para la educación digital.',
      en: 'Audit tool for digital education.',
    },
    category: 'educacion',
  },
  {
    id: 'lawikiclase',
    name: 'La Wiki Clase',
    url: 'https://lawikiclase.com',
    description: {
      es: 'Wiki colaborativa para el aula.',
      en: 'Collaborative wiki for the classroom.',
    },
    category: 'educacion',
  },
  {
    id: 'intensivo2',
    name: 'Intensivo 2',
    url: 'https://elcorreveidile.github.io/intensivo2/',
    description: {
      es: 'LMS para el curso intensivo de español del Centro de Lenguas Modernas de Granada.',
      en: 'LMS platform for the intensive Spanish course at Granada\'s Modern Languages Center.',
    },
    category: 'educacion',
  },
  {
    id: 'iaz',
    name: 'IAZ',
    url: 'https://elcorreveidile.github.io/IAZ/',
    description: {
      es: 'Repositorio de ponencia-taller de 60 minutos para docentes de lenguas en Granada.',
      en: 'Repository for a 60-minute workshop-talk for language educators at Granada\'s university.',
    },
    category: 'educacion',
  },
  {
    id: 'curso-intensivo',
    name: 'Curso Intensivo',
    url: 'https://elcorreveidile.github.io/Curso-Intensivo-Espanol/',
    description: {
      es: 'Plataforma web para curso intensivo de español dirigido a estudiantes americanos y asiáticos.',
      en: 'Web platform for an intensive Spanish course aimed at American and Asian students.',
    },
    category: 'educacion',
  },
  {
    id: 'apo',
    name: 'APO',
    url: 'https://elcorreveidile.github.io/APO/',
    description: {
      es: 'Aplicación móvil para practicar conversación en español mediante ejercicios de grabación.',
      en: 'Mobile-first web app for practicing Spanish conversation through interactive recording exercises.',
    },
    category: 'educacion',
  },
  {
    id: 'produccion-oral',
    name: 'Producción Oral',
    url: 'https://elcorreveidile.github.io/Produccion-Oral/',
    description: {
      es: 'Plataforma web y app para cursos de producción oral en español para estudiantes internacionales.',
      en: 'Web and app platform offering Spanish oral production courses for international students.',
    },
    category: 'educacion',
  },
  // Literatura
  {
    id: 'poedronomo',
    name: 'Poedronomo',
    url: 'https://www.poedronomo.com',
    description: {
      es: 'Plataforma de poesía y tecnología donde los poemas compiten en votaciones en tiempo real.',
      en: 'Poetry and technology platform where poems compete in real-time audience voting.',
    },
    category: 'literatura',
  },
  {
    id: 'diariodeuninstante',
    name: 'Diario de un Instante',
    url: 'https://www.diariodeuninstante.com',
    description: {
      es: 'Reflexiones y momentos del día a día.',
      en: 'Reflections and moments from daily life.',
    },
    category: 'literatura',
  },
  {
    id: 'literatura',
    name: 'Literatura',
    url: 'https://elcorreveidile.github.io/Literatura/',
    description: {
      es: 'Sitio estático para enseñar literatura española hasta el siglo XVIII a no nativos.',
      en: 'Static website teaching Spanish literature up to the 18th century to non-native learners.',
    },
    category: 'literatura',
  },
  {
    id: 'broncano',
    name: 'Broncano',
    url: 'https://elcorreveidile.github.io/Broncano/',
    description: {
      es: 'App web interactiva inspirada en La Revuelta para registrar dinero y actividad mensual.',
      en: 'Interactive web app inspired by La Revuelta to humorously track wealth and monthly activity.',
    },
    category: 'literatura',
  },
  // Personal
  {
    id: 'jblainez',
    name: 'Javier Blainez',
    url: 'https://jblainez.es',
    description: {
      es: 'Web profesional y de presentación.',
      en: 'Professional and presentation website.',
    },
    category: 'personal',
  },
  {
    id: 'javier-soy',
    name: 'Javier.soy',
    url: 'https://www.javier.soy',
    description: {
      es: 'Identidad digital personal.',
      en: 'Personal digital identity.',
    },
    category: 'personal',
  },
  {
    id: 'portafolio-2025',
    name: 'Portafolio 2025',
    url: 'https://elcorreveidile.github.io/portafolio-2025/',
    description: {
      es: 'Web profesional que muestra innovación educativa, obras literarias y actividad académica.',
      en: 'Professional website showcasing educational innovation, literary works, and academic activity.',
    },
    category: 'personal',
  },
  {
    id: 'blog-personal',
    name: 'Blog Personal',
    url: 'https://jblainez.wordpress.com',
    description: {
      es: 'Artículos y reflexiones personales.',
      en: 'Personal articles and reflections.',
    },
    category: 'personal',
  },
  {
    id: 'borjasatrustegui',
    name: 'Borja Satrustegui',
    url: 'https://www.borjasatrustegui.online',
    description: {
      es: 'Web personal y profesional de Borja Satrustegui.',
      en: 'Personal and professional website of Borja Satrustegui.',
    },
    category: 'personal',
  },
  {
    id: 'privado',
    name: 'Privado',
    url: 'https://elcorreveidile.github.io/Privado/',
    description: {
      es: 'Documentación restringida sobre acoso institucional con evidencias médicas y testimonios.',
      en: 'Restricted documentation on institutional harassment with medical evidence and testimonies.',
    },
    category: 'personal',
  },
  // Otros
  {
    id: 'por2duros',
    name: 'Por2Duros',
    url: 'https://www.por2duros.com',
    description: {
      es: 'Contenido y valor sin gastar una fortuna.',
      en: 'Content and value without breaking the bank.',
    },
    category: 'otros',
  },
  {
    id: 'detapas',
    name: 'De Tapas por Granada',
    url: 'https://detapasporgranada.wordpress.com',
    description: {
      es: 'Gastronomía y cultura granadina.',
      en: 'Gastronomy and culture of Granada.',
    },
    category: 'otros',
  },
  {
    id: 'comite-clm',
    name: 'Comité CLM',
    description: {
      es: 'Web del comité de empresa del Centro de Lenguas Modernas de la Universidad de Granada.',
      en: 'Workers\' committee website for the Modern Languages Centre at the University of Granada.',
    },
    category: 'otros',
  },
  {
    id: 'mm',
    name: 'Mariano Maresca',
    description: {
      es: 'Exposición digital conmemorativa del editor y figura cultural andaluza Mariano Maresca (1945–2023).',
      en: 'Digital commemorative exhibition honouring Andalusian cultural editor Mariano Maresca (1945–2023).',
    },
    category: 'literatura',
  },
]
