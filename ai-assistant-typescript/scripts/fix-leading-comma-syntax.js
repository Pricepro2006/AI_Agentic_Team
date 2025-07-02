#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Fix Leading Comma Syntax Errors - 2025 TypeScript Recovery
 * 
 * This script targets the specific syntax patterns introduced by our previous
 * automated fixes that caused leading commas and malformed object literals.
 */

let totalFixed = 0;
let filesProcessed = 0;

function fixLeadingCommaSyntax(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;
        let fileFixed = 0;

        // Pattern 1: Fix leading comma in property declarations
        // Examples: "protected, tools:" -> "protected tools:"
        //           "private, cache:" -> "private cache:"
        //           "public, method:" -> "public method:"
        const leadingCommaPropertyPattern = /(protected|private|public),\s+(\w+):/g;
        content = content.replace(leadingCommaPropertyPattern, (match, visibility, property) => {
            fileFixed++;
            return `${visibility} ${property}:`;
        });

        // Pattern 2: Fix leading comma in object properties
        // Examples: ", name: 'value'" -> "name: 'value'"
        //           ", enabled: true" -> "enabled: true"
        const leadingCommaObjectPattern = /,\s*(\w+):\s*([^,\n}]+)([,\n}])/g;
        content = content.replace(leadingCommaObjectPattern, (match, prop, value, ending) => {
            // Only fix if this is at the beginning of a line or after an opening brace
            if (match.startsWith(',')) {
                fileFixed++;
                return `${prop}: ${value}${ending}`;
            }
            return match;
        });

        // Pattern 3: Fix leading comma in object literals after opening brace
        // Examples: "{ , property: value" -> "{ property: value"
        const leadingCommaAfterBracePattern = /\{\s*,\s*(\w+):/g;
        content = content.replace(leadingCommaAfterBracePattern, (match, property) => {
            fileFixed++;
            return `{ ${property}:`;
        });

        // Pattern 4: Fix double commas
        // Examples: "property: value,, nextProp:" -> "property: value, nextProp:"
        const doubleCommaPattern = /,\s*,\s*/g;
        content = content.replace(doubleCommaPattern, () => {
            fileFixed++;
            return ', ';
        });

        // Pattern 5: Fix leading comma in array elements
        // Examples: "[, element1, element2]" -> "[element1, element2]"
        const leadingCommaArrayPattern = /\[\s*,\s*/g;
        content = content.replace(leadingCommaArrayPattern, () => {
            fileFixed++;
            return '[';
        });

        // Pattern 6: Fix malformed object method syntax
        // Examples: "method(, params)" -> "method(params)"
        const leadingCommaParamsPattern = /\(\s*,\s*/g;
        content = content.replace(leadingCommaParamsPattern, () => {
            fileFixed++;
            return '(';
        });

        // Pattern 7: Fix leading comma in type definitions
        // Examples: "interface { , prop: type }" -> "interface { prop: type }"
        const leadingCommaInterfacePattern = /\{\s*,\s*(\w+):/g;
        content = content.replace(leadingCommaInterfacePattern, (match, property) => {
            fileFixed++;
            return `{ ${property}:`;
        });

        // Pattern 8: Fix malformed assignment syntax
        // Examples: "_response," -> "_response"
        const trailingCommaAssignmentPattern = /(\w+),\s*([;})\]])/g;
        content = content.replace(trailingCommaAssignmentPattern, (match, variable, ending) => {
            // Only fix if the comma seems out of place
            if (ending === ';' || ending === '}' || ending === ')' || ending === ']') {
                fileFixed++;
                return `${variable}${ending}`;
            }
            return match;
        });

        // Pattern 9: Fix spaces around commas in method signatures
        // Examples: "method( _param , _param2 )" -> "method(_param, _param2)"
        const spacedCommaPattern = /\(\s*([^)]+)\s*\)/g;
        content = content.replace(spacedCommaPattern, (match, params) => {
            const cleanedParams = params
                .split(',')
                .map(param => param.trim())
                .filter(param => param.length > 0)
                .join(', ');
            if (cleanedParams !== params) {
                fileFixed++;
                return `(${cleanedParams})`;
            }
            return match;
        });

        // Pattern 10: Fix inconsistent underscore parameter references
        // Examples: Switch between _params and params consistently
        const inconsistentParamPattern = /(\w+)\s*\(\s*(_\w+)\s*:[^)]+\)\s*[^{]*\{([^}]*)\}/g;
        content = content.replace(inconsistentParamPattern, (match, funcName, paramName, body) => {
            const baseParam = paramName.replace(/^_/, '');
            
            // If body uses both _param and param, fix to use _param consistently
            if (body.includes(`${baseParam}`) && body.includes(paramName)) {
                const fixedBody = body.replace(new RegExp(`\\b${baseParam}\\b`, 'g'), paramName);
                if (fixedBody !== body) {
                    fileFixed++;
                    return match.replace(body, fixedBody);
                }
            }
            return match;
        });

        if (fileFixed > 0) {
            fs.writeFileSync(filePath, content);
            console.log(`Fixed ${fileFixed} syntax issues in ${path.relative(process.cwd(), filePath)}`);
            totalFixed += fileFixed;
        }

        filesProcessed++;

    } catch (error) {
        console.error(`Error processing ${filePath}:`, error.message);
    }
}

function processDirectory(dirPath) {
    try {
        const entries = fs.readdirSync(dirPath);

        for (const entry of entries) {
            const fullPath = path.join(dirPath, entry);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                // Skip node_modules and other irrelevant directories
                if (!['node_modules', '.git', 'dist', 'build', '.next'].includes(entry)) {
                    processDirectory(fullPath);
                }
            } else if (stat.isFile() && fullPath.endsWith('.ts')) {
                fixLeadingCommaSyntax(fullPath);
            }
        }
    } catch (error) {
        console.error(`Error reading directory ${dirPath}:`, error.message);
    }
}

// Main execution
console.log('🔧 Starting Leading Comma Syntax Fix (2025 TypeScript Recovery)...\n');

const srcPath = path.join(__dirname, '..', 'src');
if (fs.existsSync(srcPath)) {
    processDirectory(srcPath);
} else {
    console.error('Source directory not found:', srcPath);
    process.exit(1);
}

console.log(`\n✅ Leading comma syntax fix completed!`);
console.log(`📊 Summary:`);
console.log(`   • Files processed: ${filesProcessed}`);
console.log(`   • Total syntax issues fixed: ${totalFixed}`);
console.log(`\n🔄 Run 'npm run build' to check the results.\n`);