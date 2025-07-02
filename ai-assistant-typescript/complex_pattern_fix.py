#!/usr/bin/env python3
"""
Complex Pattern Fix Script for TypeScript AI Assistant
Addresses remaining complex syntax corruption patterns from TypeScript compilation errors.
"""

import os
import re
import glob
from typing import List, Tuple

class ComplexPatternRepairer:
    def __init__(self, src_directory: str = "src"):
        self.src_directory = src_directory
        self.repair_count = 0
        
        # Complex patterns identified from TypeScript compilation errors
        self.complex_fixes = [
            # Function parameter type corruption - missing commas
            (r'(\w+\?:\s*\{\s*[^}]+\})\s+(\w+\?:)', r'\1, \2'),
            (r'(string)(\w+\?:\s*any)', r'\1, \2'),
            (r'(query:\s*string)(\w+\?:\s*any)', r'\1, \2'),
            (r'(context\?:\s*any)(\)\s*=>', r'\1\2'),
            
            # Specific type corruption patterns
            (r'Promise<an,\s*y>', 'Promise<any>'),
            (r'Promise<numbe,\s*r>', 'Promise<number>'),
            (r'Promise<boolea,\s*n>', 'Promise<boolean>'),
            (r'Promise<voi,\s*d>', 'Promise<void>'),
            (r'Promise<neve,\s*r>', 'Promise<never>'),
            (r'Promise<AgentRespons,\s*e>', 'Promise<AgentResponse>'),
            (r'Promise<AgentRegistr,\s*y>', 'Promise<AgentRegistry>'),
            
            # Constructor parameter corruption
            (r'=\s*,\s*\{\}', '= {}'),
            (r'=\s*,\s*\[\]', '= []'),
            (r'=\s*,\s*""', '= ""'),
            (r'=\s*,\s*\'\'', "= ''"),
            (r'=\s*,\s*null', '= null'),
            (r'=\s*,\s*undefined', '= undefined'),
            (r'=\s*,\s*false', '= false'),
            (r'=\s*,\s*true', '= true'),
            (r'=\s*,\s*0', '= 0'),
            
            # Function signature corruption in long lines
            (r'queryAnalysis:\s*\(query:\s*stringcontext\?\s*:\s*any\)', 'queryAnalysis: (query: string, context?: any)'),
            (r'routingDecisio\s*n:\s*\(intent:\s*any\)\s*=>\s*Promise<numbe,\s*r>', 'routingDecision: (intent: any) => Promise<number>'),
            (r'responseForma\s*t:\s*\(results:\s*any\)\s*=>\s*Promise<an,\s*y>', 'responseFormat: (results: any) => Promise<any>'),
            (r'contextSharin\s*g:\s*\(context:\s*any\)\s*=>\s*Promise<void>', 'contextSharing: (context: any) => Promise<void>'),
            (r'taskValidatio\s*n:\s*\(task:\s*any\)\s*=>\s*Promise<boolean>', 'taskValidation: (task: any) => Promise<boolean>'),
            (r'progressReportin\s*g:\s*\(progress:\s*any\)\s*=>\s*Promise<void>', 'progressReporting: (progress: any) => Promise<void>'),
            
            # Complex type definitions with missing commas
            (r'(Map<string,\s*\w+>)\s+(\w+)', r'\1, \2'),
            (r'(Record<string,\s*\w+>)\s+(\w+)', r'\1, \2'),
            (r'(Array<[^>]+>)\s+(\w+)', r'\1, \2'),
            
            # Interface property corruption
            (r'(\w+):\s*(\w+)(\w+):', r'\1: \2, \3:'),
            
            # Export corruption
            (r'export\s*\{\s*(\w+)\s*(\w+)\s*\}', r'export { \1, \2 }'),
            
            # Import corruption with multiple items
            (r'import\s*\{\s*(\w+)\s*(\w+)\s*\}', r'import { \1, \2 }'),
            
            # Function call corruption with multiple parameters
            (r'(\w+)\((\w+)(\w+)\)', r'\1(\2, \3)'),
            (r'(\w+)\((\w+)(\w+)(\w+)\)', r'\1(\2, \3, \4)'),
            
            # Specific error patterns from compilation
            (r'usage\?\s*:\s*\{\s*promptTokens\?\s*:\s*number,\s*completionTokens\?\s*:\s*number,\s*totalTokens\?\s*:\s*number\s*\}\s*toolCalls', 
             'usage?: { promptTokens?: number, completionTokens?: number, totalTokens?: number }, toolCalls'),
             
            # Object property corruption
            (r'(\w+):\s*(\w+)(\w+):\s*(\w+)', r'\1: \2, \3: \4'),
            (r'(\w+):\s*(\w+)(\w+):\s*(\w+)(\w+):\s*(\w+)', r'\1: \2, \3: \4, \5: \6'),
            
            # Generic type parameter corruption
            (r'<(\w+)(\w+)>', r'<\1, \2>'),
            (r'<(\w+)(\w+)(\w+)>', r'<\1, \2, \3>'),
            
            # Array/Object method corruption
            (r'\.(\w+)\((\w+)(\w+)\)', r'.\1(\2, \3)'),
            
            # Conditional/ternary operator corruption
            (r'\?\s*(\w+)\s*(\w+)\s*:', r'? \1 : \2 :'),
            
            # Complex import corruption patterns
            (r'import\s*\{\s*(\w+,\s*\w+)\s*(\w+)\s*\}', r'import { \1, \2 }'),
            
            # Missing semicolons before certain patterns
            (r'(\}\s*)(\w+\s*:\s*)', r'\1;\n  \2'),
            
            # Template literal corruption
            (r'\$\{(\w+)\}(\w+)', r'${\1} \2'),
            
            # Arrow function parameter corruption
            (r'\((\w+:\s*\w+)(\w+:\s*\w+)\)', r'(\1, \2)'),
            (r'\((\w+:\s*\w+)(\w+:\s*\w+)(\w+:\s*\w+)\)', r'(\1, \2, \3)'),
            
            # Async/await corruption
            (r'async\s*(\w+)\(', r'async \1('),
            (r'await\s*(\w+)\((\w+)(\w+)\)', r'await \1(\2, \3)'),
            
            # Class method corruption
            (r'(\w+)\s*\((\w+:\s*\w+)(\w+:\s*\w+)\)', r'\1(\2, \3)'),
            
            # Specific patterns from the compilation errors
            (r'stringcontext', 'string, context'),
            (r'routingDecisio\s*n', 'routingDecision'),
            (r'responseForma\s*t', 'responseFormat'),
            (r'contextSharin\s*g', 'contextSharing'),
            (r'taskValidatio\s*n', 'taskValidation'),
            (r'progressReportin\s*g', 'progressReporting'),
            
            # More specific type corruption
            (r'an,\s*y', 'any'),
            (r'numbe,\s*r', 'number'),
            (r'boolea,\s*n', 'boolean'),
            (r'voi,\s*d', 'void'),
            (r'neve,\s*r', 'never'),
            (r'strin,\s*g', 'string'),
            
            # Object literal corruption
            (r'\{\s*(\w+:\s*\w+)\s*(\w+:\s*\w+)\s*\}', r'{ \1, \2 }'),
            (r'\{\s*(\w+:\s*\w+)\s*(\w+:\s*\w+)\s*(\w+:\s*\w+)\s*\}', r'{ \1, \2, \3 }'),
        ]

    def apply_complex_fixes(self, content: str) -> Tuple[str, int]:
        """Apply complex pattern fixes to content"""
        repairs_made = 0
        original_content = content
        
        for pattern, replacement in self.complex_fixes:
            try:
                if isinstance(pattern, str):
                    # Simple string replacement
                    new_content = content.replace(pattern, replacement)
                    if new_content != content:
                        content = new_content
                        repairs_made += 1
                        print(f"  Fixed pattern: {pattern} → {replacement}")
                else:
                    # Regex replacement
                    new_content = re.sub(pattern, replacement, content)
                    if new_content != content:
                        matches = len(re.findall(pattern, content))
                        content = new_content
                        repairs_made += matches
                        print(f"  Fixed regex pattern ({matches} matches): {pattern}")
            except Exception as e:
                print(f"  Warning: Failed to apply pattern {pattern}: {e}")
                continue
        
        return content, repairs_made

    def process_file(self, file_path: str) -> bool:
        """Process a single TypeScript file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                original_content = f.read()
            
            # Apply complex fixes
            repaired_content, repairs_made = self.apply_complex_fixes(original_content)
            
            # Only write if changes were made
            if repairs_made > 0:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(repaired_content)
                
                print(f"Applied {repairs_made} complex fixes to {file_path}")
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

    def run_complex_repair(self):
        """Execute the complex pattern repair process"""
        print("🔧 Starting Complex Pattern Fix for TypeScript AI Assistant")
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
        print("🔧 COMPLEX PATTERN REPAIR COMPLETE")
        print(f"Files modified: {files_changed}")
        print(f"Total fixes applied: {self.repair_count}")
        
        if self.repair_count > 0:
            print("\n✅ Complex pattern fixes applied successfully!")
            print("📋 Next step: Run TypeScript compilation: npx tsc --noEmit")
        else:
            print("\n⚠️  No complex pattern fixes needed")

def main():
    repairer = ComplexPatternRepairer()
    repairer.run_complex_repair()

if __name__ == "__main__":
    main()