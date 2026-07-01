import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import { getAllProjects, getProjectBySlug } from '@/lib/projects'
import { formatDate } from '@/lib/date'
import { pageMetadata } from '@/lib/metadata'
import { mdxComponents } from '@/components/mdx/MDXComponents'
import { StatusBadge } from '@/components/projects/StatusBadge'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  return pageMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
    type: 'article'
  })
}

// Same Shiki config as the blog post page (Section 8 — Code block).
// github-dark (not -dimmed): see app/blog/[slug]/page.tsx for the contrast rationale.
const prettyCodeOptions = {
  theme: 'github-dark',
  keepBackground: false
} as const

export default async function ProjectDetailPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const dateRange = project.endDate
    ? `${formatDate(project.startDate)} – ${formatDate(project.endDate)}`
    : `${formatDate(project.startDate)} – Present`

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="mb-8">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-sm bg-[var(--color-accent-muted)] px-2 py-0.5 font-mono text-xs tracking-[0.02em] text-[var(--color-text-primary)]">
              {project.category}
            </span>
            <StatusBadge status={project.status} />
          </div>
          <span className="font-mono text-xs tracking-[0.02em] text-[var(--color-text-muted)]">
            {dateRange}
          </span>
        </div>

        <h1 className="text-[clamp(1.875rem,4vw,2.5rem)] font-semibold leading-tight text-[var(--color-text-primary)]">
          {project.title}
        </h1>

        <p className="mt-3 text-lg text-[var(--color-text-secondary)]">{project.summary}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-sm bg-[var(--color-bg-hover)] px-2 py-0.5 font-mono text-xs tracking-[0.02em] text-[var(--color-text-on-hover)]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              className="text-[var(--color-accent)] transition-colors duration-[120ms] ease-out hover:underline"
            >
              GitHub repo →
            </Link>
          )}
          {project.seriesId && (
            <Link
              href="/blog"
              className="text-[var(--color-accent)] transition-colors duration-[120ms] ease-out hover:underline"
            >
              Read the build series →
            </Link>
          )}
        </div>
      </header>

      {/* CR-006 — case-study cover image (swap-able placeholder for now). */}
      <ImagePlaceholder
        asset={`/assets/projects/${project.slug}.jpg`}
        label={`${project.title} cover`}
        className="mb-8 aspect-[2/1] w-full"
      />

      {project.highlights.length > 0 && (
        <section className="mb-8 rounded-md border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-4">
          <h2 className="mb-2 text-sm font-semibold text-[var(--color-text-primary)]">
            Highlights
          </h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-[var(--color-text-secondary)]">
            {project.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </section>
      )}

      <article className="prose">
        <MDXRemote
          source={project.content}
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
    </main>
  )
}
