// A category of skills with a heading (Section 10 — SkillGroup).
export function SkillGroup({ category, items }: { category: string; items: string[] }) {
  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--color-text-secondary)]">
        {category}
      </h2>
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-subtle)] px-3 py-1 text-sm text-[var(--color-text-primary)]"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}
