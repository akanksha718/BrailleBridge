@echo off
echo Starting BrailleBridge Development Environment...
echo.

echo Starting Python Service...
start "Python Service" cmd /k "cd processor && python app.py"

echo Waiting 3 seconds...
timeout /t 3

echo Starting Backend Server...
start "Backend Server" cmd /k "cd server && npm run dev"

echo Waiting 3 seconds...
timeout /t 3

echo Starting Frontend...
start "Frontend" cmd /k "cd client && npm run dev"

echo.
echo All services are starting!
echo Please open http://localhost:5173 in your browser
echo.
echo Press any key to exit this window...
pause >nul


