import Link from 'next/link'
import { formatDate } from '@/lib/date'

export interface PostCardProps {
  title: string
  date: string
  summary: string
  tags: string[]
  series?: string
  slug: string
  readingTime: number
}

// Blog index list item. Visual spec: bg-subtle, 1px border, radius-md, no shadow,
// hover -> bg-hover, 120ms ease-out (Section 8, "Post card").
export function PostCard({ title, date, summary, tags, series, slug, readingTime }: PostCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="card-glow group block rounded-md border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-4 hover:bg-[var(--color-bg-hover)]"
    >
      <div className="mb-2 flex items-center justify-between font-mono text-xs tracking-[0.02em] text-[var(--color-text-muted)]">
        <span>{formatDate(date)}</span>
        <span>{readingTime} min read</span>
      </div>
      <h2 className="mb-1 text-lg font-semibold text-[var(--color-text-primary)] transition-colors duration-[120ms] group-hover:text-[var(--color-accent)]">
        {title}
      </h2>
      <p className="mb-3 text-sm text-[var(--color-text-secondary)]">{summary}</p>
      <div className="flex flex-wrap gap-2">
        {series && (
          <span className="rounded-sm bg-[var(--color-bg-hover)] px-2 py-0.5 font-mono text-xs tracking-[0.02em] text-[var(--color-accent)]">
            {series}
          </span>
        )}
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
