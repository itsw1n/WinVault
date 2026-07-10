import { z } from "zod"

const isProduction = process.env.NODE_ENV === "production"

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  DIRECT_URL: z.string().min(1, "DIRECT_URL is required"),
  AUTH_SECRET: z.string().min(1, "AUTH_SECRET is required"),
  NEXT_PUBLIC_APP_URL: z.string().min(1).optional(),
  GOOGLE_SAFE_BROWSING_API_KEY: z.string().optional(),
  STORAGE_ENDPOINT: isProduction ? z.string().min(1) : z.string().optional(),
  STORAGE_ACCESS_KEY: isProduction ? z.string().min(1) : z.string().optional(),
  STORAGE_SECRET_KEY: isProduction ? z.string().min(1) : z.string().optional(),
  STORAGE_BUCKET: isProduction ? z.string().min(1) : z.string().optional(),
  STORAGE_PUBLIC_URL: isProduction ? z.string().min(1) : z.string().optional(),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  throw new Error(
    "Invalid environment variables: " +
      JSON.stringify(parsed.error.flatten().fieldErrors)
  )
}

export const env = parsed.data
