import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface FavoritedGame {
  game: {
    id: string
    title: string
    thumbnailUrl: string
    genre: string
    externalUrl: string
    owner: { username: string }
    _count: { favorites: number }
  }
  createdAt: Date
}

interface FavoritesGridProps {
  favorites: FavoritedGame[]
  onUnfavorite: (gameId: string) => void
}

export function FavoritesGrid({ favorites, onUnfavorite }: FavoritesGridProps) {
  if (favorites.length === 0) {
    return (
      <Card className="p-6 text-center">
        <p className="text-sm text-pv-muted">
          You haven&apos;t favorited any games yet.
        </p>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {favorites.map((fav) => (
        <Card key={fav.game.id} className="overflow-hidden">
          <div className="aspect-[16/9] bg-pv-bg overflow-hidden">
            {fav.game.thumbnailUrl ? (
              <img
                src={fav.game.thumbnailUrl}
                alt={fav.game.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-pv-muted text-sm font-bold uppercase">
                No image
              </div>
            )}
          </div>
          <div className="p-3 space-y-2">
            <Link href={`/games/${fav.game.id}`}>
              <h3 className="font-display font-bold text-sm text-pv-text hover:text-pv-primary transition-colors">
                {fav.game.title}
              </h3>
            </Link>
            <div className="flex items-center justify-between">
              <Badge>{fav.game.genre}</Badge>
              <span className="text-xs text-pv-muted">
                by {fav.game.owner.username}
              </span>
            </div>
            <div className="flex gap-2">
              <a
                href={fav.game.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button variant="default" className="w-full text-xs">
                  Play
                </Button>
              </a>
              <Button
                variant="inactive"
                className="text-xs"
                onClick={() => onUnfavorite(fav.game.id)}
              >
                Unfavorite
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
