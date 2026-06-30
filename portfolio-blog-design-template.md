# 🧠 Portfolio + Blog Website — Design & Analysis Blueprint


## 1. 📌 Project Overview

| Field | Value |
|-------|-------|
| **Site Name** | *Usman Munawar* |
| **Domain** | *e.g., UsmanMunawar.vercel.app or UsmanMunawar.dev* |
| **Version** | 1.0.0 |
| **Date** | *1st July 2026* |
| **Author** | Usman Munawar |
| **Status** | 🟡 Design Phase |
| **Repo URL** | *https://github.com/usmann-01/UsmanMunawar.dev* |
| **Deployed URL** | https://usman-munawar-dev.vercel.app/ |

### Vision Statement
>"A personal site (Portfolio + Blogs) where I document my journey building systems software and my learnings from them  —
> giving future employers and fellow learners a window into how I think, what I've built, and
> what I've learned along the way."

### Goals & Success Criteria

| SC ID | Success Criterion | How to Measure |
|-------|------------------|----------------|
| SC-01 | A recruiter can understand who I am, what I've built, and how to contact me within 60 seconds | Informal user test with 2 people |
| SC-02 | A fellow developer can find, read, and follow a project series without friction | Check time-on-page and series navigation |
| SC-03 | Writing a new blog post takes less than 5 minutes of setup (create file, write, push) | Time yourself on the second post |
| SC-04 | The site scores ≥ 90 on Lighthouse for Performance, Accessibility, SEO | Run Lighthouse after launch |
| SC-05 | The site is easy to navigate and handy.  | Usability test with 3-5 people — give them a task (e.g. "find my contact email"), time it; target under 30s with no wrong clicks.  |
|SC-06| The site is a great source of knowledge and guidance for new Computer Science Graduates | Track blog post time-on-page and direct feedback from 2-3 CS grads on whether a post taught them something.  |
|SC-07| The site becomes loads within 5 seconds on any computer , mobile regardless of the browser | Run Lighthouse/WebPageTest on throttled "Slow 4G"; target LCP < 2.5s, full load < 5s, tested across Chrome/Safari/Firefox/mobile. |



### Out of Scope — v1.0

- No authentication / login (public site only)
- No comments section (v2 consideration)
- No newsletter / email capture (v2 consideration)
- No search functionality (v2 consideration — add Pagefind or Algolia later)
- No i18n / multiple languages
- No heavy elements , 3d rendering , resource demading effects

---

## 2. 👥 Audience & Visitor Personas

> *Who will visit this site? Each persona has different goals and different reading patterns.
> Design for all three — they will all arrive.*

| Persona | Who They Are | What They Want | What They Judge You On |
|---------|-------------|----------------|------------------------|
| **The Recruiter** | Technical hiring manager or sourcerx at a company you'd want to work at | A fast answer: can this person build real things? | Project quality, clarity of writing, signal of depth |
| **The Peer Developer** | A fellow systems programmer, CS student, or open-source enthusiast | Interesting technical content they can learn from or discuss | Technical accuracy, honesty about tradeoffs, depth |
| **The Future You** | Yourself, 2 years from now, looking back | A searchable record of what you built and why | Organization, completeness, date of posts |

### Primary Persona (design to this one)
>
> **The Peer Developer** — write for the person who will care most about
> the content. Recruiters will still find what they need; dumbing it down for recruiters
> makes it worse for everyone.

---

## 3. 📄 Page & Route Inventory

> *Every URL on your site, its purpose, and who it's primarily for.*
> This replaces the Use Case section — for a content site, pages ARE the use cases.

| Route | Page Name | Primary Persona | Purpose | Priority |
|-------|-----------|----------------|---------|----------|
| `/` | Home / Hero | All | First impression, one-liner about you, links to work | High |
| `/about` | About Me | Recruiter / Peer | Bio, background, what you're currently building | High |
| `/projects` | Projects | Recruiter | Showcase of completed or in-progress projects | High |
| `/projects/[slug]` | Project Detail | Recruiter / Peer | Deep-dive on one project: problem, approach, result | Medium |
| `/blog` | Blog Index | Peer | Chronological + tagged list of all posts | High |
| `/blog/[slug]` | Blog Post | Peer | Individual post rendered from MDX | High |
| `/skills` | Skills | Recruiter | Technologies, tools, and areas of knowledge | Medium |
| `/contact` | Contact | Recruiter | How to reach you (email, GitHub, LinkedIn) | High |
| `/uses` | Uses *(optional)* | Peer | Your setup: editor, hardware, tools | Low |
| `/now` | Now *(optional)* | All | What you're currently focused on (updated manually) | Low |
| `404` | Not Found | All | Graceful error page | Medium |

### Critical User Flows

