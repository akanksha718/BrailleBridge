#!/bin/bash

echo "Starting BrailleBridge Development Environment..."
echo ""

# Start Python Service in background
echo "Starting Python Service..."
cd processor
python3 app.py &
PYTHON_PID=$!
cd ..

# Wait a bit for Python service to start
sleep 3

# Start Backend Server in background
echo "Starting Backend Server..."
cd server
npm run dev &
BACKEND_PID=$!
cd ..

# Wait a bit for backend to start
sleep 3

# Start Frontend in background
echo "Starting Frontend..."
cd client
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "All services are starting!"
echo "Please open http://localhost:5173 in your browser"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for user interrupt
trap "kill $PYTHON_PID $BACKEND_PID $FRONTEND_PID" EXIT
wait


