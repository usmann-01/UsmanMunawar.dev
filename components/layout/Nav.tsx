'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// CR-005: About is no longer a standalone route — it's a section on the home
// page, so the nav points at the /#about anchor instead.
const links = [
  { href: '/#about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/now', label: 'Now' },
  { href: '/skills', label: 'Skills' },
  { href: '/contact', label: 'Contact' },
  // Lower-priority link — placed last, after core navigation.
  { href: '/guestbook', label: 'Guestbook' }
]

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

// Panel-less, transparent header: logo left, plain text links right, sitting
// directly on the page background. A subtle backdrop-blur + top-down gradient
// fade (not a solid panel) keeps the links legible over content that scrolls
// underneath — including the hero image.
//
// The 7 links don't fit beside the wordmark on narrow phones, so below md they
// collapse into a hamburger that opens a full-screen bg-elevated menu. The
// desktop row (md+) is unchanged.
export function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // Close the mobile menu on navigation.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Close the menu on Escape.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

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
          className="group whitespace-nowrap font-mono text-sm font-semibold text-[var(--color-text-primary)] transition-colors duration-[120ms] ease-out hover:text-[var(--color-accent)]"
        >
          {/* Signature caret — the terminal prompt motif, echoed from the hero. */}
          <span className="text-[var(--color-accent)]">❯</span> Usman Munawar
        </Link>

        {/* Desktop links — unchanged at md+; hidden below md. */}
        <ul className="hidden items-center gap-5 text-sm sm:gap-8 md:flex">
          {links.map(({ href, label }) => {
            const active = isActive(pathname, href)
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

        {/* Mobile hamburger — below md only. */}
        <button
          type="button"
          className="-mr-1.5 inline-flex items-center justify-center p-1.5 text-[var(--color-text-primary)] transition-colors duration-[120ms] ease-out hover:text-[var(--color-accent)] md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
            {open ? (
              <>
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu — below md only. Anchored directly under the header via
          top-full (no magic height), a solid bg-elevated panel so page content
          doesn't show through; links stacked with large tap targets. */}
      {open && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full z-40 border-y border-[var(--color-border)] bg-[var(--color-bg-elevated)] shadow-lg md:hidden"
        >
          <ul className="mx-auto flex max-w-6xl flex-col px-4 py-2 sm:px-6">
            {links.map(({ href, label }) => {
              const active = isActive(pathname, href)
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? 'page' : undefined}
                    onClick={() => setOpen(false)}
                    className={
                      'block border-b border-[var(--color-border)] py-4 text-base transition-colors duration-[120ms] ease-out ' +
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
        </div>
      )}
    </header>
  )
}
