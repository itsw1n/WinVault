import { auth, signOut } from "@/lib/auth"
import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"

export async function Navbar() {
  const session = await auth()

  return (
    <header className="border-b-pv border-b-pv-border">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 flex items-center justify-between h-16">
        <Link
          href="/"
          className="font-display text-2xl font-extrabold text-pv-primary tracking-tight"
        >
          PlayVault
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href="/games"
            className="text-sm font-medium text-pv-text hover:text-pv-primary transition-colors"
          >
            Browse
          </Link>

          <ThemeToggle />

          {session?.user ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm font-medium text-pv-text hover:text-pv-primary transition-colors"
              >
                Dashboard
              </Link>
              <form
                action={async () => {
                  "use server"
                  await signOut()
                }}
              >
                <button
                  type="submit"
                  className="text-sm font-medium text-pv-muted hover:text-pv-text transition-colors"
                >
                  Sign Out
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/sign-in"
              className="px-4 py-1.5 text-sm font-bold uppercase tracking-wide border-pv border-pv-border rounded-pv-sm bg-pv-primary text-[#111] hover:bg-[#e05e00] transition-colors"
            >
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
