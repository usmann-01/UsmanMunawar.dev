import Link from 'next/link'
import type { ProjectStatus } from '@/lib/projects'
import { StatusBadge } from '@/components/projects/StatusBadge'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'

export interface ProjectCardProps {
  title: string
  summary: string
  status: ProjectStatus
  category: string
  tags: string[]
  slug: string
  /** Set once public/assets/projects/<slug>.jpg exists; renders the real cover. */
  imageSrc?: string
}

// Project index card. CR-004/006/007: richer than the flat list item — a
// labeled image placeholder header, category pill, and a glow-on-hover lift.
export function ProjectCard({ title, summary, status, category, tags, slug, imageSrc }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${slug}`}
      className="card-glow group flex flex-col overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-subtle)]"
    >
      <ImagePlaceholder
        asset={`/assets/projects/${slug}.jpg`}
        imageSrc={imageSrc}
        label={`${title} cover`}
        className="aspect-[16/9] w-full rounded-none border-0 border-b border-[var(--color-border)]"
      />
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="rounded-sm bg-[var(--color-accent-muted)] px-2 py-0.5 font-mono text-xs tracking-[0.02em] text-[var(--color-text-primary)]">
            {category}
          </span>
          <StatusBadge status={status} />
        </div>
        <h2 className="mb-2 text-lg font-semibold text-[var(--color-text-primary)] transition-colors duration-[120ms] group-hover:text-[var(--color-accent)]">
          {title}
        </h2>
        <p className="mb-3 flex-1 text-sm text-[var(--color-text-secondary)]">{summary}</p>
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
      </div>
    </Link>
  )
}
