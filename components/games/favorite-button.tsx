"use client"

import { useRouter } from "next/navigation"
import { toggleFavorite } from "@/actions/favorites"
import { useFormStatus } from "react-dom"

function SubmitIcon({ isFavorited }: { isFavorited: boolean }) {
  const { pending } = useFormStatus()
  return (
    <i
      className={`ti ${isFavorited ? "ti-heart-filled" : "ti-heart"} ${pending ? "opacity-50" : ""}`}
      aria-hidden="true"
      style={{ fontSize: "16px" }}
    />
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
  const label = isFavorited ? "Remove from favorites" : "Add to favorites"

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
        aria-label={label}
        className="w-[34px] h-[34px] flex items-center justify-center border-[2px] border-pv-border rounded-pv-sm bg-pv-card text-pv-heart hover:bg-pv-bg transition-colors"
      >
        <SubmitIcon isFavorited={isFavorited} />
      </button>
    </form>
  )
}
