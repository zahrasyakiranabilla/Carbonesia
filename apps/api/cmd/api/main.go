package main

import (
	"context"
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/apotek-asasi/absensi-api/internal/config"
	"github.com/apotek-asasi/absensi-api/internal/database"
	"github.com/apotek-asasi/absensi-api/internal/migration"
	"github.com/apotek-asasi/absensi-api/internal/server"
	"github.com/joho/godotenv"
)

func main() {
	// Load .env file
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using system environment")
	}

	// Load configuration
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("Failed to load config: %v", err)
	}

	// Database connection
	// Try DATABASE_URL first (Supabase), fallback to config-based connection
	var db *database.Database
	dbMode := os.Getenv("DB_MODE")
	if dbMode == "supabase" {
		db, err = database.NewFromURL("")
		if err != nil {
			log.Printf("Failed to connect using DATABASE_URL: %v, trying config...", err)
			db, err = database.NewFromConfig(cfg.Database)
		}
	} else {
		db, err = database.NewFromConfig(cfg.Database)
	}
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	defer db.Close()

	// Run migrations
	migrationRunner := migration.NewRunner(db.DB, "migrations")
	if err := migrationRunner.Run(context.Background()); err != nil {
		log.Fatalf("Failed to run migrations: %v", err)
	}

	// Setup dependencies
	deps := server.NewDependencies(cfg, db)

	// Setup server
	handler := server.RegisterRoutes(deps)

	// Create HTTP server
	srv := server.New(server.Config{
		Port:         cfg.Server.Port,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
		IdleTimeout:  60 * time.Second,
	}, handler)

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

	log.Printf("Server starting on port %s", cfg.Server.Port)
	if err := srv.Start(); err != nil {
		log.Fatalf("Server error: %v", err)
	}
}