-- Migration 007: Add 'employee' role to enum
-- This must be a separate migration from the data update due to PostgreSQL
-- restriction: cannot use new enum value in same transaction that adds it

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'employee' AND enumtypid = 'user_role'::regtype) THEN
    ALTER TYPE user_role ADD VALUE 'employee';
  END IF;
END $$;
