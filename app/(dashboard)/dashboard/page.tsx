import type { Metadata } from "next"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { StatCard } from "@/components/dashboard/stat-card"
import { GamesList } from "@/components/dashboard/games-list"
import * as gameService from "@/services/game-service"
import * as favoriteService from "@/services/favorite-service"
import Link from "next/link"
import { DashboardActions } from "./actions"
import { DashboardFavorites } from "./favorites-client"

export const metadata: Metadata = {
  title: "Dashboard — PlayVault",
}

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/sign-in")

  const userId = session.user.id

  const [publishedCount, totalFavsReceived, yourFavsCount, games, favorites] =
    await Promise.all([
      gameService.getPublishedGamesCount(userId),
      gameService.getTotalFavoritesReceived(userId),
      gameService.getFavoriteCountByUser(userId),
      gameService.getGamesByOwner(userId),
      gameService.getGamesFavoritedByUser(userId),
    ])

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold text-pv-text">
          Dashboard
        </h1>
        <Link
          href="/dashboard/games/new"
          className="px-4 py-2 text-sm font-bold uppercase tracking-wide border-pv border-pv-border rounded-pv-sm bg-pv-primary text-[#111] hover:bg-[#e05e00] transition-colors"
        >
          + New Game
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Published Games" value={publishedCount} />
        <StatCard label="Total Favorites" value={totalFavsReceived} />
        <StatCard label="Your Favorites" value={yourFavsCount} />
      </div>

      {/* My Games */}
      <section>
        <h2 className="font-display text-xl font-bold text-pv-text mb-4">
          My Games
        </h2>
        <DashboardActions games={games} />
      </section>

      {/* Favorites */}
      <section>
        <h2 className="font-display text-xl font-bold text-pv-text mb-4">
          Favorites
        </h2>
        <DashboardFavorites favorites={favorites} />
      </section>
    </div>
  )
}
