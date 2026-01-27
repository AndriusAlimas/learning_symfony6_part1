# Symfony Docker Starter

This is a complete Symfony 6.4 web application starter kit running in Docker containers with PHP 8.2, Nginx, and easy-to-use npm scripts for development.

## What This Project Does

- **Symfony 6.4 Framework**: Modern PHP web framework for building web applications
- **Docker Containerization**: Everything runs in isolated containers for consistent development
- **PHP 8.2 + Nginx**: Fast web server setup optimized for Symfony
- **Supervisor**: Process manager to run PHP-FPM and Nginx together
- **Easy NPM Scripts**: Simple commands to manage your development environment

## Quick Start

### Using NPM Scripts (Recommended)

1. **Fresh start (clean build):**

   ```bash
   npm run fresh-start
   ```

2. **Just start existing containers:**

   ```bash
   npm run up
   ```

3. **Access the application:**
   - Symfony App: http://localhost:8080

## Services & Architecture

- **app**: Single container running:
  - PHP 8.2 (for Symfony application)
  - Nginx (web server)
  - Supervisor (process manager)
  - All necessary PHP extensions (MySQL PDO, GD, BCMath, etc.)

## Container Details

The Docker setup creates a single optimized container that includes:

- **PHP-FPM**: Handles PHP code execution
- **Nginx**: Serves HTTP requests and static files
- **Supervisor**: Manages both processes automatically
- **Composer**: PHP dependency manager (pre-installed)
- **Symfony Console**: Available for running commands

## NPM Scripts (Easy Commands)

| Command               | Description                                                           |
| --------------------- | --------------------------------------------------------------------- |
| `npm run fresh-start` | 🚀 Complete fresh start - cleans everything and rebuilds              |
| `npm run build`       | 🔨 Build containers without cache                                     |
| `npm run up`          | ⬆️ Start containers in detached mode                                  |
| `npm run down`        | ⬇️ Stop and remove containers                                         |
| `npm run stop`        | ⏹️ Stop containers (keep them for restart)                            |
| `npm run start`       | ▶️ Start existing stopped containers                                  |
| `npm run restart`     | 🔄 Quick restart (down + up)                                          |
| `npm run logs`        | 📋 View app container logs (follow mode)                              |
| `npm run shell`       | 🐚 Open bash shell in app container                                   |
| `npm run clean`       | 🧹 Remove containers, volumes, and unused images                      |
| `npm run clean-all`   | 🗑️ Deep clean - remove everything Docker related                      |
| `npm run status`      | 📊 Show container status                                              |
| `npm run composer`    | 📦 Run composer commands (e.g., `npm run composer install`)           |
| `npm run console`     | ⚡ Run Symfony console commands (e.g., `npm run console cache:clear`) |
| `npm run cache-clear` | 🗃️ Clear Symfony cache                                                |
| `npm run dev`         | 🔧 Start containers and follow logs                                   |

## Docker Commands (Manual)

### Start services

```bash
docker-compose up -d
```

### Stop services

```bash
docker-compose down
```

### View logs

```bash
docker-compose logs -f app
```

### Execute commands in the app container

```bash
docker-compose exec app bash
```

### Install Composer dependencies

```bash
docker-compose exec app composer install
```

### Clear Symfony cache

```bash
docker-compose exec app bin/console cache:clear
```

### Run Symfony commands

```bash
docker-compose exec app bin/console [command]
```

## Environment Variables

Copy `.env.docker` to `.env.local` and modify as needed for your local development environment.

## Ports

- **8080**: Symfony application

## Prerequisites

- **Docker Desktop**: Must be installed and running
- **Node.js & NPM**: For running the easy management scripts
- **Windows**: This setup is optimized for Windows with Docker Desktop

## Troubleshooting

### Docker Desktop Not Running

If you see errors like "cannot find file specified" or "docker daemon not running":

1. Start Docker Desktop from the Windows Start Menu
2. Wait for Docker to fully start (whale icon in system tray should be steady)
3. Try your command again

### Port Already in Use

If port 8080 is busy:

```bash
# Check what's using the port
netstat -ano | findstr :8080

# Stop the process or change the port in docker-compose.yml
```

### Permission Issues

If you encounter permission issues, run:

```bash
docker-compose exec app chown -R www-data:www-data /var/www/html/var
```

### Container Won't Start

```bash
# Check container status
npm run status

# View detailed logs
npm run logs

# Rebuild from scratch
npm run clean-all
npm run fresh-start
```
