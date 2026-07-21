'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState, type ReactNode } from 'react'
import { NotifDialog } from './notif-dialog'

interface AuthAwareLinkProps {
  href: string
  children: ReactNode
  className?: string
}

export function AuthAwareLink({ href, children, className }: AuthAwareLinkProps) {
  const { status } = useSession()
  const [open, setOpen] = useState(false)

  function handleClick(e: React.MouseEvent) {
    if (status === 'authenticated') {
      e.preventDefault()
      setOpen(true)
    }
  }

  return (
    <>
      <NotifDialog
        open={open}
        onClose={() => setOpen(false)}
        title="Already signed in"
        message="You're already signed in. No need to sign in again."
      />
      <Link href={href} onClick={handleClick} className={className}>
        {children}
      </Link>
    </>
  )
}
