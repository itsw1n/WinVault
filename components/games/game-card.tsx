import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { clsx } from "clsx"

interface GameCardProps {
  id: string
  title: string
  thumbnailUrl: string
  genre: string
  owner: { username: string }
  _count: { favorites: number }
  isFavorited?: boolean
  className?: string
}

export function GameCard({
  id,
  title,
  thumbnailUrl,
  genre,
  owner,
  _count,
  isFavorited,
  className,
}: GameCardProps) {
  return (
    <Link href={`/games/${id}`}>
      <Card
        className={clsx(
          "group overflow-hidden transition-transform hover:-translate-y-0.5",
          className
        )}
      >
        <div className="aspect-[16/9] bg-pv-bg overflow-hidden">
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-pv-muted text-sm font-bold uppercase">
              No image
            </div>
          )}
        </div>
        <div className="p-3 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display font-bold text-sm text-pv-text truncate">
              {title}
            </h3>
          </div>
          <div className="flex items-center justify-between">
            <Badge>{genre}</Badge>
            <span className="text-xs text-pv-muted">by {owner.username}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-pv-muted">
            <span
              className={clsx(
                isFavorited ? "text-pv-heart" : "text-pv-muted"
              )}
            >
              ♥
            </span>
            <span>{_count.favorites}</span>
          </div>
        </div>
      </Card>
    </Link>
  )
}
