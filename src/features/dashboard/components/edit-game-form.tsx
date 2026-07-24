'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { Button, ThumbnailUpload } from '@/components/ui'
import type { Game } from '@/types'
import { updateGame } from '@/features/games/server/actions'
import { updateGameSchema } from '@/features/games/schemas'
import { GENRES } from '@/features/games/schemas'

const formSchema = updateGameSchema.extend({
  tags: z.string(),
})

type FormValues = z.infer<typeof formSchema>

interface EditGameFormProps {
  game: Pick<
    Game,
    'id' | 'title' | 'thumbnailUrl' | 'shortDescription' | 'externalUrl' | 'genre' | 'tags'
  >
  onSuccess: () => void
}

export function EditGameForm({ game, onSuccess }: EditGameFormProps) {
  const router = useRouter()
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [thumbnailRemoved, setThumbnailRemoved] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: game.id,
      title: game.title,
      thumbnailUrl: game.thumbnailUrl,
      shortDescription: game.shortDescription,
      externalUrl: game.externalUrl,
      genre: game.genre,
      tags: game.tags.join(', '),
    },
  })

  async function onSubmit(data: FormValues) {
    const formData = new FormData()
    formData.set('id', data.id)
    formData.set('title', data.title)
    formData.set('thumbnailUrl', thumbnailRemoved ? '' : data.thumbnailUrl)
    if (thumbnailFile) formData.set('thumbnail', thumbnailFile)
    if (thumbnailRemoved) formData.set('removeThumbnail', 'true')
    formData.set('shortDescription', data.shortDescription)
    formData.set('externalUrl', data.externalUrl)
    formData.set('genre', data.genre)
    formData.set('tags', data.tags)

    const result = await updateGame(undefined, formData)

    if (!result.success) {
      if (result.details && typeof result.details === 'object' && 'field' in result.details) {
        setError((result.details as { field: 'externalUrl' }).field, { message: result.message })
      } else {
        setError('root', { message: result.message })
      }
      return
    }

    router.refresh()
    onSuccess()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {errors.root && (
        <div className="rounded-pv-sm border-[2px] border-pv-heart bg-pv-card p-3">
          <p className="text-[12px] font-medium text-pv-heart">{errors.root.message}</p>
        </div>
      )}

      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="text-[12px] font-medium text-pv-text">
          Title
        </label>
        <input
          id="title"
          {...register('title')}
          placeholder="Game title"
          className="w-full rounded-pv-sm border-[2px] border-pv-border bg-pv-card px-3 py-2 text-[13px] text-pv-text transition-colors focus:border-pv-primary focus:outline-none"
        />
        {errors.title && <p className="text-[12px] text-pv-heart">{errors.title.message}</p>}
      </div>

      <ThumbnailUpload
        onFile={setThumbnailFile}
        currentThumbnailUrl={game.thumbnailUrl}
        onRemoveCurrent={() => setThumbnailRemoved(true)}
      />

      <input type="hidden" {...register('thumbnailUrl')} />

      <div className="flex flex-col gap-1">
        <label htmlFor="shortDescription" className="text-[12px] font-medium text-pv-text">
          Short Description
        </label>
        <textarea
          id="shortDescription"
          {...register('shortDescription')}
          rows={3}
          placeholder="A brief description of the game"
          className="w-full resize-none rounded-pv-sm border-[2px] border-pv-border bg-pv-card px-3 py-2 text-[13px] text-pv-text transition-colors focus:border-pv-primary focus:outline-none"
        />
        {errors.shortDescription && (
          <p className="text-[12px] text-pv-heart">{errors.shortDescription.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="externalUrl" className="text-[12px] font-medium text-pv-text">
          External URL
        </label>
        <input
          id="externalUrl"
          {...register('externalUrl')}
          placeholder="https://example.com/play"
          className="w-full rounded-pv-sm border-[2px] border-pv-border bg-pv-card px-3 py-2 text-[13px] text-pv-text transition-colors focus:border-pv-primary focus:outline-none"
        />
        {errors.externalUrl && (
          <p className="text-[12px] text-pv-heart">{errors.externalUrl.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="genre" className="text-[12px] font-medium text-pv-text">
          Genre
        </label>
        <select
          id="genre"
          {...register('genre')}
          className="w-full rounded-pv-sm border-[2px] border-pv-border bg-pv-card px-3 py-2 text-[13px] text-pv-text transition-colors focus:border-pv-primary focus:outline-none"
        >
          <option value="">Select a genre</option>
          {GENRES.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        {errors.genre && <p className="text-[12px] text-pv-heart">{errors.genre.message}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="tags" className="text-[12px] font-medium text-pv-text">
          Tags
        </label>
        <input
          id="tags"
          {...register('tags')}
          placeholder="action, rpg, pixel-art"
          className="w-full rounded-pv-sm border-[2px] border-pv-border bg-pv-card px-3 py-2 text-[13px] text-pv-text transition-colors focus:border-pv-primary focus:outline-none"
        />
        <p className="text-[11px] text-pv-muted">Comma-separated. Max 10 tags, 30 chars each.</p>
        {errors.tags && <p className="text-[12px] text-pv-heart">{errors.tags.message}</p>}
      </div>

      <div className="space-y-2 pt-2">
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'SAVING...' : 'SAVE CHANGES'}
        </Button>
        <Button type="button" variant="inactive" onClick={onSuccess} className="w-full">
          Cancel
        </Button>
      </div>
    </form>
  )
}