```
[Landing on /]
    |
    +---> [About] ---> [Contact]           (Recruiter path)
    |
    +---> [Projects] ---> [Project Detail]  (Recruiter / Peer path)
    |
    +---> [Blog] ---> [Post] ---> [Series next post]  (Peer / Reader path)
```

---

## 4. ✍️ Content Strategy

> *The most important section for a blog-portfolio hybrid. Bad content strategy is why
> most developer blogs die after two posts. Decide this now, not when you're staring
> at a blank MDX file.*

### Blog Organization Model

Choose one — don't mix models mid-flight:

- [ ] **By Project Series** *(recommended for your case)*: Each project (DBMS, Raft, TCP, OS) gets its own series. Posts are numbered within a series. A reader can follow a project from day 1.
- [ ] By Topic/Tag only
- [ ] Chronological only
- [ ] Hybrid (series + tags)

### Series Plan

> *Define your series before writing a single post. This prevents the chaos of
> "where does this post belong?"*

| Series ID | Series Name | Project | Expected Posts | Status |
|-----------|------------|---------|---------------|--------|
| S-01 | Building a Mini DBMS | Mini-DBMS | *(estimate)* | 🟢 Active |
| S-02 | Implementing a Transformer | Transformer | *(estimate)* | ⬜ Planned |
| S-03 | RAFT + Key-Value Store | RAFT-KV | *(estimate)* | ⬜ Planned |
| S-04 | Building TCP from Scratch | TCP | *(estimate)* | ⬜ Planned |
| S-05 | OS Projects | OS | *(estimate)* | ⬜ Planned |

### Post Type Taxonomy

> *Not every post is the same. Knowing the type before you write keeps posts focused.*

| Type | Description | Example |
|------|-------------|---------|
| **Build Log** | A snapshot of progress: what you tried, what broke, what you learned | "Day 12: Why my B+ tree split was wrong" |
| **Concept Deep-Dive** | You explain a concept you just understood, in your own words | "How Write-Ahead Logging actually works" |
| **Decision Post** | A design decision you made and why | "Why I chose a slotted page format over fixed-size records" |
| **Retrospective** | End-of-project post: surprises, mistakes, would-do-differently | "I built a database — here's everything that surprised me" |
| **Reference** | A page you'll link back to yourself | "Raft consensus: a cheat sheet" |

### MDX Frontmatter Schema

> *Lock this down now. Changing it later means migrating every post.*

```yaml
---
title: "Post title here"
date: "YYYY-MM-DD"
series: "S-01"           # Series ID from table above
part: 3                  # Part number within series (omit for standalone posts)
tags: ["storage", "b-tree", "database"]
summary: "One sentence description shown on the blog index and in meta tags."
readingTime: 8           # Minutes — calculate manually or use a plugin
draft: true              # Set to false to publish. Push drafts freely.
---
```

### Content Principles

> *Rules you commit to. Write them so future-you can't wriggle out of them.*

1. **Write before you fully understand.** "Here's what I'm confused about" is a valid and engaging post.
2. **Be specific.** Link to the exact commit where you fixed a bug. Show the actual error message. Post the actual code.
3. **Don't polish away the struggle.** The wrong turn and how you found it is more valuable than only showing the destination.
4. **One idea per post.** If you're writing about two different things, split it into two posts.
5. **Posting cadence:** *(decide: weekly? per milestone? per confusion?)* — write it here so you can hold yourself to it.

---

## 5. 🗂️ Content Schema (Data Model)

> *Your MDX posts and project entries are your data. Define their shape like you would
> define a database schema — because you are literally designing a schema.*

### Post Entity

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | String | ✅ | Displayed in index, browser tab, and OG tag |
| `date` | ISO Date String | ✅ | Used for sorting and display |
| `series` | String (Series ID) | ❌ | Links post to a series |
| `part` | Integer | ❌ | Part number within a series |
| `tags` | String[] | ✅ | Used for filtering; 2–4 tags max |
| `summary` | String | ✅ | Meta description; ≤ 160 characters |
| `readingTime` | Integer (minutes) | ❌ | Shown in post header |
| `draft` | Boolean | ✅ | Controls publishing; defaults to `true` |
| `slug` | Derived from filename | Auto | Used in URL: `/blog/[slug]` |

### Project Entity

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | String | ✅ | Project name |
| `summary` | String | ✅ | One-line description for the index card |
| `description` | String (MDX) | ✅ | Full write-up rendered on `/projects/[slug]` |
| `status` | Enum | ✅ | `in-progress` / `complete` / `planned` |
| `tags` | String[] | ✅ | Languages, concepts (e.g., "C", "storage engine") |
| `seriesId` | String | ❌ | Links to the blog series about this project |
| `githubUrl` | URL | ❌ | Repo link |
| `startDate` | ISO Date | ✅ | When you started |
| `endDate` | ISO Date | ❌ | When completed (omit if in progress) |
| `highlights` | String[] | ✅ | 3–5 bullet points: what's technically interesting |

