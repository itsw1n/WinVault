'use client'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui'
import { toggleFavorite } from '@/features/games/server/actions'
import { useState } from 'react'

interface GameDetailActionsProps {
  gameId: string
  externalUrl: string
  isFavorited: boolean
}

export function GameDetailActions({
  gameId,
  externalUrl,
  isFavorited: initialFav,
}: GameDetailActionsProps) {
  const router = useRouter()
  const { status } = useSession()
  const [isFavorited, setIsFavorited] = useState(initialFav)

  function handlePlay() {
    window.open(externalUrl, '_blank')
  }

  async function handleFavorite() {
    if (status === 'loading') return
    if (status !== 'authenticated') {
      router.push(`/sign-in?callbackUrl=/games/${gameId}`)
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
      <Button variant="inactive" onClick={handleFavorite}>
        {isFavorited ? '♥ Favorited' : '♡ Favorite'}
      </Button>
    </div>
  )
}
