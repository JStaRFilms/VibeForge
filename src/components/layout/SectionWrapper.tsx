'use client';

import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"
import { staggerContainer } from "@/lib/animations"

export interface SectionWrapperProps extends HTMLMotionProps<"section"> {
    children: React.ReactNode;
}

export const SectionWrapper = React.forwardRef<HTMLElement, SectionWrapperProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <motion.section
                ref={ref}
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className={cn("w-full py-24 md:py-32", className)}
                {...props}
            >
                {children}
            </motion.section>
        )
    }
)
SectionWrapper.displayName = "SectionWrapper"
