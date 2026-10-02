@echo off
title Surabi Properties - Quick Start
echo ========================================================
echo    SURABI PROPERTIES - QUICK START LAUNCHER
echo ========================================================
echo.

cd /d "%~dp0"

:: 1. Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [!] Node.js was not detected in standard system PATH.
    echo Checking secondary locations...
    if exist "D:\Program Files\node.exe" (
        set "PATH=D:\Program Files;%PATH%"
        echo [OK] Located Node.js at D:\Program Files\
    ) else (
        echo [ERROR] Node.js is required to run this platform.
        echo Please install Node.js from https://nodejs.org/ and try again.
        pause
        exit /b 1
    )
)

echo [OK] Using Node.js:
node -v
echo.

:: 2. Ensure .env.local exists
if not exist ".env.local" (
    echo [*] Creating .env.local from template...
    copy ".env.example" ".env.local" >nul
    echo [OK] .env.local created.
) else (
    echo [OK] .env.local exists.
)

:: 3. Check if node_modules exists
if not exist "node_modules" (
    echo.
    echo [*] First time setup: Installing npm packages...
    echo (This may take 1-2 minutes depending on your internet connection)
    echo.
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] npm install encountered an error.
        pause
        exit /b 1
    )
) else (
    echo [OK] Dependencies are already installed.
)

:: 4. Start the development server
echo.
echo ========================================================
echo   Starting development server on http://localhost:3000
echo   Press Ctrl + C in this window to stop the server
echo ========================================================
echo.

start http://localhost:3000
call npm run dev
pause
