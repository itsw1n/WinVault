import { cn } from "@/lib/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-pv-text">{label}</label>
      )}
      <input
        className={cn(
          "w-full px-3 py-2 text-sm bg-pv-card text-pv-text border-pv border-pv-border rounded-pv-sm",
          "focus:outline-none focus:border-pv-primary transition-colors",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-pv-heart">{error}</p>}
    </div>
  )
}
