import type { Metadata } from "next"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Thumbnail } from "@/components/ui/thumbnail"
import { auth } from "@/lib/nextauth/auth"
import { getFavoritedGameIds } from "@/features/games/server/queries"
import * as gameService from "@/features/games/server/queries"
import { notFound } from "next/navigation"
import { GameDetailActions } from "@/features/games/components/game-detail-actions"

export async function generateMetadata(props: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  try {
    const params = await props.params
    const game = await gameService.getGameById(params.id)
    return {
      title: `${game.title} — PlayVault`,
      description: game.shortDescription,
    }
  } catch {
    return { title: "Game Not Found — PlayVault" }
  }
}

export default async function GameDetailPage(props: {
  params: Promise<{ id: string }>
}) {
  const params = await props.params
  const session = await auth()

  let game
  try {
    game = await gameService.getGameById(params.id)
  } catch {
    notFound()
  }

  let isFavorited = false
  if (session?.user?.id) {
    isFavorited = await getFavoritedGameIds(session.user.id).then(
      (ids) => ids.includes(game.id)
    )
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Thumbnail */}
          <Card className="overflow-hidden">
            <Thumbnail src={game.thumbnailUrl} alt={game.title} className="w-full aspect-[16/10] object-cover" />
          </Card>

          {/* Info */}
          <div className="space-y-4">
            <div>
              <h1 className="font-display text-3xl lg:text-4xl font-bold text-pv-text">
                {game.title}
              </h1>
              <p className="text-sm text-pv-muted mt-1">
                by {game.owner.username}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Badge>{game.genre}</Badge>
              <span className="text-sm text-pv-muted">
                ♥ {game._count.favorites}
              </span>
            </div>

            {game.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {game.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            )}

            <p className="text-sm text-pv-text leading-relaxed break-words">
              {game.shortDescription}
            </p>

            {game.owner.bio && (
              <p className="text-xs text-pv-muted border-t border-pv-border pt-3">
                About the developer: {game.owner.bio}
              </p>
            )}

            <GameDetailActions
              gameId={game.id}
              externalUrl={game.externalUrl}
              isFavorited={isFavorited}
            />
          </div>
        </div>
      </div>
  )
}
