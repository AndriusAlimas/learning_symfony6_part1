# 🔧 Repository Setup Checklist

This checklist ensures your Symfony Docker project works on any computer when cloned from Git.

## ✅ Files That Must Be Committed to Git

### Essential Configuration

- [x] `docker-compose.yml` - Container orchestration
- [x] `Dockerfile` - Container build instructions
- [x] `package.json` - npm scripts for easy management
- [x] `.env` - Default environment variables
- [x] `.env.example` - Template for local environment
- [x] `.gitignore` - Proper Git ignore patterns
- [x] `.dockerignore` - Docker build ignore patterns

### Application Code

- [x] `src/` - Symfony application source code
- [x] `config/` - Symfony configuration files
- [x] `public/index.php` - Application entry point
- [x] `composer.json` - PHP dependencies
- [x] `composer.lock` - Exact PHP dependency versions

### Docker Configuration

- [x] `docker/nginx/default.conf` - Nginx web server config
- [x] `docker/supervisor/supervisord.conf` - Process manager config
- [x] `docker/php/local.ini` - PHP configuration

### Documentation & Scripts

- [x] `README.md` - Main project documentation
- [x] `README-Docker.md` - Docker-specific docs
- [x] `SETUP-GUIDE-FOR-BEGINNERS.md` - Detailed setup guide
- [x] `start.sh` - Unix startup script
- [x] `start.bat` - Windows startup script

## ❌ Files That Should NOT Be Committed

### Generated/Cache Files

- [x] `var/cache/` - Symfony cache (regenerated)
- [x] `var/log/` - Application logs
- [x] `vendor/` - PHP dependencies (downloaded by Composer)
- [x] `node_modules/` - Node.js dependencies (if added later)

### Environment-Specific

- [x] `.env.local` - Local environment overrides
- [x] `.env.*.local` - Environment-specific local files
- [x] `docker-compose.override.yml` - Local docker overrides

### Development Files

- [x] `.vscode/` - VS Code settings
- [x] `.idea/` - PhpStorm settings
- [x] `*.log` - Log files
- [x] `supervisord.pid` - Process ID files

## 🌍 Cross-Platform Compatibility Checks

### Path Separators

- [x] All Docker paths use forward slashes (/)
- [x] No hardcoded Windows (C:\) or Unix (/home/) paths
- [x] Volume mounts use relative paths

### Line Endings

- [x] Scripts use Unix line endings (LF)
- [x] Git configured to handle line endings properly
- [x] `.gitattributes` not needed (Docker handles it)

### Permissions

- [x] Shell scripts are executable (Git handles this)
- [x] Docker handles internal file permissions
- [x] No hardcoded user/group IDs

### Environment Variables

- [x] No platform-specific environment variables
- [x] Default secrets are safe for development
- [x] Production secrets documented but not committed

## 🚀 Testing on Fresh Machine

To test if your repository works on a clean machine:

```bash
# Clone to a new location
git clone <your-repo-url> test-clone
cd test-clone

# Test the setup
npm run fresh-start

# Should work without any additional setup
curl http://localhost:8080
```

## 📋 Before Pushing to GitHub

1. **Test locally**: `npm run fresh-start` works
2. **Check .gitignore**: No unnecessary files staged
3. **Verify secrets**: No production secrets committed
4. **Test ports**: Application accessible at http://localhost:8080
5. **Check documentation**: README files are up to date

## 🔍 Common Issues & Solutions

### "Docker not running"

- **Solution**: Start Docker Desktop (Windows/Mac) or Docker service (Linux)
- **Check**: `docker info` should work without errors

### "npm command not found"

- **Solution**: Install Node.js from nodejs.org
- **Check**: `npm --version` should show version number

### "Permission denied" (Linux/Mac)

- **Solution**: Add user to docker group: `sudo usermod -aG docker $USER`
- **Check**: Logout and login again

### "Port 8080 in use"

- **Solution**: Change port in `docker-compose.yml` or stop other service
- **Check**: `netstat -an | grep 8080` (Windows) or `lsof -i :8080` (Mac/Linux)

---

**✅ Repository Status**: Ready for cloning and running on any platform with Docker and Node.js!
