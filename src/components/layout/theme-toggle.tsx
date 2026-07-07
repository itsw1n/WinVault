"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="w-[34px] h-[34px]" />

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="w-[34px] h-[34px] flex items-center justify-center border-[2px] border-pv-border rounded-pv-sm bg-pv-card text-pv-text hover:bg-pv-bg transition-colors"
      aria-label="Toggle theme"
    >
      <i
        className={`ti ${resolvedTheme === "dark" ? "ti-sun" : "ti-moon"} text-[16px]`}
        aria-hidden="true"
      />
    </button>
  )
}
