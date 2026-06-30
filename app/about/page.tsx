import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import { aboutIntro } from '@/lib/site-config'

// Section 12: description source is "first paragraph of about page" —
// aboutIntro is reused below as both the meta description and the actual
// first paragraph, so the two can never drift apart.
export const metadata: Metadata = pageMetadata({
  title: 'About',
  description: aboutIntro,
  path: '/about'
})

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-16">
      <h1 className="mb-8 text-[clamp(1.875rem,4vw,2.5rem)] font-semibold text-[var(--color-text-primary)]">
        About
      </h1>

      <div className="prose">
        <p>{aboutIntro}</p>

        <h2>Background</h2>
        <p>
          {/* Placeholder bio — replace with real background. */}
          A short paragraph on where I come from, what I studied, and the path that led me
          to systems programming. This is placeholder copy; the structure and styling are
          what I&apos;m validating right now.
        </p>

        <h2>What I&apos;m building now</h2>
        <p>
          Currently I&apos;m working through a mini DBMS — a storage engine with slotted pages,
          a B+ tree index, and write-ahead logging — and documenting each step in the
          <a href="/blog"> blog</a>. Next up are a Raft-backed key-value store and a
          from-scratch TCP implementation.
        </p>
      </div>
    </main>
  )
}
