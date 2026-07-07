import { HeroSkeleton, GameGridSkeleton } from "@/components/ui/skeleton"
import { SectionHeader } from "@/components/games/section-header"

export default function HomeLoading() {
  return (
    <div className="min-h-screen flex flex-col bg-pv-bg">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-8 space-y-12">
        <HeroSkeleton />
        <section>
          <SectionHeader title="Featured Games" href="/games" />
          <GameGridSkeleton count={4} />
        </section>
        <section>
          <SectionHeader title="Trending Now" href="/games" />
          <GameGridSkeleton count={4} />
        </section>
        <section>
          <SectionHeader title="New Releases" href="/games" />
          <GameGridSkeleton count={4} />
        </section>
      </div>
    </div>
  )
}
