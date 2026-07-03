import { HeroSkeleton, GameGridSkeleton } from "@/components/ui/skeleton"

export default function HomeLoading() {
  return (
    <div className="min-h-screen flex flex-col bg-pv-bg">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-8 space-y-12">
        <HeroSkeleton />
        <div className="space-y-4">
          <div className="h-7 w-48 bg-pv-card border-pv border-pv-border rounded-pv animate-pulse" />
          <GameGridSkeleton count={4} />
        </div>
        <div className="space-y-4">
          <div className="h-7 w-48 bg-pv-card border-pv border-pv-border rounded-pv animate-pulse" />
          <GameGridSkeleton count={4} />
        </div>
        <div className="space-y-4">
          <div className="h-7 w-48 bg-pv-card border-pv border-pv-border rounded-pv animate-pulse" />
          <GameGridSkeleton count={4} />
        </div>
      </div>
    </div>
  )
}
