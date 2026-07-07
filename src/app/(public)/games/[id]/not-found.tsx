import Link from "next/link"

export default function GameNotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-pv-bg">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-16">
        <div className="bg-pv-card border-pv border-pv-border rounded-pv p-8 max-w-md mx-auto text-center space-y-4">
          <h1 className="font-display text-2xl font-bold text-pv-text">
            Game Not Found
          </h1>
          <p className="text-sm text-pv-muted">
            This game doesn&apos;t exist or has been removed.
          </p>
          <Link
            href="/games"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-bold uppercase tracking-wide border-pv border-pv-border rounded-pv-sm bg-pv-primary text-[#111] hover:bg-[#e05e00] transition-colors"
          >
            Browse Games
          </Link>
        </div>
      </div>
    </div>
  )
}
