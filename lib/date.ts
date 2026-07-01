// Format an ISO date string for display, e.g. "2026-06-15T00:00:00.000Z" -> "Jun 15, 2026".
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC'
  })
}

// Relative time, e.g. "2 days ago". Computed at build/revalidate time on the
// server; with hourly revalidation the drift is at most ~1h, which is fine here.
export function relativeTime(iso: string): string {
  const diffSeconds = Math.round((new Date(iso).getTime() - Date.now()) / 1000)
  const abs = Math.abs(diffSeconds)
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ['year', 31536000],
    ['month', 2592000],
    ['week', 604800],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60]
  ]
  for (const [unit, seconds] of units) {
    if (abs >= seconds) return rtf.format(Math.round(diffSeconds / seconds), unit)
  }
  return 'just now'
}
