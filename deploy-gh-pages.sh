#!/usr/bin/env bash
set -e

cd "$(dirname "$0")"

echo "📦 Building standalone CS-404 Game Mechanics Course..."
npm run build
touch dist/.nojekyll

echo "✅ Build complete in ./dist (with .nojekyll and robots.txt Disallow: /)"
echo ""
echo "To push to a GitHub repository's gh-pages branch, run:"
echo "  npx gh-pages -d dist"
echo "Or push the ./course folder to its own GitHub repository with GitHub Actions enabled."
