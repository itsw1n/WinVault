import { StatCardSkeleton, GameCardSkeleton } from '@/components/ui'

export default function DashboardLoading() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="h-9 w-40 animate-pulse rounded-pv border-pv border-pv-border bg-pv-card" />
        <div className="h-10 w-32 animate-pulse rounded-pv-sm border-pv border-pv-border bg-pv-card" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>
      <div className="space-y-4">
        <div className="h-6 w-24 animate-pulse rounded-pv border-pv border-pv-border bg-pv-card" />
        <div className="rounded-pv border-pv border-pv-border bg-pv-card">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between border-b border-pv-border px-4 py-3 last:border-b-0"
            >
              <div className="space-y-1">
                <div className="h-4 w-40 animate-pulse rounded border-pv border-pv-border bg-pv-bg" />
                <div className="h-3 w-24 animate-pulse rounded border-pv border-pv-border bg-pv-bg" />
              </div>
              <div className="flex gap-2">
                <div className="h-7 w-16 animate-pulse rounded-pv-sm border-pv border-pv-border bg-pv-bg" />
                <div className="h-7 w-16 animate-pulse rounded-pv-sm border-pv border-pv-border bg-pv-bg" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <div className="h-6 w-24 animate-pulse rounded-pv border-pv border-pv-border bg-pv-card" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <GameCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
