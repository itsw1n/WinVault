"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { cn } from "@/lib/utils"

const MAX_SIZE = 5 * 1024 * 1024
const ACCEPTED = "image/png,image/jpeg,image/webp"

interface ThumbnailUploadProps {
  onFile: (file: File | null) => void
  currentThumbnailUrl?: string
  error?: string
  onRemoveCurrent?: () => void
}

export function ThumbnailUpload({
  onFile,
  currentThumbnailUrl,
  error: externalError,
  onRemoveCurrent,
}: ThumbnailUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  const handleFile = useCallback(
    (f: File) => {
      if (!f.type.startsWith("image/")) {
        setError("Only image files are allowed")
        return
      }
      if (f.size > MAX_SIZE) {
        setError("File too large — max 5 MB")
        return
      }
      setError(null)
      setFile(f)
      setPreview(URL.createObjectURL(f))
      onFile(f)
    },
    [onFile]
  )

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(false)
    const f = e.dataTransfer.files?.[0]
    if (f) handleFile(f)
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(true)
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(false)
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (f) handleFile(f)
  }

  function handleRemove(e: React.MouseEvent) {
    e.stopPropagation()
    setFile(null)
    setPreview(null)
    setError(null)
    onFile(null)
    if (inputRef.current) inputRef.current.value = ""
  }

  const hasFile = !!file
  const displayError = error || externalError

  return (
    <div className="flex flex-col gap-1">
      <label className="text-[12px] font-medium text-pv-text">
        Thumbnail
      </label>
      <div
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          "relative flex flex-col items-center justify-center gap-2 p-6 rounded-pv-sm cursor-pointer transition-colors",
          dragOver && "border-pv-primary bg-pv-primary/10",
          !dragOver && hasFile && "border-solid border-pv-primary bg-pv-card",
          !dragOver && !hasFile && "border-dashed border-pv-border bg-pv-card/50",
          "border-[2.5px]",
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED}
          className="hidden"
          onChange={handleInputChange}
        />

        {hasFile && preview ? (
          <div className="w-full flex flex-col items-center gap-3">
            <div className="relative w-full max-w-[240px] rounded-pv-sm overflow-hidden border-[2px] border-pv-border">
              <img
                src={preview}
                alt="Thumbnail preview"
                className="w-full h-32 object-cover"
              />
            </div>
            <div className="flex items-center gap-2 text-[13px]">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-pv-primary"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <span className="text-pv-text font-medium truncate max-w-[180px]">
                {file?.name}
              </span>
              <span className="text-pv-muted shrink-0">
                {(file!.size / 1024 / 1024).toFixed(1)} MB
              </span>
              <button
                type="button"
                onClick={handleRemove}
                className="text-pv-heart hover:opacity-70 transition-opacity shrink-0"
                title="Remove"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
              </button>
            </div>
          </div>
        ) : currentThumbnailUrl ? (
          <div className="w-full flex flex-col items-center gap-2">
            <div className="relative w-full max-w-[240px] rounded-pv-sm overflow-hidden border-[2px] border-pv-border">
              <img
                src={currentThumbnailUrl}
                alt="Current thumbnail"
                className="w-full h-32 object-cover"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onFile(null)
                  onRemoveCurrent?.()
                }}
                className="absolute top-1.5 right-1.5 w-7 h-7 flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                title="Remove thumbnail"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <span className="text-[11px] text-pv-muted">
              Click or drag to replace
            </span>
          </div>
        ) : (
          <>
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-pv-muted"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <span className="text-[13px] text-pv-text font-medium">
              Upload thumbnail
            </span>
            <span className="text-[11px] text-pv-muted">
              PNG, JPG or WebP · Max 5 MB
            </span>
          </>
        )}
      </div>
      {displayError && (
        <p className="text-[12px] text-pv-heart">{displayError}</p>
      )}
    </div>
  )
}
