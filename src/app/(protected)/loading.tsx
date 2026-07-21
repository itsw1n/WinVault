import { StatCardSkeleton } from '@/components/ui'

export default function ProtectedLoading() {
  return (
    <div className="mx-auto max-w-[1400px] space-y-8 px-4 py-8 lg:px-8">
      <div className="h-8 w-48 animate-pulse rounded-pv border-pv border-pv-border bg-pv-card" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>
    </div>
  )
}
