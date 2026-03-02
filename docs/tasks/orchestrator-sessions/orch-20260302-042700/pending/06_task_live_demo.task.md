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
Build the Live Demo section showing a split view of a code editor and a live preview.

## Scope
1. Create `src/features/live-demo/LiveDemoSection.tsx`.
2. Layout: Split view (Code editor on left, preview or summary on right). Mobile: Stacked.
3. Editor Simulation: Display syntax-highlighted code (use standard HTML/CSS styling or a lightweight highlighter) representing the `spawn-task` or `nextjs-standards` skill running.
4. Create a custom React hook `useTypewriter` to simulate code being typed out line-by-line when in view.

## Context
See `docs/DESIGN.md`. This section is a meta-reference to the agent writing code live. Use `Geist Mono` or `Berkeley Mono` for the code block.

## Definition of Done
- Section uses a sleek Mac-like window frame for the editor mock.
- Typewriter string animation works without infinite loops.
- Layout scales responsively.
- `npx tsc --noEmit` passes.

## Constraints
- Only trigger typing animation once when scrolled into view.
- Don't use heavy external syntax highlighting libraries (e.g., Prism/Highlight.js) if manual colored `<span class="text-accent">` tokens suffice.
