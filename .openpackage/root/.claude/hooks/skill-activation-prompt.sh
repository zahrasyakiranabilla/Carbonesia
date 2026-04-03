#!/bin/bash
set -e

# Get the project directory from environment or use the script's location
# Script is at: .claude/hooks/skill-activation-prompt.sh
# Project dir is 2 levels up from the script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"

cd "$SCRIPT_DIR"
cat | CLAUDE_PROJECT_DIR="$PROJECT_DIR" npx tsx skill-activation-prompt.ts
