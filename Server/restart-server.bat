@echo off
echo ========================================
echo  Restarting Server with New Code
echo ========================================
echo.

echo Step 1: Killing any process on port 5000...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5000') do (
    echo Found process: %%a
    taskkill /F /PID %%a 2>nul
)
echo.

echo Step 2: Waiting 2 seconds...
timeout /t 2 /nobreak >nul
echo.

echo Step 3: Starting server with new code...
echo.
echo ========================================
echo  Server Starting - Watch for Messages:
echo ========================================
echo  MUST SEE: "Created uploads directory" (or folder exists)
echo  MUST SEE: "Mongoose connected successfully"
echo  MUST SEE: "Offers routes registered"
echo ========================================
echo.

node index.js
