'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

// CR-005: About is no longer a standalone route — it's a section on the home
// page, so the nav points at the /#about anchor instead.
const links = [
  { href: '/#about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/skills', label: 'Skills' },
  { href: '/contact', label: 'Contact' }
]

// Panel-less, transparent header: logo left, plain text links right, sitting
// directly on the page background. A subtle backdrop-blur + top-down gradient
// fade (not a solid panel) keeps the links legible over content that scrolls
// underneath — including the hero image.
export function Nav() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 backdrop-blur-sm">
      {/* Legibility-only fade — no solid fill, no border. */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[var(--color-bg)]/70 to-transparent"
        aria-hidden="true"
      />
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-mono text-sm font-semibold text-[var(--color-text-primary)] transition-colors duration-[120ms] ease-out hover:text-[var(--color-accent)]"
        >
          Usman Munawar
        </Link>
        <ul className="flex items-center gap-5 text-sm sm:gap-8">
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
                    // the visible nav rhythm or gap spacing at all. No box,
                    // border, or default underline — plain text with an accent
                    // hover / active color shift.
                    'inline-flex items-center px-1.5 py-2.5 -mx-1.5 -my-2.5 transition-colors duration-[120ms] ease-out ' +
                    (active
                      ? 'text-[var(--color-accent)]'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-accent)]')
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
