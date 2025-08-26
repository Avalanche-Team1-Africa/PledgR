#!/bin/bash

# Package Manager Setup Script for Pledgr Frontend
# This script helps set up the correct package manager and lockfile

set -e

cd "$(dirname "$0")"

echo "🔧 Setting up package manager for Pledgr frontend..."

# Check which package manager to use
PACKAGE_MANAGER=""

if command -v pnpm &> /dev/null; then
    PACKAGE_MANAGER="pnpm"
    echo "✅ pnpm found - using pnpm"
elif command -v npm &> /dev/null; then
    PACKAGE_MANAGER="npm"
    echo "✅ npm found - using npm"
else
    echo "❌ No package manager found. Please install npm or pnpm."
    exit 1
fi

# Clean up existing lockfiles and node_modules
echo "🧹 Cleaning up existing installations..."
rm -rf node_modules
rm -f package-lock.json
rm -f pnpm-lock.yaml
rm -f yarn.lock
rm -f bun.lockb

# Install dependencies with chosen package manager
echo "📦 Installing dependencies with $PACKAGE_MANAGER..."

if [ "$PACKAGE_MANAGER" = "pnpm" ]; then
    # Install pnpm if not available
    if ! command -v pnpm &> /dev/null; then
        echo "Installing pnpm..."
        npm install -g pnpm
    fi
    pnpm install
elif [ "$PACKAGE_MANAGER" = "npm" ]; then
    npm install
fi

echo "✅ Dependencies installed successfully!"
echo ""
echo "📝 Available scripts:"
echo "  $PACKAGE_MANAGER dev        - Start development server"
echo "  $PACKAGE_MANAGER build      - Build for production"
echo "  $PACKAGE_MANAGER preview    - Preview production build"
echo "  $PACKAGE_MANAGER lint       - Run linter"
echo ""
echo "🚀 Ready to start development!"

# Create a .nvmrc file for consistent Node.js version
echo "20.19.4" > .nvmrc
echo "📌 Created .nvmrc with Node.js 20.19.4"

# Create package manager preference file
echo "$PACKAGE_MANAGER" > .package-manager
echo "📌 Set $PACKAGE_MANAGER as preferred package manager"

echo ""
echo "🎉 Setup complete! Run '$PACKAGE_MANAGER dev' to start development."