### Series Entity

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | String | ✅ | Matches `series` field in Post (e.g., `S-01`) |
| `title` | String | ✅ | Human-readable series name |
| `description` | String | ✅ | What this series covers |
| `project` | String | ✅ | Which project this documents |
| `status` | Enum | ✅ | `active` / `complete` / `hiatus` |

---

## 6. 📋 Functional Requirements

> *What the site must DO.*

| ID | Requirement | Priority | Page(s) |
|----|-------------|----------|---------|
| FR-01 | All MDX files in `/content/posts/` must be automatically indexed and rendered at `/blog/[slug]` | High | Blog |
| FR-02 | Posts with `draft: true` must not appear in the blog index or be accessible via URL in production | High | Blog |
| FR-03 | Blog index must display: title, date, series (if any), tags, summary, reading time | High | Blog |
| FR-04 | Posts belonging to a series must show a series navigation component (Prev / Next in series) | High | Blog Post |
| FR-05 | Code blocks must render with syntax highlighting; language label must be shown | High | Blog Post |
| FR-06 | All pages must have correct `<title>`, `<meta description>`, and Open Graph tags | High | All |
| FR-07 | Projects page must list all projects sorted by status (`in-progress` first) and show a status badge | High | Projects |
| FR-08 | Blog index must be filterable by tag (client-side; no page reload required) | Medium | Blog |
| FR-09 | Contact page must show email, GitHub, LinkedIn, and optionally X/Twitter | High | Contact |
| FR-10 | Site must have an RSS feed at `/rss.xml` for blog posts | Medium | Global |
| FR-11 | A `sitemap.xml` must be generated automatically on build | Medium | Global |
| FR-12 | Each blog post must show: title, date, reading time, tags, series info, and body content | High | Blog Post |
| FR-13 | Skills page must group technologies by category (e.g., Languages, Tools, Concepts) | Medium | Skills |
| FR-14 | The home page must show: a one-liner, a short bio, 2–3 featured projects, and 3 recent blog posts | High | Home |

---

## 7. ⚡ Non-Functional Requirements

> *How the site must PERFORM and BEHAVE.*

| ID | Category | Requirement | Target |
|----|----------|-------------|--------|
| NFR-01 | Performance | Lighthouse Performance score | ≥ 90 |
| NFR-02 | Performance | First Contentful Paint (FCP) | < 1.5s |
| NFR-03 | Performance | Largest Contentful Paint (LCP) | < 2.5s |
| NFR-04 | SEO | Lighthouse SEO score | ≥ 95 |
| NFR-05 | Accessibility | Lighthouse Accessibility score | ≥ 90 |
| NFR-06 | Accessibility | All images must have alt text | 100% |
| NFR-07 | Accessibility | Site must be keyboard-navigable | Manual check |
| NFR-08 | Responsiveness | Layout must work on mobile (375px), tablet (768px), and desktop (1280px) | Visual check |
| NFR-09 | Maintainability | Adding a new blog post requires only creating one `.mdx` file and pushing | ≤ 5 min setup |
| NFR-10 | Maintainability | Adding a new project requires only creating one entry and pushing | ≤ 5 min setup |
| NFR-11 | Build | Cold build time must complete successfully on Vercel's free tier | Pass CI |
| NFR-12 | Fonts | Custom fonts (if any) must load with `font-display: swap` to prevent invisible text | Code review |

---

## 8. 🎨 Visual Design & Branding

> Decide the visual identity before coding. Every CSS decision derives from this
> section. If a token isn't here, it'll get invented inconsistently in the code.

---

### Design Inspiration

| Source | What to borrow |
|--------|----------------|
| **Discord** | Layered dark surfaces (each shade is a deliberate elevation step), tight 4–8px radii, accent color used *sparingly*, generous muted gray for secondary text |
| **Obsidian** | Calm low-contrast palette for long reading sessions, separation via tone rather than borders or shadows, content-first layout with minimal chrome |

**Shared thread:** no pure black, no pure white, no drop shadows, no gradients. Depth comes from *stacked layers of dark gray* ("elevation via tint") — each layer a few percent lighter than the one below.

---

### Personality Attributes

1. **Calm** — low-contrast, easy on the eyes for long technical reads
2. **Precise** — sharp typography, deliberate spacing, no decorative noise
3. **Layered** — depth from subtle tonal shifts, never from shadow or gradient

---

### Color Palette

> Each background token is a distinct elevation step. Content sits "above" the
> page by being a shade lighter, not by casting shadow.

