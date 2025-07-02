#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Function to fix corrupted TypeScript files
function fixCorruptedFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    
    // Pattern fixes based on observed corruption patterns
    // Fix: "import { Something, e  }" -> "import { Something }"
    content = content.replace(/import\s*{\s*([A-Za-z0-9_]+)\s*,\s*[a-z]\s*\s*}/g, 'import { $1 }');
    
    // Fix: "from './something, e  '" -> "from './something'"
    content = content.replace(/from\s*'([^']+)\s*,\s*[a-z]\s*\s*'/g, "from '$1'");
    
    // Fix: "something: type, something" -> "something: type\n  something"
    content = content.replace(/:\s*([A-Za-z0-9_\[\]<>]+)([a-z]+):\s*([a-z]+),\s*([A-Za-z0-9_\[\]<>]+)/g, ': $1\n  $2: $3$4');
    
    // Fix: "private: field, Type" -> "private field: Type"
    content = content.replace(/private:\s*([a-z][A-Za-z0-9_]*),\s*([A-Z][A-Za-z0-9_<>]*)/g, 'private $1: $2');
    
    // Fix: "constructor(param: a, Type)" -> "constructor(param: Type)"
    content = content.replace(/\(([a-z][A-Za-z0-9_]*):\s*[a-z],\s*([A-Z][A-Za-z0-9_<>]*)\)/g, '($1: $2)');
    
    // Fix: "...args: s, any[]" -> "...args: any[]"
    content = content.replace(/\.\.\.([a-z][A-Za-z0-9_]*):\s*[a-z],\s*(any\[\])/g, '...$1: $2');
    
    // Fix multiple patterns in one line
    content = content.replace(/([A-Za-z0-9_]+),\s*([A-Za-z0-9_]+),\s*([A-Za-z0-9_]+),\s*([A-Za-z0-9_]+),\s*([A-Za-z0-9_]+)\s*}/g, '$1, $2, $3, $4, $5 }');
    
    // Fix: "something: Type: something" -> "something: Type\n  something"
    content = content.replace(/([a-z][A-Za-z0-9_]*):\s*([A-Z][A-Za-z0-9_<>]*)\s*:\s*([a-z])/g, '$1: $2\n  $3');
    
    // Fix: "Type<Param1Param2Param3>" -> "Type<Param1, Param2, Param3>"
    content = content.replace(/([A-Z][A-Za-z0-9_]*)<([A-Z][A-Za-z0-9_]*)([A-Z][A-Za-z0-9_]*)([A-Z][A-Za-z0-9_]*)>/g, '$1<$2, $3, $4>');
    
    // Fix: "throw: new Error" -> "throw new Error"
    content = content.replace(/throw:\s*new/g, 'throw new');
    
    // Fix: "const: something" -> "const something"
    content = content.replace(/const:\s*([a-z])/g, 'const $1');
    
    // Fix: ".method(,)" -> ".method()"
    content = content.replace(/\(\s*,\s*\)/g, '()');
    
    // Fix: "super()," -> "super()"
    content = content.replace(/super\(\)\s*,/g, 'super()');
    
    // Fix spacing issues
    content = content.replace(/([a-z])\s*,\s*([a-z])\s*:/g, '$1$2:');
    content = content.replace(/}\s*;\s*([a-z])/g, '}\n  $1');
    
    // Fix: "if (condition) {return something}" -> proper formatting
    content = content.replace(/if\s*\(([^)]+)\)\s*{return\s+([^}]+)}/g, 'if ($1) {\n      return $2\n    }');
    
    // Only write if content changed
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Fixed: ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Files to fix
const filesToFix = [
  'src/infrastructure/model-providers/ProviderManager.ts',
  'src/infrastructure/model-providers/ModelRouter.ts',
  'src/infrastructure/model-providers/OllamaProvider.ts',
  'src/infrastructure/model-providers/BaseModelProvider.ts'
];

console.log('Fixing corrupted TypeScript files...\n');

let fixedCount = 0;
filesToFix.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    if (fixCorruptedFile(filePath)) {
      fixedCount++;
    }
  } else {
    console.log(`File not found: ${filePath}`);
  }
});

console.log(`\n✓ Fixed ${fixedCount} files`);