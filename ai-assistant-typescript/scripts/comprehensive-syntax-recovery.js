#!/usr/bin/env node

/**
 * Comprehensive TypeScript Syntax Recovery Script (2024-2025)
 * 
 * This script addresses the critical syntax issues introduced by previous automated fixes.
 * Based on TypeScript best practices and modern error recovery patterns.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class TypeScriptSyntaxRecovery {
    constructor() {
        this.srcDir = path.join(__dirname, '..', 'src');
        this.fixedFiles = [];
        this.errors = [];
        
        // Define comprehensive pattern fixes based on 2024-2025 best practices
        this.patterns = [
            // Pattern 1: Inconsistent variable references (action vs _action, params vs _params)
            {
                name: 'Inconsistent Parameter References',
                pattern: /(switch\s*\(\s*)(_\w+)(\s*\)\s*{[\s\S]*?case\s+[^:]+:\s*[\s\S]*?return\s+this\.\w+\(\s*)(\w+)(\s*\);)/g,
                fix: (match, switchStart, switchVar, caseStart, paramVar, ending) => {
                    const baseVar = switchVar.replace(/^_/, '');
                    if (paramVar === baseVar && switchVar.startsWith('_')) {
                        return `${switchStart}${switchVar}${caseStart}${switchVar.replace(/^_/, '')}${ending}`;
                    }
                    return match;
                }
            },
            
            // Pattern 2: Missing variable declarations
            {
                name: 'Missing Parameter Declarations',
                pattern: /switch\s*\(\s*_(\w+)\s*\)\s*{[\s\S]*?return\s+this\.\w+\(\s*(\w+)\s*\);/g,
                fix: (match) => {
                    if (match.includes('switch(_action)') && match.includes('return this.') && match.includes('(params)')) {
                        return match.replace('(params)', '(_params)');
                    }
                    return match;
                }
            },
            
            // Pattern 3: Object property syntax errors
            {
                name: 'Malformed Object Properties',
                pattern: /(\w+:\s*[^,}]+),\s*}/g,
                fix: (match, property) => `${property}}`
            },
            
            // Pattern 4: Template literal syntax errors
            {
                name: 'Template Literal Syntax',
                pattern: /\$\{([^}]+),\s*[^}]*\}/g,
                fix: (match, content) => `\${${content.split(',')[0]}}`
            },
            
            // Pattern 5: Missing commas in object literals
            {
                name: 'Missing Object Literal Commas',
                pattern: /(\w+:\s*[^,}]+)\s+(\w+:)/g,
                fix: (match, prop1, prop2) => `${prop1}, ${prop2}`
            },
            
            // Pattern 6: Dangling commas
            {
                name: 'Dangling Commas',
                pattern: /,(\s*[}\]])/g,
                fix: (match, closing) => closing
            },
            
            // Pattern 7: Missing semicolons
            {
                name: 'Missing Semicolons',
                pattern: /(\w+\([^)]*\))\s*(\n\s*[a-zA-Z])/g,
                fix: (match, statement, nextLine) => `${statement};${nextLine}`
            },
            
            // Pattern 8: Malformed method chains
            {
                name: 'Method Chain Syntax',
                pattern: /(\w+)\s*\(\s*_(\w+)\s*\)[^;\n]*\n\s*\.(\w+)/g,
                fix: (match, method, param, nextMethod) => {
                    return match.replace(/\n\s*\./, '\n      .');
                }
            },
            
            // Pattern 9: Variable shadowing issues
            {
                name: 'Variable Shadowing',
                pattern: /const\s+(\w+)\s*=\s*[^;]+;\s*[\s\S]*?if\s*\(\s*!\1\s*\)\s*\{[\s\S]*?\1\s*=\s*[^;]+;/g,
                fix: (match) => {
                    // This requires more complex logic - for now, flag for manual review
                    return match;
                }
            },
            
            // Pattern 10: Inconsistent function parameter patterns
            {
                name: 'Function Parameter Consistency',
                pattern: /(async\s+)?(\w+)\s*\(\s*_(\w+):\s*[^)]+\)\s*[^{]*\{[\s\S]*?(\3)(?![\w_])/g,
                fix: (match, async, funcName, paramName, usage) => {
                    return match.replace(new RegExp(`\\b${paramName}\\b`, 'g'), `_${paramName}`);
                }
            }
        ];
    }
    
    // Get all TypeScript files for processing
    getAllTsFiles(dir = this.srcDir) {
        let files = [];
        const items = fs.readdirSync(dir);
        
        for (const item of items) {
            const fullPath = path.join(dir, item);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory() && !item.includes('node_modules') && !item.includes('.git')) {
                files = files.concat(this.getAllTsFiles(fullPath));
            } else if (item.endsWith('.ts') && !item.endsWith('.d.ts')) {
                files.push(fullPath);
            }
        }
        
        return files;
    }
    
    // Apply a single pattern fix to content
    applyPatternFix(content, pattern) {
        let fixedContent = content;
        let fixCount = 0;
        
        if (typeof pattern.fix === 'function') {
            fixedContent = content.replace(pattern.pattern, (...args) => {
                const result = pattern.fix(...args);
                if (result !== args[0]) {
                    fixCount++;
                }
                return result;
            });
        } else {
            const matches = content.match(pattern.pattern);
            if (matches) {
                fixedContent = content.replace(pattern.pattern, pattern.fix);
                fixCount = matches.length;
            }
        }
        
        return { content: fixedContent, fixCount };
    }
    
    // Fix a single file
    fixFile(filePath) {
        try {
            console.log(`Processing: ${path.relative(this.srcDir, filePath)}`);
            
            let content = fs.readFileSync(filePath, 'utf8');
            const originalContent = content;
            let totalFixes = 0;
            
            // Apply each pattern sequentially
            for (const pattern of this.patterns) {
                const result = this.applyPatternFix(content, pattern);
                content = result.content;
                totalFixes += result.fixCount;
                
                if (result.fixCount > 0) {
                    console.log(`  ${pattern.name}: ${result.fixCount} fixes`);
                }
            }
            
            // Additional specific fixes for common issues
            content = this.applySpecificFixes(content, filePath);
            
            if (content !== originalContent) {
                fs.writeFileSync(filePath, content);
                this.fixedFiles.push({
                    file: filePath,
                    fixes: totalFixes
                });
                console.log(`  Total fixes: ${totalFixes}`);
            }
            
            return { success: true, fixes: totalFixes };
            
        } catch (error) {
            console.error(`Error processing ${filePath}:`, error.message);
            this.errors.push({ file: filePath, error: error.message });
            return { success: false, error: error.message };
        }
    }
    
    // Apply specific fixes for known problematic patterns
    applySpecificFixes(content, filePath) {
        let fixedContent = content;
        
        // Fix 1: Handle switch statement parameter mismatches
        fixedContent = fixedContent.replace(
            /switch\s*\(\s*_action\s*\)\s*{([\s\S]*?)return\s+this\.\w+\(\s*params\s*\);/g,
            (match, caseBody) => {
                return match.replace('(params)', '(_params)');
            }
        );
        
        // Fix 2: Handle object literal property issues  
        fixedContent = fixedContent.replace(
            /(\w+):\s*\{([^}]+)\},\s*}/g,
            (match, prop, objContent) => {
                if (!objContent.includes(':')) {
                    return `${prop}: {${objContent}}`;
                }
                return match;
            }
        );
        
        // Fix 3: Handle method chaining issues
        fixedContent = fixedContent.replace(
            /\.createHash\('sha256'\);\s*\.update/g,
            `.createHash('sha256')\n      .update`
        );
        
        // Fix 4: Handle if statement variable references
        fixedContent = fixedContent.replace(
            /if\s*\(\s*_(\w+)\s*\)\s*{([\s\S]*?)}/g,
            (match, varName, body) => {
                if (body.includes(varName) && !body.includes(`_${varName}`)) {
                    const fixedBody = body.replace(new RegExp(`\\b${varName}\\b`, 'g'), `_${varName}`);
                    return `if (_${varName}) {${fixedBody}}`;
                }
                return match;
            }
        );
        
        // Fix 5: Handle forEach callback parameter consistency
        fixedContent = fixedContent.replace(
            /\.forEach\s*\(\s*\(([^,)]+),\s*([^)]+)\)\s*=>\s*{([\s\S]*?)}\s*\)/g,
            (match, param1, param2, body) => {
                // Ensure parameter names used in body match the declaration
                if (body.includes(param1.replace(/^_/, '')) && param1.startsWith('_')) {
                    const correctedBody = body.replace(
                        new RegExp(`\\b${param1.replace(/^_/, '')}\\b`, 'g'), 
                        param1
                    );
                    return `.forEach(${param1}, ${param2}) => {${correctedBody}})`;
                }
                return match;
            }
        );
        
        return fixedContent;
    }
    
    // Run the comprehensive recovery process
    async run() {
        console.log('🔧 Starting Comprehensive TypeScript Syntax Recovery...');
        console.log('📅 Using 2024-2025 Best Practices\n');
        
        const files = this.getAllTsFiles();
        console.log(`📁 Found ${files.length} TypeScript files to process\n`);
        
        let totalFixed = 0;
        let totalFixes = 0;
        
        for (const file of files) {
            const result = this.fixFile(file);
            if (result.success && result.fixes > 0) {
                totalFixed++;
                totalFixes += result.fixes;
            }
        }
        
        console.log('\n✅ Recovery Summary:');
        console.log(`   📄 Files processed: ${files.length}`);
        console.log(`   🔧 Files fixed: ${totalFixed}`);
        console.log(`   ⚡ Total fixes applied: ${totalFixes}`);
        console.log(`   ❌ Errors encountered: ${this.errors.length}`);
        
        if (this.errors.length > 0) {
            console.log('\n❌ Files with errors:');
            this.errors.forEach(error => {
                console.log(`   - ${path.relative(this.srcDir, error.file)}: ${error.error}`);
            });
        }
        
        // Test compile after fixes
        console.log('\n🧪 Testing compilation...');
        try {
            execSync('npm run build', { stdio: 'pipe', cwd: path.join(__dirname, '..') });
            console.log('✅ Compilation successful!');
        } catch (error) {
            console.log('⚠️  Compilation still has issues. Running error analysis...');
            this.analyzeRemainingErrors();
        }
        
        return {
            filesProcessed: files.length,
            filesFixed: totalFixed,
            totalFixes,
            errors: this.errors.length
        };
    }
    
    // Analyze remaining compilation errors
    analyzeRemainingErrors() {
        try {
            const output = execSync('npm run build 2>&1', { encoding: 'utf8', cwd: path.join(__dirname, '..') });
            const lines = output.split('\n');
            const errorCounts = {};
            
            lines.forEach(line => {
                const match = line.match(/error (TS\d+):/);
                if (match) {
                    const errorCode = match[1];
                    errorCounts[errorCode] = (errorCounts[errorCode] || 0) + 1;
                }
            });
            
            console.log('\n📊 Remaining error breakdown:');
            Object.entries(errorCounts)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 10)
                .forEach(([code, count]) => {
                    console.log(`   ${code}: ${count} errors`);
                });
                
        } catch (error) {
            console.error('Could not analyze remaining errors:', error.message);
        }
    }
}

// Execute if called directly
if (require.main === module) {
    const recovery = new TypeScriptSyntaxRecovery();
    recovery.run().catch(console.error);
}

module.exports = TypeScriptSyntaxRecovery;