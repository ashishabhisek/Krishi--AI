@echo off
REM KrishiAI - Quick Setup Test Script (Windows)
REM This script verifies your KrishiAI project is properly configured

REM Clear screen
cls

echo.
echo ======================================
echo 🌾 KrishiAI - Setup Verification 🌾
echo ======================================
echo.

REM Initialize counters
set /a passed=0
set /a failed=0

REM ============================================
echo Step 1: Checking Prerequisites
echo ============================================

REM Check Node.js
node --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Node.js is installed
    node --version
    set /a passed+=1
) else (
    echo ❌ Node.js is NOT installed (required v16+)
    set /a failed+=1
)

REM Check npm
npm --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ npm is installed
    npm --version
    set /a passed+=1
) else (
    echo ❌ npm is NOT installed
    set /a failed+=1
)

REM Check Git (optional)
git --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Git is installed
    set /a passed+=1
) else (
    echo ⚠️  Git is NOT installed (optional)
)

echo.
echo Step 2: Checking Project Files
echo ============================================

REM Check package.json
if exist "package.json" (
    echo ✅ package.json exists
    set /a passed+=1
) else (
    echo ❌ package.json NOT found
    set /a failed+=1
)

REM Check .env file
if exist ".env" (
    echo ✅ .env file exists
    set /a passed+=1
) else (
    echo ⚠️  .env file NOT found
    echo    Tip: Copy from .env.example
)

REM Check .env.example
if exist ".env.example" (
    echo ✅ .env.example exists
    set /a passed+=1
) else (
    echo ❌ .env.example NOT found
    set /a failed+=1
)

REM Check src directory
if exist "src" (
    echo ✅ src/ directory exists
    set /a passed+=1
) else (
    echo ❌ src/ directory NOT found
    set /a failed+=1
)

REM Check models directory
if exist "src\models\" (
    echo ✅ src/models/ directory exists
    set /a passed+=1
) else (
    echo ❌ src/models/ NOT found
    set /a failed+=1
)

echo.
echo Step 3: Checking Dependencies
echo ============================================

REM Check node_modules
if exist "node_modules" (
    echo ✅ node_modules/ exists
    set /a passed+=1
) else (
    echo ⚠️  node_modules/ NOT found
    echo    Running: npm install
    call npm install
)

echo.
echo Step 4: Checking Configuration
echo ============================================

if exist ".env" (
    echo Checking .env variables...
    
    findstr /M "DB_HOST=" ".env" >nul
    if %errorlevel% equ 0 (
        echo ✅ .env has DB_HOST
        set /a passed+=1
    ) else (
        echo ❌ .env missing DB_HOST
        set /a failed+=1
    )
    
    findstr /M "DB_PORT=" ".env" >nul
    if %errorlevel% equ 0 (
        echo ✅ .env has DB_PORT
        set /a passed+=1
    ) else (
        echo ❌ .env missing DB_PORT
        set /a failed+=1
    )
    
    findstr /M "JWT_SECRET=" ".env" >nul
    if %errorlevel% equ 0 (
        echo ✅ .env has JWT_SECRET
        set /a passed+=1
    ) else (
        echo ❌ .env missing JWT_SECRET
        set /a failed+=1
    )
) else (
    echo ⚠️  .env file not found - skipping variable checks
)

echo.
echo Step 5: Checking PostgreSQL
echo ============================================

where psql >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ PostgreSQL client (psql) found
    set /a passed+=1
) else (
    echo ⚠️  PostgreSQL client (psql) NOT found
)

REM Try to connect to PostgreSQL
sqlcmd -U postgres -no-logo -b -v ON_ERROR=EXIT /Q "SELECT @@VERSION;" >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ PostgreSQL is running
    set /a passed+=1
) else (
    echo ⚠️  PostgreSQL may not be running
    echo    Start with: net start postgresql-x64-15
)

echo.
echo Step 6: Checking Documentation
echo ============================================

if exist "SETUP.md" (
    echo ✅ SETUP.md exists
    set /a passed+=1
) else (
    echo ❌ SETUP.md NOT found
    set /a failed+=1
)

if exist "TROUBLESHOOTING.md" (
    echo ✅ TROUBLESHOOTING.md exists
    set /a passed+=1
) else (
    echo ❌ TROUBLESHOOTING.md NOT found
    set /a failed+=1
)

if exist "QUICK_REFERENCE.md" (
    echo ✅ QUICK_REFERENCE.md exists
    set /a passed+=1
) else (
    echo ❌ QUICK_REFERENCE.md NOT found
    set /a failed+=1
)

echo.
echo ============================================
echo Summary
echo ============================================
echo Passed: %passed%
echo Failed: %failed%
echo.

if %failed% equ 0 (
    echo ✅ All checks passed! Setup looks good.
    echo.
    echo Next steps:
    echo 1. Create database:
    echo    psql -U postgres -c "CREATE DATABASE krishiai_db;"
    echo.
    echo 2. Run migrations:
    echo    npm run migrate
    echo.
    echo 3. Start server:
    echo    npm run dev
    echo.
    echo 4. Test health:
    echo    curl http://localhost:5000/health
    echo.
    echo More info: See SETUP.md or QUICK_REFERENCE.md
    pause
    exit /b 0
) else (
    echo ❌ Some checks failed. Please fix the issues above.
    echo.
    echo Help:
    echo - Check TROUBLESHOOTING.md for common issues
    echo - Check SETUP.md for installation instructions
    echo - Ensure all prerequisites are installed
    echo.
    pause
    exit /b 1
)
