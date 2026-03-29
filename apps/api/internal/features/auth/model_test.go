package auth

import (
	"testing"

	"github.com/apotek-asasi/absensi-api/internal/features/user"
)

func TestHashPassword(t *testing.T) {
	password := "testpassword123"

	hash, err := HashPassword(password)
	if err != nil {
		t.Fatalf("HashPassword failed: %v", err)
	}

	if hash == "" {
		t.Error("Hash should not be empty")
	}

	if hash == password {
		t.Error("Hash should not equal plaintext password")
	}
}

func TestVerifyPassword(t *testing.T) {
	password := "testpassword123"

	hash, err := HashPassword(password)
	if err != nil {
		t.Fatalf("HashPassword failed: %v", err)
	}

	// Correct password should verify
	if !VerifyPassword(password, hash) {
		t.Error("Correct password should verify")
	}

	// Wrong password should not verify
	if VerifyPassword("wrongpassword", hash) {
		t.Error("Wrong password should not verify")
	}
}

func TestVerifyPasswordDifferentHashes(t *testing.T) {
	password := "testpassword123"

	hash1, _ := HashPassword(password)
	hash2, _ := HashPassword(password)

	// Two hashes of same password should be different (bcrypt salt)
	if hash1 == hash2 {
		t.Error("Two hashes of same password should differ due to salt")
	}

	// Both should verify the password
	if !VerifyPassword(password, hash1) || !VerifyPassword(password, hash2) {
		t.Error("Both hashes should verify the password")
	}
}

func TestGenerateAccessToken(t *testing.T) {
	u := &user.User{
		ID:    "test-user-id",
		Email: "test@example.com",
		Role:  user.RoleStaff,
	}
	secret := "test-secret-key"

	token, err := GenerateAccessToken(u, secret)
	if err != nil {
		t.Fatalf("GenerateAccessToken failed: %v", err)
	}

	if token == "" {
		t.Error("Token should not be empty")
	}
}

func TestValidateToken(t *testing.T) {
	u := &user.User{
		ID:    "test-user-id",
		Email: "test@example.com",
		Role:  user.RoleStaff,
	}
	secret := "test-secret-key"

	token, err := GenerateAccessToken(u, secret)
	if err != nil {
		t.Fatalf("GenerateAccessToken failed: %v", err)
	}

	claims, err := ValidateToken(token, secret)
	if err != nil {
		t.Fatalf("ValidateToken failed: %v", err)
	}

	if claims.UserID != u.ID {
		t.Errorf("Expected UserID %s, got %s", u.ID, claims.UserID)
	}

	if claims.Email != u.Email {
		t.Errorf("Expected Email %s, got %s", u.Email, claims.Email)
	}

	if claims.Role != string(u.Role) {
		t.Errorf("Expected Role %s, got %s", u.Role, claims.Role)
	}
}

func TestValidateTokenWithWrongSecret(t *testing.T) {
	u := &user.User{
		ID:    "test-user-id",
		Email: "test@example.com",
		Role:  user.RoleStaff,
	}
	secret := "test-secret-key"

	token, _ := GenerateAccessToken(u, secret)

	// Validate with different secret should fail
	_, err := ValidateToken(token, "wrong-secret")
	if err == nil {
		t.Error("Validation with wrong secret should fail")
	}
}

func TestGenerateRefreshToken(t *testing.T) {
	token, hash, err := GenerateRefreshToken()
	if err != nil {
		t.Fatalf("GenerateRefreshToken failed: %v", err)
	}

	if token == "" {
		t.Error("Token should not be empty")
	}

	if hash == "" {
		t.Error("Hash should not be empty")
	}

	if token == hash {
		t.Error("Token and hash should be different (hash is bcrypt hashed)")
	}

	// Hash should verify the token
	if !VerifyPassword(token, hash) {
		t.Error("Hash should verify the token")
	}
}