import { GameGrid } from '@/features/games/components/game-grid'
import { HeroBanner } from '@/components/layout/hero-banner'
import { SectionHeader } from '@/components/ui'
import { auth } from '@/lib/nextauth/auth'
import { getFavoritedGameIds } from '@/features/games/server/queries'
import * as gameService from '@/features/games/server/queries'
import { wrap } from '@/lib/errors'

export default async function HomePage() {
  const session = await auth()

  const [featured, trending, newReleases] = await Promise.all([
    wrap(() => gameService.getFeaturedGames()),
    wrap(() => gameService.getTrendingGames()),
    wrap(() => gameService.getNewReleases()),
  ])

  let favoritedIds: string[] = []
  if (session?.user?.id) {
    const favResult = await wrap(() => getFavoritedGameIds(session.user.id))
    if (favResult.success) favoritedIds = favResult.data
  }

  return (
    <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
      <HeroBanner />

      <section className="mb-12">
        <SectionHeader title="Featured Games" href="/games" />
        <GameGrid
          games={featured.success ? featured.data : []}
          favoritedIds={favoritedIds}
          loggedIn={!!session?.user}
        />
      </section>

      <section className="mb-12">
        <SectionHeader title="Trending Now" href="/games" />
        <GameGrid
          games={trending.success ? trending.data : []}
          favoritedIds={favoritedIds}
          loggedIn={!!session?.user}
        />
      </section>

      <section className="mb-12">
        <SectionHeader title="New Releases" href="/games" />
        <GameGrid
          games={newReleases.success ? newReleases.data : []}
          favoritedIds={favoritedIds}
          loggedIn={!!session?.user}
        />
      </section>
    </div>
  )
}
