import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"
import { env } from "@/lib/env"

function createClient(): S3Client | null {
  if (!env.STORAGE_ENDPOINT || !env.STORAGE_ACCESS_KEY || !env.STORAGE_SECRET_KEY) return null

  return new S3Client({
    endpoint: env.STORAGE_ENDPOINT,
    region: "us-east-1",
    credentials: {
      accessKeyId: env.STORAGE_ACCESS_KEY,
      secretAccessKey: env.STORAGE_SECRET_KEY,
    },
    forcePathStyle: true,
  })
}

const client = createClient()

export async function uploadThumbnail(
  buffer: Buffer,
  mimeType: string,
  fileName: string
): Promise<string | null> {
  if (!client) return null

  await client.send(
    new PutObjectCommand({
      Bucket: env.STORAGE_BUCKET,
      Key: fileName,
      Body: buffer,
      ContentType: mimeType,
    })
  )

  return `${env.STORAGE_PUBLIC_URL}/${fileName}`
}

export async function deleteThumbnail(url: string) {
  if (!client || !env.STORAGE_PUBLIC_URL) return

  const prefix = env.STORAGE_PUBLIC_URL.endsWith("/")
    ? env.STORAGE_PUBLIC_URL
    : env.STORAGE_PUBLIC_URL + "/"

  if (!url.startsWith(prefix)) return

  const key = url.slice(prefix.length)
  if (!key) return

  await client.send(
    new DeleteObjectCommand({
      Bucket: env.STORAGE_BUCKET,
      Key: key,
    })
  )
}
