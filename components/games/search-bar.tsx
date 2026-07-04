"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

interface SearchBarProps {
  compact?: boolean
}

export function SearchBar({ compact }: SearchBarProps) {
  const router = useRouter()
  const [query, setQuery] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/games?search=${encodeURIComponent(query.trim())}`)
    }
  }

  if (compact) {
    return (
      <form onSubmit={handleSubmit}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search games..."
          className="w-full min-w-[200px] border-solid border-[2px] border-pv-border rounded-pv-sm px-3 py-2 text-sm bg-pv-bg text-pv-text placeholder:text-pv-muted focus-visible:outline-none focus-visible:ring-0 focus-visible:border-pv-primary"
        />
      </form>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-0">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search games..."
        className="w-64 border-solid border-[2px] border-r-0 border-pv-border rounded-l-pv-sm rounded-r-none px-3 py-2 text-sm bg-pv-bg text-pv-text placeholder:text-pv-muted focus-visible:outline-none focus-visible:ring-0 focus-visible:border-pv-primary"
      />
      <button
        type="submit"
        className="border-solid border-[2px] border-pv-border rounded-r-pv-sm rounded-l-none bg-pv-primary text-[#111111] font-bold text-xs tracking-wide px-4 py-2 shadow-[2px_2px_0px_0px_var(--pv-border)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100"
      >
        Search
      </button>
    </form>
  )
}
