## Why

The absensi module needs a solid foundation before implementing core attendance features. Without a database schema and authentication system, we cannot store attendance records or identify who is checking in/out. This is the critical first step that enables all subsequent features.

Starting with database + auth allows us to establish:
- Data models that will be referenced throughout the application
- Security baseline for protecting user data and attendance records
- API patterns that other features will follow

## What Changes

- **New PostgreSQL database schema** with tables: `users`, `branches`, `attendances`, `refresh_tokens`
- **Migration system** using simple SQL migration files
- **JWT authentication** with access tokens (24h expiry) and refresh tokens (30d expiry)
- **Password hashing** with bcrypt (cost factor 12)
- **Auth API endpoints**: login, logout, refresh token, forgot-password, reset-password
- **Role-based access** foundation (office, apoteker, staff, admin)
- **Go backend project structure** following standard conventions

## Capabilities

### New Capabilities

- `db-schema`: PostgreSQL schema for users, branches, attendances, refresh_tokens with proper indexes and constraints
- `user-auth`: JWT-based authentication with login, logout, refresh, password reset functionality

### Modified Capabilities

(None - this is a new module with no existing specs)

## Impact

- **New code**: `apps/api/` directory with Go backend
- **Dependencies**: PostgreSQL database, no external auth libraries (using Go standard library + bcrypt)
- **APIs exposed**:
  - `POST /api/auth/login`
  - `POST /api/auth/logout`
  - `POST /api/auth/refresh`
  - `POST /api/auth/forgot-password`
  - `POST /api/auth/reset-password`
- **Environment variables required**: `DATABASE_URL`, `JWT_SECRET`