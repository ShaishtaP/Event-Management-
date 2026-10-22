import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium tracking-tight transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border border-primary/20 bg-primary/10 text-primary dark:text-primary-light font-medium",
        secondary:
          "border border-black/[0.06] dark:border-white/[0.1] bg-black/[0.04] dark:bg-white/[0.06] text-foreground",
        destructive:
          "border border-danger/20 bg-danger/10 text-danger dark:text-danger-light font-medium",
        success:
          "border border-success/20 bg-success/10 text-success dark:text-success-light font-medium",
        warning:
          "border border-warning/20 bg-warning/10 text-warning dark:text-warning-light font-medium",
        outline:
          "border border-black/[0.12] dark:border-white/[0.15] text-foreground bg-transparent",
        glass:
          "liquid-glass border border-black/[0.06] dark:border-white/[0.08] text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
