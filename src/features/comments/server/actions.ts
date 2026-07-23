'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@/lib/nextauth/auth'
import { wrap, fail } from '@/lib/errors'
import { createCommentSchema, updateCommentSchema } from '../schemas'
import { createComment, updateComment, deleteComment } from './mutations'
import { getCommentWithGame } from './queries'
import type { ActionResult } from '@/types'

/** Add a comment or reply to a game. Requires authentication. */
export async function addComment(_prevState: ActionResult<unknown> | null, formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) return fail('UNAUTHORIZED')

  const raw = {
    content: formData.get('content'),
    gameId: formData.get('gameId'),
    parentId: formData.get('parentId') || undefined,
  }

  const parsed = createCommentSchema.safeParse(raw)
  if (!parsed.success) return fail('VALIDATION', parsed.error.errors[0]?.message)

  const result = await wrap(() =>
    createComment({
      content: parsed.data.content,
      userId: session.user.id,
      gameId: parsed.data.gameId,
      parentId: parsed.data.parentId,
    })
  )
  if (!result.success) return result

  revalidatePath(`/games/${parsed.data.gameId}`)
  return { success: true, data: result.data } as const
}

/** Edit an existing comment. Only the author can edit. */
export async function editComment(_prevState: ActionResult<unknown> | null, formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) return fail('UNAUTHORIZED')

  const raw = {
    commentId: formData.get('commentId'),
    content: formData.get('content'),
  }

  const parsed = updateCommentSchema.safeParse(raw)
  if (!parsed.success) return fail('VALIDATION', parsed.error.errors[0]?.message)

  const comment = await getCommentWithGame(parsed.data.commentId).catch(() => null)
  if (!comment) return fail('NOT_FOUND')
  if (comment.userId !== session.user.id) return fail('FORBIDDEN')

  const result = await wrap(() => updateComment(parsed.data.commentId, parsed.data.content))
  if (!result.success) return result

  revalidatePath(`/games/${comment.gameId}`)
  return { success: true, data: result.data } as const
}

/** Delete a comment. The author or game owner can delete. */
export async function removeComment(_prevState: ActionResult<unknown> | null, formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) return fail('UNAUTHORIZED')

  const commentId = formData.get('commentId')
  if (typeof commentId !== 'string' || !commentId) return fail('VALIDATION')

  const comment = await getCommentWithGame(commentId).catch(() => null)
  if (!comment) return fail('NOT_FOUND')

  const isAuthor = comment.userId === session.user.id
  const isGameOwner = comment.game.ownerId === session.user.id
  if (!isAuthor && !isGameOwner) return fail('FORBIDDEN')

  const result = await wrap(() => deleteComment(commentId))
  if (!result.success) return result

  revalidatePath(`/games/${comment.gameId}`)
  return { success: true, data: null } as const
}
