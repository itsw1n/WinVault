'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface SearchBarProps {
  compact?: boolean
}

export function SearchBar({ compact }: SearchBarProps) {
  const router = useRouter()
  const [query, setQuery] = useState('')

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
          className="w-32 rounded-pv-sm border-[2px] border-solid border-pv-border bg-pv-bg px-3 py-2 text-sm text-pv-text placeholder:text-pv-muted focus-visible:border-pv-primary focus-visible:outline-none focus-visible:ring-0 md:min-w-[200px]"
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
        className="w-64 rounded-l-pv-sm rounded-r-none border-[2px] border-r-0 border-solid border-pv-border bg-pv-bg px-3 py-2 text-sm text-pv-text placeholder:text-pv-muted focus-visible:border-pv-primary focus-visible:outline-none focus-visible:ring-0"
      />
      <button
        type="submit"
        className="rounded-l-none rounded-r-pv-sm border-[2px] border-solid border-pv-border bg-pv-primary px-4 py-2 text-xs font-bold tracking-wide text-[#111111] shadow-[2px_2px_0px_0px_var(--pv-border)] transition-all duration-100 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
      >
        Search
      </button>
    </form>
  )
}
