import { projects } from '../.velite'

export type Project = (typeof projects)[number]
export type ProjectStatus = Project['status']

// FR-07: projects are sorted by status with in-progress first, then by most
// recent start date within a status group.
const statusOrder: Record<ProjectStatus, number> = {
  'in-progress': 0,
  complete: 1,
  planned: 2
}

export function getAllProjects(): Project[] {
  return [...projects].sort(
    (a, b) =>
      statusOrder[a.status] - statusOrder[b.status] ||
      new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  )
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

// CR-002/CR-006: the set of project categories actually in use, sorted, for the
// portfolio's category filter. Derived from content so no category is hard-coded.
export function getCategories(): string[] {
  return Array.from(new Set(projects.map((project) => project.category))).sort()
}
