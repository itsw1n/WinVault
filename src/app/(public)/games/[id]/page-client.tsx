"use client"

import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { toggleFavorite } from "@/features/games/actions/crud"
import { useState, useEffect } from "react"

interface GameDetailClientProps {
  gameId: string
  externalUrl: string
  isFavorited: boolean
  action?: string
}

export function GameDetailClient({
  gameId,
  externalUrl,
  isFavorited: initialFav,
  action,
}: GameDetailClientProps) {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [isFavorited, setIsFavorited] = useState(initialFav)

  useEffect(() => {
    if (status !== "authenticated") return
    if (action === "play") {
      window.open(externalUrl, "_blank")
      router.replace(`/games/${gameId}`)
    }
    if (action === "favorite") {
      toggleFavorite(gameId)
      setIsFavorited(true)
      router.replace(`/games/${gameId}`)
    }
  }, [status, action, gameId, externalUrl, router])

  function handlePlay() {
    if (status === "loading") return
    if (status !== "authenticated") {
      router.push(
        `/sign-in?callbackUrl=/games/${gameId}?action=play`
      )
      return
    }
    window.open(externalUrl, "_blank")
  }

  async function handleFavorite() {
    if (status === "loading") return
    if (status !== "authenticated") {
      router.push(
        `/sign-in?callbackUrl=/games/${gameId}?action=favorite`
      )
      return
    }
    const result = await toggleFavorite(gameId)
    if (result.success) {
      setIsFavorited(result.data.favorited)
    }
  }

  return (
    <div className="flex gap-3 pt-2">
      <Button variant="default" onClick={handlePlay}>
        Play
      </Button>
      <Button
        variant="inactive"
        onClick={handleFavorite}
      >
        {isFavorited ? "♥ Favorited" : "♡ Favorite"}
      </Button>
    </div>
  )
}
