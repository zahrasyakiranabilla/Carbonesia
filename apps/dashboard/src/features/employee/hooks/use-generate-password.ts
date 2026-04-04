/**
 * Hook for generating random passwords
 */

import { useState, useCallback } from "react"
import { generatePassword } from "../helpers/password"

export function useGeneratePassword(defaultLength: number = 16) {
  const [password, setPassword] = useState(() => generatePassword(defaultLength))

  const regenerate = useCallback((length: number = defaultLength) => {
    setPassword(generatePassword(length))
  }, [defaultLength])

  return {
    password,
    regenerate,
  }
}