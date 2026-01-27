# Fresh Start Script Documentation

## Overview

The `fresh-start.js` script is the main entry point for setting up and running this Symfony Docker project. It replaces the old `start.sh` and `start.bat` files with a unified Node.js solution that works across all platforms.

## Usage

### Basic Usage

```bash
npm run fresh-start
```

### Quick Options

```bash
npm run fresh-start:quick    # Skip cleanup for faster rebuilds
npm run fresh-start:no-cache # Force rebuild without Docker cache
```

### Direct Script Usage

```bash
node fresh-start.js [options]
```

## Options

- `--skip-cleanup` - Skip Docker cleanup phase (faster for development)
- `--no-cache` - Force Docker rebuild without cache
- `--help` - Show detailed help information

## What It Does

The fresh-start script performs the following operations:

1. **🔵 System Check** - Validates Docker and Node.js are available
2. **📄 Environment Setup** - Creates `.env.local` from `.env.example` if needed
3. **🧹 Cleanup** (optional) - Removes existing containers, volumes, and images
4. **🏗️ Build** - Builds Docker containers (with optional cache busting)
5. **🚀 Start** - Starts the application containers
6. **🏥 Health Check** - Verifies the application is responding at http://localhost:8080
7. **📊 Success** - Shows useful next steps and commands

## Environment Files

The script automatically manages environment files:

- If `.env.local` doesn't exist, it copies from `.env.example`
- If `.env.example` doesn't exist, it creates a basic one with a random `APP_SECRET`
- All sensitive configuration should go in `.env.local` (which is git-ignored)

## Error Handling

The script provides detailed error messages and suggestions:

- Missing Docker installation
- Docker not running
- Port conflicts
- Container build failures
- Health check timeouts

## Development Workflow

1. **Fresh Clone**: `npm run fresh-start`
2. **Development**: Code changes are reflected immediately (mounted volumes)
3. **Rebuild**: `npm run fresh-start:quick` (skips cleanup)
4. **Clean Rebuild**: `npm run fresh-start` (full cleanup and rebuild)

## Integration with package.json

The script integrates with npm scripts:

- `npm run fresh-start` - Main script
- `npm run fresh-start:quick` - Quick variant
- `npm run fresh-start:no-cache` - No-cache variant
- `npm run setup` - Alias for fresh-start

## Cross-Platform Compatibility

The script works identically on:

- Windows (PowerShell, Command Prompt, Git Bash)
- macOS (Terminal)
- Linux (Bash, Zsh, etc.)

## Requirements

- Node.js (any recent version)
- Docker Desktop (Windows/Mac) or Docker Engine (Linux)
- Docker Compose

## Troubleshooting

Run with `--help` for detailed troubleshooting information:

```bash
node fresh-start.js --help
```

Common solutions:

- Docker not running: Start Docker Desktop
- Port 8080 in use: Stop other applications or change port in docker-compose.yml
- Permission issues: Add user to docker group on Linux
