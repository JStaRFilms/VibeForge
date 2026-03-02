# Escalation Handoff Report

**Generated:** 2026-03-02T10:56:00+01:00
**Original Issue:** Task 06 — Live Demo Section (Code Editor + Typewriter Animation)

---

## PART 1: THE DAMAGE REPORT

### 1.1 Original Goal
Build a Live Demo section with a split view: a Mac-like code editor on the left that types out syntax-highlighted code line-by-line via a `useTypewriter` hook, and a description + live preview card on the right. The code editor should feel like a real IDE with proper syntax highlighting.

### 1.2 Observed Failure / Error
Two visual bugs remain:

1. **Scrollbar visible inside code editor pane.** The fixed-height container (`h-[500px]`) with `overflow-auto` shows the native browser scrollbar, which looks ugly and un-Mac-like.

2. **Syntax highlighting is incomplete/broken.** Multiple token types are NOT being colored and render as plain `#E8E8ED` (near-invisible against the dark background in some cases, or just unstyled white):
   - **camelCase identifiers** like `setStatus`, `handleAction`, `orchestrateWorkflow` — the regex only catches `PascalCase` (`[A-Z]...`) and hardcoded keywords. Regular function names are completely missed.
   - **JSX tag names** after `<` / `</` — the `<` gets escaped to `&lt;` first, then the tag name (e.g., `Card`, `h2`, `button`) becomes a separate plain token. `Card` gets caught by PascalCase, but `h2` and `button` do not.
   - **JSX attributes** — only `className` and `onClick` are hardcoded. Other JSX attributes (`onClick`, curly braces inside JSX) are inconsistently handled.
   - **Destructured variables** like `[status, setStatus]` — `status` is unstyled.

### 1.3 Failed Approach
Used a single-pass regex with capture groups to tokenize the code string. The approach has inherent limitations:
- The regex operates on already-escaped HTML (`&lt;` / `&gt;`), making JSX tag parsing unreliable.
- Only PascalCase identifiers get their own capture group — camelCase function/variable names fall through as unstyled text.
- Hardcoding every keyword/attribute is not scalable.
- Attempted multiple iterations of the regex with diminishing returns.

### 1.4 Key Files Involved
- `src/features/live-demo/LiveDemoSection.tsx` — Main component with `syntaxHighlight` function
- `src/features/live-demo/hooks/useTypewriter.ts` — Custom typewriter hook
- `src/app/page.tsx` — Page integration
- `src/app/globals.css` — Global styles (may need scrollbar-hide utility)

### 1.5 Best-Guess Diagnosis

**Root Cause:** The regex-based syntax highlighter is fundamentally flawed because:

1. **It only colors tokens it explicitly matches.** Anything not caught by a capture group (most camelCase identifiers, lowercase JSX tags, etc.) renders as plain text with the default `#E8E8ED` color — which looks washed out and unstyled.

2. **HTML escaping before tokenization** breaks JSX parsing. The `<Card` becomes `&lt;Card` — the entity and tag name are separate tokens that can't be matched as one unit.

**Recommended Fix Strategy:**
- **Option A (Quick):** Instead of trying to color specific tokens, set the **default text color to a readable neutral** (e.g., `#CBD5E1`) and only colorize the tokens you CAN reliably match (keywords, strings, comments, PascalCase). Unmatched tokens will look fine as "variable" color. Also add a broader `\b([a-z][a-zA-Z0-9]*)\b` catch-all group for camelCase identifiers with a subtle different color (e.g., light blue-white).
- **Option B (Proper):** Use a line-by-line tokenizer instead of a single regex. Process each line, detect if it starts with `//` (comment), contains string literals, etc. Build tokens as an array and render `<span>` elements. This avoids the HTML-escaping problem entirely since you'd use React elements instead of `dangerouslySetInnerHTML`.
- **Scrollbar:** Add a `scrollbar-hide` utility class to `globals.css` using `::-webkit-scrollbar { display: none }` and `scrollbar-width: none`, then apply it to the code content div.

---

## PART 2: FULL FILE CONTENTS (Self-Contained)