#### Surfaces

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-bg` | `#1a1b1e` | Page background (base layer) |
| `--color-bg-elevated` | `#202225` | Nav, footer — one step above base |
| `--color-bg-subtle` | `#26282c` | Cards, inline code, code-block surround |
| `--color-bg-hover` | `#2e3035` | Hover state for cards and list items |
| `--color-border` | `#2f3136` | 1px seams where two same-tone surfaces touch |

#### Text

| Token | Hex | Contrast on `--color-bg` | Usage |
|-------|-----|--------------------------|-------|
| `--color-text-primary` | `#dcddde` | 12.4:1 (AAA) | Body, headings |
| `--color-text-secondary` | `#a3a6aa` | 6.6:1 (AA+) | Dates, subtitles, metadata |
| `--color-text-muted` | `#9296a0` | 5.0:1 (AA) | Tags, captions, low-priority text |

> Bumped from the original `#72767d`, which fails AA on `--color-bg` (~3.5:1) and on `--color-bg-hover` (~2.9:1, where tags live). `#9296a0` still reads "muted" while clearing AA on every surface.

#### Accent & Semantic

| Token | Hex | Contrast on `--color-bg` | Usage |
|-------|-----|--------------------------|-------|
| `--color-accent` | `#7c9eff` | 6.6:1 (AA+) | Links, active states, primary buttons |
| `--color-accent-muted` | `#3b3f8c` | — | Active-nav underline, blockquote bar |
| `--color-focus-ring` | `#7c9eff` @ 50% alpha | — | 2px ring with 2px offset on all interactive elements |
| `--color-selection` | `#7c9eff` @ 30% alpha | — | Text selection background |
| `--color-success` | `#3ba55d` | 4.6:1 | "Complete" status |
| `--color-in-progress` | `#faa61a` | 9.1:1 | "In Progress" status |
| `--color-danger` | `#ed4245` | 4.7:1 | Errors, destructive actions |

> **Why not Discord blurple `#5865f2` as the accent?** (1) It hits only 3.4:1 contrast on `--color-bg`, failing WCAG AA for body text. (2) It's instantly recognizable as Discord's brand color — using it makes the site read as a Discord embed rather than your own work. `#7c9eff` is in the same family, passes AA, and reads as yours.

#### Non-negotiables

- Never use `#000000` or `#ffffff` anywhere.
- Elevation = lighter background, not `box-shadow`. The only acceptable shadow is the focus ring.
- Borders are seams, not chrome. Use `--color-border` only where two same-tone surfaces touch and need a visible edge.

---

### Typography

**Two families total: one sans, one mono.** Do not mix display and body fonts.

| Role | Family | Weight | Size | Notes |
|------|--------|--------|------|-------|
| Display | Geist Sans | 600 | `clamp(1.875rem, 4vw, 2.5rem)` | Page titles, hero |
| Heading | Geist Sans | 600 | 1.5 / 1.25 / 1.125rem (h2/h3/h4) | Section headers in posts |
| Body | Geist Sans | 400 | 1rem, line-height 1.65 | All prose |
| Code | Geist Mono | 400 | 0.875rem, line-height 1.55 | Block + inline code |
| Mono metadata | Geist Mono | 400 | 0.75rem, letter-spacing 0.02em | Dates, tags, reading time |

> **Why Geist over Inter?** Both work — pick one and move on. Geist Sans pairs natively with Geist Mono (single foundry, consistent metrics), is designed for code-adjacent UIs, and matches the dev-tool feel you want. Inter is the safer choice if you need broader character set coverage. Don't ship with "either."

> **Where the mono-metadata idea actually comes from.** Discord uses `gg sans` for *everything*, including channel metadata — it is not a mono-metadata reference. The terminal/dev-tool look you want (mono dates and tags) is closer to **GitHub commits, Vercel logs, and Linear's keyboard hints**. Keep the move, fix the rationale.

Load both via `next/font/local` — self-hosted, zero CLS, no Google Fonts request (preserves the offline-first feel of Obsidian).

---

### Spacing & Radii

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | 4px | Icon-to-text, inline gaps |
| `--space-sm` | 8px | Between tags, tight clusters |
| `--space-md` | 16px | Card padding, button padding |
| `--space-lg` | 32px | Between sections within a page |
| `--space-xl` | 64px | Page section breaks, hero |
| `--radius-sm` | 4px | Tags, badges, inline code |
| `--radius-md` | 8px | Cards, buttons, code blocks |
| `--radius-lg` | 12px | Modals, large containers |

> Discord and Obsidian both use small consistent radii (4–8px). No fully-rounded pill buttons except tags/badges — reads as precise, not playful.

---

### Prose

The blog *is* the product. These tokens govern how posts read.

