import { getAllProjects } from '@/lib/projects'
import { getAllPosts } from '@/lib/posts'

interface Stat {
  value: string
  label: string
}

// Compact "at a glance" credibility strip below the hero. Pure server component:
// every number is resolved at build time from the same content helpers the rest
// of the site uses, so it ships no client JS.
export function StatStrip() {
  const projects = getAllProjects()
  const posts = getAllPosts()

  // Earliest project start year — "building since".
  const startYear = Math.min(
    ...projects.map((project) => new Date(project.startDate).getFullYear())
  )

  // Distinct tags across all projects (topics + tools).
  const technologies = new Set(projects.flatMap((project) => project.tags)).size

  const stats: Stat[] = [
    { value: String(projects.length), label: projects.length === 1 ? 'Project' : 'Projects' },
    { value: String(posts.length), label: posts.length === 1 ? 'Post' : 'Posts' },
    { value: String(startYear), label: 'Building since' },
    { value: String(technologies), label: 'Technologies' }
  ]

  return (
    <section aria-label="At a glance" className="mb-16">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg-subtle)] px-4 py-3"
          >
            <div className="font-mono text-2xl font-semibold tracking-[0.02em] text-[var(--color-text-primary)]">
              {stat.value}
            </div>
            <div className="mt-0.5 text-xs text-[var(--color-text-muted)]">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
