import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-pv-bg px-4">
      <div className="bg-pv-card border-pv border-pv-border rounded-pv p-8 max-w-md text-center space-y-4">
        <h1 className="font-display text-4xl font-extrabold text-pv-text">
          404
        </h1>
        <p className="text-sm text-pv-muted">
          Page not found.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-bold uppercase tracking-wide border-pv border-pv-border rounded-pv-sm bg-pv-primary text-[#111] hover:bg-[#e05e00] transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}
