import { prisma } from "@/lib/prisma"
import { ActionError } from "@/lib/errors"
import { gameInclude, gameDetailInclude } from "@/types"

export async function getFeaturedGames() {
  return prisma.game.findMany({
    where: { isFeatured: true },
    include: gameInclude,
    orderBy: { createdAt: "desc" },
    take: 6,
  })
}

export async function getTrendingGames() {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

  const games = await prisma.game.findMany({
    where: {
      favorites: {
        some: { createdAt: { gte: sevenDaysAgo } },
      },
    },
    include: gameInclude,
  })

  return games
    .sort((a, b) => b._count.favorites - a._count.favorites)
    .slice(0, 6)
}

export async function getNewReleases() {
  return prisma.game.findMany({
    include: gameInclude,
    orderBy: { createdAt: "desc" },
    take: 6,
  })
}

export async function getGames(params: {
  search?: string
  genre?: string
  take?: number
}) {
  const where: Record<string, unknown> = {}

  if (params.search) {
    where.title = { contains: params.search, mode: "insensitive" }
  }
  if (params.genre) {
    where.genre = params.genre
  }

  return prisma.game.findMany({
    where,
    include: gameInclude,
    orderBy: { createdAt: "desc" },
    take: params.take ?? 50,
  })
}

export async function getGameById(id: string) {
  const game = await prisma.game.findUnique({
    where: { id },
    include: gameDetailInclude,
  })

  if (!game) throw new ActionError("NOT_FOUND", "Game not found")
  return game
}

export async function getGamesByOwner(ownerId: string) {
  return prisma.game.findMany({
    where: { ownerId },
    include: gameInclude,
    orderBy: { createdAt: "desc" },
  })
}

export async function getTotalFavoritesReceived(userId: string) {
  const result = await prisma.favorite.aggregate({
    _count: { id: true },
    where: {
      game: { ownerId: userId },
    },
  })
  return result._count.id
}

export async function getPublishedGameCount(ownerId: string) {
  return prisma.game.count({ where: { ownerId } })
}

export async function getFavoritedGameCount(userId: string) {
  return prisma.favorite.count({ where: { userId } })
}

export async function getGamesFavoritedByUser(userId: string) {
  return prisma.favorite.findMany({
    where: { userId },
    include: {
      game: {
        include: gameInclude,
      },
    },
    orderBy: { createdAt: "desc" },
  })
}

export async function getDeveloperCount() {
  return prisma.user.count({
    where: { games: { some: {} } },
  })
}

export async function getFavoritedGameIds(userId: string): Promise<string[]> {
  const favorites = await prisma.favorite.findMany({
    where: { userId },
    select: { gameId: true },
  })
  return favorites.map((f) => f.gameId)
}
