import type { Prisma } from '@prisma/client'

export const gameInclude = {
  owner: { select: { username: true, avatarUrl: true } },
  _count: { select: { favorites: true } },
} as const satisfies Prisma.GameInclude

export const gameDetailInclude = {
  owner: { select: { username: true, avatarUrl: true, bio: true } },
  _count: { select: { favorites: true } },
} as const satisfies Prisma.GameInclude

export const favoriteWithGameInclude = {
  game: {
    include: gameInclude,
  },
} as const satisfies Prisma.FavoriteInclude

export type Game = Prisma.GameGetPayload<{ include: typeof gameInclude }>

export type FavoriteGame = Prisma.FavoriteGetPayload<{
  include: typeof favoriteWithGameInclude
}>
