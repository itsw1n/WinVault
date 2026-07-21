import sharp from 'sharp'
import { ActionError } from '@/lib/errors'

export async function processThumbnail(file: File): Promise<{
  buffer: Buffer
  mimeType: string
  fileName: string
}> {
  if (file.size > 5 * 1024 * 1024) {
    throw new ActionError('VALIDATION', 'Thumbnail must be under 5MB')
  }

  const buffer = Buffer.from(await file.arrayBuffer())

  const webp = await sharp(buffer)
    .resize(1280, 720, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer()

  return {
    buffer: webp,
    mimeType: 'image/webp',
    fileName: `${crypto.randomUUID()}.webp`,
  }
}
