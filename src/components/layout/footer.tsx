import Link from 'next/link'
import Image from 'next/image'
import { AuthAwareLink } from '@/components/ui'

export function Footer() {
  return (
    <footer className="mt-auto border-t-[3px] border-pv-border bg-pv-card">
      <div className="mx-auto max-w-[1400px] px-4 py-6">
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="PlayVault"
              width={16}
              height={16}
              className="rounded-[4px]"
            />
            <span className="font-display text-sm font-black tracking-tight text-pv-text">
              PLAYVAULT
            </span>
          </div>
          <nav className="flex items-center gap-6">
            <Link
              href="/games"
              className="text-xs text-pv-muted transition-colors hover:text-pv-text"
            >
              Browse Games
            </Link>
            <AuthAwareLink
              href="/sign-in"
              className="text-xs text-pv-muted transition-colors hover:text-pv-text"
            >
              Sign In
            </AuthAwareLink>
          </nav>
        </div>

        <div className="my-4 border-t border-pv-border" />

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <p className="text-xs text-pv-muted">
            &copy; 2026 PlayVault. Made by{' '}
            <a
              href="https://github.com/itsw1n"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-pv-text transition-colors hover:text-pv-primary"
            >
              itsw1n
            </a>
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/itsw1n"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="text-pv-muted transition-colors hover:text-pv-text"
            >
              <i className="ti ti-brand-github" style={{ fontSize: 18 }} aria-hidden="true" />
            </a>
            <a
              href="https://www.linkedin.com/in/erwin-curato-16b3ba3b7/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="text-pv-muted transition-colors hover:text-pv-text"
            >
              <i className="ti ti-brand-linkedin" style={{ fontSize: 18 }} aria-hidden="true" />
            </a>
            <a
              href="https://www.facebook.com/erwin.curato"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook profile"
              className="text-pv-muted transition-colors hover:text-pv-text"
            >
              <i className="ti ti-brand-facebook" style={{ fontSize: 18 }} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
