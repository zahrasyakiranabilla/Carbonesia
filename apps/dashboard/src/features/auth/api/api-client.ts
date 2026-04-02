/**
 * API Client with automatic token refresh and retry logic
 *
 * Features:
 * - Stores access token in memory (not localStorage)
 * - Refresh token handled via httpOnly cookie by server
 * - Checks JWT exp before requests, refreshes if expiring in <60s
 * - Single-flight refresh: global refreshPromise prevents concurrent refreshes
 * - On 401, attempts one refresh and retries the original request
 * - Request replay after refresh (handles body cloning for forms)
 */

import {
  getAccessToken,
  setAccessToken,
  clearAccessToken,
  isTokenExpiring,
} from "../helpers/token-manager"

const API_BASE_URL = "http://localhost:8080/api"

/**
 * Global refresh promise for single-flight pattern
 * Only one refresh request runs at a time, other requests queue until it resolves
 */
let refreshPromise: Promise<string> | null = null

/**
 * Trigger a redirect to login page
 * Called when refresh fails or no token available
 */
function redirectToLogin(): void {
  clearAccessToken()
  // Use window.location for hard redirect to clear all state
  if (typeof window !== "undefined") {
    window.location.href = "/login"
  }
}

/**
 * Refresh the access token using the refresh token cookie
 * The server reads the httpOnly cookie and returns a new access token
 */
async function refreshAccessToken(): Promise<string> {
  // If refresh already in progress, return existing promise
  if (refreshPromise) {
    return refreshPromise
  }

  refreshPromise = (async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include", // Send httpOnly cookie
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Refresh failed")
      }

      const data = await response.json()
      const newToken = data.access_token

      if (!newToken) {
        throw new Error("No access token in refresh response")
      }

      setAccessToken(newToken)
      return newToken
    } finally {
      // Clear promise after completion (success or failure)
      refreshPromise = null
    }
  })()

  return refreshPromise
}

/**
 * Clone a request for retry after refresh
 * Handles body cloning for POST/PUT/PATCH requests
 */
async function cloneRequest(request: Request): Promise<Request> {
  // If request has a body, we need to clone it
  if (request.body) {
    // Read body as ArrayBuffer to clone it
    const bodyBuffer = await request.arrayBuffer()
    return new Request(request.url, {
      method: request.method,
      headers: request.headers,
      body: bodyBuffer,
      credentials: request.credentials,
      signal: request.signal,
    })
  }
  // No body, simple clone
  return request.clone()
}

/**
 * Fetch with automatic token handling
 *
 * - Adds Authorization header if token available
 * - Checks token expiration, refreshes if expiring
 * - Handles 401 with one refresh + retry
 * - Redirects to login on refresh failure
 */
export async function authFetch(
  input: string | URL | Request,
  init?: RequestInit
): Promise<Response> {
  // Normalize to Request object
  let request =
    input instanceof Request
      ? input
      : new Request(input.toString(), init)

  // Track if we've tried refresh for this request (prevent infinite loops)
  let triedRefresh = false

  // Main request loop with retry
  while (true) {
    const token = getAccessToken()

    // If token exists and is expiring, refresh before request
    if (token && isTokenExpiring(token, 60)) {
      try {
        const newToken = await refreshAccessToken()
        request = await rebuildRequestWithAuth(request, newToken)
      } catch {
        // Refresh failed, redirect to login
        redirectToLogin()
        throw new Error("Session expired. Please login again.")
      }
    }

    // Add auth header if token exists (after potential refresh)
    const currentToken = getAccessToken()
    if (currentToken && !request.headers.has("Authorization")) {
      request = await rebuildRequestWithAuth(request, currentToken)
    }

    // Make the request (include cookies for refresh token)
    const response = await fetch(request, {
      ...init,
      credentials: "include",
    })

    // On 401, try one refresh and retry
    if (response.status === 401 && !triedRefresh) {
      triedRefresh = true

      try {
        // Clone request before body is consumed
        const clonedRequest = await cloneRequest(request)

        // Refresh token
        const newToken = await refreshAccessToken()

        // Rebuild request with new token
        const retryRequest = await rebuildRequestWithAuth(
          clonedRequest,
          newToken
        )

        // Retry once
        request = retryRequest
        continue // Loop back to retry
      } catch {
        // Refresh failed, redirect to login
        redirectToLogin()
        throw new Error("Session expired. Please login again.")
      }
    }

    // Return response (success or final failure)
    return response
  }
}

/**
 * Rebuild a request with Authorization header
 */
async function rebuildRequestWithAuth(
  request: Request,
  token: string
): Promise<Request> {
  const headers = new Headers(request.headers)
  headers.set("Authorization", `Bearer ${token}`)

  // Clone body if exists
  let body: BodyInit | null = null
  if (request.body) {
    const bodyBuffer = await request.arrayBuffer()
    body = bodyBuffer
  }

  return new Request(request.url, {
    method: request.method,
    headers,
    body,
    credentials: request.credentials,
    signal: request.signal,
  })
}

/**
 * API Error class with status code
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message)
    this.name = "ApiError"
  }
}

/**
 * Handle API response, throw on error
 */
export async function handleApiResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new ApiError(
      errorData.message || `HTTP ${response.status}`,
      response.status,
      errorData.code
    )
  }
  return response.json()
}

/**
 * Convenience methods for common HTTP methods
 */
export const api = {
  get: async <T>(path: string): Promise<T> => {
    const response = await authFetch(`${API_BASE_URL}${path}`)
    return handleApiResponse<T>(response)
  },

  post: async <T>(path: string, body?: unknown): Promise<T> => {
    const response = await authFetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    })
    return handleApiResponse<T>(response)
  },

  put: async <T>(path: string, body?: unknown): Promise<T> => {
    const response = await authFetch(`${API_BASE_URL}${path}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    })
    return handleApiResponse<T>(response)
  },

  patch: async <T>(path: string, body?: unknown): Promise<T> => {
    const response = await authFetch(`${API_BASE_URL}${path}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    })
    return handleApiResponse<T>(response)
  },

  delete: async <T>(path: string): Promise<T> => {
    const response = await authFetch(`${API_BASE_URL}${path}`, {
      method: "DELETE",
    })
    return handleApiResponse<T>(response)
  },
}

/**
 * Trigger a proactive refresh
 * Called on app focus/online events for smoother UX
 */
export async function proactiveRefresh(): Promise<void> {
  const token = getAccessToken()
  if (token && isTokenExpiring(token, 120)) {
    // Refresh if expiring within 2 minutes on focus/online
    try {
      await refreshAccessToken()
    } catch {
      // Silently fail on proactive refresh
      // Will be handled on next request
    }
  }
}