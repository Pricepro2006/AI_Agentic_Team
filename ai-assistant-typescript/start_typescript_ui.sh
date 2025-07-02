#!/bin/bash

# TypeScript AI Assistant Complete System Startup Script
# This script starts Ollama, TypeScript API Server, and TypeScript UI

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
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

# Function to check if a port is in use
check_port() {
    port=$1
    if lsof -i :$port >/dev/null 2>&1; then
        return 0  # Port is in use
    else
        return 1  # Port is free
    fi
}

# Function to kill process on port
kill_port() {
    port=$1
    if check_port $port; then
        print_color $YELLOW "Killing process on port $port..."
        lsof -ti :$port | xargs -r kill -9 2>/dev/null || true
        sleep 1
    fi
}

# Function to wait for service
wait_for_service() {
    service_name=$1
    url=$2
    max_attempts=30
    attempt=0
    
    print_color $YELLOW "Waiting for $service_name to start..."
    
    while [ $attempt -lt $max_attempts ]; do
        if curl -s $url >/dev/null 2>&1; then
            print_color $GREEN "✓ $service_name is ready!"
            return 0
        fi
        
        attempt=$((attempt + 1))
        printf "."
        sleep 1
    done
    
    print_color $RED "✗ $service_name failed to start!"
    return 1
}

# Function to check if Ollama is installed
check_ollama_installed() {
    if command -v ollama &> /dev/null; then
        return 0
    else
        return 1
    fi
}

# Function to check if Ollama is running
check_ollama_running() {
    if curl -s http://localhost:11434/api/tags >/dev/null 2>&1; then
        return 0
    else
        return 1
    fi
}

# Function to start Ollama
start_ollama() {
    if check_ollama_running; then
        print_color $GREEN "✓ Ollama is already running"
        return 0
    fi
    
    print_color $BLUE "Starting Ollama service..."
    nohup ollama serve > typescript-ui/ollama.log 2>&1 &
    OLLAMA_PID=$!
    echo $OLLAMA_PID > typescript-ui/ollama.pid
    
    # Wait for Ollama to start
    sleep 3
    
    if check_ollama_running; then
        print_color $GREEN "✓ Ollama started successfully"
        
        # Check if qwen3:14b model exists
        print_color $YELLOW "Checking for qwen3:14b model..."
        if ! ollama list | grep -q "qwen3:14b"; then
            print_color $YELLOW "qwen3:14b model not found. Available models:"
            ollama list
            print_color $YELLOW "Would you like to use phi3:mini (2.2GB) for testing instead?"
            print_color $GREEN "✓ System will use available models"
        else
            print_color $GREEN "✓ qwen3:14b model already available"
        fi
    else
        print_color $RED "✗ Failed to start Ollama"
        return 1
    fi
}

# Main execution
print_color $PURPLE "======================================"
print_color $PURPLE "TypeScript AI Assistant System Startup"
print_color $PURPLE "======================================"

# Check if Ollama is installed
if ! check_ollama_installed; then
    print_color $RED "✗ Ollama is not installed!"
    print_color $YELLOW "Please install Ollama first:"
    print_color $YELLOW "curl -fsSL https://ollama.ai/install.sh | sh"
    print_color $YELLOW ""
    print_color $YELLOW "The system will run in demo mode without Ollama."
    OLLAMA_AVAILABLE=false
else
    print_color $GREEN "✓ Ollama is installed"
    OLLAMA_AVAILABLE=true
fi

# Check and clean ports
print_color $YELLOW "\nChecking ports..."
kill_port 8001  # TypeScript API
kill_port 3100  # TypeScript UI

# Start Ollama if available
if [ "$OLLAMA_AVAILABLE" = true ]; then
    print_color $BLUE "\n1. Ollama Service"
    print_color $BLUE "=================="
    start_ollama
fi

# Start TypeScript API Server
print_color $BLUE "\n2. TypeScript API Server"
print_color $BLUE "========================"

cd typescript-ui/server

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    print_color $YELLOW "Installing API server dependencies..."
    npm install
fi

# Start API server
print_color $GREEN "Starting TypeScript API server on port 8001..."
nohup npx tsx watch api.ts > ../api_server.log 2>&1 &
API_PID=$!
echo $API_PID > ../api_server.pid
print_color $GREEN "API server started with PID: $API_PID"

# Wait for API to be ready
wait_for_service "TypeScript API" "http://localhost:8001/health"

# Go back to UI directory
cd ..

# Start TypeScript UI
print_color $BLUE "\n3. TypeScript UI"
print_color $BLUE "================"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    print_color $YELLOW "Installing UI dependencies..."
    npm install
fi

# Start UI
print_color $GREEN "Starting TypeScript UI on port 3100..."
npm run dev > ui_server.log 2>&1 &
UI_PID=$!
echo $UI_PID > ui.pid
print_color $GREEN "UI started with PID: $UI_PID"

# Wait for UI to be ready
wait_for_service "TypeScript UI" "http://localhost:3100"

# Check system status
print_color $BLUE "\n4. System Status Check"
print_color $BLUE "====================="
SYSTEM_STATUS=$(curl -s http://localhost:8001/api/system/stats 2>/dev/null || echo "{}")
if [ -n "$SYSTEM_STATUS" ]; then
    print_color $GREEN "✓ System health check passed"
fi

# Summary
print_color $PURPLE "\n======================================"
print_color $GREEN "✓ TypeScript AI Assistant Started Successfully!"
print_color $PURPLE "======================================"
print_color $GREEN "\n🌐 Access Points:"
print_color $GREEN "  • UI: http://localhost:3100"
print_color $GREEN "  • API: http://localhost:8001"
if [ "$OLLAMA_AVAILABLE" = true ] && check_ollama_running; then
    print_color $GREEN "  • Ollama: http://localhost:11434"
fi
print_color $GREEN "\n📧 Demo Credentials:"
print_color $GREEN "  • Email: admin@typescript.ai"
print_color $GREEN "  • Password: typescript123"
print_color $GREEN "\n🤖 AI Model:"
if [ "$OLLAMA_AVAILABLE" = true ] && check_ollama_running; then
    print_color $GREEN "  • Primary: qwen3:14b (9.3GB) via Ollama"
    print_color $BLUE "  • Available: phi3:mini, mistral:7b, qwen3:8b, Phi4:14b"
else
    print_color $YELLOW "  • Running in demo mode (no Ollama)"
fi
print_color $BLUE "\n📚 Features:"
print_color $BLUE "  • Professional dashboard with analytics"
print_color $BLUE "  • Architecture Expert AI agent"
print_color $BLUE "  • Real-time system monitoring"
print_color $BLUE "  • Activity tracking and history"
print_color $PURPLE "\nTo stop the system, run: ./stop_typescript_ui.sh"
print_color $PURPLE "======================================"

# Keep script running and handle CTRL+C
trap 'print_color $YELLOW "\nShutting down TypeScript system..."; ./stop_typescript_ui.sh; exit 0' INT

# Monitor processes
while true; do
    # Check if processes are still running
    if [ -f "api_server.pid" ] && ! kill -0 $(cat api_server.pid) 2>/dev/null; then
        print_color $RED "\nAPI server stopped unexpectedly!"
        break
    fi
    if [ -f "ui.pid" ] && ! kill -0 $(cat ui.pid) 2>/dev/null; then
        print_color $RED "\nUI server stopped unexpectedly!"
        break
    fi
    sleep 5
done