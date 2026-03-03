# VibeForge — Project Requirements Document

**Project:** VibeForge
**Type:** Premium Dark-Mode SaaS Landing Page
**Created:** 2026-03-02
**Status:** Planning

---

## Objective

Build a premium SaaS landing page for the **VibeCoding Protocol Suite** — a system of 64 AI-coding skills and 26 workflows. The page serves as both a marketing tool AND a live demo of the skills system. It will be built on camera for a YouTube video (~75 min recording).

## Key Requirements

### Functional (FR)

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-01 | 7-section single-page landing (Hero → Stats → Grid → Demo → Video → Install → Footer) | MUST |
| FR-02 | Scroll-triggered animations on every section | MUST |
| FR-03 | Animated stats counters (count-up on scroll) | MUST |
| FR-04 | Skills showcase grid with 6 categories and hover effects | MUST |
| FR-05 | Terminal mockup with syntax highlighting and copy-to-clipboard | MUST |
| FR-06 | Tab switcher for 4 install options | MUST |
| FR-07 | Embedded Remotion video component (or animated placeholder) | SHOULD |
| FR-08 | Live demo section with typewriter code effect | SHOULD |
| FR-09 | Parallax effects on hero and footer | SHOULD |
| FR-10 | Generative SVG background (liquid blobs) | SHOULD |

### Non-Functional (NFR)

| ID | Requirement | Priority |
|----|-------------|----------|
| NFR-01 | Dark mode only — no light mode | MUST |
| NFR-02 | Anti-AI-slop design (see `DESIGN.md`) | MUST |
| NFR-03 | Responsive: 375px, 768px, 1024px, 1440px | MUST |
| NFR-04 | TypeScript strict mode, zero errors | MUST |
| NFR-05 | Lighthouse Performance > 90 | SHOULD |
| NFR-06 | `prefers-reduced-motion` respected | SHOULD |
| NFR-07 | All icons from Lucide React (no emojis) | MUST |

## Tech Stack

- **Next.js 14** — App Router, RSC, TypeScript strict
- **Tailwind CSS v4** — Dark mode, custom @theme tokens
- **Framer Motion** — Scroll animations, page transitions
- **Lucide React** — Icon library
- **Remotion** — Embedded video component (optional)
- **Custom fonts** — Instrument Serif, Satoshi, General Sans, Geist Mono

## Success Criteria

1. Site loads in < 3 seconds on desktop
2. All 7 sections render correctly on mobile and desktop
3. Scroll animations are smooth (no jank)
4. Design is distinctly NOT "AI slop" — unique typography, intentional palette, asymmetric layouts
5. `npx tsc --noEmit` passes with zero errors
6. `ppnpm run build` succeeds
