import { auth } from '@/lib/nextauth/auth'
import Link from 'next/link'
import Image from 'next/image'
import { ThemeToggle } from './theme-toggle'
import { MobileNav } from './mobile-nav'
import { SearchBar } from './search-bar'
import { Button } from '@/components/ui'
import { SignOutButton } from './sign-out-button'

export async function Navbar() {
  const session = await auth()

  return (
    <header className="border-b-[3px] border-pv-border bg-pv-card">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image src="/logo.png" alt="PlayVault" width={20} height={20} className="rounded-[4px]" />
          <span className="font-display text-lg font-black tracking-tight text-pv-text">
            PLAYVAULT
          </span>
        </Link>

        <nav className="mx-auto hidden items-center gap-3 md:flex">
          <Link
            href="/"
            className="text-xs font-medium text-pv-text transition-colors hover:text-pv-primary"
          >
            Home
          </Link>
          <Link
            href="/games"
            className="text-xs font-medium text-pv-text transition-colors hover:text-pv-primary"
          >
            Browse
          </Link>
          <Link
            href="/about"
            className="text-xs font-medium text-pv-text transition-colors hover:text-pv-primary"
          >
            About
          </Link>
          {session?.user && (
            <>
              <Link
                href="/dashboard"
                className="text-xs font-medium text-pv-text transition-colors hover:text-pv-primary"
              >
                Dashboard
              </Link>
              <Link
                href="/account"
                className="text-xs font-medium text-pv-text transition-colors hover:text-pv-primary"
              >
                Account
              </Link>
            </>
          )}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <SearchBar compact />

          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
            {session?.user ? (
              <SignOutButton />
            ) : (
              <Button variant="default" size="sm" asChild>
                <Link href="/sign-in">SIGN IN</Link>
              </Button>
            )}
          </div>

          <div className="md:hidden">
            <MobileNav session={session} />
          </div>
        </div>
      </div>
    </header>
  )
}
