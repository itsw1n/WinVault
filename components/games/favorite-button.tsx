"use client"

import { useRouter } from "next/navigation"
import { toggleFavorite } from "@/actions/favorites"

function HeartIcon({ filled }: { filled: boolean }) {
  if (filled) {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z" />
      </svg>
    )
  }

  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
      <path d="M12 6l-2 4l4 3l-2 4v3" />
    </svg>
  )
}

export function FavoriteButton({
  gameId,
  isFavorited,
}: {
  gameId: string
  isFavorited: boolean
}) {
  const router = useRouter()

  async function handleToggle() {
    const result = await toggleFavorite(gameId)
    if (!result.success && result.code === "UNAUTHORIZED") {
      router.push(`/sign-in?callbackUrl=/games`)
    }
  }

  return (
    <form action={handleToggle} className="shrink-0">
      <button
        type="submit"
        aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
        className="w-[34px] h-[34px] flex items-center justify-center border-[2px] border-pv-border rounded-pv-sm bg-pv-card text-pv-heart hover:bg-pv-bg transition-colors"
      >
        <HeartIcon filled={isFavorited} />
      </button>
    </form>
  )
}
