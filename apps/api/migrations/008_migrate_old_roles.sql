-- Migration 008: Migrate existing users with old roles to 'employee'
-- This runs in a separate transaction after 007 adds the 'employee' enum value

UPDATE users SET role = 'employee' WHERE role IN ('office', 'apoteker', 'staff');

-- Note: The old enum values ('office', 'apoteker', 'staff') are kept for backward compatibility
-- with existing data. New users should only use 'admin' or 'employee'.
