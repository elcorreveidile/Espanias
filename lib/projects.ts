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
      es: 'App de movilidad con inteligencia artificial.',
      en: 'AI-powered mobility app.',
    },
    category: 'ia',
  },
  {
    id: 'versovivo',
    name: 'Verso Vivo',
    url: 'https://www.versovivo.ai',
    description: {
      es: 'Poesía viva con inteligencia artificial.',
      en: 'Living poetry powered by artificial intelligence.',
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
      es: 'Integrando Claude IA en el aula.',
      en: 'Integrating Claude AI in the classroom.',
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
      es: 'Curso intensivo de español, segunda edición.',
      en: 'Intensive Spanish course, second edition.',
    },
    category: 'educacion',
  },
  {
    id: 'iaz',
    name: 'IAZ',
    url: 'https://elcorreveidile.github.io/IAZ/',
    description: {
      es: 'Inteligencia artificial y aprendizaje de idiomas.',
      en: 'Artificial intelligence and language learning.',
    },
    category: 'educacion',
  },
  {
    id: 'curso-intensivo',
    name: 'Curso Intensivo',
    url: 'https://elcorreveidile.github.io/Curso-Intensivo-Espanol/',
    description: {
      es: 'Curso intensivo de español para extranjeros.',
      en: 'Intensive Spanish course for foreigners.',
    },
    category: 'educacion',
  },
  {
    id: 'apo',
    name: 'APO',
    url: 'https://elcorreveidile.github.io/APO/',
    description: {
      es: 'Aprendizaje por objetivos.',
      en: 'Objective-based learning.',
    },
    category: 'educacion',
  },
  {
    id: 'produccion-oral',
    name: 'Producción Oral',
    url: 'https://elcorreveidile.github.io/Produccion-Oral/',
    description: {
      es: 'Técnicas y recursos de comunicación oral.',
      en: 'Oral communication techniques and resources.',
    },
    category: 'educacion',
  },
  // Literatura
  {
    id: 'poedronomo',
    name: 'Poedronomo',
    url: 'https://www.poedronomo.com',
    description: {
      es: 'Poesía y arte de la palabra.',
      en: 'Poetry and the art of words.',
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
      es: 'Proyecto literario colaborativo.',
      en: 'Collaborative literary project.',
    },
    category: 'literatura',
  },
  {
    id: 'broncano',
    name: 'Broncano',
    url: 'https://elcorreveidile.github.io/Broncano/',
    description: {
      es: 'Proyecto de análisis y homenaje a David Broncano.',
      en: 'Analysis and tribute project for David Broncano.',
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
      es: 'Colección de trabajos y proyectos de 2025.',
      en: 'Collection of works and projects from 2025.',
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
      es: 'Contenido exclusivo y de acceso restringido.',
      en: 'Exclusive and restricted access content.',
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
]
