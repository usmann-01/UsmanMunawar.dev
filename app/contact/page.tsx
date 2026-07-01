import type { Metadata } from 'next'
import Link from 'next/link'
import { contactLinks } from '@/lib/site-config'
import { PageHeader } from '@/components/layout/PageHeader'
import { pageMetadata } from '@/lib/metadata'

export const metadata: Metadata = pageMetadata({
  title: 'Contact',
  description: 'How to reach me: email, GitHub, and LinkedIn.',
  path: '/contact'
})

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="contact"
        title="Get in touch"
        intro="The fastest way to reach me is email. I'm also on these:"
      />

      <ul className="flex flex-col gap-3">
        {contactLinks.map(({ label, value, href }) => (
          <li key={label}>
            <Link
              href={href}
              className="flex items-center justify-between rounded-md border border-[var(--color-border)] bg-[var(--color-bg-subtle)] px-4 py-3 transition-colors duration-[120ms] ease-out hover:bg-[var(--color-bg-hover)]"
            >
              <span className="font-mono text-xs uppercase tracking-[0.02em] text-[var(--color-text-muted)]">
                {label}
              </span>
              <span className="text-sm text-[var(--color-accent)]">{value}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
