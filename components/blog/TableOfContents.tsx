'use client'

import { useEffect, useRef, useState } from 'react'
import type { TocItem } from '@/lib/toc'

// Sticky, desktop-only table of contents. Reuses the heading anchors already in
// the page (ids from rehype-slug) — it neither renders headings nor rewrites the
// DOM, it just links to and observes them.
//
// The active section is tracked with a single IntersectionObserver watching all
// headings at once (no per-scroll math): headings intersecting an activation
// band just below the sticky nav are collected, and the topmost one in document
// order wins. Only mounted by the page when a post has 3+ headings.
export function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? '')
  const visible = useRef<Set<string>>(new Set())

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.current.add(entry.target.id)
          else visible.current.delete(entry.target.id)
        }
        // Topmost currently-visible heading in document order.
        const topmost = items.find((item) => visible.current.has(item.id))
        if (topmost) setActiveId(topmost.id)
      },
      // Activation band: from just below the sticky nav (~88px) down to the top
      // third of the viewport. A heading becomes active as it scrolls into that
      // band, and stays active until the next one arrives.
      { rootMargin: '-88px 0px -66% 0px', threshold: 0 }
    )

    headings.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [items])

  return (
    <nav
      aria-label="Table of contents"
      className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto"
    >
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
        On this page
      </p>
      <ul className="border-l border-[var(--color-border)] text-sm">
        {items.map((item) => {
          const active = item.id === activeId
          return (
            <li key={item.id} className={item.depth === 3 ? 'pl-4' : ''}>
              <a
                href={`#${item.id}`}
                aria-current={active ? 'true' : undefined}
                className={
                  // -ml-px overlaps the ul's left border so the active accent
                  // bar replaces it cleanly.
                  '-ml-px block border-l-2 py-1 pl-3 transition-colors duration-[120ms] ease-out ' +
                  (active
                    ? 'border-[var(--color-accent)] text-[var(--color-accent)]'
                    : 'border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]')
                }
              >
                {item.text}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
