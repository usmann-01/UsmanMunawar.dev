'use client'

import { useState } from 'react'
import { ProjectCard } from '@/components/projects/ProjectCard'
import type { ProjectStatus } from '@/lib/projects'

// Serializable subset of a project — only what the cards need. The full Velite
// Project type carries raw MDX content we don't want to ship to the client.
export interface ExplorerProject {
  slug: string
  title: string
  summary: string
  status: ProjectStatus
  category: string
  tags: string[]
  imageSrc?: string
}

// CR-006: portfolio as a first-class, filterable section. Client-side category
// filter over the project grid; "All" is the default so nothing is hidden.
export function ProjectsExplorer({
  projects,
  categories
}: {
  projects: ExplorerProject[]
  categories: string[]
}) {
  const [active, setActive] = useState<string>('All')

  const filters = ['All', ...categories]
  const visible = active === 'All' ? projects : projects.filter((p) => p.category === active)

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by category">
        {filters.map((filter) => {
          const isActive = filter === active
          return (
            <button
              key={filter}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(filter)}
              className={
                'rounded-full border px-3 py-1.5 text-sm transition-colors duration-[120ms] ease-out ' +
                (isActive
                  ? 'border-[var(--color-accent)] bg-[var(--color-accent-muted)] text-[var(--color-text-primary)]'
                  : 'border-[var(--color-border)] bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-text-primary)]')
              }
            >
              {filter}
            </button>
          )
        })}
      </div>

      {visible.length === 0 ? (
        <p className="text-[var(--color-text-muted)]">No projects in this category yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project) => (
            <ProjectCard
              key={project.slug}
              slug={project.slug}
              title={project.title}
              summary={project.summary}
              status={project.status}
              category={project.category}
              tags={project.tags}
              imageSrc={project.imageSrc}
            />
          ))}
        </div>
      )}
    </div>
  )
}
