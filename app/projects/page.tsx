import type { Metadata } from 'next'
import { getAllProjects, getCategories } from '@/lib/projects'
import { ProjectsExplorer } from '@/components/projects/ProjectsExplorer'
import { pageMetadata } from '@/lib/metadata'
import { assetExists } from '@/lib/assets'

export const metadata: Metadata = pageMetadata({
  title: 'Projects',
  description: 'Things I’ve built from scratch — desktop apps, tools, and systems software.',
  path: '/projects'
})

export default function ProjectsIndexPage() {
  const projects = getAllProjects()
  const categories = getCategories()

  // Strip raw MDX content before handing off to the client explorer, and
  // resolve each project's cover image server-side (fs isn't available once
  // this data crosses into the client ProjectsExplorer component).
  const explorerProjects = projects.map(({ slug, title, summary, status, category, tags }) => {
    const asset = `/assets/projects/${slug}.jpg`
    return {
      slug,
      title,
      summary,
      status,
      category,
      tags,
      imageSrc: assetExists(asset) ? asset : undefined
    }
  })

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="mb-10 max-w-2xl animate-fade-up">
        <h1 className="mb-3 text-[clamp(1.875rem,4vw,2.5rem)] font-semibold text-[var(--color-text-primary)]">
          Projects
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)]">
          A cross-section of what I build — from desktop apps and tools to systems software.
          Filter by category to explore.
        </p>
      </header>

      {projects.length === 0 ? (
        <p className="text-[var(--color-text-muted)]">No projects yet. Check back soon.</p>
      ) : (
        <ProjectsExplorer projects={explorerProjects} categories={categories} />
      )}
    </main>
  )
}
