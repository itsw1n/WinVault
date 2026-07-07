import { GameGridSkeleton } from "@/components/ui/skeleton"

export default function DeveloperLoading() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-8 space-y-8">
      <div className="border-pv border-pv-border rounded-pv p-6 bg-pv-card flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-pv-bg border-pv border-pv-border animate-pulse" />
        <div className="space-y-1">
          <div className="h-7 w-40 bg-pv-bg border-pv border-pv-border rounded-pv animate-pulse" />
          <div className="h-4 w-60 bg-pv-bg border-pv border-pv-border rounded-pv animate-pulse" />
          <div className="h-3 w-24 bg-pv-bg border-pv border-pv-border rounded-pv animate-pulse" />
        </div>
      </div>
      <div className="space-y-4">
        <div className="h-6 w-40 bg-pv-card border-pv border-pv-border rounded-pv animate-pulse" />
        <GameGridSkeleton count={4} />
      </div>
    </div>
  )
}
