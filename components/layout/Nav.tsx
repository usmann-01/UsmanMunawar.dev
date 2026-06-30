'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/skills', label: 'Skills' },
  { href: '/contact', label: 'Contact' }
]

// Sticky top, bg-elevated, 1px border bottom only. Active link: 2px accent
// underline with 2px offset (Section 8, "Nav").
export function Nav() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg-elevated)]">
      <nav className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="font-mono text-sm font-semibold text-[var(--color-text-primary)] transition-colors duration-[120ms] ease-out hover:text-[var(--color-accent)]"
        >
          usman munawar
        </Link>
        <ul className="flex items-center gap-4 text-sm sm:gap-6">
          {links.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`)
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={
                    // Hit-area padding offset by equal negative margins, so the
                    // 36px+ clickable box (NFR-07 / target-size) doesn't shift
                    // the visible nav rhythm or gap-4/gap-6 spacing at all.
                    'inline-flex items-center px-1.5 py-2.5 -mx-1.5 -my-2.5 underline-offset-[2px] transition-colors duration-[120ms] ease-out ' +
                    (active
                      ? 'text-[var(--color-text-primary)] underline decoration-[var(--color-accent)] decoration-2'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]')
                  }
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
