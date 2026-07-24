import { useState } from 'react'

/** Hook for managing a modal's open/close state. */
export function useModal() {
  const [open, setOpen] = useState(false)
  return {
    open,
    openModal: () => setOpen(true),
    closeModal: () => setOpen(false),
  }
}
