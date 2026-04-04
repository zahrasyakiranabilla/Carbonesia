---
name: backend-go-dev
description: Go/Golang backend development with standard library and PostgreSQL. Covers HTTP servers, database connections, SQL queries, error handling, project structure, and Go best practices.
---

# Go Backend Development Guide

## Purpose

Comprehensive guide for building backend services in Go using the standard library and PostgreSQL database. Follows Go best practices and idiomatic patterns.

## When to Use This Skill

- Creating new Go services or APIs
- Writing HTTP handlers and routers
- Database operations with PostgreSQL
- Setting up project structure
- Error handling patterns
- Configuration management
- Writing tests for Go code

---

## Project Structure

### Service-Based Folder Structure (by Domain)

Organize code by business domain under `internal/features/`. Each domain contains handler, model, repository, and optionally service for business logic:

```
project-root/
├── cmd/
│   ├── api/
│   │   └── main.go           # Application entry point, graceful shutdown
│   └── migrate/
│       └── main.go           # Database migration runner
│
├── internal/
│   ├── config/
│   │   └── config.go         # Environment & configuration loading
│   ├── context/
│   │   └── user.go           # User context helpers (userID, role)
│   ├── database/
│   │   └── database.go       # PostgreSQL connection (*sql.DB or pgxpool)
│   ├── entities/
│   │   ├── user.go           # Shared entities used across features
│   │   └── common.go         # Common types (pagination, response wrappers)
│   ├── middleware/
│   │   └── auth.go           # Authentication middleware (JWT)
│   ├── server/
│   │   ├── server.go         # HTTP server configuration
│   │   └── routes.go         # Route registration
│   └── features/
│       ├── feature-1/
│       │   ├── handler.go    # HTTP handlers
│       │   ├── model.go      # Data models (entities, DTOs)
│       │   └── repository.go # DB queries
│       ├── feature-2/
│       │   ├── handler.go
│       │   ├── model.go
│       │   ├── repository.go
│       │   └── service.go    # Business logic (when needed)
│       ├── auth/
│       │   ├── handler.go
│       │   ├── model.go
│       │   └── service.go
│       ├── user/
│       │   ├── handler.go
│       │   └── repository.go
│       └── webhook/
│           └── handler.go    # External webhook handlers
│
├── migrations/
│   ├── 001_create_users.sql
│   ├── 002_create_bookings.sql
│   └── 003_create_audit_log.sql
│
├── pkg/
│   └── storage/
│       ├── s3/
│       │   ├── client.go     # S3 client
│       │   ├── upload.go
│       │   └── delete.go
│       └── storage.go        # Storage interface
│
├── docker-compose.yml        # PostgreSQL container
├── Makefile                  # Build/test commands
└── README.md
```

### Key Principles

- **Service-based by domain**: Each business domain (booking, user, amenity) has its own folder
- **Consistent file naming**: `handler.go`, `model.go`, `repository.go`, `service.go`
- **Shared infrastructure**: `internal/database/`, `internal/middleware/`, `internal/server/`
- **Reusable packages**: `pkg/` for shared libraries (storage, utilities)
- **Separate concerns**:
  - `cmd/` for entry points
  - `internal/` for private code
  - `pkg/` for public/reusable code

### Directory Responsibilities

| Directory                      | Purpose                   | Examples                                      |
| ------------------------------ | ------------------------- | --------------------------------------------- |
| `cmd/`                         | Application entry points  | `api/main.go`, `migrate/main.go`              |
| `internal/config/`             | Configuration management  | Environment variables, app config             |
| `internal/database/`           | Database connection setup | Connection pooling, health check              |
| `internal/middleware/`         | HTTP middleware           | Auth, logging, CORS                           |
| `internal/server/`             | HTTP server setup         | Router, server config                         |
| `internal/entities/`           | Shared domain entities    | User, common types, pagination                |
| `internal/features/{domain}/`  | Domain-specific logic     | `booking/handler.go`, `user/repository.go`    |
| `pkg/`                         | Reusable packages         | Storage interface, utilities                  |
| `migrations/`                  | Database migrations       | SQL migration scripts                         |
| `specs/`                       | Feature documentation     | API specs, requirements                       |

