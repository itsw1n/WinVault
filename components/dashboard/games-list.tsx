import { Card } from "@/components/ui/card"
import { GameListRow } from "./game-list-row"

interface Game {
  id: string
  title: string
  genre: string
  _count: { favorites: number }
}

interface GamesListProps {
  games: Game[]
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export function GamesList({ games, onEdit, onDelete }: GamesListProps) {
  if (games.length === 0) {
    return (
      <Card className="p-6 text-center">
        <p className="text-sm text-pv-muted">You haven't published any games yet.</p>
      </Card>
    )
  }

  return (
    <Card>
      <div className="divide-y divide-pv-border">
        {games.map((game) => (
          <GameListRow
            key={game.id}
            game={game}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </Card>
  )
}
