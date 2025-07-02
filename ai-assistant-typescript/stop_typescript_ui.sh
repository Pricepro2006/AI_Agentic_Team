#!/bin/bash

# TypeScript AI Assistant System Shutdown Script

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Function to print colored output
print_color() {
    color=$1
    message=$2
    echo -e "${color}${message}${NC}"
}

print_color $PURPLE "======================================"
print_color $PURPLE "Stopping TypeScript AI Assistant System"
print_color $PURPLE "======================================"

# Stop UI server
if [ -f "typescript-ui/ui.pid" ]; then
    UI_PID=$(cat typescript-ui/ui.pid)
    if kill -0 $UI_PID 2>/dev/null; then
        print_color $YELLOW "Stopping UI server (PID: $UI_PID)..."
        kill $UI_PID
        rm typescript-ui/ui.pid
        print_color $GREEN "✓ UI server stopped"
    else
        print_color $YELLOW "UI server not running"
        rm typescript-ui/ui.pid
    fi
else
    print_color $YELLOW "No UI server PID file found"
fi

# Stop API server
if [ -f "typescript-ui/api_server.pid" ]; then
    API_PID=$(cat typescript-ui/api_server.pid)
    if kill -0 $API_PID 2>/dev/null; then
        print_color $YELLOW "Stopping API server (PID: $API_PID)..."
        kill $API_PID
        rm typescript-ui/api_server.pid
        print_color $GREEN "✓ API server stopped"
    else
        print_color $YELLOW "API server not running"
        rm typescript-ui/api_server.pid
    fi
else
    print_color $YELLOW "No API server PID file found"
fi

# Stop Ollama if we started it
if [ -f "typescript-ui/ollama.pid" ]; then
    OLLAMA_PID=$(cat typescript-ui/ollama.pid)
    if kill -0 $OLLAMA_PID 2>/dev/null; then
        print_color $YELLOW "Stopping Ollama (PID: $OLLAMA_PID)..."
        kill $OLLAMA_PID
        rm typescript-ui/ollama.pid
        print_color $GREEN "✓ Ollama stopped"
    else
        print_color $YELLOW "Ollama not running"
        rm typescript-ui/ollama.pid
    fi
else
    print_color $YELLOW "No Ollama PID file found (may be running independently)"
fi

# Clean up any remaining processes on the ports
print_color $YELLOW "\nCleaning up ports..."
lsof -ti :3100 | xargs -r kill -9 2>/dev/null || true
lsof -ti :8001 | xargs -r kill -9 2>/dev/null || true

# Kill any remaining tsx processes
pkill -f "tsx watch api.ts" 2>/dev/null || true

print_color $PURPLE "\n======================================"
print_color $GREEN "✓ TypeScript AI Assistant System stopped successfully!"
print_color $PURPLE "======================================"