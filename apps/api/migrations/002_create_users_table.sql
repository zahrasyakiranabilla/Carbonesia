-- Create custom enum types
CREATE TYPE user_role AS ENUM ('office', 'apoteker', 'staff', 'admin');

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role user_role NOT NULL,
    active BOOLEAN DEFAULT true,
    must_change_password BOOLEAN DEFAULT false,
    reset_token VARCHAR(255) NULL,
    reset_token_expiry TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Index for email lookups
CREATE INDEX idx_users_email ON users(email);