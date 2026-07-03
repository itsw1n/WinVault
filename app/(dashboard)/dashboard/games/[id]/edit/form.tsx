"use client"

import { useActionState } from "react"
import { useRouter } from "next/navigation"
import { updateGame } from "@/actions/games"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { GENRES } from "@/services/game-service"
import Link from "next/link"

interface Game {
  id: string
  title: string
  thumbnailUrl: string
  shortDescription: string
  externalUrl: string
  genre: string
  tags: string[]
}

export function EditGameForm({ game }: { game: Game }) {
  const router = useRouter()
  const [state, formAction, pending] = useActionState(updateGame, undefined)

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="flex items-center gap-2">
        <Link
          href="/dashboard"
          className="text-sm text-pv-muted hover:text-pv-text"
        >
          ← Back
        </Link>
        <h1 className="font-display text-2xl font-bold text-pv-text">
          Edit Game
        </h1>
      </div>

      <Card className="p-6">
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="id" value={game.id} />
          <Input
            name="title"
            label="Title"
            defaultValue={game.title}
          />
          <Input
            name="thumbnailUrl"
            label="Thumbnail URL"
            defaultValue={game.thumbnailUrl}
          />
          <Input
            name="shortDescription"
            label="Short Description"
            defaultValue={game.shortDescription}
          />
          <Input
            name="externalUrl"
            label="External URL"
            defaultValue={game.externalUrl}
          />
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-pv-text">Genre</label>
            <select
              name="genre"
              defaultValue={game.genre}
              className="w-full px-3 py-2 text-sm bg-pv-card text-pv-text border-pv border-pv-border rounded-pv-sm focus:outline-none focus:border-pv-primary"
            >
              <option value="">Select a genre</option>
              {GENRES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
          <Input
            name="tags"
            label="Tags (comma separated)"
            defaultValue={game.tags.join(", ")}
          />
          {state && !state.success && (
            <p className="text-xs text-pv-heart">{state.message}</p>
          )}
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </Card>
    </div>
  )
}
