// Datos legales del titular del sitio. Centralizados aquí para poder
// actualizarlos en un único lugar. Los valores marcados como PENDIENTE deben
// completarse con los datos reales del titular antes de considerarse válidos.
export const legalInfo = {
  marca: 'Espanias',
  sitio: 'www.espanias.com',
  // Titular / responsable del tratamiento
  titular: 'Javier Benítez',
  nif: '[NIF/CIF — PENDIENTE]',
  domicilio: '[Domicilio postal — PENDIENTE]',
  email: 'informa@blablaele.com',
  actividad:
    'Diseño y desarrollo de aplicaciones web, y formación y consultoría en inteligencia artificial.',
  // Proveedores (encargados del tratamiento)
  hosting: 'Vercel Inc. (340 S Lemon Ave #4133, Walnut, CA 91789, EE. UU.)',
  baseDatos: 'Neon Inc. (proveedor de base de datos PostgreSQL, EE. UU./UE)',
  emailProveedor: 'Resend (Plus Five Five, Inc., EE. UU.)',
  // Última actualización de los textos legales
  actualizado: '15 de junio de 2026',
} as const
