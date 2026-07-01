import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/posts'
import { PostCard } from '@/components/blog/PostCard'
import { PageHeader } from '@/components/layout/PageHeader'
import { pageMetadata } from '@/lib/metadata'

export const metadata: Metadata = pageMetadata({
  title: 'Blog',
  description: 'Build logs and deep-dives from systems projects.',
  path: '/blog'
})

export default function BlogIndexPage() {
  const posts = getAllPosts()

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="blog"
        title="Writing"
        intro="Build logs and deep-dives from systems projects — the parts that surprised me, written down."
      />

      {posts.length === 0 ? (
        <p className="text-[var(--color-text-muted)]">No posts yet. Check back soon.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
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
    </main>
  )
}
