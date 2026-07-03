"use client"

import { Button } from "@/components/ui/button"
import { useEffect } from "react"

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
    <div className="min-h-screen flex items-center justify-center bg-pv-bg px-4">
      <div className="bg-pv-card border-pv border-pv-border rounded-pv p-8 max-w-md text-center space-y-4">
        <h1 className="font-display text-2xl font-bold text-pv-text">
          Something went wrong
        </h1>
        <p className="text-sm text-pv-muted">
          An unexpected error occurred. Try refreshing the page.
        </p>
        <Button variant="primary" onClick={reset}>
          Try Again
        </Button>
      </div>
    </div>
  )
}
