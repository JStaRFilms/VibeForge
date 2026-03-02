## 🔧 Agent Setup (DO THIS FIRST)

### Workflow to Follow
> Load: `cat .agent/workflows/vibe-build.md`

### Prime Agent Context
> MANDATORY: Run `/vibe-primeAgent` first

### Required Skills
> | Skill | Path | Why |
> |-------|------|-----|
> | remotion | `C:\Users\johno\.gemini\antigravity\skills\remotion\SKILL.md` | Setup Remotion |

---

## Objective
Initialize the Remotion project for the Option A composition.

## Scope
1. Create a separate Remotion project in the `remotion/` directory at the project root. Note: It's best to initialize this manually or construct the needed files `Root.tsx`, `package.json`, `index.ts`.
2. Configure Remotion dependencies: `@remotion/cli`, `remotion`, `@remotion/player`. (Also install `@remotion/player` in the main Next.js project).
3. Set up the `remotion/src/Root.tsx` to register the `VibeForgeExplainer` composition.
4. Set up `remotion/src/styles.ts` to mirror the `DESIGN.md` tokens logically into CSS or JS objects for the canvas.

## Context
This is part 1 of 3 for the Remotion build (Task 07a). We chose Option A (Full Composition).

## Definition of Done
- `remotion/` directory exists with working setup.
- `npm run start` inside the remotion directory opens the Remotion Studio without errors.
- Basic placeholder composition defined in `Root.tsx`.

## Constraints
- Keep Remotion dependencies localized to the `remotion` folder for rendering, except the player which goes in Next.js.
