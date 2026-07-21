'use client'

import { Modal, useModal, Button } from '@/components/ui'
import { GamesList } from '@/features/dashboard/components/games-list'
import { FavoritesGrid } from '@/features/games/components/favorites-grid'
import { CreateGameForm } from '@/features/dashboard/components/create-game-form'
import type { Game, FavoriteGame } from '@/types'
import { deleteGame, toggleFavorite } from '@/features/games/server/actions'

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
  async function handleDelete(id: string) {
    await deleteGame(id)
  }

  return <GamesList games={games} onDelete={handleDelete} />
}

export function DashboardFavorites({ favorites }: { favorites: FavoriteGame[] }) {
  async function handleUnfavorite(gameId: string) {
    await toggleFavorite(gameId)
  }

  return <FavoritesGrid favorites={favorites} onUnfavorite={handleUnfavorite} />
}
