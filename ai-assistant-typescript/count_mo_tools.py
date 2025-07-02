#!/usr/bin/env python3
"""Count tools in MasterOrchestrator getToolDefinitions method"""

import re

with open("src/agents/experts/MasterOrchestrator.ts", 'r') as f:
    content = f.read()

# Find getToolDefinitions method
match = re.search(r'protected getToolDefinitions\(\): AgentTool\[\] \{(.*?)\n  \}', content, re.DOTALL)

if match:
    tools_content = match.group(1)
    
    # Count tool objects by looking for execute: async
    tool_count = tools_content.count("execute: async")
    
    # Extract tool names
    tool_names = re.findall(r"name: '([^']+)'", tools_content)
    
    print("📊 MASTER ORCHESTRATOR TOOLS:")
    print("="*60)
    for i, name in enumerate(tool_names, 1):
        print(f"{i:2d}. {name}")
    print("="*60)
    print(f"✅ Total tools: {len(tool_names)}")
    print(f"✅ Tools with execute methods: {tool_count}")
    
    # Check implementation quality
    ai_tools = [name for name in tool_names if 'ai' in name.lower() or 'generator' in name or 'manager' in name or 'hub' in name or 'validator' in name or 'assessor' in name]
    traditional_tools = [name for name in tool_names if name not in ai_tools]
    
    print(f"\n📈 Tool Categories:")
    print(f"   AI-Enhanced Tools: {len(ai_tools)}")
    print(f"   Traditional Tools: {len(traditional_tools)}")
else:
    print("❌ Could not find getToolDefinitions method")