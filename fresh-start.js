#!/usr/bin/env node

/**
 * Fresh Start Script for Symfony Docker Starter
 *
 * This script provides a complete fresh setup for the project including:
 * - Environment validation and setup
 * - Docker container management
 * - Dependency management
 * - Health checks
 *
 * Usage: node fresh-start.js [options]
 * Options:
 *   --skip-cleanup    Skip Docker cleanup (faster for development)
 *   --no-cache        Force rebuild without cache
 *   --help            Show help information
 */

const { execSync, spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const http = require("http");

// Configuration
const CONFIG = {
  APP_URL: "http://localhost:8080",
  HEALTH_CHECK_TIMEOUT: 30000,
  HEALTH_CHECK_INTERVAL: 2000,
  ENV_EXAMPLE: ".env.example",
  ENV_LOCAL: ".env.local",
};

// CLI Arguments
const args = process.argv.slice(2);
const options = {
  skipCleanup: args.includes("--skip-cleanup"),
  noCache: args.includes("--no-cache"),
  help: args.includes("--help"),
};

class FreshStartManager {
  constructor() {
    this.startTime = Date.now();
  }

  log(message, type = "info") {
    const timestamp = new Date().toLocaleTimeString();
    const icons = {
      info: "🔵",
      success: "✅",
      error: "❌",
      warning: "⚠️",
      rocket: "🚀",
      gear: "🔧",
      docker: "🐳",
      clean: "🧹",
      build: "🏗️",
      health: "🏥",
    };
    console.log(`${icons[type] || "📋"} [${timestamp}] ${message}`);
  }

  async exec(command, options = {}) {
    const { silent = false, cwd = process.cwd() } = options;

    if (!silent) {
      this.log(`Executing: ${command}`, "gear");
    }

    try {
      const output = execSync(command, {
        cwd,
        encoding: "utf-8",
        stdio: silent ? "pipe" : "inherit",
      });
      return output;
    } catch (error) {
      if (!silent) {
        this.log(`Command failed: ${command}`, "error");
        this.log(`Error: ${error.message}`, "error");
      }
      throw error;
    }
  }

  showHelp() {
    console.log(`
🚀 Symfony Docker Starter - Fresh Start Script

This script provides a complete fresh setup for your Symfony Docker project.

USAGE:
  node fresh-start.js [options]

OPTIONS:
  --skip-cleanup    Skip Docker cleanup (faster for development rebuilds)
  --no-cache        Force rebuild containers without cache
  --help           Show this help information

WHAT THIS SCRIPT DOES:
  1. ✅ Validates system requirements (Docker, Node.js)
  2. 📋 Sets up environment files (.env.local)
  3. 📦 Installs Composer dependencies locally
  4. 🧹 Cleans up existing Docker resources (optional)
  5. 🏗️  Builds Docker containers
  6. 🚀 Starts the application
  7. 🏥 Performs health checks
  8. 📊 Shows useful management commands

AFTER SETUP:
  - Application: ${CONFIG.APP_URL}
  - Logs: npm run logs
  - Shell: npm run shell
  - Stop: npm run stop

        `);
  }

  async checkSystemRequirements() {
    this.log("Checking system requirements...", "gear");

    // Check Node.js
    try {
      const nodeVersion = await this.exec("node --version", { silent: true });
      this.log(`Node.js version: ${nodeVersion.trim()}`, "success");
    } catch (error) {
      this.log("Node.js is not installed or not in PATH", "error");
      throw new Error(
        "Node.js is required. Please install from https://nodejs.org/",
      );
    }

    // Check Docker
    try {
      await this.exec("docker info", { silent: true });
      this.log("Docker is running", "success");
    } catch (error) {
      this.log("Docker is not running or not installed", "error");
      throw new Error(
        "Docker is required and must be running. Please start Docker Desktop.",
      );
    }

    // Check docker-compose
    try {
      await this.exec("docker-compose --version", { silent: true });
      this.log("Docker Compose is available", "success");
    } catch (error) {
      // Try docker compose (newer syntax)
      try {
        await this.exec("docker compose version", { silent: true });
        this.log("Docker Compose is available", "success");
      } catch (error2) {
        this.log("Docker Compose is not available", "error");
        throw new Error("Docker Compose is required.");
      }
    }
  }

  async setupEnvironment() {
    this.log("Setting up environment files...", "gear");

    if (!fs.existsSync(CONFIG.ENV_EXAMPLE)) {
      this.log(
        `${CONFIG.ENV_EXAMPLE} not found, creating basic one...`,
        "warning",
      );
      const basicEnv = `###> symfony/framework-bundle ###
APP_ENV=dev
APP_SECRET=${this.generateSecret()}
###< symfony/framework-bundle ###
`;
      fs.writeFileSync(CONFIG.ENV_EXAMPLE, basicEnv);
      this.log(`Created ${CONFIG.ENV_EXAMPLE}`, "success");
    }

    if (!fs.existsSync(CONFIG.ENV_LOCAL)) {
      fs.copyFileSync(CONFIG.ENV_EXAMPLE, CONFIG.ENV_LOCAL);
      this.log(
        `Created ${CONFIG.ENV_LOCAL} from ${CONFIG.ENV_EXAMPLE}`,
        "success",
      );
    } else {
      this.log(`${CONFIG.ENV_LOCAL} already exists`, "success");
    }
  }

  async installComposerDependencies() {
    this.log("Installing Composer dependencies locally...", "gear");

    // Check if Composer is available
    try {
      await this.exec("composer --version", { silent: true });
      this.log("Composer is available", "success");
    } catch (error) {
      this.log(
        "Composer not found locally, will install dependencies in container",
        "warning",
      );
      return;
    }

    try {
      // Clean any existing vendor directory to ensure fresh install
      if (fs.existsSync("vendor")) {
        this.log("Cleaning existing vendor directory...", "clean");
        fs.rmSync("vendor", { recursive: true, force: true });
      }

      // Install dependencies
      await this.exec(
        "composer install --no-interaction --optimize-autoloader",
      );

      // Dump autoload to ensure all files are generated
      await this.exec("composer dump-autoload --optimize");

      // Verify that autoload_runtime.php was created
      if (fs.existsSync("vendor/autoload_runtime.php")) {
        this.log(
          "Composer dependencies and autoload files created successfully",
          "success",
        );
      } else {
        this.log(
          "Warning: autoload_runtime.php not found, trying to regenerate...",
          "warning",
        );

        // Try to regenerate symfony recipes
        await this.exec("composer recipes:install --force --reset");

        if (!fs.existsSync("vendor/autoload_runtime.php")) {
          throw new Error("Could not generate autoload_runtime.php file");
        }
      }
    } catch (error) {
      this.log(
        `Failed to install Composer dependencies locally: ${error.message}`,
        "error",
      );
      this.log(
        "Dependencies will be installed inside the container",
        "warning",
      );
    }
  }

  generateSecret() {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let result = "";
    for (let i = 0; i < 32; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  async cleanupDocker() {
    if (options.skipCleanup) {
      this.log("Skipping Docker cleanup as requested", "warning");
      return;
    }

    this.log("Cleaning up existing Docker resources...", "clean");

    try {
      // Stop and remove containers, volumes, and networks
      await this.exec("docker-compose down -v --remove-orphans");

      // Clean up dangling images and build cache
      await this.exec("docker system prune -f");

      // Clean up volumes
      await this.exec("docker volume prune -f");

      this.log("Docker cleanup completed", "success");
    } catch (error) {
      this.log(
        "Some cleanup commands failed (this is often normal)",
        "warning",
      );
    }
  }

  async buildContainers() {
    this.log("Building Docker containers...", "build");

    const buildCommand = options.noCache
      ? "docker-compose build --no-cache"
      : "docker-compose build";

    await this.exec(buildCommand);
    this.log("Container build completed", "success");
  }

  async startApplication() {
    this.log("Starting application containers...", "docker");
    await this.exec("docker-compose up -d");
    this.log("Application containers started", "success");
  }

  async performHealthCheck() {
    this.log("Performing health check...", "health");

    const startTime = Date.now();
    const timeout = CONFIG.HEALTH_CHECK_TIMEOUT;

    return new Promise((resolve, reject) => {
      const checkHealth = () => {
        if (Date.now() - startTime > timeout) {
          reject(new Error(`Health check timeout after ${timeout}ms`));
          return;
        }

        const req = http.get(CONFIG.APP_URL, (res) => {
          if (res.statusCode === 200) {
            this.log(
              `Application is responding at ${CONFIG.APP_URL}`,
              "success",
            );
            resolve();
          } else {
            this.log(`Got HTTP ${res.statusCode}, retrying...`, "warning");
            setTimeout(checkHealth, CONFIG.HEALTH_CHECK_INTERVAL);
          }
        });

        req.on("error", (error) => {
          this.log("Health check failed, retrying...", "warning");
          setTimeout(checkHealth, CONFIG.HEALTH_CHECK_INTERVAL);
        });

        req.setTimeout(5000, () => {
          req.destroy();
          setTimeout(checkHealth, CONFIG.HEALTH_CHECK_INTERVAL);
        });
      };

      // Wait a bit before starting health checks
      setTimeout(checkHealth, 3000);
    });
  }

  showSuccess() {
    const duration = Math.round((Date.now() - this.startTime) / 1000);

    console.log(`
🎉 SUCCESS! Your Symfony Docker application is ready!

🌐 Application URL: ${CONFIG.APP_URL}
⏱️  Setup completed in ${duration} seconds

📋 Useful commands:
  npm run logs      - View application logs
  npm run shell     - Access container terminal  
  npm run status    - Check container status
  npm run stop      - Stop containers
  npm run restart   - Restart containers
  npm run clean     - Clean restart with fresh containers

🔧 Direct Docker commands:
  docker-compose logs -f app        - Follow logs
  docker-compose exec app bash      - Container shell
  docker-compose exec app composer  - Run Composer
  docker-compose exec app bin/console - Symfony console

Happy coding! 🚀
        `);
  }

  async run() {
    try {
      if (options.help) {
        this.showHelp();
        return;
      }

      this.log("Starting fresh setup for Symfony Docker project...", "rocket");

      await this.checkSystemRequirements();
      await this.setupEnvironment();
      await this.installComposerDependencies();
      await this.cleanupDocker();
      await this.buildContainers();
      await this.startApplication();
      await this.performHealthCheck();

      this.showSuccess();
    } catch (error) {
      this.log(`Setup failed: ${error.message}`, "error");
      this.log("Please check the error above and try again.", "error");

      // Show current container status for debugging
      try {
        console.log("\n📊 Current container status:");
        await this.exec("docker-compose ps");
      } catch (e) {
        // Ignore errors when showing status
      }

      process.exit(1);
    }
  }
}

// Handle SIGINT (Ctrl+C)
process.on("SIGINT", () => {
  console.log("\n🛑 Setup interrupted by user");
  process.exit(1);
});

// Run the fresh start manager
const manager = new FreshStartManager();
manager.run();
