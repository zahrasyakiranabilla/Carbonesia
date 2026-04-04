"use client"

import * as React from "react"
import { Button } from "@repo/ui/components/button"
import { Input } from "@repo/ui/components/input"

interface PasswordInputProps {
  id?: string
  name?: string
  value: string
  onChange: (value: string) => void
  onGenerate: () => void
  placeholder?: string
  disabled?: boolean
  "aria-invalid"?: boolean
}

export function PasswordInput({
  id,
  name,
  value,
  onChange,
  onGenerate,
  placeholder = "Masukkan password",
  disabled = false,
  "aria-invalid": ariaInvalid,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <Input
          id={id}
          name={name}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={ariaInvalid}
          className="pr-10"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="absolute top-0 right-0"
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
