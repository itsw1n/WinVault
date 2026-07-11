"use client";

import { useState } from "react";

interface ThumbnailProps {
  src: string;
  alt: string;
  className?: string;
}

export function Thumbnail({ src, alt, className = "" }: ThumbnailProps) {
  const [imgError, setImgError] = useState(false);

  if (!src || imgError) {
    return (
      <div
        className={`flex items-center justify-center text-pv-muted text-xs font-bold uppercase ${className}`}
        aria-label={alt}
      >
        No image
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setImgError(true)}
    />
  );
}
