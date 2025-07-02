#!/usr/bin/env node

/**
 * Comprehensive Object Syntax Recovery Script
 * 
 * This script addresses the cascading syntax errors caused by previous automated fixes.
 * It focuses on restoring proper object literal syntax, property declarations, and commas.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class ObjectSyntaxRestorer {
  constructor() {
    this.srcDir = '/home/pricepro2006/iems_project/ehas_project/ai_assistant/ai-assistant-typescript/src';
    this.fixedFiles = 0;
    this.totalFixes = 0;
    this.errorPatterns = [];
    this.patterns = [
      // Pattern 1: Fix leading comma in object literals
      {
        name: 'Fix leading comma in object literals',
        pattern: /:\s*\{,\s*([a-zA-Z_$][a-zA-Z0-9_$]*)/g,
        fix: ': {\n  $1'
      },
      
      // Pattern 2: Fix broken property names with commas
      {
        name: 'Fix broken property names with embedded commas',
        pattern: /([a-zA-Z_$][a-zA-Z0-9_$]*),\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g,
        fix: (match, p1, p2) => {
          // If this looks like a broken property name, rejoin it
          if (p1.length <= 8 && p2.length <= 8) {
            return `${p1}${p2}:`;
          }
          // Otherwise, it's probably two separate properties
          return `${p1},\n  ${p2}:`;
        }
      },
      
      // Pattern 3: Fix missing commas between properties
      {
        name: 'Fix missing commas between object properties',
        pattern: /([a-zA-Z_$][a-zA-Z0-9_$]*\s*:\s*[^,}\n]+)\s+([a-zA-Z_$][a-zA-Z0-9_$]*\s*:)/g,
        fix: '$1,\n  $2'
      },
      
      // Pattern 4: Fix concatenated property values
      {
        name: 'Fix concatenated property values',
        pattern: /:\s*(\d+|true|false|null)([a-zA-Z_$][a-zA-Z0-9_$]*)/g,
        fix: ': $1,\n  $2'
      },
      
      // Pattern 5: Fix property access with embedded commas
      {
        name: 'Fix property access with embedded commas',
        pattern: /([a-zA-Z_$][a-zA-Z0-9_$]*),\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\./g,
        fix: '$1$2.'
      },
      
      // Pattern 6: Fix method calls with embedded commas
      {
        name: 'Fix method calls with embedded commas',
        pattern: /([a-zA-Z_$][a-zA-Z0-9_$]*),\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g,
        fix: '$1$2('
      },
      
      // Pattern 7: Fix variable names with embedded commas
      {
        name: 'Fix variable names with embedded commas',
        pattern: /\b([a-zA-Z_$][a-zA-Z0-9_$]*),\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=/g,
        fix: '$1$2 ='
      },
      
      // Pattern 8: Fix function parameters with embedded commas in names
      {
        name: 'Fix function parameters with embedded commas',
        pattern: /\(([a-zA-Z_$][a-zA-Z0-9_$]*),\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g,
        fix: '($1$2:'
      },
      
      // Pattern 9: Fix object destructuring with embedded commas
      {
        name: 'Fix object destructuring',
        pattern: /\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*),\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}/g,
        fix: (match, p1, p2) => {
          // Check if this looks like a split identifier
          if (p1.length <= 8 && p2.length <= 8 && 
              (p1 + p2).length <= 15) {
            return `{ ${p1}${p2} }`;
          }
          return `{ ${p1}, ${p2} }`;
        }
      },
      
      // Pattern 10: Fix type annotations with embedded commas
      {
        name: 'Fix type annotations',
        pattern: /:\s*([a-zA-Z_$][a-zA-Z0-9_$]*),\s*([a-zA-Z_$][a-zA-Z0-9_$]*)<([^>]+)>/g,
        fix: ': $1$2<$3>'
      },
      
      // Pattern 11: Fix import statements with embedded commas
      {
        name: 'Fix import statements',
        pattern: /import\s*\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*),\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}/g,
        fix: (match, p1, p2) => {
          // If this looks like a split import name
          if (p1.length <= 8 && p2.length <= 8) {
            return `import { ${p1}${p2} }`;
          }
          return `import { ${p1}, ${p2} }`;
        }
      },
      
      // Pattern 12: Fix trailing property syntax
      {
        name: 'Fix trailing property syntax',
        pattern: /([a-zA-Z_$][a-zA-Z0-9_$]*\s*:\s*[^,}\n]+)\s*,\s*\}/g,
        fix: '$1\n}'
      },
      
      // Pattern 13: Fix broken string literals with commas
      {
        name: 'Fix broken string literals',
        pattern: /'([^']*),\s*([^']*)'(?!\s*[,}\]])/g,
        fix: "'$1$2'"
      },
      
      // Pattern 14: Fix array elements with embedded commas
      {
        name: 'Fix array elements',
        pattern: /\[\s*'([^']*)',\s*([^']*)'(?!\s*[,\]])/g,
        fix: "['$1$2'"
      },
      
      // Pattern 15: Fix trailing commas and closing braces
      {
        name: 'Fix trailing commas before closing braces',
        pattern: /,(\s*)\}/g,
        fix: '$1}'
      }
    ];
  }

  async restoreObjectSyntax() {
    console.log('🔧 Starting comprehensive object syntax restoration...');
    
    try {
      // Get all TypeScript files
      const files = await this.getAllTypeScriptFiles();
      console.log(`📁 Found ${files.length} TypeScript files to process`);
      
      // Process each file
      for (const file of files) {
        await this.processFile(file);
      }
      
      console.log('\n✅ Object syntax restoration completed!');
      console.log(`📊 Summary:`);
      console.log(`   - Files processed: ${files.length}`);
      console.log(`   - Files fixed: ${this.fixedFiles}`);
      console.log(`   - Total fixes applied: ${this.totalFixes}`);
      
      if (this.errorPatterns.length > 0) {
        console.log('\n⚠️  Unhandled patterns found:');
        this.errorPatterns.slice(0, 10).forEach(pattern => {
          console.log(`   - ${pattern}`);
        });
      }
      
    } catch (error) {
      console.error('❌ Error during object syntax restoration:', error.message);
      throw error;
    }
  }

  async getAllTypeScriptFiles() {
    const files = [];
    
    const scanDirectory = (dir) => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
          scanDirectory(fullPath);
        } else if (entry.isFile() && fullPath.endsWith('.ts') && !fullPath.endsWith('.d.ts')) {
          files.push(fullPath);
        }
      }
    };
    
    scanDirectory(this.srcDir);
    return files;
  }

  async processFile(filePath) {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;
      let fileFixed = false;
      let fileFixes = 0;
      
      // Apply each pattern
      for (const pattern of this.patterns) {
        const beforeCount = (content.match(pattern.pattern) || []).length;
        
        if (beforeCount > 0) {
          if (typeof pattern.fix === 'function') {
            content = content.replace(pattern.pattern, pattern.fix);
          } else {
            content = content.replace(pattern.pattern, pattern.fix);
          }
          
          const afterCount = (content.match(pattern.pattern) || []).length;
          const fixCount = beforeCount - afterCount;
          
          if (fixCount > 0) {
            fileFixes += fixCount;
            fileFixed = true;
            console.log(`   ${pattern.name}: ${fixCount} fixes`);
          }
        }
      }
      
      // Check for remaining problematic patterns
      this.checkForRemainingPatterns(content, filePath);
      
      // Write back if changes were made
      if (fileFixed && content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        this.fixedFiles++;
        this.totalFixes += fileFixes;
        
        const relativePath = path.relative(this.srcDir, filePath);
        console.log(`🔧 Fixed ${relativePath} (${fileFixes} fixes)`);
      }
      
    } catch (error) {
      console.error(`❌ Error processing ${filePath}:`, error.message);
    }
  }

  checkForRemainingPatterns(content, filePath) {
    // Check for remaining problematic patterns that might need manual attention
    const problematicPatterns = [
      /\{,\s*[a-zA-Z]/g,  // Leading commas in objects
      /[a-zA-Z],\s*[a-zA-Z]\s*:/g,  // Comma in property names
      /:\s*[^,}\n]+[a-zA-Z_$][a-zA-Z0-9_$]*:/g,  // Missing commas between properties
    ];
    
    for (const pattern of problematicPatterns) {
      const matches = content.match(pattern);
      if (matches) {
        matches.slice(0, 3).forEach(match => {
          this.errorPatterns.push(`${path.relative(this.srcDir, filePath)}: ${match}`);
        });
      }
    }
  }

  // Add method to validate syntax after fixes
  async validateSyntax() {
    console.log('\n🔍 Validating TypeScript syntax...');
    
    try {
      // Try to compile to check for syntax errors
      const result = execSync('cd /home/pricepro2006/iems_project/ehas_project/ai_assistant/ai-assistant-typescript && npx tsc --noEmit --skipLibCheck 2>&1', { 
        encoding: 'utf8',
        timeout: 60000 
      });
      
      console.log('✅ TypeScript syntax validation passed!');
      return true;
      
    } catch (error) {
      const output = error.stdout || error.message;
      const errorLines = output.split('\n').filter(line => line.includes('error TS'));
      
      console.log(`⚠️  TypeScript validation found ${errorLines.length} errors`);
      
      // Show first 20 errors
      if (errorLines.length > 0) {
        console.log('\nFirst 20 errors:');
        errorLines.slice(0, 20).forEach(line => {
          console.log(`   ${line}`);
        });
      }
      
      return false;
    }
  }
}

// Run the script
async function main() {
  const restorer = new ObjectSyntaxRestorer();
  
  try {
    await restorer.restoreObjectSyntax();
    await restorer.validateSyntax();
    
  } catch (error) {
    console.error('❌ Script failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { ObjectSyntaxRestorer };