| Property | Value |
|----------|-------|
| `--prose-max-width` | 68ch (~640px at base font size) |
| Paragraph spacing | 1em |
| Heading spacing (above) | 2em h2, 1.5em h3 |
| Inline code | `--color-bg-subtle` bg, `--radius-sm`, 0.875em mono, 0.1em horizontal padding |
| Blockquote | 3px left border in `--color-accent-muted`, `--color-text-secondary` text, no bg fill |
| Horizontal rule | 1px `--color-border`, 3em vertical margin, no decoration |
| Table | `--color-border` 1px grid, header row in `--color-bg-subtle`, cell padding 8px 12px |
| Inline link | `--color-accent`, no underline default, underline on hover only |
| Image | `--radius-md`, no border, optional caption below in `--color-text-secondary` at 0.875rem |

---

### Component Visual Notes

| Component | Spec |
|-----------|------|
| **Post card** | `--color-bg-subtle` bg, 1px `--color-border`, `--radius-md`, no shadow. Hover → `--color-bg-hover`. Transition 120ms ease-out. |
| **Code block** | `--color-bg-elevated` (one step darker than the surrounding card for an Obsidian-style "well"), language label top-right in `--color-text-secondary` mono, `--radius-md`. No accent border unless the syntax theme requires one. |
| **Tag** | `--radius-sm` pill, `--color-bg-hover` bg, `--color-text-muted` text. Non-interactive — purely informational. |
| **Nav** | Sticky top, `--color-bg-elevated`, 1px `--color-border` bottom only. Active link: 2px `--color-accent` underline, 2px offset. |
| **Series navigator** | `←` prev / next `→` row below post body, each side in a `--color-bg-subtle` card. Hover → `--color-bg-hover`. |
| **Sidebar** *(v2)* | `--color-bg-elevated`, collapsible sections. Active item: 3px `--color-accent` left bar, no bg fill. |
| **Primary button** | `--color-accent` bg, `--color-bg` text (not white — preserves the no-pure-white rule), `--radius-md`. Hover: slightly darker accent. No shadow, no scale. |
| **Focus state** | 2px `--color-focus-ring` outline, 2px offset, on every interactive element. Never `outline: none` without a visible replacement. |

---

### Motion

| Property | Value |
|----------|-------|
| Default duration | 120ms |
| Default easing | `ease-out` (decelerating — responsive on enter, calm on exit) |
| What transitions | `background-color`, `border-color`, `color`, `opacity` only |
| What never transitions | `transform`, `box-shadow`, `width`, `height` (no scale/grow effects — preserves the no-theatrics feel) |
| Reduced motion | `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; } }` |

---

### Dark Mode

- [x] **Dark-first, dark-only for v1.** Both reference apps are dark-native; their light themes are afterthoughts. Don't split effort.
- [ ] **Light theme: backlog.** Revisit if a real user asks. If shipped, it's an inverse of this palette, not a separate aesthetic.

---

### v1 Scope Checklist

**Ships in v1:** page bg, nav, post card grid, post page (prose + code blocks + inline code + tags), series navigator, footer, focus states, reduced-motion handling.

**Backlog:** sidebar, light mode, table of contents inside posts, search, syntax theme tuning, image lightbox.


---

## 9. 🏗️ Site Architecture

> *How the codebase is organized. A clear file structure is half the battle.*

### Directory Structure

```
/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Home ( / )
│   ├── about/
│   │   └── page.tsx              # /about
│   ├── projects/
│   │   ├── page.tsx              # /projects — index
│   │   └── [slug]/
│   │       └── page.tsx          # /projects/[slug] — detail
│   ├── blog/
│   │   ├── page.tsx              # /blog — index
│   │   └── [slug]/
│   │       └── page.tsx          # /blog/[slug] — post
│   ├── skills/
│   │   └── page.tsx              # /skills
│   ├── contact/
│   │   └── page.tsx              # /contact
│   └── layout.tsx                # Root layout (nav, footer, fonts)
│
├── content/                      # All your writing lives here
│   ├── posts/                    # Blog posts as .mdx files
│   │   ├── s01-dbms-01-storage-design.mdx
│   │   └── s01-dbms-02-btree-insert.mdx
│   └── projects/                 # Project entries as .mdx files
│       ├── mini-dbms.mdx
│       └── raft-kv.mdx
│
├── components/                   # Reusable React components
│   ├── layout/
│   │   ├── Nav.tsx
│   │   └── Footer.tsx
│   ├── blog/
│   │   ├── PostCard.tsx
│   │   ├── SeriesNav.tsx
│   │   └── TagFilter.tsx
│   ├── projects/
│   │   └── ProjectCard.tsx
│   └── mdx/
│       └── MDXComponents.tsx     # Custom components usable inside .mdx files
│
├── lib/                          # Data fetching and utility functions
│   ├── posts.ts                  # getAllPosts(), getPostBySlug()
│   ├── projects.ts               # getAllProjects(), getProjectBySlug()
│   └── series.ts                 # getSeriesForPost(), getAllSeries()
│
├── public/                       # Static assets
│   ├── favicon.ico
│   └── og-image.png              # Default Open Graph image
│
├── styles/
│   └── globals.css               # CSS variables, base styles
│
├── content.config.ts             # Velite / Contentlayer schema definition
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

### Data Flow: How a Blog Post Gets Rendered

```
[.mdx file in /content/posts/]
          |
          | (Velite / Contentlayer parses frontmatter + MDX on build)
          ▼
