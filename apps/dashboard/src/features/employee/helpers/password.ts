/**
 * Helper functions for employee management
 */

/**
 * Generate a random password with specified length
 * Includes uppercase, lowercase, numbers, and special characters
 */
export function generatePassword(length: number = 16): string {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const lowercase = "abcdefghijklmnopqrstuvwxyz"
  const numbers = "0123456789"
  const special = "!@#$%^&*()_+-=[]{}|;:,.<>?"

  const allChars = uppercase + lowercase + numbers + special

  // Ensure at least one of each type
  const getRandomChar = (chars: string): string => {
    const array = new Uint32Array(1)
    crypto.getRandomValues(array)
    return chars[array[0] % chars.length]
  }

  let password = ""
  password += getRandomChar(uppercase)
  password += getRandomChar(lowercase)
  password += getRandomChar(numbers)
  password += getRandomChar(special)

  // Fill the rest with random characters
  for (let i = password.length; i < length; i++) {
    const array = new Uint32Array(1)
    crypto.getRandomValues(array)
    password += allChars[array[0] % allChars.length]
  }

  // Shuffle the password
  const passwordArray = password.split("")
  for (let i = passwordArray.length - 1; i > 0; i--) {
    const array = new Uint32Array(1)
    crypto.getRandomValues(array)
    const j = array[0] % (i + 1)
    ;[passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]]
  }

  return passwordArray.join("")
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate password strength
 * At least 8 characters
 */
export function isValidPassword(password: string): boolean {
  return password.length >= 8
}
