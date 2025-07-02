#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Function to fix specific patterns in TypeScript files
function fixTypeScriptFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    
    // More comprehensive pattern fixes
    
    // Fix imports
    content = content.replace(/import\s*{\s*([A-Za-z0-9_]+)\s*,?\s*([a-z])\s*\s*}\s*from/g, 'import { $1 } from');
    content = content.replace(/import\s*{\s*([A-Za-z0-9_]+)\s*}\s*from\s*'([^']+)\s*,\s*[a-z]\s*'/g, "import { $1 } from '$2'");
    
    // Fix EventEmitter patterns
    content = content.replace(/EventEmitt\s*}/g, 'EventEmitter }');
    content = content.replace(/BaseModelProvid\s*}/g, 'BaseModelProvider }');
    content = content.replace(/ModelRout\s*}/g, 'ModelRouter }');
    content = content.replace(/OllamaProvid\s*}/g, 'OllamaProvider }');
    
    // Fix type imports with multiple corrupted types
    content = content.replace(/([A-Z][A-Za-z0-9_]*),?\s*([A-Z][A-Za-z0-9_]*),?\s*([A-Z][A-Za-z0-9_]*),?\s*([A-Z][A-Za-z0-9_]*),?\s*([A-Z][A-Za-z0-9_]*)\s*}/g, '$1, $2, $3, $4, $5 }');
    
    // Fix method parameters
    content = content.replace(/\(([a-z][A-Za-z0-9_]*):\s*([a-z]),\s*([A-Z][A-Za-z0-9_<>]*)\)/g, '($1: $3)');
    content = content.replace(/\(taskContext:\s*TaskContext,?\s*criteria:\s*ModelSelectionCriteria;/g, '(taskContext: TaskContext, criteria: ModelSelectionCriteria,');
    
    // Fix property declarations
    content = content.replace(/private\s+([a-z][A-Za-z0-9_]*),\s*([A-Z][A-Za-z0-9_<>]*)/g, 'private $1: $2');
    content = content.replace(/protected\s+([a-z][A-Za-z0-9_]*),\s*([A-Z][A-Za-z0-9_<>]*)/g, 'protected $1: $2');
    content = content.replace(/public\s+([a-z][A-Za-z0-9_]*),\s*([A-Z][A-Za-z0-9_<>]*)/g, 'public $1: $2');
    
    // Fix multiple property declarations on same line
    content = content.replace(/:\s*private,\s*([a-z][A-Za-z0-9_]*):\s*([A-Z][A-Za-z0-9_<>]*)\s*:\s*private,\s*/g, '\n  private $1: $2\n  private ');
    
    // Fix constructor parameter patterns
    content = content.replace(/constructor\(confi:\s*([a-z]),\s*([A-Z][A-Za-z0-9_]*)\)/g, 'constructor(config: $2)');
    content = content.replace(/constructor\(confi,\s*g:\s*([A-Z][A-Za-z0-9_]*)\)/g, 'constructor(config: $1)');
    
    // Fix super() calls
    content = content.replace(/super\(\)\s*,/g, 'super()\n    ');
    
    // Fix method signatures
    content = content.replace(/async\s+([a-z][A-Za-z0-9_]*)\(:\s*Promise</g, 'async $1(): Promise<');
    content = content.replace(/abstract:\s*([a-z][A-Za-z0-9_]*)\(/g, 'abstract $1(');
    
    // Fix object/interface definitions
    content = content.replace(/([a-z][A-Za-z0-9_]*):\s*number([a-z][A-Za-z0-9_]*):\s*([a-z]),\s*number,/g, '$1: number\n  $2: number,');
    content = content.replace(/([a-z][A-Za-z0-9_]*):\s*boolean:\s*([a-z][A-Za-z0-9_]*),\s*string([a-z][A-Za-z0-9_]*),/g, '$1: boolean\n  $2: string,');
    
    // Fix arrow function parameters
    content = content.replace(/,\s*\(([a-z][A-Za-z0-9_]*)\)\s*=>\s*{/g, ', ($1) => {');
    
    // Fix method calls
    content = content.replace(/\.([a-z][A-Za-z0-9_]*)\(,\s*\)/g, '.$1()');
    
    // Fix if statements
    content = content.replace(/if\s*\(([^)]+)\)\s*{\s*return\s+([^}]+)}/g, 'if ($1) {\n      return $2\n    }');
    
    // Fix switch statements
    content = content.replace(/\):\s*Promise<Model,\s*Selection,\s*Result>\s*{switch/g, '): Promise<ModelSelectionResult> {\n    switch');
    
    // Fix return statements
    content = content.replace(/return\s*{\s*([a-z][A-Za-z0-9_]*):\s*([a-z][A-Za-z0-9_]*)provid/g, 'return {\n      $1: $2,\n      provider');
    content = content.replace(/([a-z][A-Za-z0-9_]*)e:\s*r([a-z][A-Za-z0-9_]*)/g, '$1er: $2');
    
    // Fix array/object patterns
    content = content.replace(/const\s+([a-z][A-Za-z0-9_]*),\s*([A-Z][A-Za-z0-9_\[\]]*)\s*=\s*\[\]/g, 'const $1: $2 = []');
    
    // Fix type annotations
    content = content.replace(/:\s*([A-Z][A-Za-z0-9_]*)\s*\|\s*null\s*}\s*=/g, ': $1 | null =');
    content = content.replace(/let\s+([a-z][A-Za-z0-9_]*),\s*string\[\]\s*=\s*\[\],/g, 'let $1: string[] = []');
    
    // Fix semicolon placements
    content = content.replace(/;(\n\s*})/g, '\n    }');
    content = content.replace(/}\s*;/g, '}');
    
    // Fix EventEmitter patterns in imports
    content = content.replace(/EventEmitt\s*}/g, 'EventEmitter }');
    
    // Clean up extra commas
    content = content.replace(/,\s*,/g, ',');
    content = content.replace(/,\s*}/g, ' }');
    content = content.replace(/,\s*\)/g, ')');
    
    // Remove "No newline at end of file" comments
    content = content.replace(/\s*No newline at end of file/g, '');
    
    // Only write if content changed
    if (content !== originalContent) {
      // Ensure file ends with newline
      if (!content.endsWith('\n')) {
        content += '\n';
      }
      fs.writeFileSync(filePath, content, 'utf8');
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Find all TypeScript files in the project
function findTypeScriptFiles(dir) {
  let results = [];
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip node_modules and other non-source directories
      if (!file.startsWith('.') && file !== 'node_modules' && file !== 'dist' && file !== 'coverage') {
        results = results.concat(findTypeScriptFiles(filePath));
      }
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      results.push(filePath);
    }
  }
  
  return results;
}

