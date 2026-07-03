import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { GameGrid } from "@/components/games/game-grid"
import { SearchBar } from "@/components/games/search-bar"
import { auth } from "@/lib/auth"
import { getFavoritedGameIds } from "@/services/favorite-service"
import * as gameService from "@/services/game-service"
import Link from "next/link"

export default async function HomePage() {
  const session = await auth()

  const [featured, trending, newReleases] = await Promise.all([
    gameService.getFeaturedGames(),
    gameService.getTrendingGames(),
    gameService.getNewReleases(),
  ])

  let favoritedIds: string[] = []
  if (session?.user?.id) {
    favoritedIds = await getFavoritedGameIds(session.user.id)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-[1400px] mx-auto px-4 lg:px-8 py-8 space-y-12">
        {/* Hero */}
        <section className="border-pv border-pv-border rounded-pv p-8 bg-pv-card">
          <h1 className="font-display text-4xl lg:text-5xl font-extrabold text-pv-text">
            Discover Indie Games
          </h1>
          <p className="mt-3 text-pv-muted max-w-lg">
            PlayVault is a community-driven platform to discover, share, and
            play indie games. No hosting — just great games with external links.
          </p>
          <div className="mt-6">
            <SearchBar />
          </div>
        </section>

        {/* Featured */}
        <section>
          <h2 className="font-display text-2xl font-bold text-pv-text mb-4">
            Featured Games
          </h2>
          {featured.length > 0 ? (
            <GameGrid games={featured} favoritedIds={favoritedIds} />
          ) : (
            <p className="text-sm text-pv-muted">No featured games yet.</p>
          )}
        </section>

        {/* Trending */}
        <section>
          <h2 className="font-display text-2xl font-bold text-pv-text mb-4">
            Trending Now
          </h2>
          {trending.length > 0 ? (
            <GameGrid games={trending} favoritedIds={favoritedIds} />
          ) : (
            <p className="text-sm text-pv-muted">No trending games yet.</p>
          )}
        </section>

        {/* New Releases */}
        <section>
          <h2 className="font-display text-2xl font-bold text-pv-text mb-4">
            New Releases
          </h2>
          {newReleases.length > 0 ? (
            <GameGrid games={newReleases} favoritedIds={favoritedIds} />
          ) : (
            <p className="text-sm text-pv-muted">No games yet.</p>
          )}
        </section>

        {/* Browse All */}
        <section className="text-center pb-8">
          <Link
            href="/games"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wide border-pv border-pv-border rounded-pv-sm bg-pv-primary text-[#111] hover:bg-[#e05e00] transition-colors"
          >
            Browse All Games
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  )
}
