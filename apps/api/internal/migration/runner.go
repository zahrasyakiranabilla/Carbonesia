package migration

import (
	"context"
	"database/sql"
	"fmt"
	"os"
	"path/filepath"
	"sort"
	"strings"
	"time"
)

type Runner struct {
	db       *sql.DB
	migrationsDir string
}

func NewRunner(db *sql.DB, migrationsDir string) *Runner {
	return &Runner{
		db:       db,
		migrationsDir: migrationsDir,
	}
}

// Run executes all pending migrations in order
func (r *Runner) Run(ctx context.Context) error {
	// Get list of migration files
	files, err := r.getMigrationFiles()
	if err != nil {
		return fmt.Errorf("failed to get migration files: %w", err)
	}

	// Get already executed migrations
	executed, err := r.getExecutedMigrations(ctx)
	if err != nil {
		return fmt.Errorf("failed to get executed migrations: %w", err)
	}

	// Run pending migrations
	for _, file := range files {
		name := filepath.Base(file)
		if executed[name] {
			continue
		}

		fmt.Printf("Running migration: %s\n", name)
		if err := r.runMigration(ctx, file, name); err != nil {
			return fmt.Errorf("failed to run migration %s: %w", name, err)
		}
		fmt.Printf("Completed: %s\n", name)
	}

	return nil
}

func (r *Runner) getMigrationFiles() ([]string, error) {
	var files []string

	entries, err := os.ReadDir(r.migrationsDir)
	if err != nil {
		return nil, err
	}

	for _, entry := range entries {
		if !entry.IsDir() && strings.HasSuffix(entry.Name(), ".sql") {
			files = append(files, filepath.Join(r.migrationsDir, entry.Name()))
		}
	}

	// Sort by filename (which starts with number)
	sort.Strings(files)
	return files, nil
}

func (r *Runner) getExecutedMigrations(ctx context.Context) (map[string]bool, error) {
	executed := make(map[string]bool)

	rows, err := r.db.QueryContext(ctx, "SELECT name FROM migrations_log")
	if err != nil {
		// If table doesn't exist, return empty map
		if strings.Contains(err.Error(), "does not exist") {
			return executed, nil
		}
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var name string
		if err := rows.Scan(&name); err != nil {
			return nil, err
		}
		executed[name] = true
	}

	return executed, rows.Err()
}

func (r *Runner) runMigration(ctx context.Context, file string, name string) error {
	// Read migration content
	content, err := os.ReadFile(file)
	if err != nil {
		return err
	}

	// Execute in transaction
	tx, err := r.db.BeginTx(ctx, nil)
	if err != nil {
		return err
	}
	defer tx.Rollback()

	// Execute migration SQL
	if _, err := tx.ExecContext(ctx, string(content)); err != nil {
		return err
	}

	// Record migration
	if _, err := tx.ExecContext(ctx,
		"INSERT INTO migrations_log (name, executed_at) VALUES ($1, $2)",
		name, time.Now(),
	); err != nil {
		return err
	}

	return tx.Commit()
}