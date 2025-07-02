#!/usr/bin/env python3
"""
Conservative Space Restoration Script for TypeScript AI Assistant
Restores essential spaces that were incorrectly removed by aggressive regex patterns.
"""

import os
import re
import glob
from typing import List, Tuple

class SpaceRestorationRepairer:
    def __init__(self, src_directory: str = "src"):
        self.src_directory = src_directory
        self.repair_count = 0
        
        # Conservative space restoration patterns
        self.space_restorations = [
            # Comment + keyword combinations
            ('// Ensure config is set before initializationif', '// Ensure config is set before initialization\nif'),
            ('// Initialize Mastraagent', '// Initialize Mastra agent'),
            ('// Set up error handling', '// Set up error handling'),
            ('// Initialize performance tracking', '// Initialize performance tracking'),
            ('// Load agent-specific configurations', '// Load agent-specific configurations'),
            ('// Get model configurationwith proper fallback chain', '// Get model configuration with proper fallback chain'),
            ('// Check multi-model configurationfirst', '// Check multi-model configuration first'),
            ('// Check legacy model configurationif', '// Check legacy model configuration\nif'),
            ('// Only support local Ollamamodels', '// Only support local Ollama models'),
            ('// Update status', '// Update status'),
            ('// Log executionstart', '// Log execution start'),
            ('// Execute with Mastraagent', '// Execute with Mastra agent'),
            ('// Update metrics', '// Update metrics'),
            ('// Cache successful response wheninfrastructure is ready', '// Cache successful response when infrastructure is ready'),
            ('// Update status', '// Update status'),
            ('// Build conversationhistory', '// Build conversation history'),
            ('// Execute query', '// Execute query'),
            ('// Process result', '// Process result'),
            ('// Add conversationhistory', '// Add conversation history'),
            ('// Add current query', '// Add current query'),
            ('// Use the textStream property which is the async iterable', '// Use the textStream property which is the async iterable'),
            ('// Would need toimplement queue', '// Would need to implement queue'),
            ('// Update executiontime metrics', '// Update execution time metrics'),
            ('// Update averages', '// Update averages'),
            ('// Update tokenmetrics', '// Update token metrics'),
            ('// Update success rate', '// Update success rate'),
            ('// Update last executiontime', '// Update last execution time'),
            ('//TODO: Implement performance tracking wheninfrastructure is ready', '//TODO: Implement performance tracking when infrastructure is ready'),
            ('// Simple load calculationbased onstatus', '// Simple load calculation based on status'),
            ('// Set up any agent-specific error handling', '// Set up any agent-specific error handling'),
            ('// Set up any agent-specific performance tracking', '// Set up any agent-specific performance tracking'),
            ('// Load any agent-specific configuration', '// Load any agent-specific configuration'),
            ('// Check if agent is initialized', '// Check if agent is initialized'),
            ('// Check if agent canrespond', '// Check if agent can respond'),
            ('// Cleanup any resources', '// Cleanup any resources'),
            
            # Function keyword spacing
            ('async functionstartServer', 'async function startServer'),
            ('export functioninitializeAgentRegistry', 'export function initializeAgentRegistry'),
            ('export functiongetAgentRegistry', 'export function getAgentRegistry'),
            ('export functioncreateExpertAgent', 'export function createExpertAgent'),
            
            # Method and property access spacing
            ('returnArray.from', 'return Array.from'),
            ('returnthis.', 'return this.'),
            ('returnMath.', 'return Math.'),
            ('returntrue', 'return true'),
            ('returnfalse', 'return false'),
            ('returnregistry', 'return registry'),
            ('returnstatus', 'return status'),
            ('returnnew agentClass', 'return new agentClass'),
            
            # Variable and parameter spacing
            ('canbe used', 'can be used'),
            ('shouldbe called', 'should be called'),
            ('toallow child', 'to allow child'),
            ('toset config', 'to set config'),
            ('toget full', 'to get full'),
            ('toimplement', 'to implement'),
            ('toregister', 'to register'),
            ('tostart', 'to start'),
            ('toinitialize', 'to initialize'),
            ('anagent', 'an agent'),
            ('nodependencies', 'no dependencies'),
            ('onhttp://localhost', 'on http://localhost'),
            ('downgracefully', 'down gracefully'),
            
            # Object and interface spacing
            ('DomainExpertise:', 'Domain Expertise:'),
            ('CoordinationProtocol:', 'Coordination Protocol:'),
            ('IntegrationPoints:', 'Integration Points:'),
            ('Mainapplicationrouter', 'Main application router'),
            ('Authenticationendpoints', 'Authentication endpoints'),
            ('Orchestrationendpoints', 'Orchestration endpoints'),
            ('executionendpoints', 'execution endpoints'),
            ('definitionof API', 'definition of API'),
            
            # Agent registry spacing
            ('Centralized registrationof all', 'Centralized registration of all'),
            ('registrationprocess', 'registration process'),
            ('registrationcompleted', 'registration completed'),
            ('singletonagent', 'singleton agent'),
            ('registrationstatus', 'registration status'),
            ('applicationstartup', 'application startup'),
            
            # Specific Promise type fixes that were over-corrected
            ('Promise<voi, d>', 'Promise<void>'),
            ('Promise<AgentRegistr, y>', 'Promise<AgentRegistry>'),
            ('Promise<AgentRespons, e>', 'Promise<AgentResponse>'),
            ('Promise<an, y>', 'Promise<any>'),
            ('Promise<boolea, n>', 'Promise<boolean>'),
            ('Promise<numbe, r>', 'Promise<number>'),
            
            # Try-catch structure restoration
            ('try {\n      // Ensure config is set before initializationif', 'try {\n      // Ensure config is set before initialization\n      if'),
            
            # Template literal and string spacing
            ('Failed toinitialize agent', 'Failed to initialize agent'),
            ('Shutting downagent', 'Shutting down agent'),
            ('Nomodel preference found for agent', 'No model preference found for agent'),
            ('I encountered anerror while', 'I encountered an error while'),
            ('Mastraagent not initialized', 'Mastra agent not initialized'),
            ('Unknownerror', 'Unknown error'),
            
            # Import statement spacing
            ('CoreMessag, e', 'CoreMessage'),
            
            # Return statement spacing in functions
            ('returnAgentRegistry.instance', 'return AgentRegistry.instance'),
            
            # Method call spacing
            ('this.buildEnhancedQuery(_queryrelevantContextcontext)', 'this.buildEnhancedQuery(_query, relevantContext, context)'),
            ('this.processWithoutRAG(_querycontext)', 'this.processWithoutRAG(_query, context)'),
            ('this.executeTraditionalProcessing(querycontext)', 'this.executeTraditionalProcessing(query, context)'),
            
            # Interface property spacing fixes
            ('ragConfi, g', 'ragConfig'),
            ('specialization: ExpertSpecializationragConfi, g', 'specialization: ExpertSpecialization, ragConfig'),
        ]

    def apply_space_restorations(self, content: str) -> Tuple[str, int]:
        """Apply space restoration fixes to content"""
        repairs_made = 0
        
        for broken_text, fixed_text in self.space_restorations:
            if broken_text in content:
                content = content.replace(broken_text, fixed_text)
                repairs_made += 1
                print(f"  Restored spacing: {broken_text[:40]}... → {fixed_text[:40]}...")
        
        return content, repairs_made

    def process_file(self, file_path: str) -> bool:
        """Process a single TypeScript file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                original_content = f.read()
            
            # Apply space restoration fixes
            repaired_content, repairs_made = self.apply_space_restorations(original_content)
            
            # Only write if changes were made
            if repairs_made > 0:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(repaired_content)
                
                print(f"Applied {repairs_made} space restoration fixes to {file_path}")
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

    def run_space_restoration(self):
        """Execute the space restoration process"""
        print("🔧 Starting Space Restoration for TypeScript AI Assistant")
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
        print("🔧 SPACE RESTORATION COMPLETE")
        print(f"Files modified: {files_changed}")
        print(f"Total fixes applied: {self.repair_count}")
        
        if self.repair_count > 0:
            print("\n✅ Space restoration fixes applied successfully!")
            print("📋 Next step: Run TypeScript compilation: npx tsc --noEmit")
        else:
            print("\n⚠️  No space restoration fixes needed")

def main():
    repairer = SpaceRestorationRepairer()
    repairer.run_space_restoration()

if __name__ == "__main__":
    main()