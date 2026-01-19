@echo off
cls
echo ========================================
echo  SERVER STATUS CHECK
echo ========================================
echo.
echo Checking if server is running...
echo.

curl -s http://localhost:5000/api/test-mongoose
if %errorlevel% == 0 (
    echo.
    echo.
    echo ========================================
    echo  SERVER IS RUNNING NEW CODE! ✅
    echo ========================================
    echo.
    echo Your offer system should work now!
    echo Go to: http://localhost:5173/admin/offers
    echo.
) else (
    echo.
    echo.
    echo ========================================
    echo  SERVER IS NOT RUNNING NEW CODE! ❌
    echo ========================================
    echo.
    echo The server needs to be restarted!
    echo.
    echo Please run: FORCE_RESTART.bat
    echo.
)

pause
