#!/usr/bin/env python3
"""
Critical Pattern Fix Script for Remaining TypeScript Syntax Issues
Targets the most serious remaining corruption patterns
"""

import os
import re
import glob
from typing import List
import shutil
from datetime import datetime

class CriticalPatternRepairer:
    def __init__(self, src_directory: str = "src"):
        self.src_directory = src_directory
        self.backup_dir = f"backup_critical_pattern_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        self.fixes_applied = 0
        self.files_processed = 0
        
        # Critical patterns for most serious remaining issues
        self.critical_patterns = [
            # Function parameter declarations with concatenated identifiers
            (r'\bExpertSpecializationragConfig\b', 'ExpertSpecialization, ragConfig'),
            (r'\bragConfig\?\s*:\s*,\s*Partial<RAGConfig>', 'ragConfig?: Partial<RAGConfig>'),
            (r'\bspecializationragConfig\b', 'specialization, ragConfig'),
            (r'\banyrequiredField,\s*s:\s*string\[\]', 'any, requiredFields: string[]'),
            (r'\banyadditionalContex,\s*t:\s*any', 'any, additionalContext: any'),
            
            # Arrow function parameter issues
            (r'tool =>,\s*tool\.name', 'tool => tool.name'),
            (r'keyword =>,\s*queryLower', 'keyword => queryLower'),
            (r'available =>,\s*available', 'available => available'),
            (r'skill =>\s*availableSkills', 'skill => availableSkills'),
            (r'\((sum[^,)]*),\s*([^,)]*),\s*([^,)]*)\)\s*=>', r'(sum, \2, \3) =>'),
            (r'\((factor[^,)]*),\s*([^,)]*)\)\s*=>', r'(factor, \2) =>'),
            
            # Complex destructuring assignments
            (r'const\s+raint:\s*s\s*=', 'constraints ='),
            (r'const\s+{([^}]+)const\s+raint:\s*s\s*=([^}]+)}', r'const { \1constraints = \2}'),
            
            # Boolean and interface fixes
            (r'\bbooleanembeddingMode,\s*l:\s*string', 'boolean\n  embeddingModel: string'),
            
            # Complex method signature fixes
            (r'queryAnalysis:\s*\(([^)]+)\)\s*=>\s*Promise<any>,\s*routingDecision:\s*\(([^)]+)\)\s*=>\s*Promise<number>,\s*responseFormat:\s*\(([^)]+)\)\s*=>\s*Promise<any>,\s*contextSharing:\s*\(([^)]+)\)\s*=>\s*Promise<void>,\s*taskValidation:\s*\(([^)]+)\)\s*=>\s*Promise<boolean>,\s*progressReporting:\s*\(([^)]+)\)\s*=>\s*Promise<void>', 
             'queryAnalysis: (\\1) => Promise<any>\n  routingDecision: (\\2) => Promise<number>\n  responseFormat: (\\3) => Promise<any>\n  contextSharing: (\\4) => Promise<void>\n  taskValidation: (\\5) => Promise<boolean>\n  progressReporting: (\\6) => Promise<void>'),
            
            # Object property concatenations
            (r'\bagentId:\s*this\.config\.id,\s*agentName:\s*this\.config\.name,\s*executionTime([^,]*),\s*confidencer:\s*esults', 'agentId: this.config.id,\n      agentName: this.config.name,\n      executionTime\\1,\n      confidence: results'),
            
            # Method parameter issues in complex signatures
            (r'\((sumfactorindex)\)\s*=>\s*sum\s*\+\s*\(factor\s*\*\s*weights\[index\]\)', '(sum, factor, index) => sum + (factor * weights[index])'),
            
            # Fix complex reduce callback
            (r'reduce\(\(([^,)]+),\s*([^,)]+),\s*([^,)]+)\)\s*=>', r'reduce((\1, \2, \3) =>'),
            
            # Comments with concatenated text
            (r'// RAG processing steps:', '// RAG processing steps:'),
            (r'inknowledge\s+domain', 'in knowledge domain'),
            (r'durationinminutes', 'duration in minutes'),
            (r'domainrelevance', 'domain relevance'),
            (r'incoordination', 'in coordination'),
            (r'toMaster\s+Orchestrator', 'to Master Orchestrator'),
            (r'for\s+sharing\s+relevant\s+context\s+with\s+other\s+experts', 'for sharing relevant context with other experts'),
            (r'Implementationfor', 'Implementation for'),
            (r'totell\s+TypeScript', 'to tell TypeScript'),
            (r'canhandle', 'can handle'),
            (r'Domainexperts', 'Domain experts'),
            (r'tocomplete', 'to complete'),
            (r'criteriaare', 'criteria are'),
            (r'functiontocreate', 'function to create'),
            (r'implementationhelper', 'implementation helper'),
            (r'executionfailed', 'execution failed'),
            
            # Fix newline issues in object literals
            (r'enabled:\s*true,\s*embeddingModel:', 'enabled: true,\n      embeddingModel:'),
            (r'chunkSize:\s*500,\s*chunkOverlap:', 'chunkSize: 500,\n      chunkOverlap:'),
            (r'topK:\s*5,\s*scoreThreshold:', 'topK: 5,\n      scoreThreshold:'),
            (r'optimizationStrategy:\s*\'hybrid\',\s*knowledgeDomains:', 'optimizationStrategy: \'hybrid\',\n      knowledgeDomains:'),
            (r'vectorStore:\s*\'local\',\s*persistentStorage:', 'vectorStore: \'local\',\n      persistentStorage:'),
            
            # Fix metrics object formatting
            (r'totalRequests:\s*0,\s*successfulRequests:\s*0,\s*averageResponseTime:\s*0,\s*ragQueries:\s*0,\s*confidenceScores:', 'totalRequests: 0,\n    successfulRequests: 0,\n    averageResponseTime: 0,\n    ragQueries: 0,\n    confidenceScores:'),
            
            # Fix complex template literals
            (r'await\s+this\.retrieveRelevantContext\(_query_knowledgeDomain\)', 'await this.retrieveRelevantContext(_query, _knowledgeDomain)'),
            
            # Fix complex property access chains
            (r'ragContext\.sources\.map\(\(source:\s*any\)\s*=>\s*`-\s*\$\{source\.content\}`\)\.join\(\'\\\\n\'\)', 'ragContext.sources.map((source: any) => `- ${source.content}`).join(\'\\n\')'),
            
            # Fix return statement formatting
            (r'return\s*{\s*response:\s*response\.content,\s*ragSources:\s*relevantContext\.sources,\s*confidence:\s*response\.confidence', 'return {\n        response: response.content,\n        ragSources: relevantContext.sources,\n        confidence: response.confidence'),
            
            # Fix complex object destructuring
            (r'domainRelevance:\s*this\.calculateDomainRelevance\(query\),\s*expertiseRequired:\s*this\.identifyRequiredExpertise\(query\),\s*complexity:\s*this\.assessComplexity\(query\),\s*estimatedDuration:\s*this\.estimateDuration\(query\),\s*requirements:\s*analysis\.response,\s*confidence:\s*analysis\.confidence,\s*processingTime:', 'domainRelevance: this.calculateDomainRelevance(query),\n        expertiseRequired: this.identifyRequiredExpertise(query),\n        complexity: this.assessComplexity(query),\n        estimatedDuration: this.estimateDuration(query),\n        requirements: analysis.response,\n        confidence: analysis.confidence,\n        processingTime:'),
            
            # Fix simple variable declarations
            (r'const\s+modelId\s*=\s*this\.getModelFromPreferences\(\);const', 'const modelId = this.getModelFromPreferences();\n    const'),
            
            # Fix spacing in built-in RAG integration
            (r'built-inRAG\s+integrationMO\s+coordinationinterfaceand\s+comprehensive', 'built-in RAG integration, MO coordination interface, and comprehensive'),
            (r'RAG\s+integrationcapabilities', 'RAG integration capabilities'),
            (r'MO\s+coordinationinterface', 'MO coordination interface'),
            (r'Coordination\s+Protocol:', 'Coordination Protocol:'),
            
            # Fix specific line patterns that are causing major issues
            (r'1\.\s+Receive\s+tasks\s+from\s+Master\s+Orchestrator\s+with\s+clear\s+acceptance\s+criteria2\.\s+Execute', '1. Receive tasks from Master Orchestrator with clear acceptance criteria\n2. Execute'),
            (r'4\.\s+Validate\s+outputs\s+against\s+quality\s+standards\s+and\s+acceptance\s+criteria5\.\s+Report', '4. Validate outputs against quality standards and acceptance criteria\n5. Report'),
            
            # Fix remaining concatenated words
            (r'coordinations?tandards', 'coordination standards'),
            (r'MO\s+coordination\s*standards', 'MO coordination standards'),
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

    def apply_critical_repairs(self, file_path: str) -> int:
        """Apply critical repair patterns to a single file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                content = file.read()
            
            original_content = content
            fixes_in_file = 0
            
            # Apply all critical patterns
            for pattern, replacement in self.critical_patterns:
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
        """Apply critical repairs to all TypeScript files"""
        print("🔧 Starting critical pattern repair process...")
        
        # Create backup first
        self.create_backup()
        
        # Get all TypeScript files
        files = self.get_typescript_files()
        print(f"📁 Found {len(files)} TypeScript files to process")
        
        # Process each file
        for file_path in files:
            fixes_in_file = self.apply_critical_repairs(file_path)
            if fixes_in_file > 0:
                self.fixes_applied += fixes_in_file
                self.files_processed += 1
                print(f"  ✓ {file_path}: {fixes_in_file} critical fixes applied")
        
        # Summary
        print(f"\n📊 Critical Pattern Repair Summary:")
        print(f"   • Total files processed: {self.files_processed}")
        print(f"   • Total critical fixes applied: {self.fixes_applied}")
        print(f"   • Backup location: {self.backup_dir}")

def main():
    """Main function to run the critical pattern repair"""
    print("🎯 PERFECT SYSTEM RECOVERY PROMPT - Phase 1 Critical Pattern Fix")
    print("=" * 60)
    
    repairer = CriticalPatternRepairer()
    repairer.repair_all_files()
    
    print("\n✅ Critical pattern repair completed!")
    print("Next: Re-run TypeScript compilation to validate remaining issues")

if __name__ == "__main__":
    main()