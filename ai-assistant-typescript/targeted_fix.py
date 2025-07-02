#!/usr/bin/env python3
"""
Conservative Targeted Fix Script for TypeScript AI Assistant
Only fixes specific remaining issues without aggressive pattern matching.
"""

import os
import re
import glob
from typing import List, Tuple

class TargetedRepairer:
    def __init__(self, src_directory: str = "src"):
        self.src_directory = src_directory
        self.repair_count = 0
        
        # Very specific targeted fixes only
        self.targeted_fixes = [
            # Import statement fixes (exact matches only)
            ("import { appRoute, r } from", "import { appRouter } from"),
            ("import { logge, r } from", "import { logger } from"),
            ("import { route, r } from", "import { router } from"),
            ("import { agentsRoute, r } from", "import { agentsRouter } from"),
            ("import { orchestrationRoute, r } from", "import { orchestrationRouter } from"),
            ("import { toolsRoute, r } from", "import { toolsRouter } from"),
            ("import { healthRoute, r } from", "import { healthRouter } from"),
            ("import { authRoute, r } from", "import { authRouter } from"),
            ("import { olla, m } from", "import { ollama } from"),
            ("import { CoreMessag, e } from", "import { CoreMessage } from"),
            
            # Date constructor fixes
            ("newDate()", "new Date()"),
            
            # Type definition fixes (exact patterns only)
            ("Map<stringan, y>", "Map<string, any>"),
            ("Record<stringan, y>", "Record<string, any>"),
            ("Record<stringAgentToo, l>", "Record<string, AgentTool>"),
            ("Promise<voi, d>", "Promise<void>"),
            ("Promise<AgentRegistr, y>", "Promise<AgentRegistry>"),
            ("Promise<AgentRespons, e>", "Promise<AgentResponse>"),
            ("Promise<boolea, n>", "Promise<boolean>"),
            ("Promise<neve, r>", "Promise<never>"),
            ("AsyncGenerator<stringvoidunkno, w, n>", "AsyncGenerator<string, void, unknown>"),
            ("Record<stringunknow, n>", "Record<string, unknown>"),
            
            # Function call fixes (exact patterns only)
            ("registerAgent(agentIdagent)", "registerAgent(agentId, agent)"),
            ("registeredAgents.set(agentIdagent)", "registeredAgents.set(agentId, agent)"),
            ("this.buildMessages(querycontext)", "this.buildMessages(query, context)"),
            ("this.executeWithMastra(querycontext)", "this.executeWithMastra(query, context)"),
            ("this.processAgentResult(resultDate.now())", "this.processAgentResult(result, Date.now())"),
            ("this.generateCacheKey(querycontext)", "this.generateCacheKey(query, context)"),
            ("this.updatePerformanceMetrics(executionTimeresponse.tokenUsage.totaltrue)", "this.updatePerformanceMetrics(executionTime, response.tokenUsage.total, true)"),
            ("this.updatePerformanceMetrics(executionTime, 0, falseerrorObj)", "this.updatePerformanceMetrics(executionTime, 0, false, errorObj)"),
            ("this.createErrorResponse(errorObjexecutionTime)", "this.createErrorResponse(errorObj, executionTime)"),
            ("newError(String(error))", "new Error(String(error))"),
            
            # Variable name fixes (exact patterns only)
            ("const startTim: e =", "const startTime ="),
            ("const correlationI: d =", "const correlationId ="),
            ("const respons: e =", "const response ="),
            ("const executionTim: e =", "const executionTime ="),
            ("const errorOb: j =", "const errorObj ="),
            ("const message: s =", "const messages ="),
            ("const resul: t =", "const result ="),
            ("const totalTim: e =", "const totalTime ="),
            ("const defaultTas: k =", "const defaultTask ="),
            ("const primar: y =", "const primary ="),
            ("const modelI: d =", "const modelId ="),
            ("const testRespons: e =", "const testResponse ="),
            ("const cacheKe: y =", "const cacheKey ="),
            ("const cachedRespons: e =", "const cachedResponse ="),
            
            # Property access fixes
            ("responser: esult.text", "response: result.text"),
            
            # URL fixes
            ("htt, p://", "http://"),
            
            # String literal fixes
            ("'Agent config not setskipping, initialization'", "'Agent config not set, skipping initialization'"),
            ("'Mastra agent not, initialized'", "'Mastra agent not initialized'"),
            ("SIGTERM receivedshutting down, gracefully", "SIGTERM received, shutting down gracefully"),
            ("SIGINT receivedshutting down, gracefully", "SIGINT received, shutting down gracefully"),
            ("agent, registry", "agent registry"),
            ("tool, registry", "tool registry"),
            ("Development mode, enabled", "Development mode enabled"),
            ("registry initialized, successfully", "registry initialized successfully"),
            ("'Agent unregistered:, ${agentId}'", "'Agent unregistered: ${agentId}'"),
            ("'Shutting down agent, ${this.config.id}'", "'Shutting down agent ${this.config.id}'"),
            
            # Math operation fixes
            ("Math.min(this.performanceMetrics.minExecutionTimeexecutionTime)", "Math.min(this.performanceMetrics.minExecutionTime, executionTime)"),
            ("Math.max(this.performanceMetrics.maxExecutionTimeexecutionTime)", "Math.max(this.performanceMetrics.maxExecutionTime, executionTime)"),
            
            # Complex type fixes
            ("AgentConfigAgentResponse, AgentContextAgentTool", "AgentConfig, AgentResponse, AgentContext, AgentTool"),
            ("PerformanceMetricsAgentStatus", "PerformanceMetrics, AgentStatus"),
            ("getErrorMessagelogErro, r", "getErrorMessage, logError"),
            
            # Parameter fixes
            ("(acctool)", "(acc, tool)"),
            ("tokensUsed: numbersuccess: booleanerror?:", "tokensUsed: number, success: boolean, error?:"),
            ("text?: stringtoolCalls?: Array<{ toolName: string }>", "text?: string, toolCalls?: Array<{ toolName: string }>"),
            ("promptTokens?: numbercompletionTokens?: numbertotalTokens?: number", "promptTokens?: number, completionTokens?: number, totalTokens?: number"),
            
            # Loop fixes
            ("for (const [agentIdagent] of", "for (const [agentId, agent] of"),
            
            # Function parameter type fixes
            ("(f:, any) => f.id", "(f: any) => f.id"),
            ("agentId:, string", "agentId: string"),
            
            # Error handler parameter fix
            ("onError({ errortype, pathinputctx, req })", "onError({ error, type, path, input, ctx, req })"),
            
            # Status code fix
            ("err.status ||, 500", "err.status || 500"),
            
            # Logger message fixes
            ("logger.info('Starting agent registration, process')", "logger.info('Starting agent registration process')"),
            ("logger.info('Initializing agent, registry...')", "logger.info('Initializing agent registry...')"),
            ("logger.info('Initializing tool, registry...')", "logger.info('Initializing tool registry...')"),
            
            # Running on server fix
            ("running on, http://localhost:", "running on http://localhost:"),
            ("endpoint: htt, p://localhost:", "endpoint: http://localhost:"),
            ("check: htt, p://localhost:", "check: http://localhost:"),
            ("Playground: htt, p://localhost:", "Playground: http://localhost:"),
            
            # Comment fixes
            ("defaultcan be overridden", "default, can be overridden"),
            ("Implementperformance tracking", "Implement performance tracking"),
            ("Implementcache when", "Implement cache when"),
            ("Cachesuccessful response", "Cache successful response"),
            
            # Console log fixes  
            ("console.log(`Agent ${this.config.id}`,", "console.log(`Agent ${this.config.id} executing query`,"),
            ("console.error(`Agent ${this.config.id}`,", "console.error(`Agent ${this.config.id} execution failed`,"),
            
            # Cache TTL queue fixes
            ("queue,", "queue"),
            ("correlationI, d }", "correlationId }"),
        ]

    def apply_targeted_fixes(self, content: str) -> Tuple[str, int]:
        """Apply targeted fixes to content"""
        repairs_made = 0
        
        for old_text, new_text in self.targeted_fixes:
            if old_text in content:
                content = content.replace(old_text, new_text)
                repairs_made += content.count(new_text) - content.count(old_text)
                if repairs_made > 0:
                    print(f"  Fixed: {old_text} → {new_text}")
        
        return content, repairs_made

    def process_file(self, file_path: str) -> bool:
        """Process a single TypeScript file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                original_content = f.read()
            
            # Apply targeted fixes
            repaired_content, repairs_made = self.apply_targeted_fixes(original_content)
            
            # Only write if changes were made
            if repairs_made > 0:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(repaired_content)
                
                print(f"Applied {repairs_made} targeted fixes to {file_path}")
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

    def run_targeted_repair(self):
        """Execute the targeted repair process"""
        print("🎯 Starting Targeted Fix for TypeScript AI Assistant")
        print("=" * 60)
        
        # Find TypeScript files
        ts_files = self.find_typescript_files()
        print(f"Found {len(ts_files)} TypeScript files to process")
        
        # Process each file
        files_changed = 0
        for file_path in ts_files:
            print(f"\nProcessing: {file_path}")
            if self.process_file(file_path):
                files_changed += 1
        
        # Summary
        print("\n" + "=" * 60)
        print("🎯 TARGETED REPAIR COMPLETE")
        print(f"Files modified: {files_changed}")
        print(f"Total fixes applied: {self.repair_count}")
        
        if self.repair_count > 0:
            print("\n✅ Targeted fixes applied successfully!")
            print("📋 Next step: Run TypeScript compilation: npx tsc --noEmit")
        else:
            print("\n⚠️  No targeted fixes needed")

def main():
    repairer = TargetedRepairer()
    repairer.run_targeted_repair()

if __name__ == "__main__":
    main()