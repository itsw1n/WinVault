import type { Metadata } from "next"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { StatCard } from "@/features/dashboard/components/stat-card"
import { getGamesByOwner, getGamesFavoritedByUser, getTotalFavoritesReceived } from "@/features/games/queries/games"
import { DashboardActions, DashboardFavorites } from "./dashboard-client"
import { DashboardHeader } from "./header"

export const metadata: Metadata = {
  title: "Dashboard — PlayVault",
}

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/sign-in")

  const userId = session.user.id

  const [publishedCount, totalFavsReceived, yourFavsCount, games, favorites] =
    await Promise.all([
      prisma.game.count({ where: { ownerId: userId } }),
      getTotalFavoritesReceived(userId),
      prisma.favorite.count({ where: { userId } }),
      getGamesByOwner(userId),
      getGamesFavoritedByUser(userId),
    ])

  return (
    <div className="space-y-8">
      <DashboardHeader />

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
