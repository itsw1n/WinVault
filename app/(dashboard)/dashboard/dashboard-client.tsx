"use client"

import { useRouter } from "next/navigation"
import { GamesList } from "@/components/dashboard/games-list"
import { FavoritesGrid } from "@/components/dashboard/favorites-grid"
import { deleteGame } from "@/actions/games"
import { toggleFavorite } from "@/actions/favorites"

interface Game {
  id: string
  title: string
  genre: string
  thumbnailUrl: string
  shortDescription: string
  externalUrl: string
  tags: string[]
  _count: { favorites: number }
}

interface Favorite {
  game: {
    id: string
    title: string
    thumbnailUrl: string
    genre: string
    externalUrl: string
    owner: { username: string }
    _count: { favorites: number }
  }
  createdAt: Date
}

export function DashboardActions({ games }: { games: Game[] }) {
  const router = useRouter()

  async function handleDelete(id: string) {
    if (confirm("Delete this game? This cannot be undone.")) {
      await deleteGame(id)
      router.refresh()
    }
  }

  return <GamesList games={games} onDelete={handleDelete} />
}

export function DashboardFavorites({ favorites }: { favorites: Favorite[] }) {
  const router = useRouter()

  async function handleUnfavorite(gameId: string) {
    await toggleFavorite(gameId)
    router.refresh()
  }

  return <FavoritesGrid favorites={favorites} onUnfavorite={handleUnfavorite} />
}
