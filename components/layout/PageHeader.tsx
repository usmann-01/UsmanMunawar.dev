import type { ReactNode } from 'react'

interface PageHeaderProps {
  /** Short section label, rendered after the accent caret, e.g. "projects". */
  eyebrow: string
  title: string
  /** Optional lead paragraph beneath the title. */
  intro?: ReactNode
  /** Optional extra content between title and nothing (e.g. a "last updated" line). */
  children?: ReactNode
}

// Shared page header — one consistent hierarchy across every interior page:
// a mono prompt-mark eyebrow (the signature terminal motif), a commanding mono
// H1, then a calm Plex Sans lead. Replaces the ad-hoc per-page h1 blocks so the
// title always reads as the single most important thing on the page.
export function PageHeader({ eyebrow, title, intro, children }: PageHeaderProps) {
  return (
    <header className="mb-10">
      <p className="eyebrow mb-3">
        <span className="caret">❯</span> {eyebrow}
      </p>
      <h1 className="text-page-title text-[var(--color-text-primary)]">{title}</h1>
      {intro && (
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--color-text-secondary)]">
          {intro}
        </p>
      )}
      {children}
    </header>
  )
}
