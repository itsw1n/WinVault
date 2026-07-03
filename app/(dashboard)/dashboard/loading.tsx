import { StatCardSkeleton, GameCardSkeleton } from "@/components/ui/skeleton"

export default function DashboardLoading() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="h-9 w-40 bg-pv-card border-pv border-pv-border rounded-pv animate-pulse" />
        <div className="h-10 w-32 bg-pv-card border-pv border-pv-border rounded-pv-sm animate-pulse" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>
      <div className="space-y-4">
        <div className="h-6 w-24 bg-pv-card border-pv border-pv-border rounded-pv animate-pulse" />
        <div className="bg-pv-card border-pv border-pv-border rounded-pv">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-3 px-4 border-b border-pv-border last:border-b-0"
            >
              <div className="space-y-1">
                <div className="h-4 w-40 bg-pv-bg border-pv border-pv-border rounded animate-pulse" />
                <div className="h-3 w-24 bg-pv-bg border-pv border-pv-border rounded animate-pulse" />
              </div>
              <div className="flex gap-2">
                <div className="h-7 w-16 bg-pv-bg border-pv border-pv-border rounded-pv-sm animate-pulse" />
                <div className="h-7 w-16 bg-pv-bg border-pv border-pv-border rounded-pv-sm animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <div className="h-6 w-24 bg-pv-card border-pv border-pv-border rounded-pv animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <GameCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
