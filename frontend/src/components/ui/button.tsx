import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/95 hover:shadow active:bg-primary/90",
        destructive:
          "bg-danger text-danger-foreground shadow-sm hover:bg-danger/90 active:bg-danger/80",
        outline:
          "border border-black/[0.1] dark:border-white/[0.15] bg-transparent hover:bg-black/[0.04] dark:hover:bg-white/[0.06] text-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-black/[0.04] dark:hover:bg-white/[0.06] text-foreground",
        link:
          "text-primary underline-offset-4 hover:underline",
        glass:
          "liquid-glass text-foreground hover:bg-white/90 dark:hover:bg-black/90 shadow-sm border border-black/[0.06] dark:border-white/[0.1]",
        pill:
          "rounded-full bg-primary text-primary-foreground shadow-sm hover:bg-primary/95 hover:shadow",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-12 rounded-xl px-7 text-base font-medium",
        pill: "h-10 rounded-full px-5 py-2",
        icon: "h-10 w-10 rounded-xl",
        "icon-sm": "h-8 w-8 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
