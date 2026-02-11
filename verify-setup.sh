#!/bin/bash

# KrishiAI - Quick Setup Test Script
# This script verifies your KrishiAI project is properly configured
# Run this after setup to ensure everything works

echo "🌾 KrishiAI - Setup Verification Script 🌾"
echo "=========================================="
echo ""

# Color definitions
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check counter
checks_passed=0
checks_failed=0

# Function to print results
check_result() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ PASSED${NC} - $2"
        ((checks_passed++))
    else
        echo -e "${RED}❌ FAILED${NC} - $2"
        ((checks_failed++))
    fi
}

echo "Step 1: Checking Prerequisites"
echo "=============================="

# Check Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "Node.js version: $NODE_VERSION"
    check_result 0 "Node.js is installed"
else
    check_result 1 "Node.js is NOT installed (required v16+)"
fi

# Check npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo "npm version: $NPM_VERSION"
    check_result 0 "npm is installed"
else
    check_result 1 "npm is NOT installed"
fi

# Check Git (optional)
if command -v git &> /dev/null; then
    check_result 0 "Git is installed (optional)"
else
    echo -e "${YELLOW}⚠️  Git is NOT installed (optional)${NC}"
fi

echo ""
echo "Step 2: Checking Project Files"
echo "=============================="

# Check package.json
if [ -f "package.json" ]; then
    check_result 0 "package.json exists"
else
    check_result 1 "package.json NOT found"
fi

# Check .env file
if [ -f ".env" ]; then
    check_result 0 ".env file exists"
else
    echo -e "${YELLOW}⚠️  .env file NOT found${NC}"
    echo "    → Copy from .env.example: cp .env.example .env"
fi

# Check .env.example
if [ -f ".env.example" ]; then
    check_result 0 ".env.example exists"
else
    check_result 1 ".env.example NOT found"
fi

# Check src directory
if [ -d "src" ]; then
    check_result 0 "src/ directory exists"
else
    check_result 1 "src/ directory NOT found"
fi

# Check models directory
if [ -d "src/models" ]; then
    if [ "$(ls -A src/models)" ]; then
        check_result 0 "src/models/ has files"
    else
        check_result 1 "src/models/ is empty"
    fi
else
    check_result 1 "src/models/ directory NOT found"
fi

echo ""
echo "Step 3: Checking Dependencies"
echo "============================="

# Check node_modules
if [ -d "node_modules" ]; then
    check_result 0 "node_modules/ exists"
else
    echo -e "${YELLOW}⚠️  node_modules/ NOT found${NC}"
    echo "    → Running: npm install"
    npm install
fi

echo ""
echo "Step 4: Checking Configuration"
echo "=============================="

# Check if .env has required variables
if [ -f ".env" ]; then
    echo "Checking .env variables..."
    
    for var in DB_HOST DB_PORT DB_NAME DB_USER DB_PASSWORD JWT_SECRET PORT NODE_ENV FRONTEND_URL; do
        if grep -q "^${var}=" .env; then
            check_result 0 ".env has $var"
        else
            check_result 1 ".env missing $var"
        fi
    done
else
    echo -e "${YELLOW}Skipping .env checks (file not found)${NC}"
fi

echo ""
echo "Step 5: Checking Database"
echo "========================="

# Check if PostgreSQL is running
if command -v psql &> /dev/null; then
    if psql -U postgres -c "SELECT version();" &>/dev/null; then
        check_result 0 "PostgreSQL is running"
    else
        check_result 1 "PostgreSQL is NOT running"
        echo "    → Start PostgreSQL:"
        echo "       macOS: brew services start postgresql"
        echo "       Linux: sudo systemctl start postgresql"
        echo "       Windows: Net Start postgresql-x64-15"
    fi
else
    echo -e "${YELLOW}⚠️  PostgreSQL client (psql) NOT found${NC}"
fi

echo ""
echo "Step 6: Checking Documentation"
echo "=============================="

# Check documentation files
for doc in SETUP.md TROUBLESHOOTING.md QUICK_REFERENCE.md IMPROVEMENTS.md VERIFICATION_CHECKLIST.md; do
    if [ -f "$doc" ]; then
        check_result 0 "$doc exists"
    else
        check_result 1 "$doc NOT found"
    fi
done

echo ""
echo "Step 7: Basic API Test"
echo "===================="

if command -v curl &> /dev/null; then
    echo "Testing health endpoint..."
    if timeout 3 curl -s http://localhost:5000/health &>/dev/null; then
        check_result 0 "API is responding on port 5000"
    else
        echo -e "${YELLOW}⚠️  API not responding (server not running?)${NC}"
        echo "    → Start server: npm run dev"
    fi
else
    echo -e "${YELLOW}⚠️  curl NOT found (optional)${NC}"
fi

echo ""
echo "=========================================="
echo "Summary"
echo "=========================================="
echo -e "${GREEN}Passed: $checks_passed${NC}"
echo -e "${RED}Failed: $checks_failed${NC}"

if [ $checks_failed -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✅ All checks passed! Setup looks good.${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Create database: psql -U postgres -c \"CREATE DATABASE krishiai_db;\""
    echo "2. Run migrations: npm run migrate"
    echo "3. Start server: npm run dev"
    echo "4. Test health: curl http://localhost:5000/health"
    echo ""
    echo "More info: See SETUP.md or QUICK_REFERENCE.md"
    exit 0
else
    echo ""
    echo -e "${RED}❌ Some checks failed. Please fix the issues above.${NC}"
    echo ""
    echo "Help:"
    echo "- Check TROUBLESHOOTING.md for common issues"
    echo "- Check SETUP.md for installation instructions"
    echo "- Ensure all prerequisites are installed"
    exit 1
fi
