import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
    "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-primary/10 text-primary hover:bg-primary/20",
                secondary:
                    "border-transparent bg-secondary/10 text-secondary-foreground hover:bg-secondary/20",
                destructive:
                    "border-transparent bg-destructive/10 text-destructive hover:bg-destructive/20",
                outline: "text-foreground border-border hover:bg-muted/50",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
    icon?: React.ElementType;
    emoji?: string;
}

const defaultEmojis: Record<string, string> = {
    default: "✨",
    secondary: "🔹",
    destructive: "⚠️",
    outline: "📌",
};

function Badge({
    className,
    variant,
    icon: Icon,
    emoji,
    children,
    ...props
}: BadgeProps) {
    const variantEmoji = emoji || (variant && defaultEmojis[variant]) || "";

    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props}>
            {Icon && <Icon className="mr-1 h-3 w-3" />}
            {variantEmoji && <span className="mr-1">{variantEmoji}</span>}
            {children}
        </div>
    )
}

export { Badge, badgeVariants } 