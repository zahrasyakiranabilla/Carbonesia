"use client"

import * as React from "react"

import { Button } from "@repo/ui/components/button"
import { Input } from "@repo/ui/components/input"

interface PasswordInputProps {
  value: string
  onChange: (value: string) => void
  onGenerate: () => void
  placeholder?: string
  disabled?: boolean
}

export function PasswordInput({
  value,
  onChange,
  onGenerate,
  placeholder = "Masukkan password",
  disabled = false,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <Input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="pr-10"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="absolute right-0 top-0"
          onClick={() => setShowPassword(!showPassword)}
          disabled={disabled}
        >
          {showPassword ? "🙈" : "👁️"}
        </Button>
      </div>
      <Button
        type="button"
        variant="secondary"
        onClick={onGenerate}
        disabled={disabled}
      >
        Generate
      </Button>
    </div>
  )
}