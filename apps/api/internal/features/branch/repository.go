package branch

import (
	"context"
	"database/sql"
	"fmt"
)

// Repository handles branch database operations
type Repository struct {
	db *sql.DB
}

func NewRepository(db *sql.DB) *Repository {
	return &Repository{db: db}
}

func (r *Repository) GetAll(ctx context.Context) ([]Branch, error) {
	query := `
		SELECT id, name, address, latitude, longitude, radius_meters, active, branch_type, created_at, updated_at
		FROM branches ORDER BY name
	`

	rows, err := r.db.QueryContext(ctx, query)
	if err != nil {
		return nil, fmt.Errorf("failed to get branches: %w", err)
	}
	defer rows.Close()

	var branches []Branch
	for rows.Next() {
		var b Branch
		err := rows.Scan(
			&b.ID,
			&b.Name,
			&b.Address,
			&b.Latitude,
			&b.Longitude,
			&b.RadiusMeters,
			&b.Active,
			&b.BranchType,
			&b.CreatedAt,
			&b.UpdatedAt,
		)
		if err != nil {
			return nil, fmt.Errorf("failed to scan branch: %w", err)
		}
		branches = append(branches, b)
	}

	return branches, rows.Err()
}

func (r *Repository) GetByID(ctx context.Context, id string) (*Branch, error) {
	query := `
		SELECT id, name, address, latitude, longitude, radius_meters, active, branch_type, created_at, updated_at
		FROM branches WHERE id = $1
	`

	var b Branch
	err := r.db.QueryRowContext(ctx, query, id).Scan(
		&b.ID,
		&b.Name,
		&b.Address,
		&b.Latitude,
		&b.Longitude,
		&b.RadiusMeters,
		&b.Active,
		&b.BranchType,
		&b.CreatedAt,
		&b.UpdatedAt,
	)

	if err == sql.ErrNoRows {
		return nil, ErrBranchNotFound
	}
	if err != nil {
		return nil, fmt.Errorf("failed to get branch: %w", err)
	}

	return &b, nil
}

func (r *Repository) GetActive(ctx context.Context) ([]Branch, error) {
	query := `
		SELECT id, name, address, latitude, longitude, radius_meters, active, branch_type, created_at, updated_at
		FROM branches WHERE active = true ORDER BY name
	`

	rows, err := r.db.QueryContext(ctx, query)
	if err != nil {
		return nil, fmt.Errorf("failed to get active branches: %w", err)
	}
	defer rows.Close()

	var branches []Branch
	for rows.Next() {
		var b Branch
		err := rows.Scan(
			&b.ID,
			&b.Name,
			&b.Address,
			&b.Latitude,
			&b.Longitude,
			&b.RadiusMeters,
			&b.Active,
			&b.BranchType,
			&b.CreatedAt,
			&b.UpdatedAt,
		)
		if err != nil {
			return nil, fmt.Errorf("failed to scan branch: %w", err)
		}
		branches = append(branches, b)
	}

	return branches, rows.Err()
}