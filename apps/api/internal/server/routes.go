package server

import (
	"apotek-asasi-api/internal/database"
	"apotek-asasi-api/internal/features/health"

	"net/http"
)

func RegisterRoutes(db *database.Database) *http.ServeMux {
	mux := http.NewServeMux()

	// Health check handler
	healthHandler := health.NewHandler(db)
	mux.HandleFunc("GET /health", healthHandler.Health)

	return mux
}