'use client'

import { Card, Badge, Button } from '@/components/ui'
import Link from 'next/link'
import Image from 'next/image'
import type { FavoriteGame } from '@/types'

interface FavoritesGridProps {
  favorites: FavoriteGame[]
  onUnfavorite: (gameId: string) => void
}

export function FavoritesGrid({ favorites, onUnfavorite }: FavoritesGridProps) {
  if (favorites.length === 0) {
    return (
      <Card className="p-6 text-center">
        <p className="text-sm text-pv-muted">You haven&apos;t favorited any games yet.</p>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {favorites.map((fav) => (
        <Card key={fav.game.id} className="overflow-hidden">
          <div className="relative aspect-[16/9] overflow-hidden bg-pv-bg">
            {fav.game.thumbnailUrl ? (
              <Image
                src={fav.game.thumbnailUrl}
                alt={fav.game.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm font-bold uppercase text-pv-muted">
                No image
              </div>
            )}
          </div>
          <div className="space-y-2 p-3">
            <Link href={`/games/${fav.game.id}`}>
              <h3 className="font-display text-sm font-bold text-pv-text transition-colors hover:text-pv-primary">
                {fav.game.title}
              </h3>
            </Link>
            <div className="flex items-center justify-between">
              <Badge>{fav.game.genre}</Badge>
              <span className="text-xs text-pv-muted">by {fav.game.owner.username}</span>
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
