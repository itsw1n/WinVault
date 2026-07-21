'use client'

import { Button } from '@/components/ui'
import { useEffect } from 'react'

export default function PublicError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center bg-pv-bg px-4">
      <div className="max-w-md space-y-4 rounded-pv border-pv border-pv-border bg-pv-card p-8 text-center">
        <h1 className="font-display text-2xl font-bold text-pv-text">Something went wrong</h1>
        <p className="text-sm text-pv-muted">
          An unexpected error occurred. Try refreshing the page.
        </p>
        <Button variant="default" onClick={reset}>
          Try Again
        </Button>
      </div>
    </div>
  )
}
