@echo off
echo ========================================
echo    Solo-Leveler - Quick Setup
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed!
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo After installation, run this script again.
    echo.
    pause
    exit /b 1
)

echo [OK] Node.js is installed
node --version
npm --version
echo.

echo Installing dependencies...
echo.

REM Install server dependencies
echo [1/2] Installing server dependencies...
cd servers
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install server dependencies
    pause
    exit /b 1
)
echo [OK] Server dependencies installed!
echo.

REM Install client dependencies
echo [2/2] Installing client dependencies...
cd ..\client
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install client dependencies
    pause
    exit /b 1
)
echo [OK] Client dependencies installed!
echo.

cd ..

echo ========================================
echo    Setup Complete!
echo ========================================
echo.
echo Next Steps:
echo.
echo 1. Ensure MongoDB is running
echo.
echo 2. Open TWO command prompts:
echo.
echo    Terminal 1 - Backend:
echo    cd server
echo    npm run dev
echo.
echo    Terminal 2 - Frontend:
echo    cd client
echo    npm run dev
echo.
echo 3. Open browser: http://localhost:5173
echo.
echo Ready to level up your productivity!
echo.
pause
