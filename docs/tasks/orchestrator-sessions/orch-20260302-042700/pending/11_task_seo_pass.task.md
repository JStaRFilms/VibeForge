## 🔧 Agent Setup (DO THIS FIRST)

### Workflow to Follow
> Load: `cat .agent/workflows/vibe-build.md`

### Prime Agent Context
> MANDATORY: Run `/vibe-primeAgent` first

### Required Skills
> | Skill | Path | Why |
> |-------|------|-----|
> | nextjs-standards | `C:\Users\johno\.gemini\antigravity\skills\nextjs-standards\SKILL.md` | Core framework constraints |
> | seo-ready | `C:\Users\johno\.gemini\antigravity\skills\seo-ready\SKILL.md` | Implementing SEO best practices |

---

## Objective
Implement a full SEO Pass on the landing page.

## Scope
1. Add `metadata` export to `src/app/layout.tsx` (Title, Description, Keyword string, OpenGraph, Twitter Cards).
2. Generate or link a placeholder `og-image.jpg` in `public/`.
3. Add JSON-LD Structured Data for the software application (VibeSuite) to the head.
4. Add standard `robots.txt` and `sitemap.xml` generators or static files.

## Context
See the master plan. Phase 4 final polish. Ensure the brand name "VibeCoding Protocol Suite" is prioritized.

## Definition of Done
- `layout.tsx` contains fully populated metadata object.
- Structured Data compiles and renders.
- `npx tsc --noEmit` passes.

## Constraints
- Maximize performance; ensure structured data script is correctly loaded via Next.js `<Script>` or standard dangerouslySetInnerHTML in `<head>`.
