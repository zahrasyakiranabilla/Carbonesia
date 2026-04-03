package user

import (
	"encoding/json"
	"errors"
	"net/http"
	"strconv"

	"github.com/apotek-asasi/absensi-api/internal/context"
	"github.com/apotek-asasi/absensi-api/internal/entities"
)

// Handler handles user HTTP requests
type Handler struct {
	service *Service
	repo    *Repository
}

func NewHandler(service *Service, repo *Repository) *Handler {
	return &Handler{
		service: service,
		repo:    repo,
	}
}

// ListUsers handles GET /api/v1/admin/users
func (h *Handler) ListUsers(w http.ResponseWriter, r *http.Request) {
	// Parse query params
	page, _ := strconv.Atoi(r.URL.Query().Get("page"))
	if page < 1 {
		page = 1
	}

	limit, _ := strconv.Atoi(r.URL.Query().Get("limit"))
	if limit < 1 {
		limit = 20
	}
	if limit > 100 {
		limit = 100
	}

	role := r.URL.Query().Get("role")
	search := r.URL.Query().Get("search")

	var active *bool
	if activeStr := r.URL.Query().Get("active"); activeStr != "" {
		b := activeStr == "true"
		active = &b
	}

	params := ListUsersParams{
		Page:   page,
		Limit:  limit,
		Role:   role,
		Search: search,
		Active: active,
	}

	result, err := h.service.ListUsers(r.Context(), params)
	if err != nil {
		entities.WriteError(w, http.StatusInternalServerError, err.Error())
		return
	}

	entities.WriteJSON(w, http.StatusOK, result)
}

// CreateUser handles POST /api/v1/admin/users
func (h *Handler) CreateUser(w http.ResponseWriter, r *http.Request) {
	var req CreateUserRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		entities.WriteError(w, http.StatusBadRequest, "Invalid request body")
		return
	}

	// Validate required fields
	if req.Email == "" || req.Password == "" || req.Name == "" {
		entities.WriteError(w, http.StatusBadRequest, "Email, password, and name are required")
		return
	}

	// Validate role
	if req.Role == "" {
		req.Role = RoleStaff
	}

	user, err := h.service.CreateUser(r.Context(), req)
	if err != nil {
		switch {
		case errors.Is(err, ErrEmailExists):
			entities.WriteError(w, http.StatusConflict, "Email already exists")
		default:
			entities.WriteError(w, http.StatusInternalServerError, err.Error())
		}
		return
	}

	entities.WriteJSON(w, http.StatusCreated, user)
}

// UpdateUser handles PUT /api/v1/admin/users/:id
func (h *Handler) UpdateUser(w http.ResponseWriter, r *http.Request) {
	userID := r.PathValue("id")
	if userID == "" {
		entities.WriteError(w, http.StatusBadRequest, "User ID is required")
		return
	}

	var req UpdateUserRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		entities.WriteError(w, http.StatusBadRequest, "Invalid request body")
		return
	}

	// Validate required fields
	if req.Email == "" || req.Name == "" {
		entities.WriteError(w, http.StatusBadRequest, "Email and name are required")
		return
	}

	user, err := h.service.UpdateUser(r.Context(), userID, req)
	if err != nil {
		switch {
		case errors.Is(err, ErrUserNotFound):
			entities.WriteError(w, http.StatusNotFound, "User not found")
		case errors.Is(err, ErrSameEmail):
			entities.WriteError(w, http.StatusConflict, "Email already in use by another user")
		default:
			entities.WriteError(w, http.StatusInternalServerError, err.Error())
		}
		return
	}

	entities.WriteJSON(w, http.StatusOK, user)
}

// ActivateUser handles PATCH /api/v1/admin/users/:id/activate
func (h *Handler) ActivateUser(w http.ResponseWriter, r *http.Request) {
	userID := r.PathValue("id")
	if userID == "" {
		entities.WriteError(w, http.StatusBadRequest, "User ID is required")
		return
	}

	currentUserID, _ := context.GetUserID(r.Context())

	user, err := h.service.ActivateUser(r.Context(), userID, currentUserID)
	if err != nil {
		switch {
		case errors.Is(err, ErrUserNotFound):
			entities.WriteError(w, http.StatusNotFound, "User not found")
		case errors.Is(err, ErrCannotModifySelf):
			entities.WriteError(w, http.StatusBadRequest, "Cannot activate your own account")
		default:
			entities.WriteError(w, http.StatusInternalServerError, err.Error())
		}
		return
	}

	entities.WriteJSON(w, http.StatusOK, user)
}

// DeactivateUser handles PATCH /api/v1/admin/users/:id/deactivate
func (h *Handler) DeactivateUser(w http.ResponseWriter, r *http.Request) {
	userID := r.PathValue("id")
	if userID == "" {
		entities.WriteError(w, http.StatusBadRequest, "User ID is required")
		return
	}

	currentUserID, _ := context.GetUserID(r.Context())

	user, err := h.service.DeactivateUser(r.Context(), userID, currentUserID)
	if err != nil {
		switch {
		case errors.Is(err, ErrUserNotFound):
			entities.WriteError(w, http.StatusNotFound, "User not found")
		case errors.Is(err, ErrCannotModifySelf):
			entities.WriteError(w, http.StatusBadRequest, "Cannot deactivate your own account")
		default:
			entities.WriteError(w, http.StatusInternalServerError, err.Error())
		}
		return
	}

	entities.WriteJSON(w, http.StatusOK, user)
}

// ResetPassword handles POST /api/v1/admin/users/:id/reset-password
func (h *Handler) ResetPassword(w http.ResponseWriter, r *http.Request) {
	userID := r.PathValue("id")
	if userID == "" {
		entities.WriteError(w, http.StatusBadRequest, "User ID is required")
		return
	}

	newPassword, err := h.service.ResetPassword(r.Context(), userID)
	if err != nil {
		switch {
		case errors.Is(err, ErrUserNotFound):
			entities.WriteError(w, http.StatusNotFound, "User not found")
		default:
			entities.WriteError(w, http.StatusInternalServerError, err.Error())
		}
		return
	}

	entities.WriteJSON(w, http.StatusOK, map[string]string{
		"new_password": newPassword,
	})
}