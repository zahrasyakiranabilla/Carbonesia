"use client"

/**
 * Auth hook with automatic session management
 *
 * Features:
 * - Access token in memory, refresh token in httpOnly cookie
 * - On mount, attempts to restore session via refresh endpoint
 * - Proactive refresh on app focus and online events
 * - Automatic redirect to login on session expiry
 */
import * as React from "react"
import { useNavigate } from "@tanstack/react-router"

import { proactiveRefresh, setAuthErrorCallback } from "../api/api-client"
import {
  getCurrentUser,
  login as loginApi,
  logout as logoutApi,
} from "../api/auth-api"
import { clearAccessToken } from "../helpers/token-manager"
import type { AuthState, LoginCredentials, User } from "../types"

export interface AuthContextValue extends AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = React.createContext<AuthContextValue | null>(null)

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate()
  const [state, setState] = React.useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  })

  /**
   * Set up auth error callback for API client
   * This handles redirect when refresh token fails
   */
  React.useEffect(() => {
    const handleAuthError = () => {
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      })
      navigate({ to: "/login", search: { redirect: window.location.pathname } })
    }

    setAuthErrorCallback(handleAuthError)

    return () => {
      setAuthErrorCallback(null)
    }
  }, [navigate])

  /**
   * Initialize auth on mount
   * Try to restore session via refresh endpoint (refresh token in cookie)
   */
  React.useEffect(() => {
    const initAuth = async () => {
      try {
        // Try to get current user - will trigger refresh if cookie exists
        // The API client handles the refresh automatically
        const user = await getCurrentUser()

        if (user) {
          setState({
            user,
            isAuthenticated: true,
            isLoading: false,
          })
        } else {
          // No valid session
          setState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          })
        }
      } catch {
        // Refresh failed or no session
        clearAccessToken()
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        })
      }
    }

    initAuth()
  }, [])

  /**
   * Proactive refresh on app focus and online events
   * Provides smoother UX by refreshing token before it expires
   */
  React.useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && state.isAuthenticated) {
        proactiveRefresh()
      }
    }

    const handleOnline = () => {
      if (state.isAuthenticated) {
        proactiveRefresh()
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    window.addEventListener("online", handleOnline)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("online", handleOnline)
    }
  }, [state.isAuthenticated])

  const login = React.useCallback(async (credentials: LoginCredentials) => {
    const result = await loginApi(credentials)
    setState({
      user: result.user,
      isAuthenticated: true,
      isLoading: false,
    })
  }, [])

  const logout = React.useCallback(async () => {
    await logoutApi()
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    })
    navigate({ to: "/login", search: { redirect: "/" } })
  }, [navigate])

  const value = React.useMemo(
    () => ({
      ...state,
      login,
      logout,
    }),
    [state, login, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
