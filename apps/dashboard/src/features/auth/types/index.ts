export interface User {
  id: string
  email: string
  name: string
  role: string
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
