# Symfony Docker Starter

## 🚀 Automated Project Bootstrap (New Project Creation)

This project includes a script to automate creating a new project based on this starter, initializing a new git repository, and pushing it to GitHub.

### Usage

1. **Install GitHub CLI** (required):
	- Download and install from [GitHub CLI](https://cli.github.com/)
	- Ensure `gh` is available in your system PATH.

2. **Run the script:**
	- In your terminal, run:
	  ```
	  npm run fresh-start
	  ```
	- Or directly:
	  ```
	  node fresh-start-new-project.js
	  ```
	- The script will prompt you for a new project name and your GitHub username, then automate the rest.

3. **Authentication:**
	- If not already authenticated, the script will open your browser for GitHub authentication and resume automatically.

---
**Note:** The script requires the GitHub CLI (`gh`) to be installed and accessible in your PATH before running. If you encounter issues, ensure `gh` is installed and restart your terminal.

A complete Symfony 6.4 starter kit running in Docker with easy npm scripts for development.

## 🚀 Quick Start (Any Platform)

### Prerequisites

- **Docker Desktop** (Windows/Mac) or **Docker Engine** (Linux) - **REQUIRED**
- **Node.js & npm** - **REQUIRED**
- **Git** (to clone repository)

### One-Command Setup

```bash
git clone <your-repository-url>
cd symfony-docker-starter
npm run fresh-start
```

🎉 That's it! The application will be running at **http://localhost:8080**

The `fresh-start` script will:

- ✅ Check system requirements (Docker, Node.js)
- 📄 Set up environment files (.env.local)
- 🧹 Clean existing containers and images
- 🏗️ Build fresh Docker containers
- 🚀 Start the application
- 🏥 Perform health checks
- 📊 Show you useful commands

### Alternative Quick Start Options

```bash
npm run fresh-start:quick    # Skip cleanup for faster rebuilds
npm run fresh-start:no-cache # Force rebuild without Docker cache
npm run fresh-start --help   # Show detailed help
```

## 🖥️ Platform-Specific Notes

### Windows

- Requires **Docker Desktop for Windows**
- Use **PowerShell** or **Command Prompt**
- If you get line ending issues, run: `git config --global core.autocrlf input`

### macOS

- Requires **Docker Desktop for Mac**
- Use **Terminal**
- Commands work identically to Linux

### Linux

- Install **Docker Engine** and **Docker Compose**
- May need to add user to docker group: `sudo usermod -aG docker $USER`
- Logout and login again after adding to docker group

## 📋 Available Commands

| Command                        | Description                               |
| ------------------------------ | ----------------------------------------- |
| `npm run fresh-start`          | 🚀 **Complete fresh setup (recommended)** |
| `npm run fresh-start:quick`    | ⚡ Fresh start without cleanup (faster)   |
| `npm run fresh-start:no-cache` | 🔄 Force rebuild without cache            |
| `npm run setup`                | 🚀 Alias for fresh-start                  |
| `npm run setup:env`            | 📄 Create .env.local from example         |
| `npm run up`                   | ▶️ Start containers                       |
| `npm run down`                 | ⬇️ Stop and remove containers             |
| `npm run stop`                 | ⏹️ Stop containers (keep for restart)     |
| `npm run start`                | ▶️ Start stopped containers               |
| `npm run restart`              | 🔄 Restart containers                     |
| `npm run logs`                 | 📋 View container logs                    |
| `npm run shell`                | 🐚 Access container shell                 |
| `npm run status`               | 📊 Show container status                  |
| `npm run test:health`          | 🏥 Test if application is working         |
| `npm run check:docker`         | 🐳 Verify Docker is running               |
| `npm run clean`                | 🧹 Clean containers and volumes           |
| `npm run clean-all`            | 🗑️ Deep clean everything                  |

## 🔧 What's Included

- **Symfony 6.4** - Modern PHP framework
- **PHP 8.2** - Latest stable PHP version
- **Nginx** - High-performance web server
- **Supervisor** - Process manager
- **Composer** - PHP dependency manager
- **Docker** - Containerized environment

## 📁 Project Structure

```
symfony-docker-starter/
├── 📄 docker-compose.yml          # Container orchestration
├── 📄 Dockerfile                  # Container build instructions
├── 📄 package.json                # npm scripts for easy management
├── � fresh-start.js              # Node.js fresh start script
├── �📂 src/                        # Symfony application code
├── 📂 config/                     # Symfony configuration
├── 📂 public/                     # Web server document root
├── 📂 docker/                     # Docker configuration files
├── 📂 var/                        # Cache, logs (auto-generated)
└── 📂 vendor/                     # PHP dependencies (auto-generated)
```

## 🌍 Environment Configuration

The project uses Symfony's environment system:

- **`.env`** - Default values (committed to Git)
- **`.env.local`** - Local overrides (ignored by Git)
- **`.env.docker`** - Docker-specific settings

## 🔒 Security Notes

- The default `APP_SECRET` is for development only
- For production: generate a secure secret with `php bin/console secrets:generate-keys`
- Never commit real credentials to Git

## � Troubleshooting

### Common Issues and Solutions

#### "Docker is not running"

- **Windows/Mac**: Start Docker Desktop from your applications
- **Linux**: Run `sudo systemctl start docker`

#### "Permission denied" on Linux

- Add your user to docker group: `sudo usermod -aG docker $USER`
- Log out and back in, or run `newgrp docker`

#### "Port 8080 already in use"

- Stop other applications using port 8080
- Or change the port in [docker-compose.yml](docker-compose.yml) line with `ports: - "8080:80"`

#### "npm command not found"

- Install Node.js from https://nodejs.org/
- Restart your terminal after installation

#### Application not accessible after setup

- Wait 30 seconds for containers to fully start
- Run `npm run logs` to check for errors
- Run `npm run status` to verify containers are running

#### Fresh clone issues

- Always run `npm run setup` for new clones
- This creates necessary `.env.local` file and runs health checks

## 🛠️ Development Workflow

1. **Clone repository**
2. **Run `npm run fresh-start`** (first time setup)
3. **Start coding in `src/` folder**
4. **Access application at http://localhost:8080**
5. **Use `npm run logs` to monitor**
6. **Use `npm run shell` for container access**
7. **Edit code** in `src/` directory
8. **Refresh browser** to see changes
9. **Use `npm run logs`** for debugging
10. **Run `npm run stop`** when done

## 🚨 Troubleshooting

### Common Issues and Solutions

#### "Docker is not running"

- **Windows/Mac**: Start Docker Desktop from your applications
- **Linux**: Run `sudo systemctl start docker`
- Verify with: `npm run check:docker`

#### "Port 8080 already in use"

- Stop other applications using port 8080
- Or change the port in [docker-compose.yml](docker-compose.yml) line with `ports: - "8080:80"`

#### "npm command not found"

- Install Node.js from https://nodejs.org/
- Restart your terminal after installation

#### Application not accessible after setup

- Wait 30 seconds for containers to fully start
- Run `npm run logs` to check for errors
- Run `npm run status` to verify containers are running
- Run `npm run test:health` to verify application health

#### Fresh clone issues

- Always run `npm run fresh-start` for new clones
- This automatically creates necessary `.env.local` file and runs health checks
- The script will guide you through any missing requirements

#### Container issues

- Run `npm run clean` to clean containers and volumes
- Run `npm run clean-all` for deep cleaning
- Then run `npm run fresh-start` to rebuild

## 📚 Learning Resources

- **Symfony Documentation**: https://symfony.com/doc
- **Docker Documentation**: https://docs.docker.com
- **PHP Documentation**: https://php.net/docs.php

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with `npm run fresh-start`
5. Submit a pull request

---

**Ready to code?** Run `npm run fresh-start` and visit http://localhost:8080! 🎉
