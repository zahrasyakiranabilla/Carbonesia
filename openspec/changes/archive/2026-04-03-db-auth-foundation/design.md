## Context

This is the foundation layer for the absensi module - a attendance tracking system for Apotek Asasi with 3 branches. We're building a Go backend with PostgreSQL database.

**Current state**: Empty `apps/api/` directory, no existing database or auth infrastructure.

**Constraints**:
- Go standard library preferred (minimal external dependencies)
- PostgreSQL as the only database
- JWT for auth (no OAuth/third-party auth)
- Must support multiple roles: office, apoteker, staff, admin

## Goals / Non-Goals

**Goals:**
- Establish database schema with proper indexes and constraints
- Create migration system that can be run incrementally
- Implement secure JWT authentication with token refresh flow
- Set up Go project structure following community conventions

**Non-Goals:**
- Attendance check-in/out functionality (next change)
- Admin dashboard features
- GPS validation logic
- Photo upload handling
- Rate limiting implementation (can be added later)

## Decisions

### 1. Migration Strategy: Plain SQL Files

**Decision**: Use numbered SQL files executed by a simple Go migration runner.

**Alternatives considered**:
- `golang-migrate` tool: Adds CLI dependency, team unfamiliar
- ORM-based migrations (GORM): Too heavy, we want explicit SQL control
- Embedded migrations in code: Harder to review and modify

**Rationale**: SQL files are readable, reviewable in git, and can be run manually for debugging. A simple Go runner in `internal/migration` gives us control without external tooling.

### 2. Password Hashing: bcrypt with Cost Factor 12

**Decision**: Use bcrypt with cost factor 12 for password hashing.

**Alternatives considered**:
- Argon2id: More modern but requires external library
- scrypt: Good but bcrypt is battle-tested for passwords
- Cost factor 10: Too fast on modern hardware

**Rationale**: bcrypt is the industry standard for passwords. Cost factor 12 balances security (~250ms on modern CPU) with user experience (login isn't noticeably slow).

### 3. JWT Implementation: golang-jwt/jwt/v5

**Decision**: Use `golang-jwt/jwt/v5` library for JWT handling.

**Alternatives considered**:
- Custom JWT implementation: Too risky, crypto is hard
- Other JWT libraries: Most are unmaintained or have security issues

**Rationale**: `golang-jwt/jwt/v5` is well-maintained, widely used, and the Go community standard. Minimal API, good docs, supports HS256.

### 4. Token Strategy: Short Access + Long Refresh

**Decision**: Access tokens expire in 24h, refresh tokens in 30 days.

**Alternatives considered**:
- Access 1h + refresh 7 days: More secure but more refresh calls
- Access 7 days + no refresh: Simpler but stolen token is dangerous
- Access 15min + refresh 1 day: High security, poor UX for mobile

**Rationale**: 24h access gives reasonable security window while reducing refresh API calls. 30d refresh allows users to stay logged in across sessions without re-entering password frequently. Refresh tokens are stored in database and can be revoked.

### 5. Project Structure: Standard Go Layout

**Decision**: Follow standard Go project layout:
```
apps/api/
├── cmd/
│   └── server/
│       └── main.go
├── internal/
│   ├── auth/       # JWT, password hashing
│   ├── handler/    # HTTP handlers
│   ├── middleware/ # Auth middleware
│   ├── model/      # Data structs
│   ├── repo/       # Database queries
│   ├── service/    # Business logic
│   └── migration/  # Migration runner
├── migrations/
│   ├── 001_init_schema.sql
│   └── 002_seed_branches.sql
└── go.mod
```

**Alternatives considered**:
- Flat structure: Doesn't scale, hard to navigate
- Domain-driven folders: Overkill for this size
- Hexagonal architecture: Too abstract for team familiarity

**Rationale**: Standard layout is familiar to Go developers, makes code discoverable, and scales reasonably for this project size.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| JWT secret leakage | Store in environment variable, never in code. Generate strong random secret for production. |
| Refresh token theft | Store hash of refresh token in DB (like password). Can detect replay attacks. |
| Migration failure mid-run | Each migration in transaction. Manual rollback SQL file for each migration. |
| bcrypt blocking request | Use async goroutine for hashing (already fast at 250ms). Consider caching if needed. |
| SQL injection | Use parameterized queries everywhere. No string concatenation for SQL. |