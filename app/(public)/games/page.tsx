import type { Metadata } from "next"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { GameGrid } from "@/components/games/game-grid"
import { GenreBadge } from "@/components/games/genre-badge"
import { SearchBar } from "@/components/games/search-bar"
import { auth } from "@/lib/auth"
import { getFavoritedGameIds } from "@/services/favorite-service"
import * as gameService from "@/services/game-service"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Browse Games — PlayVault",
  description: "Browse and search indie games on PlayVault.",
}

export default async function BrowsePage(props: {
  searchParams: Promise<{ search?: string; genre?: string }>
}) {
  const searchParams = await props.searchParams
  const session = await auth()

  const games = await gameService.getGames({
    search: searchParams.search,
    genre: searchParams.genre,
  })

  let favoritedIds: string[] = []
  if (session?.user?.id) {
    favoritedIds = await getFavoritedGameIds(session.user.id)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-[1400px] mx-auto px-4 lg:px-8 py-8 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h1 className="font-display text-3xl font-bold text-pv-text">
            Browse Games
          </h1>
          <SearchBar />
        </div>

        {/* Genre filter */}
        <div className="flex flex-wrap gap-2">
          <Link href="/games">
            <GenreBadge
              genre="All"
              active={!searchParams.genre}
            />
          </Link>
          {gameService.GENRES.map((g) => (
            <Link key={g} href={`/games?genre=${encodeURIComponent(g)}`}>
              <GenreBadge genre={g} active={searchParams.genre === g} />
            </Link>
          ))}
        </div>

        {searchParams.search && (
          <p className="text-sm text-pv-muted">
            Results for &quot;{searchParams.search}&quot;
          </p>
        )}

        <GameGrid games={games} favoritedIds={favoritedIds} />
      </main>
      <Footer />
    </div>
  )
}
