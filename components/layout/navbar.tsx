import { auth, signOut } from "@/lib/auth";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { SearchBar } from "@/components/games/search-bar";
import { Button } from "@/components/ui/button";

export async function Navbar() {
  const session = await auth();

  return (
    <header className="bg-pv-card border-b-[3px] border-pv-border">
      <div className="max-w-[1400px] mx-auto px-4 py-3 flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="w-5 h-5 bg-pv-primary border-2 border-pv-border rounded-[4px]" />
          <span className="font-display font-black text-lg tracking-tight text-pv-text">
            PLAYVAULT
          </span>
        </Link>

        <nav className="flex items-center gap-3 mx-auto">
          <Link
            href="/"
            className="text-xs font-medium text-pv-text hover:text-pv-primary transition-colors"
          >
            Home
          </Link>
          <Link
            href="/games"
            className="text-xs font-medium text-pv-text hover:text-pv-primary transition-colors"
          >
            Browse
          </Link>
          <Link
            href="/about"
            className="text-xs font-medium text-pv-text hover:text-pv-primary transition-colors"
          >
            About
          </Link>
          {session?.user && (
            <>
              <Link
                href="/dashboard"
                className="text-xs font-medium text-pv-text hover:text-pv-primary transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/account"
                className="text-xs font-medium text-pv-text hover:text-pv-primary transition-colors"
              >
                Account
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <SearchBar compact />
          <ThemeToggle />

          {session?.user ? (
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <Button type="submit" variant="default" size="sm">
                SIGN OUT
              </Button>
            </form>
          ) : (
            <Button variant="default" size="sm" asChild>
              <Link href="/sign-in">SIGN IN</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
