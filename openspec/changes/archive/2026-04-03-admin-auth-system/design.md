## Context

The admin dashboard (`apps/dashboard`) is a TanStack Router-based React application with no authentication. Currently all routes are publicly accessible. The backend API (`apps/api`) exists but auth endpoints are not yet confirmed.

Current architecture:
- TanStack Router with file-based routing (`src/routes/`)
- Shared UI components from `@repo/ui` package
- No feature-based organization yet (routes only)

## Goals / Non-Goals

**Goals:**
- Secure admin dashboard with authentication gate
- Login page with email/password form
- Protected route wrapper that redirects unauthenticated users
- Session persistence across browser refreshes
- Logout with session cleanup

**Non-Goals:**
- User registration (admin accounts managed separately)
- Password reset flow (future enhancement)
- Multi-factor authentication (future enhancement)
- Role-based permissions (single admin role for now)
- Remember me functionality (session storage only)

## Decisions

### 1. Auth State Management: React Context + TanStack Query

**Decision:** Use React Context for auth state with TanStack Query for API calls.

**Alternatives considered:**
- Zustand: Simpler, but Context is sufficient for single auth context
- Redux: Overkill for this scope
- Local state: No persistence across components

**Rationale:** Context provides global auth state, TanStack Query handles API caching and loading states. Matches frontend-dev-guidelines patterns.

### 2. Session Storage: localStorage with Token

**Decision:** Store auth token in localStorage, check on app initialization.

**Alternatives considered:**
- sessionStorage: Lost on tab close, worse UX
- Cookies: Requires backend coordination, CSRF concerns
- IndexedDB: Overkill for single token

**Rationale:** localStorage persists across sessions, simple to implement. Token validated on each API call.

### 3. Protected Routes: TanStack Router `beforeLoad`

**Decision:** Use TanStack Router's `beforeLoad` hook for route protection.

**Alternatives considered:**
- Wrapper component: Works but less integrated with router
- Middleware pattern: Not native to TanStack Router

**Rationale:** `beforeLoad` is the canonical TanStack Router pattern for route guards. Can redirect before component loads.

### 4. Login Form: shadcn/ui Components

**Decision:** Build login form using `@repo/ui` Card, Input, Button, Label components.

**Alternatives considered:**
- Custom form: More work, inconsistent styling
- Third-party form library: Unnecessary for simple login

**Rationale:** Consistent with existing UI, follows frontend-dev-guidelines for shadcn/ui usage.

## Risks / Trade-offs

- **localStorage XSS vulnerability** → Token is opaque, validated server-side; mitigate with short expiry
- **No refresh token flow** → User must re-login on token expiry; acceptable for MVP
- **API endpoints uncertain** → Create flexible authApi module that can adapt to backend changes
- **Single role (admin)** → Role-based access control deferred; all authenticated users have full access

## Migration Plan

1. Create `features/auth/` structure (api, components, hooks, types)
2. Implement auth context and hooks
3. Create login route and component
4. Add protected route wrapper to root route
5. Test auth flow end-to-end

No rollback needed - auth is additive, doesn't break existing routes.

## Open Questions

- What are the exact backend auth endpoints? (Assume `/auth/login`, `/auth/logout`, `/auth/me` for now)
- Token format and expiry? (Assume JWT with 24h expiry)
- How to handle API errors during auth check? (Redirect to login on any auth failure)
