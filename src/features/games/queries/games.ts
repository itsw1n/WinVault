import { prisma } from "@/lib/prisma"
import { ActionError } from "@/lib/errors"
import { unstable_cache } from "next/cache"

export const getFeaturedGames = unstable_cache(
  async () => prisma.game.findMany({
    where: { isFeatured: true },
    include: {
      owner: { select: { username: true, avatarUrl: true } },
      _count: { select: { favorites: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 6,
  }),
  ["games", "featured"],
  { revalidate: 60, tags: ["games"] }
)

export const getTrendingGames = unstable_cache(
  async () => {
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
  },
  ["games", "trending"],
  { revalidate: 60, tags: ["games"] }
)

export const getNewReleases = unstable_cache(
  async () => prisma.game.findMany({
    include: {
      owner: { select: { username: true, avatarUrl: true } },
      _count: { select: { favorites: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 6,
  }),
  ["games", "new-releases"],
  { revalidate: 60, tags: ["games"] }
)

export const getGames = unstable_cache(
  async (params: {
    search?: string
    genre?: string
    take?: number
  }) => {
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
  },
  ["games", "list"],
  { revalidate: 30, tags: ["games"] }
)

export const getGameById = unstable_cache(
  async (id: string) => {
    const game = await prisma.game.findUnique({
      where: { id },
      include: {
        owner: { select: { username: true, avatarUrl: true, bio: true } },
        _count: { select: { favorites: true } },
      },
    })
    if (!game) throw new ActionError("NOT_FOUND", "Game not found")
    return game
  },
  ["games", "detail"],
  { revalidate: 60, tags: ["games"] }
)

export const getGamesByOwner = unstable_cache(
  async (ownerId: string) => prisma.game.findMany({
    where: { ownerId },
    include: {
      owner: { select: { username: true, avatarUrl: true } },
      _count: { select: { favorites: true } },
    },
    orderBy: { createdAt: "desc" },
  }),
  ["games", "by-owner"],
  { revalidate: 30, tags: ["games"] }
)

export const getTotalFavoritesReceived = unstable_cache(
  async (userId: string) => {
    const result = await prisma.favorite.aggregate({
      _count: { id: true },
      where: {
        game: { ownerId: userId },
      },
    })
    return result._count.id
  },
  ["favorites", "received"],
  { revalidate: 10, tags: ["favorites"] }
)

export const getGamesFavoritedByUser = unstable_cache(
  async (userId: string) => prisma.favorite.findMany({
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
  }),
  ["favorites", "by-user"],
  { revalidate: 10, tags: ["favorites"] }
)

export const getDeveloperCount = unstable_cache(
  async () => prisma.user.count({
    where: { games: { some: {} } },
  }),
  ["developers", "count"],
  { revalidate: 300, tags: ["games"] }
)

export const getFavoritedGameIds = unstable_cache(
  async (userId: string): Promise<string[]> => {
    const favorites = await prisma.favorite.findMany({
      where: { userId },
      select: { gameId: true },
    })
    return favorites.map((f) => f.gameId)
  },
  ["favorites", "ids"],
  { revalidate: 10, tags: ["favorites"] }
)
