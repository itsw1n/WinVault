import type { Metadata } from 'next'
import { auth } from '@/lib/nextauth/auth'
import { StatCard } from '@/components/ui'
import {
  getGamesByOwner,
  getGamesFavoritedByUser,
  getTotalFavoritesReceived,
  getPublishedGameCount,
  getFavoritedGameCount,
} from '@/features/games/server/queries'
import {
  DashboardActions,
  DashboardFavorites,
  DashboardNewGameButton,
} from '@/features/dashboard/components/dashboard-client'

export const metadata: Metadata = {
  title: 'Dashboard — PlayVault',
}

export default async function DashboardPage() {
  const session = await auth()
  const userId = session!.user!.id

  const [publishedCount, totalFavsReceived, yourFavsCount, games, favorites] = await Promise.all([
    getPublishedGameCount(userId),
    getTotalFavoritesReceived(userId),
    getFavoritedGameCount(userId),
    getGamesByOwner(userId),
    getGamesFavoritedByUser(userId),
  ])

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold text-pv-text">Dashboard</h1>
        <DashboardNewGameButton />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Published Games" value={publishedCount} />
        <StatCard label="Total Favorites" value={totalFavsReceived} />
        <StatCard label="Your Favorites" value={yourFavsCount} />
      </div>

      {/* My Games */}
      <section>
        <h2 className="mb-4 font-display text-xl font-bold text-pv-text">My Games</h2>
        <DashboardActions games={games} />
      </section>

      {/* Favorites */}
      <section>
        <h2 className="mb-4 font-display text-xl font-bold text-pv-text">Favorites</h2>
        <DashboardFavorites favorites={favorites} />
      </section>
    </div>
  )
}
