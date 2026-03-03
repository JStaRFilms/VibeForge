# VibeForge — Coding Guidelines

**Project:** VibeForge
**Created:** 2026-03-02

---

## Architecture

- **Next.js 14 App Router** — Server Components by default
- **Feature-Sliced Design** — Each section in `src/features/[section]/`
- **Reusable UI** — Shared components in `src/components/ui/`

## Rules

1. **`'use client'` only when needed** — Framer Motion `<motion.div>`, `useState`, `useInView`
2. **200-line rule** — Split if exceeded
3. **TypeScript strict** — No `any`, all props typed with interfaces
4. **Tailwind v4** — Use `@theme` tokens, not hardcoded hex values
5. **No CSS files** — Exception: `globals.css` for @theme and special utilities
6. **Icons** — Lucide React only, no emojis
7. **Imports** — Absolute `@/` prefix for all project imports

## Verification

```bash
# After every .ts/.tsx edit
npx tsc --noEmit

# Before handoff
pnpm run build
pnpm run lint
```

## Naming

- **Components:** PascalCase (`HeroSection.tsx`)
- **Hooks:** camelCase with `use` prefix (`useCountUp.ts`)
- **Utils:** camelCase (`animations.ts`)
- **Features:** kebab-case directories (`skills-grid/`)

## Design System

See `docs/DESIGN.md` for all color tokens, typography, effects, and anti-patterns.
