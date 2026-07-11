"use client"

import { Modal, useModal } from "@/components/ui/modal"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { Button } from "@/components/ui/button"
import { Thumbnail } from "@/components/ui/thumbnail"
import { EditGameForm } from "./edit-game-form"
import type { Game } from "@/types"

interface GameListRowProps {
  game: Game
  onDelete: (id: string) => void
}

export function GameListRow({ game, onDelete }: GameListRowProps) {
  const { open: editOpen, openModal: openEditModal, closeModal: closeEditModal } = useModal()
  const { open: deleteOpen, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal()

  return (
    <>
      <div className="flex items-center justify-between py-3 px-4 border-b border-pv-border last:border-b-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-pv-sm overflow-hidden bg-pv-border shrink-0">
            <Thumbnail src={game.thumbnailUrl} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-sm font-medium text-pv-text truncate">{game.title}</span>
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
        onConfirm={() => { onDelete(game.id); closeDeleteModal() }}
        title="Delete game"
        message={`Are you sure you want to delete "${game.title}"? This cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
      />
    </>
  )
}
