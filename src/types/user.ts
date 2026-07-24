import type { Prisma } from '@prisma/client'

/** Prisma select for public profile data (no passwordHash). */
export const userProfileSelect = {
  id: true,
  username: true,
  email: true,
  avatarUrl: true,
  bio: true,
} as const satisfies Prisma.UserSelect

/** Prisma include for the developer profile page (game count). */
export const userWithGamesInclude = {
  _count: { select: { games: true } },
} as const satisfies Prisma.UserInclude

/** Inferred public user type (without passwordHash). */
export type User = Prisma.UserGetPayload<{ select: typeof userProfileSelect }>
