"use client"

import { useRouter } from "next/navigation"
import { GamesList } from "@/components/dashboard/games-list"
import { deleteGame } from "@/actions/games"

interface Game {
  id: string
  title: string
  genre: string
  _count: { favorites: number }
}

export function DashboardActions({ games }: { games: Game[] }) {
  const router = useRouter()

  async function handleDelete(id: string) {
    if (confirm("Delete this game? This cannot be undone.")) {
      await deleteGame(id)
      router.refresh()
    }
  }

  return (
    <GamesList
      games={games}
      onEdit={(id) => router.push(`/dashboard/games/${id}/edit`)}
      onDelete={handleDelete}
    />
  )
}
