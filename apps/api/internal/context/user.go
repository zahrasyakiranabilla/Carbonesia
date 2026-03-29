package context

import (
	"context"
)

type contextKey string

const (
	UserIDKey   contextKey = "user_id"
	UserRoleKey contextKey = "user_role"
	UserEmailKey contextKey = "user_email"
)

// SetUserID adds user ID to context
func SetUserID(ctx context.Context, userID string) context.Context {
	return context.WithValue(ctx, UserIDKey, userID)
}

// GetUserID extracts user ID from context
func GetUserID(ctx context.Context) (string, bool) {
	userID, ok := ctx.Value(UserIDKey).(string)
	return userID, ok
}

// SetUserRole adds user role to context
func SetUserRole(ctx context.Context, role string) context.Context {
	return context.WithValue(ctx, UserRoleKey, role)
}

// GetUserRole extracts role from context
func GetUserRole(ctx context.Context) (string, bool) {
	role, ok := ctx.Value(UserRoleKey).(string)
	return role, ok
}

// SetUserEmail adds user email to context
func SetUserEmail(ctx context.Context, email string) context.Context {
	return context.WithValue(ctx, UserEmailKey, email)
}

// GetUserEmail extracts email from context
func GetUserEmail(ctx context.Context) (string, bool) {
	email, ok := ctx.Value(UserEmailKey).(string)
	return email, ok
}

// SetUser adds all user info to context
func SetUser(ctx context.Context, userID, email, role string) context.Context {
	ctx = SetUserID(ctx, userID)
	ctx = SetUserEmail(ctx, email)
	ctx = SetUserRole(ctx, role)
	return ctx
}