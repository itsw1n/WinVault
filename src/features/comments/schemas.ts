import { z } from 'zod'

/** Zod schema for validating comment creation. */
export const createCommentSchema = z.object({
  content: z
    .string()
    .min(1, 'Comment cannot be empty')
    .max(1000, 'Comment too long — max 1000 characters'),
  gameId: z.string(),
  parentId: z.string().optional(),
})

/** Zod schema for validating comment edits. */
export const updateCommentSchema = z.object({
  commentId: z.string(),
  content: z
    .string()
    .min(1, 'Comment cannot be empty')
    .max(1000, 'Comment too long — max 1000 characters'),
})
