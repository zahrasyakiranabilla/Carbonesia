## ADDED Requirements

### Requirement: Absensi app requires authentication

The absensi app SHALL redirect unauthenticated users to login page before allowing access to any protected route.

#### Scenario: Unauthenticated user accesses protected route

- **WHEN** user tries to access any absensi route without valid session
- **THEN** system redirects to /login with redirect parameter

#### Scenario: Authenticated user accesses protected route

- **WHEN** user has valid access token or can refresh via cookie
- **THEN** system allows access and shows the requested page

### Requirement: User can login to absensi app

The system SHALL authenticate users via email and password, returning JWT tokens on success.

#### Scenario: Successful login

- **WHEN** user submits valid email and password
- **THEN** system returns access token (24h expiry), stores in memory, redirects to protected area

#### Scenario: Invalid credentials

- **WHEN** user submits wrong email or password
- **THEN** system returns error message "Kredensial tidak valid"

#### Scenario: Inactive user

- **WHEN** user with active=false attempts login
- **THEN** system returns 403 with "Account deactivated" message

### Requirement: Session persists across page refreshes

The system SHALL automatically restore session on page load using refresh token cookie.

#### Scenario: Page refresh with valid refresh token

- **WHEN** user refreshes page with valid httpOnly refresh token cookie
- **THEN** system automatically refreshes access token and restores session

#### Scenario: Page refresh without refresh token

- **WHEN** user refreshes page without valid refresh token
- **THEN** user stays on login page (no redirect loop)

### Requirement: Role-based access control

The system SHALL restrict access to absensi app based on user role.

#### Scenario: Admin accesses absensi

- **WHEN** user with admin role authenticates
- **THEN** system allows full access to absensi dashboard

#### Scenario: Employee attempts to access absensi

- **WHEN** user with employee role authenticates
- **THEN** system shows "Access Denied" page with logout option

#### Scenario: No role assignment

- **WHEN** user has no role assigned
- **THEN** system treats as non-admin, shows access denied

### Requirement: User can logout

The system SHALL clear session on logout, revocation of all refresh tokens.

#### Scenario: User clicks logout

- **WHEN** user clicks logout button
- **THEN** access token cleared from memory, refresh token revoked on server, redirect to login

### Requirement: Proactive token refresh on focus

The system SHALL refresh access token when app regains focus to prevent expired tokens during idle.

#### Scenario: App regains focus with authenticated user

- **WHEN** user switches back to absensi tab after idle
- **THEN** system proactively refreshes token if expiring within 2 minutes
