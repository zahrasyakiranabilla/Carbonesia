-- Create attendance status enum
CREATE TYPE attendance_status AS ENUM ('hadir', 'sakit', 'izin_keluarga', 'alpha', 'lembur', 'izin_pulang_cepat');

-- Attendances table
CREATE TABLE attendances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    branch_id UUID NULL REFERENCES branches(id) ON DELETE SET NULL,
    check_in_time TIMESTAMP NULL,
    check_out_time TIMESTAMP NULL,
    check_in_photo_url VARCHAR(500) NULL,
    check_out_photo_url VARCHAR(500) NULL,
    check_in_lat DECIMAL(10,8) NULL,
    check_in_lng DECIMAL(11,8) NULL,
    check_out_lat DECIMAL(10,8) NULL,
    check_out_lng DECIMAL(11,8) NULL,
    status attendance_status NOT NULL,
    reason TEXT NULL,
    overtime_reason TEXT NULL,
    overtime_duration INTEGER NULL,
    work_duration_minutes INTEGER NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Index for user-date queries (most common lookup)
CREATE INDEX idx_attendances_user_date ON attendances(user_id, date);
-- Index for date-based queries
CREATE INDEX idx_attendances_date ON attendances(date);