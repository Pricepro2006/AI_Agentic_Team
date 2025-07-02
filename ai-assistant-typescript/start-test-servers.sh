#!/bin/bash

# Start Test Servers for AI Assistant TypeScript API Testing
# This script starts both the tRPC API server and Next.js dev server

echo "🚀 Starting AI Assistant TypeScript API Test Environment"
echo "=================================================="

# Function to cleanup background processes
cleanup() {
    echo ""
    echo "🛑 Shutting down servers..."
    kill $(jobs -p) 2>/dev/null
    exit 0
}

# Trap CTRL+C
trap cleanup SIGINT

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start the standalone tRPC API server on port 8001
echo "🔧 Starting tRPC API Server (port 8001)..."
npm run dev:server &
API_PID=$!

# Wait a moment for the API server to start
sleep 3

# Start the Next.js development server on port 3000
echo "🌐 Starting Next.js UI Server (port 3000)..."
npm run dev:next &
UI_PID=$!

# Wait a moment for both servers to start
sleep 5

echo ""
echo "✅ Both servers are starting up!"
echo "=================================================="
echo "🔧 API Server: http://localhost:8001"
echo "   - Health check: http://localhost:8001/health"
echo "   - tRPC endpoint: http://localhost:8001/trpc"
echo ""
echo "🌐 UI Server: http://localhost:3000"
echo "   - Main test page: http://localhost:3000"
echo "   - Documentation tools: http://localhost:3000 (Documentation tab)"
echo ""
echo "🎯 Ready for testing! Open http://localhost:3000 in your browser"
echo "=================================================="
echo "Press CTRL+C to stop both servers"

# Wait for both processes
wait