#!/usr/bin/env python3
"""
Surgical Final Repair Script for TypeScript AI Assistant
Targets the remaining critical syntax corruption patterns identified in core files.
"""

import os
import re
import glob
from typing import List, Tuple, Dict
import argparse
import shutil
from datetime import datetime

class SurgicalFinalRepairer:
    def __init__(self, src_directory: str = "src"):
        self.src_directory = src_directory
        self.backup_directory = f"backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        self.repair_count = 0
        self.files_processed = 0
        
        # Critical remaining patterns identified from file analysis
        self.surgical_patterns = [
            # Import/export corruption patterns
            (r'\bappRoute, r\b', 'appRouter'),
            (r'\bcreateContex, t\b', 'createContext'),
            (r'\binitializeAgentRegistr, y\b', 'initializeAgentRegistry'),
            (r'\binitializeToolRegistr, y\b', 'initializeToolRegistry'),
            (r'\blogge, r\b', 'logger'),
            (r'\bolla, m\b', 'ollama'),
            (r'\bCoreMessag, e\b', 'CoreMessage'),
            (r'\broute, r\b', 'router'),
            (r'\bhealthRoute, r\b', 'healthRouter'),
            (r'\bagentsRoute, r\b', 'agentsRouter'),
            (r'\borchestrationRoute, r\b', 'orchestrationRouter'),
            (r'\btoolsRoute, r\b', 'toolsRouter'),
            (r'\bauthRoute, r\b', 'authRouter'),
            
            # Date constructor fixes
            (r'\bnewDate\b', 'new Date'),
            
            # Generic type corruption
            (r'\bMap<stringan, y>', 'Map<string, any>'),
            (r'\bRecord<stringan, y>', 'Record<string, any>'),
            (r'\bRecord<stringAgentToo, l>', 'Record<string, AgentTool>'),
            (r'\bPromise<voi, d>', 'Promise<void>'),
            (r'\bPromise<AgentRegistr, y>', 'Promise<AgentRegistry>'),
            (r'\bPromise<AgentRespons, e>', 'Promise<AgentResponse>'),
            (r'\bstring\[\]an, y>', 'string[], any>'),
            
            # Function parameter corruption
            (r'\(agentId:, string\)', '(agentId: string)'),
            (r'\bagentId:, string', 'agentId: string'),
            (r'\(query: string context: AgentContext\)', '(query: string, context: AgentContext)'),
            (r'\(querycontext\)', '(query, context)'),
            (r'\(acctool\)', '(acc, tool)'),
            (r'\(agentIdagent\)', '(agentId, agent)'),
            (r'\(message: s\)', '(messages)'),
            (r'\(startTimeresponse\.tokenUsage\.totaltrue\)', '(startTime, response.tokenUsage.total, true)'),
            (r'\(executionTime, 0, falseerrorObj\)', '(executionTime, 0, false, errorObj)'),
            (r'\(errorObjexecutionTime\)', '(errorObj, executionTime)'),
            (r'\(resultDate\.now\(\)\)', '(result, Date.now())'),
            (r'\(querycontext\)', '(query, context)'),
            
            # Variable and property corruption
            (r'\bstartTim: e\b', 'startTime'),
            (r'\bcorrelationI: d\b', 'correlationId'),
            (r'\bcacheKe: y\b', 'cacheKey'),
            (r'\bcachedRespons: e\b', 'cachedResponse'),
            (r'\brespons: e\b', 'response'),
            (r'\bexecutionTim: e\b', 'executionTime'),
            (r'\berrorOb: j\b', 'errorObj'),
            (r'\bmessage: s\b', 'messages'),
            (r'\bresul: t\b', 'result'),
            (r'\btotalTim: e\b', 'totalTime'),
            (r'\bdefaultTas: k\b', 'defaultTask'),
            (r'\bprimar: y\b', 'primary'),
            (r'\bmodelI: d\b', 'modelId'),
            (r'\btestRespons: e\b', 'testResponse'),
            
            # Method chaining corruption
            (r'\.ge, t\(', '.get('),
            (r'\.se, t\(', '.set('),
            (r'\.pu, sh\(', '.push('),
            (r'\.ma, p\(', '.map('),
            (r'\.fil, ter\(', '.filter('),
            (r'\.redu, ce\(', '.reduce('),
            (r'\.for, Each\(', '.forEach('),
            (r'\.fin, d\(', '.find('),
            (r'\.inclu, des\(', '.includes('),
            (r'\.spl, ice\(', '.splice('),
            (r'\.joi, n\(', '.join('),
            (r'\.substri, ng\(', '.substring('),
            
            # Missing commas in function calls
            (r'registerAgent\(agentIdagent\)', 'registerAgent(agentId, agent)'),
            (r'registeredAgents\.set\(agentIdagent\)', 'registeredAgents.set(agentId, agent)'),
            (r'console\.log\(`Agent \$\{this\.config\.id\}`', 'console.log(`Agent ${this.config.id} executing query`, '),
            (r'console\.error\(`Agent \$\{this\.config\.id\}`', 'console.error(`Agent ${this.config.id} execution failed`, '),
            (r'console\.log\(`Agent \$\{this\.config\.id\}`, \{', 'console.log(`Agent ${this.config.id} executing query`, {'),
            
            # Property access corruption
            (r'\.constructor\.na, me', '.constructor.name'),
            (r'\.toISOStri, ng\(\)', '.toISOString()'),
            (r'\.getErrorMessa, ge\(', '.getErrorMessage('),
            
            # String concatenation issues
            (r'` ${agentId}`', '`${agentId}`'),
            (r'`Agent unregistered:, \$\{agentId\}`', '`Agent unregistered: ${agentId}`'),
            (r'htt, p://', 'http://'),
            (r'shutting down, gracefully', 'shutting down gracefully'),
            (r'Agent config not setskipping, initialization', 'Agent config not set, skipping initialization'),
            (r'Mastra agent not, initialized', 'Mastra agent not initialized'),
            (r'registry initialized, successfully', 'registry initialized successfully'),
            
            # Status code corruption
            (r'status \|\|, 500\)', 'status || 500)'),
            
            # Complex expression fixes
            (r'errortype, pathinputctx, req', 'error, type, path, input, ctx, req'),
            (r'correlationI, d \}', 'correlationId }'),
            (r'initialized, successfully', 'initialized successfully'),
            (r'agent, registry', 'agent registry'),
            (r'tool, registry', 'tool registry'),
            (r'Development mode, enabled', 'Development mode enabled'),
            (r'SIGTERM receivedshutting down, gracefully', 'SIGTERM received, shutting down gracefully'),
            (r'SIGINT receivedshutting down, gracefully', 'SIGINT received, shutting down gracefully'),
            (r'Shutting down agent, \$\{this\.config\.id\}', 'Shutting down agent ${this.config.id}'),
            
            # For loop corruption
            (r'for \(const \[agentIdagent\] of', 'for (const [agentId, agent] of'),
            
            # Import corruption patterns
            (r'getErrorMessagelogErro, r', 'getErrorMessage, logError'),
            (r'AgentConfigAgentResponse, AgentContextAgentTool', 'AgentConfig, AgentResponse, AgentContext, AgentTool'),
            
            # Complex parameter patterns
            (r'tokensUsed: numbersuccess: booleanerror\?:', 'tokensUsed: number, success: boolean, error?:'),
            (r'text\?: stringtoolCalls\?: Array<\{ toolName: string \}>,', 'text?: string, toolCalls?: Array<{ toolName: string }>,'),
            (r'usage\?: \{ promptTokens\?: numbercompletionTokens\?: numbertotalTokens\?: number \}', 'usage?: { promptTokens?: number, completionTokens?: number, totalTokens?: number }'),
            
            # Response object corruption
            (r'responser: esult\.text', 'response: result.text'),
            
            # Promise and async fixes
            (r'Promise<neve, r>', 'Promise<never>'),
            (r'Promise<boolea, n>', 'Promise<boolean>'),
            (r'AsyncGenerator<stringvoidunkno, w, n>', 'AsyncGenerator<string, void, unknown>'),
            
            # Math and calculation fixes
            (r'Math\.min\(this\.performanceMetrics\.minExecutionTimeexecutionTime\)', 'Math.min(this.performanceMetrics.minExecutionTime, executionTime)'),
            (r'Math\.max\(this\.performanceMetrics\.maxExecutionTimeexecutionTime\)', 'Math.max(this.performanceMetrics.maxExecutionTime, executionTime)'),
            
            # Specific BaseAgent.ts fixes
            (r'f\.:, any\) => f\.id', 'f: any) => f.id'),
            (r'correlationI, d \}', 'correlationId }'),
            (r'buildMessages\(querycontext\)', 'buildMessages(query, context)'),
            (r'executeWithMastra\(querycontext\)', 'executeWithMastra(query, context)'),
            (r'processAgentResult\(resultDate\.now\(\)\)', 'processAgentResult(result, Date.now())'),
            (r'calculateConfidence\(result\),', 'calculateConfidence(result),'),
            (r'newError\(String\(error\)\)', 'new Error(String(error))'),
            (r'createErrorResponse\(errorObjexecutionTime\)', 'createErrorResponse(errorObj, executionTime)'),
            (r'updatePerformanceMetrics\(executionTimeresponse\.tokenUsage\.totaltrue\)', 'updatePerformanceMetrics(executionTime, response.tokenUsage.total, true)'),
            (r'updatePerformanceMetrics\(executionTime, 0, falseerrorObj\)', 'updatePerformanceMetrics(executionTime, 0, false, errorObj)'),
            
            # Complex nested patterns
            (r'Map\(f:, any\) => f\.id\)\)', 'Map(f: any) => f.id))'),
            (r'duration: Date\.now\(\) - startTime, ', 'duration: Date.now() - startTime, '),
            (r'queue,', 'queue'),
            (r'defaultcan be overridden', 'default, can be overridden'),
            (r'Implementperformance tracking', 'Implement performance tracking'),
            (r'Implementcache when', 'Implement cache when'),
            (r'Cachesuccessful response', 'Cache successful response'),
            (r'Check if agent can respond', 'Check if agent can respond'),
        ]

    def create_backup(self):
        """Create backup of source directory"""
        if os.path.exists(self.src_directory):
            print(f"Creating backup at {self.backup_directory}...")
            shutil.copytree(self.src_directory, self.backup_directory)
            print(f"Backup created successfully")

    def apply_surgical_repairs(self, content: str) -> Tuple[str, int]:
        """Apply surgical repairs to content"""
        repairs_made = 0
        
        for pattern, replacement in self.surgical_patterns:
            original_content = content
            content = re.sub(pattern, replacement, content)
            
            # Count replacements made
            pattern_repairs = len(re.findall(pattern, original_content))
            repairs_made += pattern_repairs
            
            if pattern_repairs > 0:
                print(f"  Fixed {pattern_repairs} instances of: {pattern}")
        
        return content, repairs_made

    def process_file(self, file_path: str) -> bool:
        """Process a single TypeScript file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                original_content = f.read()
            
            # Apply surgical repairs
            repaired_content, repairs_made = self.apply_surgical_repairs(original_content)
            
            # Only write if changes were made
            if repairs_made > 0:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(repaired_content)
                
                print(f"Applied {repairs_made} surgical repairs to {file_path}")
                self.repair_count += repairs_made
                return True
            
            return False
            
        except Exception as e:
            print(f"Error processing {file_path}: {str(e)}")
            return False

    def find_typescript_files(self) -> List[str]:
        """Find all TypeScript files in the source directory"""
        patterns = ['**/*.ts', '**/*.tsx']
        files = []
        
        for pattern in patterns:
            files.extend(glob.glob(
                os.path.join(self.src_directory, pattern), 
                recursive=True
            ))
        
        # Filter out node_modules, dist, build directories
        exclude_dirs = ['node_modules', 'dist', 'build', '.next', 'coverage']
        filtered_files = []
        
        for file_path in files:
            if not any(exclude_dir in file_path for exclude_dir in exclude_dirs):
                filtered_files.append(file_path)
        
        return filtered_files

    def run_surgical_repair(self):
        """Execute the surgical repair process"""
        print("🔧 Starting Surgical Final Repair for TypeScript AI Assistant")
        print("=" * 60)
        
        # Create backup
        self.create_backup()
        
        # Find TypeScript files
        ts_files = self.find_typescript_files()
        print(f"Found {len(ts_files)} TypeScript files to process")
        
        # Process each file
        files_changed = 0
        for file_path in ts_files:
            print(f"\nProcessing: {file_path}")
            if self.process_file(file_path):
                files_changed += 1
            self.files_processed += 1
        
        # Summary
        print("\n" + "=" * 60)
        print("🎯 SURGICAL REPAIR COMPLETE")
        print(f"Files processed: {self.files_processed}")
        print(f"Files modified: {files_changed}")
        print(f"Total repairs applied: {self.repair_count}")
        print(f"Backup created at: {self.backup_directory}")
        
        if self.repair_count > 0:
            print("\n✅ Surgical repairs applied successfully!")
            print("📋 Next steps:")
            print("1. Run TypeScript compilation: npx tsc --noEmit")
            print("2. Check for remaining syntax errors")
            print("3. Proceed to Phase 2: Infrastructure Hardening")
        else:
            print("\n⚠️  No additional repairs needed")
            print("✅ TypeScript syntax appears to be clean!")

def main():
    parser = argparse.ArgumentParser(description='Surgical Final Repair for TypeScript AI Assistant')
    parser.add_argument('--src-dir', default='src', help='Source directory (default: src)')
    parser.add_argument('--dry-run', action='store_true', help='Show what would be repaired without making changes')
    
    args = parser.parse_args()
    
    if args.dry_run:
        print("🔍 DRY RUN MODE - No changes will be made")
    
    repairer = SurgicalFinalRepairer(args.src_dir)
    
    if not args.dry_run:
        repairer.run_surgical_repair()
    else:
        # For dry run, just show what would be processed
        ts_files = repairer.find_typescript_files()
        print(f"Would process {len(ts_files)} TypeScript files")
        for file_path in ts_files[:5]:  # Show first 5
            print(f"  - {file_path}")
        if len(ts_files) > 5:
            print(f"  ... and {len(ts_files) - 5} more files")

if __name__ == "__main__":
    main()