#!/usr/bin/env python3
"""
Final Specific Fix Script for TypeScript AI Assistant
Targets the exact remaining corruption patterns identified from TypeScript compilation.
"""

import os
import re
import glob
from typing import List, Tuple

class FinalSpecificRepairer:
    def __init__(self, src_directory: str = "src"):
        self.src_directory = src_directory
        self.repair_count = 0
        
        # Very specific fixes for the exact remaining patterns
        self.specific_fixes = [
            # BaseAgent.ts line 230 - missing comma in function parameter
            ('usage?: { promptTokens?: number, completionTokens?: number, totalTokens?: number } toolCalls?',
             'usage?: { promptTokens?: number, completionTokens?: number, totalTokens?: number }, toolCalls?'),
            
            # ExpertAgentTemplate.ts line 66 - corrupted property names and types
            ('Promise<an, y>', 'Promise<any>'),
            ('Promise<numbe, r>', 'Promise<number>'),
            ('Promise<boolea, n>', 'Promise<boolean>'),
            ('Promise<voi, d>', 'Promise<void>'),
            ('Promise<neve, r>', 'Promise<never>'),
            ('routingDecisio n', 'routingDecision'),
            ('responseForma t', 'responseFormat'),
            ('contextSharin g', 'contextSharing'),
            ('taskValidatio n', 'taskValidation'),
            ('progressReportin g', 'progressReporting'),
            
            # Constructor parameter corruption
            ('=, {}', '= {}'),
            ('=, []', '= []'),
            ('=, ""', '= ""'),
            ("=, ''", "= ''"),
            ('=, null', '= null'),
            ('=, undefined', '= undefined'),
            ('=, false', '= false'),
            ('=, true', '= true'),
            ('=, 0', '= 0'),
            
            # Function parameter corruption
            ('_query: string_knowledgeDomain?:, string', '_query: string, _knowledgeDomain?: string'),
            ('string_knowledgeDomain', 'string, _knowledgeDomain'),
            ('context: any =, {}', 'context: any = {}'),
            
            # Other specific patterns from errors
            ('an, y', 'any'),
            ('numbe, r', 'number'),
            ('boolea, n', 'boolean'),
            ('voi, d', 'void'),
            ('neve, r', 'never'),
            ('strin, g', 'string'),
            
            # Space corruption in variable names
            ('routingDecisio n:', 'routingDecision:'),
            ('responseForma t:', 'responseFormat:'),
            ('contextSharin g:', 'contextSharing:'),
            ('taskValidatio n:', 'taskValidation:'),
            ('progressReportin g:', 'progressReporting:'),
            
            # Import/export corruption
            ('export {, ', 'export { '),
            ('import {, ', 'import { '),
            
            # Method call corruption
            ('this.buildMessages(querycontext)', 'this.buildMessages(query, context)'),
            ('this.executeWithMastra(querycontext)', 'this.executeWithMastra(query, context)'),
            
            # Type annotation corruption
            ('Map<stringan, y>', 'Map<string, any>'),
            ('Record<stringan, y>', 'Record<string, any>'),
            ('Record<string, an, y>', 'Record<string, any>'),
            ('Map<string, an, y>', 'Map<string, any>'),
            
            # Generic function corruption
            ('AsyncGenerator<stringvoidunkno, w, n>', 'AsyncGenerator<string, void, unknown>'),
            ('Record<stringunknow, n>', 'Record<string, unknown>'),
            
            # Function signature corruption
            ('tokensUsed: numbersuccess: booleanerror?:', 'tokensUsed: number, success: boolean, error?:'),
            ('text?: stringtoolCalls?: Array<{ toolName: string }>', 'text?: string, toolCalls?: Array<{ toolName: string }>'),
            ('promptTokens?: numbercompletionTokens?: numbertotalTokens?: number', 'promptTokens?: number, completionTokens?: number, totalTokens?: number'),
        ]

    def apply_specific_fixes(self, content: str) -> Tuple[str, int]:
        """Apply specific fixes to content"""
        repairs_made = 0
        
        for old_text, new_text in self.specific_fixes:
            if old_text in content:
                content = content.replace(old_text, new_text)
                repairs_made += 1
                print(f"  Fixed: {old_text[:60]}... → {new_text[:60]}...")
        
        return content, repairs_made

    def apply_regex_fixes(self, content: str) -> Tuple[str, int]:
        """Apply regex-based fixes for patterns"""
        repairs_made = 0
        
        # Regex patterns for complex fixes
        regex_patterns = [
            # Fix missing commas in function parameters
            (r'(\w+\?:\s*\{\s*[^}]+\})\s+(\w+\?:)', r'\1, \2'),
            
            # Fix corrupted type names with spaces
            (r'(\w+)o\s+(\w)', r'\1o\2'),  # routingDecisio n → routingDecision
            (r'(\w+)a\s+(\w)', r'\1a\2'),  # responseForma t → responseFormat
            (r'(\w+)n\s+(\w)', r'\1n\2'),  # contextSharin g → contextSharing
            (r'(\w+)o\s+(\w)', r'\1o\2'),  # taskValidatio n → taskValidation
            (r'(\w+)n\s+(\w)', r'\1n\2'),  # progressReportin g → progressReporting
            
            # Fix Promise types with comma corruption
            (r'Promise<(\w+),\s*(\w)>', r'Promise<\1\2>'),
            
            # Fix function parameter corruption
            (r'(\w+):\s*(\w+)(\w+\??):', r'\1: \2, \3:'),
            
            # Fix constructor parameter corruption
            (r'=\s*,\s*(\{|\[|"|\')([^,}]*)\1', r'= \1\2\1'),
            
            # Fix generic type corruption
            (r'<(\w+)(\w+)>', r'<\1, \2>'),
            (r'<(\w+)(\w+)(\w+)>', r'<\1, \2, \3>'),
        ]
        
        for pattern, replacement in regex_patterns:
            try:
                new_content = re.sub(pattern, replacement, content)
                if new_content != content:
                    matches = len(re.findall(pattern, content))
                    content = new_content
                    repairs_made += matches
                    print(f"  Applied regex fix ({matches} matches): {pattern}")
            except Exception as e:
                print(f"  Warning: Regex pattern failed {pattern}: {e}")
                continue
        
        return content, repairs_made

    def process_file(self, file_path: str) -> bool:
        """Process a single TypeScript file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                original_content = f.read()
            
            # Apply specific fixes
            repaired_content, specific_repairs = self.apply_specific_fixes(original_content)
            
            # Apply regex fixes
            repaired_content, regex_repairs = self.apply_regex_fixes(repaired_content)
            
            total_repairs = specific_repairs + regex_repairs
            
            # Only write if changes were made
            if total_repairs > 0:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(repaired_content)
                
                print(f"Applied {total_repairs} specific fixes to {file_path}")
                self.repair_count += total_repairs
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

    def run_final_repair(self):
        """Execute the final specific repair process"""
        print("🎯 Starting Final Specific Fix for TypeScript AI Assistant")
        print("=" * 70)
        
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
        print("\n" + "=" * 70)
        print("🎯 FINAL SPECIFIC REPAIR COMPLETE")
        print(f"Files modified: {files_changed}")
        print(f"Total fixes applied: {self.repair_count}")
        
        if self.repair_count > 0:
            print("\n✅ Final specific fixes applied successfully!")
            print("📋 Next step: Run TypeScript compilation: npx tsc --noEmit")
        else:
            print("\n⚠️  No final specific fixes needed")

def main():
    repairer = FinalSpecificRepairer()
    repairer.run_final_repair()

if __name__ == "__main__":
    main()