[Typed Post object in /lib/posts.ts]
          |
          | getPostBySlug(slug) called in /app/blog/[slug]/page.tsx
          ▼
[generateStaticParams() → static HTML page generated at build time]
          |
          ▼
[User visits /blog/my-post → served as static HTML from Vercel CDN]
```

---

## 10. 🧩 Component Inventory

> *Every React component you'll need to build. Define purpose and props now —
> code becomes mechanical assembly when you've thought this through.*

| Component | Location | Purpose | Key Props |
|-----------|----------|---------|-----------|
| `Nav` | `layout/Nav.tsx` | Site-wide navigation bar | `currentPath` |
| `Footer` | `layout/Footer.tsx` | Site-wide footer with links | — |
| `PostCard` | `blog/PostCard.tsx` | Blog index list item | `title`, `date`, `summary`, `tags`, `series`, `slug` |
| `TagFilter` | `blog/TagFilter.tsx` | Client-side tag filtering on blog index | `tags`, `activeTag`, `onTagChange` |
| `SeriesNav` | `blog/SeriesNav.tsx` | Prev/Next navigation within a series | `prev`, `next` (post objects) |
| `SeriesBadge` | `blog/SeriesBadge.tsx` | Inline badge showing "Part N of Series Name" | `series`, `part` |
| `ProjectCard` | `projects/ProjectCard.tsx` | Project index card | `title`, `summary`, `status`, `tags`, `slug` |
| `StatusBadge` | `projects/StatusBadge.tsx` | "In Progress" / "Complete" pill | `status` |
| `MDXComponents` | `mdx/MDXComponents.tsx` | Custom HTML elements used inside MDX | — |
| `Callout` | `mdx/Callout.tsx` | Info/warning box usable in MDX posts | `type` (`info`/`warn`/`tip`), `children` |
| `CodeBlock` | `mdx/CodeBlock.tsx` | Syntax-highlighted code with language label | `language`, `children` |
| `SkillGroup` | `skills/SkillGroup.tsx` | A category of skills with a heading | `category`, `items[]` |

---

## 11. ⚙️ Tech Stack

> *Finalize your choices here before starting. Treat a change mid-project as a formal
> decision that must update this section.*

| Layer | Decision | Version | Reason |
|-------|----------|---------|--------|
| Framework | Next.js (App Router) | Latest | SSG + MDX + great Vercel integration |
| Language | TypeScript | Latest | Type-safe frontmatter; catch errors early |
| Styling | Tailwind CSS | v4 | Utility-first; fast for minimal design |
| Content / MDX | Velite *or* Contentlayer | Latest | Typed frontmatter, auto-indexing |
| Syntax Highlighting | `rehype-pretty-code` + Shiki | Latest | Best-in-class highlighting, theme support |
| Reading Time | `reading-time` | Latest | Pass raw MDX text, get minutes back |
| Fonts | `next/font` | Built-in | Zero layout shift, zero extra config |
| Deployment | Vercel | — | Zero-config Next.js, instant previews |
| CI | Vercel (auto-deploy on push) | — | Auto-deploys every push to `main` |
| Package Manager | *(npm / pnpm / bun — choose one)* | | |
| OG Images | `@vercel/og` *or* static fallback | | Dynamic per-post social cards (optional) |

> **Decision to make:** Velite vs Contentlayer. Contentlayer is more widely documented
> but has been unmaintained. Velite is actively developed, has a near-identical API,
> and is the safer long-term bet. Decide here: _______________

---

## 12. 🔍 SEO & Performance Strategy

> *SEO is free traffic. Systems programming content gets discovered by people looking up
> Raft, B+ trees, TCP, and so on. Get the metadata right from day one.*

### Per-Page Metadata Requirements

| Page | `<title>` Format | `<meta description>` Source |
|------|-----------------|----------------------------|
| Home | `Your Name — Systems Developer` | Your vision statement summary |
| About | `About — Your Name` | First paragraph of about page |
| Projects | `Projects — Your Name` | Static: "Projects I've built from scratch" |
| Blog Index | `Blog — Your Name` | Static: "Build logs and deep-dives from systems projects" |
| Blog Post | `[post.title] — Your Name` | `post.summary` from frontmatter |
| Project Detail | `[project.title] — Your Name` | `project.summary` from frontmatter |

### Open Graph Tags (required on every page)

```html
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:url" content="..." />
<meta property="og:type" content="website" (or "article" for posts) />
<meta property="og:image" content="..." />
<meta name="twitter:card" content="summary_large_image" />
```

### Structured Data

- [ ] Add `Person` schema on `/about`
- [ ] Add `Article` schema on `/blog/[slug]`
- [ ] Add `BreadcrumbList` on project and post detail pages

### Performance Checklist

- [ ] Use `next/image` for all images (automatic WebP, lazy-load, size hints)
- [ ] Use `next/font` for all custom fonts
- [ ] All blog pages are statically generated (SSG) — no SSR at runtime
- [ ] No client-side data fetching for content (all resolved at build time)
- [ ] `TagFilter` is the only client component on the blog index; everything else is server

---

## 13. 🚀 Deployment & CI/CD

> *How code gets from your laptop to the live URL.*

### Pipeline

```
[git push to main]
        |
        ▼
