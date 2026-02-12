# Solo-Leveler - Quick Setup Script for Windows
# Run this script after installing Node.js

Write-Host "🎯 Solo-Leveler - Setup Script" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    $npmVersion = npm --version
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
    Write-Host "✅ npm version: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed!" -ForegroundColor Red
    Write-Host "Please install Node.js from: https://nodejs.org/" -ForegroundColor Yellow
    Write-Host "After installation, run this script again." -ForegroundColor Yellow
    pause
    exit
}

Write-Host ""
Write-Host "Installing dependencies..." -ForegroundColor Yellow
Write-Host ""

# Install server dependencies
Write-Host "📦 Installing server dependencies..." -ForegroundColor Cyan
Set-Location server
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Server dependencies installed!" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install server dependencies" -ForegroundColor Red
    pause
    exit
}

# Install client dependencies
Write-Host ""
Write-Host "📦 Installing client dependencies..." -ForegroundColor Cyan
Set-Location ../client
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Client dependencies installed!" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install client dependencies" -ForegroundColor Red
    pause
    exit
}

Set-Location ..

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "✅ Setup Complete!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Make sure MongoDB is running:" -ForegroundColor White
Write-Host "   - Local: Start MongoDB service" -ForegroundColor Gray
Write-Host "   - Cloud: Update MONGO_URI in server/.env with your MongoDB Atlas connection string" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Open TWO terminal windows:" -ForegroundColor White
Write-Host ""
Write-Host "   Terminal 1 (Backend):" -ForegroundColor Cyan
Write-Host "   cd server" -ForegroundColor Gray
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "   Terminal 2 (Frontend):" -ForegroundColor Cyan
Write-Host "   cd client" -ForegroundColor Gray
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Open browser: http://localhost:5173" -ForegroundColor White
Write-Host ""
Write-Host "🎮 Ready to level up your productivity!" -ForegroundColor Green
Write-Host ""
pause
