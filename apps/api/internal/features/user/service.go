package user

import (
	"context"
	"crypto/rand"
	"encoding/hex"
	"errors"
	"fmt"

	"github.com/apotek-asasi/absensi-api/internal/entities"
	"golang.org/x/crypto/bcrypt"
)

var (
	ErrEmailExists      = errors.New("email already exists")
	ErrCannotModifySelf = errors.New("cannot modify your own account")
	ErrSameEmail        = errors.New("email already in use by another user")
)

const bcryptCost = 12

// hashPassword generates a bcrypt hash of the password
func hashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcryptCost)
	if err != nil {
		return "", err
	}
	return string(bytes), nil
}

// VerifyPassword checks if password matches the hash
func VerifyPassword(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

// Service handles user business logic
type Service struct {
	repo *Repository
}

func NewService(repo *Repository) *Service {
	return &Service{repo: repo}
}

// ListUsersParams represents parameters for listing users
type ListUsersParams struct {
	Page   int
	Limit  int
	Role   string
	Search string
	Active *bool
}

// ListUsersResult represents paginated user list result
type ListUsersResult struct {
	Users      []*User `json:"users"`
	Total      int     `json:"total"`
	Page       int     `json:"page"`
	Limit      int     `json:"limit"`
	TotalPages int     `json:"total_pages"`
}

// ListUsersResultResponse wraps ListUsersResult with data/meta structure
type ListUsersResultResponse struct {
	Data interface{}              `json:"data"`
	Meta *entities.PaginationMeta `json:"meta"`
}

// ListUsers retrieves users with pagination and filters
func (s *Service) ListUsers(ctx context.Context, params ListUsersParams) (*ListUsersResultResponse, error) {
	filter := &UserFilter{
		Role:   params.Role,
		Active: params.Active,
		Search: params.Search,
	}

	result, err := s.repo.List(ctx, params.Page, params.Limit, filter)
	if err != nil {
		return nil, fmt.Errorf("failed to list users: %w", err)
	}

	return &ListUsersResultResponse{
		Data: result.Users,
		Meta: &entities.PaginationMeta{
			Page:       result.Page,
			Limit:      result.Limit,
			Total:      result.Total,
			TotalPages: result.TotalPages,
		},
	}, nil
}

// CreateUserRequest represents request to create a new user
type CreateUserRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
	Name     string `json:"name"`
	Role     Role   `json:"role"`
	Active   *bool  `json:"active,omitempty"`
}

// CreateUser creates a new user with unique email validation
func (s *Service) CreateUser(ctx context.Context, req CreateUserRequest) (*User, error) {
	// Check if email already exists
	existing, err := s.repo.GetByEmail(ctx, req.Email)
	if err != nil && !errors.Is(err, ErrUserNotFound) {
		return nil, fmt.Errorf("failed to check email: %w", err)
	}
	if existing != nil {
		return nil, ErrEmailExists
	}

	// Hash password
	passwordHash, err := hashPassword(req.Password)
	if err != nil {
		return nil, fmt.Errorf("failed to hash password: %w", err)
	}

	// Set default active status
	active := true
	if req.Active != nil {
		active = *req.Active
	}

	// Create user
	u := &User{
		Email:              req.Email,
		PasswordHash:       passwordHash,
		Name:               req.Name,
		Role:               req.Role,
		Active:             active,
		MustChangePassword: true,
	}

	if err := s.repo.Create(ctx, u); err != nil {
		return nil, fmt.Errorf("failed to create user: %w", err)
	}

	return u, nil
}

// UpdateUserRequest represents request to update a user
type UpdateUserRequest struct {
	Email string `json:"email"`
	Name  string `json:"name"`
}

