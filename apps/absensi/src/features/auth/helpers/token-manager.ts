/**
 * Token Manager - In-memory access token storage
 *
 * Access tokens are stored in memory only (not localStorage/sessionStorage)
 * for security reasons. Refresh tokens are handled via httpOnly cookies
 * by the server.
 */

/**
 * Decode JWT payload without validation
 * Returns null if token is invalid or not a valid JWT
 */
function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split(".")
    if (parts.length !== 3) {
      return null
    }
    const payload = parts[1]
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
    return JSON.parse(decoded)
  } catch {
    return null
  }
}

/**
 * Get token expiration time in seconds since epoch
 * Returns null if token is invalid or doesn't have exp claim
 */
export function getTokenExpiration(token: string): number | null {
  const payload = decodeJwtPayload(token)
  if (!payload || typeof payload.exp !== "number") {
    return null
  }
  return payload.exp
}

/**
 * Check if token is expired or will expire within bufferSeconds
 * @param token - JWT token string
 * @param bufferSeconds - How many seconds before expiration to consider "expiring" (default: 60)
 */
export function isTokenExpiring(token: string, bufferSeconds = 60): boolean {
  const exp = getTokenExpiration(token)
  if (!exp) {
    return true // Invalid token, treat as expired
  }
  const now = Math.floor(Date.now() / 1000)
  return exp - now < bufferSeconds
}

/**
 * In-memory token storage
 * Tokens are lost on page refresh, requiring re-authentication
 */
let accessToken: string | null = null

/**
 * Get the current access token from memory
 */
export function getAccessToken(): string | null {
  return accessToken
}

/**
 * Set the access token in memory
 */
export function setAccessToken(token: string | null): void {
  accessToken = token
}

/**
 * Clear the access token from memory
 */
export function clearAccessToken(): void {
  accessToken = null
}

/**
 * Check if we have an access token
 */
export function hasAccessToken(): boolean {
  return accessToken !== null
}
