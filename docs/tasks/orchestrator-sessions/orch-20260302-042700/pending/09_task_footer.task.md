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
> | copywriting | `C:\Users\johno\.gemini\antigravity\skills\copywriting\SKILL.md` | Writing the final CTA |

---

## Objective
Build the Footer/CTA Section.

## Scope
1. Create `src/features/footer/FooterSection.tsx`.
2. Implement a massive gradient fade that grounds the bottom of the page back into the `bg-base` hex color.
3. Write strong CTA copy: "Stop downloading random skills. Build a system."
4. Add GitHub button and social links.
5. Apply a subtle parallax effect on the CTA text as the user scrolls down to the very bottom.

## Context
See `docs/DESIGN.md`. This is the final hook for the user. Make it punchy.

## Definition of Done
- Footer fits seamlessly at the end of the page.
- Gradient fade looks smooth and matches tokens.
- `npx tsc --noEmit` passes.

## Constraints
- Ensure links map correctly and use `target="_blank" rel="noopener noreferrer"`.
