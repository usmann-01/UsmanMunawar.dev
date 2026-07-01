import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { getAllProjects } from '@/lib/projects'
import { PostCard } from '@/components/blog/PostCard'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { GitHubActivity } from '@/components/home/GitHubActivity'
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
      {/* Signature hero — a terminal-native typographic statement over the
          full-bleed photo: a shell prompt eyebrow answering "whoami", the name
          as the response, an accent hairline, then the tagline. The overlay is
          darker on the left, where the text sits, so the mono name stays crisp
          over the busy part of the image. */}
      <section className="relative overflow-hidden border-b border-[var(--color-border)]">
        {/* Fallback accent gradient — shows through if hero.jpg is missing. */}
        <div
          className="pointer-events-none absolute inset-0 -z-20"
          style={{ background: 'var(--gradient-hero)' }}
          aria-hidden="true"
        />
        {/* Full-bleed background image, cover-cropped (preserves aspect ratio). */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 bg-[var(--color-bg)] bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/hero.jpg')" }}
          aria-hidden="true"
        />
        {/* Legibility overlay: stronger on the left (behind the text), lighter
            on the right so the image reads through, plus a soft top/bottom fade. */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              'linear-gradient(to right, color-mix(in srgb, var(--color-bg) 92%, transparent), color-mix(in srgb, var(--color-bg) 55%, transparent) 55%, color-mix(in srgb, var(--color-bg) 35%, transparent)), var(--gradient-hero-overlay)'
          }}
          aria-hidden="true"
        />
        <div className="mx-auto w-full max-w-5xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="animate-fade-up max-w-3xl">
            <p className="mb-5 font-mono text-sm tracking-[0.02em] text-[var(--color-accent)]">
              Hi, I&apos;m
            </p>
            <h1 className="text-display text-gradient-glow">Usman Munawar</h1>
            {/* Signature accent hairline — the one bright stroke in the hero. */}
            <div
              className="mt-6 h-px w-24 bg-[var(--color-accent)]"
              aria-hidden="true"
            />
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-text-secondary)]">
              {heroTagline}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="rounded-md bg-[var(--color-accent)] px-5 py-2.5 text-sm font-medium text-[var(--color-bg)] transition-all duration-[140ms] ease-out hover:-translate-y-px hover:opacity-90 hover:shadow-[var(--glow-accent)] active:translate-y-0 active:scale-[0.98]"
              >
                View projects
              </Link>
              <Link
                href="/blog"
                className="group rounded-md border border-[var(--color-border)] bg-[var(--color-bg-subtle)] px-5 py-2.5 text-sm font-medium text-[var(--color-text-primary)] transition-all duration-[140ms] ease-out hover:-translate-y-px hover:border-[var(--color-accent-muted)] hover:bg-[var(--color-bg-hover)] active:translate-y-0 active:scale-[0.98]"
              >
                Read the blog{' '}
                <span className="text-[var(--color-accent)] transition-transform duration-[120ms] ease-out group-hover:translate-x-0.5 inline-block">
                  ❯
                </span>
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

        {/* Live GitHub public activity — server-fetched at build/revalidate time
            (lib/github.ts). Renders nothing if the API is unreachable/rate-limited. */}
        <GitHubActivity username="usmann-01" />

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
