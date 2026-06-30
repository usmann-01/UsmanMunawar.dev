import Link from 'next/link'

// Next.js renders this inside the root layout, so Nav and Footer still appear
// (Section 3, route "404": "graceful error page").
export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <p className="font-mono text-sm tracking-[0.02em] text-[var(--color-text-muted)]">404</p>
      <h1 className="mt-2 text-[clamp(1.875rem,4vw,2.5rem)] font-semibold text-[var(--color-text-primary)]">
        Page not found
      </h1>
      <p className="mt-3 text-[var(--color-text-secondary)]">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-md bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-[var(--color-bg)] transition-colors duration-[120ms] ease-out hover:opacity-90"
      >
        Back home
      </Link>
    </main>
  )
}
