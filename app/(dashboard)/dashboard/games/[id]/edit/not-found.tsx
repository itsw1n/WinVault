import Link from "next/link"

export default function EditGameNotFound() {
  return (
    <div className="max-w-lg mx-auto py-16">
      <div className="bg-pv-card border-pv border-pv-border rounded-pv p-8 text-center space-y-4">
        <h1 className="font-display text-2xl font-bold text-pv-text">
          Game Not Found
        </h1>
        <p className="text-sm text-pv-muted">
          This game doesn&apos;t exist or you don&apos;t have permission to edit
          it.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-bold uppercase tracking-wide border-pv border-pv-border rounded-pv-sm bg-pv-primary text-[#111] hover:bg-[#e05e00] transition-colors"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  )
}
