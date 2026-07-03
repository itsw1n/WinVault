import { Badge } from "@/components/ui/badge"

interface GenreBadgeProps {
  genre: string
  active?: boolean
  onClick?: () => void
}

export function GenreBadge({ genre, active, onClick }: GenreBadgeProps) {
  const content = (
    <Badge
      className={
        active
          ? "bg-pv-primary text-[#111] border-pv-primary cursor-pointer"
          : "bg-pv-card text-pv-text cursor-pointer hover:bg-pv-bg transition-colors"
      }
    >
      {genre}
    </Badge>
  )

  if (onClick) {
    return <button onClick={onClick}>{content}</button>
  }

  return content
}
