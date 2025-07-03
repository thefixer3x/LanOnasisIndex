#!/bin/bash
# Quick setup script for local development

echo "🚀 Lan Onasis Local Development Setup"
echo "===================================="

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install Node.js first."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local..."
    cat > .env.local << EOF
# Local development environment
VITE_ENV=development
VITE_API_URL=http://localhost:3000

# Disable Sentry for local dev
SENTRY_DISABLED=true
EOF
fi

echo "✅ Setup complete!"
echo ""
echo "🎯 Available commands:"
echo "  npm run dev    - Start development server"
echo "  npm run build  - Build for production"
echo "  npm run preview - Preview production build"
echo ""
echo "🌐 Development server will run at: http://localhost:5173"
echo ""
echo "⚠️  Remember: You're on 'dev-local' branch"
echo "    This branch won't trigger Netlify builds"
echo ""
echo "Ready to start? Run: npm run dev"