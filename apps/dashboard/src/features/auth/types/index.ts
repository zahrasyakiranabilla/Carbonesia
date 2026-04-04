/**
 * User type for role-based access control
 */
export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "employee"
}

/**
 * Check if user has admin role
 */
export function isAdmin(user: User | null): boolean {
  return user?.role === "admin"
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthToken {
  token: string
  expiresAt?: number
}

export interface LoginResponse {
  access_token: string
  expires_at: string
  user: User
}
