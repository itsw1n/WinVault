import { Skeleton } from '@/components/ui'

export default function GameDetailLoading() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Skeleton className="aspect-[16/10]" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-4 w-1/3" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex gap-1.5">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-5 w-16" />
            ))}
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <div className="flex gap-3 pt-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-28" />
          </div>
        </div>
      </div>
    </div>
  )
}
