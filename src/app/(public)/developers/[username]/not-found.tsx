import Link from 'next/link'

export default function DeveloperNotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-pv-bg">
      <div className="mx-auto max-w-[1400px] px-4 py-16 lg:px-8">
        <div className="mx-auto max-w-md space-y-4 rounded-pv border-pv border-pv-border bg-pv-card p-8 text-center">
          <h1 className="font-display text-2xl font-bold text-pv-text">Developer Not Found</h1>
          <p className="text-sm text-pv-muted">This developer doesn&apos;t exist.</p>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-pv-sm border-pv border-pv-border bg-pv-primary px-4 py-2 text-sm font-bold uppercase tracking-wide text-[#111] transition-colors hover:bg-[#e05e00]"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}
