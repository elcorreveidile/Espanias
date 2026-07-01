// Utilidades de escapado para insertar datos sin riesgo de inyección.

/** Escapa texto para incrustarlo de forma segura en HTML (atributos y cuerpo). */
export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/**
 * Serializa a JSON para incrustar dentro de <script>. Escapa `<` como `<`
 * para que un `</script>` en los datos no rompa la etiqueta (evita XSS).
 */
export function safeJsonLd(obj: unknown): string {
  return JSON.stringify(obj).replace(/</g, '\\u003c')
}
