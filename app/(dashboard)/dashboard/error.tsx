"use client"

import { Button } from "@/components/ui/button"
import { useEffect } from "react"

export default function DashboardError({
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
    <div className="flex items-center justify-center py-16">
      <div className="bg-pv-card border-pv border-pv-border rounded-pv p-8 max-w-md text-center space-y-4">
        <h1 className="font-display text-2xl font-bold text-pv-text">
          Dashboard Error
        </h1>
        <p className="text-sm text-pv-muted">
          Something went wrong loading your dashboard. Try again.
        </p>
        <Button variant="default" onClick={reset}>
          Try Again
        </Button>
      </div>
    </div>
  )
}
