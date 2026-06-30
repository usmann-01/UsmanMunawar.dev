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

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-16">
      <header className="mb-8">
        <div className="mb-4 flex items-center justify-between font-mono text-xs tracking-[0.02em] text-[var(--color-text-muted)]">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>{post.readingTime} min read</span>
        </div>

        <h1 className="text-[clamp(1.875rem,4vw,2.5rem)] font-semibold leading-tight text-[var(--color-text-primary)]">
          {post.title}
        </h1>

        {post.series && (
          <div className="mt-3">
            <SeriesBadge series={post.series} part={post.part} />
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-sm bg-[var(--color-bg-hover)] px-2 py-0.5 font-mono text-xs tracking-[0.02em] text-[var(--color-text-on-hover)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

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
    </main>
  )
}
