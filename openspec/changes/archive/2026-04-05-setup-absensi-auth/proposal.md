## Why

The absensi (attendance) app currently has no authentication system. Users can access the app without any login, which poses a security risk and prevents tracking attendance by user. The dashboard module already has a complete auth implementation that can be reused, but absensi needs its own frontend setup including TanStack Query, API client, login page, and RBAC protection.

## What Changes

- Add authentication feature module to absensi app (mirroring dashboard's `features/auth` structure)
- Create login page with TanStack Form and Zod validation
- Set up TanStack Query provider and API client with token refresh
- Implement RBAC (admin/employee roles) for route protection
- Add token manager helper for JWT handling
- Configure protected routes that redirect to login if not authenticated

## Capabilities

### New Capabilities

- `absensi-auth`: Authentication system for absensi app including login, token management, session handling, and role-based access control

### Modified Capabilities

- `user-auth`: Extends the existing user-auth spec from dashboard to cover absensi app login (reuses same backend API endpoints)

## Impact

- **New code**: `apps/absensi/src/features/auth/` directory with api, components, hooks, schemas, types
- **Dependencies**: Add `@tanstack/react-form`, `@tanstack/react-query`, `zod` to absensi package.json
- **Routes**: Add login route and protected layout wrapper in absensi router
- **Backend**: Reuses existing auth API endpoints from dashboard (no backend changes needed)
