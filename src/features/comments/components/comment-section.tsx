import Link from 'next/link'
import { auth } from '@/lib/nextauth/auth'
import { getCommentsByGameId } from '../server/queries'
import { CommentForm } from './comment-form'
import { CommentList } from './comment-list'

export async function CommentSection({
  gameId,
  gameOwnerId,
}: {
  gameId: string
  gameOwnerId: string
}) {
  const session = await auth()
  const comments = await getCommentsByGameId(gameId)
  const commentCount = comments.reduce((sum, c) => sum + 1 + c.replies.length, 0)

  return (
    <section className="space-y-6">
      <h2 className="font-display text-xl font-bold text-pv-text">
        Comments {commentCount > 0 && <span className="text-pv-muted">({commentCount})</span>}
      </h2>

      {session?.user ? (
        <CommentForm gameId={gameId} />
      ) : (
        <p className="text-sm text-pv-muted">
          <Link href="/sign-in" className="font-medium text-pv-primary hover:underline">
            Sign in
          </Link>{' '}
          to leave a comment.
        </p>
      )}

      <CommentList
        comments={comments}
        sessionUserId={session?.user?.id}
        gameOwnerId={gameOwnerId}
        gameId={gameId}
      />
    </section>
  )
}
