import type { Prisma } from '@prisma/client'

export const userProfileSelect = {
  id: true,
  username: true,
  email: true,
  avatarUrl: true,
  bio: true,
} as const satisfies Prisma.UserSelect

export const userWithGamesInclude = {
  _count: { select: { games: true } },
} as const satisfies Prisma.UserInclude

export type User = Prisma.UserGetPayload<{ select: typeof userProfileSelect }>
