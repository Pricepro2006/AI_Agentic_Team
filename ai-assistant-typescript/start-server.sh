#!/bin/bash

# Start TypeScript API server with proper logging

echo "Starting TypeScript API Server..."
echo "================================"

# Kill any existing servers
pkill -f "tsx.*server" 2>/dev/null
sleep 2

# Set environment variables
export NODE_ENV=development
export API_PORT=8001
export CORS_ORIGIN="http://localhost:3000,http://localhost:3001,http://localhost:8090,http://localhost:8080"
export NEXT_PUBLIC_MOCK_AUTH=true

# Create logs directory if it doesn't exist
mkdir -p logs

# Start the server with logging
echo "Starting server on port 8001..."
npm run dev:server 2>&1 | tee logs/server.log &

# Store the PID
echo $! > server.pid

# Wait for server to start
echo "Waiting for server to be ready..."
for i in {1..30}; do
    if curl -s http://localhost:8001/health > /dev/null 2>&1; then
        echo "✅ Server is ready!"
        echo ""
        echo "API Endpoints:"
        echo "- Health: http://localhost:8001/health"
        echo "- Root: http://localhost:8001/"
        echo "- Tools: http://localhost:8001/trpc/tools.list"
        echo "- Agents: http://localhost:8001/trpc/agents.list"
        echo ""
        echo "Server PID: $(cat server.pid)"
        echo "Logs: logs/server.log"
        exit 0
    fi
    echo -n "."
    sleep 1
done

echo ""
echo "❌ Server failed to start. Check logs/server.log for details."
exit 1