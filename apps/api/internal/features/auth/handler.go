package auth

import (
	"encoding/json"
	"errors"
	"net/http"
	"strings"

	"github.com/apotek-asasi/absensi-api/internal/entities"
	"github.com/apotek-asasi/absensi-api/internal/features/user"
)

// Handler handles HTTP requests for authentication
type Handler struct {
	service    *Service
	userRepo   *user.Repository
	jwtSecret  string
}

func NewHandler(service *Service, userRepo *user.Repository, jwtSecret string) *Handler {
	return &Handler{
		service:   service,
		userRepo:  userRepo,
		jwtSecret: jwtSecret,
	}
}

// Login handles POST /api/auth/login
func (h *Handler) Login(w http.ResponseWriter, r *http.Request) {
	var req struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		entities.WriteError(w, http.StatusBadRequest, "Invalid request body")
		return
	}

	if req.Email == "" || req.Password == "" {
		entities.WriteError(w, http.StatusBadRequest, "Email and password are required")
		return
	}

	result, err := h.service.Login(r.Context(), req.Email, req.Password)
	if err != nil {
		handleError(w, err)
		return
	}

	// Set refresh token as httpOnly cookie
	// With proxy, requests are same-origin so Lax works
	http.SetCookie(w, &http.Cookie{
		Name:     "refresh_token",
		Value:    result.RefreshToken,
		Path:     "/api",
		HttpOnly: true,
		Secure:   false,
		SameSite: http.SameSiteLaxMode,
		MaxAge:   int(RefreshTokenExpiry.Seconds()),
	})

	// Return only access token and user info (refresh token in cookie)
	response := map[string]interface{}{
		"access_token": result.AccessToken,
		"expires_at":   result.ExpiresAt,
		"user":         result.User,
	}
	entities.WriteJSON(w, http.StatusOK, response)
}

// Refresh handles POST /api/auth/refresh
func (h *Handler) Refresh(w http.ResponseWriter, r *http.Request) {
	// Get refresh token from httpOnly cookie
	cookie, err := r.Cookie("refresh_token")
	if err != nil {
		entities.WriteError(w, http.StatusBadRequest, "Refresh token required")
		return
	}

	if cookie.Value == "" {
		entities.WriteError(w, http.StatusBadRequest, "Refresh token is required")
		return
	}

	result, err := h.service.RefreshToken(r.Context(), cookie.Value)
	if err != nil {
		handleError(w, err)
		return
	}

	// Set new refresh token as httpOnly cookie (rotate token)
	// With proxy, requests are same-origin so Lax works
	http.SetCookie(w, &http.Cookie{
		Name:     "refresh_token",
		Value:    result.RefreshToken,
		Path:     "/api",
		HttpOnly: true,
		Secure:   false,
		SameSite: http.SameSiteLaxMode,
		MaxAge:   int(RefreshTokenExpiry.Seconds()),
	})

	// Return only access token (refresh token in cookie)
	response := map[string]interface{}{
		"access_token": result.AccessToken,
		"expires_at":   result.ExpiresAt,
	}
	entities.WriteJSON(w, http.StatusOK, response)
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}

// Logout handles POST /api/auth/logout
func (h *Handler) Logout(w http.ResponseWriter, r *http.Request) {
	// Get refresh token from httpOnly cookie
	cookie, err := r.Cookie("refresh_token")
	if err != nil {
		// Cookie not found, still try to clear it
		http.SetCookie(w, &http.Cookie{
			Name:     "refresh_token",
			Value:    "",
			Path:     "/api",
			HttpOnly: true,
			MaxAge:   -1,
		})
		entities.WriteJSON(w, http.StatusOK, map[string]string{"message": "Logged out successfully"})
		return
	}

	if err := h.service.Logout(r.Context(), cookie.Value); err != nil {
		// Silently succeed even if logout fails
	}

	// Clear the refresh token cookie
	http.SetCookie(w, &http.Cookie{
		Name:     "refresh_token",
		Value:    "",
		Path:     "/api",
		HttpOnly: true,
		MaxAge:   -1,
	})

	entities.WriteJSON(w, http.StatusOK, map[string]string{"message": "Logged out successfully"})
}

