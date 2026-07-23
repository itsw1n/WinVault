import { prisma } from '@/lib/prisma'
import { ActionError } from '@/lib/errors'

/** Create a new comment (or reply) on a game. */
export async function createComment(data: {
  content: string
  userId: string
  gameId: string
  parentId?: string
}) {
  const comment = await prisma.comment.create({
    data: {
      content: data.content,
      userId: data.userId,
      gameId: data.gameId,
      parentId: data.parentId ?? null,
    },
    select: {
      id: true,
      content: true,
      userId: true,
      gameId: true,
      parentId: true,
      createdAt: true,
      updatedAt: true,
      user: { select: { id: true, username: true, avatarUrl: true } },
    },
  })
  return comment
}

/** Update a comment's content. Throws NOT_FOUND if it doesn't exist. */
export async function updateComment(commentId: string, content: string) {
  try {
    const comment = await prisma.comment.update({
      where: { id: commentId },
      data: { content },
      select: {
        id: true,
        content: true,
        userId: true,
        gameId: true,
        parentId: true,
        createdAt: true,
        updatedAt: true,
        user: { select: { id: true, username: true, avatarUrl: true } },
      },
    })
    return comment
  } catch {
    throw new ActionError('NOT_FOUND', 'Comment not found')
  }
}

/** Delete a comment by ID. Throws NOT_FOUND if it doesn't exist. */
export async function deleteComment(commentId: string) {
  try {
    await prisma.comment.deleteMany({ where: { id: commentId } })
  } catch {
    throw new ActionError('NOT_FOUND', 'Comment not found')
  }
}
