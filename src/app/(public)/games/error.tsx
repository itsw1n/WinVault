'use client'

import { Button } from '@/components/ui'
import { useEffect } from 'react'

export default function GamesError({
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
    <div className="flex items-center justify-center bg-pv-bg px-4 py-20">
      <div className="max-w-md space-y-4 rounded-pv border-[2.5px] border-pv-border bg-pv-card p-8 text-center">
        <h1 className="font-display text-2xl font-bold text-pv-text">Couldn&apos;t load games</h1>
        <p className="text-sm text-pv-muted">Something went wrong fetching games. Try again.</p>
        <Button variant="default" onClick={reset}>
          Try Again
        </Button>
      </div>
    </div>
  )
}
