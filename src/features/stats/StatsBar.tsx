'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';

interface StatProps {
    value: number;
    label: string;
    prefix?: string;
    suffix?: string;
    delay?: number;
}

function StatItem({ value, label, prefix = '', suffix = '', delay = 0 }: StatProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const nodeRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (isInView && nodeRef.current) {
            const controls = animate(0, value, {
                duration: 2.5,
                delay: delay + 0.2,
                ease: [0.16, 1, 0.3, 1], // easeOutExpo
                onUpdate: (v) => {
                    if (nodeRef.current) {
                        nodeRef.current.textContent = Math.round(v).toString();
                    }
                }
            });
            return () => controls.stop();
        }
    }, [isInView, value, delay]);

    return (
        <div
            ref={ref}
            className="flex flex-col items-center justify-center p-8 text-center group relative origin-center"
        >
            {/* Subtle hover glow ring */}
            <div className="absolute inset-0 bg-gradient-to-b from-[--color-accent]/0 to-[--color-accent-alt]/0 transition-colors duration-500 group-hover:from-[--color-accent]/5 group-hover:to-transparent pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: delay }}
                className="flex mb-3 items-baseline justify-center relative z-10"
            >
                {prefix && <span className="text-3xl font-satoshi font-bold text-[--color-accent] mr-1">{prefix}</span>}
                <span
                    ref={nodeRef}
                    className="text-5xl md:text-6xl font-[family-name:var(--font-display)] italic tracking-tight text-[#E8E8ED]"
                >
                    0
                </span>
                {suffix && <span className="text-3xl font-satoshi font-bold text-[--color-accent] ml-1">{suffix}</span>}
            </motion.div>
            <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.6, delay: delay + 0.2 }}
                className="font-geist text-xs md:text-sm text-[--color-text-muted] uppercase tracking-widest relative z-10"
            >
                {label}
            </motion.span>
        </div>
    );
}

export default function StatsBar() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-50px" });

    return (
        <section className="relative z-20 md:-mt-12 px-6 max-w-6xl mx-auto" aria-label="VibeForge Statistics">
            <motion.div
                ref={containerRef}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative overflow-hidden rounded-2xl border border-[--color-border] bg-[#0b0c10]/80 backdrop-blur-md shadow-2xl"
            >
                {/* Cinematic gradient background for the bar */}
                <div className="absolute inset-0 bg-gradient-to-r from-[--color-accent]/5 via-transparent to-[--color-accent-alt]/5 pointer-events-none" />
                <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>

                <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[--color-border] relative z-10">
                    <StatItem value={64} label="Premium Skills" delay={0.1} />
                    <StatItem value={26} label="Pro Workflows" delay={0.2} />
                    <StatItem value={1} label="Command Install" delay={0.3} />
                    <StatItem value={100} label="Free Forever" suffix="%" delay={0.4} />
                </div>
            </motion.div>
        </section>
    );
}
