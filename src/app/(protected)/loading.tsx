import { StatCardSkeleton } from "@/components/ui/skeleton"

export default function ProtectedLoading() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-8 space-y-8">
      <div className="h-8 w-48 bg-pv-card border-pv border-pv-border rounded-pv animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>
    </div>
  )
}
