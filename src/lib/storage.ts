import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
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
