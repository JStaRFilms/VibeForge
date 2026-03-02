## 🔧 Agent Setup (DO THIS FIRST)

### Workflow to Follow
> Load: `cat .agent/workflows/vibe-build.md`

### Prime Agent Context
> MANDATORY: Run `/vibe-primeAgent` first

### Required Skills
> | Skill | Path | Why |
> |-------|------|-----|
> | nextjs-standards | `C:\Users\johno\.gemini\antigravity\skills\nextjs-standards\SKILL.md` | Core framework constraints |
> | frontend-design | `C:\Users\johno\.gemini\antigravity\skills\frontend-design\SKILL.md` | Anti-slop card visuals |

---

## Objective
Build the Skills Showcase Grid section.

## Scope
1. Create `src/features/skills-grid/SkillsGrid.tsx`.
2. Build a CSS Grid layout for 6 categories: Project Lifecycle, Design Engine, Quality Gate, SEO & Marketing, Research Layer, Media & Content.
3. Use the `GlassCard` layout for each category.
4. Implement a subtle hover glow effect utilizing the `color-glow` variable.
5. Create a stagger-in entry animation for the cards as they scroll into view.

## Context
See `docs/DESIGN.md`. Ensure the cards use the proper Satoshi headings and Lucide React icons.

## Definition of Done
- 6-card grid looks symmetric and responds well to mobile view.
- Hover glow works correctly.
- Stagger scroll reveal functions cleanly.
- `npx tsc --noEmit` passes.

## Constraints
- Avoid uniform rectangles if possible — explore spanning columns (e.g., alternating sizes) or keep a clean 2x3 or 3x2 grid depending on content weight.
