import { GameGridSkeleton } from "@/components/ui/skeleton"

export default function BrowseLoading() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-8 space-y-6">
      <div className="h-9 w-48 bg-pv-card border-pv border-pv-border rounded-pv animate-pulse" />
      <div className="flex gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-6 w-16 bg-pv-card border-pv border-pv-border rounded-pv-sm animate-pulse"
          />
        ))}
      </div>
      <GameGridSkeleton count={8} />
    </div>
  )
}
