import type { ComponentType, SVGProps } from 'react'
import {
  SiC,
  SiCplusplus,
  SiGo,
  SiPython,
  SiTypescript,
  SiGit,
  SiLinux,
  SiDocker
} from 'react-icons/si'

interface Skill {
  name: string
  Icon: ComponentType<SVGProps<SVGSVGElement>>
  /** Official brand color (simple-icons hex) — applied to the icon only. */
  color: string
}

// Data-driven skill list. Add/remove entries here; the grid reflows on its own
// (4 cols desktop → 3 tablet → 2 mobile). Icons are brand logos from
// react-icons/si (simple-icons) in their recognizable brand colors.
const skills: Skill[] = [
  { name: 'C', Icon: SiC, color: '#A8B9CC' },
  { name: 'C++', Icon: SiCplusplus, color: '#00599C' },
  { name: 'Go', Icon: SiGo, color: '#00ADD8' },
  { name: 'Python', Icon: SiPython, color: '#3776AB' },
  { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
  { name: 'Git', Icon: SiGit, color: '#F05032' },
  { name: 'Linux', Icon: SiLinux, color: '#FCC624' },
  { name: 'Docker', Icon: SiDocker, color: '#2496ED' }
]

// Full-screen Skills section (matches the reference layout, themed to the site):
// a vertical "Skills" label anchored to the left edge, with a centered,
// responsive grid of brand-icon tiles filling the space to its right.
export function SkillsGrid() {
  return (
    <section className="relative flex min-h-[calc(100svh-3.5rem)] w-full items-center">
      <div className="mx-auto flex w-full max-w-6xl items-stretch gap-6 px-4 py-16 sm:gap-10 sm:px-6 lg:px-8">
        {/* Vertical section label — anchored left on tablet/desktop. */}
        <div className="hidden shrink-0 items-center justify-center sm:flex">
          <h1 className="select-none rotate-180 text-[clamp(2.5rem,7vw,5rem)] font-bold uppercase leading-none tracking-[0.25em] text-[var(--color-accent)] [writing-mode:vertical-rl]">
            Skills
          </h1>
        </div>

        {/* Grid area — vertically + horizontally centered in the section. */}
        <div className="flex flex-1 flex-col items-center justify-center">
          {/* On mobile the label moves to the top instead of the side. */}
          <h1 className="mb-10 text-4xl font-bold uppercase tracking-[0.25em] text-[var(--color-accent)] sm:hidden">
            Skills
          </h1>

          <ul className="grid w-full grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
            {skills.map(({ name, Icon, color }) => (
              <li key={name} className="flex justify-center">
                <div className="group flex flex-col items-center gap-4 p-2">
                  <div className="skill-badge flex h-20 w-20 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] sm:h-24 sm:w-24">
                    <Icon
                      role="img"
                      aria-label={`${name} logo`}
                      className="h-10 w-10 transition-transform duration-200 ease-out sm:h-12 sm:w-12"
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
      </div>
    </section>
  )
}
