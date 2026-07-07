"use server"

import { auth } from "@/lib/auth"
import { createGameSchema, updateGameSchema } from "@/schemas/game-schema"
import * as gameService from "@/server/services/game-service"
import { wrap, fail } from "@/lib/action-result"
import { revalidatePath } from "next/cache"

export async function createGame(_prev: unknown, formData: FormData) {
  const session = await auth()
  const userId = session?.user?.id
  if (!userId) return fail("UNAUTHORIZED")

  const parsed = createGameSchema.safeParse({
    title: formData.get("title"),
    thumbnailUrl: formData.get("thumbnailUrl"),
    shortDescription: formData.get("shortDescription"),
    externalUrl: formData.get("externalUrl"),
    genre: formData.get("genre"),
    tags: formData.get("tags"),
  })

  if (!parsed.success) {
    return fail("VALIDATION", parsed.error.errors[0].message)
  }

  const result = await wrap(() =>
    gameService.createGame({ ...parsed.data, ownerId: userId })
  )

  if (!result.success) return result

  revalidatePath("/dashboard")
  revalidatePath("/")
  return result
}

export async function updateGame(_prev: unknown, formData: FormData) {
  const session = await auth()
  const userId = session?.user?.id
  if (!userId) return fail("UNAUTHORIZED")

  const parsed = updateGameSchema.safeParse({
    id: formData.get("id"),
    title: formData.get("title"),
    thumbnailUrl: formData.get("thumbnailUrl"),
    shortDescription: formData.get("shortDescription"),
    externalUrl: formData.get("externalUrl"),
    genre: formData.get("genre"),
    tags: formData.get("tags"),
  })

  if (!parsed.success) {
    return fail("VALIDATION", parsed.error.errors[0].message)
  }

  const game = await wrap(() => gameService.getGameById(parsed.data.id))
  if (!game.success) return game
  if (game.data.ownerId !== userId) return fail("FORBIDDEN")

  const { id, ...data } = parsed.data

  const result = await wrap(() => gameService.updateGame(id, data))
  if (!result.success) return result

  revalidatePath("/dashboard")
  revalidatePath(`/games/${id}`)
  return result
}

export async function deleteGame(id: string) {
  const session = await auth()
  const userId = session?.user?.id
  if (!userId) return fail("UNAUTHORIZED")

  const game = await wrap(() => gameService.getGameById(id))
  if (!game.success) return game
  if (game.data.ownerId !== userId) return fail("FORBIDDEN")

  const result = await wrap(() => gameService.deleteGame(id))
  if (!result.success) return result

  revalidatePath("/dashboard")
  return result
}
