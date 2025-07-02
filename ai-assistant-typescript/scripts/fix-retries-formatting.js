const fs = require('fs');
const path = require('path');

/**
 * Fix retries property formatting issues
 * Specifically targets the pattern where retries appears after closing braces
 */

function fixRetriesFormatting(content) {
  let modified = false;
  
  // Pattern 1: Fix retries after metadata closing brace
  // From: },\n        retries: 0\n      }
  // To: }\n      }
  const pattern1 = /},\s*\n\s*retries:\s*0\s*\n\s*}/g;
  if (content.match(pattern1)) {
    content = content.replace(pattern1, '}\n      }');
    modified = true;
  }
  
  // Pattern 2: Fix return statements with retries on wrong line
  // From: return {\n      success: false,\n      retries: 0,\n        error:
  // To: return {\n        success: false,\n        retries: 0,\n        error:
  const pattern2 = /return\s*{\s*\n\s*success:\s*(true|false),\s*\n\s*retries:\s*0,\s*\n\s*(\s*)(\w+):/g;
  if (content.match(pattern2)) {
    content = content.replace(pattern2, (match, success, spacing, property) => {
      return `return {\n        success: ${success},\n        retries: 0,\n        ${property}:`;
    });
    modified = true;
  }
  
  // Pattern 3: Fix cases where retries is indented wrong
  const lines = content.split('\n');
  const fixedLines = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    // If this line has "retries: 0" and previous line has more properties
    if (trimmed === 'retries: 0' && i > 0) {
      const prevLine = lines[i - 1];
      // Check if previous line ends with a comma (indicating more properties)
      if (prevLine.trim().endsWith(',')) {
        // Match the indentation of the previous line
        const prevIndent = prevLine.match(/^(\s*)/)[1];
        fixedLines.push(prevIndent + '  ' + trimmed + ',');
        modified = true;
        continue;
      }
    }
    
    fixedLines.push(line);
  }
  
  if (modified) {
    content = fixedLines.join('\n');
  }
  
  return { content, modified };
}

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const result = fixRetriesFormatting(content);
  
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
console.log('Fixing retries property formatting issues...\n');

const expertsDir = path.join(__dirname, '..', 'src', 'agents', 'experts');
const files = findTypeScriptFiles(expertsDir);

console.log(`Found ${files.length} TypeScript files to check\n`);

let fixedCount = 0;

for (const file of files) {
  const relativePath = path.relative(process.cwd(), file);
  process.stdout.write(`Checking ${relativePath}... `);
  
  if (processFile(file)) {
    console.log('✓ Fixed formatting');
    fixedCount++;
  } else {
    console.log('No issues found');
  }
}

console.log(`\nFixed ${fixedCount} files`);
console.log('Run "npm run typecheck" to verify the fixes');