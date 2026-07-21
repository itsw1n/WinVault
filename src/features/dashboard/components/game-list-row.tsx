'use client'

import { Modal, useModal, ConfirmDialog, Button, Thumbnail } from '@/components/ui'
import { EditGameForm } from './edit-game-form'
import type { Game } from '@/types'

interface GameListRowProps {
  game: Game
  onDelete: (id: string) => void
}

export function GameListRow({ game, onDelete }: GameListRowProps) {
  const { open: editOpen, openModal: openEditModal, closeModal: closeEditModal } = useModal()
  const { open: deleteOpen, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal()

  return (
    <>
      <div className="flex items-center justify-between border-b border-pv-border px-4 py-3 last:border-b-0">
        <div className="flex min-w-0 items-center gap-3">
          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-pv-sm bg-pv-border">
            <Thumbnail src={game.thumbnailUrl} alt="" className="h-full w-full object-cover" />
          </div>
          <div className="flex min-w-0 flex-col gap-0.5">
            <span className="truncate text-sm font-medium text-pv-text">{game.title}</span>
            <span className="text-xs text-pv-muted">
              {game.genre} · {game._count.favorites} favorites
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="inactive" size="sm" onClick={openEditModal}>
            Edit
          </Button>
          <Button variant="destructive" size="sm" onClick={openDeleteModal}>
            Delete
          </Button>
        </div>
      </div>
      <Modal
        open={editOpen}
        onClose={closeEditModal}
        title="Edit game"
        description="Update the details below. Changes go live immediately."
        size="md"
      >
        <EditGameForm game={game} onSuccess={closeEditModal} />
      </Modal>
      <ConfirmDialog
        open={deleteOpen}
        onClose={closeDeleteModal}
        onConfirm={() => {
          onDelete(game.id)
          closeDeleteModal()
        }}
        title="Delete game"
        message={`Are you sure you want to delete "${game.title}"? This cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
      />
    </>
  )
}
