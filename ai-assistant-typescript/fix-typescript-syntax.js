#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Common syntax error patterns and their fixes
const syntaxFixes = [
  // Fix malformed import statements
  {
    pattern: /import { ([^}]+)([^}]+) } from/g,
    replacement: 'import { $1 } from'
  },
  
  // Fix missing commas in object literals
  {
    pattern: /(\w+): ([^,\n}]+)(\n\s*\w+):/g,
    replacement: '$1: $2,$3:'
  },
  
  // Fix malformed template literals
  {
    pattern: /\$\{([^}]+)\}\'/g,
    replacement: '${$1}\''
  },
  
  // Fix semicolon issues in object properties
  {
    pattern: /(\w+): ([^,\n}]+);/g,
    replacement: '$1: $2,'
  },
  
  // Fix malformed function parameters
  {
    pattern: /\((\w+): (\w+)([^,)]+): (\w+)\)/g,
    replacement: '($1: $2, $3: $4)'
  },
  
  // Fix malformed enum values
  {
    pattern: /(\w+) = '([^']+)'(\w+) = '([^']+)'/g,
    replacement: '$1 = \'$2\',\n  $3 = \'$4\''
  },
  
  // Fix missing commas in arrays and objects
  {
    pattern: /(\w+|\d+)(\s+)(\w+|\d+):/g,
    replacement: '$1,$2$3:'
  },
  
  // Fix malformed return statements
  {
    pattern: /return\s*:\s*([^;]+)/g,
    replacement: 'return $1'
  }
];

function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    let fixesApplied = 0;

    // Apply all syntax fixes
    for (const fix of syntaxFixes) {
      const matches = content.match(fix.pattern);
      if (matches) {
        content = content.replace(fix.pattern, fix.replacement);
        fixesApplied += matches.length;
      }
    }

    // Additional specific fixes for common TypeScript patterns
    
    // Fix template literal errors
    content = content.replace(/\$\{([^}]+)\}([^'"`\n}]+)/g, '${$1}');
    
    // Fix object property syntax
    content = content.replace(/(\w+):\s*([^,\n}]+)\s*;/g, '$1: $2,');
    
    // Fix import statement errors
    content = content.replace(/import\s*{\s*([^}]+)\s*([^}]+)\s*}\s*from/g, 'import { $1 } from');
    
    // Fix interface property syntax
    content = content.replace(/(\w+):\s*([^,\n}]+)\s*\n\s*(\w+):/g, '$1: $2;\n  $3:');
    
    // Fix enum syntax
    content = content.replace(/(\w+)\s*=\s*'([^']+)'(\w+)\s*=/g, '$1 = \'$2\',\n  $3 =');

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content);
      console.log(`Fixed ${fixesApplied} syntax errors in ${filePath}`);
      return fixesApplied;
    }
    
    return 0;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return 0;
  }
}

function main() {
  console.log('Starting systematic TypeScript syntax fixes...');
  
  // Find all TypeScript files
  const files = glob.sync('src/**/*.ts', { 
    ignore: ['node_modules/**', 'dist/**', '**/*.d.ts'] 
  });
  
  let totalFixes = 0;
  let filesFixed = 0;

  for (const file of files) {
    const fixes = fixFile(file);
    if (fixes > 0) {
      totalFixes += fixes;
      filesFixed++;
    }
  }

  console.log(`\nSyntax fix summary:`);
  console.log(`- Files processed: ${files.length}`);
  console.log(`- Files fixed: ${filesFixed}`);
  console.log(`- Total fixes applied: ${totalFixes}`);
  
  console.log('\nRunning TypeScript compilation to check progress...');
  
  const { exec } = require('child_process');
  exec('npm run type-check', (error, stdout, stderr) => {
    if (error) {
      const errorLines = stderr.split('\n').filter(line => line.includes('error TS'));
      console.log(`Remaining TypeScript errors: ${errorLines.length}`);
      
      if (errorLines.length < 100) {
        console.log('\nRemaining errors (sample):');
        errorLines.slice(0, 10).forEach(line => console.log(line));
      }
    } else {
      console.log('🎉 All TypeScript errors fixed!');
    }
  });
}

if (require.main === module) {
  main();
}