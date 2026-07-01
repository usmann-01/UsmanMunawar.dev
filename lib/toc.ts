import GithubSlugger from 'github-slugger'

export interface TocItem {
  depth: 2 | 3
  text: string
  id: string
}

// Strip the inline markdown that wouldn't survive into the rendered heading
// text, so our slugs match what rehype-slug generates from the rendered HAST
// (which sees plain text, not the markdown source).
function stripInlineMarkdown(text: string): string {
  return text
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1') // images -> alt text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // links -> link text
    .replace(/`([^`]+)`/g, '$1') // inline code
    .replace(/(\*\*|__)(.*?)\1/g, '$2') // bold
    .replace(/(\*|_)(.*?)\1/g, '$2') // italic
    .replace(/~~(.*?)~~/g, '$1') // strikethrough
    .trim()
}

/**
 * Extract h2/h3 headings from a raw MDX body into a flat table-of-contents list.
 *
 * IDs are produced with the same `github-slugger` that `rehype-slug` uses when
 * rendering the post, so each `id` matches an anchor that already exists in the
 * page — we reuse those anchors rather than regenerating them. A fresh slugger
 * per call reproduces rehype-slug's duplicate-heading disambiguation ("foo",
 * "foo-1", ...). Fenced code blocks are skipped so `#` comments inside code
 * aren't mistaken for headings.
 */
export function extractToc(markdown: string): TocItem[] {
  const slugger = new GithubSlugger()
  const items: TocItem[] = []
  let inFence = false
  let fenceMarker = ''

  for (const line of markdown.split('\n')) {
    const trimmed = line.trimStart()

    // Toggle in/out of fenced code blocks (``` or ~~~), matching the marker so a
    // ``` block isn't accidentally closed by ~~~.
    if (trimmed.startsWith('```') || trimmed.startsWith('~~~')) {
      const marker = trimmed.slice(0, 3)
      if (!inFence) {
        inFence = true
        fenceMarker = marker
      } else if (marker === fenceMarker) {
        inFence = false
        fenceMarker = ''
      }
      continue
    }
    if (inFence) continue

    // ATX heading, levels 2–3 only; tolerate optional trailing '#' markers.
    const match = line.match(/^(#{2,3})\s+(.+?)\s*#*\s*$/)
    if (!match) continue

    const depth = match[1].length as 2 | 3
    const text = stripInlineMarkdown(match[2])
    if (!text) continue

    items.push({ depth, text, id: slugger.slug(text) })
  }

  return items
}
