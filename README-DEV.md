# Lan Onasis - Development Branch 🚀

## ⚠️ This is the `dev-local` branch

This branch is for local development and **DOES NOT trigger Netlify builds**.

## 🎯 Why use this branch?

- Work on features without triggering failed Netlify deployments
- Test locally before merging to main
- Avoid deployment alerts while Sentry issue is being fixed

## 🚀 Quick Start

```bash
# 1. Clone and checkout this branch
git clone https://github.com/thefixer3x/LanOnasisIndex.git
cd LanOnasisIndex
git checkout dev-local

# 2. Run setup script
chmod +x setup-local.sh
./setup-local.sh

# 3. Start development
npm run dev
```

## 📝 Workflow

1. **Always work on `dev-local` branch**
   ```bash
   git checkout dev-local
   git pull origin dev-local
   ```

2. **Make your changes**
   ```bash
   # Edit files...
   npm run dev  # Test locally
   ```

3. **Commit to dev-local**
   ```bash
   git add .
   git commit -m "feat: your feature"
   git push origin dev-local
   ```

4. **When ready for production** (after fixing Netlify):
   ```bash
   git checkout main
   git merge dev-local
   git push origin main
   ```

## 🛠️ Available Scripts

- `npm run dev` - Start development server at http://localhost:5173
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run linter
- `npm run type-check` - Check TypeScript types

## 🐳 Docker Development (Optional)

```bash
# Using Make
make dev

# Using Docker Compose
docker-compose up app

# Test Netlify build locally
make netlify-test
```

## 📱 PWA Icons

After running the dev server, visit:
```
http://localhost:5173/icon-generator.html
```

## ⚡ Current Issues

- **Sentry Integration**: Installed via Netlify UI, needs to be removed
- **Main branch**: Auto-deploys on push (will fail until Sentry is fixed)

## 🔄 Syncing with Main

To get latest changes from main:
```bash
git checkout dev-local
git fetch origin
git merge origin/main
```

---

**Remember**: This branch is safe to push to. No Netlify builds will be triggered! 🎉