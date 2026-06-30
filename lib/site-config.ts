// Single source of truth for site identity, contact links, and SEO defaults
// (Section 12). Shared by app/layout.tsx, every page's metadata, the sitemap,
// and the RSS feed so these values are never duplicated.

export const siteName = 'Usman Munawar'

export const siteUrl = 'https://usman-munawar-dev.vercel.app'

// Vision statement summary (Section 1) — used as the home page description
// and the root layout's default description.
export const siteDescription =
  'A personal site where I document my journey building systems software and my learnings along the way.'

// First paragraph of the About page — reused as both page copy and the
// About page's meta description (Section 12: "First paragraph of about page").
export const aboutIntro =
  "I'm Usman Munawar, a developer focused on systems software — the layer where databases, networks, and operating systems actually do their work. I learn by building things from scratch and writing down what surprised me."

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
