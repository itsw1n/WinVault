import type { Prisma } from '@prisma/client'

/** Prisma select for a comment with its author info (no replies). */
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

/** Prisma select for a comment with its nested replies and author info. */
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

/** Inferred comment type with author info (no replies). */
export type CommentWithUser = Prisma.CommentGetPayload<{
  select: typeof commentWithUserSelect
}>

/** Inferred comment type with author info and nested replies. */
export type CommentWithReplies = Prisma.CommentGetPayload<{
  select: typeof commentWithRepliesSelect
}>
