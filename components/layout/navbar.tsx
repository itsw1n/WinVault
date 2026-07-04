import { auth, signOut } from "@/lib/auth"
import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"
import { SearchBar } from "@/components/games/search-bar"
import { Button } from "@/components/ui/button"

export async function Navbar() {
  const session = await auth()

  return (
    <header className="bg-pv-card border-b-[3px] border-pv-border">
      <div className="max-w-[1400px] mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="w-5 h-5 bg-pv-primary border-2 border-pv-border rounded-[4px]" />
          <span className="font-display font-black text-lg tracking-tight text-pv-text">
            PLAYVAULT
          </span>
        </Link>

        <div className="flex-1 max-w-[300px]">
          <SearchBar compact />
        </div>

        <nav className="flex items-center gap-3">
          <Link
            href="/games"
            className="text-xs font-medium text-pv-text hover:text-pv-primary transition-colors"
          >
            Browse
          </Link>

          <ThemeToggle />

          {session?.user ? (
            <>
              <Link
                href="/dashboard"
                className="text-xs font-medium text-pv-text hover:text-pv-primary transition-colors"
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
                  className="text-xs font-medium text-pv-muted hover:text-pv-text transition-colors"
                >
                  Sign Out
                </button>
              </form>
            </>
          ) : (
            <Button variant="default" size="sm" asChild>
              <Link href="/sign-in">SIGN IN</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  )
}
