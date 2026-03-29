package branch

import (
	"errors"
	"time"
)

// BranchType represents branch types
type Type string

const (
	TypeApotek Type = "apotek"
	TypeOffice Type = "office"
)

// Branch represents a branch entity
type Branch struct {
	ID           string    `json:"id"`
	Name         string    `json:"name"`
	Address      string    `json:"address"`
	Latitude     *float64  `json:"latitude"`
	Longitude    *float64  `json:"longitude"`
	RadiusMeters int       `json:"radius_meters"`
	Active       bool      `json:"active"`
	BranchType   Type      `json:"branch_type"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}

// Errors
var (
	ErrBranchNotFound = errors.New("branch not found")
)