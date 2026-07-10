import sharp from "sharp"

export async function processThumbnail(file: File): Promise<{
  buffer: Buffer
  mimeType: string
  fileName: string
}> {
  const buffer = Buffer.from(await file.arrayBuffer())

  const webp = await sharp(buffer)
    .resize(1280, 720, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer()

  return {
    buffer: webp,
    mimeType: "image/webp",
    fileName: `${crypto.randomUUID()}.webp`,
  }
}
