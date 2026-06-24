'use client'

import { useRef, useState } from 'react'

const field =
  'w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-[#1C1917] focus:border-[#BF2638] focus:outline-none'

// Campo de imagen: permite pegar una URL o subir un archivo (Vercel Blob).
export default function ImageField({
  name,
  defaultValue = '',
}: {
  name: string
  defaultValue?: string
}) {
  const [url, setUrl] = useState(defaultValue)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setBusy(true)
    setError('')
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok || !data.url) throw new Error(data.error || 'Error al subir')
      setUrl(data.url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al subir')
    } finally {
      setBusy(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  return (
    <div>
      <input
        type="text"
        name={name}
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://… o sube una imagen"
        className={field}
      />
      <div className="mt-2 flex items-center gap-3">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={busy}
          className="rounded-lg border border-stone-300 px-3 py-1.5 text-sm font-medium text-[#1C1917] transition-colors hover:bg-stone-50 disabled:opacity-60"
        >
          {busy ? 'Subiendo…' : '⬆ Subir imagen'}
        </button>
        {url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={url} alt="" className="h-10 w-16 rounded object-cover" />
        )}
      </div>
      {error && <p className="mt-1 text-xs text-[#BF2638]">{error}</p>}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFile}
      />
    </div>
  )
}
