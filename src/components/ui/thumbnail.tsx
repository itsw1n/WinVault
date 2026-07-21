'use client'

import { useState } from 'react'

interface ThumbnailProps {
  src: string
  alt: string
  className?: string
}

export function Thumbnail({ src, alt, className = '' }: ThumbnailProps) {
  const [imgError, setImgError] = useState(false)

  if (!src || imgError) {
    return (
      <div
        className={`flex items-center justify-center text-xs font-bold uppercase text-pv-muted ${className}`}
        aria-label={alt}
      >
        No image
      </div>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={className} onError={() => setImgError(true)} />
  )
}
