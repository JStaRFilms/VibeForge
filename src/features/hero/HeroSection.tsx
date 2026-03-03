'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { Terminal, Code2, Sparkles, Cpu } from 'lucide-react';

export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const y1 = useTransform(smoothProgress, [0, 1], [0, -100]);
    const y2 = useTransform(smoothProgress, [0, 1], [0, -200]);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex flex-col items-center justify-center py-32 px-6 sm:px-8 overflow-hidden"
        >
            {/* SVG Gooey Filter Definition */}
            <svg className="hidden">
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
                            result="goo"
                        />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                </defs>
            </svg>

            {/* Animated Background Blobs */}
            <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
                <div className="absolute inset-0" style={{ filter: 'url(#goo)' }}>
                    <motion.div
                        animate={{
                            x: [0, 100, 0],
                            y: [0, -100, 0],
                        }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                        className="absolute top-[20%] left-[20%] w-[400px] h-[400px] bg-accent/20 rounded-full blur-2xl"
                    />
                    <motion.div
                        animate={{
                            x: [0, -150, 0],
                            y: [0, 150, 0],
                        }}
                        transition={{
                            duration: 30,
                            repeat: Infinity,
                            ease: 'linear',
                            delay: -10,
                        }}
                        className="absolute top-[40%] right-[10%] w-[500px] h-[500px] bg-accent-alt/10 rounded-full blur-2xl"
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        className="absolute bottom-[-10%] left-[40%] w-[600px] h-[600px] bg-accent-warm/15 rounded-full blur-[40px]"
                    />
                </div>
                <div className="absolute inset-0 bg-base/80" />
            </div>

            {/* Main Content */}
            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center z-10 transition-all">
                <div className="flex flex-col gap-6 text-center lg:text-left z-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.1] tracking-tight">
                            Crafted for the <br />
                            <span className="text-accent-alt italic mr-2">VibeCoding</span> Era
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                        className="font-sans text-text-muted text-lg sm:text-xl max-w-2xl mx-auto lg:mx-0 font-medium"
                    >
                        A terminal noir aesthetic designed for developers building the next generation of intelligent systems. Strict. Beautiful. Fast.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
                        className="flex flex-col sm:flex-row items-center gap-4 mt-4 justify-center lg:justify-start"
                    >
                        <button className="h-12 px-8 rounded-2xl bg-text-primary text-base font-heading text-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-transform">
                            Launch Pipeline
                        </button>
                        <button className="h-12 px-8 rounded-2xl bg-glass border border-border text-text-primary font-heading text-lg flex items-center justify-center hover-glow transition-all">
                            Deploy Infrastructure
                        </button>
                    </motion.div>
                </div>

                {/* Right column: Terminal & Parallax Cards */}
                <div className="relative w-full h-[500px] flex items-center justify-center mt-10 lg:mt-0">

                    {/* Main Terminal Mockup */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                        className="w-full max-w-lg bg-surface border border-border rounded-2xl overflow-hidden shadow-2xl relative z-20 bg-glass"
                    >
                        {/* Terminal Header */}
                        <div className="h-10 border-b border-border flex items-center px-4 gap-2 bg-elevated/80 backdrop-blur-sm">
                            <div className="w-3 h-3 rounded-full bg-border" />
                            <div className="w-3 h-3 rounded-full bg-border" />
                            <div className="w-3 h-3 rounded-full bg-border" />
                            <div className="ml-auto font-mono text-xs text-text-dim">vibesuite@local</div>
                        </div>
                        {/* Terminal Body */}
                        <div className="p-6 font-mono text-sm leading-loose">
                            <div className="flex items-center gap-3">
                                <span className="text-accent">~</span>
                                <span className="text-text-muted">$</span>
                                <span className="text-text-primary typing-animation">npx vibesuite init</span>
                            </div>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.5, duration: 0.5 }}
                                className="mt-4 text-text-muted space-y-2"
                            >
                                <p className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-accent" /> Bootstrapping environment...</p>
                                <p className="flex items-center gap-2"><Cpu className="w-4 h-4 text-accent-alt" /> Firing up agent loops...</p>
                                <p className="text-accent-warm pt-2">&gt; Ready in 0.4s.</p>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Parallax Floating Cards */}
                    <motion.div
                        style={{ y: y1 }}
                        initial={{ opacity: 0, scale: 0.8, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
                        className="absolute -top-10 -right-4 sm:-right-10 w-48 p-4 bg-glass backdrop-blur-3xl rounded-2xl border border-border shadow-2xl z-30"
                    >
                        <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                                <Terminal className="w-5 h-5 text-accent" />
                            </div>
                            <h3 className="font-heading text-text-primary text-lg mb-1">Strict Typed</h3>
                            <p className="font-sans text-xs text-text-muted">No any. No exceptions.</p>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        style={{ y: y2 }}
                        initial={{ opacity: 0, scale: 0.8, x: -20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.8 }}
                        className="absolute bottom-10 -left-6 sm:-left-12 w-48 p-4 bg-glass backdrop-blur-3xl rounded-2xl border border-border shadow-2xl z-30"
                    >
                        <motion.div
                            animate={{ y: [0, -12, 0] }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.5,
                            }}
                        >
                            <div className="w-10 h-10 rounded-full bg-accent-alt/20 flex items-center justify-center mb-4">
                                <Code2 className="w-5 h-5 text-accent-alt" />
                            </div>
                            <h3 className="font-heading text-text-primary text-lg mb-1">RSC Default</h3>
                            <p className="font-sans text-xs text-text-muted">Maximum velocity & limits.</p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
