#!/usr/bin/env python3
"""
Accurate tool count verification for MasterOrchestrator
"""

import re

def count_tools():
    with open("src/agents/experts/MasterOrchestrator.ts", 'r') as f:
        content = f.read()
    
    # Find getTools() method
    tools_section_match = re.search(r'getTools\(\):\s*AgentTool\[\]\s*{.*?return\s*\[(.*?)\]\s*}', content, re.DOTALL)
    
    if not tools_section_match:
        print("❌ Could not find getTools() method")
        return 0
        
    tools_content = tools_section_match.group(1)
    
    # Count tool objects - look for pattern: { name: 'tool_name'
    tool_pattern = r'{\s*name:\s*[\'"]([^\'\"]+)[\'"]'
    tools = re.findall(tool_pattern, tools_content)
    
    print("📊 ACTUAL TOOLS FOUND IN MasterOrchestrator:")
    print("="*60)
    
    for i, tool in enumerate(tools, 1):
        print(f"{i:2d}. {tool}")
        
    print("="*60)
    print(f"✅ Total tools implemented: {len(tools)}")
    
    # Also verify each tool has execute method
    execute_count = tools_content.count("execute: async")
    print(f"✅ Tools with execute methods: {execute_count}")
    
    # Check for real implementations
    real_impl_indicators = [
        "await this.ollamaService",
        "getEnhancedParser()",
        "getAgentRouter()",
        "getCrossAgentCommunicator()",
        "await parser.execute",
        "await router.execute",
        "await communicator.execute"
    ]
    
    real_impl_count = sum(1 for indicator in real_impl_indicators if indicator in tools_content)
    print(f"✅ Real implementation indicators found: {real_impl_count}")
    
    return len(tools)

if __name__ == "__main__":
    count = count_tools()