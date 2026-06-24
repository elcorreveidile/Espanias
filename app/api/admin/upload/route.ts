import { put } from '@vercel/blob'
import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth/current-user'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Sube una imagen a Vercel Blob y devuelve su URL pública. Solo admin.
export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session || session.rol !== 'admin') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: 'Almacenamiento no configurado (falta activar Blob en Vercel).' },
      { status: 500 }
    )
  }

  let file: FormDataEntryValue | null
  try {
    const form = await req.formData()
    file = form.get('file')
  } catch {
    return NextResponse.json({ error: 'Petición no válida' }, { status: 400 })
  }

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Falta el archivo' }, { status: 400 })
  }
  if (!file.type.startsWith('image/')) {
    return NextResponse.json({ error: 'El archivo debe ser una imagen' }, { status: 400 })
  }
  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ error: 'La imagen supera el máximo de 8 MB' }, { status: 400 })
  }

  try {
    const blob = await put(file.name || 'imagen', file, {
      access: 'public',
      addRandomSuffix: true,
    })
    return NextResponse.json({ url: blob.url })
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Error al subir la imagen' },
      { status: 500 }
    )
  }
}
