#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { execSync } = require("child_process");

async function prompt(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) =>
    rl.question(question, (ans) => {
      rl.close();
      resolve(ans.trim());
    }),
  );
}

function copyDir(src, dest, exclude = []) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (const item of fs.readdirSync(src)) {
    if (exclude.includes(item)) continue;
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    if (fs.statSync(srcPath).isDirectory()) copyDir(srcPath, destPath, exclude);
    else fs.copyFileSync(srcPath, destPath);
  }
}

function checkGhInstalled() {
  try {
    execSync("gh --version", { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

async function main() {
  if (!checkGhInstalled()) {
    console.log("\n❌ GitHub CLI (gh) is not installed.");
    console.log("Please install it from https://cli.github.com/");
    console.log("Or on Windows: winget install --id GitHub.cli");
    process.exit(1);
  }
  console.log("\n🚀 Symfony Docker Starter - New Project Creator\n");
  let projectName = "";
  while (!projectName) {
    projectName = await prompt("📝 Enter new project name: ");
    if (!/^[a-zA-Z0-9_-]+$/.test(projectName)) {
      console.log(
        "❌ Only letters, numbers, hyphens, and underscores allowed.",
      );
      projectName = "";
    }
  }
  let githubUser = "";
  while (!githubUser) {
    githubUser = await prompt("🐙 Enter your GitHub username: ");
  }
  const newPath = path.resolve("..", projectName);
  if (fs.existsSync(newPath)) {
    console.log(`❌ Directory ${newPath} already exists.`);
    process.exit(1);
  }
  // Copy project
  copyDir(process.cwd(), newPath, [
    "node_modules",
    ".git",
    "vendor",
    "var",
    "supervisord.pid",
    ".env.local",
  ]);
  // Update package.json
  const pkgPath = path.join(newPath, "package.json");
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath));
    pkg.name = projectName;
    pkg.description = `${projectName} - Symfony Docker Application`;
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
  }
  // Update composer.json with valid name (vendor/project)
  const compPath = path.join(newPath, "composer.json");
  if (fs.existsSync(compPath)) {
    const comp = JSON.parse(fs.readFileSync(compPath));
    // Ensure name is lowercase and valid
    const safeUser = githubUser.toLowerCase().replace(/[^a-z0-9-_.]/g, "");
    const safeProject = projectName.toLowerCase().replace(/[^a-z0-9-_.]/g, "");
    comp.name = `${safeUser}/${safeProject}`;
    comp.description = `${projectName} - Symfony Docker Application`;
    fs.writeFileSync(compPath, JSON.stringify(comp, null, 2));
  }
  // Git init
  process.chdir(newPath);
  execSync("git init", { stdio: "inherit" });
  execSync("git add .", { stdio: "inherit" });
  execSync('git commit -m "Initial commit"', { stdio: "inherit" });
  // GitHub CLI auth check
  try {
    execSync("gh auth status", { stdio: "ignore" });
  } catch {
    console.log("\n🔐 GitHub authentication required. Opening browser...");
    try {
      execSync("gh auth login --web", { stdio: "inherit" });
    } catch {
      console.log("❌ Authentication failed. Please run: gh auth login");
      process.exit(1);
    }
  }
  // Create GitHub repo
  try {
    execSync(
      `gh repo create ${githubUser}/${projectName} --public --source=. --remote=origin --push`,
      { stdio: "inherit" },
    );
    console.log(
      `\n✅ Project pushed to https://github.com/${githubUser}/${projectName}`,
    );
  } catch (e) {
    console.log(
      "❌ Failed to create or push to GitHub repo. You may need to do it manually.",
    );
  }
  console.log("\n🎉 All done! Your new project is ready.");
}

main();
