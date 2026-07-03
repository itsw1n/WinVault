"use client"

import { FavoritesGrid } from "@/components/dashboard/favorites-grid"
import { toggleFavorite } from "@/actions/favorites"
import { useRouter } from "next/navigation"

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

export function DashboardFavorites({ favorites }: { favorites: Favorite[] }) {
  const router = useRouter()

  async function handleUnfavorite(gameId: string) {
    await toggleFavorite(gameId)
    router.refresh()
  }

  return <FavoritesGrid favorites={favorites} onUnfavorite={handleUnfavorite} />
}
