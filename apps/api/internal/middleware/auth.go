package middleware

import (
	"net/http"
	"strings"

	"github.com/apotek-asasi/absensi-api/internal/context"
	"github.com/apotek-asasi/absensi-api/internal/entities"
	"github.com/apotek-asasi/absensi-api/internal/features/auth"
)

// RequireAuth validates JWT token and extracts user claims
func RequireAuth(jwtSecret string) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			authHeader := r.Header.Get("Authorization")
			if authHeader == "" {
				entities.Unauthorized(w, "Missing authorization header")
				return
			}

			// Extract token from "Bearer <token>"
			parts := strings.SplitN(authHeader, " ", 2)
			if len(parts) != 2 || parts[0] != "Bearer" {
				entities.Unauthorized(w, "Invalid authorization header format")
				return
			}

			token := parts[1]

			// Validate token
			claims, err := auth.ValidateToken(token, jwtSecret)
			if err != nil {
				if err == auth.ErrExpiredToken {
					entities.Unauthorized(w, "Token expired")
				} else {
					entities.Unauthorized(w, "Invalid token")
				}
				return
			}

			// Add user info to context
			ctx := context.SetUser(r.Context(), claims.UserID, claims.Email, claims.Role)
			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}

// RequireRole checks if user has required role
func RequireRole(roles ...string) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			userRole, ok := context.GetUserRole(r.Context())
			if !ok {
				entities.Unauthorized(w, "Unauthorized")
				return
			}

			// Check if user role is in allowed roles
			allowed := false
			for _, role := range roles {
				if userRole == role {
					allowed = true
					break
				}
			}

			if !allowed {
				entities.Forbidden(w, "Insufficient permissions")
				return
			}

			next.ServeHTTP(w, r)
		})
	}
}