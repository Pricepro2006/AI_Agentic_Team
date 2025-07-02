#!/usr/bin/env python3
"""
Final Cleanup Fix Script for Remaining TypeScript Syntax Issues
Targets specific patterns found in the latest compilation errors
"""

import os
import re
import glob
from typing import List
import shutil
from datetime import datetime

class FinalCleanupRepairer:
    def __init__(self, src_directory: str = "src"):
        self.src_directory = src_directory
        self.backup_dir = f"backup_final_cleanup_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        self.fixes_applied = 0
        self.files_processed = 0
        
        # Final cleanup patterns for remaining issues
        self.cleanup_patterns = [
            # Object literal syntax fixes
            (r'(\w+):\s*(\d+),\s*(\w+):\s*(\d+),\s*(\w+):\s*(\d+),\s*(\w+):\s*([0-9.]+),\s*(\d+),\s*(\w+):', r'\1: \2,\n      \3: \4,\n      \5: \6,\n      \7: \8,\n      \10:'),
            
            # String concatenation fixes
            (r'markdownconst\s+issue:\s*s\s*=', 'markdown\n    const issues ='),
            (r'formatte:\s*d\s*=\s*([^,]+),?\s*markdownconst', 'formatted = \\1\n    const markdown'),
            (r'([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*([a-zA-Z_][a-zA-Z0-9_]*),?\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*const\s+([a-zA-Z_][a-zA-Z0-9_]*)', r'\1: \2\n    const \4'),
            
            # Type annotation fixes
            (r'z\.infer<typeof,\s*([^>]+)>', r'z.infer<typeof \1>'),
            (r'typeof,\s*([a-zA-Z_][a-zA-Z0-9_]*)', r'typeof \1'),
            
            # Conditional statement fixes
            (r'\bif,\s*\(', 'if ('),
            (r'\bfor,\s*\(', 'for ('),
            (r'\bwhile,\s*\(', 'while ('),
            (r'\bswitch,\s*\(', 'switch ('),
            
            # Expression and operator fixes
            (r'markdown\s*\+=,\s*`', 'markdown += `'),
            (r'>\s*,\s*([0-9])', r'> \1'),
            (r'<\s*,\s*([0-9])', r'< \1'),
            (r'=\s*,\s*([0-9])', r'= \1'),
            (r'\+\s*,\s*([0-9])', r'+ \1'),
            (r'-\s*,\s*([0-9])', r'- \1'),
            (r'\*\s*,\s*([0-9])', r'* \1'),
            (r'/\s*,\s*([0-9])', r'/ \1'),
            
            # Array and object method fixes
            (r'\.length\s*>\s*,\s*0', '.length > 0'),
            (r'\.length\s*<\s*,\s*([0-9]+)', r'.length < \1'),
            (r'\.length\s*===\s*,\s*([0-9]+)', r'.length === \1'),
            (r'\.length\s*!==\s*,\s*([0-9]+)', r'.length !== \1'),
            
            # Complex object assignment fixes
            (r'type:\s*([a-zA-Z_][a-zA-Z0-9_]*)as\s*any,', r'type: \1 as any,'),
            (r'([a-zA-Z_][a-zA-Z0-9_]*)as\s*any', r'\1 as any'),
            (r'description:\s*([^,]+),\s*mermaidCoder:\s*esponse', r'description: \1,\n        mermaidCode: response'),
            
            # Variable assignment concatenations
            (r'const\s+([a-zA-Z_][a-zA-Z0-9_]*)([a-zA-Z_][a-zA-Z0-9_]*)\s*=', r'const \1\n    const \2 ='),
            (r'let\s+([a-zA-Z_][a-zA-Z0-9_]*)([a-zA-Z_][a-zA-Z0-9_]*)\s*=', r'let \1\n    const \2 ='),
            
            # Function call and method chain fixes
            (r'\.map\(\([^)]+\)\s*=>,\s*([^)]+)\)', r'.map((\1) => \2)'),
            (r'\.filter\(\([^)]+\)\s*=>,\s*([^)]+)\)', r'.filter((\1) => \2)'),
            (r'\.reduce\(\([^)]+\)\s*=>,\s*([^)]+)\)', r'.reduce((\1) => \2)'),
            (r'\.forEach\(\([^)]+\)\s*=>,\s*([^)]+)\)', r'.forEach((\1) => \2)'),
            
            # Template literal fixes
            (r'\$\{([^}]+)\},\s*([^}]+)\}', r'${\1} \2}'),
            (r'`([^`]*),\s*([^`]*)`', r'`\1 \2`'),
            
            # Property access fixes
            (r'\.([a-zA-Z_][a-zA-Z0-9_]*),\s*([a-zA-Z_][a-zA-Z0-9_]*)', r'.\1\n    .\2'),
            
            # Import statement fixes
            (r'import\s*\{\s*([^}]+),\s*([^}]+)\s*\}\s*from', r'import { \1, \2 } from'),
            
            # Export statement fixes
            (r'export\s*\{\s*([^}]+),\s*([^}]+)\s*\}', r'export { \1, \2 }'),
            
            # Complex regex patterns for nested objects
            (r'\{\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*([^,]+),\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*([^,}]+),?\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*([^,}]+)\s*\}', r'{\n    \1: \2,\n    \3: \4,\n    \5: \6\n  }'),
            
            # Async/await fixes
            (r'await\s*,\s*([a-zA-Z_][a-zA-Z0-9_]*)', r'await \1'),
            (r'async\s*,\s*([a-zA-Z_][a-zA-Z0-9_]*)', r'async \1'),
            
            # Try-catch fixes
            (r'try\s*,\s*\{', 'try {'),
            (r'catch\s*,\s*\(', 'catch ('),
            (r'finally\s*,\s*\{', 'finally {'),
            
            # Class and interface fixes
            (r'class\s*,\s*([a-zA-Z_][a-zA-Z0-9_]*)', r'class \1'),
            (r'interface\s*,\s*([a-zA-Z_][a-zA-Z0-9_]*)', r'interface \1'),
            (r'extends\s*,\s*([a-zA-Z_][a-zA-Z0-9_]*)', r'extends \1'),
            (r'implements\s*,\s*([a-zA-Z_][a-zA-Z0-9_]*)', r'implements \1'),
            
            # Generic type fixes
            (r'<([^>]+),\s*([^>]+)>', r'<\1, \2>'),
            (r'Array<([^>]+),\s*([^>]+)>', r'Array<\1, \2>'),
            (r'Promise<([^>]+),\s*([^>]+)>', r'Promise<\1, \2>'),
            
            # Comment fixes
            (r'//,\s*([^,\n]+)', r'// \1'),
            (r'/\*,\s*([^*]+)', r'/* \1'),
        ]

    def create_backup(self):
        """Create backup of entire src directory"""
        if os.path.exists(self.src_directory):
            shutil.copytree(self.src_directory, self.backup_dir)
            print(f"✓ Backup created: {self.backup_dir}")

    def get_typescript_files(self) -> List[str]:
        """Get all TypeScript files in the source directory"""
        patterns = ['**/*.ts', '**/*.tsx']
        files = []
        for pattern in patterns:
            files.extend(glob.glob(os.path.join(self.src_directory, pattern), recursive=True))
        return sorted(files)

    def apply_cleanup_repairs(self, file_path: str) -> int:
        """Apply cleanup repair patterns to a single file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                content = file.read()
            
            original_content = content
            fixes_in_file = 0
            
            # Apply all cleanup patterns
            for pattern, replacement in self.cleanup_patterns:
                new_content = re.sub(pattern, replacement, content)
                if new_content != content:
                    pattern_fixes = len(re.findall(pattern, content))
                    fixes_in_file += pattern_fixes
                    content = new_content
            
            # Only write if changes were made
            if content != original_content:
                with open(file_path, 'w', encoding='utf-8') as file:
                    file.write(content)
                return fixes_in_file
            
            return 0
            
        except Exception as e:
            print(f"✗ Error processing {file_path}: {e}")
            return 0

    def repair_all_files(self):
        """Apply cleanup repairs to all TypeScript files"""
        print("🔧 Starting final cleanup repair process...")
        
        # Create backup first
        self.create_backup()
        
        # Get all TypeScript files
        files = self.get_typescript_files()
        print(f"📁 Found {len(files)} TypeScript files to process")
        
        # Process each file
        for file_path in files:
            fixes_in_file = self.apply_cleanup_repairs(file_path)
            if fixes_in_file > 0:
                self.fixes_applied += fixes_in_file
                self.files_processed += 1
                print(f"  ✓ {file_path}: {fixes_in_file} cleanup fixes applied")
        
        # Summary
        print(f"\n📊 Final Cleanup Repair Summary:")
        print(f"   • Total files processed: {self.files_processed}")
        print(f"   • Total cleanup fixes applied: {self.fixes_applied}")
        print(f"   • Backup location: {self.backup_dir}")

def main():
    """Main function to run the final cleanup repair"""
    print("🎯 PERFECT SYSTEM RECOVERY PROMPT - Phase 1 Final Cleanup")
    print("=" * 60)
    
    repairer = FinalCleanupRepairer()
    repairer.repair_all_files()
    
    print("\n✅ Final cleanup repair completed!")
    print("Next: Final TypeScript compilation validation")

if __name__ == "__main__":
    main()