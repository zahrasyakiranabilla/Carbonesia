## Why

The admin dashboard currently has no authentication mechanism, allowing unrestricted access to all routes. This poses a security risk as administrative features will require controlled access. Authentication is a foundational requirement before any admin functionality can be safely implemented.

## What Changes

- Add login page with email/password authentication form
- Implement authentication state management with session persistence
- Create protected route wrapper that checks authentication status
- Redirect unauthenticated users to login page when accessing protected routes
- Add logout functionality with session cleanup

## Capabilities

### New Capabilities
- `admin-auth`: Login page, authentication state management, protected routes, and logout functionality for the admin dashboard

### Modified Capabilities
- (none - no existing specs)

## Impact

- **Apps affected**: `apps/dashboard`
- **New directories**: `apps/dashboard/src/features/auth/` (api, components, hooks, types)
- **Routes**: New `/login` route, protected route wrapper for all dashboard routes
- **Dependencies**: May require API integration with `apps/api` for authentication endpoints
- **UI components**: Login form using existing `@repo/ui` components (Card, Input, Button, Label)
