package user

import (
	"context"
	"database/sql"
	"fmt"
	"time"
)

// UserFilter represents filter options for listing users
type UserFilter struct {
	Role   string // "employee", "admin"
	Active *bool  // nil = all, true = active only, false = inactive only
	Search string // search by name or email
}

// PaginatedUsers represents a paginated list of users
type PaginatedUsers struct {
	Users      []*User `json:"users"`
	Total      int     `json:"total"`
	Page       int     `json:"page"`
	Limit      int     `json:"limit"`
	TotalPages int     `json:"total_pages"`
}

// Repository handles user database operations
type Repository struct {
	db *sql.DB
}

func NewRepository(db *sql.DB) *Repository {
	return &Repository{db: db}
}

// List retrieves users with pagination and optional filters
func (r *Repository) List(ctx context.Context, page, limit int, filter *UserFilter) (*PaginatedUsers, error) {
	if page < 1 {
		page = 1
	}
	if limit < 1 {
		limit = 20
	}

	// Build WHERE clause
	whereClause := "WHERE 1=1"
	args := []interface{}{}
	argIndex := 1

	if filter != nil {
		if filter.Role != "" {
			whereClause += fmt.Sprintf(" AND role = $%d", argIndex)
			args = append(args, filter.Role)
			argIndex++
		}
		if filter.Active != nil {
			whereClause += fmt.Sprintf(" AND active = $%d", argIndex)
			args = append(args, *filter.Active)
			argIndex++
		}
		if filter.Search != "" {
			whereClause += fmt.Sprintf(" AND (name ILIKE $%d OR email ILIKE $%d)", argIndex, argIndex)
			args = append(args, "%"+filter.Search+"%")
			argIndex++
		}
	}

	// Count total
	countQuery := "SELECT COUNT(*) FROM users " + whereClause
	var total int
	err := r.db.QueryRowContext(ctx, countQuery, args...).Scan(&total)
	if err != nil {
		return nil, fmt.Errorf("failed to count users: %w", err)
	}

	// Get users with pagination
	offset := (page - 1) * limit
	query := fmt.Sprintf(`
		SELECT id, email, password_hash, name, role, active, must_change_password,
		       reset_token, reset_token_expiry, created_at, updated_at
		FROM users
		%s
		ORDER BY created_at DESC
		LIMIT $%d OFFSET $%d
	`, whereClause, argIndex, argIndex+1)

	args = append(args, limit, offset)

	rows, err := r.db.QueryContext(ctx, query, args...)
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

	totalPages := (total + limit - 1) / limit
	if totalPages < 1 {
		totalPages = 1
	}

	return &PaginatedUsers{
		Users:      users,
		Total:      total,
		Page:       page,
		Limit:      limit,
		TotalPages: totalPages,
	}, rows.Err()
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

// Update updates an existing user
func (r *Repository) Update(ctx context.Context, u *User) error {
	query := `
		UPDATE users
		SET email = $1, name = $2, role = $3, active = $4, updated_at = NOW()
		WHERE id = $5
		RETURNING updated_at
	`

	err := r.db.QueryRowContext(ctx, query,
		u.Email,
		u.Name,
		u.Role,
		u.Active,
		u.ID,
	).Scan(&u.UpdatedAt)

	if err == sql.ErrNoRows {
		return ErrUserNotFound
	}
	if err != nil {
		return fmt.Errorf("failed to update user: %w", err)
	}

	return nil
}

// SetActive activates or deactivates a user
func (r *Repository) SetActive(ctx context.Context, userID string, active bool) error {
	query := `
		UPDATE users
		SET active = $1, updated_at = NOW()
		WHERE id = $2
	`

	result, err := r.db.ExecContext(ctx, query, active, userID)
	if err != nil {
		return fmt.Errorf("failed to set active status: %w", err)
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf("failed to get rows affected: %w", err)
	}
	if rowsAffected == 0 {
		return ErrUserNotFound
	}

	return nil
}

// GetAll retrieves all users without filters
func (r *Repository) GetAll(ctx context.Context) ([]*User, error) {
	query := `
		SELECT id, email, password_hash, name, role, active, must_change_password,
		       reset_token, reset_token_expiry, created_at, updated_at
		FROM users
		ORDER BY created_at DESC
	`

	rows, err := r.db.QueryContext(ctx, query)
	if err != nil {
		return nil, fmt.Errorf("failed to get all users: %w", err)
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
