// Inline badge showing a post's place in a series, e.g. "Part 2 · S-01".
// Human-readable series names will come from lib/series.ts in a later step;
// for now we surface the series ID and part from the post frontmatter.
export function SeriesBadge({ series, part }: { series: string; part?: number }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-sm bg-[var(--color-bg-hover)] px-2 py-0.5 font-mono text-xs tracking-[0.02em] text-[var(--color-accent)]">
      {part != null ? `Part ${part}` : 'Series'} · {series}
    </span>
  )
}
