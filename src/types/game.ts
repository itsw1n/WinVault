import type { Prisma } from '@prisma/client'

/** Prisma include for listing views (owner name/avatar + favorite count). */
export const gameInclude = {
  owner: { select: { username: true, avatarUrl: true } },
  _count: { select: { favorites: true } },
} as const satisfies Prisma.GameInclude

/** Prisma include for the game detail page (adds owner bio). */
export const gameDetailInclude = {
  owner: { select: { username: true, avatarUrl: true, bio: true } },
  _count: { select: { favorites: true } },
} as const satisfies Prisma.GameInclude

/** Prisma include for fetching a favorited game with its full game data. */
export const favoriteWithGameInclude = {
  game: {
    include: gameInclude,
  },
} as const satisfies Prisma.FavoriteInclude

/** Inferred game type for listing views. */
export type Game = Prisma.GameGetPayload<{ include: typeof gameInclude }>

/** Inferred favorite-with-game type for the favorites page. */
export type FavoriteGame = Prisma.FavoriteGetPayload<{
  include: typeof favoriteWithGameInclude
}>
