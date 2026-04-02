/**
 * Auth API - Authentication endpoints
 *
 * Uses the API client with automatic token refresh and retry logic.
 * Access tokens stored in memory, refresh tokens in httpOnly cookies.
 */

import {
  api,
  authFetch,
  handleApiResponse,
} from "./api-client"
import { setAccessToken, clearAccessToken, getAccessToken } from "../helpers/token-manager"
import type { LoginCredentials, LoginResponse, User } from "../types"

const API_BASE_URL = "http://localhost:8080/api"

/**
 * Login with email and password
 * Server sets refresh token in httpOnly cookie
 * Access token returned in response body (stored in memory)
 */
export async function login(
  credentials: LoginCredentials
): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Receive and send cookies
    body: JSON.stringify(credentials),
  })

  const data = await handleApiResponse<LoginResponse>(response)

  // Store access token in memory
  setAccessToken(data.access_token)

  return data
}

/**
 * Logout - clears session on server and client
 * Server clears the httpOnly cookie
 */
export async function logout(): Promise<void> {
  try {
    // Call logout endpoint (server clears cookie)
    await api.post("/auth/logout")
  } catch {
    // Silently succeed - clear local state regardless
  } finally {
    // Clear access token from memory
    clearAccessToken()
  }
}

/**
 * Get current authenticated user
 * Uses API client with automatic refresh/retry
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const response = await authFetch(`${API_BASE_URL}/auth/me`)
    if (!response.ok) {
      return null
    }
    const data = await handleApiResponse<{ user: User }>(response)
    return data.user
  } catch {
    return null
  }
}

/**
 * Check if user has valid session
 * Returns true if we have an access token in memory
 */
export function hasSession(): boolean {
  // Token stored in memory, check via api-client
  const token = getAccessToken()
  return token !== null
}

/**
 * Get the current access token from memory
 * Re-exported from token-manager for convenience
 */
export { getAccessToken } from "../helpers/token-manager"

/**
 * Auth error type for consumers
 */
export { ApiError } from "./api-client"