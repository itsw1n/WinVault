import { prisma } from '@/lib/prisma'

/** Check if an action is within rate limits. Returns true if allowed, false if rate-limited. */
export async function rateLimit(key: string, limit: number, windowMs: number): Promise<boolean> {
  const now = new Date()
  const resetAt = new Date(now.getTime() + windowMs)

  const record = await prisma.rateLimit.findUnique({ where: { key } })

  if (!record || record.resetAt < now) {
    await prisma.rateLimit.upsert({
      where: { key },
      update: { count: 1, resetAt },
      create: { key, count: 1, resetAt },
    })
    return true
  }

  if (record.count >= limit) return false

  await prisma.rateLimit.update({
    where: { key },
    data: { count: { increment: 1 } },
  })

  return true
}
