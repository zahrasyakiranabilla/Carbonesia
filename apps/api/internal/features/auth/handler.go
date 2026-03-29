package auth

import (
	"encoding/json"
	"errors"
	"net/http"

	"github.com/apotek-asasi/absensi-api/internal/entities"
)

// Handler handles HTTP requests for authentication
type Handler struct {
	service *Service
}

func NewHandler(service *Service) *Handler {
	return &Handler{service: service}
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

	entities.WriteJSON(w, http.StatusOK, result)
}

// Refresh handles POST /api/auth/refresh
func (h *Handler) Refresh(w http.ResponseWriter, r *http.Request) {
	var req struct {
		RefreshToken string `json:"refresh_token"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		entities.WriteError(w, http.StatusBadRequest, "Invalid request body")
		return
	}

	if req.RefreshToken == "" {
		entities.WriteError(w, http.StatusBadRequest, "Refresh token is required")
		return
	}

	result, err := h.service.RefreshToken(r.Context(), req.RefreshToken)
	if err != nil {
		handleError(w, err)
		return
	}

	entities.WriteJSON(w, http.StatusOK, result)
}

// Logout handles POST /api/auth/logout
func (h *Handler) Logout(w http.ResponseWriter, r *http.Request) {
	var req struct {
		RefreshToken string `json:"refresh_token"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		entities.WriteError(w, http.StatusBadRequest, "Invalid request body")
		return
	}

	if req.RefreshToken == "" {
		entities.WriteError(w, http.StatusBadRequest, "Refresh token is required")
		return
	}

	if err := h.service.Logout(r.Context(), req.RefreshToken); err != nil {
		entities.WriteError(w, http.StatusInternalServerError, "Logout failed")
		return
	}

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