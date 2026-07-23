import { prisma } from '@/lib/prisma'
import { ActionError } from '@/lib/errors'
import { gameInclude, gameDetailInclude } from '@/types'

/** Return up to 6 featured games. */
export async function getFeaturedGames() {
  return prisma.game.findMany({
    where: { isFeatured: true },
    include: gameInclude,
    orderBy: { createdAt: 'desc' },
    take: 6,
  })
}

/** Return up to 6 games with the most favorites in the last 7 days. */
export async function getTrendingGames() {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

  const topIds = await prisma.favorite.groupBy({
    by: ['gameId'],
    where: { createdAt: { gte: sevenDaysAgo } },
    _count: { id: true },
    orderBy: { _count: { id: 'desc' } },
    take: 6,
  })

  if (topIds.length === 0) return []

  const games = await prisma.game.findMany({
    where: { id: { in: topIds.map((g) => g.gameId) } },
    include: gameInclude,
  })

  const order = new Map(topIds.map((g, i) => [g.gameId, i]))
  return games.sort((a, b) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0))
}

/** Return up to 6 most recently created games. */
export async function getNewReleases() {
  return prisma.game.findMany({
    include: gameInclude,
    orderBy: { createdAt: 'desc' },
    take: 6,
  })
}

/** Search and filter games by query and genre. */
export async function getGames(params: { search?: string; genre?: string; take?: number }) {
  const where: Record<string, unknown> = {}

  if (params.search) {
    where.title = { contains: params.search, mode: 'insensitive' }
  }
  if (params.genre) {
    where.genre = params.genre
  }

  return prisma.game.findMany({
    where,
    include: gameInclude,
    orderBy: { createdAt: 'desc' },
    take: params.take ?? 50,
  })
}

/** Fetch a single game by ID. Throws NOT_FOUND if missing. */
export async function getGameById(id: string) {
  const game = await prisma.game.findUnique({
    where: { id },
    include: gameDetailInclude,
  })

  if (!game) throw new ActionError('NOT_FOUND', 'Game not found')
  return game
}

/** Fetch all games owned by a specific user. */
export async function getGamesByOwner(ownerId: string) {
  return prisma.game.findMany({
    where: { ownerId },
    include: gameInclude,
    orderBy: { createdAt: 'desc' },
  })
}

/** Count total favorites received across all games owned by a user. */
export async function getTotalFavoritesReceived(userId: string) {
  const result = await prisma.favorite.aggregate({
    _count: { id: true },
    where: {
      game: { ownerId: userId },
    },
  })
  return result._count.id
}

/** Count how many games a user has published. */
export async function getPublishedGameCount(ownerId: string) {
  return prisma.game.count({ where: { ownerId } })
}

/** Count how many games a user has favorited. */
export async function getFavoritedGameCount(userId: string) {
  return prisma.favorite.count({ where: { userId } })
}

/** Fetch all favorite records for a user with full game data. */
export async function getGamesFavoritedByUser(userId: string) {
  return prisma.favorite.findMany({
    where: { userId },
    include: {
      game: {
        include: gameInclude,
      },
    },
    orderBy: { createdAt: 'desc' },
  })
}

/** Count distinct users who have published at least one game. */
export async function getDeveloperCount() {
  return prisma.user.count({
    where: { games: { some: {} } },
  })
}

/** Return array of game IDs that a user has favorited. */
export async function getFavoritedGameIds(userId: string): Promise<string[]> {
  const favorites = await prisma.favorite.findMany({
    where: { userId },
    select: { gameId: true },
  })
  return favorites.map((f) => f.gameId)
}
