import Link from 'next/link'
import { getRepoCommits } from '@/lib/github'
import { relativeTime } from '@/lib/date'

export interface ProjectChangelogProps {
  /** The project's githubUrl. When absent the caller shouldn't render this. */
  githubUrl: string
}

// Server Component: commits are fetched at build/revalidate time (see
// lib/github.ts), so no fetch logic reaches the client bundle. If the repo URL
// is unparseable or GitHub is unreachable/rate-limited, getRepoCommits() returns
// [] and we render nothing — the section disappears rather than showing an error.
export async function ProjectChangelog({ githubUrl }: ProjectChangelogProps) {
  const commits = await getRepoCommits(githubUrl)

  if (commits.length === 0) return null

  return (
    <section className="mt-12">
      <h2 className="mb-4 text-2xl font-semibold text-[var(--color-text-primary)]">
        Recent Updates
      </h2>
      <ol className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-4">
        {commits.map((commit) => (
          <li
            key={commit.sha}
            className="flex flex-col gap-1 border-b border-[var(--color-border)] py-3 first:pt-0 last:border-b-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
          >
            <p className="min-w-0 text-sm text-[var(--color-text-secondary)]">
              {commit.message}
            </p>
            <div className="flex shrink-0 items-baseline gap-3 font-mono text-xs tracking-[0.02em] text-[var(--color-text-muted)]">
              {commit.date && <span>{relativeTime(commit.date)}</span>}
              <Link
                href={commit.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-text-muted)] transition-colors duration-[120ms] ease-out hover:text-[var(--color-accent)] hover:underline"
              >
                {commit.sha}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
