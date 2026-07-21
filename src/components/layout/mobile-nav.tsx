'use client'

import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from './theme-toggle'
import { Button } from '@/components/ui'
import { SignOutButton } from './sign-out-button'

function NavLink({
  href,
  children,
  onClick,
}: {
  href: string
  children: React.ReactNode
  onClick?: () => void
}) {
  const pathname = usePathname()
  const active = pathname === href
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block border-b-[2px] border-pv-border px-4 py-3 text-sm font-medium transition-colors ${
        active
          ? 'bg-pv-bg text-pv-primary'
          : 'hover:bg-pv-bg/50 text-pv-text hover:text-pv-primary'
      }`}
    >
      {children}
    </Link>
  )
}

export function MobileNav({
  session,
}: {
  session: { user?: { name?: string | null } | null } | null
}) {
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return
    const prev = Number(document.body.dataset.scrollLock) || 0
    document.body.dataset.scrollLock = String(prev + 1)
    document.body.style.overflow = 'hidden'
    return () => {
      const count = Math.max(0, (Number(document.body.dataset.scrollLock) || 0) - 1)
      document.body.dataset.scrollLock = String(count)
      if (count === 0) document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-[34px] w-[34px] items-center justify-center rounded-pv-sm border-[2px] border-pv-border bg-pv-card text-pv-text transition-colors hover:bg-pv-bg"
        aria-label={open ? 'Close menu' : 'Open menu'}
      >
        <i className={`ti ${open ? 'ti-x' : 'ti-menu-2'} text-[16px]`} aria-hidden="true" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40 bg-black/40 md:hidden" onClick={close} />
          <div className="fixed bottom-0 left-0 top-0 z-50 flex w-[280px] flex-col overflow-y-auto border-r-[3px] border-pv-border bg-pv-card md:hidden">
            <div className="flex items-center justify-between border-b-[3px] border-pv-border p-4">
              <Link href="/" className="flex items-center gap-2" onClick={close}>
                <Image
                  src="/logo.png"
                  alt="PlayVault"
                  width={20}
                  height={20}
                  className="rounded-[4px]"
                />
                <span className="font-display text-lg font-black tracking-tight text-pv-text">
                  PLAYVAULT
                </span>
              </Link>
              <ThemeToggle />
            </div>

            <nav className="flex-1">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/games">Browse</NavLink>
              <NavLink href="/about">About</NavLink>
              {session?.user && (
                <>
                  <NavLink href="/dashboard">Dashboard</NavLink>
                  <NavLink href="/account">Account</NavLink>
                </>
              )}
            </nav>

            <div className="space-y-3 border-t-[3px] border-pv-border p-4">
              {session?.user ? (
                <SignOutButton className="w-full" />
              ) : (
                <Button variant="default" size="sm" asChild className="w-full">
                  <Link href="/sign-in" onClick={close}>
                    SIGN IN
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
}
