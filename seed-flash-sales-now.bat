@echo off
echo ========================================
echo  Creating Flash Sales
echo ========================================
echo.

cd Server

echo Creating flash sales with active timings...
echo.
call npm run seed:flash

echo.
echo ========================================
echo  DONE!
echo ========================================
echo.
echo Now refresh your browser (Ctrl+Shift+R)
echo You should see flash sale products!
echo.
pause
