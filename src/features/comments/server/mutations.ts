import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'
import { ActionError } from '@/lib/errors'

/** Create a new comment (or reply) on a game. */
export async function createComment(data: {
  content: string
  userId: string
  gameId: string
  parentId?: string
}) {
  if (data.parentId) {
    const parent = await prisma.comment.findUnique({
      where: { id: data.parentId },
      select: { gameId: true },
    })
    if (!parent) throw new ActionError('NOT_FOUND', 'Parent comment not found')
    if (parent.gameId !== data.gameId)
      throw new ActionError('VALIDATION', 'Parent comment belongs to a different game')
  }

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
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      throw new ActionError('NOT_FOUND', 'Comment not found')
    }
    throw error
  }
}

/** Delete a comment by ID. Throws NOT_FOUND if it doesn't exist. */
export async function deleteComment(commentId: string) {
  const result = await prisma.comment.deleteMany({ where: { id: commentId } })
  if (result.count === 0) throw new ActionError('NOT_FOUND', 'Comment not found')
}
