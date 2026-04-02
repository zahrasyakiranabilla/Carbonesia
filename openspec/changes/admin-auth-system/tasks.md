## 1. Setup & Types

- [ ] 1.1 Create `apps/dashboard/src/features/auth/` directory structure (api/, components/, hooks/, types/)
- [ ] 1.2 Define TypeScript types in `types/index.ts` (User, AuthState, LoginCredentials, AuthToken)
- [ ] 1.3 Create auth feature public exports in `index.ts`

## 2. API Layer

- [ ] 2.1 Create `api/authApi.ts` with vanilla fetch utility
- [ ] 2.2 Implement `login(email, password)` API function
- [ ] 2.3 Implement `logout()` API function
- [ ] 2.4 Implement `getCurrentUser()` API function (for session validation)
- [ ] 2.5 Add token handling to API requests (Authorization header)

## 3. Auth Context & Hooks

- [ ] 3.1 Create `AuthContext` with AuthState shape (user, isAuthenticated, isLoading)
- [ ] 3.2 Create `AuthProvider` component with localStorage token initialization
- [ ] 3.3 Implement `useAuth()` hook returning auth state and actions (login, logout)
- [ ] 3.4 Add session persistence logic (token read/write from localStorage)

## 4. Login Page Component

- [ ] 4.1 Create `components/LoginPage.tsx` using @repo/ui Card, Input, Button, Label
- [ ] 4.2 Implement email/password form with controlled inputs
- [ ] 4.3 Add form submission handler calling `useAuth().login()`
- [ ] 4.4 Display loading state during authentication (disabled button, spinner)
- [ ] 4.5 Show error messages via `toast` from sonner
- [ ] 4.6 Redirect to dashboard root on successful login

## 5. Login Route

- [ ] 5.1 Create `apps/dashboard/src/routes/login/index.tsx` with LoginPage component
- [ ] 5.2 Configure route to NOT require authentication (public route)

## 6. Protected Route Implementation

- [ ] 6.1 Create route protection logic using TanStack Router `beforeLoad`
- [ ] 6.2 Redirect unauthenticated users to `/login` with redirect state
- [ ] 6.3 Preserve intended destination URL in redirect for post-login navigation
- [ ] 6.4 Apply protection to root route layout (all child routes inherit)

## 7. Logout Integration

- [ ] 7.1 Add logout button to dashboard layout (AppBar or similar)
- [ ] 7.2 Call `useAuth().logout()` on button click
- [ ] 7.3 Handle logout errors gracefully (clear local state regardless)
- [ ] 7.4 Redirect to `/login` after logout

## 8. Integration & Testing

- [ ] 8.1 Wrap app root with `AuthProvider` in `__root.tsx`
- [ ] 8.2 Test login flow: invalid credentials, valid credentials, network errors
- [ ] 8.3 Test protected route: authenticated access, unauthenticated redirect
- [ ] 8.4 Test session persistence: refresh, close/reopen browser
- [ ] 8.5 Test logout flow: normal logout, API failure handling
