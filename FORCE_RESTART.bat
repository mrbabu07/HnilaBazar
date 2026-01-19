@echo off
cls
echo ========================================
echo  FORCE RESTART SERVER
echo ========================================
echo.
echo Killing ALL Node.js processes...
taskkill /F /IM node.exe 2>nul
if %errorlevel% == 0 (
    echo   Done! All Node processes killed.
) else (
    echo   No Node processes were running.
)
echo.
echo Waiting 3 seconds...
timeout /t 3 /nobreak >nul
echo.
echo ========================================
echo  STARTING SERVER WITH NEW CODE
echo ========================================
echo.
echo WATCH FOR THESE MESSAGES:
echo   [32m✅ Mongoose connected successfully[0m
echo   [32m✅ Offers routes registered[0m
echo.
echo ========================================
echo.
cd Server
node index.js
