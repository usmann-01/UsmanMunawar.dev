'use client'

import { useEffect, useRef } from 'react'

// Cursor-follow glow for browsing-surface cards (PostCard, ProjectCard). Renders
// a radial-gradient overlay that tracks the pointer and is visible only on hover.
//
// It attaches a single mousemove listener to its parent card (the wrapping
// element it's dropped into), throttled to one update per animation frame, and
// writes the cursor position as --mouse-x / --mouse-y percentages that the
// gradient below reads. The overlay sits behind card content (-z-10) so text
// stays crisp, and is pointer-events-none so it never intercepts the card's
// click. Parent must be `relative isolate` (relative = positioning context for
// the overlay; isolate = a stacking context so -z-10 stays inside the card).
//
// No effect on initial render/LCP: the gradient paints only while hovered, and
// the listener does nothing until the pointer moves over the card.
export function CardGlow() {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const card = ref.current?.parentElement
    if (!card) return

    let raf = 0
    let x = 50
    let y = 50

    const apply = () => {
      raf = 0
      card.style.setProperty('--mouse-x', `${x}%`)
      card.style.setProperty('--mouse-y', `${y}%`)
    }

    const onMove = (event: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      x = ((event.clientX - rect.left) / rect.width) * 100
      y = ((event.clientY - rect.top) / rect.height) * 100
      if (raf === 0) raf = requestAnimationFrame(apply)
    }

    card.addEventListener('mousemove', onMove)
    return () => {
      card.removeEventListener('mousemove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100"
      style={{
        // Tuned by eye (see task notes): 8–12% read as nearly invisible against
        // --color-bg-subtle, especially since this layer sits behind card text.
        // 15% accent fading out by 60% gives a soft, clearly-present spotlight.
        background:
          'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), color-mix(in srgb, var(--color-accent) 15%, transparent), transparent 60%)'
      }}
    />
  )
}
