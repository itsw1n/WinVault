import { HeroSkeleton, GameGridSkeleton, SectionHeader } from '@/components/ui'

export default function HomeLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-pv-bg">
      <div className="mx-auto max-w-[1400px] space-y-12 px-4 py-8 lg:px-8">
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
