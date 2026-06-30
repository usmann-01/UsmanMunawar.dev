import Link from 'next/link'
import type { ProjectStatus } from '@/lib/projects'
import { StatusBadge } from '@/components/projects/StatusBadge'

export interface ProjectCardProps {
  title: string
  summary: string
  status: ProjectStatus
  tags: string[]
  slug: string
}

// Project index card. Same visual spec as PostCard (Section 8 — Post card):
// bg-subtle, 1px border, radius-md, no shadow, hover -> bg-hover, 120ms ease-out.
export function ProjectCard({ title, summary, status, tags, slug }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${slug}`}
      className="block rounded-md border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-4 transition-colors duration-[120ms] ease-out hover:bg-[var(--color-bg-hover)]"
    >
      <div className="mb-2 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">{title}</h2>
        <StatusBadge status={status} />
      </div>
      <p className="mb-3 text-sm text-[var(--color-text-secondary)]">{summary}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-sm bg-[var(--color-bg-hover)] px-2 py-0.5 font-mono text-xs tracking-[0.02em] text-[var(--color-text-on-hover)]"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  )
}
