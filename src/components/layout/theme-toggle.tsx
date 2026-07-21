'use client'

import { useTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )

  if (!mounted) return <div className="h-[34px] w-[34px]" />

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="flex h-[34px] w-[34px] items-center justify-center rounded-pv-sm border-[2px] border-pv-border bg-pv-card text-pv-text transition-colors hover:bg-pv-bg"
      aria-label="Toggle theme"
    >
      <i
        className={`ti ${resolvedTheme === 'dark' ? 'ti-sun' : 'ti-moon'} text-[16px]`}
        aria-hidden="true"
      />
    </button>
  )
}
