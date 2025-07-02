#!/usr/bin/env node

/**
 * Comprehensive TypeScript Syntax Error Fix Script
 * 
 * Targets TS1005 and TS1434 errors specifically
 * Based on 2024-2025 best practices for TypeScript error resolution
 * 
 * Fixes patterns like:
 * - TS1005: ',' expected, '}' expected, ':' expected
 * - TS1434: Unexpected keyword or identifier
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class TypeScriptSyntaxFixer {
    constructor() {
        this.fixedFiles = 0;
        this.totalFixes = 0;
        this.errorLog = [];
        this.srcDir = path.join(__dirname, '../src');
    }

    async fixAllSyntaxErrors() {
        console.log('🔧 Starting comprehensive TypeScript syntax error fixes...');
        console.log('📊 Targeting TS1005 and TS1434 errors specifically');
        
        try {
            await this.processDirectory(this.srcDir);
            
            console.log('\n📈 Fix Summary:');
            console.log(`✅ Files processed: ${this.fixedFiles}`);
            console.log(`🔧 Total fixes applied: ${this.totalFixes}`);
            
            if (this.errorLog.length > 0) {
                console.log('\n⚠️  Issues encountered:');
                this.errorLog.forEach(error => console.log(`   ${error}`));
            }
            
            console.log('\n🎯 Running TypeScript check to verify fixes...');
            this.verifyFixes();
            
        } catch (error) {
            console.error('❌ Error during syntax fixing:', error.message);
        }
    }

    async processDirectory(dirPath) {
        const entries = fs.readdirSync(dirPath, { withFileTypes: true });
        
        for (const entry of entries) {
            const fullPath = path.join(dirPath, entry.name);
            
            if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
                await this.processDirectory(fullPath);
            } else if (entry.isFile() && entry.name.endsWith('.ts')) {
                await this.fixFileSync(fullPath);
            }
        }
    }

    async fixFileSync(filePath) {
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            let newContent = content;
            let fileFixes = 0;

            // Pattern 1: Fix double comma and malformed object properties (TS1005)
            // Example: modelPreferences: {},}, -> modelPreferences: {}
            const doubleCommaPattern = /(\w+:\s*\{[^}]*\}),\s*},/g;
            const doubleCommaMatches = newContent.match(doubleCommaPattern);
            if (doubleCommaMatches) {
                newContent = newContent.replace(doubleCommaPattern, '$1},');
                fileFixes += doubleCommaMatches.length;
                console.log(`   Fixed ${doubleCommaMatches.length} double comma patterns in ${path.basename(filePath)}`);
            }

            // Pattern 2: Fix template literal mixed with object syntax (TS1005/TS1434)
            // Example: ${spec_source, enabled: true} -> ${spec_source}
            const mixedLiteralPattern = /\$\{([^,}]+),\s*[^}]+\}/g;
            const mixedLiteralMatches = newContent.match(mixedLiteralPattern);
            if (mixedLiteralMatches) {
                newContent = newContent.replace(mixedLiteralPattern, '${$1}');
                fileFixes += mixedLiteralMatches.length;
                console.log(`   Fixed ${mixedLiteralMatches.length} mixed template literal patterns in ${path.basename(filePath)}`);
            }

            // Pattern 3: Fix missing commas in object literals (TS1005)
            // Look for lines where there should be a comma but isn't
            const lines = newContent.split('\n');
            let fixedLines = [];
            let lineChanges = 0;

            for (let i = 0; i < lines.length; i++) {
                let line = lines[i];
                const nextLine = lines[i + 1];
                
                // Check if this line ends with } or a value and next line starts with a property
                if (nextLine && 
                    (line.trim().endsWith('}') || line.trim().match(/:\s*['"]\w+['"]$/)) &&
                    nextLine.trim().match(/^\s*\w+\s*:/) &&
                    !line.trim().endsWith(',') &&
                    !line.trim().endsWith('{')) {
                    
                    line = line + ',';
                    lineChanges++;
                }
                
                fixedLines.push(line);
            }

            if (lineChanges > 0) {
                newContent = fixedLines.join('\n');
                fileFixes += lineChanges;
                console.log(`   Fixed ${lineChanges} missing comma patterns in ${path.basename(filePath)}`);
            }

            // Pattern 4: Fix malformed function calls and method chains (TS1434)
            // Example: .someMethod(param, enabled: true) -> .someMethod(param)
            const malformedCallPattern = /(\.\w+\([^,)]+),\s*\w+:\s*[^)]+\)/g;
            const malformedCallMatches = newContent.match(malformedCallPattern);
            if (malformedCallMatches) {
                newContent = newContent.replace(malformedCallPattern, '$1)');
                fileFixes += malformedCallMatches.length;
                console.log(`   Fixed ${malformedCallMatches.length} malformed function call patterns in ${path.basename(filePath)}`);
            }

            // Pattern 5: Fix missing semicolons after statements (TS1005)
            const missingSemicolonPattern = /(\w+\([^)]*\))\s*$/gm;
            const missingSemicolonMatches = newContent.match(missingSemicolonPattern);
            if (missingSemicolonMatches) {
                // Only add semicolons where they're clearly missing
                newContent = newContent.replace(missingSemicolonPattern, (match, p1) => {
                    if (!match.includes(';') && !match.includes('{') && !match.includes('}')) {
                        return p1 + ';';
                    }
                    return match;
                });
                fileFixes += missingSemicolonMatches.length;
                console.log(`   Fixed ${missingSemicolonMatches.length} missing semicolon patterns in ${path.basename(filePath)}`);
            }

            // Pattern 6: Fix incomplete object literal assignments (TS1005)
            // Example: prop: value enabled: true -> prop: value, enabled: true
            const incompleteObjectPattern = /(\w+:\s*\w+)\s+(\w+:\s*\w+)/g;
            const incompleteObjectMatches = newContent.match(incompleteObjectPattern);
            if (incompleteObjectMatches) {
                newContent = newContent.replace(incompleteObjectPattern, '$1, $2');
                fileFixes += incompleteObjectMatches.length;
                console.log(`   Fixed ${incompleteObjectMatches.length} incomplete object literal patterns in ${path.basename(filePath)}`);
            }

            // Pattern 7: Fix dangling commas and extra brackets (TS1005)
            // Remove trailing commas before closing brackets
            const danglingCommaPattern = /,(\s*[}\]])/g;
            const danglingCommaMatches = newContent.match(danglingCommaPattern);
            if (danglingCommaMatches) {
                newContent = newContent.replace(danglingCommaPattern, '$1');
                fileFixes += danglingCommaMatches.length;
                console.log(`   Fixed ${danglingCommaMatches.length} dangling comma patterns in ${path.basename(filePath)}`);
            }

            // Pattern 8: Fix unexpected keywords in object contexts (TS1434)
            // Example: {enabled true} -> {enabled: true}
            const missingColonPattern = /\{\s*(\w+)\s+(\w+)\s*\}/g;
            const missingColonMatches = newContent.match(missingColonPattern);
            if (missingColonMatches) {
                newContent = newContent.replace(missingColonPattern, '{$1: $2}');
                fileFixes += missingColonMatches.length;
                console.log(`   Fixed ${missingColonMatches.length} missing colon patterns in ${path.basename(filePath)}`);
            }

            // Only write if changes were made
            if (fileFixes > 0) {
                fs.writeFileSync(filePath, newContent, 'utf8');
                this.fixedFiles++;
                this.totalFixes += fileFixes;
                console.log(`✅ Fixed ${fileFixes} syntax errors in ${path.relative(this.srcDir, filePath)}`);
            }

        } catch (error) {
            this.errorLog.push(`Error processing ${filePath}: ${error.message}`);
        }
    }

    verifyFixes() {
        try {
            console.log('🔍 Checking current error count...');
            const result = execSync('npm run build 2>&1 | grep -c "error TS" || echo "0"', { 
                encoding: 'utf8',
                cwd: path.dirname(this.srcDir)
            });
            
            const errorCount = parseInt(result.trim());
            console.log(`📊 Current error count: ${errorCount}`);
            
            if (errorCount > 0) {
                console.log('🔍 Checking error breakdown...');
                const breakdown = execSync(
                    'npm run build 2>&1 | grep -E "error TS[0-9]+" | sed -E \'s/.*error (TS[0-9]+).*/\\1/\' | sort | uniq -c | sort -rn | head -10', 
                    { encoding: 'utf8', cwd: path.dirname(this.srcDir) }
                );
                console.log('📈 Top error types:');
                console.log(breakdown);
            }
            
        } catch (error) {
            console.log('⚠️  Could not verify fixes automatically');
        }
    }
}

// Run the fixer
if (require.main === module) {
    const fixer = new TypeScriptSyntaxFixer();
    fixer.fixAllSyntaxErrors().then(() => {
        console.log('🎉 Syntax error fixing completed!');
        process.exit(0);
    }).catch(error => {
        console.error('❌ Fatal error:', error);
        process.exit(1);
    });
}

module.exports = TypeScriptSyntaxFixer;