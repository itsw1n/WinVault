'use server'

import { auth } from '@/lib/nextauth/auth'
import { createGameSchema, updateGameSchema } from '@/features/games/schemas'
import * as mutations from '@/features/games/server/mutations'
import * as queries from '@/features/games/server/queries'
import { checkUrlLocal, checkUrlRemote } from '@/lib/security/url-safety'
import { processThumbnail } from '@/lib/process-thumbnail'
import { uploadThumbnail, deleteThumbnail } from '@/lib/storage'
import { wrap, fail } from '@/lib/errors'
import { revalidatePath } from 'next/cache'

/**
 * Create a new game listing.
 * Validates input against the blocklist and Safe Browsing before persisting.
 */
export async function createGame(_prev: unknown, formData: FormData) {
  const session = await auth()
  const userId = session?.user?.id
  if (!userId) return fail('UNAUTHORIZED')

  let thumbnailUrl = formData.get('thumbnailUrl') as string
  const thumbnailFile = formData.get('thumbnail') as File | null

  if (thumbnailFile && thumbnailFile.size > 0) {
    const processed = await processThumbnail(thumbnailFile)
    const url = await uploadThumbnail(processed.buffer, processed.mimeType, processed.fileName)
    if (url) thumbnailUrl = url
  }

  if (!thumbnailUrl) {
    return fail('VALIDATION', 'Please provide a thumbnail image or URL')
  }

  const parsed = createGameSchema.safeParse({
    title: formData.get('title'),
    thumbnailUrl,
    shortDescription: formData.get('shortDescription'),
    externalUrl: formData.get('externalUrl'),
    genre: formData.get('genre'),
    tags: formData.get('tags'),
  })

  if (!parsed.success) {
    return fail('VALIDATION', parsed.error.errors[0].message)
  }

  const blocklistReason = await checkUrlLocal(parsed.data.externalUrl)
  if (blocklistReason) return fail('VALIDATION', blocklistReason, { field: 'externalUrl' })

  const sbReason = await checkUrlRemote(parsed.data.externalUrl)
  if (sbReason) return fail('VALIDATION', sbReason, { field: 'externalUrl' })

  const result = await wrap(() => mutations.createGame({ ...parsed.data, ownerId: userId }))

  if (!result.success) return result

  revalidatePath('/dashboard')
  revalidatePath('/')
  return result
}

/**
 * Update an existing game listing.
 * Ownership is verified before allowing the update.
 */
export async function updateGame(_prev: unknown, formData: FormData) {
  const session = await auth()
  const userId = session?.user?.id
  if (!userId) return fail('UNAUTHORIZED')

  let thumbnailUrl = formData.get('thumbnailUrl') as string
  const thumbnailFile = formData.get('thumbnail') as File | null
  const removeThumbnail = formData.get('removeThumbnail') === 'true'

  const game = await wrap(() => queries.getGameById(formData.get('id') as string))
  if (!game.success) return game
  if (game.data.ownerId !== userId) return fail('FORBIDDEN')

  if (thumbnailFile && thumbnailFile.size > 0) {
    const processed = await processThumbnail(thumbnailFile)
    const url = await uploadThumbnail(processed.buffer, processed.mimeType, processed.fileName)
    if (url) {
      await deleteThumbnail(game.data.thumbnailUrl)
      thumbnailUrl = url
    }
  } else if (removeThumbnail) {
    await deleteThumbnail(game.data.thumbnailUrl)
    thumbnailUrl = ''
  }

  const parsed = updateGameSchema.safeParse({
    id: game.data.id,
    title: formData.get('title'),
    thumbnailUrl,
    shortDescription: formData.get('shortDescription'),
    externalUrl: formData.get('externalUrl'),
    genre: formData.get('genre'),
    tags: formData.get('tags'),
  })

  if (!parsed.success) {
    return fail('VALIDATION', parsed.error.errors[0].message)
  }

  const blocklistReason = await checkUrlLocal(parsed.data.externalUrl)
  if (blocklistReason) return fail('VALIDATION', blocklistReason, { field: 'externalUrl' })

  const sbReasonUpdate = await checkUrlRemote(parsed.data.externalUrl)
  if (sbReasonUpdate) return fail('VALIDATION', sbReasonUpdate, { field: 'externalUrl' })

  const { id, ...data } = parsed.data

  const result = await wrap(() => mutations.updateGame(id, data))
  if (!result.success) return result

  revalidatePath('/dashboard')
  revalidatePath(`/games/${id}`)
  return result
}

/** Delete a game listing. Ownership is verified before proceeding. */
export async function deleteGame(id: string) {
  const session = await auth()
  const userId = session?.user?.id
  if (!userId) return fail('UNAUTHORIZED')

  const game = await wrap(() => queries.getGameById(id))
  if (!game.success) return game
  if (game.data.ownerId !== userId) return fail('FORBIDDEN')

  await deleteThumbnail(game.data.thumbnailUrl)

  const result = await wrap(() => mutations.deleteGame(id))
  if (!result.success) return result

  revalidatePath('/dashboard')
  revalidatePath('/')
  return result
}

/** Toggle a user's favorite status for a game. */
export async function toggleFavorite(gameId: string) {
  const session = await auth()
  const userId = session?.user?.id
  if (!userId) return fail('UNAUTHORIZED')

  const result = await wrap(() => mutations.toggleFavorite(userId, gameId))
  if (!result.success) return result

  revalidatePath('/')
  revalidatePath('/dashboard')
  revalidatePath(`/games/${gameId}`)
  return result
}
