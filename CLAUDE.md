@AGENTS.md

# Portfolio — Pahmi Alifya Bahri

Personal portfolio website with futuristic "Digital Cosmos" theme. Full animations, dark/light mode, real-time GitHub data.

## Stack

- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 — uses `@import "tailwindcss"` (NOT `@tailwind base/components/utilities`)
- **Animations**: CSS keyframes in `globals.css` + Framer Motion (available but prefer CSS for simple animations)
- **Theme**: `next-themes` with `attribute="class"`, default dark. CSS vars on `:root` (light) and `.dark` (dark)
- **GitHub data**: SWR → `/api/github` (Next.js Route Handler proxying GitHub REST API)
- **Charts**: Recharts (`RadarChart`, bar fills)
- **Icons**: `lucide-react` — **NOTE: `Github` and `Linkedin` do NOT exist in this version.** Use `GithubIcon` and `LinkedinIcon` from `@/components/ui/SocialIcons`

## Dev

```bash
npm run dev    # http://localhost:3000
npm run build  # production build check
```

## Project Structure

```
app/
  layout.tsx          ← fonts (Geist + Space Grotesk), ThemeProvider, SEO metadata
  page.tsx            ← assembles all sections
  globals.css         ← CSS vars (--bg, --primary, --accent, --purple + *-glow variants), keyframes, utility classes
  api/github/route.ts ← proxies GitHub REST API, revalidates every 1h

components/
  providers/
    ThemeProvider.tsx ← wraps next-themes
  sections/
    Navbar.tsx        ← fixed, blur-on-scroll, active section highlight, mobile menu
    Hero.tsx          ← particle canvas (dynamic import, ssr:false), glitch name, typewriter roles
    About.tsx         ← orbit-ring avatar placeholder, animated stats counters
    Skills.tsx        ← grid by category, hover glow color per tech
    Experience.tsx    ← vertical timeline, expand/collapse cards, tech badges per role
    Projects.tsx      ← top repos from GitHub API, language colors, stars/forks
    GitHubStats.tsx   ← stat counters, RadarChart languages, bar chart distribution
    Contact.tsx       ← contact links + form (UI only — wire Resend/EmailJS for real sending)
    Footer.tsx
  three/
    ParticleField.tsx ← pure Canvas 2D particle system (no Three.js dependency despite path)
  ui/
    TechBadge.tsx     ← colored badge using getTechColor(), CSS animation badge-reveal
    AnimatedCounter.tsx ← IntersectionObserver-based count-up animation
    SocialIcons.tsx   ← GithubIcon, LinkedinIcon (SVG, lucide doesn't have these)

data/
  experience.ts       ← all work history with techStack arrays — edit here to update Experience section
  skills.ts           ← skillCategories (label + skills[]) — edit here to update Skills section

lib/
  techColors.ts       ← getTechColor(name) → { bg, text, border, glow } — add new techs here
  utils.ts            ← cn() (clsx + tailwind-merge)

hooks/
  useGitHub.ts        ← SWR hook for /api/github, 1h dedup
```

## CSS Design System

All colors via CSS custom properties — never hardcode hex values for theme-aware colors:

| Variable       | Purpose                               |
| -------------- | ------------------------------------- |
| `--bg`         | Page background                       |
| `--bg-surface` | Alternate section background          |
| `--bg-card`    | Card background                       |
| `--border`     | Border color                          |
| `--primary`    | Indigo (#6366f1 dark / #4f46e5 light) |
| `--accent`     | Cyan (#06b6d4 dark / #0891b2 light)   |
| `--purple`     | Purple (#a855f7 dark / #7c3aed light) |
| `--*-glow`     | rgba glow versions for box-shadow/bg  |
| `--text`       | Primary text                          |
| `--text-muted` | Secondary text                        |
| `--text-faint` | Tertiary / metadata text              |

Key utility classes (defined in `globals.css`):

- `.gradient-text` — animated indigo→cyan→purple gradient text
- `.glow-border` — border that glows on hover
- `.card-surface` — standard card with hover lift
- `.section-padding` — responsive section padding
- `.section-title` — Space Grotesk heading style
- `.section-badge` — small label pill above section titles

Key keyframes: `glitch-1`, `glitch-2`, `float`, `pulse-ring`, `orbit`, `orbit-reverse`, `badge-reveal`, `blink`, `glow-pulse`, `gradient-shift`

## Adding New Content

**New tech skill** → add to `data/skills.ts` skillCategories, add color in `lib/techColors.ts`

**New experience** → prepend to `experiences` array in `data/experience.ts`

**Avatar photo** → replace `<User>` icon in `components/sections/About.tsx` with `<Image src="/avatar.png" ...>`, put photo in `public/`

**Contact form backend** → `components/sections/Contact.tsx` `handleSubmit` — replace the `setTimeout` mock with a `fetch('/api/contact', ...)` call

**GitHub token** (avoid rate limits) → set `GITHUB_TOKEN` env var in `.env.local`

## Known Gotchas

- `ParticleField` must stay in a `dynamic(() => import(...), { ssr: false })` wrapper — it uses `window`/`canvas`
- `next-themes` requires `suppressHydrationWarning` on `<html>` to avoid hydration mismatch
- Tailwind v4 uses `@import "tailwindcss"` syntax — do NOT use `@tailwind` directives
- Space Grotesk font is `var(--font-space-grotesk)` — use via inline style, not Tailwind class
