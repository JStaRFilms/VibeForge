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

---

## Objective
Build the Installation Section.

## Scope
1. Create `src/features/install/InstallSection.tsx`.
2. Layout a dark terminal mockup component to display CLI commands.
3. Build a tab switcher for 4 installation options: Quick start, Core essentials, Convex suite, Full suite.
4. Implement copy-to-clipboard functionality with a brief success state (e.g., checkmark icon).

## Context
See `docs/DESIGN.md`. Make the terminal look incredibly polished (glassmac style).

## Definition of Done
- Section renders correctly and adapts to mobile width.
- Tabs switch terminal content immediately.
- Copy button works and shows visual feedback.
- `npx tsc --noEmit` passes.

## Constraints
- Ensure accessible button labels for the tab switches and copy actions.
