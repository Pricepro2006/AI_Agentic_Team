#!/usr/bin/env node

/**
 * Fix Object Literal Syntax Errors
 * 
 * Targeted fix for TS1005 errors caused by missing commas in object literals
 * and malformed property syntax introduced by previous automated fixes.
 */

const fs = require('fs');
const path = require('path');

class ObjectLiteralSyntaxFixer {
  constructor() {
    this.totalFixed = 0;
    this.filesProcessed = 0;
    this.patterns = [
      // Pattern 1: Missing comma between object properties on same line
      {
        name: 'Missing commas between properties',
        pattern: /(\w+:\s*[^,}\n]+)(\w+:)/g,
        fix: '$1, $2'
      },
      
      // Pattern 2: Missing comma after property before next property
      {
        name: 'Missing comma after property value',
        pattern: /(\w+:\s*(?:[^,}\n]+|'[^']*'|"[^"]*"))\s*(\w+\s*:)/g,
        fix: '$1, $2'
      },
      
      // Pattern 3: Missing comma after numeric/boolean values
      {
        name: 'Missing comma after numeric/boolean values',
        pattern: /(\w+:\s*(?:\d+|true|false|null|undefined))\s*(\w+\s*:)/g,
        fix: '$1, $2'
      },
      
      // Pattern 4: Missing comma after string values
      {
        name: 'Missing comma after string values',
        pattern: /(\w+:\s*'[^']*')\s*(\w+\s*:)/g,
        fix: '$1, $2'
      },
      
      // Pattern 5: Missing comma after array values
      {
        name: 'Missing comma after array values',
        pattern: /(\w+:\s*\[[^\]]*\])\s*(\w+\s*:)/g,
        fix: '$1, $2'
      },
      
      // Pattern 6: Fix malformed function parameter syntax
      {
        name: 'Fix malformed function parameters',
        pattern: /(\w+:\s*[^,}\n]+)\s*(\w+\s*\([^)]*\))/g,
        fix: '$1, $2'
      },
      
      // Pattern 7: Fix consecutive property declarations without commas
      {
        name: 'Fix consecutive properties',
        pattern: /(\w+:\s*(?:[^,}\n]+|{[^}]*}))\s+(\w+:)/g,
        fix: '$1, $2'
      }
    ];
  }

  fixFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let fileFixed = 0;
    const originalContent = content;

    // Apply all patterns iteratively until no more changes
    let changed = true;
    let iterations = 0;
    const maxIterations = 10;

    while (changed && iterations < maxIterations) {
      changed = false;
      iterations++;

      for (const pattern of this.patterns) {
        const beforeLength = content.length;
        content = content.replace(pattern.pattern, pattern.fix);
        
        if (content.length !== beforeLength) {
          const matches = (originalContent.match(pattern.pattern) || []).length;
          fileFixed += matches;
          changed = true;
        }
      }
    }

    // Additional specific fixes for identified error patterns
    
    // Fix missing comma after object literals
    content = content.replace(
      /(\w+:\s*{[^}]*})\s*(\w+\s*:)/g,
      '$1, $2'
    );

    // Fix missing comma after array literals
    content = content.replace(
      /(\w+:\s*\[[^\]]*\])\s*(\w+\s*:)/g,
      '$1, $2'
    );

    // Fix property declaration syntax
    content = content.replace(
      /(\w+)(\w+:)/g,
      (match, p1, p2) => {
        // Only fix if it looks like missing comma between properties
        if (p1.match(/^(true|false|\d+|'[^']*'|"[^"]*")$/)) {
          return p1 + ', ' + p2;
        }
        return match;
      }
    );

    // Fix cases where property name is directly adjacent to value
    content = content.replace(
      /(\w+):\s*([^,}\n]+)(\w+):/g,
      '$1: $2, $3:'
    );

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content);
      this.totalFixed += fileFixed;
      this.filesProcessed++;
      console.log(`Fixed ${fileFixed} syntax issues in ${path.relative(process.cwd(), filePath)}`);
      return true;
    }

    return false;
  }

  async processDirectory(dirPath) {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);

      if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
        await this.processDirectory(fullPath);
      } else if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx'))) {
        try {
          this.fixFile(fullPath);
        } catch (error) {
          console.error(`Error processing ${fullPath}:`, error.message);
        }
      }
    }
  }

  async run() {
    console.log('🔧 Starting Object Literal Syntax Fix...\n');

    const srcPath = path.join(__dirname, '..', 'src');
    
    if (!fs.existsSync(srcPath)) {
      console.error('❌ Source directory not found:', srcPath);
      process.exit(1);
    }

    await this.processDirectory(srcPath);

    console.log('\n📊 Fix Summary:');
    console.log(`   Files processed: ${this.filesProcessed}`);
    console.log(`   Total syntax issues fixed: ${this.totalFixed}`);
    console.log('\n✅ Object literal syntax fix complete!');
  }
}

// Run the fixer
const fixer = new ObjectLiteralSyntaxFixer();
fixer.run().catch(error => {
  console.error('❌ Script failed:', error);
  process.exit(1);
});