// Single source of truth for site identity, contact links, and SEO defaults
// (Section 12). Shared by app/layout.tsx, every page's metadata, the sitemap,
// and the RSS feed so these values are never duplicated.

export const siteName = 'Usman Munawar'

export const siteUrl = 'https://usman-munawar-dev.vercel.app'

// Vision statement summary (Section 1) — used as the home page description
// and the root layout's default description.
export const siteDescription =
  'Portfolio and blog of Usman Munawar — I build things from scratch, from desktop apps and tools to systems software, and write about what I learn.'

// Short hero tagline shown under the name on the home page.
export const heroTagline =
  'I build things from scratch — desktop apps, tools, and systems software — and write about what I learn along the way.'

// About intro — reused as the copy for the home page About section (CR-005,
// folded in from the former standalone About page).
export const aboutIntro =
  "I'm Usman Munawar, a developer who learns by building. My projects range widely — a desktop Markdown reader, a live sim-racing telemetry tool, a mini database engine — because I'm curious about how software works at every layer, not just one. I build things from scratch and write down what surprised me."

// Placeholder path — the actual image asset doesn't exist yet (see Section 12
// task summary). Wired in now so OG/Twitter metadata is structurally complete.
export const defaultOgImage = '/og-image.png'

export interface ContactLink {
  label: string
  value: string
  href: string
}

export const contactLinks: ContactLink[] = [
  {
    label: 'Email',
    value: 'officialusmanmunawar@gmail.com',
    href: 'mailto:officialusmanmunawar@gmail.com'
  },
  {
    label: 'GitHub',
    value: 'github.com/usmann-01',
    href: 'https://github.com/usmann-01'
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/usmanmunawar',
    href: 'https://www.linkedin.com/in/usmanmunawar'
  },
  {
    label: 'X / Twitter',
    value: '@usmanmunawar',
    href: 'https://x.com/usmanmunawar'
  }
]
