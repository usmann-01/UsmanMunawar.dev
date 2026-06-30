import type { ProjectStatus } from '@/lib/projects'

// "In Progress" / "Complete" / "Planned" pill. in-progress uses the warm
// --color-in-progress, complete uses --color-success, planned stays muted.
const config: Record<ProjectStatus, { label: string; className: string }> = {
  'in-progress': {
    label: 'In Progress',
    className: 'text-[var(--color-in-progress)]'
  },
  complete: {
    label: 'Complete',
    className: 'text-[var(--color-success)]'
  },
  planned: {
    label: 'Planned',
    // text-on-hover, not text-muted: this pill's bg-hover background fails
    // AA contrast with text-muted (see globals.css note on the token).
    className: 'text-[var(--color-text-on-hover)]'
  }
}

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const { label, className } = config[status]
  return (
    <span
      className={`inline-flex items-center rounded-sm bg-[var(--color-bg-hover)] px-2 py-0.5 font-mono text-xs tracking-[0.02em] ${className}`}
    >
      {label}
    </span>
  )
}
