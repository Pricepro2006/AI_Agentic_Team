#!/usr/bin/env python3
"""
Comprehensive Final Fix Script for TypeScript AI Assistant Recovery
Targets all remaining corruption patterns identified in Phase 1 audit
"""

import os
import re
import glob
from typing import List, Tuple
import shutil
from datetime import datetime

class ComprehensiveFinalRepairer:
    def __init__(self, src_directory: str = "src"):
        self.src_directory = src_directory
        self.backup_dir = f"backup_comprehensive_final_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        self.fixes_applied = 0
        self.files_processed = 0
        
        # Comprehensive patterns for all remaining corruption
        self.repair_patterns = [
            # Critical function/import fixes
            (r'\bcreateContex, t\b', 'createContext'),
            (r'\binitializeAgentRegistr, y\b', 'initializeAgentRegistry'),
            (r'\binitializeToolRegistr, y\b', 'initializeToolRegistry'),
            (r'\bBaseAge, n\b', 'BaseAgent'),
            (r'\bOllamaServi, c\b', 'OllamaService'),
            
            # URL and protocol fixes
            (r'\bhtt, p://', 'http://'),
            (r'\bhttps, ://', 'https://'),
            
            # Type annotation fixes with commas
            (r'\(\s*([a-zA-Z_][a-zA-Z0-9_]*):,\s*([a-zA-Z_][a-zA-Z0-9_<>\[\]|&\s]*)\)', r'(\1: \2)'),
            (r'\b([a-zA-Z_][a-zA-Z0-9_]*):,\s*([a-zA-Z_][a-zA-Z0-9_<>\[\]|&\s]*)', r'\1: \2'),
            
            # Generic type fixes
            (r'\bPartial<RAGConfi, g>', 'Partial<RAGConfig>'),
            (r'\bAgentRespons, e\b', 'AgentResponse'),
            (r'\bToolExecutionResul, t\b', 'ToolExecutionResult'),
            (r'\bembeddingMode, l\b', 'embeddingModel'),
            
            # Return statement fixes
            (r'\breturnacc\b', 'return acc'),
            (r'\breturndefaultTask\b', 'return defaultTask'),
            (r'\breturnfallbacks\b', 'return fallbacks'),
            (r'\breturncachedResponse\b', 'return cachedResponse'),
            (r'\breturnresponse\b', 'return response'),
            (r'\breturnmessages\b', 'return messages'),
            (r'\breturnresult\b', 'return result'),
            (r'\breturntestResponse\b', 'return testResponse'),
            (r'\breturnAgentRegistry\b', 'return AgentRegistry'),
            (r'\breturntotalTime\b', 'return totalTime'),
            (r'\breturnvalidationChecks\b', 'return validationChecks'),
            (r'\breturnalignedSkills\b', 'return alignedSkills'),
            (r'\breturncomplexityScores\b', 'return complexityScores'),
            (r'\breturndurations\b', 'return durations'),
            (r'\breturntask\b', 'return task'),
            (r'\breturn0\.5\b', 'return 0.5'),
            (r'\breturn3600\b', 'return 3600'),
            
            # Function declaration fixes
            (r'\bfunctioninitializeAgentRegistry\b', 'function initializeAgentRegistry'),
            (r'\bfunctionstartServer\b', 'function startServer'),
            (r'\basync functionstartServer\b', 'async function startServer'),
            
            # Complex variable declaration fixes
            (r'\bconst ([a-zA-Z_][a-zA-Z0-9_]*): ([a-zA-Z_][a-zA-Z0-9_<>\[\]|&\s]*) =', r'const \1: \2 ='),
            (r'\blet ([a-zA-Z_][a-zA-Z0-9_]*): ([a-zA-Z_][a-zA-Z0-9_<>\[\]|&\s]*) =', r'let \1: \2 ='),
            
            # Method parameter fixes
            (r'\((sum[^,)]*), ?([^,)]*), ?([^,)]*)\)', r'(sum, \2, \3)'),
            (r'\bcontext\?\s*:\s*,\s*any\b', 'context?: any'),
            (r'\bresults\s*:\s*,\s*any\b', 'results: any'),
            (r'\bprogress\s*:\s*,\s*any\b', 'progress: any'),
            (r'\btask\s*:\s*,\s*any\b', 'task: any'),
            (r'\bquery\s*:\s*,\s*string\b', 'query: string'),
            (r'\bcomplexity\s*:\s*,\s*string\b', 'complexity: string'),
            (r'\bintent\s*:\s*,\s*any\b', 'intent: any'),
            (r'\bnewTime\s*:\s*,\s*number\b', 'newTime: number'),
            (r'\bconfidence\s*:\s*numberragUse\s*,\s*d\s*:\s*boolean\b', 'confidence: number, ragUsed: boolean'),
            
            # Object property fixes
            (r'\brespons(er?)\s*:\s*(e?s?)ponse', 'response: response'),
            (r'\bconfidenc(er?)\s*:\s*(e?s?)ponse', 'confidence: response'),
            (r'\bexecutionTim(er?)\s*:\s*(e?s?)ults', 'executionTime: results'),
            
            # Array and object method fixes
            (r'\bmap\((source:,\s*any)\)', 'map((source: any)'),
            (r'\bfilter\((keyword\s*=>,\s*)', 'filter((keyword) =>'),
            (r'\bfilter\((available\s*=>,\s*)', 'filter((available) =>'),
            (r'\bsome\((available\s*=>,\s*)', 'some((available) =>'),
            
            # String concatenation and template fixes
            (r'\$\{([^}]+)\|\|,\s*([^}]+)\}', r'${\1 || \2}'),
            (r'unregistered:\s*,\s*(\$\{[^}]+\})', r'unregistered: \1'),
            (r'agent\s*,\s*(\$\{[^}]+\})', r'agent \1'),
            (r'parameter:\s*,\s*(\$\{[^}]+\})', r'parameter: \1'),
            
            # Spacing fixes in compound words
            (r'\binitializationto\b', 'initialization to'),
            (r'\bfoundationfor\b', 'foundation for'),
            (r'\bimplementationpatterns\b', 'implementation patterns'),
            (r'\bintegrationfor\b', 'integration for'),
            (r'\bdomainexpertise\b', 'domain expertise'),
            (r'\bcoordinationcapabilities\b', 'coordination capabilities'),
            (r'\bcoordinationwith\b', 'coordination with'),
            (r'\bexecutionwith\b', 'execution with'),
            (r'\bvalidationand\b', 'validation and'),
            (r'\bvalidationwith\b', 'validation with'),
            (r'\bwhencross-domain\b', 'when cross-domain'),
            (r'\bwheninfrastructure\b', 'when infrastructure'),
            (r'\btotraditional\b', 'to traditional'),
            (r'\bexecutionfailed\b', 'execution failed'),
            (r'\bonvarious\b', 'on various'),
            (r'\bontool\b', 'on tool'),
            (r'\bonresponse\b', 'on response'),
            (r'\bondomainknowledge\b', 'on domain knowledge'),
            (r'\bcanbe\b', 'can be'),
            (r'\bfunctionshould\b', 'function should'),
            (r'\bImplementationwould\b', 'Implementation would'),
            (r'\bimplementationwould\b', 'implementation would'),
            (r'\bimplementationreturn\b', 'implementation\n    return'),
            (r'\binsightspartial\b', 'insights, partial'),
            (r'\bresultsor\b', 'results, or'),
            (r'\bcoordinationrequirements\b', 'coordination requirements'),
            (r'\bcommunicationchannel\b', 'communication channel'),
            (r'\btoMO\b', 'to MO'),
            (r'\bonthe\b', 'on the'),
            (r'\binparams\b', 'in params'),
            
            # Complex concatenated identifiers
            (r'\bspecializationthis\.ragConfig\b', 'specialization\n    this.ragConfig'),
            (r'\bcontextthis\.specialization\b', 'context, this.specialization'),
            (r'\bspecializationragConfig\b', 'specialization, ragConfig'),
            (r'\bAgentConfigAgentTool\b', 'AgentConfig, AgentTool'),
            (r'\bsuccess: boolean = truemetadata\b', 'success: boolean = true, metadata'),
            (r'\banyrequiredField,\s*s:\s*,\s*string\[\]', 'any, requiredFields: string[]'),
            
            # Complex method calls and property access
            (r'cache\.set\(cacheKeyresponsethis\.getCacheTTL\(\)\)', 'cache.set(cacheKey, response, this.getCacheTTL())'),
            (r'\banalys(i:\s*s)\b', 'analysis'),
            (r'\brelevanceFactor(:\s*s)\b', 'relevanceFactors'),
            (r'\bweightedScor(:\s*e)\b', 'weightedScore'),
            (r'\bweight(:\s*s)\b', 'weights'),
            (r'\bdomainKeyword(:\s*s)\b', 'domainKeywords'),
            (r'\bqueryLowe(:\s*r)\b', 'queryLower'),
            (r'\bmatche(:\s*s)\b', 'matches'),
            (r'\bavailableSkill(:\s*s)\b', 'availableSkills'),
            (r'\balignedSkill(:\s*s)\b', 'alignedSkills'),
            (r'\bcomplexityScore(:\s*s)\b', 'complexityScores'),
            (r'\bcomplexit(:\s*y)\b', 'complexity'),
            (r'\bduration(:\s*s)\b', 'durations'),
            (r'\bestimatedDuratio(:\s*n)\b', 'estimatedDuration'),
            (r'\bvalidationCheck(:\s*s)\b', 'validationChecks'),
            (r'\brepor(:\s*t)\b', 'report'),
            (r'\brelevantContex(:\s*t)\b', 'relevantContext'),
            (r'\benhancedQuer(:\s*y)\b', 'enhancedQuery'),
            
            # Handle multiple parameter issues
            (r'\bparams:\s*any\):\s*Promise<ToolExecutionResult>', 'params: any): Promise<ToolExecutionResult>'),
            (r'\bragConfig\?\s*:\s*,\s*Partial<RAGConfig>', 'ragConfig?: Partial<RAGConfig>'),
            
            # Handle missing spaces in operators and punctuation
            (r'(?<=[a-zA-Z0-9])-\s*,\s*(?=[a-zA-Z])', '- '),
            (r'(?<=[a-zA-Z0-9])\.,\s*(?=[a-zA-Z])', '. '),
            (r'(?<=[a-zA-Z0-9]),\s*(?=[a-zA-Z])', ', '),
            
            # Handle return type issues
            (r'Promise<neve,\s*r>', 'Promise<never>'),
            
            # Handle line breaks that got concatenated
            (r'shutdownprocess\.on', 'shutdown\n\nprocess.on'),
            (r'optimizationCoordination', 'optimization\n\nCoordination'),
            
            # Handle JSON syntax issues in template literals
            (r',\s*\}', ' }'),
            
            # Handle complex parameter declarations
            (r'\(([^:,)]+),\s*([^:,)]+),\s*([^:,)]+)\)\s*=>', r'(\1, \2, \3) =>'),
            
            # Fix pipe operator spacing issues
            (r'\|\|,\s*', '|| '),
            
            # Fix boolean and number literal spacing
            (r'= true,metadata', '= true, metadata'),
            (r'= false,', '= false, '),
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

    def apply_repairs(self, file_path: str) -> int:
        """Apply all repair patterns to a single file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                content = file.read()
            
            original_content = content
            fixes_in_file = 0
            
            # Apply all patterns
            for pattern, replacement in self.repair_patterns:
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
        """Apply repairs to all TypeScript files"""
        print("🔧 Starting comprehensive final repair process...")
        
        # Create backup first
        self.create_backup()
        
        # Get all TypeScript files
        files = self.get_typescript_files()
        print(f"📁 Found {len(files)} TypeScript files to process")
        
        # Process each file
        for file_path in files:
            fixes_in_file = self.apply_repairs(file_path)
            if fixes_in_file > 0:
                self.fixes_applied += fixes_in_file
                self.files_processed += 1
                print(f"  ✓ {file_path}: {fixes_in_file} fixes applied")
        
        # Summary
        print(f"\n📊 Comprehensive Final Repair Summary:")
        print(f"   • Total files processed: {self.files_processed}")
        print(f"   • Total fixes applied: {self.fixes_applied}")
        print(f"   • Backup location: {self.backup_dir}")

def main():
    """Main function to run the comprehensive repair"""
    print("🎯 PERFECT SYSTEM RECOVERY PROMPT - Phase 1 Comprehensive Final Fix")
    print("=" * 60)
    
    repairer = ComprehensiveFinalRepairer()
    repairer.repair_all_files()
    
    print("\n✅ Comprehensive final repair completed!")
    print("Next: Run TypeScript compilation to validate remaining issues")

if __name__ == "__main__":
    main()