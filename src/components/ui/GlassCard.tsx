'use client';

import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

export interface GlassCardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <motion.div
                ref={ref}
                className={cn("rounded-2xl bg-glass border border-border p-6 hover-glow", className)}
                {...props}
            >
                {children}
            </motion.div>
        )
    }
)
GlassCard.displayName = "GlassCard"
