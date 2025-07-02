#!/bin/bash

# Complete test of TypeScript API with UI

echo "========================================="
echo "Complete TypeScript API + UI Test"
echo "========================================="

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "\n${GREEN}System Status:${NC}"
echo "TypeScript API: http://localhost:8001"
echo "Next.js UI: http://localhost:3001"
echo "Test UI: http://localhost:8090/test-trpc-ui-integration.html"

echo -e "\n${BLUE}Available Test Pages:${NC}"
echo "1. tRPC Integration Test: http://localhost:8090/test-trpc-ui-integration.html"
echo "2. TypeScript API Test: http://localhost:8090/test-typescript-api.html"
echo "3. Direct Chat Test: http://localhost:8090/test-chat-direct.html"

echo -e "\n${YELLOW}Test the Documentation Expert Query:${NC}"
echo "Query: 'I need to set up automated documentation generation for this TypeScript project with GitHub Actions CI/CD integration.'"
echo ""
echo "Expected Flow:"
echo "1. Master Orchestrator receives query"
echo "2. Analyzes and routes to Documentation Expert"
echo "3. Documentation Expert selects doc_automation_setup tool"
echo "4. Tool generates GitHub Actions workflow"
echo "5. Returns complete configuration"

echo -e "\n${GREEN}Quick API Tests:${NC}"

# Test 1: List tools
echo -e "\n${BLUE}1. Total tools available:${NC}"
curl -s http://localhost:8001/trpc/tools.list | jq '.result.data.json | length' 2>/dev/null || echo "Failed"

# Test 2: List agents
echo -e "\n${BLUE}2. Available agents:${NC}"
curl -s http://localhost:8001/trpc/agents.list | jq '.result.data.json[].name' 2>/dev/null || echo "Failed"

# Test 3: Test orchestration
echo -e "\n${BLUE}3. Test orchestration routing:${NC}"
curl -s -X POST http://localhost:8001/trpc/orchestration.processRequest \
  -H "Content-Type: application/json" \
  -d '{
    "query": "I need help with documentation",
    "options": {
      "includeReasoning": true,
      "requireExpertRouting": true
    }
  }' | jq '.result.data.json.routedExpert' 2>/dev/null || echo "Failed"

echo -e "\n${GREEN}UI Access:${NC}"
echo "Dashboard: http://localhost:3001/dashboard"
echo "Chat: http://localhost:3001/dashboard/chat"
echo ""
echo "The UI should now be able to:"
echo "- Connect to TypeScript API on port 8001"
echo "- List all 24 available tools"
echo "- Show all expert agents"
echo "- Route queries through Master Orchestrator"
echo "- Execute tools with real functionality"

echo -e "\n========================================="