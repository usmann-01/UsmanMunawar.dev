import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import { Comments } from '@/components/Giscus'
import { isGiscusConfigured } from '@/lib/giscus'

export const metadata: Metadata = pageMetadata({
  title: 'Guestbook',
  description: 'Leave a note — say hi, ask a question, whatever.',
  path: '/guestbook'
})

export default function GuestbookPage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-2 text-[clamp(1.875rem,4vw,2.5rem)] font-semibold text-[var(--color-text-primary)]">
        Guestbook
      </h1>
      <p className="mb-8 text-[var(--color-text-secondary)]">
        Leave a note — say hi, ask a question, whatever.
      </p>

      {/* One shared thread for all entries: mapping="specific" + a fixed term,
          so every guestbook signing lands in the same discussion regardless of
          which URL it was left from. Hidden until Giscus is configured. */}
      {isGiscusConfigured() ? (
        <Comments mapping="specific" term="guestbook" />
      ) : (
        <p className="text-sm text-[var(--color-text-muted)]">
          The guestbook is warming up — check back soon.
        </p>
      )}
    </main>
  )
}