// UpdateUser updates an existing user
func (s *Service) UpdateUser(ctx context.Context, userID string, req UpdateUserRequest) (*User, error) {
	// Get existing user
	existing, err := s.repo.GetByID(ctx, userID)
	if err != nil {
		if errors.Is(err, ErrUserNotFound) {
			return nil, ErrUserNotFound
		}
		return nil, fmt.Errorf("failed to get user: %w", err)
	}

	// Check if new email is used by another user
	if req.Email != existing.Email {
		other, err := s.repo.GetByEmail(ctx, req.Email)
		if err != nil && !errors.Is(err, ErrUserNotFound) {
			return nil, fmt.Errorf("failed to check email: %w", err)
		}
		if other != nil {
			return nil, ErrSameEmail
		}
	}

	// Update fields (role cannot be changed)
	existing.Email = req.Email
	existing.Name = req.Name

	if err := s.repo.Update(ctx, existing); err != nil {
		return nil, fmt.Errorf("failed to update user: %w", err)
	}

	return existing, nil
}

// ActivateUser activates a user (admin cannot activate themselves)
func (s *Service) ActivateUser(ctx context.Context, userID, currentUserID string) (*User, error) {
	// Prevent self-activation
	if userID == currentUserID {
		return nil, ErrCannotModifySelf
	}

	// Check if user exists
	existing, err := s.repo.GetByID(ctx, userID)
	if err != nil {
		if errors.Is(err, ErrUserNotFound) {
			return nil, ErrUserNotFound
		}
		return nil, fmt.Errorf("failed to get user: %w", err)
	}

	// Already active
	if existing.Active {
		return existing, nil
	}

	// Activate
	if err := s.repo.SetActive(ctx, userID, true); err != nil {
		return nil, fmt.Errorf("failed to activate user: %w", err)
	}

	existing.Active = true
	return existing, nil
}

// DeactivateUser deactivates a user (admin cannot deactivate themselves)
func (s *Service) DeactivateUser(ctx context.Context, userID, currentUserID string) (*User, error) {
	// Prevent self-deactivation
	if userID == currentUserID {
		return nil, ErrCannotModifySelf
	}

	// Check if user exists
	existing, err := s.repo.GetByID(ctx, userID)
	if err != nil {
		if errors.Is(err, ErrUserNotFound) {
			return nil, ErrUserNotFound
		}
		return nil, fmt.Errorf("failed to get user: %w", err)
	}

	// Already inactive
	if !existing.Active {
		return existing, nil
	}

	// Deactivate
	if err := s.repo.SetActive(ctx, userID, false); err != nil {
		return nil, fmt.Errorf("failed to deactivate user: %w", err)
	}

	existing.Active = false
	return existing, nil
}

// GetUser retrieves a single user by ID
func (s *Service) GetUser(ctx context.Context, userID string) (*User, error) {
	user, err := s.repo.GetByID(ctx, userID)
	if err != nil {
		if errors.Is(err, ErrUserNotFound) {
			return nil, ErrUserNotFound
		}
		return nil, fmt.Errorf("failed to get user: %w", err)
	}
	return user, nil
}

// ResetPassword generates a new random password for a user
func (s *Service) ResetPassword(ctx context.Context, userID string) (string, error) {
	// Check if user exists
	_, err := s.repo.GetByID(ctx, userID)
	if err != nil {
		if errors.Is(err, ErrUserNotFound) {
			return "", ErrUserNotFound
		}
		return "", fmt.Errorf("failed to get user: %w", err)
	}

	// Generate random password (16 characters)
	bytes := make([]byte, 16)
	if _, err := rand.Read(bytes); err != nil {
		return "", fmt.Errorf("failed to generate random bytes: %w", err)
	}
	newPassword := hex.EncodeToString(bytes)[:16]

	// Hash password
	passwordHash, err := hashPassword(newPassword)
	if err != nil {
		return "", fmt.Errorf("failed to hash password: %w", err)
	}

	// Update password
	if err := s.repo.UpdatePassword(ctx, userID, passwordHash); err != nil {
		return "", fmt.Errorf("failed to update password: %w", err)
	}

	return newPassword, nil
}
