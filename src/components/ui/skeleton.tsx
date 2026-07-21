import { cn } from '@/lib/utils'

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn('animate-pulse rounded-pv border-pv border-pv-border bg-pv-card', className)}
    />
  )
}

export function GameCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-pv border-pv border-pv-border bg-pv-card">
      <Skeleton className="h-[100px] rounded-none border-0" />
      <div className="space-y-2 p-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-3 w-full" />
      </div>
      <div className="flex gap-2 px-3 pb-3">
        <Skeleton className="h-[34px] w-[34px] rounded-pv-sm" />
        <Skeleton className="h-[34px] flex-1 rounded-pv-sm" />
      </div>
    </div>
  )
}

export function GameGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <GameCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function HeroSkeleton() {
  return (
    <div className="space-y-4 rounded-[10px] border-[3px] border-pv-border bg-pv-primary p-5">
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-8 w-96" />
      <Skeleton className="h-5 w-80" />
      <Skeleton className="h-10 w-64" />
    </div>
  )
}

export function StatCardSkeleton() {
  return (
    <div className="space-y-2 rounded-pv border-pv border-pv-border bg-pv-card p-4">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-8 w-12" />
    </div>
  )
}
