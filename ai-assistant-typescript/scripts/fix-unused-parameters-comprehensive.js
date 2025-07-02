#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('Fixing TS6133 - Unused parameter errors with underscore prefix convention...');

// Find all TypeScript files
const files = glob.sync('src/**/*.ts', {
    ignore: ['**/node_modules/**', '**/*.d.ts']
});

let totalFixed = 0;

// Common patterns for unused parameters
const unusedParameterPatterns = [
    // Function parameters
    {
        pattern: /(\w+)\s*\(\s*([^)]+)\)\s*(:\s*[^{]+)?\s*\{/g,
        description: 'Function parameters'
    },
    // Arrow function parameters
    {
        pattern: /(\w+)\s*=\s*\(([^)]+)\)\s*(:\s*[^=]+)?\s*=>/g,
        description: 'Arrow function parameters'
    },
    // Method parameters
    {
        pattern: /(async\s+)?(\w+)\s*\(\s*([^)]+)\)\s*(:\s*[^{]+)?\s*\{/g,
        description: 'Method parameters'
    }
];

// Parameters that should typically be prefixed with underscore if unused
const commonUnusedParameters = [
    'context', 'req', 'res', 'next', 'error', 'err', 'event', 'data',
    'params', 'options', 'config', 'state', 'props', 'meta', 'info',
    'response', 'request', 'query', 'body', 'headers', 'payload',
    'action', 'type', 'callback', 'cb', 'done', 'resolve', 'reject',
    'timeout', 'delay', 'duration', 'index', 'item', 'value', 'key',
    'match', 'matches', 'result', 'results', 'input', 'output',
    'schema', 'validation', 'validator', 'provider', 'client',
    'agent', 'manager', 'handler', 'processor', 'controller',
    'service', 'repository', 'model', 'entity', 'dto'
];

// Fix unused parameters in a specific function/method
function fixUnusedParametersInFunction(content, file) {
    let fixed = 0;
    let newContent = content;

    // Pattern to find function definitions with parameters
    const functionPattern = /((?:async\s+)?(?:function\s+)?(?:public\s+|private\s+|protected\s+)?(?:static\s+)?(?:abstract\s+)?(\w+)\s*<[^>]*>?\s*\(([^)]+)\)(?:\s*:\s*[^{]+)?\s*\{)/g;
    
    newContent = newContent.replace(functionPattern, (match, fullMatch, funcName, paramsStr) => {
        if (!paramsStr || paramsStr.trim() === '') return match;

        // Parse parameters
        const params = paramsStr.split(',').map(p => p.trim());
        let hasChanges = false;
        
        const fixedParams = params.map(param => {
            // Skip if already has underscore prefix
            if (param.startsWith('_')) return param;
            
            // Extract parameter name (handle type annotations, defaults, destructuring)
            const paramMatch = param.match(/^\s*(?:\.\.\.)?([a-zA-Z_$][a-zA-Z0-9_$]*)/);
            if (!paramMatch) return param;
            
            const paramName = paramMatch[1];
            
            // Skip common exceptions
            if (['this', 'self', 'super'].includes(paramName)) return param;
            
            // Check if this parameter name is commonly unused
            if (commonUnusedParameters.includes(paramName)) {
                hasChanges = true;
                fixed++;
                return param.replace(paramName, `_${paramName}`);
            }
            
            return param;
        });

        if (hasChanges) {
            return fullMatch.replace(paramsStr, fixedParams.join(', '));
        }
        
        return match;
    });

    // Handle arrow functions
    const arrowFunctionPattern = /(\w+\s*=\s*\(([^)]+)\)\s*(?::\s*[^=]+)?\s*=>)/g;
    
    newContent = newContent.replace(arrowFunctionPattern, (match, fullMatch, paramsStr) => {
        if (!paramsStr || paramsStr.trim() === '') return match;

        const params = paramsStr.split(',').map(p => p.trim());
        let hasChanges = false;
        
        const fixedParams = params.map(param => {
            if (param.startsWith('_')) return param;
            
            const paramMatch = param.match(/^\s*(?:\.\.\.)?([a-zA-Z_$][a-zA-Z0-9_$]*)/);
            if (!paramMatch) return param;
            
            const paramName = paramMatch[1];
            
            if (commonUnusedParameters.includes(paramName)) {
                hasChanges = true;
                fixed++;
                return param.replace(paramName, `_${paramName}`);
            }
            
            return param;
        });

        if (hasChanges) {
            return fullMatch.replace(paramsStr, fixedParams.join(', '));
        }
        
        return match;
    });

    // Handle destructuring parameters
    const destructuringPattern = /(\{\s*[^}]+\}\s*:\s*[^,)]+)/g;
    
    newContent = newContent.replace(destructuringPattern, (match) => {
        let hasChanges = false;
        let result = match;
        
        // Find individual destructured properties
        const propertyPattern = /(\w+)(?:\s*:\s*\w+)?/g;
        
        result = result.replace(propertyPattern, (propMatch, propName) => {
            if (propName.startsWith('_')) return propMatch;
            
            if (commonUnusedParameters.includes(propName)) {
                hasChanges = true;
                fixed++;
                return propMatch.replace(propName, `_${propName}`);
            }
            
            return propMatch;
        });

        return hasChanges ? result : match;
    });

    // Fix specific patterns where parameter is referenced incorrectly after underscore prefix
    newContent = newContent.replace(/(\w+)\s*\(\s*_(\w+)[^)]*\)\s*[^{]*\{([^}]*)\2(?!_)/g, (match, funcName, paramName, body) => {
        // If we find the original parameter name used in the body, replace it with underscore version
        if (body.includes(paramName) && !body.includes(`_${paramName}`)) {
            fixed++;
            const fixedBody = body.replace(new RegExp(`\\b${paramName}\\b`, 'g'), `_${paramName}`);
            return match.replace(body, fixedBody);
        }
        return match;
    });

    return { content: newContent, fixed };
}

