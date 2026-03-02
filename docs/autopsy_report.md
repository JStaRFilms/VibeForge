# Project Autopsy Report

**Generated:** 2026-03-02 04:30
**Purpose:** Onboard a new AI Orchestrator to the VibeForge codebase.

---

## 1. Project Elevator Pitch
VibeForge is a premium dark-mode SaaS landing page for the **VibeCoding Protocol Suite** — a collection of 64 AI-coding skills and 26 workflows. The page itself is a meta-demo: built live on camera using 16+ skills to showcase the system's power for a YouTube video.

## 2. Core Technology Stack
| Category | Technology |
| :--- | :--- |
| Language | TypeScript (strict mode) |
| Framework | Next.js 14 (App Router, RSC) |
| Styling | Tailwind CSS v4 (dark mode + custom tokens) |
| Animation | Framer Motion (scroll, transitions, micro-interactions) |
| Generative Art | SVG morphing, p5.js-like patterns |
| Video | Remotion (embedded programmatic video) |
| Fonts | Custom (heading + body + monospace) |

## 3. Inferred Architecture
**Pattern:** Next.js App Router with Feature-Sliced Design (single-page landing)

```
src/
├── app/                    # Root layout + page.tsx (landing)
├── features/
│   ├── hero/               # Hero section components + animations
│   ├── stats/              # Social proof bar
│   ├── skills-grid/        # Skills showcase (6 categories)
│   ├── live-demo/          # Code editor + preview
│   ├── remotion-embed/     # Remotion video component
│   ├── install/            # Terminal mockup + tab switcher
│   └── footer/             # CTA + links
├── components/
│   ├── ui/                 # Reusable: Button, Card, Badge, GlassCard
│   └── layout/             # Navbar, SectionWrapper, Container
├── lib/
│   ├── fonts.ts            # Font loading configuration
│   ├── animations.ts       # Shared Framer Motion variants
│   └── utils.ts            # General utilities
└── styles/
    └── globals.css         # Tailwind @theme tokens + custom utilities
```

## 4. Current State
- **Project Status:** Greenfield — `src/` is empty
- **Docs:** Stub files only (no content in PRD, Guidelines, Builder Prompt)
- **Build Plan:** Comprehensive 7-section plan exists in `00_Notes/VibeForge_Build_Plan.md`
- **Design System:** Auto-generated MASTER.md exists but needs complete override (generic palette)
- **No `package.json`** — Project hasn't been initialized yet

## 5. Key Constraints
- **YouTube Recording** — This will be built live on camera (~75 min session)
- **Anti-AI-Slop** — No generic gradients, no purple-on-white, no Inter/Roboto, no cookie-cutter layouts
- **16 Skills Demo** — Each section must visibly demonstrate specific skills
- **Dark Mode Only** — Near-black base with intentional accent colors
- **Performance** — Landing page must load fast, animations must be smooth

## 6. Entry Points
- Main: `src/app/page.tsx` (single landing page)
- Layout: `src/app/layout.tsx` (metadata, fonts, global providers)
- Styles: `src/styles/globals.css` (Tailwind v4 @theme tokens)

---

## MISSION BRIEFING (For Orchestrator)

You have now assimilated this codebase context.

**Your Directive:**
1. The project is greenfield — everything needs to be built from scratch
2. Follow the 7-section plan in `VibeForge_Build_Plan.md`
3. Override the generic MASTER.md with a custom anti-slop design system
4. Each task should be completable in a focused session
5. Maintain the meta-narrative: the site IS the demo of the skill system
