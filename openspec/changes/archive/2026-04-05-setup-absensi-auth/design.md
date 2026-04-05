## Context

The absensi (attendance) app at `apps/absensi/` currently has no authentication - it's a placeholder showing "Under Construction". The dashboard app (`apps/dashboard/`) already has a complete authentication system using TanStack Form, TanStack Query, Zod validation, API client with token refresh, and RBAC. The absensi app needs similar auth setup to protect attendance-related features.

## Goals / Non-Goals

**Goals:**

- Replicate dashboard's auth architecture in absensi app
- Add login page with TanStack Form + Zod validation
- Set up TanStack Query provider at app root
- Create API client with automatic token refresh (reuse existing pattern)
- Implement AuthProvider with session management
- Add protected routes with automatic redirect to login
- Implement RBAC (admin/employee) for access control
- Add necessary dependencies to absensi package.json

**Non-Goals:**

- Create new backend API endpoints (reuse existing `/api/auth/*` endpoints)
- Implement new password reset flow (reuse existing)
- Change database schema (reuse existing user/role system)
- Add multi-factor authentication

## Decisions

1. **Mirror dashboard's auth directory structure** - Use same `features/auth/` pattern with api, components, hooks, schemas, types subdirectories for consistency

2. **Use same API endpoints as dashboard** - The backend auth endpoints (`/api/auth/login`, `/api/auth/logout`, `/api/auth/me`, `/api/auth/refresh`) are shared, so absensi reuses the same API client logic

3. **In-memory token storage** - Keep tokens in JavaScript memory (not localStorage) for security, refresh via httpOnly cookie

4. **TanStack Query for data fetching** - Use the same QueryProvider setup as dashboard for consistency

5. **Role-based access** - Only admin role can access the absensi dashboard (matching dashboard pattern)

## Risks / Trade-offs

- **[Risk]** Dependency conflicts between apps - **Mitigation:** Ensure same versions of @tanstack/react-form, zod as dashboard, or use workspace:\*
- **[Risk]** Token lost on page refresh - **Mitigation:** Refresh token in httpOnly cookie automatically restores session
- **[Risk]** Inconsistent auth behavior between apps - **Mitigation:** Copy exact implementation from dashboard, maintain same patterns
