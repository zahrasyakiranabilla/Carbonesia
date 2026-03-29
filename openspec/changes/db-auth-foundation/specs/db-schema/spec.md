## ADDED Requirements

### Requirement: Database schema defines core tables
The system SHALL maintain a PostgreSQL database with tables: `users`, `branches`, `attendances`, `refresh_tokens`.

#### Scenario: Schema migration runs successfully
- **WHEN** migration runner executes initial schema migration
- **THEN** all four tables exist with correct columns, indexes, and constraints

#### Scenario: Users table has required fields
- **WHEN** users table is created
- **THEN** it contains: id (UUID PK), email (VARCHAR UNIQUE), password_hash (VARCHAR), name (VARCHAR), role (ENUM), active (BOOLEAN), must_change_password (BOOLEAN), reset_token (VARCHAR NULL), reset_token_expiry (TIMESTAMP NULL), created_at, updated_at

#### Scenario: Branches table has required fields
- **WHEN** branches table is created
- **THEN** it contains: id (UUID PK), name (VARCHAR), address (TEXT), latitude (DECIMAL), longitude (DECIMAL), radius_meters (INTEGER DEFAULT 50), active (BOOLEAN), branch_type (ENUM), created_at, updated_at

#### Scenario: Attendances table has required fields
- **WHEN** attendances table is created
- **THEN** it contains: id (UUID PK), user_id (UUID FK), date (DATE), branch_id (UUID FK NULL), check_in_time (TIMESTAMP NULL), check_out_time (TIMESTAMP NULL), check_in_photo_url (VARCHAR NULL), check_out_photo_url (VARCHAR NULL), check_in_lat/lng (DECIMAL NULL), check_out_lat/lng (DECIMAL NULL), status (ENUM), reason (TEXT NULL), overtime_reason/duration (NULL), work_duration_minutes (INTEGER NULL), created_at, updated_at

#### Scenario: Refresh tokens table has required fields
- **WHEN** refresh_tokens table is created
- **THEN** it contains: id (UUID PK), user_id (UUID FK), token (VARCHAR), expires_at (TIMESTAMP), revoked (BOOLEAN), created_at

#### Scenario: Indexes exist for performance
- **WHEN** schema migration completes
- **THEN** index on (user_id, date) exists in attendances table

### Requirement: Migrations are numbered and sequential
The system SHALL execute migrations in order by filename number prefix.

#### Scenario: Migrations run in correct order
- **WHEN** migration directory contains 001_init.sql, 002_seed.sql
- **THEN** 001 executes before 002

#### Scenario: Migration tracks completion
- **WHEN** a migration completes successfully
- **THEN** its name is recorded in migrations_log table

#### Scenario: Migration skips already-run files
- **WHEN** migration runner starts
- **THEN** migrations already in migrations_log are skipped