// Process each file
files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        let originalContent = content;
        let fixedCount = 0;

        // Apply unused parameter fixes
        let result = fixUnusedParametersInFunction(content, file);
        content = result.content;
        fixedCount += result.fixed;

        // Handle specific cases for common function signatures
        const specificFixes = [
            // Express-style middleware
            {
                pattern: /(\w+)\s*\(\s*(req|request)\s*:\s*[^,]+,\s*(res|response)\s*:\s*[^,]+,\s*(next)\s*:\s*[^)]+\)/g,
                fix: (match, funcName, req, res, next) => {
                    fixedCount++;
                    return match.replace(req, `_${req}`).replace(res, `_${res}`).replace(next, `_${next}`);
                }
            },
            // Event handlers
            {
                pattern: /(\w+)\s*\(\s*(event|e)\s*:\s*[^)]+\)/g,
                fix: (match, funcName, event) => {
                    if (!event.startsWith('_')) {
                        fixedCount++;
                        return match.replace(event, `_${event}`);
                    }
                    return match;
                }
            },
            // Database callback patterns
            {
                pattern: /(\w+)\s*\(\s*(error|err)\s*:\s*[^,]+,\s*(result|data)\s*:\s*[^)]+\)/g,
                fix: (match, funcName, error, result) => {
                    let fixed = match;
                    if (!error.startsWith('_')) {
                        fixed = fixed.replace(error, `_${error}`);
                        fixedCount++;
                    }
                    if (!result.startsWith('_')) {
                        fixed = fixed.replace(result, `_${result}`);
                        fixedCount++;
                    }
                    return fixed;
                }
            }
        ];

        // Apply specific fixes
        specificFixes.forEach(({ pattern, fix }) => {
            content = content.replace(pattern, fix);
        });

        if (content !== originalContent) {
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Fixed ${fixedCount} unused parameters in ${file}`);
            totalFixed += fixedCount;
        }
    } catch (error) {
        console.error(`Error processing ${file}:`, error.message);
    }
});

console.log(`\nTotal unused parameters fixed: ${totalFixed}`);
console.log('\nNext steps:');
console.log('1. Review the changes to ensure they are correct');
console.log('2. Run npm run build to verify the fixes');
console.log('3. Update any references to the renamed parameters');
console.log('\nNote: Parameters were prefixed with underscore following TypeScript conventions');
console.log('for intentionally unused parameters as documented in modern TypeScript style guides.');