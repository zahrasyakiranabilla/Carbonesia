## 1. Add Dependencies

- [x] 1.1 Add `@tanstack/react-form`, `@tanstack/react-query`, `zod`, and `@hookform/resolvers` to `apps/absensi/package.json`
- [x] 1.2 Run `pnpm install` to install new dependencies

## 2. Create Auth Feature Structure

- [x] 2.1 Create `apps/absensi/src/features/auth/` directory structure (api, components, hooks, helpers, schemas, types)
- [x] 2.2 Copy `apps/dashboard/src/features/auth/types/index.ts` to absensi with same content
- [x] 2.3 Copy `apps/dashboard/src/features/auth/helpers/token-manager.ts` to absensi
- [x] 2.4 Copy `apps/dashboard/src/features/auth/helpers/index.ts` to absensi

## 3. Implement API Client

- [ ] 3.1 Copy `apps/dashboard/src/features/auth/api/api-client.ts` to absensi (same implementation)
- [ ] 3.2 Copy `apps/dashboard/src/features/auth/api/auth-api.ts` to absensi (same implementation)

## 4. Create Login Schema and Form

- [ ] 4.1 Copy `apps/dashboard/src/features/auth/schemas/login-schema.ts` to absensi
- [ ] 4.2 Copy `apps/dashboard/src/features/auth/components/login-page.tsx` to absensi
- [ ] 4.3 Copy `apps/dashboard/src/features/auth/components/index.ts` to absensi

## 5. Implement Auth Provider

- [ ] 5.1 Copy `apps/dashboard/src/features/auth/hooks/use-auth.tsx` to absensi
- [ ] 5.2 Copy `apps/dashboard/src/features/auth/hooks/index.ts` to absensi

## 6. Setup Providers and Router

- [ ] 6.1 Create `apps/absensi/src/lib/query-client.ts` (copy from dashboard)
- [ ] 6.2 Create `apps/absensi/src/components/providers/query-provider.tsx` (copy from dashboard)
- [ ] 6.3 Create `apps/absensi/src/components/providers/index.ts` (copy from dashboard)
- [ ] 6.4 Wrap app with QueryProvider in `apps/absensi/src/main.tsx` or root component
- [ ] 6.5 Wrap app with AuthProvider in root component

## 7. Create Login Route and Protected Layout

- [ ] 7.1 Create `apps/absensi/src/routes/login/index.tsx` using login-page component
- [ ] 7.2 Create `apps/absensi/src/routes/_layout.tsx` with auth protection and RBAC (copy from dashboard)
- [ ] 7.3 Update `apps/absensi/src/router.tsx` to include login route and protected layout

## 8. Test and Verify

- [ ] 8.1 Run `pnpm --filter absensi dev` to start development server
- [ ] 8.2 Verify login page loads at /login
- [ ] 8.3 Test login flow with valid credentials
- [ ] 8.4 Verify redirect to login when unauthenticated
- [ ] 8.5 Verify RBAC blocks non-admin users