### File: `src/features/live-demo/LiveDemoSection.tsx`
```tsx
'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTypewriter } from './hooks/useTypewriter';

const DEMO_CODE = `import { useState } from 'react';
import { Card } from '@/components/ui/card';

// The AI is generating this component...
export function AIOrchestrator() {
  const [status, setStatus] = useState('idle');

  async function handleAction() {
    setStatus('working');
    // Automating tasks, writing code, running tests...
    await orchestrateWorkflow('vibe-build');
    setStatus('done');
  }

  return (
    <Card className="flex flex-col gap-4 p-6 glass-effect">
      <h2 className="text-xl font-bold font-satoshi">
        VibeCode Agent
      </h2>
      <button 
        onClick={handleAction}
        className="px-4 py-2 bg-accent text-white rounded-lg"
      >
        {status === 'idle' ? 'Start Pipeline' : 'Executing...'}
      </button>
    </Card>
  );
}`;

const syntaxHighlight = (code: string) => {
    let highlighted = code
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    // Single-pass regex to avoid matching tokens inside injected HTML tags
    highlighted = highlighted.replace(
        /(&lt;|&gt;)|(\/\/.*)|(['"`].*?['"`])|\b(import|from|export|const|let|var|function|async|await|return|if|else|try|catch|useState|className|onClick)\b|\b([A-Z][a-zA-Z0-9_]*)\b|([{}()[\]=;])/g,
        (match, htmlTag, comment, stringLiteral, keyword, componentName, operator) => {
            if (htmlTag) return `<span style="color: #9CA3AF">${htmlTag}</span>`;
            if (comment) return `<span style="color: #6B7280">${comment}</span>`;
            if (stringLiteral) return `<span style="color: #F0ABFC">${stringLiteral}</span>`;
            if (keyword) return `<span style="color: #C084FC">${keyword}</span>`;
            if (componentName) return `<span style="color: #38BDF8">${componentName}</span>`;
            if (operator) return `<span style="color: #9CA3AF">${operator}</span>`;
            return match;
        }
    );

    return highlighted;
};

