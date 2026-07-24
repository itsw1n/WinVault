import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  DIRECT_URL: z.string().min(1),
  AUTH_SECRET: z.string().min(1),
  GOOGLE_SAFE_BROWSING_API_KEY: z.string().optional(),
  STORAGE_ENDPOINT: z.string().optional(),
  STORAGE_ACCESS_KEY: z.string().optional(),
  STORAGE_SECRET_KEY: z.string().optional(),
  STORAGE_BUCKET: z.string().optional(),
  STORAGE_PUBLIC_URL: z.string().optional(),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  const errors = parsed.error.flatten().fieldErrors
  console.error('Missing or invalid environment variables:', JSON.stringify(errors, null, 2))
  process.exit(1)
}

type Env = z.infer<typeof envSchema>

/**
 * Validated environment variables.
 * Exits with a clear error listing missing vars if validation fails.
 */
export const env: Env = parsed.data
