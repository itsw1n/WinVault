import { z } from "zod"

export const createGameSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  thumbnailUrl: z.string().url("Must be a valid URL"),
  shortDescription: z.string().min(1, "Description is required").max(500),
  externalUrl: z.string().url("Must be a valid URL"),
  genre: z.string().min(1, "Genre is required"),
  tags: z.string().transform((val) =>
    val
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
  ),
})

export const updateGameSchema = createGameSchema.extend({
  id: z.string(),
})

export type CreateGameInput = z.infer<typeof createGameSchema>
export type UpdateGameInput = z.infer<typeof updateGameSchema>
