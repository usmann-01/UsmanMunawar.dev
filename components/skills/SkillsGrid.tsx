import type { IconType } from 'react-icons'
import {
  SiC,
  SiCplusplus,
  SiGo,
  SiPython,
  SiTypescript,
  SiReact,
  SiPostgresql,
  SiGit,
  SiGithub,
  SiLinux,
  SiDocker
} from 'react-icons/si'
import { FaJava, FaDatabase, FaCodeBranch } from 'react-icons/fa'

interface Skill {
  name: string
  Icon: IconType
  /** Icon color — brand color where one exists, adjusted for the dark bg. */
  color: string
}

// Data-driven skill list. Add/remove entries here; the grid reflows on its own
// (4 cols desktop → 3 tablet → 2 mobile). Icons are brand logos from
// react-icons in their recognizable brand colors. A few (Version Control, SQL)
// are concepts with no brand mark, so they use a generic icon in the accent.
const skills: Skill[] = [
  { name: 'C', Icon: SiC, color: '#A8B9CC' },
  { name: 'C++', Icon: SiCplusplus, color: '#00599C' },
  { name: 'Go', Icon: SiGo, color: '#00ADD8' },
  { name: 'Python', Icon: SiPython, color: '#3776AB' },
  { name: 'Java', Icon: FaJava, color: '#ED8B00' },
  { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
  { name: 'React', Icon: SiReact, color: '#61DAFB' },
  { name: 'SQL', Icon: FaDatabase, color: '#7C9EFF' },
  { name: 'Postgres', Icon: SiPostgresql, color: '#4169E1' },
  { name: 'Git', Icon: SiGit, color: '#F05032' },
  // GitHub's brand black (#181717) is invisible on the dark bg — use a light tone.
  { name: 'GitHub', Icon: SiGithub, color: '#E6EDF3' },
  { name: 'Version Control', Icon: FaCodeBranch, color: '#7C9EFF' },
  { name: 'Linux', Icon: SiLinux, color: '#FCC624' },
  { name: 'Docker', Icon: SiDocker, color: '#2496ED' }
]

// Full-screen Skills section, themed to the site: a straight "Skills" section
// label with a centered, responsive grid of brand-icon tiles beneath it.
export function SkillsGrid() {
  return (
    <section className="relative flex min-h-[calc(100svh-3.5rem)] w-full items-center">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="mb-12 text-[clamp(1.875rem,4vw,2.5rem)] font-bold uppercase tracking-[0.15em] text-[var(--color-accent)]">
          Skills
        </h1>

        <ul className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
          {skills.map(({ name, Icon, color }) => (
            <li key={name} className="flex justify-center">
              <div className="group flex flex-col items-center gap-4 p-2 text-center">
                <div className="skill-badge flex h-20 w-20 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] sm:h-24 sm:w-24">
                  <Icon
                    role="img"
                    aria-label={`${name} logo`}
                    className="h-10 w-10 sm:h-12 sm:w-12"
                    style={{ color }}
                  />
                </div>
                <span className="text-sm font-medium uppercase tracking-wide text-[var(--color-text-secondary)] transition-colors duration-200 group-hover:text-[var(--color-text-primary)]">
                  {name}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