### Example Domain Structure (booking)

```
internal/features/booking/
├── handler.go      # HTTP request/response handling
├── model.go        # Booking entity, DTOs, enums
├── repository.go   # SQL queries for booking
└── service.go      # Business logic, validation, orchestration
```

### Example Domain Structure (user - simple, no service layer)

```
internal/features/user/
├── handler.go      # HTTP request/response handling
└── repository.go   # SQL queries for user
```

---

## HTTP Server Pattern

### Server Setup (internal/server/server.go)

```go
package server

import (
    "context"
    "log"
    "net/http"
    "time"
)

type Config struct {
    Port         string
    ReadTimeout  time.Duration
    WriteTimeout time.Duration
    IdleTimeout  time.Duration
}

func DefaultConfig() Config {
    return Config{
        Port:         "8080",
        ReadTimeout:  10 * time.Second,
        WriteTimeout: 10 * time.Second,
        IdleTimeout:  60 * time.Second,
    }
}

type Server struct {
    http *http.Server
}

func New(cfg Config, handler http.Handler) *Server {
    return &Server{
        http: &http.Server{
            Addr:         ":" + cfg.Port,
            Handler:      handler,
            ReadTimeout:  cfg.ReadTimeout,
            WriteTimeout: cfg.WriteTimeout,
            IdleTimeout:  cfg.IdleTimeout,
        },
    }
}

func (s *Server) Start() error {
    log.Printf("Server starting on %s", s.http.Addr)
    return s.http.ListenAndServe()
}

func (s *Server) Shutdown(ctx context.Context) error {
    return s.http.Shutdown(ctx)
}
```

### Route Registration (internal/server/routes.go)

```go
package server

import (
    "net/http"

    "booking-service/internal/features/booking"
    "booking-service/internal/features/user"
)

func RegisterRoutes(mux *http.ServeMux, deps *Dependencies) {
    // Health check
    mux.HandleFunc("GET /health", func(w http.ResponseWriter, r *http.Request) {
        w.WriteHeader(http.StatusOK)
        w.Write([]byte("OK"))
    })

    // User routes
    userHandler := user.NewHandler(deps.UserService)
    mux.HandleFunc("GET /users/{id}", userHandler.GetByID)
    mux.HandleFunc("POST /users", userHandler.Create)

    // Booking routes
    bookingHandler := booking.NewHandler(deps.BookingService)
    mux.HandleFunc("GET /bookings/{id}", bookingHandler.GetByID)
    mux.HandleFunc("POST /bookings", bookingHandler.Create)
    mux.HandleFunc("POST /bookings/{id}/cancel", bookingHandler.Cancel)
}

type Dependencies struct {
    UserService    *user.Service
    BookingService *booking.Service
}
```

### Main Entry Point (cmd/api/main.go)

```go
package main

import (
    "context"
    "log"
    "net/http"
    "os"
    "os/signal"
    "syscall"
    "time"

    "booking-service/internal/database"
    "booking-service/internal/server"
    "booking-service/internal/features/booking"
    "booking-service/internal/features/user"
)

func main() {
    // Database connection
    db, err := database.New(os.Getenv("DATABASE_URL"))
    if err != nil {
        log.Fatalf("Failed to connect to database: %v", err)
    }
    defer db.Close()

    // Initialize services
    userRepo := user.NewRepository(db)
    userService := user.NewService(userRepo)

    bookingRepo := booking.NewRepository(db)
    bookingService := booking.NewService(bookingRepo, userService)

    // Setup dependencies
    deps := &server.Dependencies{
        UserService:    userService,
        BookingService: bookingService,
    }

    // Register routes
    mux := http.NewServeMux()
    server.RegisterRoutes(mux, deps)

    // Create and start server
    srv := server.New(server.DefaultConfig(), mux)

    // Graceful shutdown
    go func() {
        sig := make(chan os.Signal, 1)
        signal.Notify(sig, syscall.SIGINT, syscall.SIGTERM)
        <-sig

        log.Println("Shutting down server...")
        ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
        defer cancel()

        if err := srv.Shutdown(ctx); err != nil {
            log.Printf("Server shutdown error: %v", err)
        }
    }()

    if err := srv.Start(); err != nil {
        log.Fatalf("Server error: %v", err)
    }
}
```

