"use client";

import { Modal, useModal } from "@/components/ui/modal";
import { CreateGameForm } from "@/features/games/components/create-game-form";
import { Button } from "@/components/ui/button";

export function DashboardHeader() {
  const { open, openModal, closeModal } = useModal();

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold text-pv-text">
          Dashboard
        </h1>

        <Button variant="default" size="sm" onClick={openModal}>
          + New Game
        </Button>
      </div>

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
  );
}
