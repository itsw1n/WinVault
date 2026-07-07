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
      .slice(0, 10)
  ).pipe(z.array(z.string().max(30, "Each tag must be at most 30 characters")).max(10)),
})

export const updateGameSchema = createGameSchema.extend({
  id: z.string(),
})

export const GENRES = [
  "Action",
  "Adventure",
  "Puzzle",
  "RPG",
  "Simulation",
  "Strategy",
  "Sports",
  "Racing",
  "Horror",
  "Platformer",
  "Shooter",
  "Fighting",
  "Rhythm",
  "Visual Novel",
  "Other",
] as const


