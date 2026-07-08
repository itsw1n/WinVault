import type { Metadata } from "next"
import { GameGrid } from "@/features/games/components/game-grid"

import { Button } from "@/components/ui/button"
import { auth } from "@/lib/auth"
import { getFavoritedGameIds } from "@/features/games/utils/queries"
import { GENRES } from "@/features/games/validation/schemas"
import * as gameService from "@/features/games/utils/queries"
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
    <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-8 space-y-6">
        <h1 className="font-display text-3xl font-bold text-pv-text">
          Browse Games
        </h1>

        {/* Genre filter */}
        <div className="flex flex-wrap gap-2">
          <Button variant={!searchParams.genre ? "active" : "inactive"} size="sm" asChild>
            <Link href="/games">All</Link>
          </Button>
          {GENRES.map((g) => (
            <Button key={g} variant={searchParams.genre === g ? "active" : "inactive"} size="sm" asChild>
              <Link href={`/games?genre=${encodeURIComponent(g)}`}>{g}</Link>
            </Button>
          ))}
        </div>

        {searchParams.search && (
          <p className="text-sm text-pv-muted">
            Results for &quot;{searchParams.search}&quot;
          </p>
        )}

        <GameGrid games={games} favoritedIds={favoritedIds} />
      </div>
  )
}
