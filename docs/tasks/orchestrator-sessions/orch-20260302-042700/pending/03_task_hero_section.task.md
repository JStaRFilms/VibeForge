## 🔧 Agent Setup (DO THIS FIRST)

### Workflow to Follow
> Load: `cat .agent/workflows/vibe-build.md`

### Prime Agent Context
> MANDATORY: Run `/vibe-primeAgent` first

### Required Skills
> | Skill | Path | Why |
> |-------|------|-----|
> | nextjs-standards | `C:\Users\johno\.gemini\antigravity\skills\nextjs-standards\SKILL.md` | Core framework constraints |
> | frontend-design | `C:\Users\johno\.gemini\antigravity\skills\frontend-design\SKILL.md` | Anti-slop visuals |
> | algorithmic-art | `C:\Users\johno\.gemini\antigravity\skills\algorithmic-art\SKILL.md` | Generative SVG blobs |

---

## Objective
Build the Hero Section for the landing page.

## Scope
1. Create `src/features/hero/HeroSection.tsx`.
2. Implement animated liquid SVG blobs background (circles + feGaussianBlur).
3. Implement bold copy using Instrument Serif font.
4. Build terminal mockup showing `npx vibesuite init` command.
5. Create parallax floating glassmorphism cards representing skills.

## Context
See `docs/DESIGN.md`. This is the most critical first impression. Use the grain overlay defined in globals.

## Definition of Done
- Hero section renders and animates fluidly.
- Terminal mockup syntax highlighting looks authentic.
- Floating cards respond to scroll/parallax.
- `npx tsc --noEmit` passes.

## Constraints
- Maximize performance. SVG filter animations can be heavy — limit complexity.
- Integrate into `src/app/page.tsx`.
