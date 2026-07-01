// Swap-able labeled image placeholder (CR-003 / CR-006 / CR-007).
// Until a real asset is dropped into /public/assets, this renders an
// "intentionally empty" box that names the asset that will live there, so the
// layout is final and only the image is pending. Replace with next/image once
// the asset exists.

interface ImagePlaceholderProps {
  /** Where the real asset will live, e.g. "/assets/hero.jpg". Shown as the label. */
  asset: string
  /** Short description of what the image will show. */
  label?: string
  className?: string
}

export function ImagePlaceholder({ asset, label, className = '' }: ImagePlaceholderProps) {
  return (
    <div
      className={`img-placeholder rounded-lg border border-[var(--color-border)] ${className}`}
      role="img"
      aria-label={label ? `Placeholder: ${label}` : `Image placeholder for ${asset}`}
    >
      <div className="px-4 py-6 text-center">
        <svg
          className="mx-auto mb-2 h-6 w-6 text-[var(--color-text-muted)]"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M18 15h.008M2.25 6h19.5a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5H2.25a1.5 1.5 0 0 1-1.5-1.5v-9a1.5 1.5 0 0 1 1.5-1.5Z"
          />
        </svg>
        <p className="font-mono text-xs text-[var(--color-text-muted)]">
          {label ?? 'Image placeholder'}
        </p>
        <p className="mt-1 font-mono text-[0.7rem] text-[var(--color-text-secondary)]">
          asset → <code>public{asset}</code>
        </p>
      </div>
    </div>
  )
}
