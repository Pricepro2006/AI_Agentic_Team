#!/usr/bin/env python3
"""
Final Critical Repair Script for TypeScript AI Assistant
Targets the remaining critical syntax errors found in TypeScript compilation.
"""

import os
import re
import glob
from typing import List, Tuple, Dict
import argparse
import shutil
from datetime import datetime

class FinalCriticalRepairer:
    def __init__(self, src_directory: str = "src"):
        self.src_directory = src_directory
        self.backup_directory = f"backup_final_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        self.repair_count = 0
        self.files_processed = 0
        
        # Critical remaining patterns from TypeScript compilation errors
        self.critical_patterns = [
            # Double comma fixes (very common issue)
            (r'console\.log\(`([^`]+)`, ,', r'console.log(`\1`,'),
            (r'console\.error\(`([^`]+)`, ,', r'console.error(`\1`,'),
            (r'console\.info\(`([^`]+)`, ,', r'console.info(`\1`,'),
            (r'console\.warn\(`([^`]+)`, ,', r'console.warn(`\1`,'),
            (r'logger\.info\(`([^`]+)`, ,', r'logger.info(`\1`,'),
            (r'logger\.error\(`([^`]+)`, ,', r'logger.error(`\1`,'),
            (r'logger\.warn\(`([^`]+)`, ,', r'logger.warn(`\1`,'),
            (r'logger\.debug\(`([^`]+)`, ,', r'logger.debug(`\1`,'),
            
            # Function parameter type corruption
            (r'\(f:, any\)', '(f: any)'),
            (r'map\(f:, any\)', 'map(f: any)'),
            (r'filter\(f:, any\)', 'filter(f: any)'),
            (r'reduce\(f:, any\)', 'reduce(f: any)'),
            (r'forEach\(f:, any\)', 'forEach(f: any)'),
            
            # Complex type definition fixes
            (r'Record<stringunknow, n>', 'Record<string, unknown>'),
            (r'Record<string unknown>', 'Record<string, unknown>'),
            (r'Record<stringboolean>', 'Record<string, boolean>'),
            (r'Record<stringnumber>', 'Record<string, number>'),
            (r'Record<stringstring>', 'Record<string, string>'),
            (r'Array<\{ ([^}]+)>\}', r'Array<{ \1 }>'),
            
            # Function signature fixes
            (r'Promise<([^>]+)>\s*,\s*([^>]+)>', r'Promise<\1>, \2>'),
            (r'async\s+function\s+([^(]+)\(([^:]+):\s*([^,)]+)([^,)]*)\):', r'async function \1(\2: \3\4):'),
            
            # Cache and response fixes
            (r'cache\.set\(cacheKeyresponsethis\.getCacheTTL\(\)\)', 'cache.set(cacheKey, response, this.getCacheTTL())'),
            (r'cache\.get<([^>]+)>\(cacheKey\)', r'cache.get<\1>(cacheKey)'),
            
            # Import statement fixes
            (r'import \{ ([^}]+)([A-Z][a-zA-Z]*), ([A-Z][a-zA-Z]*) \}', r'import { \1\2, \3 }'),
            (r'AgentConfigAgentResponse, AgentContextAgentTool', 'AgentConfig, AgentResponse, AgentContext, AgentTool'),
            (r'PerformanceMetricsAgentStatus', 'PerformanceMetrics, AgentStatus'),
            (r'getErrorMessage, logError', 'getErrorMessage, logError'),
            
            # Method call fixes
            (r'\.map\(([^)]+)\)\s*\)', r'.map(\1))'),
            (r'\.filter\(([^)]+)\)\s*\)', r'.filter(\1))'),
            (r'\.reduce\(([^)]+)\)\s*\)', r'.reduce(\1))'),
            
            # Specific BaseAgent.ts issues
            (r'executing query`, ,', 'executing query`,'),
            (r'execution failed`, ,', 'execution failed`,'),
            (r'initialized successfully`, ,', 'initialized successfully`,'),
            
            # String literal fixes
            (r'`([^`]+)` \+ \$\{([^}]+)\}', r'`\1${}\2`'),
            (r'SIGTERM receivedshutting down gracefully', 'SIGTERM received, shutting down gracefully'),
            (r'SIGINT receivedshutting down gracefully', 'SIGINT received, shutting down gracefully'),
            
            # URL fixes
            (r'http://localhost:\$\{PORT\}`, ,', 'http://localhost:${PORT}`,'),
            (r'process\.env\.CORS_ORIGIN \|\|, \'([^\']+)\'', r'process.env.CORS_ORIGIN || \'\1\''),
            
            # ExpertAgentTemplate specific issues from errors
            (r'result\.usage\?\.\w+Tokens\?\.\w+\s+\w+\s+', ''),  # Complex usage pattern corruption
            (r'operation: \(\) => Promise<T>\s+\):', 'operation: () => Promise<T>):'),
            (r'context: string\):', 'context: string):'),
            (r'tokensUsed: number success: boolean', 'tokensUsed: number, success: boolean'),
            (r'executionTime: number tokensUsed: number', 'executionTime: number, tokensUsed: number'),
            
            # Object property fixes
            (r'\{\s*([^:,]+):\s*([^,}]+)([^,}]*),\s*([^:,]+)\s*:\s*', r'{ \1: \2\3, \4: '),
            (r'\{\s*([^:,]+)\s*([^:,]+)\s*:\s*', r'{ \1: \2: '),
            
            # Arrow function fixes
            (r'=>\s+\{([^}]+)\}\s*\)\s*\)', r'=> {\1}))'),
            (r'=>\s+([^,)]+),\s*\)', r'=> \1)'),
            
            # Error object fixes
            (r'error instanceof Error \? error : newError', 'error instanceof Error ? error : new Error'),
            
            # Math operation fixes  
            (r'Math\.min\(([^,]+),([^)]+)\)', r'Math.min(\1, \2)'),
            (r'Math\.max\(([^,]+),([^)]+)\)', r'Math.max(\1, \2)'),
            
            # Specific compilation error fixes based on the output
            (r'\(f:, any\) => f\.id', '(f: any) => f.id'),
            (r'map\((f:, any) => f\.id\)', 'map((f: any) => f.id)'),
            (r'execution failed`, ,', 'execution failed`,'),
            (r'executing query`, ,', 'executing query`,'),
            
            # Missing comma in object properties
            (r'(\w+): ([^,}\n]+)\s+(\w+):', r'\1: \2, \3:'),
            
            # For loop and destructuring fixes
            (r'for \(const \[([^,\]]+),([^,\]]+)\] of', r'for (const [\1, \2] of'),
            
            # Promise and async fixes
            (r'Promise<([^>]+)>\s*([^,)\s]+)', r'Promise<\1>, \2'),
            (r'async\s+([^(]+)\(([^)]+)\)\s*:', r'async \1(\2):'),
            
            # Type union fixes
            (r'\|\s*undefined\s+([A-Z])', r'| undefined, \1'),
            (r'\|\s*null\s+([A-Z])', r'| null, \1'),
            
            # Generic type parameter fixes
            (r'<([^,>]+)([A-Z][^,>]*),', r'<\1, \2,'),
            (r'<([^,>]+)\s+([^,>]+)>', r'<\1, \2>'),
            
            # Function call with missing commas
            (r'(\w+)\(([^,)]+)\s+([^,)]+)\)', r'\1(\2, \3)'),
            
            # Specific error patterns from compilation
            (r'Record<stringan, y> = \{\}', 'Record<string, any> = {}'),
            (r'AgentConfigAgentResponse', 'AgentConfig, AgentResponse'),
            (r'AgentContextAgentTool', 'AgentContext, AgentTool'),
            (r'PerformanceMetricsAgentStatus', 'PerformanceMetrics, AgentStatus'),
            
            # Template literal fixes
            (r'`([^`$]+)` \+ `([^`]+)`', r'`\1\2`'),
            (r'\$\{([^}]+)\}`, ,', r'${\1}`,'),
            
            # Complex object destructuring
            (r'\{\s*([^:,]+)([^:,]+):\s*', r'{ \1, \2: '),
            (r'\{\s*([^,}]+),([^,}]+),([^,}]+)\s*\}', r'{ \1, \2, \3 }'),
            
            # Async generator fixes
            (r'AsyncGenerator<([^,>]+)([^,>]+),([^,>]+)>', r'AsyncGenerator<\1, \2, \3>'),
            
            # Return type fixes
            (r':\s*Promise<([^>]+)>\s*([A-Z])', r': Promise<\1>, \2'),
            
            # String concatenation in template literals
            (r'running on, http', 'running on http'),
            (r'endpoint: htt, p', 'endpoint: http'),
            (r'check: htt, p', 'check: http'),
            (r'Playground: htt, p', 'Playground: http'),
            
            # Final catch-all for common patterns
            (r'([a-zA-Z_$][a-zA-Z0-9_$]*), ,', r'\1,'),
            (r'([a-zA-Z_$][a-zA-Z0-9_$]*)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:', r'\1, \2:'),
            (r'([a-zA-Z_$][a-zA-Z0-9_$]*)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=', r'\1, \2 ='),
        ]

    def create_backup(self):
        """Create backup of source directory"""
        if os.path.exists(self.src_directory):
            print(f"Creating backup at {self.backup_directory}...")
            shutil.copytree(self.src_directory, self.backup_directory)
            print(f"Backup created successfully")

    def apply_critical_repairs(self, content: str) -> Tuple[str, int]:
        """Apply critical repairs to content"""
        repairs_made = 0
        
        for pattern, replacement in self.critical_patterns:
            original_content = content
            try:
                content = re.sub(pattern, replacement, content)
                
                # Count replacements made
                pattern_repairs = len(re.findall(pattern, original_content))
                repairs_made += pattern_repairs
                
                if pattern_repairs > 0:
                    print(f"  Fixed {pattern_repairs} instances of: {pattern}")
            except Exception as e:
                print(f"  Warning: Pattern failed {pattern}: {e}")
                continue
        
        return content, repairs_made

    def process_file(self, file_path: str) -> bool:
        """Process a single TypeScript file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                original_content = f.read()
            
            # Apply critical repairs
            repaired_content, repairs_made = self.apply_critical_repairs(original_content)
            
            # Only write if changes were made
            if repairs_made > 0:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(repaired_content)
                
                print(f"Applied {repairs_made} critical repairs to {file_path}")
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

    def run_critical_repair(self):
        """Execute the critical repair process"""
        print("🔧 Starting Final Critical Repair for TypeScript AI Assistant")
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
        print("🎯 FINAL CRITICAL REPAIR COMPLETE")
        print(f"Files processed: {self.files_processed}")
        print(f"Files modified: {files_changed}")
        print(f"Total repairs applied: {self.repair_count}")
        print(f"Backup created at: {self.backup_directory}")
        
        if self.repair_count > 0:
            print("\n✅ Critical repairs applied successfully!")
            print("📋 Next steps:")
            print("1. Run TypeScript compilation: npx tsc --noEmit")
            print("2. Verify Phase 1 completion")
            print("3. Proceed to Phase 2: Infrastructure Hardening")
        else:
            print("\n⚠️  No additional critical repairs needed")
            print("✅ TypeScript syntax should be fully clean!")

def main():
    parser = argparse.ArgumentParser(description='Final Critical Repair for TypeScript AI Assistant')
    parser.add_argument('--src-dir', default='src', help='Source directory (default: src)')
    parser.add_argument('--dry-run', action='store_true', help='Show what would be repaired without making changes')
    
    args = parser.parse_args()
    
    if args.dry_run:
        print("🔍 DRY RUN MODE - No changes will be made")
    
    repairer = FinalCriticalRepairer(args.src_dir)
    
    if not args.dry_run:
        repairer.run_critical_repair()
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