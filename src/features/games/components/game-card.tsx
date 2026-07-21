import Link from 'next/link'
import { FavoriteButton } from './favorite-button'
import { Thumbnail, Button } from '@/components/ui'
import { cn } from '@/lib/utils'
import type { Game } from '@/types'

const GENRE_ICONS: Record<string, string> = {
  Action: 'ti-sword',
  Adventure: 'ti-balloon',
  Puzzle: 'ti-puzzle',
  RPG: 'ti-sword',
  Simulation: 'ti-cpu',
  Strategy: 'ti-chess',
  Sports: 'ti-ball-baseball',
  Racing: 'ti-car',
  Horror: 'ti-ghost',
  Platformer: 'ti-stairs',
  Shooter: 'ti-crosshair',
  Fighting: 'ti-fist',
  Rhythm: 'ti-music',
  'Visual Novel': 'ti-book',
  Other: 'ti-gamepad',
}

function getGenreIcon(genre: string): string {
  return GENRE_ICONS[genre] ?? 'ti-gamepad'
}

interface GameCardProps extends Game {
  isFavorited?: boolean
  loggedIn?: boolean
  className?: string
}

export function GameCard({
  id,
  title,
  thumbnailUrl,
  shortDescription,
  genre,
  owner,
  isFavorited,
  loggedIn,
  className,
}: GameCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden rounded-pv border-[2.5px] border-pv-border bg-pv-card',
        className
      )}
    >
      <Link href={`/games/${id}`} className="flex flex-1 flex-col">
        <div className="relative h-[200px] shrink-0 overflow-hidden bg-pv-border">
          <Thumbnail src={thumbnailUrl} alt={title} className="h-full w-full object-cover" />
          <span className="absolute left-2 top-2 rounded-[4px] bg-pv-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.03em] text-[#111111]">
            {genre}
          </span>
          <i
            className={`ti ${getGenreIcon(genre)} absolute bottom-2 right-2 text-[22px] text-pv-primary`}
            aria-hidden="true"
          />
        </div>
        <div className="flex-1 p-3">
          <h3 className="mb-0.5 mt-0 truncate font-display text-[15px] font-bold text-pv-text">
            {title}
          </h3>
          <p className="mb-1.5 text-[12px] text-pv-muted">by {owner.username}</p>
          {shortDescription && (
            <p className="line-clamp-2 break-words text-[12px] leading-[1.4] text-pv-muted">
              {shortDescription}
            </p>
          )}
        </div>
      </Link>
      <div className="flex shrink-0 gap-2 px-3 pb-3">
        <FavoriteButton gameId={id} isFavorited={!!isFavorited} loggedIn={loggedIn} />
        <Button variant="default" size="sm" className="flex-1 gap-1.5" asChild>
          <Link href={`/games/${id}`}>
            <i className="ti ti-player-play text-[14px]" aria-hidden="true" />
            PLAY
          </Link>
        </Button>
      </div>
    </div>
  )
}
