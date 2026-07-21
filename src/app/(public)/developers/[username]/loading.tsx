import { GameGridSkeleton } from '@/components/ui'

export default function DeveloperLoading() {
  return (
    <div className="mx-auto max-w-[1400px] space-y-8 px-4 py-8 lg:px-8">
      <div className="flex items-center gap-4 rounded-pv border-pv border-pv-border bg-pv-card p-6">
        <div className="h-16 w-16 animate-pulse rounded-full border-pv border-pv-border bg-pv-bg" />
        <div className="space-y-1">
          <div className="h-7 w-40 animate-pulse rounded-pv border-pv border-pv-border bg-pv-bg" />
          <div className="h-4 w-60 animate-pulse rounded-pv border-pv border-pv-border bg-pv-bg" />
          <div className="h-3 w-24 animate-pulse rounded-pv border-pv border-pv-border bg-pv-bg" />
        </div>
      </div>
      <div className="space-y-4">
        <div className="h-6 w-40 animate-pulse rounded-pv border-pv border-pv-border bg-pv-card" />
        <GameGridSkeleton count={4} />
      </div>
    </div>
  )
}
