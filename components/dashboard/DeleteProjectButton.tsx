'use client'

export default function DeleteProjectButton({
  action,
  nombre,
}: {
  action: () => Promise<void>
  nombre: string
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (
          !confirm(
            `¿Eliminar "${nombre}"? Esta acción no se puede deshacer y borra la ficha del catálogo.`
          )
        ) {
          e.preventDefault()
        }
      }}
      className="ml-auto"
    >
      <button
        type="submit"
        className="rounded-lg border border-red-200 px-5 py-2.5 font-semibold text-[#BF2638] transition-colors hover:bg-red-50"
      >
        Eliminar
      </button>
    </form>
  )
}
