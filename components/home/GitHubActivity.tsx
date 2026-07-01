import Link from 'next/link'
import { getGitHubActivity } from '@/lib/github'
import { relativeTime } from '@/lib/date'

export interface GitHubActivityProps {
  username: string
}

// Server Component: the fetch runs at build/revalidate time (see lib/github.ts),
// so no fetch logic reaches the client bundle. If GitHub is unreachable or
// rate-limited the fetch resolves to [] and we render nothing at all — the
// section simply disappears rather than showing an error to the visitor.
export async function GitHubActivity({ username }: GitHubActivityProps) {
  const activity = await getGitHubActivity(username)

  if (activity.length === 0) return null

  return (
    <section className="mb-20">
      <div className="mb-6 flex items-baseline justify-between">
        <h2 className="text-2xl font-semibold text-[var(--color-text-primary)]">
          Recent activity
        </h2>
        <Link
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-1.5 py-2.5 -mx-1.5 -my-2.5 text-sm text-[var(--color-accent)] transition-colors duration-[120ms] ease-out hover:underline"
        >
          On GitHub →
        </Link>
      </div>
      <div className="flex flex-col gap-3">
        {activity.map((item) => (
          <Link
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="card-glow group flex items-center justify-between gap-4 rounded-md border border-[var(--color-border)] bg-[var(--color-bg-subtle)] px-4 py-3 hover:bg-[var(--color-bg-hover)]"
          >
            <span className="min-w-0 text-sm text-[var(--color-text-secondary)]">
              {item.action}{' '}
              <span className="font-medium text-[var(--color-text-primary)] transition-colors duration-[120ms] group-hover:text-[var(--color-accent)]">
                {item.repo}
              </span>
            </span>
            <span className="shrink-0 font-mono text-xs tracking-[0.02em] text-[var(--color-text-muted)]">
              {relativeTime(item.createdAt)}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
