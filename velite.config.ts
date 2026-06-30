import { defineConfig, defineCollection, s } from 'velite'

const posts = defineCollection({
  name: 'Post',
  pattern: 'posts/**/*.mdx',
  schema: s
    .object({
      title: s.string().max(100),
      date: s.isodate(),
      series: s.string().optional(),
      part: s.number().optional(),
      tags: s.array(s.string()),
      summary: s.string().max(200),
      draft: s.boolean().default(true),
      slug: s.path(),
      // Raw MDX source — compiled at render time by next-mdx-remote/rsc.
      content: s.raw()
    })
    .transform((data) => ({
      ...data,
      // s.path() yields "posts/<name>"; the route is a single [slug] segment.
      slug: data.slug.replace(/^posts\//, ''),
      readingTime: Math.ceil(data.content.split(/\s+/).length / 200)
    }))
})

const projects = defineCollection({
  name: 'Project',
  pattern: 'projects/**/*.mdx',
  schema: s
    .object({
      title: s.string().max(100),
      summary: s.string().max(200),
      status: s.enum(['in-progress', 'complete', 'planned']),
      tags: s.array(s.string()),
      seriesId: s.string().optional(),
      githubUrl: s.string().url().optional(),
      startDate: s.isodate(),
      endDate: s.isodate().optional(),
      highlights: s.array(s.string()),
      slug: s.path(),
      // Raw MDX source — compiled at render time by next-mdx-remote/rsc.
      content: s.raw()
    })
    .transform((data) => ({
      ...data,
      // s.path() yields "projects/<name>"; the route is a single [slug] segment.
      slug: data.slug.replace(/^projects\//, '')
    }))
})

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true
  },
  collections: { posts, projects }
})