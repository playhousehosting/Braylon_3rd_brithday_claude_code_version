#!/bin/bash

# Pre-commit script to prevent mock data in production code
# This script should be placed in .git/hooks/pre-commit and made executable

echo "🔍 Checking for mock data in staged files..."

# Get list of staged TypeScript/JavaScript files
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(ts|tsx|js|jsx)$' | grep -v node_modules)

if [ -z "$STAGED_FILES" ]; then
  echo "✅ No TypeScript/JavaScript files staged for commit"
  exit 0
fi

VIOLATIONS_FOUND=false

# Check each staged file for mock data patterns
for file in $STAGED_FILES; do
  if [ -f "$file" ]; then
    echo "Checking $file..."
    
    # Check for mock-related patterns
    if grep -n -E "(mockRsvp|mockData|mock-|Mock.*=|const.*mock|let.*mock|var.*mock)" "$file"; then
      echo "❌ Mock data found in $file"
      VIOLATIONS_FOUND=true
    fi
    
    # Check for TODO comments about mock data
    if grep -n -i "TODO.*mock\|TODO.*replace.*mock" "$file"; then
      echo "❌ TODO comments about mock data found in $file"
      VIOLATIONS_FOUND=true
    fi
    
    # Check for hardcoded example data
    if grep -n -E "(john@example\.com|test@test\.com|@example\.com|John Smith|Sarah Johnson)" "$file"; then
      echo "⚠️  Potential hardcoded example data found in $file"
      VIOLATIONS_FOUND=true
    fi
  fi
done

if [ "$VIOLATIONS_FOUND" = true ]; then
  echo ""
  echo "🚫 COMMIT REJECTED: Mock data or example data found!"
  echo ""
  echo "This application must be production-ready without mock data."
  echo "Please replace all mock implementations with real database operations."
  echo ""
  echo "To bypass this check (not recommended), use: git commit --no-verify"
  exit 1
else
  echo "✅ No mock data found. Commit allowed."
  exit 0
fi