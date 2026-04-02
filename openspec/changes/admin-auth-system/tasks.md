## 1. Setup & Types

- [x] 1.1 Create `apps/dashboard/src/features/auth/` directory structure (api/, components/, hooks/, types/)
- [x] 1.2 Define TypeScript types in `types/index.ts` (User, AuthState, LoginCredentials, AuthToken)
- [x] 1.3 Create auth feature public exports in `index.ts`

## 2. API Layer

- [x] 2.1 Create `api/authApi.ts` with vanilla fetch utility
- [x] 2.2 Implement `login(email, password)` API function
- [x] 2.3 Implement `logout()` API function
- [x] 2.4 Implement `getCurrentUser()` API function (for session validation)
- [x] 2.5 Add token handling to API requests (Authorization header)

## 3. Auth Context & Hooks

- [x] 3.1 Create `AuthContext` with AuthState shape (user, isAuthenticated, isLoading)
- [x] 3.2 Create `AuthProvider` component with localStorage token initialization
- [x] 3.3 Implement `useAuth()` hook returning auth state and actions (login, logout)
- [x] 3.4 Add session persistence logic (token read/write from localStorage)

## 4. Login Page Component

- [x] 4.1 Create `components/LoginPage.tsx` using @repo/ui Card, Input, Button, Label
- [x] 4.2 Implement email/password form with controlled inputs
- [x] 4.3 Add form submission handler calling `useAuth().login()`
- [x] 4.4 Display loading state during authentication (disabled button, spinner)
- [x] 4.5 Show error messages via `toast` from sonner
- [x] 4.6 Redirect to dashboard root on successful login

## 5. Login Route

- [x] 5.1 Create `apps/dashboard/src/routes/login/index.tsx` with LoginPage component
- [x] 5.2 Configure route to NOT require authentication (public route)

## 6. Protected Route Implementation

- [x] 6.1 Create route protection logic using TanStack Router `beforeLoad`
- [x] 6.2 Redirect unauthenticated users to `/login` with redirect state
- [x] 6.3 Preserve intended destination URL in redirect for post-login navigation
- [x] 6.4 Apply protection to root route layout (all child routes inherit)

## 7. Logout Integration

- [x] 7.1 Add logout button to dashboard layout (AppBar or similar)
- [x] 7.2 Call `useAuth().logout()` on button click
- [x] 7.3 Handle logout errors gracefully (clear local state regardless)
- [x] 7.4 Redirect to `/login` after logout

## 8. Integration & Testing

- [x] 8.1 Wrap app root with `AuthProvider` in `__root.tsx`
- [ ] 8.2 Test login flow: invalid credentials, valid credentials, network errors
- [ ] 8.3 Test protected route: authenticated access, unauthenticated redirect
- [ ] 8.4 Test session persistence: refresh, close/reopen browser
- [ ] 8.5 Test logout flow: normal logout, API failure handling
