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
	UserService   *user.Service

	// Handlers
	AuthHandler   *auth.Handler
	HealthHandler *health.Handler
	UserHandler   *user.Handler
}

// NewDependencies initializes all dependencies
func NewDependencies(cfg *config.Config, db *database.Database) *Dependencies {
	// Repositories
	userRepo := user.NewRepository(db.DB)
	branchRepo := branch.NewRepository(db.DB)
	tokenRepo := auth.NewRepository(db.DB)

	// Services
	authService := auth.NewService(userRepo, tokenRepo, cfg.Auth.JWTSecret)
	userService := user.NewService(userRepo)

	// Handlers
	authHandler := auth.NewHandler(authService, userRepo, cfg.Auth.JWTSecret)
	healthHandler := health.NewHandler(db)
	userHandler := NewHandler(userService, userRepo)

	return &Dependencies{
		Config:        cfg,
		DB:            db,
		UserRepo:      userRepo,
		BranchRepo:    branchRepo,
		TokenRepo:     tokenRepo,
		AuthService:   authService,
		UserService:   userService,
		AuthHandler:   authHandler,
		HealthHandler: healthHandler,
		UserHandler:   userHandler,
	}
}

// NewHandler creates a user handler (wrapped to avoid import cycle)
func NewHandler(svc *user.Service, repo *user.Repository) *user.Handler {
	return user.NewHandler(svc, repo)
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

	// Protected admin routes
	adminMux := http.NewServeMux()
	adminMux.HandleFunc("GET /api/v1/admin/users", deps.UserHandler.ListUsers)
	adminMux.HandleFunc("POST /api/v1/admin/users", deps.UserHandler.CreateUser)
	adminMux.HandleFunc("PUT /api/v1/admin/users/{id}", deps.UserHandler.UpdateUser)
	adminMux.HandleFunc("PATCH /api/v1/admin/users/{id}/activate", deps.UserHandler.ActivateUser)
	adminMux.HandleFunc("PATCH /api/v1/admin/users/{id}/deactivate", deps.UserHandler.DeactivateUser)
	adminMux.HandleFunc("POST /api/v1/admin/users/{id}/reset-password", deps.UserHandler.ResetPassword)

	// Wrap admin routes with auth and admin role middleware
	protectedAdmin := middleware.RequireAuth(deps.Config.Auth.JWTSecret)(
		middleware.RequireRole("admin")(adminMux),
	)

	// Register protected routes
	mux.Handle("/api/v1/admin/", protectedAdmin)

	// Apply CORS middleware - specific origin for cookie security
	corsHandler := middleware.CORS([]string{"http://localhost:3002"})(mux)

	return corsHandler
}