"use client"

import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { useModal } from "@/components/ui/modal"

export function SignOutButton({ className }: { className?: string }) {
  const { open, openModal, closeModal } = useModal()

  async function handleConfirm() {
    await signOut()
  }

  return (
    <>
      <Button type="button" variant="default" size="sm" className={className} onClick={openModal}>
        SIGN OUT
      </Button>
      <ConfirmDialog
        open={open}
        onClose={closeModal}
        onConfirm={handleConfirm}
        title="Sign Out"
        message="Are you sure you want to sign out?"
        confirmLabel="Sign Out"
        cancelLabel="Cancel"
      />
    </>
  )
}
