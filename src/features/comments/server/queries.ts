import { prisma } from '@/lib/prisma'
import { commentWithRepliesSelect } from '@/types'
import { ActionError } from '@/lib/errors'
import type { CommentWithReplies } from '@/types'

/** Fetch top-level comments for a game, each with nested replies. */
export async function getCommentsByGameId(gameId: string): Promise<CommentWithReplies[]> {
  const comments = await prisma.comment.findMany({
    where: { gameId, parentId: null },
    select: commentWithRepliesSelect,
    orderBy: { createdAt: 'desc' },
  })
  return comments
}

/** Fetch the author ID of a comment. Throws NOT_FOUND if missing. */
export async function getCommentAuthorId(commentId: string): Promise<string> {
  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
    select: { userId: true },
  })
  if (!comment) throw new ActionError('NOT_FOUND', 'Comment not found')
  return comment.userId
}

/** Fetch a comment's userId and gameId (with ownerId). Throws NOT_FOUND if missing. */
export async function getCommentWithGame(commentId: string) {
  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
    select: {
      userId: true,
      gameId: true,
      game: { select: { ownerId: true } },
    },
  })
  if (!comment) throw new ActionError('NOT_FOUND', 'Comment not found')
  return comment
}
