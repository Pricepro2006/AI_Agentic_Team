const fs = require('fs');
const path = require('path');

/**
 * Apply critical fixes to TypeScript files
 * This focuses on the most important structural issues
 */

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Fix 1: Add retries: 0 to all ToolExecutionResult returns
  const retriesPattern1 = /return\s*{\s*success:\s*(true|false),/g;
  if (content.match(retriesPattern1)) {
    content = content.replace(retriesPattern1, 'return {\n      success: $1,\n      retries: 0,');
    modified = true;
  }
  
  // Fix 2: Add retries to inline returns
  const retriesPattern2 = /{\s*success:\s*(true|false),\s*data:/g;
  if (content.match(retriesPattern2)) {
    content = content.replace(retriesPattern2, '{ success: $1, retries: 0, data:');
    modified = true;
  }
  
  const retriesPattern3 = /{\s*success:\s*(true|false),\s*error:/g;
  if (content.match(retriesPattern3)) {
    content = content.replace(retriesPattern3, '{ success: $1, retries: 0, error:');
    modified = true;
  }
  
  // Fix 3: Add modelPreferences if missing in agent configs
  if (filePath.includes('/experts/') && content.includes('buildAgentConfig')) {
    const hasModelPreferences = content.includes('modelPreferences:');
    if (!hasModelPreferences) {
      // Find the closing of the config object and add modelPreferences before it
      const configPattern = /(metadata:\s*{[^}]*}\s*)(}\s*}\s*$)/m;
      if (content.match(configPattern)) {
        content = content.replace(configPattern, '$1,\n      modelPreferences: {\n        preferMultiModel: true,\n        fallbackToLegacy: true\n      }\n    $2');
        modified = true;
      }
    }
  }
  
  // Fix 4: Add metadata to model configs that are missing it
  const modelConfigPattern = /(specialties:\s*\[[^\]]*\])(\s*})/g;
  const matches = content.matchAll(modelConfigPattern);
  for (const match of matches) {
    if (!match[0].includes('metadata:')) {
      const replacement = `${match[1]},\n            metadata: {}${match[2]}`;
      content = content.replace(match[0], replacement);
      modified = true;
    }
  }
  
  // Fix 5: Import getErrorMessage if using error.message
  if (content.includes('error.message') || content.includes('${error}')) {
    if (!content.includes('getErrorMessage')) {
      // Add import at the top of the file
      const importLine = "import { getErrorMessage } from '../../utils/error.utils'\n";
      if (content.startsWith('import')) {
        // Add after the last import
        const lastImportIndex = content.lastIndexOf('\nimport');
        const insertIndex = content.indexOf('\n', lastImportIndex + 1);
        content = content.slice(0, insertIndex) + '\n' + importLine + content.slice(insertIndex);
      } else {
        content = importLine + '\n' + content;
      }
      
      // Replace error.message with getErrorMessage(error)
      content = content.replace(/error\.message/g, 'getErrorMessage(error)');
      content = content.replace(/\$\{error\}/g, '${getErrorMessage(error)}');
      modified = true;
    }
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
console.log('Applying critical TypeScript fixes...\n');

const agentsDir = path.join(__dirname, '..', 'src', 'agents');
const files = findTypeScriptFiles(agentsDir);

console.log(`Found ${files.length} TypeScript files to process\n`);

let fixedCount = 0;

for (const file of files) {
  const relativePath = path.relative(process.cwd(), file);
  process.stdout.write(`Processing ${relativePath}... `);
  
  if (processFile(file)) {
    console.log('✓ Fixed');
    fixedCount++;
  } else {
    console.log('No changes needed');
  }
}

console.log(`\nFixed ${fixedCount} files`);
console.log('Run "npm run typecheck" to verify the fixes');