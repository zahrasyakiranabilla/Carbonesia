package auth

import (
	"context"
	"errors"
	"time"

	"github.com/apotek-asasi/absensi-api/internal/features/user"
)

var (
	ErrInvalidCredentials = errors.New("invalid credentials")
	ErrAccountDeactivated = errors.New("account deactivated")
	ErrTokenExpired       = errors.New("token expired")
	ErrTokenRevoked       = errors.New("token revoked")
)

// Service handles authentication business logic
type Service struct {
	userRepo     *user.Repository
	tokenRepo    *Repository
	jwtSecret    string
}

func NewService(userRepo *user.Repository, tokenRepo *Repository, jwtSecret string) *Service {
	return &Service{
		userRepo:  userRepo,
		tokenRepo: tokenRepo,
		jwtSecret: jwtSecret,
	}
}

// LoginResult represents the result of a successful login
type LoginResult struct {
	AccessToken  string    `json:"access_token"`
	RefreshToken string    `json:"refresh_token"`
	ExpiresAt    time.Time `json:"expires_at"`
	User         *user.User `json:"user"`
}

// Login authenticates a user and returns tokens
func (s *Service) Login(ctx context.Context, email, password string) (*LoginResult, error) {
	// Get user by email
	u, err := s.userRepo.GetByEmail(ctx, email)
	if err != nil {
		if errors.Is(err, user.ErrUserNotFound) {
			return nil, ErrInvalidCredentials
		}
		return nil, err
	}

	// Check if account is active
	if !u.Active {
		return nil, ErrAccountDeactivated
	}

	// Verify password
	if !VerifyPassword(password, u.PasswordHash) {
		return nil, ErrInvalidCredentials
	}

	// Generate tokens
	accessToken, err := GenerateAccessToken(u, s.jwtSecret)
	if err != nil {
		return nil, err
	}

	refreshToken, tokenHash, err := GenerateRefreshToken()
	if err != nil {
		return nil, err
	}

	// Store refresh token
	rt := &RefreshToken{
		UserID:    u.ID,
		TokenHash: tokenHash,
		ExpiresAt: time.Now().Add(RefreshTokenExpiry),
	}
	if err := s.tokenRepo.Create(ctx, rt); err != nil {
		return nil, err
	}

	return &LoginResult{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
		ExpiresAt:    time.Now().Add(AccessTokenExpiry),
		User:         u,
	}, nil
}

// RefreshResult represents the result of a token refresh
type RefreshResult struct {
	AccessToken  string    `json:"access_token"`
	RefreshToken string    `json:"refresh_token"`
	ExpiresAt    time.Time `json:"expires_at"`
}

// RefreshToken generates new tokens from a refresh token
func (s *Service) RefreshToken(ctx context.Context, refreshToken string) (*RefreshResult, error) {
	// Find the token
	rt, err := s.tokenRepo.FindTokenByValue(ctx, refreshToken)
	if err != nil {
		return nil, ErrTokenRevoked
	}

	// Check expiry
	if rt.ExpiresAt.Before(time.Now()) {
		return nil, ErrTokenExpired
	}

	// Get user
	u, err := s.userRepo.GetByID(ctx, rt.UserID)
	if err != nil {
		return nil, err
	}

	// Revoke old token
	if err := s.tokenRepo.Revoke(ctx, rt.ID); err != nil {
		return nil, err
	}

	// Generate new tokens
	accessToken, err := GenerateAccessToken(u, s.jwtSecret)
	if err != nil {
		return nil, err
	}

	newRefreshToken, tokenHash, err := GenerateRefreshToken()
	if err != nil {
		return nil, err
	}

	// Store new refresh token
	newRt := &RefreshToken{
		UserID:    u.ID,
		TokenHash: tokenHash,
		ExpiresAt: time.Now().Add(RefreshTokenExpiry),
	}
	if err := s.tokenRepo.Create(ctx, newRt); err != nil {
		return nil, err
	}

	return &RefreshResult{
		AccessToken:  accessToken,
		RefreshToken: newRefreshToken,
		ExpiresAt:    time.Now().Add(AccessTokenExpiry),
	}, nil
}

// Logout revokes all tokens for a user
func (s *Service) Logout(ctx context.Context, refreshToken string) error {
	rt, err := s.tokenRepo.FindTokenByValue(ctx, refreshToken)
	if err != nil {
		// Silently succeed even if token not found
		return nil
	}

	return s.tokenRepo.RevokeAllForUser(ctx, rt.UserID)
}

// ForgotPassword initiates password reset
func (s *Service) ForgotPassword(ctx context.Context, email string) (string, error) {
	u, err := s.userRepo.GetByEmail(ctx, email)
	if err != nil {
		// Don't reveal if user exists or not
		return "", nil
	}

	// Generate reset token
	resetToken, tokenHash, err := GenerateRefreshToken()
	if err != nil {
		return "", err
	}

	// Store token hash with expiry (1 hour)
	expiry := time.Now().Add(1 * time.Hour)
	if err := s.userRepo.SetResetToken(ctx, u.ID, tokenHash, expiry); err != nil {
		return "", err
	}

	// Return token to be sent via email
	return resetToken, nil
}

// ResetPassword resets password using token
func (s *Service) ResetPassword(ctx context.Context, resetToken, newPassword string) error {
	// Find user by reset token (need to search through tokens)
	// This is inefficient but secure
	users, err := s.userRepo.ListWithResetTokens(ctx)
	if err != nil {
		return errors.New("invalid or expired token")
	}

	var matchedUser *user.User
	for _, u := range users {
		if u.ResetToken != nil && VerifyPassword(resetToken, *u.ResetToken) {
			if u.ResetTokenExpiry != nil && u.ResetTokenExpiry.After(time.Now()) {
				matchedUser = u
				break
			}
		}
	}

	if matchedUser == nil {
		return errors.New("invalid or expired token")
	}

	// Hash new password
	passwordHash, err := HashPassword(newPassword)
	if err != nil {
		return err
	}

	// Update password
	if err := s.userRepo.UpdatePassword(ctx, matchedUser.ID, passwordHash); err != nil {
		return err
	}

	// Clear reset token
	return s.userRepo.ClearResetToken(ctx, matchedUser.ID)
}