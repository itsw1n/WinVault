"use client"

import { useRouter } from "next/navigation"
import { Modal, useModal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { GamesList } from "@/features/dashboard/components/games-list"
import { FavoritesGrid } from "@/features/games/components/favorites-grid"
import { CreateGameForm } from "@/features/dashboard/components/create-game-form"
import type { Game, FavoriteGame } from "@/types"
import { deleteGame, toggleFavorite } from "@/features/games/server/actions"

export function DashboardNewGameButton() {
  const { open, openModal, closeModal } = useModal()

  return (
    <>
      <Button variant="default" size="sm" onClick={openModal}>
        + New Game
      </Button>
      <Modal
        open={open}
        onClose={closeModal}
        title="Publish a game"
        description="Fill in the details below. Players will see this on your game card."
        size="md"
      >
        <CreateGameForm onSuccess={closeModal} />
      </Modal>
    </>
  )
}

export function DashboardActions({ games }: { games: Game[] }) {
  const router = useRouter()

  async function handleDelete(id: string) {
    await deleteGame(id)
    router.refresh()
  }

  return <GamesList games={games} onDelete={handleDelete} />
}

export function DashboardFavorites({ favorites }: { favorites: FavoriteGame[] }) {
  const router = useRouter()

  async function handleUnfavorite(gameId: string) {
    await toggleFavorite(gameId)
    router.refresh()
  }

  return <FavoritesGrid favorites={favorites} onUnfavorite={handleUnfavorite} />
}
