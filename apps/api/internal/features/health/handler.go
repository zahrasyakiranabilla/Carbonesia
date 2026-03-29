package health

import (
	"encoding/json"
	"net/http"

	"apotek-asasi-api/internal/database"
)

type Handler struct {
	db *database.Database
}

func NewHandler(db *database.Database) *Handler {
	return &Handler{db: db}
}

type HealthResponse struct {
	Status   string `json:"status"`
	Database string `json:"database"`
}

func (h *Handler) Health(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	response := HealthResponse{
		Status:   "ok",
		Database: "ok",
	}

	// Check database connection
	if err := h.db.HealthCheck(ctx); err != nil {
		response.Database = "error"
		response.Status = "degraded"
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}