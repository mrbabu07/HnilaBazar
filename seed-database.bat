@echo off
echo ========================================
echo  Seeding HnilaBazar Database
echo ========================================
echo.

cd Server

echo Step 1: Seeding basic data (products, users, orders)...
echo.
call npm run seed

echo.
echo ========================================
echo.

echo Step 2: Seeding new features (flash sales, alerts, loyalty)...
echo.
call node seedAll.js

echo.
echo ========================================
echo  DATABASE SEEDING COMPLETE!
echo ========================================
echo.
echo Visit: http://localhost:5173
echo Admin: http://localhost:5173/admin
echo.
echo Press any key to exit...
pause > nul
