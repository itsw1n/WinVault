import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  rightElement?: React.ReactNode
}

export function Input({ label, error, className, rightElement, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-pv-text">{label}</label>}
      <div className="relative">
        <input
          className={cn(
            'w-full rounded-pv-sm border-pv border-pv-border bg-pv-card px-3 py-2 text-sm text-pv-text',
            'transition-colors focus:border-pv-primary focus:outline-none',
            rightElement && 'pr-10',
            className
          )}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">{rightElement}</div>
        )}
      </div>
      {error && <p className="text-xs text-pv-heart">{error}</p>}
    </div>
  )
}
