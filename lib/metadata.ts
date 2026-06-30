import type { Metadata } from 'next'
import { siteName, siteUrl, defaultOgImage } from './site-config'

interface PageMetadataInput {
  /** Page title only — this function appends " — {siteName}". */
  title: string
  description: string
  /** Route path, e.g. "/blog" or "/blog/my-post". */
  path: string
  type?: 'website' | 'article'
  image?: string
}

// Builds a full Metadata object (title, description, OG, Twitter) following the
// "[Page Title] — [Site Name]" format from Section 12. Next.js shallowly replaces
// the entire `openGraph`/`twitter` object per route segment rather than merging
// nested fields, so every page needs to set these completely rather than relying
// on the layout defaults to fill gaps.
export function pageMetadata({
  title,
  description,
  path,
  type = 'website',
  image = defaultOgImage
}: PageMetadataInput): Metadata {
  const fullTitle = `${title} — ${siteName}`
  const url = `${siteUrl}${path}`

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName,
      type,
      images: [{ url: image }]
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image]
    }
  }
}
