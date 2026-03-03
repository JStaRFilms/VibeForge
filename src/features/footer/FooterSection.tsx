'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Github, Twitter, Youtube, ArrowRight } from 'lucide-react';

export default function FooterSection() {
    const containerRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
    const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 0.6, 1]);

    return (
        <footer ref={containerRef} className="relative pt-40 pb-12 overflow-hidden">
            {/* Massive Gradient Fade into base color */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-base/80 to-base pointer-events-none" />

            <div className="container relative z-10 mx-auto px-6 max-w-6xl">
                <motion.div
                    style={{ y, opacity }}
                    className="flex flex-col items-center text-center space-y-10"
                >
                    <div className="space-y-4">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-accent text-sm font-heading tracking-widest uppercase"
                        >
                            The Final Protocol
                        </motion.span>
                        <h2 className="text-5xl md:text-7xl font-display italic text-text-primary leading-[1.1]">
                            Stop downloading random skills. <br />
                            <span className="text-accent-warm">Build a system.</span>
                        </h2>
                    </div>

                    <p className="text-text-muted text-lg md:text-xl max-w-2xl font-sans leading-relaxed">
                        Reclaim your development environment with VibeSuite. A curated architecture of agentic protocols for the modern builder. No subscriptions. Absolute sovereignty.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-5 pt-4">
                        <Button variant="primary" className="h-14 px-8 text-lg gap-2 group">
                            Deploy Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Button variant="glass" className="h-14 px-8 text-lg gap-2">
                            <Github size={20} /> Star on GitHub
                        </Button>
                    </div>
                </motion.div>

                {/* Links & Brand */}
                <div className="mt-40 pt-10 border-t border-border flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="flex flex-col items-center md:items-start gap-1">
                        <div className="flex items-center gap-3">
                            <span className="text-text-primary font-heading tracking-tighter text-2xl">VibeForge</span>
                            <div className="h-4 w-px bg-border hidden md:block" />
                            <span className="text-text-dim text-sm italic font-sans hidden md:block">The VibeCoding Suite</span>
                        </div>
                        <p className="text-text-dim text-xs font-sans mt-2">Architecture for the Autonomous Age.</p>
                    </div>

                    <div className="flex items-center gap-8">
                        <a
                            href="https://github.com/john-gpt"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col items-center gap-2"
                        >
                            <div className="w-10 h-10 rounded-full bg-glass flex items-center justify-center group-hover:text-accent transition-all group-hover:bg-white/5 border border-transparent group-hover:border-accent/20">
                                <Github size={18} />
                            </div>
                            <span className="text-[10px] uppercase tracking-widest text-text-dim group-hover:text-text-muted transition-colors">GitHub</span>
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col items-center gap-2"
                        >
                            <div className="w-10 h-10 rounded-full bg-glass flex items-center justify-center group-hover:text-accent-alt transition-all group-hover:bg-white/5 border border-transparent group-hover:border-accent-alt/20">
                                <Twitter size={18} />
                            </div>
                            <span className="text-[10px] uppercase tracking-widest text-text-dim group-hover:text-text-muted transition-colors">Twitter</span>
                        </a>
                        <a
                            href="https://youtube.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col items-center gap-2"
                        >
                            <div className="w-10 h-10 rounded-full bg-glass flex items-center justify-center group-hover:text-accent-warm transition-all group-hover:bg-white/5 border border-transparent group-hover:border-accent-warm/20">
                                <Youtube size={18} />
                            </div>
                            <span className="text-[10px] uppercase tracking-widest text-text-dim group-hover:text-text-muted transition-colors">YouTube</span>
                        </a>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-1">
                        <div className="text-text-dim text-xs font-sans">
                            © 2026 VibeSuite. Fully Open Source.
                        </div>
                        <div className="text-text-dim/50 text-[10px] font-sans tracking-tight">
                            Crafted with intent in Ado, Nigeria.
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
