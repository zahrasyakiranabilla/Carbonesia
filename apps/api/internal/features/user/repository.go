package user

import (
	"context"
	"database/sql"
	"fmt"
	"time"
)

// Repository handles user database operations
type Repository struct {
	db *sql.DB
}

func NewRepository(db *sql.DB) *Repository {
	return &Repository{db: db}
}

func (r *Repository) Create(ctx context.Context, u *User) error {
	query := `
		INSERT INTO users (email, password_hash, name, role, active, must_change_password)
		VALUES ($1, $2, $3, $4, $5, $6)
		RETURNING id, created_at, updated_at
	`

	err := r.db.QueryRowContext(ctx, query,
		u.Email,
		u.PasswordHash,
		u.Name,
		u.Role,
		u.Active,
		u.MustChangePassword,
	).Scan(&u.ID, &u.CreatedAt, &u.UpdatedAt)

	if err != nil {
		return fmt.Errorf("failed to create user: %w", err)
	}

	return nil
}

func (r *Repository) GetByEmail(ctx context.Context, email string) (*User, error) {
	query := `
		SELECT id, email, password_hash, name, role, active, must_change_password,
		       reset_token, reset_token_expiry, created_at, updated_at
		FROM users WHERE email = $1
	`

	u := &User{}
	err := r.db.QueryRowContext(ctx, query, email).Scan(
		&u.ID,
		&u.Email,
		&u.PasswordHash,
		&u.Name,
		&u.Role,
		&u.Active,
		&u.MustChangePassword,
		&u.ResetToken,
		&u.ResetTokenExpiry,
		&u.CreatedAt,
		&u.UpdatedAt,
	)

	if err == sql.ErrNoRows {
		return nil, ErrUserNotFound
	}
	if err != nil {
		return nil, fmt.Errorf("failed to get user: %w", err)
	}

	return u, nil
}

func (r *Repository) GetByID(ctx context.Context, id string) (*User, error) {
	query := `
		SELECT id, email, password_hash, name, role, active, must_change_password,
		       reset_token, reset_token_expiry, created_at, updated_at
		FROM users WHERE id = $1
	`

	u := &User{}
	err := r.db.QueryRowContext(ctx, query, id).Scan(
		&u.ID,
		&u.Email,
		&u.PasswordHash,
		&u.Name,
		&u.Role,
		&u.Active,
		&u.MustChangePassword,
		&u.ResetToken,
		&u.ResetTokenExpiry,
		&u.CreatedAt,
		&u.UpdatedAt,
	)

	if err == sql.ErrNoRows {
		return nil, ErrUserNotFound
	}
	if err != nil {
		return nil, fmt.Errorf("failed to get user: %w", err)
	}

	return u, nil
}

func (r *Repository) UpdatePassword(ctx context.Context, userID, passwordHash string) error {
	query := `
		UPDATE users
		SET password_hash = $1, must_change_password = false, updated_at = NOW()
		WHERE id = $2
	`

	_, err := r.db.ExecContext(ctx, query, passwordHash, userID)
	if err != nil {
		return fmt.Errorf("failed to update password: %w", err)
	}

	return nil
}

func (r *Repository) SetResetToken(ctx context.Context, userID, tokenHash string, expiry time.Time) error {
	query := `
		UPDATE users
		SET reset_token = $1, reset_token_expiry = $2, updated_at = NOW()
		WHERE id = $3
	`

	_, err := r.db.ExecContext(ctx, query, tokenHash, expiry, userID)
	if err != nil {
		return fmt.Errorf("failed to set reset token: %w", err)
	}

	return nil
}

func (r *Repository) ClearResetToken(ctx context.Context, userID string) error {
	query := `
		UPDATE users
		SET reset_token = NULL, reset_token_expiry = NULL, updated_at = NOW()
		WHERE id = $1
	`

	_, err := r.db.ExecContext(ctx, query, userID)
	if err != nil {
		return fmt.Errorf("failed to clear reset token: %w", err)
	}

	return nil
}

func (r *Repository) GetByResetToken(ctx context.Context, tokenHash string) (*User, error) {
	query := `
		SELECT id, email, password_hash, name, role, active, must_change_password,
		       reset_token, reset_token_expiry, created_at, updated_at
		FROM users WHERE reset_token = $1 AND reset_token_expiry > NOW()
	`

	u := &User{}
	err := r.db.QueryRowContext(ctx, query, tokenHash).Scan(
		&u.ID,
		&u.Email,
		&u.PasswordHash,
		&u.Name,
		&u.Role,
		&u.Active,
		&u.MustChangePassword,
		&u.ResetToken,
		&u.ResetTokenExpiry,
		&u.CreatedAt,
		&u.UpdatedAt,
	)

	if err == sql.ErrNoRows {
		return nil, ErrUserNotFound
	}
	if err != nil {
		return nil, fmt.Errorf("failed to get user by reset token: %w", err)
	}

	return u, nil
}

// ListWithResetTokens gets all users with active reset tokens (for password reset flow)
func (r *Repository) ListWithResetTokens(ctx context.Context) ([]*User, error) {
	query := `
		SELECT id, email, password_hash, name, role, active, must_change_password,
		       reset_token, reset_token_expiry, created_at, updated_at
		FROM users WHERE reset_token IS NOT NULL
	`

	rows, err := r.db.QueryContext(ctx, query)
	if err != nil {
		return nil, fmt.Errorf("failed to list users: %w", err)
	}
	defer rows.Close()

	var users []*User
	for rows.Next() {
		u := &User{}
		err := rows.Scan(
			&u.ID,
			&u.Email,
			&u.PasswordHash,
			&u.Name,
			&u.Role,
			&u.Active,
			&u.MustChangePassword,
			&u.ResetToken,
			&u.ResetTokenExpiry,
			&u.CreatedAt,
			&u.UpdatedAt,
		)
		if err != nil {
			return nil, fmt.Errorf("failed to scan user: %w", err)
		}
		users = append(users, u)
	}

	return users, rows.Err()
}