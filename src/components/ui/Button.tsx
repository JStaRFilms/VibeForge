import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'glass';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", ...props }, ref) => {
        return (
            <button
                className={cn(
                    "inline-flex items-center justify-center rounded-2xl font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none px-6 py-3",
                    {
                        "bg-accent hover:bg-accent/90 text-white shadow-[0_0_20px_var(--color-glow)]": variant === 'primary',
                        "bg-elevated text-text-primary hover:bg-surface border border-border": variant === 'secondary',
                        "bg-glass hover:bg-white/5 text-text-primary border border-border": variant === 'glass',
                    },
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
