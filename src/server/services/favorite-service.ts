import { prisma } from "@/lib/prisma"
import { ActionError } from "@/lib/action-result"

export async function toggleFavorite(userId: string, gameId: string) {
  const game = await prisma.game.findUnique({ where: { id: gameId } })
  if (!game) throw new ActionError("NOT_FOUND", "Game not found")

  const existing = await prisma.favorite.findUnique({
    where: { userId_gameId: { userId, gameId } },
  })

  if (existing) {
    await prisma.favorite.delete({ where: { id: existing.id } })
    return { favorited: false }
  }

  await prisma.favorite.create({ data: { userId, gameId } })
  return { favorited: true }
}

export async function getFavoritedGameIds(userId: string): Promise<string[]> {
  const favorites = await prisma.favorite.findMany({
    where: { userId },
    select: { gameId: true },
  })
  return favorites.map((f) => f.gameId)
}
