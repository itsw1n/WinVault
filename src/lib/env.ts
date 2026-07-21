import { z } from 'zod'

const isProduction = process.env.NODE_ENV === 'production'

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  DIRECT_URL: z.string().min(1, 'DIRECT_URL is required'),
  AUTH_SECRET: z.string().min(1, 'AUTH_SECRET is required'),
  GOOGLE_SAFE_BROWSING_API_KEY: z.string().optional(),
  STORAGE_ENDPOINT: isProduction ? z.string().min(1) : z.string().optional(),
  STORAGE_ACCESS_KEY: isProduction ? z.string().min(1) : z.string().optional(),
  STORAGE_SECRET_KEY: isProduction ? z.string().min(1) : z.string().optional(),
  STORAGE_BUCKET: isProduction ? z.string().min(1) : z.string().optional(),
  STORAGE_PUBLIC_URL: isProduction ? z.string().min(1) : z.string().optional(),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  const fields = parsed.error.flatten().fieldErrors
  console.error('Invalid environment variables:\n', fields)
  if (process.env.NODE_ENV === 'production') {
    process.exit(1)
  }
  throw new Error(
    `Invalid environment variables — fix .env or .env.development\n${JSON.stringify(fields, null, 2)}`
  )
}

export const env = parsed.data
