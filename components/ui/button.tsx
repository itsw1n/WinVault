import { clsx } from "clsx"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger"
}

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center px-4 py-2 text-sm font-bold uppercase tracking-wide border-pv rounded-pv-sm transition-colors",
        variant === "primary" &&
          "bg-pv-primary text-[#111] border-pv-border hover:bg-[#e05e00]",
        variant === "secondary" &&
          "bg-pv-card text-pv-text border-pv-border hover:bg-pv-bg",
        variant === "danger" &&
          "bg-pv-card text-pv-heart border-pv-border hover:bg-pv-bg",
        props.disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
