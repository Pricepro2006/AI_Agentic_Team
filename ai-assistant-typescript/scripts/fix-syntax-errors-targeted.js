#!/usr/bin/env node

/**
 * Targeted Syntax Error Fix Script
 * Fixes specific syntax error patterns introduced by previous automated fixes
 */

const fs = require('fs');
const path = require('path');

// Comprehensive syntax fix patterns
const syntaxFixes = [
  // Pattern 1: Fix malformed object property declarations (e.g., "property: value, nextProperty:" → "property: value, nextProperty:")
  {
    name: 'Fix malformed object properties with trailing commas',
    pattern: /(\w+):\s*([^,}\n]+),(\s*)(\w+):/g,
    fix: '$1: $2,$3$4:'
  },

  // Pattern 2: Fix object destructuring with embedded commas (e.g., "{ name:, value }" → "{ name, value }")
  {
    name: 'Fix object destructuring with embedded commas',
    pattern: /(\w+):\s*,\s*(\w+)/g,
    fix: '$1, $2'
  },

  // Pattern 3: Fix malformed property assignments with semicolons and commas (e.g., "prop: value;, next:" → "prop: value, next:")
  {
    name: 'Fix property assignments with semicolons and commas',
    pattern: /(\w+):\s*([^;}\n]+);,\s*(\w+):/g,
    fix: '$1: $2, $3:'
  },

  // Pattern 4: Fix leading commas in object literals (e.g., ", property:" → "property:")
  {
    name: 'Fix leading commas in object literals',
    pattern: /^\s*,\s*(\w+):/gm,
    fix: '$1:'
  },

  // Pattern 5: Fix missing commas between properties on same line (specifically for the patterns I saw)
  {
    name: 'Fix missing commas between properties',
    pattern: /(\w+):\s*([^,}\n\[]+)(\s+)(\w+):\s*(?=\[|{|'|"|[a-zA-Z])/g,
    fix: '$1: $2,$3$4:'
  },

  // Pattern 6: Fix embedded commas in property values (e.g., "embeddingModel: 'mistra, l:latest'" → "embeddingModel: 'mistral:latest'")
  {
    name: 'Fix embedded commas in string values',
    pattern: /(embeddingModel):\s*'([^']*),\s*([^']*)'/g,
    fix: "$1: '$2$3'"
  },

  // Pattern 7: Fix malformed property syntax with commas before colons
  {
    name: 'Fix commas before colons in properties',
    pattern: /(\w+),\s*:\s*/g,
    fix: '$1: '
  },

  // Pattern 8: Fix double commas
  {
    name: 'Fix double commas',
    pattern: /,,+/g,
    fix: ','
  },

  // Pattern 9: Fix space-comma-space patterns in property names (e.g., "nam, e:" → "name:")
  {
    name: 'Fix space-comma-space in property names',
    pattern: /(\w+),\s*(\w+):/g,
    fix: (match, p1, p2) => {
      // Check if this looks like a split property name
      if (p1.length <= 3 && p2.length <= 3) {
        return `${p1}${p2}:`;
      }
      return `${p1}, ${p2}:`;
    }
  },

  // Pattern 10: Fix malformed array/object property combinations
  {
    name: 'Fix array/object property combinations',
    pattern: /(\w+):\s*(\[[^\]]+\]),\s*(\w+):\s*(\[[^\]]+\])\s*(\w+):\s*/g,
    fix: '$1: $2, $3: $4, $5:'
  },

  // Pattern 11: Fix specific patterns seen in the files
  {
    name: 'Fix specific malformed patterns',
    pattern: /(domain):\s*'([^']*)',\s*(\w+):\s*\[/g,
    fix: '$1: \'$2\', $3: ['
  }
];

function fixSyntaxErrors() {
  console.log('🔧 Starting targeted syntax error fixes...');
  
  const srcDir = path.join(__dirname, '..', 'src');
  let totalFiles = 0;
  let totalFixes = 0;

  function processFile(filePath) {
    if (!filePath.endsWith('.ts') && !filePath.endsWith('.js')) return;
    
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      let newContent = content;
      let fileFixes = 0;

      // Apply each syntax fix pattern
      for (const fix of syntaxFixes) {
        const beforeLength = newContent.length;
        
        if (typeof fix.fix === 'function') {
          newContent = newContent.replace(fix.pattern, fix.fix);
        } else {
          newContent = newContent.replace(fix.pattern, fix.fix);
        }
        
        const afterLength = newContent.length;
        if (beforeLength !== afterLength) {
          const matches = (content.match(fix.pattern) || []).length;
          if (matches > 0) {
            console.log(`  ✅ ${fix.name}: ${matches} fixes in ${path.relative(srcDir, filePath)}`);
            fileFixes += matches;
          }
        }
      }

      // Write file if changes were made
      if (fileFixes > 0) {
        fs.writeFileSync(filePath, newContent);
        totalFiles++;
        totalFixes += fileFixes;
        console.log(`📁 Fixed ${fileFixes} syntax errors in ${path.relative(srcDir, filePath)}`);
      }

    } catch (error) {
      console.error(`❌ Error processing ${filePath}:`, error.message);
    }
  }

  function processDirectory(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        processDirectory(fullPath);
      } else if (entry.isFile()) {
        processFile(fullPath);
      }
    }
  }

  processDirectory(srcDir);

  console.log('\n📊 Syntax Fix Summary:');
  console.log(`   Files processed: ${totalFiles}`);
  console.log(`   Total fixes: ${totalFixes}`);
  console.log('   ✅ Targeted syntax fixes completed!');

  return { files: totalFiles, fixes: totalFixes };
}

// Run the fix
if (require.main === module) {
  fixSyntaxErrors();
}

module.exports = { fixSyntaxErrors };