import { GameGrid } from "@/components/games/game-grid"
import { HeroBanner } from "@/components/games/hero-banner"
import { SectionHeader } from "@/components/games/section-header"
import { auth } from "@/lib/auth"
import { getFavoritedGameIds } from "@/server/services/favorite-service"
import * as gameService from "@/server/services/game-service"

async function safeFetch<T>(
  fn: () => Promise<T>,
  fallback: T
): Promise<T> {
  try {
    return await fn()
  } catch {
    return fallback
  }
}

export default async function HomePage() {
  const session = await auth()

  const [featured, trending, newReleases] = await Promise.all([
    safeFetch(() => gameService.getFeaturedGames(), []),
    safeFetch(() => gameService.getTrendingGames(), []),
    safeFetch(() => gameService.getNewReleases(), []),
  ])

  let favoritedIds: string[] = []
  if (session?.user?.id) {
    try {
      favoritedIds = await getFavoritedGameIds(session.user.id)
    } catch {}
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
      <HeroBanner />

      <section className="mb-12">
        <SectionHeader title="Featured Games" href="/games" />
        <GameGrid games={featured} favoritedIds={favoritedIds} />
      </section>

      <section className="mb-12">
        <SectionHeader title="Trending Now" href="/games" />
        <GameGrid games={trending} favoritedIds={favoritedIds} />
      </section>

      <section className="mb-12">
        <SectionHeader title="New Releases" href="/games" />
        <GameGrid games={newReleases} favoritedIds={favoritedIds} />
      </section>
    </div>
  )
}
