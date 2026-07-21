import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  className?: string
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-pv-sm border border-pv-border px-2 py-0.5 text-xs font-bold uppercase tracking-wide',
        className
      )}
    >
      {children}
    </span>
  )
}
