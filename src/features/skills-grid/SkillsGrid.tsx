'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import {
    TerminalSquare,
    PenTool,
    ShieldCheck,
    TrendingUp,
    BrainCircuit,
    Video,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
};

const skills = [
    {
        title: 'Project Lifecycle',
        description: 'End-to-end scaffolding, continuous deployment, and codebase evolution driven by structured AI intent.',
        icon: TerminalSquare,
        span: 'md:col-span-2 lg:col-span-2',
    },
    {
        title: 'Design Engine',
        description: 'Precision typography, fluid spacing, and custom glassmorphism layers crafted for premium aesthetics.',
        icon: PenTool,
        span: 'md:col-span-1 lg:col-span-1',
    },
    {
        title: 'Quality Gate',
        description: 'Rigorous automated review, comprehensive testing, and strict type-safety enforcement protocols.',
        icon: ShieldCheck,
        span: 'md:col-span-1 lg:col-span-1',
    },
    {
        title: 'SEO & Marketing',
        description: 'Semantic structures, dynamic metadata, and programmatic growth engines engineered from day zero.',
        icon: TrendingUp,
        span: 'md:col-span-2 lg:col-span-2',
    },
    {
        title: 'Research Layer',
        description: 'Deep context assembly, competitor synthesis, and algorithmic market discovery and validation pipelines.',
        icon: BrainCircuit,
        span: 'md:col-span-2 lg:col-span-2',
    },
    {
        title: 'Media & Content',
        description: 'Automated video generation, dynamic assets, and cross-platform narrative deployment infrastructure.',
        icon: Video,
        span: 'md:col-span-1 lg:col-span-1',
    },
];

export default function SkillsGrid() {
    return (
        <section className="relative overflow-hidden z-10 py-24 md:py-32" id="skills">
            <div className="max-w-6xl mx-auto px-6 md:px-8">
                <div className="mb-16 md:mb-24 flex flex-col items-start max-w-2xl">
                    <h2 className="font-[family-name:--font-display] text-4xl md:text-5xl lg:text-6xl text-text-primary tracking-tight mb-6">
                        The Protocol <span className="text-accent italic">Suite</span>
                    </h2>
                    <p className="font-sans text-text-muted text-lg md:text-xl leading-relaxed">
                        Multi-layered specialized sub-agents coordinating in perfect sync to execute the VibeCoding methodology.
                    </p>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                >
                    {skills.map((skill, index) => {
                        const Icon = skill.icon;
                        return (
                            <GlassCard
                                key={index}
                                variants={itemVariants}
                                className={cn('flex flex-col h-full group', skill.span)}
                            >
                                <div className="mb-6 p-3 rounded-xl bg-elevated/50 border border-border inline-flex w-fit group-hover:border-accent/40 transition-colors duration-300">
                                    <Icon className="w-6 h-6 text-accent-alt group-hover:text-accent transition-colors duration-300" />
                                </div>
                                <h3 className="font-[family-name:--font-heading] text-xl md:text-2xl text-text-primary font-bold mb-3">
                                    {skill.title}
                                </h3>
                                <p className="font-sans text-text-muted leading-relaxed flex-grow">
                                    {skill.description}
                                </p>
                            </GlassCard>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
