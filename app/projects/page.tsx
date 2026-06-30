import type { Metadata } from 'next'
import { getAllProjects } from '@/lib/projects'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { pageMetadata } from '@/lib/metadata'

export const metadata: Metadata = pageMetadata({
  title: 'Projects',
  description: "Projects I've built from scratch.",
  path: '/projects'
})

export default function ProjectsIndexPage() {
  const projects = getAllProjects()

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-16">
      <h1 className="mb-2 text-[clamp(1.875rem,4vw,2.5rem)] font-semibold text-[var(--color-text-primary)]">
        Projects
      </h1>
      <p className="mb-8 text-[var(--color-text-secondary)]">
        Projects I&apos;ve built from scratch.
      </p>

      {projects.length === 0 ? (
        <p className="text-[var(--color-text-muted)]">No projects yet. Check back soon.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {projects.map((project) => (
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
    </main>
  )
}
