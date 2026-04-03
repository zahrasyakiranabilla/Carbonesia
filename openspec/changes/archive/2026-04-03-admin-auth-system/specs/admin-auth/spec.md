## ADDED Requirements

### Requirement: Login Page Display
The system SHALL display a login page at the `/login` route with email and password input fields.

#### Scenario: User accesses login route
- **WHEN** user navigates to `/login`
- **THEN** system displays login page with email input, password input, and submit button

#### Scenario: Login page shows loading state
- **WHEN** user submits login form
- **THEN** system displays loading indicator on submit button
- **AND** disables form inputs during submission

### Requirement: Authentication Form Submission
The system SHALL authenticate users via email/password submission and store session on success.

#### Scenario: Successful login
- **WHEN** user submits valid email and password
- **THEN** system calls authentication API
- **AND** stores auth token in localStorage
- **AND** redirects user to dashboard root (`/`)

#### Scenario: Failed login with invalid credentials
- **WHEN** user submits invalid email or password
- **THEN** system displays error message "Invalid credentials"
- **AND** clears password field
- **AND** allows user to retry

#### Scenario: Failed login with network error
- **WHEN** authentication API request fails due to network issue
- **THEN** system displays error message "Unable to connect. Please try again."
- **AND** allows user to retry

### Requirement: Protected Route Access Control
The system SHALL restrict access to protected routes for unauthenticated users.

#### Scenario: Unauthenticated user accesses protected route
- **WHEN** unauthenticated user navigates to any route except `/login`
- **THEN** system redirects user to `/login`
- **AND** preserves intended destination in redirect state

#### Scenario: Authenticated user accesses protected route
- **WHEN** authenticated user navigates to any protected route
- **THEN** system allows access to the route
- **AND** displays route content normally

### Requirement: Session Persistence
The system SHALL persist authentication state across browser sessions.

#### Scenario: User refreshes page while authenticated
- **WHEN** authenticated user refreshes the browser
- **THEN** system restores authentication state from localStorage
- **AND** user remains logged in

#### Scenario: User closes and reopens browser while authenticated
- **WHEN** authenticated user closes browser and reopens it
- **THEN** system restores authentication state from localStorage
- **AND** user remains logged in (within token expiry period)

### Requirement: Logout Functionality
The system SHALL allow authenticated users to log out and clear session.

#### Scenario: User initiates logout
- **WHEN** authenticated user clicks logout button
- **THEN** system calls logout API endpoint
- **AND** clears auth token from localStorage
- **AND** redirects user to `/login`

#### Scenario: Logout with API failure
- **WHEN** logout API call fails
- **THEN** system still clears local auth token
- **AND** redirects user to `/login`
- **AND** session is effectively terminated locally

### Requirement: Authentication State Availability
The system SHALL provide authentication state to all components via React context.

#### Scenario: Component accesses auth state
- **WHEN** any component calls `useAuth()` hook
- **THEN** system returns current authentication state
- **AND** returns user object if authenticated
- **AND** returns `null` user if unauthenticated

#### Scenario: Auth state reflects localStorage
- **WHEN** localStorage contains valid auth token
- **THEN** `useAuth()` returns authenticated state
- **AND** returns associated user data
