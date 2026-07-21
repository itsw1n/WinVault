import type { Prisma } from '@prisma/client'

export const commentWithUserSelect = {
  id: true,
  content: true,
  userId: true,
  gameId: true,
  parentId: true,
  createdAt: true,
  updatedAt: true,
  user: { select: { id: true, username: true, avatarUrl: true } },
} as const satisfies Prisma.CommentSelect

export const commentWithRepliesSelect = {
  id: true,
  content: true,
  userId: true,
  gameId: true,
  parentId: true,
  createdAt: true,
  updatedAt: true,
  user: { select: { id: true, username: true, avatarUrl: true } },
  replies: {
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
    orderBy: { createdAt: 'asc' },
  },
} as const satisfies Prisma.CommentSelect

export type CommentWithUser = Prisma.CommentGetPayload<{
  select: typeof commentWithUserSelect
}>

export type CommentWithReplies = Prisma.CommentGetPayload<{
  select: typeof commentWithRepliesSelect
}>
