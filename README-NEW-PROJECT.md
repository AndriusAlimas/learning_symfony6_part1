# 🚀 Symfony Docker Starter - New Project Creator

This enhanced version of the Symfony Docker Starter includes a powerful project creation feature that automatically sets up new projects with GitHub integration.

## Features

### Original Fresh Start (Development)

- Complete environment setup and validation
- Docker container management
- Dependency installation
- Health checks
- Development-ready Symfony application

### NEW: Project Creator (Production)

- **Interactive project setup** - asks for project name and GitHub username
- **Automatic project copying** - creates a clean copy in a new directory
- **Configuration updates** - updates package.json, composer.json, and README
- **Git initialization** - sets up repository with initial commit
- **GitHub integration** - automatically creates GitHub repository and pushes code
- **Complete Docker setup** - builds and starts the application
- **Health verification** - ensures everything is working

## Quick Start

### For Development (Current Project)

```bash
# Start development environment
npm run fresh-start

# Quick restart (skip cleanup)
npm run fresh-start:quick

# Force rebuild without cache
npm run fresh-start:no-cache
```

### For New Projects

```bash
# Create a completely new project
npm run new-project
```

## New Project Creation Process

When you run `npm run new-project`, the script will:

1. **📝 Ask for project details:**
   - Project name (will be used for directory and repository name)
   - GitHub username

2. **🔧 Validate system requirements:**
   - Node.js, Git, Docker, Docker Compose
   - GitHub CLI (optional but recommended)

3. **📁 Copy and prepare project:**
   - Creates new directory with your project name
   - Copies all necessary files (excludes cache, logs, etc.)
   - Updates configuration files with your project details

4. **🔀 Initialize Git repository:**
   - Creates new Git repo
   - Adds all files and makes initial commit
   - Creates proper .gitignore file

5. **🐙 Create GitHub repository:**
   - Automatically creates public GitHub repository
   - Sets up remote origin
   - Pushes initial code to GitHub

6. **🐳 Setup Docker environment:**
   - Installs Composer dependencies
   - Builds Docker containers
   - Starts the application

7. **🏥 Health check:**
   - Verifies application is running correctly
   - Provides success summary with next steps

## System Requirements

- **Node.js** (v14 or higher)
- **Git** (for version control)
- **Docker & Docker Compose** (for containerization)
- **GitHub CLI** (optional but recommended for automatic repo creation)
- **Composer** (optional - will install in container if not available locally)

## GitHub CLI Setup (Recommended)

For automatic GitHub repository creation, install and authenticate GitHub CLI:

```bash
# Install GitHub CLI (Windows with Chocolatey)
choco install gh

# Or download from: https://cli.github.com/

# Authenticate with GitHub
gh auth login
```

Without GitHub CLI, the script will provide instructions to create the repository manually.

## Example Usage

```bash
$ npm run new-project

🚀 Welcome to Symfony Docker Starter - New Project Creator!

📝 Enter your new project name: my-awesome-app
🐙 Enter your GitHub username: johndoe

📋 Project Configuration:
   Project Name: my-awesome-app
   GitHub User: johndoe
   Project Path: C:\MyProjects\my-awesome-app
   Application URL: http://localhost:8080

✅ Continue with this configuration? (y/N): y

🔵 Checking system requirements...
✅ Node.js version: v18.17.0
✅ Git is available
✅ GitHub CLI is available
✅ Docker is running
✅ Docker Compose is available

📁 Copying project to C:\MyProjects\my-awesome-app...
✅ Project copied successfully

🔧 Updating project configuration files...
✅ Updated package.json
✅ Updated composer.json
✅ Created/Updated README.md

🔀 Initializing Git repository...
✅ Created .gitignore
✅ Git repository initialized with initial commit

🐙 Creating GitHub repository...
✅ GitHub repository created: https://github.com/johndoe/my-awesome-app

🔧 Installing Composer dependencies...
✅ Composer dependencies installed

🐳 Building and starting Docker containers...
✅ Docker containers started successfully

🏥 Performing health check...
✅ Application is responding at http://localhost:8080

🎉 SUCCESS! Your new project 'my-awesome-app' is ready!

📁 Project Location: C:\MyProjects\my-awesome-app
🌐 Application URL: http://localhost:8080
🐙 GitHub Repository: https://github.com/johndoe/my-awesome-app
⏱️  Setup completed in 45 seconds
```

## Project Structure Created

```
my-awesome-app/
├── docker/                 # Docker configuration
├── src/                    # Symfony application source
├── config/                 # Symfony configuration
├── public/                 # Web root
├── composer.json           # Updated with project name
├── package.json            # Updated with project name
├── docker-compose.yml      # Docker services
├── Dockerfile              # PHP container setup
├── README.md               # Project-specific README
├── .gitignore             # Git ignore rules
└── fresh-start.js         # Development setup script
```

## Available Commands (In New Project)

Once your project is created, navigate to the project directory and use:

```bash
cd my-awesome-app

# Development
npm run fresh-start         # Complete setup
npm run logs               # View application logs
npm run shell              # Access container terminal
npm run status             # Check container status

# Container management
npm run stop               # Stop containers
npm run start              # Start containers
npm run restart            # Restart containers
npm run clean              # Clean restart

# Symfony development
npm run composer install package-name
npm run console make:controller
npm run console make:entity
npm run console doctrine:migrations:migrate
```

## Troubleshooting

### GitHub Authentication Issues

If you get GitHub authentication errors:

```bash
gh auth login
# Follow the prompts to authenticate
```

### Docker Issues

Ensure Docker Desktop is running:

```bash
docker info
# Should return Docker system information
```

### Port Conflicts

If port 8080 is in use, the script will show an error. Stop other services or modify `docker-compose.yml` to use a different port.

### Permission Issues

On Windows, run PowerShell/Command Prompt as Administrator if you encounter permission issues.

## What's Different from Original

| Feature            | Original fresh-start.js               | New fresh-start-new-project.js   |
| ------------------ | ------------------------------------- | -------------------------------- |
| Purpose            | Setup current project for development | Create new project copy          |
| User Input         | None (uses current directory)         | Project name, GitHub username    |
| Project Location   | Current directory                     | New directory with project name  |
| Git Repository     | Uses existing or none                 | Creates new repo + GitHub repo   |
| Configuration      | Uses existing files                   | Updates all config files         |
| GitHub Integration | None                                  | Automatic repo creation and push |

## Contributing

This project welcomes contributions! Feel free to:

- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## License

MIT License - see LICENSE file for details.
