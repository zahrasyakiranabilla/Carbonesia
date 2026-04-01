package config

import (
	"os"
	"strconv"
)

type Config struct {
	Server   ServerConfig
	Database DatabaseConfig
	Auth     AuthConfig
}

type AuthConfig struct {
	JWTSecret string
}

type ServerConfig struct {
	Port string
}

type DatabaseConfig struct {
	Host            string
	Port            int
	User            string
	Password        string
	DBName          string
	SSLMode         string
	MaxOpenConns    int
	MaxIdleConns    int
	ConnMaxLifetime int
	ConnMaxIdleTime int
}

func Load() (*Config, error) {
	serverPort := getEnv("SERVER_PORT", "8080")

	// Database mode toggle: "local" or "supabase"
	dbMode := getEnv("DB_MODE", "local")

	var dbHost, dbUser, dbPassword, dbName, dbSSLMode string
	var dbPort int

	if dbMode == "supabase" {
		dbHost = getEnv("SUPABASE_DB_HOST", "")
		dbPort = getEnvInt("SUPABASE_DB_PORT", 5432)
		dbUser = getEnv("SUPABASE_DB_USER", "postgres")
		dbPassword = getEnv("SUPABASE_DB_PASSWORD", "")
		dbName = getEnv("SUPABASE_DB_NAME", "postgres")
		dbSSLMode = getEnv("SUPABASE_DB_SSLMODE", "require")
	} else {
		// Default to local
		dbHost = getEnv("LOCAL_DB_HOST", "localhost")
		dbPort = getEnvInt("LOCAL_DB_PORT", 5432)
		dbUser = getEnv("LOCAL_DB_USER", "postgres")
		dbPassword = getEnv("LOCAL_DB_PASSWORD", "postgres")
		dbName = getEnv("LOCAL_DB_NAME", "apotek_asasi")
		dbSSLMode = getEnv("LOCAL_DB_SSLMODE", "disable")
	}

	maxOpenConns, _ := strconv.Atoi(getEnv("DB_MAX_OPEN_CONNS", "25"))
	maxIdleConns, _ := strconv.Atoi(getEnv("DB_MAX_IDLE_CONNS", "5"))
	connMaxLifetime, _ := strconv.Atoi(getEnv("DB_CONN_MAX_LIFETIME", "300"))
	connMaxIdleTime, _ := strconv.Atoi(getEnv("DB_CONN_MAX_IDLE_TIME", "120"))

	return &Config{
		Server: ServerConfig{
			Port: serverPort,
		},
		Database: DatabaseConfig{
			Host:            dbHost,
			Port:            dbPort,
			User:            dbUser,
			Password:        dbPassword,
			DBName:          dbName,
			SSLMode:         dbSSLMode,
			MaxOpenConns:   maxOpenConns,
			MaxIdleConns:    maxIdleConns,
			ConnMaxLifetime: connMaxLifetime,
			ConnMaxIdleTime: connMaxIdleTime,
		},
		Auth: AuthConfig{
			JWTSecret: getEnv("JWT_SECRET", "dev-secret-change-in-production"),
		},
	}, nil
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

func getEnvInt(key string, defaultValue int) int {
	if value := os.Getenv(key); value != "" {
		if i, err := strconv.Atoi(value); err == nil {
			return i
		}
	}
	return defaultValue
}