export default function LiveDemoSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

    const { displayedText, isTyping, isComplete } = useTypewriter(
        DEMO_CODE,
        25, // typing speed
        500, // start delay
        isInView
    );

    return (
        <section ref={sectionRef} className="py-24 sm:py-32 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[var(--color-accent)] opacity-10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">

                    {/* Left Side: Code Editor Mockup */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="flex-1 w-full max-w-2xl"
                    >
                        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-elevated)] shadow-2xl backdrop-blur-xl group relative h-[500px] lg:h-[600px] w-full flex flex-col">
                            {/* Glow Effect */}
                            <div className="absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-alt)] opacity-20" />

                            <div className="relative bg-[var(--color-surface)] z-10 rounded-2xl overflow-hidden flex-1 border border-[var(--color-border)] flex flex-col">
                                {/* Mac window header */}
                                <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-base)]/80">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                    <span className="ml-2 text-xs text-[var(--color-text-muted)] font-mono tracking-wider">
                                        agent-terminal.ts
                                    </span>
                                </div>

                                {/* Code Content */}
                                <div className="p-6 md:p-8 overflow-auto flex-1">
                                    <pre className="font-mono text-sm md:text-base leading-relaxed text-[#E8E8ED] whitespace-pre-wrap word-break">
                                        <code dangerouslySetInnerHTML={{ __html: syntaxHighlight(displayedText) + (isTyping ? '<span class="animate-pulse inline-block w-2 bg-[#E8E8ED] ml-1 h-4 align-middle"></span>' : '') }} />
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side: Description & Live Preview */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                        className="flex-1 w-full flex flex-col justify-center gap-8"
                    >
                        <div>
                            <h3 className="text-3xl md:text-4xl font-bold font-satoshi text-[var(--color-text-primary)] mb-4 leading-tight">
                                Watch the AI build.<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-alt)]">
                                    In real-time.
                                </span>
                            </h3>
                            <p className="text-[var(--color-text-muted)] text-lg mb-8 leading-relaxed max-w-lg">
                                No magic, just pure autonomous orchestration. Give VibeForge an objective and watch it write production-ready code with full type safety and modern aesthetics right before your eyes.
                            </p>
                        </div>

                        {/* Live Preview Card (appears after typing finishes) */}
                        <div className={`transition-all duration-1000 transform ${isComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            <div className="p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-glass)] backdrop-blur-md relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-glass)] to-transparent pointer-events-none" />

                                <div className="flex items-center justify-between mb-6 relative z-10">
                                    <div className="text-sm font-medium text-[var(--color-text-muted)]">Live Preview Output</div>
                                    <div className="px-2.5 py-1 rounded text-xs bg-green-500/10 text-green-400 border border-green-500/20 font-medium">
                                        Compiled successfully
                                    </div>
                                </div>

                                <div className="p-6 rounded-xl bg-[var(--color-base)] border border-[var(--color-border)] flex flex-col items-center justify-center text-center gap-4 relative z-10 shadow-inner">
                                    <div className="w-14 h-14 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center border border-[var(--color-accent)]/20 shadow-[0_0_20px_rgba(192,132,252,0.15)]">
                                        <div className="w-6 h-6 rounded-full bg-[var(--color-accent)] animate-pulse" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-[var(--color-text-primary)] font-satoshi">VibeCode Agent</h4>
                                        <p className="text-sm text-[var(--color-text-muted)] mt-1">Ready to orchestrate your next feature.</p>
                                    </div>
                                    <button className="px-6 py-2.5 rounded-full bg-[var(--color-text-primary)] text-[var(--color-base)] text-sm font-bold mt-2 transition-all hover:scale-105 active:scale-95 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                                        Start Pipeline
                                    </button>
                                </div>
                            </div>
                        </div>

                    </motion.div>

                </div>
            </div>
        </section>
    );
}
```

### File: `src/features/live-demo/hooks/useTypewriter.ts`
```typescript
import { useState, useEffect } from "react";

export function useTypewriter(text: string, typingSpeed: number = 30, startDelay: number = 0, startTyping: boolean = false) {
    const [displayedText, setDisplayedText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (!startTyping) {
            setDisplayedText("");
            setIsTyping(false);
            setIsComplete(false);
            return;
        }

        let timeout: NodeJS.Timeout;
        let currentIndex = 0;

        const start = () => {
            setIsTyping(true);
            const typeNextChar = () => {
                if (currentIndex < text.length) {
                    setDisplayedText(text.slice(0, currentIndex + 1));
                    currentIndex++;
                    timeout = setTimeout(typeNextChar, typingSpeed + (Math.random() * typingSpeed * 0.5));
                } else {
                    setIsTyping(false);
                    setIsComplete(true);
                }
            };
            timeout = setTimeout(typeNextChar, typingSpeed);
        };

        timeout = setTimeout(start, startDelay);

        return () => clearTimeout(timeout);
    }, [text, typingSpeed, startDelay, startTyping]);

    return { displayedText, isTyping, isComplete };
}
```

### File: `src/app/page.tsx`
```tsx
import HeroSection from '@/features/hero/HeroSection';
import StatsBar from '@/features/stats/StatsBar';
import SkillsGrid from '@/features/skills-grid/SkillsGrid';
import LiveDemoSection from '@/features/live-demo/LiveDemoSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <StatsBar />
      <SkillsGrid />
      <LiveDemoSection />
    </main>
  );
}
```

### File: `src/app/globals.css`
```css
@import "tailwindcss";

@theme {
  /* Base surfaces */
  --color-base: #07080C;
  --color-surface: #0F1117;
  --color-elevated: #161820;
  --color-glass: rgba(255, 255, 255, 0.03);

  /* Accents */
  --color-accent: #C084FC;
  /* Soft violet */
  --color-accent-alt: #38BDF8;
  /* Sky blue */
  --color-accent-warm: #F0ABFC;
  /* Fuchsia — CTAs only */

  /* Text */
  --color-text-primary: #E8E8ED;
  --color-text-muted: #6B7280;
  --color-text-dim: #3B3F4A;

  /* Borders & Effects */
  --color-border: rgba(255, 255, 255, 0.06);
  --color-glow: rgba(192, 132, 252, 0.15);

  --font-display: var(--font-instrument), serif;
  --font-heading: 'Satoshi', sans-serif;
  --font-sans: 'General Sans', sans-serif;
  --font-mono: var(--font-geist-mono), monospace;

  --radius-2xl: 16px;
}

body {
  color: var(--color-text-primary);
  background-color: var(--color-base);
  font-family: var(--font-sans);
}

@layer utilities {
  .bg-glass {
    backdrop-filter: blur(24px);
    background-color: var(--color-glass);
    border: 1px solid var(--color-border);
  }

  .hover-glow {
    transition: all 300ms ease;
  }

  .hover-glow:hover {
    box-shadow: 0 0 40px var(--color-glow);
  }
}

.bg-grain {
  position: fixed;
  inset: 0;
  z-index: 50;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.03;
  mix-blend-mode: overlay;
}
```

---

## PART 3: DIRECTIVE FOR ORCHESTRATOR

**Attention: Senior AI Orchestrator**

You have received this Escalation Handoff Report. A local agent has failed to solve this problem after 3 iterations.

**Your Directive:**

1. **Analyze the Failure:** The regex-based `syntaxHighlight` function in `LiveDemoSection.tsx` cannot reliably tokenize JSX/TSX code because:
   - HTML escaping (`<` → `&lt;`) happens BEFORE tokenization, breaking JSX tag detection.
   - Only PascalCase identifiers and hardcoded keywords are matched — all camelCase function names (`setStatus`, `handleAction`, `orchestrateWorkflow`) render as unstyled plain text.
   - The multi-pass vs single-pass regex approaches both suffer from the same fundamental limitation.

2. **Formulate a New Plan:**
   - **Step 1:** Add a `scrollbar-hide` utility to `globals.css` that hides scrollbars cross-browser. Apply it to the code content `<div>` in `LiveDemoSection.tsx`.
   - **Step 2:** **Completely rewrite** `syntaxHighlight` using a **token-based approach** instead of regex replacement on a raw string:
     - Split the code into lines, then tokenize each line character-by-character or via a simple state machine (states: `normal`, `string`, `comment`, `jsx-tag`).
     - Build an array of `{ text: string, type: 'keyword' | 'string' | 'comment' | 'identifier' | 'tag' | 'attribute' | 'operator' | 'plain' }` tokens.
     - Render tokens as React `<span>` elements with inline styles — **eliminating the need for `dangerouslySetInnerHTML` entirely**.
     - This approach naturally handles JSX tags (detect `<` followed by a word), camelCase identifiers, and nested strings without HTML-escaping issues.
   - **Step 3:** Remove `dangerouslySetInnerHTML` from the `<code>` element and render the token spans directly as React children.
   - **Step 4:** Verify with `pnpm tsc --noEmit`.

3. **Execute or Hand Off:** Implement the fix directly. The `useTypewriter` hook is fine and does not need changes. Only `LiveDemoSection.tsx` and `globals.css` need modification.

**Color Palette for Token Types (matches DESIGN.md):**
| Token Type | Color | Example |
|---|---|---|
| keyword | `#C084FC` (accent violet) | `import`, `export`, `const`, `function`, `async`, `await`, `return` |
| string | `#F0ABFC` (accent-warm fuchsia) | `'react'`, `'idle'`, `"flex flex-col..."` |
| comment | `#6B7280` (text-muted) | `// The AI is generating...` |
| component/tag (PascalCase or JSX) | `#38BDF8` (accent-alt sky) | `Card`, `AIOrchestrator`, `<h2>`, `<button>` |
| identifier (camelCase) | `#E8E8ED` (text-primary) | `status`, `setStatus`, `handleAction` |
| operator/punctuation | `#9CA3AF` (gray-400) | `{ } ( ) [ ] = ; < > /` |
| attribute | `#67E8F9` (cyan-300) | `className`, `onClick` |
| number/boolean | `#FBBF24` (amber) | (if needed) |

**Begin your analysis now.**
