#!/usr/bin/env python3
"""
Comprehensive verification script for MasterOrchestrator migration to ExpertAgentTemplate.
Validates:
1. All 12 tools are real implementations (no hardcoded data)
2. RAG integration is properly configured
3. TypeScript compilation succeeds
4. No fake/mock implementations
5. Proper inheritance from ExpertAgentTemplate
"""

import os
import re
import json
import subprocess
from datetime import datetime
from typing import Dict, List, Tuple, Any

class MasterOrchestratorVerifier:
    def __init__(self):
        self.mo_file = "src/agents/experts/MasterOrchestrator.ts"
        self.verification_results = {
            "timestamp": datetime.now().isoformat(),
            "file": self.mo_file,
            "checks": {},
            "tools": {},
            "issues": []
        }
        
    def verify_all(self) -> Dict[str, Any]:
        """Run all verification checks"""
        print("🔍 Starting MasterOrchestrator Migration Verification...\n")
        
        # Check 1: File exists and readable
        if not self.verify_file_exists():
            return self.verification_results
            
        # Check 2: Extends ExpertAgentTemplate
        self.verify_inheritance()
        
        # Check 3: RAG configuration
        self.verify_rag_config()
        
        # Check 4: All 12 tools implemented
        self.verify_tools_implementation()
        
        # Check 5: No hardcoded/fake data
        self.verify_no_fake_data()
        
        # Check 6: TypeScript compilation
        self.verify_typescript_compilation()
        
        # Check 7: OllamaService integration
        self.verify_ollama_integration()
        
        # Check 8: Required imports
        self.verify_imports()
        
        # Generate summary
        self.generate_summary()
        
        return self.verification_results
        
    def verify_file_exists(self) -> bool:
        """Check if MasterOrchestrator file exists"""
        if os.path.exists(self.mo_file):
            self.verification_results["checks"]["file_exists"] = True
            print("✅ MasterOrchestrator.ts file exists")
            return True
        else:
            self.verification_results["checks"]["file_exists"] = False
            self.verification_results["issues"].append("MasterOrchestrator.ts file not found")
            print("❌ MasterOrchestrator.ts file not found")
            return False
            
    def verify_inheritance(self):
        """Verify MasterOrchestrator extends ExpertAgentTemplate"""
        with open(self.mo_file, 'r') as f:
            content = f.read()
            
        # Check class declaration
        class_pattern = r'export\s+class\s+MasterOrchestrator\s+extends\s+ExpertAgentTemplate'
        if re.search(class_pattern, content):
            self.verification_results["checks"]["extends_expert_template"] = True
            print("✅ Correctly extends ExpertAgentTemplate")
        else:
            self.verification_results["checks"]["extends_expert_template"] = False
            self.verification_results["issues"].append("Does not extend ExpertAgentTemplate")
            print("❌ Does not extend ExpertAgentTemplate")
            
        # Check for specialization
        if "specialization: ExpertSpecialization = {" in content:
            self.verification_results["checks"]["has_specialization"] = True
            print("✅ Has ExpertSpecialization configuration")
        else:
            self.verification_results["checks"]["has_specialization"] = False
            self.verification_results["issues"].append("Missing ExpertSpecialization")
            
    def verify_rag_config(self):
        """Verify RAG configuration is properly set up"""
        with open(self.mo_file, 'r') as f:
            content = f.read()
            
        rag_checks = {
            "has_rag_config": "ragConfig: Partial<RAGConfig> = {" in content,
            "rag_enabled": "enabled: true" in content,
            "has_embedding_model": "embeddingModel:" in content,
            "has_chunk_size": "chunkSize:" in content,
            "has_knowledge_domains": "knowledgeDomains:" in content,
            "orchestration_domains": "orchestration_patterns" in content
        }
        
        for check, result in rag_checks.items():
            self.verification_results["checks"][f"rag_{check}"] = result
            if result:
                print(f"✅ RAG check: {check}")
            else:
                print(f"❌ RAG check failed: {check}")
                self.verification_results["issues"].append(f"RAG config missing: {check}")
                
    def verify_tools_implementation(self):
        """Verify all 12 tools are implemented with real functionality"""
        with open(self.mo_file, 'r') as f:
            content = f.read()
            
        expected_tools = [
            "interpret_request_ai",
            "decompose_tasks_ai", 
            "evaluate_quality_ai",
            "route_with_enhanced_tools",
            "send_cross_agent_message",
            "parse_with_enhanced_parser",
            "generate_outcome_specification",
            "generate_task_plan",
            "create_coordination_plan",
            "validate_progress",
            "assess_delivery_confidence",
            "route_with_traditional_parser"
        ]
        
        tools_found = 0
        for tool in expected_tools:
            # Check tool exists
            tool_pattern = rf"name:\s*['\"]?{tool}['\"]?"
            if re.search(tool_pattern, content):
                self.verification_results["tools"][tool] = {"exists": True}
                
                # Check for execute function
                if f"execute: async" in content:
                    self.verification_results["tools"][tool]["has_execute"] = True
                    
                # Check for real implementation (not just returning hardcoded)
                tool_section = self._extract_tool_section(content, tool)
                if tool_section:
                    has_real_impl = self._check_real_implementation(tool_section)
                    self.verification_results["tools"][tool]["real_implementation"] = has_real_impl
                    
                tools_found += 1
                print(f"✅ Tool implemented: {tool}")
            else:
                self.verification_results["tools"][tool] = {"exists": False}
                self.verification_results["issues"].append(f"Tool missing: {tool}")
                print(f"❌ Tool missing: {tool}")
                
        self.verification_results["checks"]["tools_count"] = f"{tools_found}/12"
        print(f"\n📊 Tools implemented: {tools_found}/12")
        
    def _extract_tool_section(self, content: str, tool_name: str) -> str:
        """Extract the implementation section for a specific tool"""
        start_pattern = rf"name:\s*['\"]?{tool_name}['\"]?"
        match = re.search(start_pattern, content)
        if not match:
            return ""
            
        start_pos = match.start()
        # Find the next tool or end of tools array
        next_tool_pattern = r"{\s*name:\s*['\"]"
        next_match = re.search(next_tool_pattern, content[start_pos + 100:])
        
        if next_match:
            end_pos = start_pos + 100 + next_match.start()
        else:
            end_pos = start_pos + 2000  # Take next 2000 chars
            
        return content[start_pos:end_pos]
        
    def _check_real_implementation(self, tool_section: str) -> bool:
        """Check if tool has real implementation vs hardcoded/fake data"""
        fake_indicators = [
            "hardcoded",
            "TODO",
            "FIXME", 
            "mock",
            "fake",
            "dummy",
            "return { success: true, data: 'fake'",
            "return { success: true, data: 'mock'",
            'data: "fake',
            'data: "mock',
            "// Fake implementation",
            "// Mock implementation",
            "// TODO: Implement"
        ]
        
        real_indicators = [
            "await this.ollamaService",
            "await ollamaService",
            "getEnhancedParser()",
            "getAgentRouter()",
            "getCrossAgentCommunicator()",
            ".execute(",
            ".analyze(",
            ".interpretRequest(",
            ".decomposeIntoTasks(",
            "try {",
            "catch (error)"
        ]
        
        # Check for fake indicators
        for indicator in fake_indicators:
            if indicator.lower() in tool_section.lower():
                return False
                
        # Check for real implementation indicators
        real_count = sum(1 for indicator in real_indicators if indicator in tool_section)
        
        return real_count >= 2  # At least 2 real implementation indicators
        
    def verify_no_fake_data(self):
        """Verify no hardcoded or fake data in the implementation"""
        with open(self.mo_file, 'r') as f:
            content = f.read()
            
        fake_patterns = [
            r"return\s*{\s*success:\s*true,\s*data:\s*['\"]fake",
            r"return\s*{\s*success:\s*true,\s*data:\s*['\"]mock",
            r"hardcoded\s*=\s*['\"]",
            r"fake\s*data",
            r"mock\s*response",
            r"dummy\s*value",
            r"TODO:\s*implement",
            r"FIXME:\s*real\s*implementation"
        ]
        
        fake_found = False
        for pattern in fake_patterns:
            matches = re.findall(pattern, content, re.IGNORECASE)
            if matches:
                fake_found = True
                self.verification_results["issues"].append(f"Fake data pattern found: {pattern}")
                
        self.verification_results["checks"]["no_fake_data"] = not fake_found
        if not fake_found:
            print("✅ No fake/hardcoded data found")
        else:
            print("❌ Fake/hardcoded data detected")
            
    def verify_typescript_compilation(self):
        """Verify TypeScript compilation succeeds"""
        try:
            # Run TypeScript compiler in check mode
            result = subprocess.run(
                ["npx", "tsc", "--noEmit", self.mo_file],
                capture_output=True,
                text=True,
                cwd=os.path.dirname(os.path.abspath(self.mo_file)) or "."
            )
            
            # Check if MasterOrchestrator has any errors
            mo_errors = [line for line in result.stderr.split('\n') if 'MasterOrchestrator.ts' in line and 'error' in line]
            
            if not mo_errors:
                self.verification_results["checks"]["typescript_compilation"] = True
                print("✅ TypeScript compilation successful (no MasterOrchestrator errors)")
            else:
                self.verification_results["checks"]["typescript_compilation"] = False
                self.verification_results["issues"].append(f"TypeScript errors: {len(mo_errors)}")
                print(f"❌ TypeScript compilation errors: {len(mo_errors)}")
                for error in mo_errors[:3]:  # Show first 3 errors
                    print(f"   - {error}")
                    
        except Exception as e:
            self.verification_results["checks"]["typescript_compilation"] = False
            self.verification_results["issues"].append(f"TypeScript check failed: {str(e)}")
            print(f"❌ TypeScript compilation check failed: {e}")
            
    def verify_ollama_integration(self):
        """Verify OllamaService integration"""
        with open(self.mo_file, 'r') as f:
            content = f.read()
            
        ollama_checks = {
            "imports_ollama": "import { OllamaService" in content,
            "has_ollama_property": "protected ollamaService?: OllamaService" in content,
            "initializes_ollama": "initializeOllamaService" in content,
            "uses_analyze": ".analyze(" in content,
            "no_generate_response": ".generateResponse(" not in content  # Should use analyze instead
        }
        
        for check, result in ollama_checks.items():
            self.verification_results["checks"][f"ollama_{check}"] = result
            if result:
                print(f"✅ Ollama integration: {check}")
            else:
                print(f"❌ Ollama integration issue: {check}")
                self.verification_results["issues"].append(f"Ollama integration: {check}")
                
    def verify_imports(self):
        """Verify all required imports are present"""
        with open(self.mo_file, 'r') as f:
            content = f.read()
            
        required_imports = [
            "ExpertAgentTemplate",
            "ExpertSpecialization", 
            "RAGConfig",
            "ToolCategory",
            "AgentConfig",
            "AgentTool",
            "ToolExecutionResult",
            "OllamaService",
            "RequestIntent"
        ]
        
        missing_imports = []
        for imp in required_imports:
            if f"import" in content and imp in content:
                print(f"✅ Import found: {imp}")
            else:
                missing_imports.append(imp)
                print(f"❌ Import missing: {imp}")
                
        self.verification_results["checks"]["imports_complete"] = len(missing_imports) == 0
        if missing_imports:
            self.verification_results["issues"].append(f"Missing imports: {', '.join(missing_imports)}")
            
    def generate_summary(self):
        """Generate verification summary"""
        total_checks = len(self.verification_results["checks"])
        passed_checks = sum(1 for v in self.verification_results["checks"].values() if v is True)
        
        # Count real tool implementations
        real_tools = sum(1 for tool in self.verification_results["tools"].values() 
                        if tool.get("exists") and tool.get("real_implementation"))
                        
        self.verification_results["summary"] = {
            "total_checks": total_checks,
            "passed_checks": passed_checks,
            "success_rate": f"{(passed_checks/total_checks)*100:.1f}%",
            "tools_implemented": len([t for t in self.verification_results["tools"].values() if t.get("exists")]),
            "real_implementations": real_tools,
            "issues_count": len(self.verification_results["issues"])
        }
        
        print("\n" + "="*60)
        print("📊 VERIFICATION SUMMARY")
        print("="*60)
        print(f"Total checks: {total_checks}")
        print(f"Passed checks: {passed_checks}")
        print(f"Success rate: {(passed_checks/total_checks)*100:.1f}%")
        print(f"Tools implemented: {self.verification_results['summary']['tools_implemented']}/12")
        print(f"Real implementations: {real_tools}/12")
        print(f"Issues found: {len(self.verification_results['issues'])}")
        
        if self.verification_results["issues"]:
            print("\n⚠️  Issues:")
            for issue in self.verification_results["issues"][:5]:  # Show first 5 issues
                print(f"  - {issue}")
                
        if passed_checks == total_checks and real_tools == 12:
            print("\n✅ VERIFICATION PASSED - MasterOrchestrator migration is complete!")
        else:
            print("\n❌ VERIFICATION FAILED - Issues need to be addressed")
            
if __name__ == "__main__":
    verifier = MasterOrchestratorVerifier()
    results = verifier.verify_all()
    
    # Save results
    with open("mo_verification_results.json", "w") as f:
        json.dump(results, f, indent=2)
        
    print(f"\n📄 Detailed results saved to: mo_verification_results.json")
    
    # Exit with appropriate code
    exit(0 if results["summary"]["success_rate"] == "100.0%" else 1)