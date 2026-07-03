interface GameListItem {
  id: string
  title: string
  genre: string
  _count: { favorites: number }
}

interface GameListRowProps {
  game: GameListItem
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export function GameListRow({ game, onEdit, onDelete }: GameListRowProps) {
  return (
    <div className="flex items-center justify-between py-3 px-4 border-b border-pv-border last:border-b-0">
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium text-pv-text">{game.title}</span>
        <span className="text-xs text-pv-muted">
          {game.genre} · {game._count.favorites} favorites
        </span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(game.id)}
          className="px-3 py-1 text-xs font-bold uppercase tracking-wide border-pv border-pv-border rounded-pv-sm bg-pv-card text-pv-text hover:bg-pv-bg transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(game.id)}
          className="px-3 py-1 text-xs font-bold uppercase tracking-wide border-pv border-pv-border rounded-pv-sm bg-pv-card text-pv-heart hover:bg-pv-bg transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