---

## Database Pattern

### Database Connection (internal/database/database.go)

```go
package database

import (
    "context"
    "database/sql"
    "fmt"
    "time"

    _ "github.com/lib/pq"
)

type Config struct {
    Host            string
    Port            int
    User            string
    Password        string
    DBName          string
    SSLMode         string
    MaxOpenConns    int
    MaxIdleConns    int
    ConnMaxLifetime time.Duration
    ConnMaxIdleTime time.Duration
}

func DefaultConfig() Config {
    return Config{
        Host:            "localhost",
        Port:            5432,
        User:            "postgres",
        Password:        "",
        DBName:          "app",
        SSLMode:         "disable",
        MaxOpenConns:    25,
        MaxIdleConns:    5,
        ConnMaxLifetime: 5 * time.Minute,
        ConnMaxIdleTime: 2 * time.Minute,
    }
}

type Database struct {
    *sql.DB
}

func New(dsn string) (*Database, error) {
    db, err := sql.Open("postgres", dsn)
    if err != nil {
        return nil, fmt.Errorf("failed to open database: %w", err)
    }

    // Connection pool settings
    db.SetMaxOpenConns(25)
    db.SetMaxIdleConns(5)
    db.SetConnMaxLifetime(5 * time.Minute)
    db.SetConnMaxIdleTime(2 * time.Minute)

    // Verify connection
    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()

    if err := db.PingContext(ctx); err != nil {
        db.Close()
        return nil, fmt.Errorf("failed to ping database: %w", err)
    }

    return &Database{db}, nil
}

func NewFromConfig(cfg Config) (*Database, error) {
    dsn := fmt.Sprintf(
        "host=%s port=%d user=%s password=%s dbname=%s sslmode=%s",
        cfg.Host, cfg.Port, cfg.User, cfg.Password, cfg.DBName, cfg.SSLMode,
    )
    return New(dsn)
}

func (db *Database) Close() error {
    return db.DB.Close()
}

// HealthCheck verifies database connectivity
func (db *Database) HealthCheck(ctx context.Context) error {
    return db.PingContext(ctx)
}
```

---

## Repository Pattern (per domain)

### Example: Booking Repository (internal/features/booking/repository.go)

