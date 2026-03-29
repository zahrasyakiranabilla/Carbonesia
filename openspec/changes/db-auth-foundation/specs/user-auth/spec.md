## ADDED Requirements

### Requirement: User can login with email and password
The system SHALL authenticate users via email and password, returning JWT tokens on success.

#### Scenario: Successful login
- **WHEN** user submits valid email and password
- **THEN** system returns access token (24h expiry) and refresh token (30d expiry)

#### Scenario: Invalid password
- **WHEN** user submits valid email but wrong password
- **THEN** system returns 401 Unauthorized with "Invalid credentials" message

#### Scenario: User not found
- **WHEN** user submits email not in database
- **THEN** system returns 401 Unauthorized with "Invalid credentials" message (same as wrong password to prevent enumeration)

#### Scenario: Inactive user
- **WHEN** user with active=false attempts login
- **THEN** system returns 403 Forbidden with "Account deactivated" message

### Requirement: Access token can be refreshed
The system SHALL allow clients to refresh expired access tokens using valid refresh tokens.

#### Scenario: Successful token refresh
- **WHEN** client submits valid refresh token
- **THEN** system returns new access token (24h expiry)

#### Scenario: Expired refresh token
- **WHEN** client submits refresh token past expires_at
- **THEN** system returns 401 Unauthorized with "Token expired" message

#### Scenario: Revoked refresh token
- **WHEN** client submits refresh token with revoked=true
- **THEN** system returns 401 Unauthorized with "Token revoked" message

#### Scenario: Refresh generates new refresh token
- **WHEN** client successfully refreshes
- **THEN** old refresh token is revoked and new refresh token is issued

### Requirement: User can logout
The system SHALL revoke refresh tokens on logout.

#### Scenario: Successful logout
- **WHEN** user calls logout with valid refresh token
- **THEN** that refresh token is marked revoked=true

#### Scenario: Logout invalidates all sessions
- **WHEN** user calls logout
- **THEN** all refresh tokens for that user are revoked

### Requirement: Password reset flow
The system SHALL allow password reset via email token.

#### Scenario: Request password reset
- **WHEN** user submits email for password reset
- **THEN** system generates reset token (1h expiry) and stores hashed token in database

#### Scenario: Reset password with valid token
- **WHEN** user submits valid reset token and new password
- **THEN** password is updated, reset_token cleared, must_change_password set to false

#### Scenario: Reset with expired token
- **WHEN** user submits reset token past expiry
- **THEN** system returns 401 Unauthorized with "Token expired" message

#### Scenario: Reset with invalid token
- **WHEN** user submits token not matching database
- **THEN** system returns 401 Unauthorized with "Invalid token" message

### Requirement: Passwords are hashed with bcrypt
The system SHALL hash all passwords using bcrypt with cost factor 12.

#### Scenario: Password hashed on creation
- **WHEN** new user password is stored
- **THEN** password is hashed with bcrypt cost 12, plaintext never stored

#### Scenario: Password verified correctly
- **WHEN** user login password is compared
- **THEN** bcrypt comparison succeeds for correct password, fails for incorrect

### Requirement: JWT tokens use HS256 algorithm
The system SHALL sign JWT tokens using HS256 with secret from environment.

#### Scenario: Token contains user claims
- **WHEN** access token is generated
- **THEN** it contains: user_id, email, role, exp (24h from now)

#### Scenario: Token validates with correct secret
- **WHEN** token validation is performed
- **THEN** signature is verified, claims extracted, expiry checked

#### Scenario: Token rejected if expired
- **WHEN** token validation finds exp claim past current time
- **THEN** validation returns error "Token expired"

### Requirement: Auth middleware validates tokens
The system SHALL provide middleware that validates JWT tokens before allowing access to protected endpoints.

#### Scenario: Valid token allows access
- **WHEN** request has valid Authorization: Bearer header
- **THEN** middleware extracts user claims and passes to handler

#### Scenario: Missing token denied
- **WHEN** request has no Authorization header
- **THEN** middleware returns 401 Unauthorized

#### Scenario: Invalid token denied
- **WHEN** request has malformed or invalid token
- **THEN** middleware returns 401 Unauthorized with "Invalid token" message

### Requirement: Role-based authorization
The system SHALL enforce role requirements on endpoints.

#### Scenario: Admin endpoint requires admin role
- **WHEN** non-admin user accesses /api/admin/* endpoint
- **THEN** system returns 403 Forbidden

#### Scenario: Employee can access own resources
- **WHEN** employee accesses /api/attendances/me
- **THEN** system allows access and filters to their own data