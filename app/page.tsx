import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { getAllProjects } from '@/lib/projects'
import { PostCard } from '@/components/blog/PostCard'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { siteName, siteUrl, siteDescription, defaultOgImage } from '@/lib/site-config'

// Section 12: Home's <title> is "[Site Name] — Systems Developer" — a special
// pattern, not the generic "[Page Title] — [Site Name]" used elsewhere — so
// this builds metadata directly rather than via lib/metadata.ts's pageMetadata().
const title = `${siteName} — Systems Developer`

export const metadata: Metadata = {
  title,
  description: siteDescription,
  alternates: { canonical: siteUrl },
  openGraph: {
    title,
    description: siteDescription,
    url: siteUrl,
    siteName,
    type: 'website',
    images: [{ url: defaultOgImage }]
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: siteDescription,
    images: [defaultOgImage]
  }
}

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 3)

  // FR-14: 2-3 featured projects. Prefer in-progress work; top up with the next
  // highest-priority projects (already FR-07 sorted: in-progress, complete, planned).
  const featuredProjects = getAllProjects().slice(0, 3)

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-16 sm:py-24">
      {/* Hero — one-liner + short bio */}
      <section className="mb-16">
        <h1 className="text-[clamp(1.875rem,4vw,2.5rem)] font-semibold leading-tight text-[var(--color-text-primary)]">
          I build systems software and write about how it works.
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--color-text-secondary)]">
          I&apos;m Usman — a developer documenting my journey through databases, consensus,
          networking, and operating systems. This site is a window into what I&apos;ve built and
          what I&apos;ve learned along the way.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/projects"
            className="rounded-md bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-[var(--color-bg)] transition-colors duration-[120ms] ease-out hover:opacity-90"
          >
            View projects
          </Link>
          <Link
            href="/blog"
            className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg-subtle)] px-4 py-2 text-sm font-medium text-[var(--color-text-primary)] transition-colors duration-[120ms] ease-out hover:bg-[var(--color-bg-hover)]"
          >
            Read the blog
          </Link>
        </div>
      </section>

      {/* Featured projects */}
      <section className="mb-16">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
            Featured projects
          </h2>
          <Link
            href="/projects"
            // Same hit-area pattern as Nav/Footer: padding offset by negative
            // margin keeps the items-baseline row position unchanged.
            className="inline-flex items-center px-1.5 py-2.5 -mx-1.5 -my-2.5 text-sm text-[var(--color-accent)] transition-colors duration-[120ms] ease-out hover:underline"
          >
            All projects →
          </Link>
        </div>
        {featuredProjects.length === 0 ? (
          <p className="text-[var(--color-text-muted)]">No projects yet. Check back soon.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                slug={project.slug}
                title={project.title}
                summary={project.summary}
                status={project.status}
                tags={project.tags}
              />
            ))}
          </div>
        )}
      </section>

      {/* Recent posts */}
      <section>
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">Recent writing</h2>
          <Link
            href="/blog"
            // Same hit-area pattern as Nav/Footer: padding offset by negative
            // margin keeps the items-baseline row position unchanged.
            className="inline-flex items-center px-1.5 py-2.5 -mx-1.5 -my-2.5 text-sm text-[var(--color-accent)] transition-colors duration-[120ms] ease-out hover:underline"
          >
            All posts →
          </Link>
        </div>
        {recentPosts.length === 0 ? (
          <p className="text-[var(--color-text-muted)]">No posts yet. Check back soon.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {recentPosts.map((post) => (
              <PostCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                date={post.date}
                summary={post.summary}
                tags={post.tags}
                series={post.series}
                readingTime={post.readingTime}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
