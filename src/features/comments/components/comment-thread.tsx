'use client'

import { useState } from 'react'
import { CommentItem } from './comment-item'
import { CommentForm } from './comment-form'
import type { CommentWithReplies } from '@/types'

export function CommentThread({
  comment,
  sessionUserId,
  gameOwnerId,
  gameId,
}: {
  comment: CommentWithReplies
  sessionUserId?: string
  gameOwnerId: string
  gameId: string
}) {
  const [showReplyForm, setShowReplyForm] = useState(false)

  return (
    <div className="space-y-3 border-b border-pv-border pb-4 last:border-b-0">
      <CommentItem
        comment={comment}
        sessionUserId={sessionUserId}
        gameOwnerId={gameOwnerId}
        onReply={() => setShowReplyForm(!showReplyForm)}
      />

      {comment.replies.length > 0 && (
        <div className="ml-11 space-y-3 border-l-[2px] border-pv-border pl-4">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              sessionUserId={sessionUserId}
              gameOwnerId={gameOwnerId}
            />
          ))}
        </div>
      )}

      {showReplyForm && (
        <div className="ml-11">
          <CommentForm
            gameId={gameId}
            parentId={comment.id}
            placeholder="Write a reply..."
            onDone={() => setShowReplyForm(false)}
          />
        </div>
      )}
    </div>
  )
}