// ForgotPassword handles POST /api/auth/forgot-password
func (h *Handler) ForgotPassword(w http.ResponseWriter, r *http.Request) {
	var req struct {
		Email string `json:"email"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		entities.WriteError(w, http.StatusBadRequest, "Invalid request body")
		return
	}

	if req.Email == "" {
		entities.WriteError(w, http.StatusBadRequest, "Email is required")
		return
	}

	// Always return success to prevent enumeration
	_, _ = h.service.ForgotPassword(r.Context(), req.Email)

	entities.WriteJSON(w, http.StatusOK, map[string]string{
		"message": "If the email exists, a reset link has been sent",
	})
}

// ResetPassword handles POST /api/auth/reset-password
func (h *Handler) ResetPassword(w http.ResponseWriter, r *http.Request) {
	var req struct {
		Token       string `json:"token"`
		NewPassword string `json:"new_password"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		entities.WriteError(w, http.StatusBadRequest, "Invalid request body")
		return
	}

	if req.Token == "" || req.NewPassword == "" {
		entities.WriteError(w, http.StatusBadRequest, "Token and new password are required")
		return
	}

	if err := h.service.ResetPassword(r.Context(), req.Token, req.NewPassword); err != nil {
		entities.WriteError(w, http.StatusBadRequest, "Invalid or expired token")
		return
	}

	entities.WriteJSON(w, http.StatusOK, map[string]string{"message": "Password reset successfully"})
}

// handleError maps service errors to HTTP responses
func handleError(w http.ResponseWriter, err error) {
	switch {
	case errors.Is(err, ErrInvalidCredentials):
		entities.WriteError(w, http.StatusUnauthorized, "Invalid credentials")
	case errors.Is(err, ErrAccountDeactivated):
		entities.WriteError(w, http.StatusForbidden, "Account deactivated")
	case errors.Is(err, ErrTokenExpired):
		entities.WriteError(w, http.StatusUnauthorized, "Token expired")
	case errors.Is(err, ErrTokenRevoked):
		entities.WriteError(w, http.StatusUnauthorized, "Token revoked")
	default:
		entities.WriteError(w, http.StatusInternalServerError, "Internal server error")
	}
}

// GetMe handles GET /api/auth/me - returns current authenticated user
func (h *Handler) GetMe(w http.ResponseWriter, r *http.Request) {
	// Get access token from Authorization header
	authHeader := r.Header.Get("Authorization")

	if authHeader == "" {
		entities.WriteError(w, http.StatusUnauthorized, "Authorization header required")
		return
	}

	tokenString := strings.TrimPrefix(authHeader, "Bearer ")
	if tokenString == authHeader {
		entities.WriteError(w, http.StatusUnauthorized, "Invalid authorization format")
		return
	}

	// Validate token
	claims, err := ValidateToken(tokenString, h.jwtSecret)
	if err != nil {
		entities.WriteError(w, http.StatusUnauthorized, "Invalid token")
		return
	}

	// Get user from database
	u, err := h.userRepo.GetByID(r.Context(), claims.UserID)
	if err != nil {
		entities.WriteError(w, http.StatusNotFound, "User not found")
		return
	}

	// Check if account is active
	if !u.Active {
		entities.WriteError(w, http.StatusForbidden, "Account deactivated")
		return
	}

	// Return user info
	response := map[string]interface{}{
		"user": map[string]interface{}{
			"id":    u.ID,
			"email": u.Email,
			"name":  u.Name,
			"role":  string(u.Role),
		},
	}
	entities.WriteJSON(w, http.StatusOK, response)
}