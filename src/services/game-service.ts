import { prisma } from "@/lib/db"
import { ActionError } from "@/lib/action-result"

export async function getFeaturedGames() {
  return prisma.game.findMany({
    where: { isFeatured: true },
    include: {
      owner: { select: { username: true, avatarUrl: true } },
      _count: { select: { favorites: true } },
    },
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
    include: {
      owner: { select: { username: true, avatarUrl: true } },
      _count: { select: { favorites: true } },
    },
  })

  return games
    .sort((a, b) => b._count.favorites - a._count.favorites)
    .slice(0, 6)
}

export async function getNewReleases() {
  return prisma.game.findMany({
    include: {
      owner: { select: { username: true, avatarUrl: true } },
      _count: { select: { favorites: true } },
    },
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
    include: {
      owner: { select: { username: true, avatarUrl: true } },
      _count: { select: { favorites: true } },
    },
    orderBy: { createdAt: "desc" },
    take: params.take ?? 50,
  })
}

export async function getGameById(id: string) {
  const game = await prisma.game.findUnique({
    where: { id },
    include: {
      owner: { select: { username: true, avatarUrl: true, bio: true } },
      _count: { select: { favorites: true } },
    },
  })

  if (!game) throw new ActionError("NOT_FOUND", "Game not found")
  return game
}

export async function getGamesByOwner(ownerId: string) {
  return prisma.game.findMany({
    where: { ownerId },
    include: {
      _count: { select: { favorites: true } },
    },
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

export async function createGame(data: {
  title: string
  thumbnailUrl: string
  shortDescription: string
  externalUrl: string
  genre: string
  tags: string[]
  ownerId: string
}) {
  return prisma.game.create({ data })
}

export async function updateGame(
  id: string,
  data: {
    title?: string
    thumbnailUrl?: string
    shortDescription?: string
    externalUrl?: string
    genre?: string
    tags?: string[]
  }
) {
  const game = await prisma.game.findUnique({ where: { id } })
  if (!game) throw new ActionError("NOT_FOUND", "Game not found")

  return prisma.game.update({ where: { id }, data })
}

export async function deleteGame(id: string) {
  const game = await prisma.game.findUnique({ where: { id } })
  if (!game) throw new ActionError("NOT_FOUND", "Game not found")

  return prisma.game.delete({ where: { id } })
}

export async function getGamesFavoritedByUser(userId: string) {
  return prisma.favorite.findMany({
    where: { userId },
    include: {
      game: {
        include: {
          owner: { select: { username: true, avatarUrl: true } },
          _count: { select: { favorites: true } },
        },
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


