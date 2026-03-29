-- Refresh tokens table for JWT refresh flow
CREATE TABLE refresh_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    revoked BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Index for token lookups
CREATE INDEX idx_refresh_tokens_token_hash ON refresh_tokens(token_hash);
-- Index for user's tokens
CREATE INDEX idx_refresh_tokens_user ON refresh_tokens(user_id);