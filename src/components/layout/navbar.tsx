import { auth } from "@/lib/auth/auth";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./mobile-nav";
import { SearchBar } from "./search-bar";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "./sign-out-button";

export async function Navbar() {
  const session = await auth();

  return (
    <header className="bg-pv-card border-b-[3px] border-pv-border">
      <div className="max-w-[1400px] mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/logo.png" alt="PlayVault" width={20} height={20} className="rounded-[4px]" />
          <span className="font-display font-black text-lg tracking-tight text-pv-text">
            PLAYVAULT
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-3 mx-auto">
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

          <div className="hidden md:flex items-center gap-3">
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
  );
}
