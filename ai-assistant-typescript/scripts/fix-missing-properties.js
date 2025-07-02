#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('Analyzing and fixing TS2741 - Missing required properties errors...');

// Find all TypeScript files
const files = glob.sync('src/**/*.ts', {
    ignore: ['**/node_modules/**', '**/*.d.ts']
});

let totalFixed = 0;
let analysisResults = [];

// Common missing properties and their typical default values
const commonMissingProperties = {
    // Agent-related properties
    'modelPreferences': '{}',
    'retries': '0',
    'timeout': '30000',
    'maxRetries': '3',
    'retryDelay': '1000',
    'executionTime': 'Date.now()',
    'toolName': "''",
    'version': "'1.0.0'",
    'category': "'general'",
    'subcategory': "'utility'",
    'author': "'AI Assistant'",
    'requiredPermissions': '[]',
    
    // Tool result properties
    'success': 'false',
    'metadata': '{}',
    'data': 'null',
    'error': 'undefined',
    
    // Configuration properties
    'enabled': 'true',
    'priority': "'medium'",
    'description': "''",
    'tags': '[]',
    'capabilities': '[]',
    'limitations': '[]',
    'integrations': '[]',
    'specialties': '[]',
    'tools': '[]',
    
    // Common object properties
    'id': "''",
    'name': "''",
    'type': "''",
    'status': "'pending'",
    'created': 'new Date()',
    'updated': 'new Date()',
    'isActive': 'true',
    'isEnabled': 'true'
};

// Analyze missing properties in TypeScript errors
function analyzeMissingProperties(content, file) {
    const issues = [];
    
    // Look for object literal assignments that might be missing properties
    const objectLiteralPattern = /(\w+):\s*\{\s*([^}]*)\s*\}/g;
    let match;
    
    while ((match = objectLiteralPattern.exec(content)) !== null) {
        const [fullMatch, varName, objectContent] = match;
        const lineNumber = content.substring(0, match.index).split('\n').length;
        
        issues.push({
            file,
            lineNumber,
            objectContent,
            fullMatch,
            context: varName
        });
    }
    
    return issues;
}

// Fix missing properties based on common patterns
function fixMissingProperties(content, file) {
    let fixed = 0;
    let newContent = content;
    
    // Pattern 1: Fix AgentConfig missing modelPreferences
    newContent = newContent.replace(
        /(return\s*\{[^}]*id:\s*[^,]+,[^}]*name:\s*[^,]+,[^}]*description:\s*[^,]+,[^}]*version:\s*[^,]+,[^}]*)(systemMessage:\s*[^,]+,)([^}]*)\}/g,
        (match, before, systemMessage, after) => {
            if (!after.includes('modelPreferences')) {
                fixed++;
                return `${before}${systemMessage}${after}modelPreferences: {},}`;
            }
            return match;
        }
    );
    
    // Pattern 2: Fix ToolResult missing retries property
    newContent = newContent.replace(
        /(\{\s*error\?\s*:\s*[^,]+,?\s*success\s*:\s*[^,]+,\s*data\s*:\s*[^,]+,\s*metadata\s*:\s*[^,}]+)(\s*\})/g,
        (match, before, after) => {
            if (!before.includes('retries')) {
                fixed++;
                return `${before}, retries: 0${after}`;
            }
            return match;
        }
    );
    
    // Pattern 3: Fix ToolResult with success and data but missing retries
    newContent = newContent.replace(
        /(\{\s*success\s*:\s*[^,]+,\s*data\s*:\s*[^,}]+)(\s*\})/g,
        (match, before, after) => {
            if (!before.includes('retries') && !before.includes('metadata')) {
                fixed++;
                return `${before}, retries: 0, metadata: {}${after}`;
            } else if (!before.includes('retries')) {
                fixed++;
                return `${before}, retries: 0${after}`;
            }
            return match;
        }
    );
    
    // Pattern 4: Add missing properties to ToolMetadata objects
    newContent = newContent.replace(
        /readonly\s+metadata:\s*ToolMetadata\s*=\s*\{([^}]+)\}/g,
        (match, content) => {
            let addedProps = [];
            
            if (!content.includes('category')) {
                addedProps.push("category: 'general'");
            }
            if (!content.includes('requiredPermissions')) {
                addedProps.push('requiredPermissions: []');
            }
            
            if (addedProps.length > 0) {
                fixed += addedProps.length;
                return match.replace(content, content + ', ' + addedProps.join(', '));
            }
            
            return match;
        }
    );
    
    // Pattern 5: Fix ExpertSpecialization objects
    newContent = newContent.replace(
        /(const\s+specialization:\s*ExpertSpecialization\s*=\s*\{[^}]*domain:\s*[^,]+,)([^}]*)\}/g,
        (match, before, content) => {
            let missingProps = [];
            
            if (!content.includes('primaryExpertise')) {
                missingProps.push('primaryExpertise: []');
            }
            if (!content.includes('secondarySkills')) {
                missingProps.push('secondarySkills: []');
            }
            if (!content.includes('knowledgeAreas')) {
                missingProps.push('knowledgeAreas: []');
            }
            if (!content.includes('limitations')) {
                missingProps.push('limitations: []');
            }
            if (!content.includes('integrationPoints')) {
                missingProps.push('integrationPoints: []');
            }
            
            if (missingProps.length > 0) {
                fixed += missingProps.length;
                return `${before}${content}${content.endsWith(',') ? ' ' : ', '}${missingProps.join(', ')}}`;
            }
            
            return match;
        }
    );
    
    // Pattern 6: Fix AgentTool return objects
    newContent = newContent.replace(
        /return\s*\{\s*success:\s*[^,]+,\s*data:\s*[^,}]+(\s*,\s*metadata:\s*[^}]+)?\s*\}/g,
        (match) => {
            if (!match.includes('retries')) {
                fixed++;
                return match.replace('}', ', retries: 0}');
            }
            return match;
        }
    );
    
    // Pattern 7: Fix async function returns missing properties
    newContent = newContent.replace(
        /(return\s*\{\s*success:\s*true,\s*data:\s*[^,}]+)(\s*\})/g,
        (match, before, after) => {
            if (!before.includes('metadata') && !before.includes('retries')) {
                fixed++;
                return `${before}, metadata: {}, retries: 0${after}`;
            }
            return match;
        }
    );
    
    // Pattern 8: Fix error returns missing properties
    newContent = newContent.replace(
        /(return\s*\{\s*success:\s*false,\s*error:\s*[^,}]+)(\s*\})/g,
        (match, before, after) => {
            if (!before.includes('retries')) {
                fixed++;
                return `${before}, retries: 0${after}`;
            }
            return match;
        }
    );
    
    // Pattern 9: Fix ToolParameter objects
    newContent = newContent.replace(
        /\{\s*name:\s*[^,]+,\s*type:\s*[^,]+,\s*description:\s*[^,}]+(\s*,\s*required:\s*[^,}]+)?(\s*)\}/g,
        (match) => {
            if (!match.includes('required')) {
                fixed++;
                return match.replace('}', ', required: false}');
            }
            return match;
        }
    );
    
    // Pattern 10: Fix configuration objects with missing enabled property
    newContent = newContent.replace(
        /(const\s+\w+Config[^=]*=\s*\{[^}]*)\}/g,
        (match, before) => {
            if (!before.includes('enabled')) {
                fixed++;
                return `${before}, enabled: true}`;
            }
            return match;
        }
    );

    return { content: newContent, fixed };
}

