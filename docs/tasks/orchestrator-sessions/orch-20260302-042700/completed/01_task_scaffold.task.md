## 🔧 Agent Setup (DO THIS FIRST)

### Workflow to Follow
> Load: `cat .agent/workflows/vibe-genesis.md`

### Prime Agent Context
> MANDATORY: Run `/vibe-primeAgent` first

### Required Skills
> | Skill | Path | Why |
> |-------|------|-----|
> | nextjs-standards | `C:\Users\johno\.gemini\antigravity\skills\nextjs-standards\SKILL.md` | Core framework constraints |

---

## Objective
Initialize the Next.js 14 App Router project with Tailwind and Framer Motion.

## Scope
1. Scaffold Next.js project using `create-next-app`
2. Configure TypeScript, ESLint, Tailwind CSS
3. Install dependencies: `framer-motion`, `lucide-react`, `@fontsource-variable/instrument-serif`

## Context
See `docs/autopsy_report.md` and `docs/Project_Requirements.md`. This is Phase 2 of the VibeForge build.

## Definition of Done
- [x] `package.json` exists with required dependencies
- [x] `src/app` structure exists
- [x] `pnpm run dev` starts successfully without errors
- [x] Next.js default boilerplate removed from `page.tsx`

## Constraints
- Next.js 14 (App Router) ONLY. Do NOT use Pages router.
- `.tsx` files must strictly type check.
