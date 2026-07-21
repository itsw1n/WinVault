'use client'

import { useActionState } from 'react'
import { Button } from '@/components/ui'
import { addComment } from '../server/actions'

export function CommentForm({
  gameId,
  parentId,
  onDone,
  placeholder = 'Write a comment...',
}: {
  gameId: string
  parentId?: string
  onDone?: () => void
  placeholder?: string
}) {
  const [, action, pending] = useActionState(addComment, null)

  return (
    <form action={action} onSubmit={onDone} className="space-y-2">
      <input type="hidden" name="gameId" value={gameId} />
      {parentId && <input type="hidden" name="parentId" value={parentId} />}
      <textarea
        name="content"
        placeholder={placeholder}
        rows={3}
        required
        className="w-full resize-none rounded-pv-sm border-[2px] border-pv-border bg-pv-card p-3 text-sm text-pv-text placeholder:text-pv-muted focus:border-pv-primary focus:outline-none"
      />
      <div className="flex justify-end">
        <Button type="submit" variant="default" size="sm" disabled={pending}>
          {pending ? 'Posting...' : parentId ? 'Reply' : 'Comment'}
        </Button>
      </div>
    </form>
  )
}
