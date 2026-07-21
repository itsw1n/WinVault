'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui'

export default function ProtectedError({
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
    <div className="mx-auto max-w-[1400px] space-y-4 px-4 py-8 text-center lg:px-8">
      <h1 className="font-display text-2xl font-bold text-pv-text">Something went wrong</h1>
      <p className="text-sm text-pv-muted">An unexpected error occurred. Please try again.</p>
      <Button variant="default" onClick={reset}>
        Try Again
      </Button>
    </div>
  )
}