console.log('Searching for TypeScript files to fix...\n');

// Find all TypeScript files in src directory
const srcDir = path.join(process.cwd(), 'src');
const tsFiles = findTypeScriptFiles(srcDir);

console.log(`Found ${tsFiles.length} TypeScript files\n`);

let fixedCount = 0;
let errorFiles = [];

// Try to fix each file
for (const file of tsFiles) {
  process.stdout.write(`Checking ${path.relative(process.cwd(), file)}... `);
  
  // First check if file has compilation errors
  try {
    execSync(`npx tsc --noEmit ${file} 2>&1`, { stdio: 'pipe' });
    console.log('✓ OK');
  } catch (error) {
    // File has errors, try to fix
    if (fixTypeScriptFile(file)) {
      // Check again after fix
      try {
        execSync(`npx tsc --noEmit ${file} 2>&1`, { stdio: 'pipe' });
        console.log('✓ Fixed');
        fixedCount++;
      } catch (e) {
        console.log('✗ Still has errors');
        errorFiles.push(file);
      }
    } else {
      console.log('✗ Could not fix');
      errorFiles.push(file);
    }
  }
}

console.log(`\n✓ Fixed ${fixedCount} files`);

if (errorFiles.length > 0) {
  console.log(`\n⚠ ${errorFiles.length} files still have errors:`);
  errorFiles.forEach(file => {
    console.log(`  - ${path.relative(process.cwd(), file)}`);
  });
}

console.log('\nDone!');