```go
package booking

import (
    "context"
    "database/sql"
    "fmt"
    "time"

    "errors"
)

var (
    ErrBookingNotFound = errors.New("booking not found")
)

type Booking struct {
    ID          string
    UserID      string
    PropertyID  string
    RoomTypeID  string
    CheckIn     time.Time
    CheckOut    time.Time
    Status      BookingStatus
    TotalPrice  int64
    CreatedAt   time.Time
    UpdatedAt   time.Time
}

type BookingStatus string

const (
    StatusPending   BookingStatus = "pending"
    StatusConfirmed BookingStatus = "confirmed"
    StatusCancelled BookingStatus = "cancelled"
)

type Repository struct {
    db *sql.DB
}

func NewRepository(db *sql.DB) *Repository {
    return &Repository{db: db}
}

func (r *Repository) GetByID(ctx context.Context, id string) (*Booking, error) {
    query := `
        SELECT id, user_id, property_id, room_type_id, check_in, check_out,
               status, total_price, created_at, updated_at
        FROM bookings
        WHERE id = $1
    `

    b := &Booking{}
    err := r.db.QueryRowContext(ctx, query, id).Scan(
        &b.ID, &b.UserID, &b.PropertyID, &b.RoomTypeID,
        &b.CheckIn, &b.CheckOut, &b.Status, &b.TotalPrice,
        &b.CreatedAt, &b.UpdatedAt,
    )
    if err == sql.ErrNoRows {
        return nil, ErrBookingNotFound
    }
    if err != nil {
        return nil, fmt.Errorf("failed to get booking: %w", err)
    }

    return b, nil
}

func (r *Repository) Create(ctx context.Context, b *Booking) error {
    query := `
        INSERT INTO bookings (
            id, user_id, property_id, room_type_id,
            check_in, check_out, status, total_price,
            created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    `

    now := time.Now()
    b.CreatedAt = now
    b.UpdatedAt = now

    _, err := r.db.ExecContext(ctx, query,
        b.ID, b.UserID, b.PropertyID, b.RoomTypeID,
        b.CheckIn, b.CheckOut, b.Status, b.TotalPrice,
        now, now,
    )
    if err != nil {
        return fmt.Errorf("failed to create booking: %w", err)
    }

    return nil
}

func (r *Repository) UpdateStatus(ctx context.Context, id string, status BookingStatus) error {
    query := `
        UPDATE bookings
        SET status = $1, updated_at = $2
        WHERE id = $3
    `

    result, err := r.db.ExecContext(ctx, query, status, time.Now(), id)
    if err != nil {
        return fmt.Errorf("failed to update booking status: %w", err)
    }

    rows, err := result.RowsAffected()
    if err != nil {
        return fmt.Errorf("failed to get rows affected: %w", err)
    }
    if rows == 0 {
        return ErrBookingNotFound
    }

    return nil
}

func (r *Repository) ListByUserID(ctx context.Context, userID string, limit, offset int) ([]*Booking, error) {
    query := `
        SELECT id, user_id, property_id, room_type_id, check_in, check_out,
               status, total_price, created_at, updated_at
        FROM bookings
        WHERE user_id = $1
        ORDER BY created_at DESC
        LIMIT $2 OFFSET $3
    `

    rows, err := r.db.QueryContext(ctx, query, userID, limit, offset)
    if err != nil {
        return nil, fmt.Errorf("failed to list bookings: %w", err)
    }
    defer rows.Close()

    var bookings []*Booking
    for rows.Next() {
        b := &Booking{}
        err := rows.Scan(
            &b.ID, &b.UserID, &b.PropertyID, &b.RoomTypeID,
            &b.CheckIn, &b.CheckOut, &b.Status, &b.TotalPrice,
            &b.CreatedAt, &b.UpdatedAt,
        )
        if err != nil {
            return nil, fmt.Errorf("failed to scan booking: %w", err)
        }
        bookings = append(bookings, b)
    }

    return bookings, rows.Err()
}
```

### Example: Booking Model (internal/features/booking/model.go)

```go
package booking

import (
    "errors"
    "time"

    "github.com/google/uuid"
)

// Domain validation errors
var (
    ErrInvalidDates     = errors.New("check-out must be after check-in")
    ErrInvalidGuests    = errors.New("guest count exceeds room capacity")
    ErrBookingCancelled = errors.New("booking is cancelled")
)

// NewBooking creates a new booking with validation
func NewBooking(userID, propertyID, roomTypeID string, checkIn, checkOut time.Time) (*Booking, error) {
    if !checkOut.After(checkIn) {
        return nil, ErrInvalidDates
    }

    return &Booking{
        ID:         "bk_" + uuid.New().String(),
        UserID:     userID,
        PropertyID: propertyID,
        RoomTypeID: roomTypeID,
        CheckIn:    checkIn,
        CheckOut:   checkOut,
        Status:     StatusPending,
    }, nil
}

// Cancel cancels the booking if allowed
func (b *Booking) Cancel() error {
    if b.Status == StatusCancelled {
        return ErrBookingCancelled
    }
    // Add business logic: cancellation policy, refunds, etc.
    b.Status = StatusCancelled
    b.UpdatedAt = time.Now()
    return nil
}

// Confirm confirms the booking
func (b *Booking) Confirm() {
    b.Status = StatusConfirmed
    b.UpdatedAt = time.Now()
}
```

### Example: Booking Service (internal/features/booking/service.go)

```go
package booking

import (
    "context"
    "time"
)

// Service handles business logic for bookings
type Service struct {
    repo *Repository
}

func NewService(repo *Repository) *Service {
    return &Service{repo: repo}
}

// CreateBookingInput represents the input for creating a booking
type CreateBookingInput struct {
    UserID     string
    PropertyID string
    RoomTypeID string
    CheckIn    time.Time
    CheckOut   time.Time
}

// CreateBooking creates a new booking
func (s *Service) CreateBooking(ctx context.Context, input CreateBookingInput) (*Booking, error) {
    // Create booking with validation
    booking, err := NewBooking(input.UserID, input.PropertyID, input.RoomTypeID, input.CheckIn, input.CheckOut)
    if err != nil {
        return nil, err
    }

    // Add business logic: check availability, calculate price, etc.
    // booking.TotalPrice = calculatePrice(...)

    // Persist to database
    if err := s.repo.Create(ctx, booking); err != nil {
        return nil, err
    }

    return booking, nil
}

// CancelBooking cancels a booking
func (s *Service) CancelBooking(ctx context.Context, id string) error {
    booking, err := s.repo.GetByID(ctx, id)
    if err != nil {
        return err
    }

    if err := booking.Cancel(); err != nil {
        return err
    }

    return s.repo.UpdateStatus(ctx, booking.ID, booking.Status)
}
```

---

## Handler Pattern (per domain)

### Example: Booking Handler (internal/features/booking/handler.go)

```go
package booking

import (
    "encoding/json"
    "errors"
    "net/http"
    "strconv"
    "time"
)

// Handler handles HTTP requests for bookings
type Handler struct {
    service *Service
}

func NewHandler(service *Service) *Handler {
    return &Handler{service: service}
}

// --- Response Helpers ---

func writeJSON(w http.ResponseWriter, status int, data any) {
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(status)
    json.NewEncoder(w).Encode(data)
}

func writeError(w http.ResponseWriter, status int, message string) {
    writeJSON(w, status, map[string]string{"error": message})
}

func handleError(w http.ResponseWriter, err error) {
    switch {
    case errors.Is(err, ErrBookingNotFound):
        writeError(w, http.StatusNotFound, "Booking not found")
    case errors.Is(err, ErrInvalidDates), errors.Is(err, ErrInvalidGuests):
        writeError(w, http.StatusBadRequest, err.Error())
    case errors.Is(err, ErrBookingCancelled):
        writeError(w, http.StatusConflict, err.Error())
    default:
        writeError(w, http.StatusInternalServerError, "Internal server error")
    }
}

// --- HTTP Handlers ---

// CreateBooking handles POST /bookings
func (h *Handler) CreateBooking(w http.ResponseWriter, r *http.Request) {
    var req struct {
        UserID     string `json:"user_id"`
        PropertyID string `json:"property_id"`
        RoomTypeID string `json:"room_type_id"`
        CheckIn    string `json:"check_in"`
        CheckOut   string `json:"check_out"`
    }

    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        writeError(w, http.StatusBadRequest, "Invalid request body")
        return
    }

    // Parse dates
    checkIn, err := parseDate(req.CheckIn)
    if err != nil {
        writeError(w, http.StatusBadRequest, "Invalid check_in date format")
        return
    }
    checkOut, err := parseDate(req.CheckOut)
    if err != nil {
        writeError(w, http.StatusBadRequest, "Invalid check_out date format")
        return
    }

    // Create booking
    booking, err := h.service.CreateBooking(r.Context(), CreateBookingInput{
        UserID:     req.UserID,
        PropertyID: req.PropertyID,
        RoomTypeID: req.RoomTypeID,
        CheckIn:    checkIn,
        CheckOut:   checkOut,
    })
    if err != nil {
        handleError(w, err)
        return
    }

    writeJSON(w, http.StatusCreated, booking)
}

// GetBookingByID handles GET /bookings/{id}
func (h *Handler) GetBookingByID(w http.ResponseWriter, r *http.Request) {
    id := r.PathValue("id")
    if id == "" {
        writeError(w, http.StatusBadRequest, "Missing booking ID")
        return
    }

    booking, err := h.service.repo.GetByID(r.Context(), id)
    if err != nil {
        handleError(w, err)
        return
    }

    writeJSON(w, http.StatusOK, booking)
}

// CancelBooking handles POST /bookings/{id}/cancel
func (h *Handler) CancelBooking(w http.ResponseWriter, r *http.Request) {
    id := r.PathValue("id")
    if id == "" {
        writeError(w, http.StatusBadRequest, "Missing booking ID")
        return
    }

    if err := h.service.CancelBooking(r.Context(), id); err != nil {
        handleError(w, err)
        return
    }

    w.WriteHeader(http.StatusNoContent)
}

// ListUserBookings handles GET /users/{user_id}/bookings
func (h *Handler) ListUserBookings(w http.ResponseWriter, r *http.Request) {
    userID := r.PathValue("user_id")
    if userID == "" {
        writeError(w, http.StatusBadRequest, "Missing user ID")
        return
    }

    // Parse pagination
    limit, _ := strconv.Atoi(r.URL.Query().Get("limit"))
    offset, _ := strconv.Atoi(r.URL.Query().Get("offset"))
    if limit <= 0 {
        limit = 20
    }
    if limit > 100 {
        limit = 100
    }

    bookings, err := h.service.repo.ListByUserID(r.Context(), userID, limit, offset)
    if err != nil {
        handleError(w, err)
        return
    }

    writeJSON(w, http.StatusOK, map[string]any{
        "data":     bookings,
        "limit":    limit,
        "offset":   offset,
        "total":    len(bookings),
    })
}

// --- Helpers ---

func parseDate(s string) (time.Time, error) {
    return time.Parse("2006-01-02", s)
}
```

---

## Middleware Pattern

### Authentication Middleware (internal/middleware/auth.go)

```go
package middleware

import (
    "context"
    "net/http"
    "strings"
)

type contextKey string

const (
    UserIDKey   contextKey = "user_id"
    UserRoleKey contextKey = "user_role"
)

// AuthMiddleware validates JWT tokens and extracts user info
type AuthMiddleware struct {
    secretKey string
}

func NewAuthMiddleware(secretKey string) *AuthMiddleware {
    return &AuthMiddleware{secretKey: secretKey}
}

func (m *AuthMiddleware) Wrap(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        authHeader := r.Header.Get("Authorization")
        if authHeader == "" {
            http.Error(w, "Missing authorization header", http.StatusUnauthorized)
            return
        }

        // Extract Bearer token
        parts := strings.Split(authHeader, " ")
        if len(parts) != 2 || parts[0] != "Bearer" {
            http.Error(w, "Invalid authorization format", http.StatusUnauthorized)
            return
        }

        token := parts[1]

        // Validate token and extract claims (use your JWT library)
        claims, err := validateToken(token, m.secretKey)
        if err != nil {
            http.Error(w, "Invalid token", http.StatusUnauthorized)
            return
        }

        // Add user info to context
        ctx := context.WithValue(r.Context(), UserIDKey, claims.UserID)
        ctx = context.WithValue(ctx, UserRoleKey, claims.Role)

        next.ServeHTTP(w, r.WithContext(ctx))
    })
}

// GetUserID extracts user ID from context
func GetUserID(ctx context.Context) (string, bool) {
    userID, ok := ctx.Value(UserIDKey).(string)
    return userID, ok
}

// GetUserRole extracts role from context
func GetUserRole(ctx context.Context) (string, bool) {
    role, ok := ctx.Value(UserRoleKey).(string)
    return role, ok
}

// --- Helper functions ---

type Claims struct {
    UserID string `json:"user_id"`
    Role   string `json:"role"`
}

func validateToken(token, secretKey string) (*Claims, error) {
    // Implement JWT validation using your preferred library
    // Example: github.com/golang-jwt/jwt/v5
    return &Claims{UserID: "user_123", Role: "admin"}, nil
}
```

### Logging Middleware (internal/middleware/logging.go)

```go
package middleware

import (
    "log"
    "net/http"
    "time"
)

// LoggingMiddleware logs HTTP requests
func LoggingMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()

        // Wrap response writer to capture status code
        rw := &responseWriter{ResponseWriter: w, status: http.StatusOK}

        next.ServeHTTP(rw, r)

        log.Printf(
            "%s %s %d %v",
            r.Method,
            r.URL.Path,
            rw.status,
            time.Since(start),
        )
    })
}

type responseWriter struct {
    http.ResponseWriter
    status int
}

func (rw *responseWriter) WriteHeader(status int) {
    rw.status = status
    rw.ResponseWriter.WriteHeader(status)
}
```

### CORS Middleware (internal/middleware/cors.go)

```go
package middleware

import "net/http"

// CORSMiddleware adds CORS headers
func CORSMiddleware(allowedOrigins []string) func(http.Handler) http.Handler {
    return func(next http.Handler) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            w.Header().Set("Access-Control-Allow-Origin", "*")
            w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
            w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

            if r.Method == "OPTIONS" {
                w.WriteHeader(http.StatusNoContent)
                return
            }

            next.ServeHTTP(w, r)
        })
    }
}
```

### Chaining Middleware

```go
// In cmd/api/main.go or internal/server/routes.go

mux := http.NewServeMux()

// Register routes
RegisterRoutes(mux, deps)

// Chain middleware
var handler http.Handler = mux
handler = middleware.LoggingMiddleware(handler)
handler = middleware.CORSMiddleware([]string{"*"})(handler)
handler = middleware.NewAuthMiddleware(os.Getenv("JWT_SECRET")).Wrap(handler)

server := server.New(server.DefaultConfig(), handler)
```

---

## Error Handling

### Error Wrapping

```go
import (
    "errors"
    "fmt"
)

// Define sentinel errors
var (
    ErrNotFound      = errors.New("resource not found")
    ErrAlreadyExists = errors.New("resource already exists")
    ErrInvalidInput  = errors.New("invalid input")
)

// Wrap errors with context
func getUser(id string) (*User, error) {
    user, err := repo.GetByID(ctx, id)
    if err != nil {
        return nil, fmt.Errorf("getUser(%s): %w", id, err)
    }
    return user, nil
}

// Check for specific errors
if errors.Is(err, sql.ErrNoRows) {
    return nil, ErrNotFound
}
```

### HTTP Error Responses

```go
func handleError(w http.ResponseWriter, err error) {
    switch {
    case errors.Is(err, sql.ErrNoRows):
        writeError(w, http.StatusNotFound, "Resource not found")
    case errors.Is(err, ErrInvalidInput):
        writeError(w, http.StatusBadRequest, "Invalid input")
    default:
        log.Printf("Internal error: %v", err)
        writeError(w, http.StatusInternalServerError, "Internal server error")
    }
}
```

---

## Configuration

### Environment Variables

```go
package config

import (
    "fmt"
    "os"
    "strconv"
)

type Config struct {
    Server   ServerConfig
    Database DatabaseConfig
}

type ServerConfig struct {
    Port int
}

type DatabaseConfig struct {
    Host     string
    Port     int
    User     string
    Password string
    DBName   string
    SSLMode  string
}

func Load() (*Config, error) {
    port, err := strconv.Atoi(getEnv("SERVER_PORT", "8080"))
    if err != nil {
        return nil, fmt.Errorf("invalid SERVER_PORT: %w", err)
    }

    dbPort, err := strconv.Atoi(getEnv("DB_PORT", "5432"))
    if err != nil {
        return nil, fmt.Errorf("invalid DB_PORT: %w", err)
    }

    return &Config{
        Server: ServerConfig{
            Port: port,
        },
        Database: DatabaseConfig{
            Host:     getEnv("DB_HOST", "localhost"),
            Port:     dbPort,
            User:     getEnv("DB_USER", "postgres"),
            Password: getEnv("DB_PASSWORD", ""),
            DBName:   getEnv("DB_NAME", "app"),
            SSLMode:  getEnv("DB_SSLMODE", "disable"),
        },
    }, nil
}

func getEnv(key, defaultValue string) string {
    if value := os.Getenv(key); value != "" {
        return value
    }
    return defaultValue
}
```

---

## Testing

### Table-Driven Tests

```go
package repository

import (
    "context"
    "testing"
    "time"
)

func TestUserRepository_Create(t *testing.T) {
    db := setupTestDB(t)
    repo := NewUserRepository(db)

    tests := []struct {
        name    string
        user    *User
        wantErr bool
    }{
        {
            name: "valid user",
            user: &User{
                Email: "test@example.com",
                Name:  "Test User",
            },
            wantErr: false,
        },
        {
            name: "duplicate email",
            user: &User{
                Email: "existing@example.com",
                Name:  "Existing",
            },
            wantErr: true,
        },
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            ctx := context.Background()
            err := repo.Create(ctx, tt.user)

            if (err != nil) != tt.wantErr {
                t.Errorf("Create() error = %v, wantErr %v", err, tt.wantErr)
            }
        })
    }
}

func setupTestDB(t *testing.T) *sql.DB {
    t.Helper()
    // Setup test database connection
    db, err := NewPostgresDB(testConfig)
    if err != nil {
        t.Fatalf("Failed to setup test DB: %v", err)
    }
    t.Cleanup(func() { db.Close() })
    return db
}
```

---

## Best Practices

### Code Style

- Use `gofmt` or `goimports` for formatting
- Follow effective Go guidelines
- Use meaningful variable names
- Keep functions small and focused
- Document exported functions with comments

### Database

- Always use context for database operations
- Use prepared statements implicitly via `QueryRow`, `Exec`
- Set appropriate connection pool limits
- Handle `sql.ErrNoRows` explicitly
- Use transactions for multiple related operations

### HTTP

- Set timeouts on servers
- Implement graceful shutdown
- Use middleware for cross-cutting concerns
- Validate all input
- Return appropriate HTTP status codes

### Dependencies

- Use `go mod` for dependency management
- Pin dependency versions
- Regularly update dependencies
- Minimize external dependencies (prefer stdlib)

---

## Common Patterns

### Middleware

```go
func loggingMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        next.ServeHTTP(w, r)
        log.Printf(
            "%s %s %s",
            r.Method,
            r.URL.Path,
            time.Since(start),
        )
    })
}

// Usage
mux := http.NewServeMux()
handler := loggingMiddleware(mux)
```

### Context with Timeout

```go
ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
defer cancel()

user, err := repo.GetByID(ctx, id)
```

### Transactions

```go
tx, err := db.BeginTx(ctx, nil)
if err != nil {
    return err
}
defer tx.Rollback()

// Execute queries with tx
_, err = tx.ExecContext(ctx, query, args...)
if err != nil {
    return err
}

return tx.Commit()
```

---

## Quick Reference

| Task             | Pattern                                 |
| ---------------- | --------------------------------------- |
| HTTP Server      | `http.Server` with timeouts             |
| Routing          | `http.ServeMux` or `http.NewServeMux()` |
| JSON Response    | `json.NewEncoder(w).Encode()`           |
| DB Connection    | `sql.Open` + `db.Ping()`                |
| Query Single Row | `db.QueryRow().Scan()`                  |
| Query Multiple   | `db.Query()` + iterate rows             |
| Error Wrap       | `fmt.Errorf("context: %w", err)`        |
| Check Error      | `errors.Is(err, target)`                |
