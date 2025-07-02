#!/usr/bin/env python3
"""
TypeScript Syntax Corruption Batch Repair Tool
Systematically repairs common syntax corruption patterns across TypeScript files.
"""

import os
import re
import shutil
import json
from pathlib import Path
from typing import List, Dict, Tuple
from datetime import datetime

class TypeScriptSyntaxRepairer:
    def __init__(self, src_directory: str = "src"):
        self.src_directory = Path(src_directory)
        self.backup_directory = Path("backup_" + datetime.now().strftime("%Y%m%d_%H%M%S"))
        self.repair_log = []
        self.files_processed = 0
        self.repairs_made = 0
        
        # Define corruption patterns and their repairs
        self.repair_patterns = [
            # Import statement repairs
            (r'import\s*{\s*([a-zA-Z_][a-zA-Z0-9_]*),\s*([a-z])\s*}\s*from', r'import { \1\2 } from'),
            (r'import\s*{\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*,\s*([a-z])\s*}\s*from', r'import { \1\2 } from'),
            
            # Function parameter repairs
            (r'(\w+):\s*string(\w+),', r'\1: string, \2'),
            (r'(\w+):\s*number(\w+),', r'\1: number, \2'),
            (r'(\w+):\s*boolean(\w+),', r'\1: boolean, \2'),
            (r'(\w+):\s*any(\w+),', r'\1: any, \2'),
            
            # Object property repairs
            (r'(\w+):\s*(\w+)(\w+):', r'\1: \2, \3:'),
            (r'(\w+)(\w+):', r'\1, \2:'),
            
            # Class modifier repairs
            (r'protected\s+private:\s*static:', r'private static'),
            (r'private:\s*static:', r'private static'),
            (r'protected\s+private:', r'private'),
            
            # Type annotation repairs
            (r'Error:\s*(\w+),\s*(\w+)', r'Error, \1: \2'),
            (r'Promise<(\w+)>\s*(\w+),', r'Promise<\1>, \2'),
            
            # Variable declaration repairs
            (r'const(\w+)(\w+)=', r'const \1: \2 ='),
            (r'let(\w+)(\w+)=', r'let \1: \2 ='),
            
            # Method signature repairs
            (r'public\s*async\s*(\w+)\(([^)]*)\):\s*Promise<([^>]+)>(\w+),', r'public async \1(\2): Promise<\3>, \4'),
            (r'private\s*async\s*(\w+)\(([^)]*)\):\s*Promise<([^>]+)>(\w+),', r'private async \1(\2): Promise<\3>, \4'),
            
            # Interface property repairs
            (r'(\w+):\s*(\w+)\s*(\w+):', r'\1: \2\n  \3:'),
            
            # Array and Map type repairs
            (r'Map<string,\s*(\w+)>\s*=\s*new\s*Map\(\),', r'Map<string, \1> = new Map()'),
            (r'(\w+):\s*Map<string,\s*(\w+)>\s*=\s*new\s*Map\(\);', r'\1: Map<string, \2> = new Map()'),
            
            # Arrow function repairs
            (r'=>\s*(\w+)(\w+)', r'=> \1, \2'),
            
            # Generic type repairs
            (r'<(\w+),\s*(\w+)>\s*(\w+)', r'<\1, \2>\3'),
            
            # Console log repairs
            (r'console\.(\w+)\(\'([^\']+):\s*([^\']+),\s*([^\']+)\'', r"console.\1('\2: \3, \4'"),
            
            # Return statement repairs
            (r'return\s*{\s*(\w+)(\w+):', r'return {\n      \1,\n      \2:'),
            
            # Conditional repairs
            (r'if\s*\(([^)]+)\)\s*return(\w+)', r'if (\1) return \2'),
            
            # Object literal repairs
            (r'{\s*(\w+)(\w+):', r'{\n      \1,\n      \2:'),
            
            # Template literal repairs
            (r'\$\{(\w+)\}(\w+)', r'${\1}\2'),
        ]
        
        # Advanced patterns for complex corruptions
        self.advanced_patterns = [
            # Fix broken method calls
            (r'(\w+)\.(\w+)\(([^)]*)\)(\w+)', r'\1.\2(\3), \4'),
            
            # Fix broken property access
            (r'(\w+)\.(\w+)(\w+)', r'\1.\2, \3'),
            
            # Fix array access
            (r'(\w+)\[(\w+)\](\w+)', r'\1[\2], \3'),
            
            # Fix conditional operators
            (r'\?\s*(\w+):\s*(\w+)(\w+)', r'? \1 : \2, \3'),
        ]

    def create_backup(self) -> None:
        """Create a backup of the source directory."""
        print(f"Creating backup in {self.backup_directory}...")
        if self.src_directory.exists():
            shutil.copytree(self.src_directory, self.backup_directory)
            print(f"Backup created successfully at {self.backup_directory}")
        else:
            print(f"Warning: Source directory {self.src_directory} not found!")

    def find_typescript_files(self) -> List[Path]:
        """Find all TypeScript files in the source directory."""
        ts_files = []
        for root, dirs, files in os.walk(self.src_directory):
            for file in files:
                if file.endswith('.ts') or file.endswith('.tsx'):
                    ts_files.append(Path(root) / file)
        
        print(f"Found {len(ts_files)} TypeScript files to process")
        return ts_files

    def repair_file_content(self, content: str, file_path: Path) -> Tuple[str, int]:
        """Apply all repair patterns to file content."""
        original_content = content
        repairs_in_file = 0
        
        # Apply basic repair patterns
        for pattern, replacement in self.repair_patterns:
            new_content = re.sub(pattern, replacement, content)
            if new_content != content:
                matches = len(re.findall(pattern, content))
                repairs_in_file += matches
                content = new_content
                self.repair_log.append({
                    'file': str(file_path),
                    'pattern': pattern,
                    'replacement': replacement,
                    'matches': matches
                })
        
        # Apply advanced patterns
        for pattern, replacement in self.advanced_patterns:
            new_content = re.sub(pattern, replacement, content)
            if new_content != content:
                matches = len(re.findall(pattern, content))
                repairs_in_file += matches
                content = new_content
                self.repair_log.append({
                    'file': str(file_path),
                    'pattern': pattern,
                    'replacement': replacement,
                    'matches': matches
                })
        
        # Custom repair for specific corruption patterns
        content = self.apply_custom_repairs(content, file_path)
        
        return content, repairs_in_file

    def apply_custom_repairs(self, content: str, file_path: Path) -> str:
        """Apply custom repairs for specific patterns."""
        lines = content.split('\n')
        repaired_lines = []
        
        for line_num, line in enumerate(lines):
            original_line = line
            
            # Fix broken import statements
            if 'import {' in line and '}' in line:
                # Pattern: import { word, char } from
                line = re.sub(r'import\s*\{\s*([^,}]+),\s*([a-z])\s*\}', r'import { \1\2 }', line)
            
            # Fix broken function parameters
            if 'function' in line or '=>' in line or '(' in line:
                # Pattern: param: typeword, 
                line = re.sub(r'(\w+):\s*(\w+)(\w+),', r'\1: \2, \3', line)
                
                # Pattern: param: type word
                line = re.sub(r'(\w+):\s*(\w+)\s+(\w+)', r'\1: \2, \3', line)
            
            # Fix broken object properties
            if ':' in line and '{' in line:
                # Pattern: prop: valueprop2:
                line = re.sub(r'(\w+):\s*([^,\n]+)(\w+):', r'\1: \2,\n      \3:', line)
            
            # Fix class declarations
            if 'class' in line:
                line = re.sub(r'protected\s+private:\s*static:', r'private static', line)
                line = re.sub(r'private:\s*static:', r'private static', line)
            
            # Fix variable declarations
            if 'const' in line or 'let' in line or 'var' in line:
                # Pattern: const varnametype =
                line = re.sub(r'(const|let|var)\s*(\w+)(\w+)\s*=', r'\1 \2: \3 =', line)
            
            # Fix method calls
            if '.' in line and '(' in line:
                # Pattern: obj.method()word
                line = re.sub(r'(\w+)\.(\w+)\(([^)]*)\)(\w+)', r'\1.\2(\3).\4', line)
            
            repaired_lines.append(line)
        
        return '\n'.join(repaired_lines)

    def repair_file(self, file_path: Path) -> bool:
        """Repair a single TypeScript file."""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            repaired_content, repairs_count = self.repair_file_content(content, file_path)
            
            if repairs_count > 0:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(repaired_content)
                
                print(f"Repaired {repairs_count} issues in {file_path}")
                self.repairs_made += repairs_count
                return True
            
            return False
            
        except Exception as e:
            print(f"Error processing {file_path}: {e}")
            return False

    def repair_all_files(self) -> None:
        """Repair all TypeScript files in the source directory."""
        ts_files = self.find_typescript_files()
        
        if not ts_files:
            print("No TypeScript files found!")
            return
        
        print(f"Starting repair of {len(ts_files)} files...")
        
        for file_path in ts_files:
            self.repair_file(file_path)
            self.files_processed += 1
        
        print(f"\nRepair completed!")
        print(f"Files processed: {self.files_processed}")
        print(f"Total repairs made: {self.repairs_made}")

    def generate_report(self) -> None:
        """Generate a detailed repair report."""
        report = {
            'timestamp': datetime.now().isoformat(),
            'files_processed': self.files_processed,
            'total_repairs': self.repairs_made,
            'backup_location': str(self.backup_directory),
            'repair_log': self.repair_log
        }
        
        report_file = 'repair_report.json'
        with open(report_file, 'w') as f:
            json.dump(report, f, indent=2)
        
        print(f"\nDetailed repair report saved to {report_file}")
        
        # Print summary
        print("\n" + "="*50)
        print("REPAIR SUMMARY")
        print("="*50)
        print(f"Files processed: {self.files_processed}")
        print(f"Total repairs made: {self.repairs_made}")
        print(f"Backup location: {self.backup_directory}")
        
        # Group repairs by pattern
        pattern_count = {}
        for log_entry in self.repair_log:
            pattern = log_entry['pattern']
            if pattern in pattern_count:
                pattern_count[pattern] += log_entry['matches']
            else:
                pattern_count[pattern] = log_entry['matches']
        
        print("\nTop repair patterns:")
        for pattern, count in sorted(pattern_count.items(), key=lambda x: x[1], reverse=True)[:10]:
            print(f"  {count:3d}: {pattern[:50]}...")

def main():
    """Main function to run the repair tool."""
    print("TypeScript Syntax Corruption Batch Repair Tool")
    print("=" * 50)
    
    repairer = TypeScriptSyntaxRepairer()
    
    # Create backup
    repairer.create_backup()
    
    # Repair all files
    repairer.repair_all_files()
    
    # Generate report
    repairer.generate_report()
    
    print("\nRepair completed successfully!")
    print("You can now run 'npm run type-check' to validate the repairs.")

if __name__ == "__main__":
    main()