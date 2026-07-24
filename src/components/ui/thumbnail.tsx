'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ThumbnailProps {
  src: string
  alt: string
  className?: string
  sizes?: string
}

const DEFAULT_SIZES = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'

export function Thumbnail({ src, alt, className = '', sizes = DEFAULT_SIZES }: ThumbnailProps) {
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
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        onError={() => setImgError(true)}
        sizes={sizes}
      />
    </div>
  )
}
