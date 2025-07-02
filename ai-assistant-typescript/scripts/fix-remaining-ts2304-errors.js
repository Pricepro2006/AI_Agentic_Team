#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('Fixing remaining TS2304 - Cannot find name errors...');

// Find all TypeScript files
const files = glob.sync('src/**/*.ts', {
    ignore: ['**/node_modules/**', '**/*.d.ts']
});

let totalFixed = 0;

// Fix specific parameter reference issues
function fixParameterReferences(content, file) {
    let fixed = 0;
    let newContent = content;
    
    // Pattern 1: Fix _params referenced as params
    if (newContent.includes('_params')) {
        // Find all instances where _params is in function parameter but params is used in body
        newContent = newContent.replace(
            /(\w+)\s*\(\s*_params\s*:[^)]+\)\s*[^{]*\{([^}]+)\}/g,
            (match, funcName, body) => {
                if (body.includes('params') && !body.includes('_params')) {
                    fixed++;
                    const fixedBody = body.replace(/\bparams\b/g, '_params');
                    return match.replace(body, fixedBody);
                }
                return match;
            }
        );
    }
    
    // Pattern 2: Fix cases where we reference undefined variables from destructuring
    // Example: const { action } = params; but then using _action
    newContent = newContent.replace(
        /const\s*\{\s*([^}]+)\}\s*=\s*_params;?([^}]*?switch\s*\()_action\)/gms,
        (match, destructured, between, switchStart) => {
            if (destructured.includes('action')) {
                fixed++;
                return match.replace('switch(_action)', 'switch(action)');
            }
            return match;
        }
    );
    
    // Pattern 3: Fix input/params references in complex functions
    const complexPatterns = [
        // Fix 'input' used when '_input' is the parameter
        { param: '_input', used: 'input' },
        // Fix 'params' used when '_params' is the parameter  
        { param: '_params', used: 'params' },
        // Fix 'action' used when '_action' is the parameter
        { param: '_action', used: 'action' },
        // Fix 'tool' used when '_tool' is the parameter
        { param: '_tool', used: 'tool' },
        // Fix 'match' used when '_match' is the parameter
        { param: '_match', used: 'match' },
        // Fix 'page' used when '_page' is the parameter
        { param: '_page', used: 'page' },
        // Fix 'response' used when '_response' is the parameter
        { param: '_response', used: 'response' },
        // Fix 'timeout' used when '_timeout' is the parameter
        { param: '_timeout', used: 'timeout' },
        // Fix 'agent' used when '_agent' is the parameter
        { param: '_agent', used: 'agent' },
        // Fix 'schema' used when '_schema' is the parameter
        { param: '_schema', used: 'schema' },
        // Fix 'name' used when '_name' is the parameter
        { param: '_name', used: 'name' },
        // Fix 'key' used when '_key' is the parameter
        { param: '_key', used: 'key' },
        // Fix 'type' used when '_type' is the parameter
        { param: '_type', used: 'type' },
        // Fix 'category' used when '_category' is the parameter
        { param: '_category', used: 'category' },
        // Fix 'query' used when '_query' is the parameter
        { param: '_query', used: 'query' },
        // Fix 'tools' used when '_tools' is the parameter
        { param: '_tools', used: 'tools' },
        // Fix 'event' used when '_event' is the parameter
        { param: '_event', used: 'event' }
    ];
    
    complexPatterns.forEach(pattern => {
        // Match function with specific underscore parameter
        const regex = new RegExp(
            `(\\b${pattern.param}\\b[^{)]*\\)\\s*[^{]*\\{)([^}]+)(\\})`,
            'g'
        );
        
        newContent = newContent.replace(regex, (match, before, body, after) => {
            // Check if the non-underscore version is used in the body
            const usageRegex = new RegExp(`\\b${pattern.used}\\b(?!\\.)`);
            if (usageRegex.test(body) && !body.includes(`${pattern.param}`)) {
                fixed++;
                // Replace all instances of the non-underscore version
                const fixedBody = body.replace(
                    new RegExp(`\\b${pattern.used}\\b`, 'g'),
                    pattern.param
                );
                return before + fixedBody + after;
            }
            return match;
        });
    });
    
    // Pattern 4: Fix nameOrCategory reference in getTool
    if (file.includes('ToolManager.ts')) {
        newContent = newContent.replace(
            /return this\.tools\.get\(nameOrCategory\)/g,
            (match) => {
                if (newContent.includes('_name: string')) {
                    fixed++;
                    return 'return this.tools.get(_name)';
                }
                return match;
            }
        );
        
        // Fix the complex getTool method
        newContent = newContent.replace(
            /const toolKey = `\$\{nameOrCategory\}:\$\{name\}`;/g,
            'const toolKey = `${_name}:${_name}`;'
        );
    }
    
    return { content: newContent, fixed };
}

// Fix missing type imports
function fixMissingTypeImports(content, file) {
    let fixed = 0;
    let newContent = content;
    
    // Common missing imports based on errors
    const typeImports = [
        {
            types: ['Logger'],
            from: 'pino',
            checkPattern: /\bLogger\b/
        },
        {
            types: ['AgentTool'],
            from: '../../types/agents',
            checkPattern: /\bAgentTool\b/
        }
    ];
    
    typeImports.forEach(importInfo => {
        if (importInfo.checkPattern.test(newContent) && 
            !newContent.includes(`from '${importInfo.from}'`)) {
            // Add import
            const firstImport = newContent.match(/^import.*$/m);
            if (firstImport) {
                const importLine = `import { ${importInfo.types.join(', ')} } from '${importInfo.from}'`;
                const index = newContent.indexOf(firstImport[0]);
                newContent = newContent.slice(0, index) + importLine + '\n' + newContent.slice(index);
                fixed++;
            }
        }
    });
    
    return { content: newContent, fixed };
}

// Process each file
files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        let originalContent = content;
        let fixedCount = 0;

        // Apply parameter reference fixes
        let result = fixParameterReferences(content, file);
        content = result.content;
        fixedCount += result.fixed;

        // Apply type import fixes
        result = fixMissingTypeImports(content, file);
        content = result.content;
        fixedCount += result.fixed;

        if (content !== originalContent) {
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Fixed ${fixedCount} additional TS2304 errors in ${file}`);
            totalFixed += fixedCount;
        }
    } catch (error) {
        console.error(`Error processing ${file}:`, error.message);
    }
});

console.log(`\nTotal additional TS2304 errors fixed: ${totalFixed}`);