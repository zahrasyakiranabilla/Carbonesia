package server

import (
	"net/http"

	"github.com/apotek-asasi/absensi-api/internal/config"
	"github.com/apotek-asasi/absensi-api/internal/database"
	"github.com/apotek-asasi/absensi-api/internal/features/auth"
	"github.com/apotek-asasi/absensi-api/internal/features/branch"
	"github.com/apotek-asasi/absensi-api/internal/features/health"
	"github.com/apotek-asasi/absensi-api/internal/features/user"
	"github.com/apotek-asasi/absensi-api/internal/middleware"
)

// Dependencies holds all service dependencies
type Dependencies struct {
	Config        *config.Config
	DB            *database.Database

	// Repositories
	UserRepo      *user.Repository
	BranchRepo    *branch.Repository
	TokenRepo     *auth.Repository

	// Services
	AuthService   *auth.Service

	// Handlers
	AuthHandler   *auth.Handler
	HealthHandler *health.Handler
}

// NewDependencies initializes all dependencies
func NewDependencies(cfg *config.Config, db *database.Database) *Dependencies {
	// Repositories
	userRepo := user.NewRepository(db.DB)
	branchRepo := branch.NewRepository(db.DB)
	tokenRepo := auth.NewRepository(db.DB)

	// Services
	authService := auth.NewService(userRepo, tokenRepo, cfg.Auth.JWTSecret)

	// Handlers
	authHandler := auth.NewHandler(authService, userRepo, cfg.Auth.JWTSecret)
	healthHandler := health.NewHandler(db)

	return &Dependencies{
		Config:        cfg,
		DB:            db,
		UserRepo:      userRepo,
		BranchRepo:    branchRepo,
		TokenRepo:     tokenRepo,
		AuthService:   authService,
		AuthHandler:   authHandler,
		HealthHandler: healthHandler,
	}
}

// RegisterRoutes registers all routes and returns the handler
func RegisterRoutes(deps *Dependencies) http.Handler {
	mux := http.NewServeMux()

	// Health check (public)
	mux.HandleFunc("GET /health", deps.HealthHandler.Health)

	// Auth routes (public)
	mux.HandleFunc("POST /api/auth/login", deps.AuthHandler.Login)
	mux.HandleFunc("POST /api/auth/refresh", deps.AuthHandler.Refresh)
	mux.HandleFunc("POST /api/auth/logout", deps.AuthHandler.Logout)
	mux.HandleFunc("POST /api/auth/forgot-password", deps.AuthHandler.ForgotPassword)
	mux.HandleFunc("POST /api/auth/reset-password", deps.AuthHandler.ResetPassword)
	mux.HandleFunc("GET /api/auth/me", deps.AuthHandler.GetMe)

	// Protected routes would be added here with middleware:
	// protected := http.NewServeMux()
	// protected.HandleFunc("GET /api/users/me", userHandler.GetMe)
	// mux.Handle("/", middleware.RequireAuth(deps.Config.Auth.JWTSecret)(protected))

	// Apply CORS middleware - specific origin for cookie security
	corsHandler := middleware.CORS([]string{"http://localhost:3002"})(mux)

	return corsHandler
}