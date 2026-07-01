import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import { getAllPosts, getPostBySlug, getSeriesNeighbors } from '@/lib/posts'
import { formatDate } from '@/lib/date'
import { pageMetadata } from '@/lib/metadata'
import { mdxComponents } from '@/components/mdx/MDXComponents'
import { SeriesNav } from '@/components/blog/SeriesNav'
import { SeriesBadge } from '@/components/blog/SeriesBadge'
import { ReadingProgress } from '@/components/blog/ReadingProgress'
import { TableOfContents } from '@/components/blog/TableOfContents'
import { Comments } from '@/components/Giscus'
import { isGiscusConfigured } from '@/lib/giscus'
import { extractToc } from '@/lib/toc'
import { assetExists } from '@/lib/assets'

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

// FR-02: drafts (and any slug not in getAllPosts) must 404 in production rather
// than rendering on-demand — getPostBySlug() already filters drafts, but without
// this, an unlisted slug would still dynamically render via dynamicParams' default.
export const dynamicParams = false

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return pageMetadata({
    title: post.title,
    description: post.summary,
    path: `/blog/${post.slug}`,
    type: 'article'
  })
}

// rehype-pretty-code: Shiki highlighting. keepBackground:false so our code-block
// "well" styling in globals.css controls the surface (Section 8 — Code block).
// github-dark (not -dimmed): -dimmed's token colors (#F47067, #ADBAC7, #768390)
// fail WCAG AA against --color-bg-elevated; github-dark's are higher-contrast.
const prettyCodeOptions = {
  theme: 'github-dark',
  keepBackground: false
} as const

export default async function BlogPostPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const { prev, next } = getSeriesNeighbors(post)

  // Per-post hero image, resolved by convention (same pattern as project
  // covers): drop a file at public/assets/blog/<slug>.jpg and it's picked up
  // automatically. Until it exists, the hero shows the accent-gradient
  // placeholder — no MDX/frontmatter change needed to add one later.
  const heroAsset = `/assets/blog/${post.slug}.jpg`
  const heroImage = assetExists(heroAsset) ? heroAsset : null

  // Table of contents from the post's h2/h3 (reusing rehype-slug anchors). Only
  // worth showing on longer posts, so skip it below 3 headings — short posts
  // get the plain single-column reading layout instead.
  const toc = extractToc(post.content)
  const hasToc = toc.length >= 3

  return (
    <main className="w-full">
      {/* Fixed 2px scroll-progress bar, above the Nav — blog posts only. */}
      <ReadingProgress />
      {/* Hero — same treatment/dimensions as the home page hero: full-bleed
          background image, accent-gradient fallback, dark overlay, and a
          centered title block. */}
      <section className="relative overflow-hidden border-b border-[var(--color-border)]">
        {/* Fallback accent gradient — the placeholder until a hero.jpg exists. */}
        <div
          className="pointer-events-none absolute inset-0 -z-20"
          style={{ background: 'var(--gradient-hero)' }}
          aria-hidden="true"
        />
        {/* Full-bleed background image, cover-cropped (preserves aspect ratio). */}
        {heroImage && (
          <div
            className="pointer-events-none absolute inset-0 -z-10 bg-[var(--color-bg)] bg-cover bg-center"
            style={{ backgroundImage: `url('${heroImage}')` }}
            aria-hidden="true"
          />
        )}
        {/* Dark overlay between image and text for contrast. */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ background: 'var(--gradient-hero-overlay)' }}
          aria-hidden="true"
        />
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
          <div className="animate-fade-up flex flex-col items-center">
            {post.series && (
              <div className="mb-4">
                <SeriesBadge series={post.series} part={post.part} />
              </div>
            )}

            <h1 className="text-[clamp(1.875rem,4vw,2.75rem)] font-semibold leading-tight text-[var(--color-text-primary)]">
              {post.title}
            </h1>

            <div className="mt-4 flex items-center gap-2 font-mono text-xs tracking-[0.02em] text-[var(--color-text-secondary)]">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readingTime} min read</span>
            </div>

            {post.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-sm bg-[var(--color-bg-hover)] px-2 py-0.5 font-mono text-xs tracking-[0.02em] text-[var(--color-text-on-hover)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* When the post has a ToC, widen the container and lay the reading column
          and sticky sidebar out in a grid (desktop only). Short posts keep the
          original centered single column exactly as before. */}
      <div
        className={`mx-auto w-full px-4 py-16 sm:px-6 lg:px-8 ${
          hasToc ? 'max-w-6xl' : 'max-w-3xl'
        }`}
      >
        <div className={hasToc ? 'lg:grid lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-12' : ''}>
          <div className={hasToc ? 'mx-auto w-full min-w-0 max-w-3xl' : ''}>
            <article className="prose">
              <MDXRemote
                source={post.content}
                components={mdxComponents}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [
                      rehypeSlug,
                      [rehypePrettyCode, prettyCodeOptions],
                      [rehypeAutolinkHeadings, { behavior: 'wrap' }]
                    ]
                  }
                }}
              />
            </article>

            <SeriesNav prev={prev} next={next} />

            {/* Comments — Giscus (GitHub Discussions). Lazy-loaded below the fold
                so it doesn't affect LCP. mapping="pathname" gives each post its
                own thread. Hidden entirely until Giscus is configured. */}
            {isGiscusConfigured() && (
              <section className="mt-16 border-t border-[var(--color-border)] pt-10">
                <h2 className="mb-6 text-2xl font-semibold text-[var(--color-text-primary)]">
                  Comments
                </h2>
                <Comments mapping="pathname" />
              </section>
            )}
          </div>

          {/* Sticky table of contents — desktop only, right of the reading
              column. Only rendered for posts with 3+ headings. */}
          {hasToc && (
            <aside className="hidden lg:block">
              <TableOfContents items={toc} />
            </aside>
          )}
        </div>
      </div>
    </main>
  )
}
