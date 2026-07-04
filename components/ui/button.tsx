"use client"

import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-bold border-solid rounded-pv-sm transition-all duration-100 focus-visible:outline-none focus-visible:ring-0 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-pv-primary text-[#111111] border-[2px] border-pv-border shadow-[2px_2px_0px_0px_var(--pv-border)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]",
        active:
          "bg-pv-primary text-[#111111] border-[2px] border-pv-border shadow-[2px_2px_0px_0px_var(--pv-border)]",
        inactive:
          "bg-pv-card text-pv-text border-[2px] border-pv-border shadow-[2px_2px_0px_0px_var(--pv-border)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]",
      },
      size: {
        default: "h-10 px-4 py-2 text-sm tracking-wide uppercase",
        sm: "px-3 py-1.5 text-[11px] tracking-[0.03em] uppercase",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
