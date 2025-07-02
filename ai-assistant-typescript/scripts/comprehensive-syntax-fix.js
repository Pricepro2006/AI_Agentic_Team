const fs = require('fs');
const path = require('path');

class ComprehensiveSyntaxFixer {
  constructor() {
    this.fixPatterns = [
      // Pattern 1: Fix leading comma in object literals
      {
        name: 'Fix leading comma in object literals',
        pattern: /:\s*\{,\s*([a-zA-Z_$][a-zA-Z0-9_$]*)/g,
        fix: ': {\n  $1'
      },
      
      // Pattern 2: Fix broken property names with embedded commas
      {
        name: 'Fix broken property names with embedded commas',
        pattern: /([a-zA-Z_$][a-zA-Z0-9_$]*),\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g,
        fix: (match, p1, p2) => {
          // If both parts are short, likely a split property name
          if (p1.length <= 8 && p2.length <= 8) {
            return `${p1}${p2}:`;
          }
          // Otherwise, it's two separate properties
          return `${p1},\n  ${p2}:`;
        }
      },
      
      // Pattern 3: Fix missing comma after property values
      {
        name: 'Fix missing comma after property values',
        pattern: /([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:\s*([^,\n}]+)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g,
        fix: '$1: $2,\n  $3:'
      },
      
      // Pattern 4: Fix concatenated property values
      {
        name: 'Fix concatenated property values',
        pattern: /([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:\s*([^,\n}]+?)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g,
        fix: (match, prop1, value1, prop2) => {
          // Check if this looks like a concatenated value
          if (value1.trim().match(/^[0-9]+[a-zA-Z_$]/)) {
            const cleanValue = value1.replace(/[a-zA-Z_$][a-zA-Z0-9_$]*$/, '').trim();
            return `${prop1}: ${cleanValue},\n  ${prop2}:`;
          }
          return match;
        }
      },
      
      // Pattern 5: Fix semicolon instead of comma in interfaces
      {
        name: 'Fix semicolon instead of comma in interfaces',
        pattern: /([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:\s*([^;]+);,\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g,
        fix: '$1: $2;\n  $3:'
      },
      
      // Pattern 6: Fix property access with embedded commas
      {
        name: 'Fix property access with embedded commas',
        pattern: /([a-zA-Z_$][a-zA-Z0-9_$]*),\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\./g,
        fix: '$1$2.'
      },
      
      // Pattern 7: Fix array/object destructuring with embedded commas
      {
        name: 'Fix destructuring with embedded commas',
        pattern: /\{\s*,\s*([a-zA-Z_$][a-zA-Z0-9_$]*)/g,
        fix: '{ $1'
      },
      
      // Pattern 8: Fix function parameter lists with leading commas
      {
        name: 'Fix function parameters with leading commas',
        pattern: /\(\s*,\s*([a-zA-Z_$][a-zA-Z0-9_$]*)/g,
        fix: '($1'
      },
      
      // Pattern 9: Fix array literals with leading commas
      {
        name: 'Fix array literals with leading commas',
        pattern: /\[\s*,\s*([^\]]+)/g,
        fix: '[$1'
      },
      
      // Pattern 10: Fix enum values with embedded commas
      {
        name: 'Fix enum values with embedded commas',
        pattern: /([A-Z_][A-Z0-9_]*)\s*=\s*'([^']*)',\s*([a-zA-Z_$][a-zA-Z0-9_$]*)/g,
        fix: "$1 = '$2'$3"
      },
      
      // Pattern 11: Fix interface property declarations
      {
        name: 'Fix interface property declarations',
        pattern: /([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:\s*([^,;]+),\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g,
        fix: '$1: $2;\n  $3:'
      },
      
      // Pattern 12: Fix type annotations with embedded commas
      {
        name: 'Fix type annotations with embedded commas',
        pattern: /:\s*([a-zA-Z_$][a-zA-Z0-9_$]*),\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*[=;]/g,
        fix: ': $1$2 ='
      },
      
      // Pattern 13: Fix import statements with embedded commas
      {
        name: 'Fix import statements with embedded commas',
        pattern: /import\s*\{\s*([^}]*),\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}/g,
        fix: (match, imports, lastImport) => {
          const cleanImports = imports.replace(/,\s*([a-zA-Z_$])/g, ', $1');
          return `import { ${cleanImports}${lastImport} }`;
        }
      },
      
      // Pattern 14: Fix generic type parameters
      {
        name: 'Fix generic type parameters',
        pattern: /<\s*,\s*([a-zA-Z_$][a-zA-Z0-9_$]*)/g,
        fix: '<$1'
      },
      
      // Pattern 15: Fix method calls with embedded commas
      {
        name: 'Fix method calls with embedded commas',
        pattern: /\.([a-zA-Z_$][a-zA-Z0-9_$]*),\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g,
        fix: '.$1$2('
      }
    ];
    
    this.statistics = {
      filesProcessed: 0,
      totalFixes: 0,
      fixesByPattern: new Map()
    };
  }

  async fixFile(filePath) {
    try {
      const content = await fs.promises.readFile(filePath, 'utf8');
      let modifiedContent = content;
      let fileFixCount = 0;

      for (const fixPattern of this.fixPatterns) {
        const beforeLength = modifiedContent.length;
        
        if (typeof fixPattern.fix === 'function') {
          modifiedContent = modifiedContent.replace(fixPattern.pattern, fixPattern.fix);
        } else {
          modifiedContent = modifiedContent.replace(fixPattern.pattern, fixPattern.fix);
        }
        
        const afterLength = modifiedContent.length;
        const fixesApplied = (content.match(fixPattern.pattern) || []).length;
        
        if (fixesApplied > 0) {
          fileFixCount += fixesApplied;
          this.statistics.fixesByPattern.set(
            fixPattern.name, 
            (this.statistics.fixesByPattern.get(fixPattern.name) || 0) + fixesApplied
          );
          
          console.log(`  ${fixPattern.name}: ${fixesApplied} fixes`);
        }
      }

      if (fileFixCount > 0) {
        await fs.promises.writeFile(filePath, modifiedContent, 'utf8');
        console.log(`Fixed ${fileFixCount} syntax issues in ${filePath}`);
        this.statistics.totalFixes += fileFixCount;
      }

      this.statistics.filesProcessed++;
      return fileFixCount;
    } catch (error) {
      console.error(`Error processing ${filePath}:`, error.message);
      return 0;
    }
  }

  async processDirectory(dirPath) {
    const entries = await fs.promises.readdir(dirPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      
      if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
        await this.processDirectory(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.ts')) {
        await this.fixFile(fullPath);
      }
    }
  }

  printStatistics() {
    console.log('\n=== Comprehensive Syntax Fix Statistics ===');
    console.log(`Files processed: ${this.statistics.filesProcessed}`);
    console.log(`Total fixes applied: ${this.statistics.totalFixes}`);
    console.log('\nFixes by pattern:');
    
    for (const [pattern, count] of this.statistics.fixesByPattern.entries()) {
      console.log(`  ${pattern}: ${count}`);
    }
  }
}

async function main() {
  const fixer = new ComprehensiveSyntaxFixer();
  const srcPath = path.join(__dirname, '../src');
  
  console.log('Starting comprehensive syntax fix...');
  console.log(`Processing directory: ${srcPath}`);
  
  await fixer.processDirectory(srcPath);
  fixer.printStatistics();
  
  console.log('\nComprehensive syntax fix completed!');
}

if (require.main === module) {
  main().catch(console.error);
}