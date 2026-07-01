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
  try {
    const res = await fetch(`https://api.github.com/users/${username}/events/public`, {
      headers: {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28'
      },
      // Cache at build/revalidate time and refresh at most hourly. Keeps the
      // page static (no per-request fetch, no client JS) while staying fresh.
      next: { revalidate: 3600 }
    })

    if (!res.ok) return []

    const events = (await res.json()) as GitHubEvent[]
    if (!Array.isArray(events)) return []

    return events
      .filter((event) => KEPT_TYPES.has(event.type))
      .map(toActivityItem)
      .filter((item): item is GitHubActivityItem => item !== null)
      .slice(0, 6)
  } catch {
    // Network/parse failure — degrade to empty so the homepage never breaks.
    return []
  }
}
