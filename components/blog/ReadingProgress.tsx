'use client'

import { useEffect, useState } from 'react'

// A 2px bar pinned to the very top of the viewport (above the sticky Nav) that
// fills left→right as the reader scrolls the page. Rendered only by the blog
// post page, so it never appears elsewhere on the site.
//
// Minimal JS by design: a single passive scroll listener, throttled to one
// update per animation frame, driving a CSS transform (scaleX) — no width/layout
// reads that could thrash, no library, no layout shift (fixed, out of flow).
export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let raf = 0

    const update = () => {
      raf = 0
      const el = document.documentElement
      const max = el.scrollHeight - el.clientHeight
      const pct = max > 0 ? (el.scrollTop / max) * 100 : 0
      setProgress(Math.min(100, Math.max(0, pct)))
    }

    const onScroll = () => {
      if (raf === 0) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-[var(--color-accent)] will-change-transform"
      style={{ transform: `scaleX(${progress / 100})` }}
    />
  )
}
