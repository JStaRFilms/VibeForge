## 🔧 Agent Setup (DO THIS FIRST)

### Workflow to Follow
> Load: `cat .agent/workflows/review_code.md`

### Prime Agent Context
> MANDATORY: Run `/vibe-primeAgent` first

### Required Skills
> | Skill | Path | Why |
> |-------|------|-----|
> | code-review | `C:\Users\johno\.gemini\antigravity\skills\code-review\SKILL.md` | J-Star code review |
> | security-audit | `C:\Users\johno\.gemini\antigravity\skills\security-audit\SKILL.md` | Baseline security check |

---

## Objective
Conduct a comprehensive Quality and Security Pass across the entire built landing page.

## Scope
1. Run a J-Star Review loop on all code in `src/`.
2. Run `npm run build` to verify there are no compilation errors.
3. Check for hydration mismatches or unhandled React errors in the browser console.
4. Perform a security audit (XSS vectors, generic API exposure, etc., though this is just a static page, ensure no sensitive keys are accidentally leaked if applicable).

## Context
See the master plan. This is Phase 4, the final QA step before SEO/Copy tuning.

## Definition of Done
- No P0 or P1 issues reported by J-Star or Security Audit.
- `npm run build` succeeds perfectly.
- Any flagged UI/UX issues resolved.

## Constraints
- Do not add new features, only fix existing ones and clean up code.
