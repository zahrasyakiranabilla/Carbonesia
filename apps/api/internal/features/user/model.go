package user

import (
	"errors"
	"time"
)

// UserRole represents user roles
type Role string

const (
	RoleEmployee Role = "employee"
	RoleAdmin    Role = "admin"
)

// User represents a user entity
type User struct {
	ID                 string     `json:"id"`
	Email              string     `json:"email"`
	PasswordHash       string     `json:"-"` // Never expose in JSON
	Name               string     `json:"name"`
	Role               Role       `json:"role"`
	Active             bool       `json:"active"`
	MustChangePassword bool       `json:"must_change_password"`
	ResetToken         *string    `json:"-"`
	ResetTokenExpiry   *time.Time `json:"-"`
	CreatedAt          time.Time  `json:"created_at"`
	UpdatedAt          time.Time  `json:"updated_at"`
}

// Errors
var (
	ErrUserNotFound = errors.New("user not found")
)
