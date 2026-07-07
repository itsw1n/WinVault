import { clsx } from "clsx"

interface CardProps {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={clsx(
        "bg-pv-card border-pv border-pv-border rounded-pv",
        className
      )}
    >
      {children}
    </div>
  )
}
