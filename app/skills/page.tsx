import type { Metadata } from 'next'
import { SkillsGrid } from '@/components/skills/SkillsGrid'
import { pageMetadata } from '@/lib/metadata'

export const metadata: Metadata = pageMetadata({
  title: 'Skills',
  description: 'Technologies, tools, and areas of knowledge I work with.',
  path: '/skills'
})

// Full-screen Skills section (see components/skills/SkillsGrid). The page is a
// thin shell so the section controls its own full-viewport height and centering.
export default function SkillsPage() {
  return (
    <main className="w-full">
      <SkillsGrid />
    </main>
  )
}