[Vercel auto-detects push]
        |
        ▼
[Build: next build]
  ├── Velite/Contentlayer parses all .mdx files
  ├── generateStaticParams() pre-renders all routes
  ├── sitemap.xml generated
  └── RSS feed generated
        |
        ▼
[Deploy to Vercel CDN]
        |
        ▼
[Preview URL on PR / Production URL on merge to main]
```

### Branch Strategy

| Branch | Purpose | Auto-Deploy? |
|--------|---------|--------------|
| `main` | Production — live site | ✅ Yes → production URL |
| `draft/post-name` | Draft posts — push without publishing | ✅ Yes → preview URL only |
| `feat/feature-name` | New features | ✅ Yes → preview URL only |

> 💡 Use `draft: true` in frontmatter to push writing to git without it appearing on
> the live site. This keeps your writing version-controlled even before it's ready.

### Environment Variables

| Variable | Value | Where Set |
|----------|-------|-----------|
| `NEXT_PUBLIC_SITE_URL` | `https://yourname.dev` | Vercel dashboard |
| *(add others as needed)* | | |

---

## 14. ⚠️ Risk Analysis

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Content schema changes after posts are written | High | Medium | Lock frontmatter schema (Section 5) before writing first post |
| Velite / Contentlayer breaking change | Medium | High | Pin dependency version; check changelog before upgrading |
| Build fails because of malformed MDX | Medium | Medium | Add a pre-commit lint step; write a test post as first PR |
| Inconsistent post quality makes you stop writing | High | High | Commit to a post type (build log) that removes the perfectionism trap |
| "Too many ideas, no posts shipped" | High | High | Write post 1 before building any new feature |
| Dark mode CSS bleed / inconsistency | Medium | Low | Use a single set of CSS variables; never hardcode colors |
| OG images show wrong data | Low | Medium | Manually check 3 posts in Twitter Card Validator after launch |

---

## 15. 📅 Project Phases & Milestones

> *Build in this order. The wrong order is: design everything, then code everything.
> The right order is: get something live first, then add features.*

| Phase | Name | Goal | Deliverable | Gate Before Next |
|-------|------|------|-------------|-----------------|
| **Phase 0** | Design | Complete this document | Filled-in blueprint | All sections complete |
| **Phase 1** | Skeleton | Get a URL live on Vercel | `Hello World` at yourname.vercel.app | Deploy confirmed working |
| **Phase 2** | Content pipeline | MDX post renders correctly | One real post live at `/blog/[slug]` | Post is readable and styled |
| **Phase 3** | Core pages | Home, About, Projects, Contact | All 4 pages live with real content | All pages pass Lighthouse ≥ 90 |
| **Phase 4** | Blog index | Post list, tags, series nav | Blog index functional | Filter and series nav tested |
| **Phase 5** | Polish | SEO, OG tags, RSS, sitemap | Lighthouse green, RSS valid | Validated in tools |
| **Phase 6** | Launch | Announce, share first post | Published to HN, lobste.rs, or X | — |
| **Post-launch** | Ongoing | Write posts, add projects | One post per milestone | — |

---

## 16. ✅ Design Review Checklist

> *Before writing a single line of code, confirm every item below is done.
> An unchecked box here is a decision that will be made badly under pressure.*

### Content & Strategy
- [ ] Vision statement written
- [ ] All three visitor personas defined; primary persona chosen
- [ ] All pages and routes listed in Section 3
- [ ] Series plan defined (Section 4)
- [ ] Post type taxonomy understood
- [ ] MDX frontmatter schema finalized and locked
- [ ] Content principles written (your rules for writing)

