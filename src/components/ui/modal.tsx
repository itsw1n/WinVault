'use client'

import { useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useModal } from '@/hooks/use-modal'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  hideCloseButton?: boolean
}

const sizeClasses: Record<string, string> = {
  sm: 'max-w-[400px]',
  md: 'max-w-[560px]',
  lg: 'max-w-[720px]',
}

export { useModal }

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  size = 'md',
  hideCloseButton = false,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }

      if (e.key === 'Tab' && dialogRef.current) {
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
    if (!open) return
    previousActiveElement.current = document.activeElement as HTMLElement
    document.addEventListener('keydown', handleKeyDown)

    const prev = Number(document.body.dataset.scrollLock) || 0
    document.body.dataset.scrollLock = String(prev + 1)
    document.body.style.overflow = 'hidden'

    requestAnimationFrame(() => {
      const firstFocusable = dialogRef.current?.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      firstFocusable?.focus()
    })

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      const count = Math.max(0, (Number(document.body.dataset.scrollLock) || 0) - 1)
      document.body.dataset.scrollLock = String(count)
      if (count === 0) document.body.style.overflow = ''
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
        className={`relative w-full rounded-pv border-[2.5px] border-pv-border bg-pv-card ${sizeClasses[size]} flex max-h-[80vh] translate-y-0 flex-col opacity-100 transition-all duration-200`}
        style={{
          animation: 'modal-in 200ms ease-out',
        }}
      >
        <div className="flex shrink-0 items-start justify-between border-b-[2px] border-pv-border p-4">
          <div className="min-w-0">
            <h2 className="truncate font-display text-[16px] font-bold text-pv-text">{title}</h2>
            {description && <p className="mt-1 text-[12px] text-pv-muted">{description}</p>}
          </div>
          {!hideCloseButton && (
            <button
              onClick={onClose}
              aria-label="Close"
              className="ml-3 flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-pv-sm border-[2px] border-pv-border bg-pv-card text-pv-text transition-colors hover:bg-pv-bg"
            >
              <i className="ti ti-x text-[16px]" aria-hidden="true" />
            </button>
          )}
        </div>
        <div className="overflow-y-auto p-4">{children}</div>
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
