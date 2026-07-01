// Live GitHub public activity feed. Fetched server-side (see components/home/
// GitHubActivity.tsx) with hourly revalidation, so this never runs in the
// browser and ships no fetch logic to the client bundle — consistent with the
// static/MDX-at-build approach used elsewhere (NFR-01).

// The trimmed shape we render. Everything else from GitHub's event payload is
// discarded here so the component only ever sees what it needs.
export interface GitHubActivityItem {
  id: string
  /** e.g. "Pushed to", "Opened PR in", "Created repository" */
  action: string
  /** "owner/repo" */
  repo: string
  /** Link to the repo (or the PR, when we have one). */
  url: string
  /** ISO 8601 timestamp, formatted for display by the component. */
  createdAt: string
}

// Minimal subset of the GitHub Events API response we actually read.
interface GitHubEvent {
  id: string
  type: string
  created_at: string
  repo: { name: string }
  payload: {
    ref_type?: string
    action?: string
    pull_request?: { html_url?: string }
  }
}

// Shared server-side GitHub GET. Caches at build/revalidate time (hourly) so it
// never runs in the browser and ships no fetch logic to the client bundle.
// Resolves to null on any failure — network error, rate limit (60 req/hour
// unauthenticated), or non-200 — so callers can degrade to hiding their section
// rather than surfacing an error to the visitor.
async function fetchGitHub<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      headers: {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28'
      },
      next: { revalidate: 3600 }
    })
    if (!res.ok) return null
    return (await res.json()) as T
  } catch {
    return null
  }
}

// Extract "owner/repo" from a GitHub URL like https://github.com/owner/repo(.git)
// (trailing path segments and .git suffix are tolerated). Returns null if the
// URL isn't a recognizable github.com repo URL.
export function parseRepoSlug(githubUrl: string): string | null {
  try {
    const { hostname, pathname } = new URL(githubUrl)
    if (hostname !== 'github.com' && hostname !== 'www.github.com') return null
    const parts = pathname.split('/').filter(Boolean)
    if (parts.length < 2) return null
    const [owner, repo] = parts
    return `${owner}/${repo.replace(/\.git$/, '')}`
  } catch {
    return null
  }
}

// Only these event types are meaningful for an activity feed; everything else
// (WatchEvent/"starred", FollowEvent, etc.) is noise and gets filtered out.
const KEPT_TYPES = new Set(['PushEvent', 'PullRequestEvent', 'CreateEvent'])

function toActivityItem(event: GitHubEvent): GitHubActivityItem | null {
  const repo = event.repo.name
  const repoUrl = `https://github.com/${repo}`

  switch (event.type) {
    case 'PushEvent':
      return {
        id: event.id,
        action: 'Pushed to',
        repo,
        url: repoUrl,
        createdAt: event.created_at
      }
    case 'PullRequestEvent':
      // Only surface newly opened PRs, not closes/reviews/etc.
      if (event.payload.action !== 'opened') return null
      return {
        id: event.id,
        action: 'Opened PR in',
        repo,
        url: event.payload.pull_request?.html_url ?? repoUrl,
        createdAt: event.created_at
      }
    case 'CreateEvent': {
      // ref_type is 'repository' | 'branch' | 'tag'.
      const refType = event.payload.ref_type ?? 'repository'
      return {
        id: event.id,
        action: `Created ${refType}`,
        repo,
        url: repoUrl,
        createdAt: event.created_at
      }
    }
    default:
      return null
  }
}

/**
 * Fetch a user's recent public GitHub activity, cleaned down to the handful of
 * event types worth showing. Uses the unauthenticated public API (60 req/hour),
 * so on any failure — network error, rate limit, non-200 — it resolves to an
 * empty array and the caller hides the section rather than surfacing an error.
 */
export async function getGitHubActivity(username: string): Promise<GitHubActivityItem[]> {
  const events = await fetchGitHub<GitHubEvent[]>(
    `https://api.github.com/users/${username}/events/public`
  )
  if (!Array.isArray(events)) return []

  return events
    .filter((event) => KEPT_TYPES.has(event.type))
    .map(toActivityItem)
    .filter((item): item is GitHubActivityItem => item !== null)
    .slice(0, 6)
}

// A single repo commit, trimmed to what the changelog renders.
export interface RepoCommit {
  /** Short 7-char SHA. */
  sha: string
  /** First line of the commit message, truncated to ~80 chars. */
  message: string
  /** ISO 8601 author date. */
  date: string
  /** Link to the commit on GitHub. */
  url: string
}

// Minimal subset of the GitHub Commits API response we actually read.
interface GitHubCommit {
  sha: string
  html_url: string
  commit: {
    message: string
    author: { date: string } | null
  }
}

/**
 * Fetch the most recent commits for a project's repo, given its githubUrl.
 * Returns [] when the URL isn't a parseable github.com repo, or on any API
 * failure/rate-limit — so the caller hides the changelog rather than breaking.
 */
export async function getRepoCommits(githubUrl: string): Promise<RepoCommit[]> {
  const slug = parseRepoSlug(githubUrl)
  if (!slug) return []

  const commits = await fetchGitHub<GitHubCommit[]>(
    `https://api.github.com/repos/${slug}/commits?per_page=6`
  )
  if (!Array.isArray(commits)) return []

  return commits.map((c) => {
    const firstLine = c.commit.message.split('\n')[0]
    const message = firstLine.length > 80 ? `${firstLine.slice(0, 79)}…` : firstLine
    return {
      sha: c.sha.slice(0, 7),
      message,
      date: c.commit.author?.date ?? '',
      url: c.html_url
    }
  })
}
