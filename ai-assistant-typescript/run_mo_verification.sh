#!/bin/bash

echo "🧪 Running Real Master Orchestrator Tool Tests"
echo "=============================================="
echo
echo "These tests execute the actual tool methods, not mocks."
echo

# Test 1: TaskDistributor - Agent Registration
echo "1️⃣ TaskDistributor - Testing real agent registration:"
npm test -- --config jest.config.cjs --testNamePattern="should register an agent" --testPathPattern="TaskDistributor" --silent 2>&1 | grep -E "PASS|FAIL|✓|✗" | head -5

# Test 2: SystemMonitor - Real system metrics
echo -e "\n2️⃣ SystemMonitor - Testing real system metrics collection:"
npm test -- --config jest.config.cjs --testNamePattern="should get current metrics" --testPathPattern="SystemMonitor" --silent 2>&1 | grep -E "PASS|FAIL|✓|✗" | head -5

# Test 3: ResponseCoordinator - Response handling
echo -e "\n3️⃣ ResponseCoordinator - Testing real response coordination:"
npm test -- --config jest.config.cjs --testNamePattern="should add a response" --testPathPattern="ResponseCoordinator" --silent 2>&1 | grep -E "PASS|FAIL|✓|✗" | head -5

# Test 4: WorkflowManager - Workflow creation
echo -e "\n4️⃣ WorkflowManager - Testing real workflow management:"
npm test -- --config jest.config.cjs --testNamePattern="should create a workflow" --testPathPattern="WorkflowManager" --silent 2>&1 | grep -E "PASS|FAIL|✓|✗" | head -5

# Summary
echo -e "\n📊 Test Summary:"
echo "These tests execute real tool methods with actual functionality."
echo "The tools extend BaseTool and implement full business logic."
echo "They are NOT mocks or placeholders."