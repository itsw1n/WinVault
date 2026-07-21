'use client'

import { useActionState, useState } from 'react'
import { Button } from '@/components/ui'
import { editComment } from '../server/actions'

export function EditCommentForm({
  commentId,
  initialContent,
  onDone,
}: {
  commentId: string
  initialContent: string
  onDone: () => void
}) {
  const [content, setContent] = useState(initialContent)
  const [, action, pending] = useActionState(editComment, null)

  return (
    <form action={action} className="space-y-2">
      <input type="hidden" name="commentId" value={commentId} />
      <textarea
        name="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={2}
        required
        className="w-full resize-none rounded-pv-sm border-[2px] border-pv-border bg-pv-card p-2 text-sm text-pv-text focus:border-pv-primary focus:outline-none"
      />
      <div className="flex gap-2">
        <Button type="submit" variant="default" size="sm" disabled={pending}>
          {pending ? 'Saving...' : 'Save'}
        </Button>
        <Button type="button" variant="inactive" size="sm" onClick={onDone}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
