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
> | ui-ux-pro-max | `C:\Users\johno\.gemini\antigravity\skills\ui-ux-pro-max\SKILL.md` | Component UI principles |

---

## Objective
Implement the custom VibeForge design system (Terminal Noir + Art Deco) tokens and global layout structure.

## Scope
1. Update `src/styles/globals.css` with `@theme` tokens matching `docs/DESIGN.md`. Include grain overlay and glass card globals.
2. Configure typography in `src/lib/fonts.ts` (Instrument Serif, Satoshi, General Sans, Geist Mono).
3. Create `src/lib/animations.ts` with shared Framer Motion variants.
4. Create global UI components: `src/components/ui/Button.tsx`, `GlassCard.tsx`, `src/components/layout/Container.tsx`, `SectionWrapper.tsx`.

## Context
Read `docs/DESIGN.md` CAREFULLY. This overrides default Tailwind colors.

## Definition of Done
- Globals CSS contains all required CSS variables.
- Fonts load correctly without FOUT.
- Base UI components created and strictly typed.
- `npx tsc --noEmit` passes.

## Constraints
- Follow anti-slop rules exactly. No purple-to-blue gradients unless explicitly styled as a subtle glow.
