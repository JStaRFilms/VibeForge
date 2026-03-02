## 🔧 Agent Setup (DO THIS FIRST)

### Workflow to Follow
> Load: `cat .agent/workflows/vibe-finalize.md`

### Prime Agent Context
> MANDATORY: Run `/vibe-primeAgent` first

### Required Skills
> | Skill | Path | Why |
> |-------|------|-----|
> | copywriting | `C:\Users\johno\.gemini\antigravity\skills\copywriting\SKILL.md` | Final text polish |

---

## Objective
Conduct the final Copy Polish pass across all sections of the landing page.

## Scope
1. Review all static text in `src/features/`.
2. Replace any placeholder or "lorem ipsum" text with high-conversion, professional copy.
3. Ensure the tone matches the "Terminal Noir / Art Deco" vibe (sharp, precise, authoritative, non-cliché).
4. Refine CTAs to be action-oriented.

## Context
See `docs/DESIGN.md` for tone check. Phase 4 finalize step.

## Definition of Done
- No generic AI slop text remains.
- Tone is consistent.
- `npm run build` succeeds without issues.

## Constraints
- Only modify text/content files or hardcoded strings inside components. Do not break layout.
