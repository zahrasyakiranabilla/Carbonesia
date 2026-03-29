-- Create branch type enum
CREATE TYPE branch_type AS ENUM ('apotek', 'office');

-- Branches table
CREATE TABLE branches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    latitude DECIMAL(10,8) NULL,
    longitude DECIMAL(11,8) NULL,
    radius_meters INTEGER DEFAULT 50,
    active BOOLEAN DEFAULT true,
    branch_type branch_type DEFAULT 'apotek',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Index for active branches
CREATE INDEX idx_branches_active ON branches(active);