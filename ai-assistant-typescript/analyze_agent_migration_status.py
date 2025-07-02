#!/usr/bin/env python3
"""
Analyze migration status of all agents and prioritize migration order
"""
import os
import re
import json
from datetime import datetime
from typing import Dict, List, Tuple

class AgentMigrationAnalyzer:
    def __init__(self):
        self.agents_dir = "src/agents/experts"
        self.agents = {}
        self.migration_summary = {
            "timestamp": datetime.now().isoformat(),
            "migrated_to_expert": [],
            "needs_migration": [],
            "migration_priority": [],
            "tool_implementation_status": {}
        }
        
    def analyze_all_agents(self):
        """Analyze all agent files"""
        print("🔍 Analyzing AI Agent Migration Status...\n")
        
        # Get all TypeScript files
        for filename in os.listdir(self.agents_dir):
            if filename.endswith('.ts') and not filename.endswith('.test.ts'):
                agent_name = filename.replace('.ts', '')
                file_path = os.path.join(self.agents_dir, filename)
                self.analyze_agent(agent_name, file_path)
                
        # Generate summary
        self.generate_summary()
        
    def analyze_agent(self, agent_name: str, file_path: str):
        """Analyze individual agent"""
        with open(file_path, 'r') as f:
            content = f.read()
            
        agent_info = {
            "name": agent_name,
            "extends_expert_template": "extends ExpertAgentTemplate" in content,
            "extends_base_agent": "extends BaseAgent" in content,
            "has_rag_config": "ragConfig:" in content or "ragConfig =" in content,
            "has_specialization": "specialization:" in content or "specialization =" in content,
            "tools": self.count_tools(content),
            "real_implementations": self.count_real_implementations(content),
            "has_ollama_integration": "OllamaService" in content,
            "compilation_ready": self.check_compilation_ready(content),
            "dependencies": self.extract_dependencies(content)
        }
        
        self.agents[agent_name] = agent_info
        
        # Categorize agent
        if agent_info["extends_expert_template"]:
            self.migration_summary["migrated_to_expert"].append(agent_name)
        elif agent_info["extends_base_agent"]:
            self.migration_summary["needs_migration"].append(agent_name)
            
    def count_tools(self, content: str) -> Dict:
        """Count tools in agent"""
        # Look for getTools() or getToolDefinitions()
        tools_match = re.search(r'(getTools|getToolDefinitions)\(\).*?\{(.*?)\n\s*\}', content, re.DOTALL)
        
        if not tools_match:
            return {"count": 0, "names": []}
            
        tools_content = tools_match.group(2)
        
        # Count tool definitions
        tool_names = re.findall(r"name:\s*['\"]([^'\"]+)['\"]", tools_content)
        
        return {
            "count": len(tool_names),
            "names": tool_names
        }
        
    def count_real_implementations(self, content: str) -> int:
        """Count real implementations (not mocks/templates)"""
        fake_indicators = [
            "TODO",
            "FIXME",
            "mock",
            "fake",
            "dummy",
            "template implementation",
            "return { success: true, data: 'fake'",
            "return { success: true, result: 'mock'"
        ]
        
        real_indicators = [
            "await this.ollamaService",
            ".execute(",
            "try {",
            "catch (error)",
            "await fetch(",
            "subprocess.spawn",
            "fs.readFile",
            "fs.writeFile"
        ]
        
        # Count fake indicators
        fake_count = sum(1 for indicator in fake_indicators if indicator.lower() in content.lower())
        
        # Count real implementation indicators
        real_count = sum(1 for indicator in real_indicators if indicator in content)
        
        # If more real than fake, consider it has real implementations
        return real_count if real_count > fake_count else 0
        
    def check_compilation_ready(self, content: str) -> bool:
        """Check if agent is likely to compile without errors"""
        # Basic checks for common compilation issues
        issues = []
        
        if "extends BaseAgent" in content and "extends ExpertAgentTemplate" not in content:
            # Check for ExpertAgentTemplate-specific methods
            if "executeTraditionalProcessing" not in content:
                issues.append("missing_executeTraditionalProcessing")
                
        if "private ollamaService" in content:
            issues.append("private_ollama_should_be_protected")
            
        if ".generateResponse(" in content:
            issues.append("uses_deprecated_generateResponse")
            
        return len(issues) == 0
        
    def extract_dependencies(self, content: str) -> List[str]:
        """Extract which other agents this agent depends on"""
        dependencies = []
        
        # Look for references to other agents
        agent_refs = re.findall(r"get[A-Z][a-zA-Z]*Expert\(\)", content)
        for ref in agent_refs:
            dep_name = ref.replace("get", "").replace("()", "")
            if dep_name not in dependencies:
                dependencies.append(dep_name)
                
        # Look for imports from other agents
        import_matches = re.findall(r"from ['\"]\.\.?/([A-Za-z]+)['\"]", content)
        for match in import_matches:
            if match.endswith("Expert") or match.endswith("Specialist") or match == "MasterOrchestrator":
                if match not in dependencies:
                    dependencies.append(match)
                    
        return dependencies
        
    def calculate_priority(self, agent_name: str, agent_info: Dict) -> int:
        """Calculate migration priority (lower number = higher priority)"""
        priority = 100  # Base priority
        
        # High priority agents
        high_priority = [
            "LLMIntegrationExpert",  # Core AI functionality
            "SecuritySpecialist",    # Security is critical
            "ErrorAnalysisExpert",   # Error handling important
            "PythonExpert",         # Core language support
            "ProjectPlanningExpert", # Project coordination
            "ArchitectureExpert"    # System design
        ]
        
        if agent_name in high_priority:
            priority -= 50
            
        # Adjust based on dependencies
        if len(agent_info["dependencies"]) > 3:
            priority -= 20  # Many dependencies = important hub
            
        # Adjust based on tool count
        if agent_info["tools"]["count"] > 5:
            priority -= 10  # Many tools = complex agent
            
        # Adjust based on real implementations
        if agent_info["real_implementations"] > 0:
            priority -= 15  # Already has real code = easier to migrate
            
        # Penalize if not compilation ready
        if not agent_info["compilation_ready"]:
            priority += 10
            
        return priority
        
    def generate_summary(self):
        """Generate migration summary and priority list"""
        # Calculate priorities for agents needing migration
        priorities = []
        for agent_name in self.migration_summary["needs_migration"]:
            agent_info = self.agents[agent_name]
            priority = self.calculate_priority(agent_name, agent_info)
            priorities.append((priority, agent_name, agent_info))
            
        # Sort by priority
        priorities.sort(key=lambda x: x[0])
        
        # Create prioritized list
        self.migration_summary["migration_priority"] = [
            {
                "rank": i + 1,
                "agent": name,
                "priority_score": score,
                "tools": info["tools"]["count"],
                "real_implementations": info["real_implementations"],
                "dependencies": len(info["dependencies"]),
                "compilation_ready": info["compilation_ready"]
            }
            for i, (score, name, info) in enumerate(priorities)
        ]
        
        # Tool implementation status
        for agent_name, info in self.agents.items():
            self.migration_summary["tool_implementation_status"][agent_name] = {
                "total_tools": info["tools"]["count"],
                "tool_names": info["tools"]["names"],
                "has_real_implementations": info["real_implementations"] > 0
            }
            
    def print_report(self):
        """Print migration report"""
        print("="*80)
        print("📊 AI AGENT MIGRATION STATUS REPORT")
        print("="*80)
        
        # Summary counts
        total_agents = len(self.agents)
        migrated = len(self.migration_summary["migrated_to_expert"])
        needs_migration = len(self.migration_summary["needs_migration"])
        
        print(f"\n📈 SUMMARY:")
        print(f"  Total Agents: {total_agents}")
        print(f"  ✅ Migrated to ExpertAgentTemplate: {migrated} ({migrated/total_agents*100:.1f}%)")
        print(f"  ⏳ Needs Migration: {needs_migration} ({needs_migration/total_agents*100:.1f}%)")
        
        # Already migrated
        print(f"\n✅ ALREADY MIGRATED ({migrated} agents):")
        for agent in sorted(self.migration_summary["migrated_to_expert"]):
            info = self.agents[agent]
            tools = info["tools"]["count"]
            print(f"  • {agent} - {tools} tools")
            
        # Migration priority
        print(f"\n🎯 MIGRATION PRIORITY ORDER ({needs_migration} agents):")
        print("  Rank | Agent Name                     | Priority | Tools | Real Impl | Deps | Ready")
        print("  -----|--------------------------------|----------|-------|-----------|------|------")
        
        for item in self.migration_summary["migration_priority"][:10]:  # Show top 10
            print(f"  {item['rank']:4d} | {item['agent']:30s} | {item['priority_score']:8d} | "
                  f"{item['tools']:5d} | {item['real_implementations']:9d} | "
                  f"{item['dependencies']:4d} | {'Yes' if item['compilation_ready'] else 'No':5s}")
                  
        if len(self.migration_summary["migration_priority"]) > 10:
            print(f"  ... and {len(self.migration_summary['migration_priority']) - 10} more agents")
            
        # Tool implementation summary
        print("\n🔧 TOOL IMPLEMENTATION SUMMARY:")
        total_tools = sum(info["tools"]["count"] for info in self.agents.values())
        agents_with_tools = sum(1 for info in self.agents.values() if info["tools"]["count"] > 0)
        agents_with_real_impl = sum(1 for info in self.agents.values() if info["real_implementations"] > 0)
        
        print(f"  Total Tools Across All Agents: {total_tools}")
        print(f"  Agents with Tools: {agents_with_tools}/{total_agents}")
        print(f"  Agents with Real Implementations: {agents_with_real_impl}/{total_agents}")
        
        # Next recommended agent
        if self.migration_summary["migration_priority"]:
            next_agent = self.migration_summary["migration_priority"][0]
            print(f"\n🚀 RECOMMENDED NEXT MIGRATION:")
            print(f"  Agent: {next_agent['agent']}")
            print(f"  Priority Score: {next_agent['priority_score']}")
            print(f"  Tools to Implement: {next_agent['tools']}")
            print(f"  Already Has Real Code: {'Yes' if next_agent['real_implementations'] > 0 else 'No'}")
            print(f"  Dependencies: {next_agent['dependencies']}")
            
            # Show tools for next agent
            agent_info = self.agents[next_agent['agent']]
            if agent_info['tools']['names']:
                print(f"  Tools: {', '.join(agent_info['tools']['names'])}")
                
    def save_report(self):
        """Save detailed report"""
        with open("agent_migration_analysis.json", "w") as f:
            json.dump({
                "summary": self.migration_summary,
                "agents": self.agents
            }, f, indent=2)
            
        # Create markdown report
        with open("AGENT_MIGRATION_PRIORITY_REPORT.md", "w") as f:
            f.write("# AI Agent Migration Priority Report\n\n")
            f.write(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")
            
            # Summary
            total = len(self.agents)
            migrated = len(self.migration_summary["migrated_to_expert"])
            pending = len(self.migration_summary["needs_migration"])
            
            f.write("## 📊 Summary\n\n")
            f.write(f"- **Total Agents:** {total}\n")
            f.write(f"- **Migrated to ExpertAgentTemplate:** {migrated} ({migrated/total*100:.1f}%)\n")
            f.write(f"- **Pending Migration:** {pending} ({pending/total*100:.1f}%)\n\n")
            
            # Migrated agents
            f.write("## ✅ Already Migrated\n\n")
            for agent in sorted(self.migration_summary["migrated_to_expert"]):
                info = self.agents[agent]
                f.write(f"- **{agent}** - {info['tools']['count']} tools\n")
                
            # Priority list
            f.write("\n## 🎯 Migration Priority Order\n\n")
            f.write("| Rank | Agent | Priority Score | Tools | Real Impl | Dependencies | Compilation Ready |\n")
            f.write("|------|-------|----------------|-------|-----------|--------------|------------------|\n")
            
            for item in self.migration_summary["migration_priority"]:
                ready = "✅" if item["compilation_ready"] else "❌"
                f.write(f"| {item['rank']} | {item['agent']} | {item['priority_score']} | "
                       f"{item['tools']} | {item['real_implementations']} | "
                       f"{item['dependencies']} | {ready} |\n")
                       
            # Detailed recommendations
            f.write("\n## 📋 Detailed Migration Plan\n\n")
            
            for i, item in enumerate(self.migration_summary["migration_priority"][:5]):
                agent_info = self.agents[item['agent']]
                f.write(f"### {i+1}. {item['agent']}\n\n")
                f.write(f"**Priority Score:** {item['priority_score']}\n\n")
                f.write(f"**Current Status:**\n")
                f.write(f"- Tools defined: {item['tools']}\n")
                f.write(f"- Has real implementations: {'Yes' if item['real_implementations'] > 0 else 'No'}\n")
                f.write(f"- Dependencies: {item['dependencies']}\n")
                f.write(f"- Compilation ready: {'Yes' if item['compilation_ready'] else 'No'}\n")
                
                if agent_info['tools']['names']:
                    f.write(f"\n**Tools to migrate:**\n")
                    for tool in agent_info['tools']['names']:
                        f.write(f"- {tool}\n")
                        
                f.write("\n---\n\n")
                
if __name__ == "__main__":
    analyzer = AgentMigrationAnalyzer()
    analyzer.analyze_all_agents()
    analyzer.print_report()
    analyzer.save_report()
    
    print("\n📄 Detailed reports saved:")
    print("  - agent_migration_analysis.json")
    print("  - AGENT_MIGRATION_PRIORITY_REPORT.md")