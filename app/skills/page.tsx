import type { Metadata } from 'next'
import { SkillGroup } from '@/components/skills/SkillGroup'
import { pageMetadata } from '@/lib/metadata'

export const metadata: Metadata = pageMetadata({
  title: 'Skills',
  description: 'Technologies, tools, and areas of knowledge I work with.',
  path: '/skills'
})

// FR-13: skills grouped by category. Static data — no Velite/MDX.
const skillGroups: { category: string; items: string[] }[] = [
  {
    category: 'Languages',
    items: ['C', 'C++', 'Go', 'Python', 'TypeScript', 'SQL']
  },
  {
    category: 'Tools',
    items: ['Git', 'Linux', 'gdb', 'Docker', 'Make', 'Vercel']
  },
  {
    category: 'Concepts',
    items: [
      'Storage engines',
      'B+ trees',
      'Write-ahead logging',
      'Consensus (Raft)',
      'TCP/IP',
      'Operating systems'
    ]
  }
]

export default function SkillsPage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-16">
      <h1 className="mb-2 text-[clamp(1.875rem,4vw,2.5rem)] font-semibold text-[var(--color-text-primary)]">
        Skills
      </h1>
      <p className="mb-8 text-[var(--color-text-secondary)]">
        Technologies, tools, and areas of knowledge I work with.
      </p>

      <div className="flex flex-col gap-8">
        {skillGroups.map((group) => (
          <SkillGroup key={group.category} category={group.category} items={group.items} />
        ))}
      </div>
    </main>
  )
}
