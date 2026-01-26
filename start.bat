@echo off
echo Starting HnilaBazar E-commerce Platform...
echo.

echo Starting Backend Server...
cd Server
start "Backend Server" cmd /k "npm start"
cd ..

echo Starting Frontend Client...
cd Client  
start "Frontend Client" cmd /k "npm run dev"
cd ..

echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Press any key to exit...
pause >nul