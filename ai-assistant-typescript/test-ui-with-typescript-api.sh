#!/bin/bash

# Test UI with TypeScript API

echo "Starting test of UI with TypeScript API..."
echo "========================================="

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Kill any existing servers
echo -e "${YELLOW}Cleaning up any existing servers...${NC}"
pkill -f "node.*server.js" 2>/dev/null
pkill -f "npm.*dev" 2>/dev/null
pkill -f "next dev" 2>/dev/null
sleep 2

# Start TypeScript API server
echo -e "${GREEN}Starting TypeScript API server on port 8001...${NC}"
cd /home/pricepro2006/iems_project/ehas_project/ai_assistant/ai-assistant-typescript
npm run dev &
API_PID=$!
echo "TypeScript API PID: $API_PID"

# Wait for API to be ready
echo -e "${YELLOW}Waiting for TypeScript API to be ready...${NC}"
for i in {1..30}; do
    if curl -s http://localhost:8001/health > /dev/null 2>&1; then
        echo -e "${GREEN}TypeScript API is ready!${NC}"
        break
    fi
    echo -n "."
    sleep 1
done

# Check API endpoints
echo -e "\n${GREEN}Testing TypeScript API endpoints:${NC}"
echo "1. Health check:"
curl -s http://localhost:8001/health | jq '.' || echo "Failed"

echo -e "\n2. Root endpoint:"
curl -s http://localhost:8001/ | jq '.' || echo "Failed"

echo -e "\n3. Tools list:"
curl -s http://localhost:8001/trpc/tools.list | jq '.result.data.json | length' || echo "Failed"

# Start UI
echo -e "\n${GREEN}Starting Next.js UI on port 3000...${NC}"
cd /home/pricepro2006/iems_project/ehas_project/ai_assistant/ai-assistant-ui
npm run dev &
UI_PID=$!
echo "UI PID: $UI_PID"

# Wait for UI to be ready
echo -e "${YELLOW}Waiting for UI to be ready...${NC}"
for i in {1..30}; do
    if curl -s http://localhost:3000 > /dev/null 2>&1; then
        echo -e "${GREEN}UI is ready!${NC}"
        break
    fi
    echo -n "."
    sleep 1
done

echo -e "\n${GREEN}System is ready!${NC}"
echo "========================================="
echo "TypeScript API: http://localhost:8001"
echo "Next.js UI: http://localhost:3000"
echo "Dashboard: http://localhost:3000/dashboard"
echo "Chat: http://localhost:3000/dashboard/chat"
echo ""
echo "Test query for Documentation Expert:"
echo "I need to set up automated documentation generation for this TypeScript project with GitHub Actions CI/CD integration."
echo ""
echo "Press Ctrl+C to stop both servers"

# Function to cleanup on exit
cleanup() {
    echo -e "\n${YELLOW}Stopping servers...${NC}"
    kill $API_PID 2>/dev/null
    kill $UI_PID 2>/dev/null
    pkill -f "node.*server.js" 2>/dev/null
    pkill -f "npm.*dev" 2>/dev/null
    pkill -f "next dev" 2>/dev/null
    echo -e "${GREEN}Cleanup complete!${NC}"
    exit 0
}

# Set up trap for Ctrl+C
trap cleanup INT

# Keep script running
wait