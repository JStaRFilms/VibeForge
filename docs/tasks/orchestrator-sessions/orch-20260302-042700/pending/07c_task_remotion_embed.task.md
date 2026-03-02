## 🔧 Agent Setup (DO THIS FIRST)

### Workflow to Follow
> Load: `cat .agent/workflows/vibe-build.md`

### Prime Agent Context
> MANDATORY: Run `/vibe-primeAgent` first

### Required Skills
> | Skill | Path | Why |
> |-------|------|-----|
> | remotion | `C:\Users\johno\.gemini\antigravity\skills\remotion\SKILL.md` | Using `@remotion/player` |
> | frontend-design | `C:\Users\johno\.gemini\antigravity\skills\frontend-design\SKILL.md` | Wrapping UI |

---

## Objective
Embed the Remotion composition into the Next.js landing page.

## Scope
1. Ensure `@remotion/player` is installed in the main Next.js project.
2. Create `src/features/remotion-embed/RemotionSection.tsx`.
3. Import the `VibeForgeExplainer` composition from the `remotion/` directory (you may need to configure Next.js transpile packages or just copy the file over carefully if they share dependencies).
4. Render the `<Player>` component, configured for `loop`, `autoPlay`, and `controls={false}`.
5. Wrap the player in a glowing glassmorphism container matching the UI styling.

## Context
This hooks the video composition built in 07b into the live website.

## Definition of Done
- The Remotion player renders natively on the page, looping infinitely.
- It is visually framed correctly.
- `npx tsc --noEmit` on the main project passes.

## Constraints
- Ensure the `<Player>` is strictly a Client Component (`'use client'`).
