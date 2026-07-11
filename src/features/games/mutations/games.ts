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
  const { count } = await prisma.favorite.deleteMany({
    where: { userId, gameId },
  })
  if (count > 0) return { favorited: false }

  await prisma.favorite.create({ data: { userId, gameId } })
  return { favorited: true }
}
