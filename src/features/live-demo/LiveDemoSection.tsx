'use client';

import { useRef, type ReactNode } from 'react';
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

// ─── Token Types & Colors ───────────────────────────────────────────
type TokenType =
    | 'keyword'
    | 'string'
    | 'comment'
    | 'tag'
    | 'attribute'
    | 'identifier'
    | 'operator'
    | 'plain';

const TOKEN_COLORS: Record<TokenType, string> = {
    keyword: '#C084FC',      // accent violet
    string: '#F0ABFC',       // accent-warm fuchsia
    comment: '#6B7280',      // text-muted
    tag: '#38BDF8',          // accent-alt sky
    attribute: '#67E8F9',    // cyan-300
    identifier: '#E8E8ED',   // text-primary
    operator: '#9CA3AF',     // gray-400
    plain: '#CBD5E1',        // slate-300 readable neutral
};

interface Token {
    text: string;
    type: TokenType;
}

const KEYWORDS = new Set([
    'import', 'from', 'export', 'const', 'let', 'var', 'function',
    'async', 'await', 'return', 'if', 'else', 'try', 'catch',
    'throw', 'new', 'typeof', 'instanceof', 'default', 'class',
    'extends', 'true', 'false', 'null', 'undefined',
]);

const JSX_ATTRIBUTES = new Set([
    'className', 'onClick', 'onChange', 'onSubmit', 'onBlur',
    'onFocus', 'style', 'key', 'ref', 'id', 'type', 'value',
    'placeholder', 'href', 'src', 'alt', 'disabled', 'name',
]);

/**
 * Token-based syntax highlighter. Processes the raw code string
 * character-by-character with a simple state machine.
 * Returns an array of Token objects — NO HTML escaping needed
 * since we render via React elements, not dangerouslySetInnerHTML.
 */
