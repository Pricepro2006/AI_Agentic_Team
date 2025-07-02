#!/bin/bash

# AI Assistant TypeScript - Local Development Startup Script
# This script starts the system locally without Docker

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Banner
echo -e "${BLUE}================================================${NC}"
echo -e "${BLUE}   AI Assistant TypeScript - Local Development${NC}"
echo -e "${BLUE}================================================${NC}"
echo ""

# Check Node.js version
echo -e "${YELLOW}Checking Node.js version...${NC}"
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}Error: Node.js 18.x or higher is required${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js version is compatible${NC}"

# Check if npm packages are installed
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing dependencies...${NC}"
    npm ci
fi

# Check for .env file
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}Creating .env file from example...${NC}"
    cp .env.example .env
    echo -e "${YELLOW}Please update .env with your configuration${NC}"
fi

# Check if Ollama is running (optional)
echo -e "${YELLOW}Checking Ollama service...${NC}"
if command -v ollama &> /dev/null; then
    if ollama list &> /dev/null; then
        echo -e "${GREEN}✓ Ollama is running${NC}"
    else
        echo -e "${YELLOW}⚠ Ollama is not running. Starting Ollama...${NC}"
        ollama serve &> /dev/null &
        sleep 2
    fi
else
    echo -e "${YELLOW}⚠ Ollama not found. LLM features may be limited.${NC}"
fi

# Check if N8N is configured (optional)
if [ -n "$N8N_URL" ]; then
    echo -e "${YELLOW}Checking N8N connection...${NC}"
    if curl -s "$N8N_URL/healthz" > /dev/null; then
        echo -e "${GREEN}✓ N8N is reachable${NC}"
    else
        echo -e "${YELLOW}⚠ N8N is not reachable at $N8N_URL${NC}"
    fi
fi

# Build TypeScript if needed
if [ ! -d "dist" ] || [ "src" -nt "dist" ]; then
    echo -e "${YELLOW}Building TypeScript...${NC}"
    npm run build
fi

# Run database migrations if needed
if [ -f "scripts/migrate.ts" ]; then
    echo -e "${YELLOW}Running database migrations...${NC}"
    npm run migrate
fi

# Start the application
echo -e "${GREEN}Starting AI Assistant...${NC}"
echo -e "${BLUE}================================================${NC}"
echo ""

# Export development environment
export NODE_ENV=${NODE_ENV:-development}
export LOG_LEVEL=${LOG_LEVEL:-debug}

# Start with tsx for hot-reloading in development
if [ "$NODE_ENV" = "development" ]; then
    echo -e "${GREEN}Starting in development mode with hot-reloading...${NC}"
    npm run dev
else
    echo -e "${GREEN}Starting in production mode...${NC}"
    npm start
fi