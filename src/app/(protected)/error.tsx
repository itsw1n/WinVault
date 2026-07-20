"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function ProtectedError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => { console.error(error) }, [error])

  return (
    <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-8 text-center space-y-4">
      <h1 className="font-display text-2xl font-bold text-pv-text">
        Something went wrong
      </h1>
      <p className="text-sm text-pv-muted">
        An unexpected error occurred. Please try again.
      </p>
      <Button variant="default" onClick={reset}>
        Try Again
      </Button>
    </div>
  )
}
