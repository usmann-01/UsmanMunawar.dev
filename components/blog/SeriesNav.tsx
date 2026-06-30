import Link from 'next/link'
import type { Post } from '@/lib/posts'

// Prev / Next navigation within a series. Each side is a bg-subtle card that
// brightens to bg-hover on hover (Section 8, "Series navigator").
export function SeriesNav({ prev, next }: { prev: Post | null; next: Post | null }) {
  if (!prev && !next) return null

  return (
    <nav className="mt-16 flex justify-between gap-4 border-t border-[var(--color-border)] pt-8">
      {prev ? (
        <Link
          href={`/blog/${prev.slug}`}
          className="flex-1 rounded-md border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-3 transition-colors duration-[120ms] ease-out hover:bg-[var(--color-bg-hover)]"
        >
          <span className="block font-mono text-xs text-[var(--color-text-muted)]">← Previous</span>
          <span className="mt-1 block text-sm text-[var(--color-text-primary)]">{prev.title}</span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          className="flex-1 rounded-md border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-3 text-right transition-colors duration-[120ms] ease-out hover:bg-[var(--color-bg-hover)]"
        >
          <span className="block font-mono text-xs text-[var(--color-text-muted)]">Next →</span>
          <span className="mt-1 block text-sm text-[var(--color-text-primary)]">{next.title}</span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  )
}
