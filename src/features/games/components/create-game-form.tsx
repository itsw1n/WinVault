"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { createGame } from "@/features/games/actions/crud"
import { createGameSchema } from "@/features/games/schemas"
import { GENRES } from "@/features/games/schemas"

const formSchema = createGameSchema.extend({
  tags: z.string(),
})

type FormValues = z.infer<typeof formSchema>

interface CreateGameFormProps {
  onSuccess: () => void
}

export function CreateGameForm({ onSuccess }: CreateGameFormProps) {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      thumbnailUrl: "",
      shortDescription: "",
      externalUrl: "",
      genre: "",
      tags: "",
    },
  })

  async function onSubmit(data: FormValues) {
    const tags = data.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
      .slice(0, 10)

    if (tags.some((t) => t.length > 30)) {
      setError("tags", {
        message: "Each tag must be at most 30 characters",
      })
      return
    }

    const formData = new FormData()
    formData.set("title", data.title)
    formData.set("thumbnailUrl", data.thumbnailUrl)
    formData.set("shortDescription", data.shortDescription)
    formData.set("externalUrl", data.externalUrl)
    formData.set("genre", data.genre)
    formData.set("tags", tags.join(","))

    const result = await createGame(undefined, formData)

    if (!result.success) {
      setError("root", { message: result.message })
      return
    }

    router.refresh()
    onSuccess()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {errors.root && (
        <div className="border-[2px] border-pv-heart rounded-pv-sm bg-pv-card p-3">
          <p className="text-[12px] text-pv-heart font-medium">
            {errors.root.message}
          </p>
        </div>
      )}

      <div className="flex flex-col gap-1">
        <label
          htmlFor="title"
          className="text-[12px] font-medium text-pv-text"
        >
          Title
        </label>
        <input
          id="title"
          {...register("title")}
          placeholder="Game title"
          className="w-full px-3 py-2 text-[13px] bg-pv-card text-pv-text border-[2px] border-pv-border rounded-pv-sm focus:outline-none focus:border-pv-primary transition-colors"
        />
        {errors.title && (
          <p className="text-[12px] text-pv-heart">{errors.title.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="thumbnailUrl"
          className="text-[12px] font-medium text-pv-text"
        >
          Thumbnail URL
        </label>
        <input
          id="thumbnailUrl"
          {...register("thumbnailUrl")}
          placeholder="https://example.com/image.png"
          className="w-full px-3 py-2 text-[13px] bg-pv-card text-pv-text border-[2px] border-pv-border rounded-pv-sm focus:outline-none focus:border-pv-primary transition-colors"
        />
        {errors.thumbnailUrl && (
          <p className="text-[12px] text-pv-heart">
            {errors.thumbnailUrl.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="shortDescription"
          className="text-[12px] font-medium text-pv-text"
        >
          Short Description
        </label>
        <textarea
          id="shortDescription"
          {...register("shortDescription")}
          rows={3}
          placeholder="A brief description of the game"
          className="w-full px-3 py-2 text-[13px] bg-pv-card text-pv-text border-[2px] border-pv-border rounded-pv-sm focus:outline-none focus:border-pv-primary transition-colors resize-none break-words"
        />
        {errors.shortDescription && (
          <p className="text-[12px] text-pv-heart">
            {errors.shortDescription.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="externalUrl"
          className="text-[12px] font-medium text-pv-text"
        >
          External URL
        </label>
        <input
          id="externalUrl"
          {...register("externalUrl")}
          placeholder="https://example.com/play"
          className="w-full px-3 py-2 text-[13px] bg-pv-card text-pv-text border-[2px] border-pv-border rounded-pv-sm focus:outline-none focus:border-pv-primary transition-colors"
        />
        {errors.externalUrl && (
          <p className="text-[12px] text-pv-heart">
            {errors.externalUrl.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="genre"
          className="text-[12px] font-medium text-pv-text"
        >
          Genre
        </label>
        <select
          id="genre"
          {...register("genre")}
          className="w-full px-3 py-2 text-[13px] bg-pv-card text-pv-text border-[2px] border-pv-border rounded-pv-sm focus:outline-none focus:border-pv-primary transition-colors"
        >
          <option value="">Select a genre</option>
          {GENRES.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        {errors.genre && (
          <p className="text-[12px] text-pv-heart">{errors.genre.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="tags" className="text-[12px] font-medium text-pv-text">
          Tags
        </label>
        <input
          id="tags"
          {...register("tags")}
          placeholder="action, rpg, pixel-art"
          className="w-full px-3 py-2 text-[13px] bg-pv-card text-pv-text border-[2px] border-pv-border rounded-pv-sm focus:outline-none focus:border-pv-primary transition-colors"
        />
        <p className="text-[11px] text-pv-muted">
          Comma-separated. Max 10 tags, 30 chars each.
        </p>
        {errors.tags && (
          <p className="text-[12px] text-pv-heart">{errors.tags.message}</p>
        )}
      </div>

      <div className="pt-2 space-y-2">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? "PUBLISHING..." : "PUBLISH GAME"}
        </Button>
        <Button
          type="button"
          variant="inactive"
          onClick={onSuccess}
          className="w-full"
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