// Specific fixes for common interface violations
function fixInterfaceViolations(content, file) {
    let fixed = 0;
    let newContent = content;
    
    // Fix AgentConfig interface violations
    if (file.includes('agents/examples/') || file.includes('agents/experts/')) {
        // Add missing modelPreferences to AgentConfig
        newContent = newContent.replace(
            /(return\s*\{[^}]*capabilities:\s*\[[^\]]*\],[^}]*legacyModel:\s*\{[^}]*\},[^}]*tags:\s*\[[^\]]*\],[^}]*systemMessage:\s*[^,]+,[^}]*specialties:\s*\[[^\]]*\],[^}]*tools:\s*\[[^\]]*\],[^}]*limitations:\s*\[[^\]]*\],[^}]*integrations:\s*\[[^\]]*\],[^}]*metadata:\s*\{[^}]*\})(\s*\})/g,
            (match, before, after) => {
                if (!before.includes('modelPreferences')) {
                    fixed++;
                    return `${before}, modelPreferences: {}${after}`;
                }
                return match;
            }
        );
    }
    
    // Fix ToolResult interface violations
    newContent = newContent.replace(
        /(catch\s*\([^)]*\)\s*\{[^}]*return\s*\{\s*success:\s*false,\s*error:\s*[^,}]+)(\s*\}[^}]*\})/g,
        (match, before, after) => {
            if (!before.includes('retries')) {
                fixed++;
                return `${before}, retries: 0${after}`;
            }
            return match;
        }
    );

    return { content: newContent, fixed };
}

// Process each file
files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        let originalContent = content;
        let fixedCount = 0;

        // Analyze missing properties
        const analysis = analyzeMissingProperties(content, file);
        if (analysis.length > 0) {
            analysisResults.push(...analysis);
        }

        // Apply missing property fixes
        let result = fixMissingProperties(content, file);
        content = result.content;
        fixedCount += result.fixed;

        // Apply interface violation fixes
        result = fixInterfaceViolations(content, file);
        content = result.content;
        fixedCount += result.fixed;

        if (content !== originalContent) {
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Fixed ${fixedCount} missing properties in ${file}`);
            totalFixed += fixedCount;
        }
    } catch (error) {
        console.error(`Error processing ${file}:`, error.message);
    }
});

// Write analysis results
if (analysisResults.length > 0) {
    const reportContent = `# Missing Properties Analysis Report

Generated: ${new Date().toISOString()}
Total files analyzed: ${files.length}
Total fixes applied: ${totalFixed}

## Analysis Results:

${analysisResults.map(issue => `
### ${issue.file}:${issue.lineNumber}
Context: ${issue.context}
Object: ${issue.objectContent}
`).join('\n')}

## Common Missing Properties Found:
${Object.keys(commonMissingProperties).map(prop => `- ${prop}: ${commonMissingProperties[prop]}`).join('\n')}
`;

    fs.writeFileSync('missing-properties-analysis.md', reportContent);
    console.log('\nAnalysis report written to missing-properties-analysis.md');
}

console.log(`\nTotal missing properties fixed: ${totalFixed}`);
console.log('\nNext steps:');
console.log('1. Review the changes to ensure they match your interfaces');
console.log('2. Run npm run build to verify the fixes');
console.log('3. Check the analysis report for any remaining issues');
console.log('4. Update type definitions if needed');