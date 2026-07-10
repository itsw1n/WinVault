import { cn } from "@/lib/utils"

interface BadgeProps {
  children: React.ReactNode
  className?: string
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 text-xs font-bold uppercase tracking-wide border border-pv-border rounded-pv-sm",
        className
      )}
    >
      {children}
    </span>
  )
}
