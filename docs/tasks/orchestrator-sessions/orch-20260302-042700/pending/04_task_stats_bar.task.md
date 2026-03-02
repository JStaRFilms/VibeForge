## 🔧 Agent Setup (DO THIS FIRST)

### Workflow to Follow
> Load: `cat .agent/workflows/vibe-build.md`

### Prime Agent Context
> MANDATORY: Run `/vibe-primeAgent` first

### Required Skills
> | Skill | Path | Why |
> |-------|------|-----|
> | nextjs-standards | `C:\Users\johno\.gemini\antigravity\skills\nextjs-standards\SKILL.md` | Core framework constraints |
> | frontend-design | `C:\Users\johno\.gemini\antigravity\skills\frontend-design\SKILL.md` | Anti-slop constraints |
> | copywriting | `C:\Users\johno\.gemini\antigravity\skills\copywriting\SKILL.md` | Writing punchy stat numbers |

---

## Objective
Build the Stats & Social Proof Bar section.

## Scope
1. Create `src/features/stats/StatsBar.tsx`.
2. Implement horizontal layout displaying key metrics: "64 Skills", "26 Workflows", "1 Command Install", "100% Free".
3. Use Framer Motion `useInView` to trigger count-up animations for the numbers when they enter the viewport.

## Context
See `docs/DESIGN.md`. This is a narrow, high-impact strip immediately below the Hero section.

## Definition of Done
- `StatsBar` component renders horizontally.
- Numbers animate smoothly from 0 to their target values only when visible in the viewport.
- Section looks premium on mobile (stacked) and desktop (inline).
- `npx tsc --noEmit` passes.

## Constraints
- Keep animations lightweight (don't block the main thread).
- Integrate it below the hero in `src/app/page.tsx`.
