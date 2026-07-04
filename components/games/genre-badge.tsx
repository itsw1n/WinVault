"use client"

import { Button } from "@/components/ui/button"

interface GenreBadgeProps {
  genre: string
  active?: boolean
  onClick?: () => void
}

export function GenreBadge({ genre, active, onClick }: GenreBadgeProps) {
  return (
    <Button
      variant={active ? "active" : "inactive"}
      size="sm"
      onClick={onClick}
      tabIndex={onClick ? 0 : -1}
    >
      {genre}
    </Button>
  )
}
