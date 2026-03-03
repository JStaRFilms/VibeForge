'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Copy, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';

const INSTALL_OPTIONS = [
    { id: 'quick', label: 'Quick start', command: 'npx vibesuite init' },
    { id: 'core', label: 'Core essentials', command: 'npx vibesuite install core' },
    { id: 'convex', label: 'Convex suite', command: 'npx vibesuite install convex' },
    { id: 'full', label: 'Full suite', command: 'npx vibesuite install --all' },
];

export default function InstallSection() {
    const [activeTab, setActiveTab] = useState(INSTALL_OPTIONS[0].id);
    const [copied, setCopied] = useState(false);

    const activeOption = INSTALL_OPTIONS.find((opt) => opt.id === activeTab) || INSTALL_OPTIONS[0];

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(activeOption.command);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Clipboard API may not be available in all contexts
        }
    };

    return (
        <section className="py-24 md:py-32 relative overflow-hidden" id="install">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[var(--color-glow)] rounded-full blur-[120px] opacity-30" />
            </div>

            <div className="max-w-6xl mx-auto px-6 md:px-8 relative z-10 w-full">
                <div className="flex flex-col md:flex-row gap-16 items-center">
                    {/* Text Content */}
                    <div className="flex-1 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 tracking-tight">
                                Ready to deploy <span className="text-[var(--color-accent)]">infrastructure?</span>
                            </h2>
                            <p className="text-lg md:text-xl text-[var(--color-text-muted)] font-body max-w-xl">
                                Execute the CLI and initialize your environment in seconds. Select the exact payload for your architecture. From bare metal to the full protocol suite.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className="flex flex-col gap-3">
                                {INSTALL_OPTIONS.map((option) => (
                                    <button
                                        key={option.id}
                                        onClick={() => setActiveTab(option.id)}
                                        className={cn(
                                            "flex items-center gap-3 px-5 py-4 rounded-xl text-left transition-all duration-300 font-body relative overflow-hidden group",
                                            activeTab === option.id
                                                ? "bg-[rgba(192,132,252,0.1)] border border-[rgba(192,132,252,0.2)] text-[var(--color-text-primary)]"
                                                : "bg-[var(--color-elevated)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:bg-[rgba(255,255,255,0.05)] hover:text-[var(--color-text-primary)]"
                                        )}
                                        aria-label={`Select ${option.label}`}
                                        aria-pressed={activeTab === option.id}
                                    >
                                        <div className={cn(
                                            "p-2 rounded-lg transition-colors",
                                            activeTab === option.id ? "bg-[rgba(192,132,252,0.2)] text-[var(--color-accent)]" : "bg-[rgba(255,255,255,0.05)] text-[var(--color-text-dim)] group-hover:text-[var(--color-text-muted)]"
                                        )}>
                                            <Terminal size={18} />
                                        </div>
                                        <span className="font-medium text-lg">{option.label}</span>

                                        {activeTab === option.id && (
                                            <motion.div
                                                layoutId="active-indicator"
                                                className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--color-accent)]"
                                                transition={{ duration: 0.3 }}
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Terminal Mockup */}
                    <motion.div
                        className="flex-1 w-full max-w-xl"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="rounded-2xl border border-[var(--color-border)] bg-[#07080C] shadow-2xl overflow-hidden backdrop-blur-3xl">
                            {/* Fake Window Header */}
                            <div className="px-4 py-3 border-b border-[var(--color-border)] bg-[rgba(255,255,255,0.02)] flex items-center gap-2">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                                    <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                                </div>
                                <div className="mx-auto flex items-center justify-center -ml-16 w-full text-center">
                                    <span className="text-xs font-mono text-[var(--color-text-dim)]">bash — vibeforge</span>
                                </div>
                            </div>

                            {/* Terminal Content */}
                            <div className="p-8 md:p-10 relative">
                                <div className="text-sm md:text-base font-mono leading-relaxed">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex text-[var(--color-text-muted)]">
                                            <span className="text-[var(--color-accent-alt)] mr-2">$</span>
                                            <span>Installing {activeOption.label.toLowerCase()}...</span>
                                        </div>

                                        {/* Command Display */}
                                        <div className="p-4 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] flex items-center justify-between group">
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={activeOption.command}
                                                    initial={{ opacity: 0, y: 5 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -5 }}
                                                    transition={{ duration: 0.15 }}
                                                    className="flex items-center gap-2 text-[var(--color-text-primary)] font-medium"
                                                >
                                                    <span className="text-[var(--color-accent-warm)]">npx</span>
                                                    {activeOption.command.replace('npx ', '')}
                                                </motion.div>
                                            </AnimatePresence>

                                            <button
                                                onClick={handleCopy}
                                                className="p-2 -m-2 text-[var(--color-text-dim)] hover:text-[var(--color-text-primary)] transition-colors rounded-md hover:bg-[rgba(255,255,255,0.1)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                                                aria-label="Copy command to clipboard"
                                            >
                                                {copied ? (
                                                    <Check size={18} className="text-green-400" />
                                                ) : (
                                                    <Copy size={18} />
                                                )}
                                            </button>
                                        </div>

                                        {/* Fake Progress Output */}
                                        <div className="flex flex-col gap-1 text-[var(--color-text-dim)] text-xs mt-2">
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={`output-${activeTab}`}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.2, duration: 0.4 }}
                                                >
                                                    <div>{`> Fetching ${activeTab} packages...`}</div>
                                                    <motion.div
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ delay: 0.6, duration: 0.4 }}
                                                    >
                                                        {`> Resolving dependencies...`}
                                                    </motion.div>
                                                    <motion.div
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ delay: 1.0, duration: 0.4 }}
                                                        className="text-[var(--color-text-muted)] mt-2"
                                                    >
                                                        Ready to vibe! 🎉
                                                    </motion.div>
                                                </motion.div>
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
