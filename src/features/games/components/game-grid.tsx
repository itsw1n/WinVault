import { GameCard } from "./game-card"
import type { Game } from "@/types"

interface GameGridProps {
  games: Game[]
  favoritedIds?: string[]
}

export function GameGrid({ games, favoritedIds }: GameGridProps) {
  if (games.length === 0) {
    return (
      <p className="text-sm text-pv-muted py-8 text-center">
        No games found.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {games.map((game) => (
        <GameCard
          key={game.id}
          {...game}
          isFavorited={favoritedIds?.includes(game.id)}
        />
      ))}
    </div>
  )
}
