import Link from 'next/link'
import { contactLinks } from '@/lib/site-config'

// Site-wide footer. bg-elevated, 1px border top, muted mono metadata.
export function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--color-border)] bg-[var(--color-bg-elevated)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="font-mono text-xs tracking-[0.02em] text-[var(--color-text-muted)]">
          © {new Date().getFullYear()} Usman Munawar
        </p>
        <ul className="flex gap-4 text-sm">
          {contactLinks.map(({ href, label }) => (
            <li key={label}>
              <Link
                href={href}
                // Same hit-area pattern as Nav: padding offset by negative
                // margin keeps the visible gap-4 row spacing unchanged.
                className="inline-flex items-center px-1.5 py-2.5 -mx-1.5 -my-2.5 text-[var(--color-text-secondary)] transition-colors duration-[120ms] ease-out hover:text-[var(--color-accent)]"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
