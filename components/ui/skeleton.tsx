import { clsx } from "clsx"

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        "bg-pv-card border-pv border-pv-border rounded-pv animate-pulse",
        className
      )}
    />
  )
}

export function GameCardSkeleton() {
  return (
    <div className="bg-pv-card border-pv border-pv-border rounded-pv overflow-hidden">
      <Skeleton className="aspect-[16/9] rounded-none border-0" />
      <div className="p-3 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <div className="flex justify-between">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-3 w-12" />
      </div>
    </div>
  )
}

export function GameGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <GameCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function HeroSkeleton() {
  return (
    <div className="border-pv border-pv-border rounded-pv p-8 bg-pv-card space-y-4">
      <Skeleton className="h-12 w-96" />
      <Skeleton className="h-5 w-80" />
      <Skeleton className="h-10 w-64" />
    </div>
  )
}

export function StatCardSkeleton() {
  return (
    <div className="bg-pv-card border-pv border-pv-border rounded-pv p-4 space-y-2">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-8 w-12" />
    </div>
  )
}
