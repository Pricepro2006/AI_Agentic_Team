const fs = require('fs');
const path = require('path');

/**
 * Fix TS1117 errors - duplicate properties in object literals
 * More comprehensive fix for all duplicate properties
 */

function removeDuplicateProperties(content) {
  let modified = false;
  const lines = content.split('\n');
  const processedLines = [];
  
  let inObjectLiteral = false;
  let objectDepth = 0;
  let seenProperties = new Set();
  let currentObject = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();
    
    // Track object literal depth
    const openBraces = (line.match(/\{/g) || []).length;
    const closeBraces = (line.match(/\}/g) || []).length;
    
    if (trimmedLine.includes('return {') || trimmedLine.match(/=\s*{/) || trimmedLine === '{') {
      inObjectLiteral = true;
      objectDepth += openBraces;
      seenProperties.clear();
      currentObject = [line];
    } else if (inObjectLiteral) {
      objectDepth += openBraces - closeBraces;
      
      // Check for property definition
      const propertyMatch = trimmedLine.match(/^(\w+):\s*/);
      if (propertyMatch) {
        const propertyName = propertyMatch[1];
        
        if (seenProperties.has(propertyName)) {
          // Skip duplicate property
          modified = true;
          console.log(`  Removing duplicate property: ${propertyName}`);
          continue;
        } else {
          seenProperties.add(propertyName);
          currentObject.push(line);
        }
      } else {
        currentObject.push(line);
      }
      
      if (objectDepth <= 0) {
        inObjectLiteral = false;
        processedLines.push(...currentObject);
        currentObject = [];
      }
    } else {
      processedLines.push(line);
    }
  }
  
  // Add any remaining lines
  if (currentObject.length > 0) {
    processedLines.push(...currentObject);
  }
  
  return {
    content: processedLines.join('\n'),
    modified
  };
}

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const result = removeDuplicateProperties(content);
  
  if (result.modified) {
    fs.writeFileSync(filePath, result.content);
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
console.log('Fixing TS1117 errors (duplicate properties in object literals)...\n');

const expertsDir = path.join(__dirname, '..', 'src', 'agents', 'experts');
const files = findTypeScriptFiles(expertsDir);

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