"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { createPortal } from "react-dom"

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  children: React.ReactNode
  size?: "sm" | "md" | "lg"
  hideCloseButton?: boolean
}

const sizeClasses: Record<string, string> = {
  sm: "max-w-[400px]",
  md: "max-w-[560px]",
  lg: "max-w-[720px]",
}

export function useModal() {
  const [open, setOpen] = useState(false)
  return {
    open,
    openModal: () => setOpen(true),
    closeModal: () => setOpen(false),
  }
}

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  size = "md",
  hideCloseButton = false,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
        return
      }

      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (focusable.length === 0) return

        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last.focus()
          }
        } else {
          if (document.activeElement === last || document.activeElement === dialogRef.current) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (open) {
      previousActiveElement.current = document.activeElement as HTMLElement
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"

      requestAnimationFrame(() => {
        const firstFocusable = dialogRef.current?.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        firstFocusable?.focus()
      })
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
      previousActiveElement.current?.focus()
    }
  }, [open, handleKeyDown])

  if (!open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="fixed inset-0 bg-black/50 transition-opacity duration-200"
        onClick={onClose}
      />
      <div
        ref={dialogRef}
        className={`relative bg-pv-card border-[2.5px] border-pv-border rounded-pv w-full ${sizeClasses[size]} max-h-[80vh] flex flex-col transition-all duration-200 translate-y-0 opacity-100`}
        style={{
          animation: "modal-in 200ms ease-out",
        }}
      >
        <div className="flex items-start justify-between p-4 border-b-[2px] border-pv-border shrink-0">
          <div className="min-w-0">
            <h2 className="font-display font-bold text-[16px] text-pv-text truncate">
              {title}
            </h2>
            {description && (
              <p className="text-[12px] text-pv-muted mt-1">{description}</p>
            )}
          </div>
          {!hideCloseButton && (
            <button
              onClick={onClose}
              aria-label="Close"
              className="w-[32px] h-[32px] flex items-center justify-center border-[2px] border-pv-border rounded-pv-sm bg-pv-card text-pv-text hover:bg-pv-bg transition-colors shrink-0 ml-3"
            >
              <i className="ti ti-x text-[16px]" aria-hidden="true" />
            </button>
          )}
        </div>
        <div className="p-4 overflow-y-auto">{children}</div>
      </div>
      <style jsx>{`
        @keyframes modal-in {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>,
    document.body
  )
}
