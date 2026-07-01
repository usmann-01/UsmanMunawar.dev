import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import { PageHeader } from '@/components/layout/PageHeader'

export const metadata: Metadata = pageMetadata({
  title: 'Now',
  description: "A snapshot of what I'm currently focused on — building, learning, and reading.",
  path: '/now'
})

// Hardcoded for now — bump this whenever the page content is refreshed.
const lastUpdated = 'July 2026'

// Simple static content page (no MDX/Velite), same container/spacing pattern as
// the other static pages. Section content is placeholder — fill in later.
export default function NowPage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="now"
        title="Now"
        intro={
          <>
            A snapshot of what I&apos;m currently focused on — inspired by{' '}
            <a
              href="https://nownownow.com"
              className="text-[var(--color-accent)] transition-colors duration-[120ms] ease-out hover:underline"
            >
              nownownow.com
            </a>
            .
          </>
        }
      >
        <p className="mt-3 font-mono text-xs tracking-[0.02em] text-[var(--color-text-muted)]">
          Last updated: {lastUpdated}
        </p>
      </PageHeader>

      <div className="prose">
        <h2>Building</h2>
        <ul>
          <li>A mini DBMS — storage engine, B+ tree index, and write-ahead logging.</li>
          <li>Placeholder: another project or feature I&apos;m actively working on.</li>
        </ul>

        <h2>Learning</h2>
        <ul>
          <li>Distributed consensus (Raft) ahead of the replicated key-value store.</li>
          <li>Placeholder: a topic, course, or paper I&apos;m digging into.</li>
        </ul>

        <h2>Reading</h2>
        <ul>
          <li>Placeholder: a book I&apos;m currently reading.</li>
          <li>Placeholder: an article or blog worth revisiting.</li>
        </ul>
      </div>
    </main>
  )
}
