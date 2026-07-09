import Link from "next/link"
import { FavoriteButton } from "./favorite-button"
import { Thumbnail } from "./thumbnail"
import { Button } from "@/components/ui/button"
import { clsx } from "clsx"
import type { Game } from "@/types"

const GENRE_ICONS: Record<string, string> = {
  Action: "ti-sword",
  Adventure: "ti-balloon",
  Puzzle: "ti-puzzle",
  RPG: "ti-sword",
  Simulation: "ti-cpu",
  Strategy: "ti-chess",
  Sports: "ti-ball-baseball",
  Racing: "ti-car",
  Horror: "ti-ghost",
  Platformer: "ti-stairs",
  Shooter: "ti-crosshair",
  Fighting: "ti-fist",
  Rhythm: "ti-music",
  "Visual Novel": "ti-book",
  Other: "ti-gamepad",
}

function getGenreIcon(genre: string): string {
  return GENRE_ICONS[genre] ?? "ti-gamepad"
}

interface GameCardProps extends Game {
  isFavorited?: boolean
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
  className,
}: GameCardProps) {
  return (
    <div
      className={clsx(
        "border-[2.5px] border-pv-border rounded-pv bg-pv-card overflow-hidden flex flex-col",
        className
      )}
    >
      <Link href={`/games/${id}`} className="flex flex-col flex-1">
        <div className="bg-pv-border h-[100px] relative p-2 overflow-hidden shrink-0">
          <Thumbnail src={thumbnailUrl} alt={title} className="w-full h-full object-cover" />
          <span className="bg-pv-primary text-[#111111] text-[10px] font-bold tracking-[0.03em] px-2 py-0.5 rounded-[4px] uppercase absolute top-2 left-2">
            {genre}
          </span>
          <i
            className={`ti ${getGenreIcon(genre)} absolute bottom-2 right-2 text-pv-primary text-[22px]`}
            aria-hidden="true"
          />
        </div>
        <div className="p-3 flex-1">
          <h3 className="font-display font-bold text-[15px] text-pv-text mt-0 mb-0.5 truncate">
            {title}
          </h3>
          <p className="text-[12px] text-pv-muted mb-1.5">by {owner.username}</p>
          {shortDescription && (
            <p className="text-[12px] text-pv-muted leading-[1.4] line-clamp-2 break-words">
              {shortDescription}
            </p>
          )}
        </div>
      </Link>
      <div className="px-3 pb-3 flex gap-2 shrink-0">
        <FavoriteButton gameId={id} isFavorited={!!isFavorited} />
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
