import { posts } from '../.velite'

export type Post = (typeof posts)[number]

export function getAllPosts(): Post[] {
  return posts
    .filter((post) => process.env.NODE_ENV === 'development' || !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find(
    (post) =>
      post.slug === slug &&
      (process.env.NODE_ENV === 'development' || !post.draft)
  )
}

export function getPostsBySeries(seriesId: string): Post[] {
  return getAllPosts()
    .filter((post) => post.series === seriesId)
    .sort((a, b) => (a.part ?? 0) - (b.part ?? 0))
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>()
  getAllPosts().forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)))
  return Array.from(tagSet).sort()
}

export function getSeriesNeighbors(post: Post): { prev: Post | null; next: Post | null } {
  if (!post.series) return { prev: null, next: null }
  const seriesPosts = getPostsBySeries(post.series)
  const index = seriesPosts.findIndex((p) => p.slug === post.slug)
  return {
    prev: index > 0 ? seriesPosts[index - 1] : null,
    next: index < seriesPosts.length - 1 ? seriesPosts[index + 1] : null
  }
}