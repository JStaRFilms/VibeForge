## 🔧 Agent Setup (DO THIS FIRST)

### Workflow to Follow
> Load: `cat .agent/workflows/vibe-build.md`

### Prime Agent Context
> MANDATORY: Run `/vibe-primeAgent` first

### Required Skills
> | Skill | Path | Why |
> |-------|------|-----|
> | remotion | `C:\Users\johno\.gemini\antigravity\skills\remotion\SKILL.md` | Building animation |
> | algorithmic-art | `C:\Users\johno\.gemini\antigravity\skills\algorithmic-art\SKILL.md` | Drawing visual assets |

---

## Objective
Build the 15-second, 4-scene Remotion animation composition.

## Scope
1. **Scene 1 (PromptScene):** 0-3s. Text prompt appears with a typewriter effect.
2. **Scene 2 (SkillsActivateScene):** 3-7s. Skill icons fan out with Remotion `spring` animations.
3. **Scene 3 (CodeGeneratedScene):** 7-11s. Code blocks materialize block by block.
4. **Scene 4 (AppDeployedScene):** 11-15s. A browser mockup slides in.
5. Combine them using the `Series` or `Sequence` component in `VibeForgeExplainer.tsx`.

## Context
See `docs/DESIGN.md` for the aesthetics. Scene components belong in `remotion/src/scenes/`. Use `remotion` hooks like `useCurrentFrame`, `interpolate`, and `spring`.

## Definition of Done
- `VibeForgeExplainer` comprises 4 distinct scenes playing in sequence.
- Total duration is 15 seconds (e.g., 450 frames at 30fps).
- Animation flows smoothly with spring interpolations.

## Constraints
- Must look visually cohesive with the main site's Dark Mode cyberpunk/noir theme.
