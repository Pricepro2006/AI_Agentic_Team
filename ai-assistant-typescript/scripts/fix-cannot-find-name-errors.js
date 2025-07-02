#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('Fixing TS2304 - Cannot find name errors...');

// Find all TypeScript files
const files = glob.sync('src/**/*.ts', {
    ignore: ['**/node_modules/**', '**/*.d.ts']
});

let totalFixed = 0;

// Fix missing getErrorMessage imports
function fixGetErrorMessageImports(content, file) {
    let fixed = 0;
    
    // Check if file uses getErrorMessage but doesn't import it
    if (content.includes('getErrorMessage(') && !content.includes('import { getErrorMessage')) {
        // Check if it already imports from error.utils
        if (content.includes("from '../../utils/error.utils'") || content.includes('from "../utils/error.utils"')) {
            // Add getErrorMessage to existing import
            content = content.replace(
                /(import\s*{\s*)([^}]+)(}\s*from\s*['"]\.\.\/\.\.\/utils\/error\.utils['"])/,
                (match, p1, p2, p3) => {
                    if (!p2.includes('getErrorMessage')) {
                        return `${p1}${p2.trim()}, getErrorMessage${p3}`;
                    }
                    return match;
                }
            );
            fixed++;
        } else {
            // Add new import after other imports
            const importMatch = content.match(/^import.*$/m);
            if (importMatch) {
                const lastImportIndex = content.lastIndexOf(importMatch[0]) + importMatch[0].length;
                const relativePathToUtils = getRelativePath(file, 'src/utils/error.utils.ts');
                content = content.slice(0, lastImportIndex) + 
                    `\nimport { getErrorMessage } from '${relativePathToUtils}'` + 
                    content.slice(lastImportIndex);
                fixed++;
            }
        }
    }
    
    return { content, fixed };
}

// Fix underscore prefixed parameters being used without underscore
function fixUnderscoreParams(content, file) {
    let fixed = 0;
    
    // Common patterns where _params is declared but params is used
    const patterns = [
        // Fix _params referenced as params
        { 
            search: /\b_params\b(.*?)\{[\s\S]*?\bparams\b/g,
            fix: (match) => {
                // Only fix if it's in the same function scope
                if (match.includes('{') && match.includes('params')) {
                    fixed++;
                    return match.replace(/\bparams\b/g, '_params');
                }
                return match;
            }
        },
        // Fix _action referenced as action
        {
            search: /\b_action\b(.*?)\{[\s\S]*?\baction\b/g,
            fix: (match) => {
                if (match.includes('{') && match.includes('action') && !match.includes('.action')) {
                    fixed++;
                    return match.replace(/\baction\b/g, '_action');
                }
                return match;
            }
        }
    ];
    
    patterns.forEach(pattern => {
        content = content.replace(pattern.search, pattern.fix);
    });
    
    // Fix function parameters that use underscore but reference without
    content = content.replace(
        /(\w+)\s*\(\s*_(\w+)([^)]*)\)\s*[^{]*\{([^}]+)\}/g,
        (match, funcName, paramName, otherParams, body) => {
            if (body.includes(paramName) && !body.includes(`_${paramName}`)) {
                fixed++;
                // Replace references to paramName with _paramName in the body
                const fixedBody = body.replace(new RegExp(`\\b${paramName}\\b`, 'g'), `_${paramName}`);
                return match.replace(body, fixedBody);
            }
            return match;
        }
    );
    
    return { content, fixed };
}

// Fix missing imports for common utilities
function fixMissingImports(content, file) {
    let fixed = 0;
    
    const importChecks = [
        {
            usage: 'logError(',
            importStatement: "import { logError } from '../../utils/error.utils'",
            importName: 'logError'
        },
        {
            usage: 'isError(',
            importStatement: "import { isError } from '../../utils/error.utils'",
            importName: 'isError'
        }
    ];
    
    importChecks.forEach(check => {
        if (content.includes(check.usage) && !content.includes(`import { ${check.importName}`)) {
            const relativePathToUtils = getRelativePath(file, 'src/utils/error.utils.ts');
            content = addImport(content, check.importName, relativePathToUtils);
            fixed++;
        }
    });
    
    return { content, fixed };
}

// Helper to get relative path
function getRelativePath(fromFile, toFile) {
    const fromDir = path.dirname(fromFile);
    let relativePath = path.relative(fromDir, toFile.replace('.ts', ''));
    if (!relativePath.startsWith('.')) {
        relativePath = './' + relativePath;
    }
    return relativePath;
}

// Helper to add import
function addImport(content, importName, fromPath) {
    const existingImport = content.match(new RegExp(`from ['"]${fromPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]`));
    
    if (existingImport) {
        // Add to existing import
        return content.replace(
            new RegExp(`(import\\s*{[^}]+)}\\s*from\\s*['"]${fromPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]`),
            (match, p1) => {
                if (!p1.includes(importName)) {
                    return `${p1.replace('}', `, ${importName}}`)} from '${fromPath}'`;
                }
                return match;
            }
        );
    } else {
        // Add new import
        const lastImport = content.match(/^import.*$/gm);
        if (lastImport && lastImport.length > 0) {
            const lastImportLine = lastImport[lastImport.length - 1];
            const index = content.lastIndexOf(lastImportLine) + lastImportLine.length;
            return content.slice(0, index) + `\nimport { ${importName} } from '${fromPath}'` + content.slice(index);
        }
    }
    return content;
}

// Process each file
files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        let originalContent = content;
        let fixedCount = 0;

        // Apply fixes
        let result = fixGetErrorMessageImports(content, file);
        content = result.content;
        fixedCount += result.fixed;

        result = fixUnderscoreParams(content, file);
        content = result.content;
        fixedCount += result.fixed;

        result = fixMissingImports(content, file);
        content = result.content;
        fixedCount += result.fixed;

        if (content !== originalContent) {
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Fixed ${fixedCount} errors in ${file}`);
            totalFixed += fixedCount;
        }
    } catch (error) {
        console.error(`Error processing ${file}:`, error.message);
    }
});

console.log(`\nTotal TS2304 errors fixed: ${totalFixed}`);