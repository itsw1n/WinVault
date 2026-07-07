"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { SearchBar } from "@/components/games/search-bar";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "./sign-out-button";

export function MobileNav({
  session,
}: {
  session: { user?: { name?: string | null } | null } | null;
}) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  function NavLink({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) {
    const pathname = usePathname();
    const active = pathname === href;
    return (
      <Link
        href={href}
        onClick={close}
        className={`block px-4 py-3 text-sm font-medium border-b-[2px] border-pv-border transition-colors ${
          active
            ? "text-pv-primary bg-pv-bg"
            : "text-pv-text hover:text-pv-primary hover:bg-pv-bg/50"
        }`}
      >
        {children}
      </Link>
    );
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="w-[34px] h-[34px] flex items-center justify-center border-[2px] border-pv-border rounded-pv-sm bg-pv-card text-pv-text hover:bg-pv-bg transition-colors"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <i
          className={`ti ${open ? "ti-x" : "ti-menu-2"} text-[16px]`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={close}
          />
          <div className="fixed top-0 left-0 bottom-0 w-[280px] bg-pv-card border-r-[3px] border-pv-border z-50 md:hidden flex flex-col overflow-y-auto">
            <div className="p-4 border-b-[3px] border-pv-border flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2" onClick={close}>
                <Image src="/logo.png" alt="PlayVault" width={20} height={20} className="rounded-[4px]" />
                <span className="font-display font-black text-lg tracking-tight text-pv-text">
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

            <div className="p-4 border-t-[3px] border-pv-border space-y-3">
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
  );
}
