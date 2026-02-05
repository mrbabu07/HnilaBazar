@echo off
echo ========================================
echo Security Check Before Git Push
echo ========================================
echo.

echo [1/5] Checking for .env files in Git...
git ls-files | findstr "\.env$" > nul
if %errorlevel% equ 0 (
    echo [ERROR] .env files found in Git!
    echo Please remove them immediately!
    git ls-files | findstr "\.env"
    exit /b 1
) else (
    echo [OK] No .env files tracked
)
echo.

echo [2/5] Checking for .env.example files...
git ls-files | findstr "\.env\.example" > nul
if %errorlevel% equ 0 (
    echo [OK] .env.example files found (this is correct)
    git ls-files | findstr "\.env\.example"
) else (
    echo [WARNING] No .env.example files found
)
echo.

echo [3/5] Checking staged files...
git diff --cached --name-only > nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Staged files:
    git diff --cached --name-only
) else (
    echo [INFO] No staged files
)
echo.

echo [4/5] Checking for large files...
echo [INFO] Files larger than 1MB:
git ls-files | findstr /v "node_modules" > temp_files.txt
for /f "delims=" %%f in (temp_files.txt) do (
    if exist "%%f" (
        for %%a in ("%%f") do (
            if %%~za gtr 1048576 (
                echo %%f - %%~za bytes
            )
        )
    )
)
del temp_files.txt
echo.

echo [5/5] Running npm audit...
cd Server
call npm audit --audit-level=high
cd ..
echo.

echo ========================================
echo Security Check Complete!
echo ========================================
echo.
echo If all checks passed, you can safely push:
echo   git add .
echo   git commit -m "Your message"
echo   git push origin main
echo.
pause
