import { GameGridSkeleton } from '@/components/ui'

export default function BrowseLoading() {
  return (
    <div className="mx-auto max-w-[1400px] space-y-6 px-4 py-8 lg:px-8">
      <div className="h-9 w-48 animate-pulse rounded-pv border-pv border-pv-border bg-pv-card" />
      <div className="flex gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-6 w-16 animate-pulse rounded-pv-sm border-pv border-pv-border bg-pv-card"
          />
        ))}
      </div>
      <GameGridSkeleton count={8} />
    </div>
  )
}
