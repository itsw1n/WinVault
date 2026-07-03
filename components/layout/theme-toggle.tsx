"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="w-[72px] h-[34px]" />

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="px-3 py-1.5 text-xs font-bold uppercase tracking-wide border-pv border-pv-border rounded-pv-sm bg-pv-card text-pv-text hover:bg-pv-bg transition-colors"
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? "☀ Light" : "☾ Dark"}
    </button>
  )
}