### Design
- [ ] Color palette defined (all 7 tokens filled in)
- [ ] Typography defined (display + body + code fonts chosen)
- [ ] Dark mode decision made
- [ ] Component inventory complete

### Technical
- [ ] Directory structure decided
- [ ] Tech stack finalized (especially: Velite vs Contentlayer)
- [ ] All functional requirements written and testable
- [ ] All non-functional requirements have a measurable target
- [ ] Data flow diagram understood (how MDX becomes a rendered page)

### SEO
- [ ] `<title>` format decided for every page
- [ ] OG tag strategy decided
- [ ] `sitemap.xml` and RSS feed in scope for v1

### Launch
- [ ] Where will you announce? (HN, lobste.rs, X, Discord)
- [ ] First post topic decided (write it before launch so the blog isn't empty)
- [ ] `draft: true` workflow understood so you can push WIP without publishing

### Sign-off
- [ ] All open questions in Section 17 resolved
- [ ] Ready to write code

---

## 17. ❓ Open Questions & Decisions Log

> *Track everything that's unresolved. Nothing goes to code with an open question next to it.*

| # | Question | Status | Decision / Resolution |
|---|----------|--------|----------------------|
| 1 | Velite or Contentlayer for MDX parsing? | ❓ Open | Velite |
| 2 | Which font(s)? Decided in Section 8? | ❓ Open | Discussed in UI spec above|
| 3 | Dark mode in v1 or v2? | ❓ Open | Dark mode only website |
| 4 | Dynamic OG images (per-post) or a single static fallback? | ❓ Open |Image |
| 5 | Monorepo (blog + projects in one repo) or separate? | ✅ Decided | One repo — see game plan |
| 6 | Vercel or GitHub Pages? | ✅ Decided | Vercel — see game plan |
| 7 | `/uses` and `/now` pages in v1 or v2? | ❓ Open | v1|
| 8 | What is the domain name? | ❓ Open |https://usman-munawar-dev.vercel.app/ |
| 9 | Tag filter: client-side (instant) or URL param (shareable)? | ❓ Open | |
| 10 | *(add your own)* | | |

---

## 18. 📝 Glossary

| Term | Definition |
|------|------------|
| MDX | Markdown + JSX — a file format that lets you use React components inside Markdown posts |
| Frontmatter | YAML metadata at the top of an MDX file (title, date, tags, etc.) |
| Slug | The URL-safe version of a post title, derived from the filename: `my-first-post.mdx` → `/blog/my-first-post` |
| SSG | Static Site Generation — pages are built to HTML at deploy time, not per request |
| Velite | An MDX + content pipeline library; successor to Contentlayer |
| Series | A numbered sequence of blog posts all about the same project |
| OG Image | Open Graph image — the preview card shown when your link is shared on Slack, Twitter, etc. |
| `draft: true` | A frontmatter flag that hides a post from the public blog index while keeping it in git |
| App Router | Next.js's modern routing system based on the `/app` directory (vs. the older `/pages`) |

---

## 19. 📚 Reference Library

> *The decisions in this template are informed by the following resources.
> Use them if you want to go deeper on any section.*

| Reference | Section | What It Covers |
|-----------|---------|----------------|
| [Next.js Docs — App Router](https://nextjs.org/docs/app) | 9, 11, 13 | Official guide to the App Router, layouts, static generation |
| [Velite Docs](https://velite.js.org) | 9, 11 | MDX pipeline setup, schema definition, frontmatter typing |
| [rehype-pretty-code](https://rehype-pretty-code.netlify.app/) | 11 | Syntax highlighting setup and configuration |
| [Google Search Central — SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) | 12 | Canonical SEO fundamentals |
| [web.dev — Core Web Vitals](https://web.dev/vitals/) | 7, 12 | LCP, FID, CLS — what they are and how to hit them |
| [Open Graph Protocol](https://ogp.me/) | 12 | Full OG meta tag specification |
| [Twitter Card Validator](https://cards-dev.twitter.com/validator) | 12 | Test OG / Twitter card rendering |
| [Schema.org — Article](https://schema.org/Article) | 12 | Structured data for blog posts |
| [Vercel Docs](https://vercel.com/docs) | 13 | Deployment, env variables, preview URLs |
| [Josh Comeau's CSS for JS Devs](https://css-for-js.dev/) | 8 | Deep CSS knowledge for building reliable, responsive layouts |
| *The Pragmatic Programmer* — Hunt & Thomas | All | Craft and professional habits relevant to every section |

---

*Document Version: 1.0 | Last Updated: \_\_\_\_\_\_\_\_\_\_ | Status: 🔴 Incomplete — Fill before dev*

> **Next step:** Fill every ❓ in Section 17 and every blank in Sections 5, 8, and 11.
> When the Design Review Checklist (Section 16) is fully checked, you're ready to code.