function tokenize(code: string): Token[] {
    const tokens: Token[] = [];
    let i = 0;
    const len = code.length;

    const peek = (offset = 0) => (i + offset < len ? code[i + offset] : '');
    const isWordChar = (ch: string) => /[a-zA-Z0-9_$]/.test(ch);

    while (i < len) {
        const ch = code[i];

        // ── 1. Single-line comment ──
        if (ch === '/' && peek(1) === '/') {
            let comment = '';
            while (i < len && code[i] !== '\n') {
                comment += code[i];
                i++;
            }
            tokens.push({ text: comment, type: 'comment' });
            continue;
        }

        // ── 2. String literals (single, double, backtick) ──
        if (ch === "'" || ch === '"' || ch === '`') {
            const quote = ch;
            let str = ch;
            i++;
            while (i < len && code[i] !== quote) {
                if (code[i] === '\\' && i + 1 < len) {
                    str += code[i] + code[i + 1];
                    i += 2;
                } else {
                    str += code[i];
                    i++;
                }
            }
            if (i < len) {
                str += code[i]; // closing quote
                i++;
            }
            tokens.push({ text: str, type: 'string' });
            continue;
        }

        // ── 3. JSX tags: < ... > and </...> ──
        if (ch === '<') {
            const isClosing = peek(1) === '/';
            const tagStart = i;
            let tagText = ch;
            i++;

            if (isClosing) {
                tagText += code[i]; // the '/'
                i++;
            }

            // Check if what follows is a valid tag name start
            if (i < len && /[a-zA-Z]/.test(code[i])) {
                // We're in a JSX tag — emit the '<' or '</'
                tokens.push({ text: isClosing ? '</' : '<', type: 'operator' });

                // Read the tag name
                let tagName = '';
                while (i < len && isWordChar(code[i])) {
                    tagName += code[i];
                    i++;
                }
                tokens.push({ text: tagName, type: 'tag' });

                // Read attributes and other content until '>' or '/>'
                while (i < len && code[i] !== '>') {
                    if (code[i] === '/') {
                        // Self-closing />
                        tokens.push({ text: '/', type: 'operator' });
                        i++;
                        continue;
                    }

                    // Whitespace
                    if (/\s/.test(code[i])) {
                        let ws = '';
                        while (i < len && /\s/.test(code[i]) && code[i] !== '\n') {
                            ws += code[i];
                            i++;
                        }
                        if (code[i] === '\n') {
                            ws += code[i];
                            i++;
                        }
                        tokens.push({ text: ws, type: 'plain' });
                        continue;
                    }

                    // Attribute name
                    if (/[a-zA-Z_]/.test(code[i])) {
                        let attr = '';
                        while (i < len && isWordChar(code[i])) {
                            attr += code[i];
                            i++;
                        }
                        const attrType: TokenType = JSX_ATTRIBUTES.has(attr) ? 'attribute' : 'attribute';
                        tokens.push({ text: attr, type: attrType });
                        continue;
                    }

                    // = sign
                    if (code[i] === '=') {
                        tokens.push({ text: '=', type: 'operator' });
                        i++;
                        continue;
                    }

                    // String attribute values
                    if (code[i] === '"' || code[i] === "'") {
                        const q = code[i];
                        let val = q;
                        i++;
                        while (i < len && code[i] !== q) {
                            val += code[i];
                            i++;
                        }
                        if (i < len) { val += code[i]; i++; }
                        tokens.push({ text: val, type: 'string' });
                        continue;
                    }

                    // JSX expression: {handleAction} or {() => ...}
                    if (code[i] === '{') {
                        let depth = 1;
                        tokens.push({ text: '{', type: 'operator' });
                        i++;
                        // Read until matching }
                        let expr = '';
                        while (i < len && depth > 0) {
                            if (code[i] === '{') depth++;
                            if (code[i] === '}') {
                                depth--;
                                if (depth === 0) break;
                            }
                            expr += code[i];
                            i++;
                        }
                        // Tokenize the inner expression as identifier
                        if (expr) {
                            tokens.push({ text: expr, type: 'identifier' });
                        }
                        if (i < len && code[i] === '}') {
                            tokens.push({ text: '}', type: 'operator' });
                            i++;
                        }
                        continue;
                    }

                    // Anything else inside tag — just emit it
                    tokens.push({ text: code[i], type: 'plain' });
                    i++;
                }

                // Emit the closing '>'
                if (i < len && code[i] === '>') {
                    tokens.push({ text: '>', type: 'operator' });
                    i++;
                }
                continue;
            } else {
                // Not a JSX tag — it's a comparison operator like <
                // Rewind and fall through to operator handling
                i = tagStart;
            }
        }

        // ── 4. Word tokens (identifiers, keywords) ──
        if (/[a-zA-Z_$]/.test(ch)) {
            let word = '';
            while (i < len && isWordChar(code[i])) {
                word += code[i];
                i++;
            }
            if (KEYWORDS.has(word)) {
                tokens.push({ text: word, type: 'keyword' });
            } else if (/^[A-Z]/.test(word)) {
                // PascalCase → component/class name
                tokens.push({ text: word, type: 'tag' });
            } else {
                tokens.push({ text: word, type: 'identifier' });
            }
            continue;
        }

        // ── 5. Operators and punctuation ──
        if (/[{}()[\]=;:.,<>!&|?+\-*/^%~@#]/.test(ch)) {
            // Gather consecutive operator chars
            let op = ch;
            i++;
            // Combine multi-char operators like ===, =>, !==, etc.
            while (i < len && /[=>&|!?.]/.test(code[i]) && op.length < 3) {
                op += code[i];
                i++;
            }
            tokens.push({ text: op, type: 'operator' });
            continue;
        }

        // ── 6. Everything else (whitespace, newlines, etc.) ──
        tokens.push({ text: ch, type: 'plain' });
        i++;
    }

    return tokens;
}

/**
 * Renders tokenized code as React span elements with syntax colors.
 */
function renderHighlightedCode(code: string): ReactNode[] {
    const tokens = tokenize(code);
    return tokens.map((token, idx) => (
        <span key={idx} style={{ color: TOKEN_COLORS[token.type] }}>
            {token.text}
        </span>
    ));
}

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

                                {/* Code Content — scrollbar hidden */}
                                <div className="p-6 md:p-8 overflow-auto flex-1 scrollbar-hide">
                                    <pre className="font-mono text-sm md:text-base leading-relaxed text-[#CBD5E1] whitespace-pre-wrap break-words min-h-full">
                                        <code>
                                            {renderHighlightedCode(displayedText)}
                                            {isTyping && (
                                                <span className="animate-pulse inline-block w-2 bg-[#E8E8ED] ml-0.5 h-4 align-middle" />
                                            )}
                                        </code>
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
