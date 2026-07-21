import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-pv-bg px-4">
      <div className="max-w-md space-y-4 rounded-pv border-pv border-pv-border bg-pv-card p-8 text-center">
        <h1 className="font-display text-4xl font-extrabold text-pv-text">404</h1>
        <p className="text-sm text-pv-muted">Page not found.</p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-pv-sm border-pv border-pv-border bg-pv-primary px-4 py-2 text-sm font-bold uppercase tracking-wide text-[#111] transition-colors hover:bg-[#e05e00]"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}
