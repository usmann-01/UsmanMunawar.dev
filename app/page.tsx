import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { getAllProjects } from '@/lib/projects'
import { PostCard } from '@/components/blog/PostCard'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'
import { assetExists } from '@/lib/assets'
import {
  siteName,
  siteUrl,
  siteDescription,
  defaultOgImage,
  heroTagline,
  aboutIntro
} from '@/lib/site-config'

// Section 12: Home's <title> is "[Site Name] — Developer & Builder" — a special
// pattern, not the generic "[Page Title] — [Site Name]" used elsewhere — so
// this builds metadata directly rather than via lib/metadata.ts's pageMetadata().
const title = `${siteName} — Developer & Builder`

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

  // CR-006: portfolio is first-class — feature up to 3 projects prominently.
  // Already FR-07 sorted: in-progress, complete, planned.
  const featuredProjects = getAllProjects().slice(0, 3)

  return (
    <main className="w-full">
      {/* CR-003 / CR-004 — Hero: full-bleed hero.jpg background, dark overlay for
          legibility, and a centered name/tagline/CTA block. */}
      <section className="relative overflow-hidden border-b border-[var(--color-border)]">
        {/* Fallback accent gradient — shows through if hero.jpg is missing. */}
        <div
          className="pointer-events-none absolute inset-0 -z-20"
          style={{ background: 'var(--gradient-hero)' }}
          aria-hidden="true"
        />
        {/* Full-bleed background image, cover-cropped (preserves aspect ratio).
            Kept ~85% opaque so the photo reads clearly; the glass panel carries
            text legibility instead of a heavy full-section overlay. */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 bg-[var(--color-bg)] bg-cover bg-center opacity-[0.85]"
          style={{ backgroundImage: "url('/assets/hero.jpg')" }}
          aria-hidden="true"
        />
        {/* Subtle vignette between image and text. */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ background: 'var(--gradient-hero-overlay)' }}
          aria-hidden="true"
        />
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="glass-panel animate-fade-up flex w-full max-w-2xl flex-col items-center rounded-2xl px-6 py-10 text-center sm:px-12 sm:py-14">
            <p className="mb-4 font-mono text-sm tracking-[0.02em] text-[var(--color-accent)]">
              Hi, I&apos;m
            </p>
            <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-bold leading-[1.05] tracking-tight">
              <span className="text-gradient">Usman Munawar</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--color-text-secondary)]">
              {heroTagline}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/projects"
                className="rounded-md bg-[var(--color-accent)] px-5 py-2.5 text-sm font-medium text-[var(--color-bg)] transition-all duration-[120ms] ease-out hover:opacity-90 hover:shadow-[var(--glow-accent)]"
              >
                View projects
              </Link>
              <Link
                href="/blog"
                className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg-subtle)] px-5 py-2.5 text-sm font-medium text-[var(--color-text-primary)] transition-colors duration-[120ms] ease-out hover:bg-[var(--color-bg-hover)]"
              >
                Read the blog
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        {/* CR-006 — Featured projects, given first-class prominence. */}
        <section className="mb-20">
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="text-2xl font-semibold text-[var(--color-text-primary)]">
              Featured projects
            </h2>
            <Link
              href="/projects"
              className="inline-flex items-center px-1.5 py-2.5 -mx-1.5 -my-2.5 text-sm text-[var(--color-accent)] transition-colors duration-[120ms] ease-out hover:underline"
            >
              All projects →
            </Link>
          </div>
          {featuredProjects.length === 0 ? (
            <p className="text-[var(--color-text-muted)]">No projects yet. Check back soon.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project) => (
                <ProjectCard
                  key={project.slug}
                  slug={project.slug}
                  title={project.title}
                  summary={project.summary}
                  status={project.status}
                  category={project.category}
                  tags={project.tags}
                  imageSrc={
                    assetExists(`/assets/projects/${project.slug}.jpg`)
                      ? `/assets/projects/${project.slug}.jpg`
                      : undefined
                  }
                />
              ))}
            </div>
          )}
        </section>

        {/* CR-005 — About folded into the home page as a section (no separate page). */}
        <section id="about" className="mb-20 scroll-mt-24">
          <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
            <div>
              <h2 className="mb-4 text-2xl font-semibold text-[var(--color-text-primary)]">About</h2>
              <div className="prose">
                <p>{aboutIntro}</p>
                <p>
                  Right now I&apos;m building a mini DBMS — a storage engine with slotted pages, a
                  B+ tree index, and write-ahead logging — and documenting each step in the{' '}
                  <Link href="/blog">blog</Link>. Alongside it I keep smaller tools alive, like a desktop
                  Markdown reader and a live sim-racing telemetry coach.
                </p>
              </div>
            </div>
            <ImagePlaceholder
              asset="/assets/about.jpg"
              imageSrc={assetExists('/assets/about.jpg') ? '/assets/about.jpg' : undefined}
              label="About / workspace photo"
              className="aspect-[4/3] w-full self-start"
            />
          </div>
        </section>

        {/* Recent writing — the blog stays a strong, but secondary, section. */}
        <section>
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="text-2xl font-semibold text-[var(--color-text-primary)]">
              Recent writing
            </h2>
            <Link
              href="/blog"
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
      </div>
    </main>
  )
}
