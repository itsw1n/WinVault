"use server"

import { auth } from "@/lib/auth/auth"
import { createGameSchema, updateGameSchema } from "@/features/games/schemas"
import * as mutations from "@/features/games/mutations/games"
import * as queries from "@/features/games/queries/games"
import { checkUrlRemote } from "@/lib/security/url-safety"
import { processThumbnail } from "@/lib/process-thumbnail"
import { uploadThumbnail } from "@/lib/storage"
import { wrap, fail } from "@/lib/errors"
import { revalidatePath } from "next/cache"

export async function createGame(_prev: unknown, formData: FormData) {
  const session = await auth()
  const userId = session?.user?.id
  if (!userId) return fail("UNAUTHORIZED")

  let thumbnailUrl = formData.get("thumbnailUrl") as string
  const thumbnailFile = formData.get("thumbnail") as File | null

  if (thumbnailFile && thumbnailFile.size > 0) {
    const processed = await processThumbnail(thumbnailFile)
    const url = await uploadThumbnail(
      processed.buffer,
      processed.mimeType,
      processed.fileName
    )
    if (url) thumbnailUrl = url
  }

  if (!thumbnailUrl) {
    return fail("VALIDATION", "Please provide a thumbnail image or URL")
  }

  const parsed = createGameSchema.safeParse({
    title: formData.get("title"),
    thumbnailUrl,
    shortDescription: formData.get("shortDescription"),
    externalUrl: formData.get("externalUrl"),
    genre: formData.get("genre"),
    tags: formData.get("tags"),
  })

  if (!parsed.success) {
    return fail("VALIDATION", parsed.error.errors[0].message)
  }

  const sbReason = await checkUrlRemote(parsed.data.externalUrl)
  if (sbReason) return fail("VALIDATION", sbReason)

  const result = await wrap(() =>
    mutations.createGame({ ...parsed.data, ownerId: userId })
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

  let thumbnailUrl = formData.get("thumbnailUrl") as string
  const thumbnailFile = formData.get("thumbnail") as File | null

  if (thumbnailFile && thumbnailFile.size > 0) {
    const processed = await processThumbnail(thumbnailFile)
    const url = await uploadThumbnail(
      processed.buffer,
      processed.mimeType,
      processed.fileName
    )
    if (url) thumbnailUrl = url
  }

  if (!thumbnailUrl) {
    return fail("VALIDATION", "Please provide a thumbnail image or URL")
  }

  const parsed = updateGameSchema.safeParse({
    id: formData.get("id"),
    title: formData.get("title"),
    thumbnailUrl,
    shortDescription: formData.get("shortDescription"),
    externalUrl: formData.get("externalUrl"),
    genre: formData.get("genre"),
    tags: formData.get("tags"),
  })

  if (!parsed.success) {
    return fail("VALIDATION", parsed.error.errors[0].message)
  }

  const sbReasonUpdate = await checkUrlRemote(parsed.data.externalUrl)
  if (sbReasonUpdate) return fail("VALIDATION", sbReasonUpdate)

  const game = await wrap(() => queries.getGameById(parsed.data.id))
  if (!game.success) return game
  if (game.data.ownerId !== userId) return fail("FORBIDDEN")

  const { id, ...data } = parsed.data

  const result = await wrap(() => mutations.updateGame(id, data))
  if (!result.success) return result

  revalidatePath("/dashboard")
  revalidatePath(`/games/${id}`)
  return result
}

export async function deleteGame(id: string) {
  const session = await auth()
  const userId = session?.user?.id
  if (!userId) return fail("UNAUTHORIZED")

  const game = await wrap(() => queries.getGameById(id))
  if (!game.success) return game
  if (game.data.ownerId !== userId) return fail("FORBIDDEN")

  const result = await wrap(() => mutations.deleteGame(id))
  if (!result.success) return result

  revalidatePath("/dashboard")
  return result
}

export async function toggleFavorite(gameId: string) {
  const session = await auth()
  const userId = session?.user?.id
  if (!userId) return fail("UNAUTHORIZED")

  const result = await wrap(() => mutations.toggleFavorite(userId, gameId))
  if (!result.success) return result

  revalidatePath("/")
  revalidatePath("/dashboard")
  revalidatePath(`/games/${gameId}`)
  return result
}
