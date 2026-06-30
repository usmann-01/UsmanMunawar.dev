// Format an ISO date string for display, e.g. "2026-06-15T00:00:00.000Z" -> "Jun 15, 2026".
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC'
  })
}
