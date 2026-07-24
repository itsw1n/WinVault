'use client'

import { useState } from 'react'
import { EditCommentForm } from './edit-comment-form'
import { removeComment } from '../server/actions'
import type { CommentWithUser, CommentWithReplies } from '@/types'

type CommentData = CommentWithUser | CommentWithReplies

export function CommentItem({
  comment,
  sessionUserId,
  gameOwnerId,
  onReply,
}: {
  comment: CommentData
  sessionUserId?: string
  gameOwnerId: string
  onReply?: () => void
}) {
  const [editing, setEditing] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const isAuthor = sessionUserId === comment.userId
  const canModerate = isAuthor || sessionUserId === gameOwnerId

  const handleDelete = async () => {
    if (!confirm('Delete this comment?')) return
    setDeleting(true)
    const formData = new FormData()
    formData.set('commentId', comment.id)
    try {
      const result = await removeComment(null, formData)
      if (!result.success) setDeleting(false)
    } catch {
      setDeleting(false)
    }
  }

  if (editing) {
    return (
      <EditCommentForm
        commentId={comment.id}
        initialContent={comment.content}
        onDone={() => setEditing(false)}
      />
    )
  }

  return (
    <div className="group flex gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pv-border text-[11px] font-bold uppercase text-pv-muted">
        {comment.user.username[0]}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-medium text-pv-text">{comment.user.username}</span>
          <span className="text-[11px] text-pv-muted">{formatTimeAgo(comment.createdAt)}</span>
        </div>
        <p className="mt-0.5 whitespace-pre-wrap break-words text-sm text-pv-text">
          {comment.content}
        </p>
        <div className="mt-1 flex items-center gap-3">
          {sessionUserId && onReply && (
            <button
              type="button"
              onClick={onReply}
              className="text-[11px] font-medium text-pv-muted transition-colors hover:text-pv-primary"
            >
              Reply
            </button>
          )}
          {canModerate && !deleting && (
            <>
              {isAuthor && (
                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  className="text-[11px] font-medium text-pv-muted transition-colors hover:text-pv-primary"
                >
                  Edit
                </button>
              )}
              <button
                type="button"
                onClick={handleDelete}
                className="text-[11px] font-medium text-pv-muted transition-colors hover:text-pv-heart"
              >
                Delete
              </button>
            </>
          )}
          {deleting && <span className="text-[11px] text-pv-muted">Deleting...</span>}
        </div>
      </div>
    </div>
  )
}

function formatTimeAgo(date: Date) {
  const now = Date.now()
  const diff = now - new Date(date).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
