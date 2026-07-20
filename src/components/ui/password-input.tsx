"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"

interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string
  error?: string
}

export function PasswordInput({ label, error, ...props }: PasswordInputProps) {
  const [visible, setVisible] = useState(false)

  return (
    <Input
      label={label}
      error={error}
      type={visible ? "text" : "password"}
      rightElement={
        <button
          type="button"
          tabIndex={-1}
          aria-label={visible ? "Hide password" : "Show password"}
          className="text-pv-muted hover:text-pv-text transition-colors cursor-pointer"
          onClick={() => setVisible((v) => !v)}
        >
          <i
            className={`ti ${visible ? "ti-eye-off" : "ti-eye"} text-[16px]`}
            aria-hidden="true"
          />
        </button>
      }
      {...props}
    />
  )
}
