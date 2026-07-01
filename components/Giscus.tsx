'use client'

// Client component by necessity: Giscus is a third-party, inherently interactive
// iframe embed (it hydrates and posts to GitHub Discussions on the client). It's
// lazy-loaded (loading="lazy") so the iframe request happens only as it scrolls
// into view — it never blocks initial render or LCP.

import GiscusReact from '@giscus/react'
import { giscusConfig, giscusTheme } from '@/lib/giscus'
import type { ComponentProps } from 'react'

type Mapping = ComponentProps<typeof GiscusReact>['mapping']

interface CommentsProps {
  /** "pathname" for per-page threads (blog), "specific" for one shared thread. */
  mapping: Mapping
  /** Fixed thread key when mapping="specific" (e.g. the guestbook). */
  term?: string
}

// Parent pages guard rendering on isGiscusConfigured(), so by the time this
// mounts the config values are present.
export function Comments({ mapping, term }: CommentsProps) {
  return (
    <GiscusReact
      repo={giscusConfig.repo}
      repoId={giscusConfig.repoId}
      category={giscusConfig.category}
      categoryId={giscusConfig.categoryId}
      mapping={mapping}
      term={term}
      theme={giscusTheme}
      reactionsEnabled="1"
      inputPosition="top"
      loading="lazy"
      lang="en"
    />
  )
}
