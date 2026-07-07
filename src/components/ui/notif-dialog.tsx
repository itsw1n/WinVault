"use client"

import { Modal } from "./modal"
import { Button } from "./button"

interface NotifDialogProps {
  open: boolean
  onClose: () => void
  title: string
  message: string
  okLabel?: string
}

export function NotifDialog({
  open,
  onClose,
  title,
  message,
  okLabel = "Okay",
}: NotifDialogProps) {
  return (
    <Modal open={open} onClose={onClose} title={title} size="sm" hideCloseButton>
      <p className="text-sm text-pv-text leading-relaxed mb-6">{message}</p>
      <div className="flex justify-end">
        <Button variant="inactive" size="sm" onClick={onClose}>
          {okLabel}
        </Button>
      </div>
    </Modal>
  )
}
