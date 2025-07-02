#!/usr/bin/env python3
"""
Final TypeScript Repair Script
Targets specific remaining corruption patterns found in compilation errors
"""

import os
import re
import json
import time
from pathlib import Path
from typing import List, Dict

class FinalTypeScriptRepairer:
    def __init__(self, src_directory: str = "src"):
        self.src_directory = src_directory
        self.repair_count = 0
        self.files_processed = 0
        
        # Final repair patterns for remaining corruption
        self.repair_patterns = [
            # Variable declaration fixes
            (r'\bconst ap: p\b', 'const app'),
            (r'\bconst POR: T\b', 'const PORT'),
            (r'\blet ap: p\b', 'let app'),
            (r'\bvar ap: p\b', 'var app'),
            
            # Function parameter missing commas
            (r'\(([a-zA-Z_$][a-zA-Z0-9_$]*): ([a-zA-Z_$][a-zA-Z0-9_$]*) ([a-zA-Z_$][a-zA-Z0-9_$]*): ([a-zA-Z_$][a-zA-Z0-9_$]*)\)', r'(\1: \2, \3: \4)'),
            (r'\(([a-zA-Z_$][a-zA-Z0-9_$]*): ([a-zA-Z_$][a-zA-Z0-9_$]*) ([a-zA-Z_$][a-zA-Z0-9_$]*): ([a-zA-Z_$][a-zA-Z0-9_$]*) ([a-zA-Z_$][a-zA-Z0-9_$]*): ([a-zA-Z_$][a-zA-Z0-9_$]*)\)', r'(\1: \2, \3: \4, \5: \6)'),
            
            # Generic type missing commas
            (r'Map<([a-zA-Z_$][a-zA-Z0-9_$]*)([a-zA-Z_$][a-zA-Z0-9_$]*)>', r'Map<\1, \2>'),
            (r'Record<([a-zA-Z_$][a-zA-Z0-9_$]*)([a-zA-Z_$][a-zA-Z0-9_$]*)>', r'Record<\1, \2>'),
            (r'Promise<([a-zA-Z_$][a-zA-Z0-9_$]*)([a-zA-Z_$][a-zA-Z0-9_$]*)>', r'Promise<\1, \2>'),
            (r'Array<([a-zA-Z_$][a-zA-Z0-9_$]*)([a-zA-Z_$][a-zA-Z0-9_$]*)>', r'Array<\1, \2>'),
            
            # Import statement fixes
            (r'import \{ Agent([a-zA-Z_$][a-zA-Z0-9_$]*) \}', r'import { Agent, \1 }'),
            (r'import \{ ([a-zA-Z_$][a-zA-Z0-9_$]*)([a-zA-Z_$][a-zA-Z0-9_$]*) \}', r'import { \1, \2 }'),
            
            # Function calls missing commas between parameters
            (r'([a-zA-Z_$][a-zA-Z0-9_$]*)\(([^,)]+) ([^,)]+)\)', r'\1(\2, \3)'),
            
            # Arrow function missing commas
            (r'\(([a-zA-Z_$][a-zA-Z0-9_$]*) ([a-zA-Z_$][a-zA-Z0-9_$]*)\) =>', r'(\1, \2) =>'),
            
            # Object destructuring missing commas
            (r'\{ ([a-zA-Z_$][a-zA-Z0-9_$]*)([a-zA-Z_$][a-zA-Z0-9_$]*) \}', r'{ \1, \2 }'),
            
            # Type union missing commas
            (r': ([a-zA-Z_$][a-zA-Z0-9_$]*) \| ([a-zA-Z_$][a-zA-Z0-9_$]*) \| ([a-zA-Z_$][a-zA-Z0-9_$]*)', r': \1 | \2 | \3'),
            
            # Interface/type property missing commas
            (r'([a-zA-Z_$][a-zA-Z0-9_$]*): ([a-zA-Z_$][a-zA-Z0-9_$]*) ([a-zA-Z_$][a-zA-Z0-9_$]*): ([a-zA-Z_$][a-zA-Z0-9_$]*)', r'\1: \2, \3: \4'),
            
            # Fix specific corruption patterns
            (r'\reqres\b', 'req, res'),
            (r'\breqres\b', 'req, res'),
            (r'reqres', 'req, res'),
            
            # Fix array generics
            (r'AsyncGenerator<([a-zA-Z_$][a-zA-Z0-9_$]*)([a-zA-Z_$][a-zA-Z0-9_$]*)([a-zA-Z_$][a-zA-Z0-9_$]*)>', r'AsyncGenerator<\1, \2, \3>'),
            
            # Fix return type corruption
            (r'Promise<([a-zA-Z_$][a-zA-Z0-9_$]*)([a-zA-Z_$][a-zA-Z0-9_$]*)>', r'Promise<\1\2>'),
            
            # Fix new Date corruption
            (r'\bnewDate\b', 'new Date'),
            (r'\bnew Date\(\)\.toISOString\(\)', 'new Date().toISOString()'),
            
            # Fix object access patterns
            (r'([a-zA-Z_$][a-zA-Z0-9_$]*)\.([a-zA-Z_$][a-zA-Z0-9_$]*)([a-zA-Z_$][a-zA-Z0-9_$]*)', r'\1.\2\3'),
            
            # Fix method call patterns with missing commas
            (r'\.([a-zA-Z_$][a-zA-Z0-9_$]*)\(([^,)]+) ([^,)]+)\)', r'.\1(\2, \3)'),
            
            # Fix variable assignment corruption
            (r'const ([a-zA-Z_$][a-zA-Z0-9_$]*): ([a-zA-Z_$][a-zA-Z0-9_$]*) =', r'const \1: \2 ='),
            (r'let ([a-zA-Z_$][a-zA-Z0-9_$]*): ([a-zA-Z_$][a-zA-Z0-9_$]*) =', r'let \1: \2 ='),
            
            # Fix registr: y pattern specifically
            (r'\bregistr: y\b', 'registry'),
            
            # Fix errorMessag: e pattern
            (r'\berrorMessag: e\b', 'errorMessage'),
            
            # Fix mastraTool: s pattern  
            (r'\bmastraTool: s\b', 'mastraTools'),
            
            # Fix response: r pattern
            (r'\brespons: r\b', 'response'),
            (r'\bresponse: r\b', 'response'),
            
            # Fix confidenc: e pattern
            (r'\bconfidenc: e\b', 'confidence'),
            
            # Fix URL typos in logging
            (r'htt p://', 'http://'),
            (r'ht t p://', 'http://'),
            
            # Fix specific router pattern
            (r'appRoute: r', 'appRouter'),
            
            # Fix async function patterns
            (r'async function ([a-zA-Z_$][a-zA-Z0-9_$]*)\(([^)]+)\) \{', r'async function \1(\2) {'),
            
            # Fix specific decimal comma patterns
            (r'0\.0, 5', '0.05'),
            
            # Fix property access with type annotations
            (r'([a-zA-Z_$][a-zA-Z0-9_$]*)\?: ([a-zA-Z_$][a-zA-Z0-9_$]*)([a-zA-Z_$][a-zA-Z0-9_$]*)', r'\1?: \2\3'),
            
            # Fix remaining comma-space in colon patterns
            (r': ([a-zA-Z_$][a-zA-Z0-9_$]*) ([a-zA-Z_$][a-zA-Z0-9_$]*)', r': \1\2'),
            
            # Final generic catch-all for remaining patterns
            (r'\b([a-zA-Z_$][a-zA-Z0-9_$]*): ([a-zA-Z_$][a-zA-Z0-9_$]*)\b', r'\1: \2'),
        ]

    def backup_file(self, file_path: str) -> str:
        """Create a backup of the original file"""
        backup_path = f"{file_path}.backup_final_{int(time.time())}"
        with open(file_path, 'r', encoding='utf-8') as original:
            with open(backup_path, 'w', encoding='utf-8') as backup:
                backup.write(original.read())
        return backup_path

    def repair_file(self, file_path: str) -> Dict:
        """Repair a single TypeScript file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                original_content = f.read()
            
            if not original_content.strip():
                return {"repaired": False, "reason": "Empty file"}
            
            # Create backup
            backup_path = self.backup_file(file_path)
            
            repaired_content = original_content
            repairs_made = 0
            
            # Apply all repair patterns
            for pattern, replacement in self.repair_patterns:
                matches = re.findall(pattern, repaired_content)
                if matches:
                    repaired_content = re.sub(pattern, replacement, repaired_content)
                    repairs_made += len(matches)
            
            # Write repaired content if changes were made
            if repairs_made > 0:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(repaired_content)
                
                self.repair_count += repairs_made
                
                return {
                    "file": file_path,
                    "repairs_made": repairs_made,
                    "backup_path": backup_path,
                    "repaired": True
                }
            else:
                # Remove backup if no repairs were needed
                os.remove(backup_path)
                return {"repaired": False, "reason": "No repairs needed"}
                
        except Exception as e:
            return {"repaired": False, "reason": f"Error: {str(e)}"}

    def find_typescript_files(self) -> List[str]:
        """Find all TypeScript files in the source directory"""
        typescript_files = []
        for root, dirs, files in os.walk(self.src_directory):
            for file in files:
                if file.endswith(('.ts', '.tsx')):
                    typescript_files.append(os.path.join(root, file))
        return typescript_files

    def repair_all_files(self) -> Dict:
        """Repair all TypeScript files"""
        typescript_files = self.find_typescript_files()
        
        print(f"Found {len(typescript_files)} TypeScript files to process...")
        
        results = {
            "total_files": len(typescript_files),
            "files_processed": 0,
            "files_repaired": 0,
            "total_repairs": 0,
            "failed_files": []
        }
        
        for file_path in typescript_files:
            self.files_processed += 1
            result = self.repair_file(file_path)
            
            if result.get("repaired", False):
                results["files_repaired"] += 1
                print(f"✅ Repaired {file_path}: {result['repairs_made']} fixes")
            elif "Error" in result.get("reason", ""):
                results["failed_files"].append({"file": file_path, "reason": result["reason"]})
                print(f"❌ Failed {file_path}: {result['reason']}")
            
            results["files_processed"] += 1
        
        results["total_repairs"] = self.repair_count
        return results

def main():
    print("🔧 Final TypeScript Repair Tool")
    print("===============================")
    
    repairer = FinalTypeScriptRepairer()
    
    # Run the repair process
    start_time = time.time()
    results = repairer.repair_all_files()
    end_time = time.time()
    
    # Generate report
    print(f"\n📊 Final Repair Summary:")
    print(f"   Total files found: {results['total_files']}")
    print(f"   Files processed: {results['files_processed']}")
    print(f"   Files repaired: {results['files_repaired']}")
    print(f"   Total repairs made: {results['total_repairs']}")
    print(f"   Processing time: {end_time - start_time:.2f} seconds")
    
    if results['failed_files']:
        print(f"\n❌ Failed files ({len(results['failed_files'])}):")
        for failed in results['failed_files']:
            print(f"   {failed['file']}: {failed['reason']}")
    
    # Save detailed report
    report_file = f"final_repair_report_{int(time.time())}.json"
    with open(report_file, 'w') as f:
        json.dump({
            "summary": results,
            "timestamp": time.time(),
            "duration": end_time - start_time
        }, f, indent=2)
    
    print(f"\n📄 Detailed report saved to: {report_file}")
    
    if results['files_repaired'] > 0:
        print(f"\n✅ Final repair completed successfully!")
        print(f"   Run 'npm run type-check' to validate TypeScript compilation")
    else:
        print(f"\n⚠️  No files needed repair")

if __name__ == "__main__":
    main()