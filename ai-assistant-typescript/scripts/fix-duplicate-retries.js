const fs = require('fs');
const path = require('path');

/**
 * Fix duplicate retries properties in return statements
 */

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Pattern to find duplicate retries properties
  // This regex looks for patterns where retries appears twice in the same object
  const duplicateRetriesPattern = /(\{[^}]*retries:\s*0[^}]*),\s*retries:\s*0([^}]*\})/g;
  
  if (content.match(duplicateRetriesPattern)) {
    content = content.replace(duplicateRetriesPattern, '$1$2');
    modified = true;
  }
  
  // Another pattern for multiline duplicates
  const multilineDuplicatePattern = /return\s*\{([^}]+)retries:\s*0,([^}]+)retries:\s*0([^}]*)\}/gs;
  
  if (content.match(multilineDuplicatePattern)) {
    content = content.replace(multilineDuplicatePattern, (match, before, middle, after) => {
      return `return {${before}retries: 0,${middle}${after}}`;
    });
    modified = true;
  }
  
  if (modified) {
    fs.writeFileSync(filePath, content);
    return true;
  }
  
  return false;
}

function findTypeScriptFiles(dir) {
  const files = [];
  
  function walk(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        walk(fullPath);
      } else if (stat.isFile() && item.endsWith('.ts') && !item.endsWith('.test.ts')) {
        files.push(fullPath);
      }
    }
  }
  
  walk(dir);
  return files;
}

// Main execution
console.log('Fixing duplicate retries properties...\n');

const agentsDir = path.join(__dirname, '..', 'src', 'agents');
const files = findTypeScriptFiles(agentsDir);

console.log(`Found ${files.length} TypeScript files to check\n`);

let fixedCount = 0;

for (const file of files) {
  const relativePath = path.relative(process.cwd(), file);
  process.stdout.write(`Checking ${relativePath}... `);
  
  if (processFile(file)) {
    console.log('✓ Fixed duplicates');
    fixedCount++;
  } else {
    console.log('No duplicates found');
  }
}

console.log(`\nFixed ${fixedCount} files`);
console.log('Run "npm run typecheck" to verify the fixes');