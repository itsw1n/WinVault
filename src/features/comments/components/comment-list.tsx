import { CommentThread } from './comment-thread'
import type { CommentWithReplies } from '@/types'

export function CommentList({
  comments,
  sessionUserId,
  gameOwnerId,
  gameId,
}: {
  comments: CommentWithReplies[]
  sessionUserId?: string
  gameOwnerId: string
  gameId: string
}) {
  if (comments.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-pv-muted">
        No comments yet. Be the first to share your thoughts!
      </p>
    )
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentThread
          key={comment.id}
          comment={comment}
          sessionUserId={sessionUserId}
          gameOwnerId={gameOwnerId}
          gameId={gameId}
        />
      ))}
    </div>
  )
}
