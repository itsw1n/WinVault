import { prisma } from "@/lib/prisma"
import { ActionError } from "@/lib/errors"

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
