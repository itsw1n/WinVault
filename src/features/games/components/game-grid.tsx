import { GameCard } from './game-card'
import type { Game } from '@/types'

interface GameGridProps {
  games: Game[]
  favoritedIds?: string[]
  loggedIn?: boolean
}

export function GameGrid({ games, favoritedIds, loggedIn }: GameGridProps) {
  if (games.length === 0) {
    return <p className="py-8 text-center text-sm text-pv-muted">No games found.</p>
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {games.map((game) => (
        <GameCard
          key={game.id}
          {...game}
          isFavorited={favoritedIds?.includes(game.id)}
          loggedIn={loggedIn}
        />
      ))}
    </div>
  )
}
