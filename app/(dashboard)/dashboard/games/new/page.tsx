"use client"

import { useActionState } from "react"
import { createGame } from "@/actions/games"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { GENRES } from "@/services/game-service"
import Link from "next/link"

export default function NewGamePage() {
  const [state, formAction, pending] = useActionState(createGame, undefined)

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
          New Game
        </h1>
      </div>

      <Card className="p-6">
        <form action={formAction} className="space-y-4">
          <Input name="title" label="Title" placeholder="Game title" />
          <Input
            name="thumbnailUrl"
            label="Thumbnail URL"
            placeholder="https://example.com/image.png"
          />
          <Input
            name="shortDescription"
            label="Short Description"
            placeholder="A brief description of the game"
          />
          <Input
            name="externalUrl"
            label="External URL"
            placeholder="https://example.com/play"
          />
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-pv-text">Genre</label>
            <select
              name="genre"
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
            placeholder="action, retro, pixel-art"
          />
          {state && !state.success && (
            <p className="text-xs text-pv-heart">{state.message}</p>
          )}
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Publishing..." : "Publish Game"}
          </Button>
        </form>
      </Card>
    </div>
  )
}
