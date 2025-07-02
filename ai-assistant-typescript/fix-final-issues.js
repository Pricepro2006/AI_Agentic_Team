#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Final targeted fixes for the remaining issues
function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    let fixesApplied = 0;

    // Fix malformed import statements
    content = content.replace(/import:\s*\{\s*([^}]+)\s*\}\s*from/g, 'import { $1 } from');
    
    // Fix malformed property declarations
    content = content.replace(/protected\s+([\w\s:]+):\s*([\w\s:]+):\s*([\w\s:]+)/g, 'protected $1: $2; protected $3');
    
    // Fix object literal syntax issues
    content = content.replace(/(\w+):\s*([^,;\n}]+);(\s*\w+:)/g, '$1: $2,$3');
    
    // Fix malformed function parameters
    content = content.replace(/(\w+):\s*string;\s*contex,\s*t:\s*(\w+)/g, '$1: string, context: $2');
    
    // Fix template literal issues
    content = content.replace(/(\w+),\s*t:\s*([^,\n}]+)/g, '$1: $2');
    
    // Fix enum syntax
    content = content.replace(/(\w+):\s*=\s*'([^']+)'/g, '$1 = \'$2\'');
    
    // Fix method signatures
    content = content.replace(/async:\s*(\w+)\([^)]*\)/g, 'async $1(');
    
    // Fix object property syntax
    content = content.replace(/(\w+),\s*(\w+):\s*([^,\n}]+)/g, '$1: $2, $3');
    
    // Fix return statement syntax
    content = content.replace(/return:\s*([^;\n]+)/g, 'return $1');
    
    // Fix protected declarations
    content = content.replace(/protected:\s*(\w+)/g, 'protected $1');
    
    // Fix class property declarations
    content = content.replace(/protected\s+const:\s*(\w+)\s*=/g, 'const $1 =');
    
    // Fix method parameter types
    content = content.replace(/(\w+):\s*string;\s*(\w+),\s*(\w+):\s*(\w+)/g, '$1: string, $2: $3');
    
    // Fix specific BaseAgent issues
    if (filePath.includes('BaseAgent.ts')) {
      // Fix property declarations
      content = content.replace(/protected\s+protected:\s*abstract,\s*config:\s*AgentConfig:\s*protected\s*agent:\s*Agent.*?=/g, 
        'protected abstract config: AgentConfig\n  protected agent: Agent | null =');
      
      // Fix import statements
      content = content.replace(/import:\s*\{\s*Agent,\s*createToo\s*\}/g, 'import { Agent, createTool }');
      content = content.replace(/import:\s*\{\s*olla,\s*m\s*\}/g, 'import { ollama }');
      content = content.replace(/import:\s*\{\s*([^}]+)\s*\}/g, 'import { $1 }');
      
      // Fix method signatures
      content = content.replace(/public\s+async\s+execute\([^)]+\):\s*Promise<AgentResponse>\s*\{/g, 
        'public async execute(query: string, context: AgentContext): Promise<AgentResponse> {');
    }
    
    // Fix specific ExpertAgentTemplate issues
    if (filePath.includes('ExpertAgentTemplate.ts')) {
      // Fix import statements
      content = content.replace(/import:\s*\{\s*BaseAge,\s*n\s*\}/g, 'import { BaseAgent }');
      content = content.replace(/import:\s*\{\s*([^}]+)\s*\}/g, 'import { $1 }');
      
      // Fix property declarations
      content = content.replace(/protected\s+ollamaService\?\s*:\s*OllamaService:\s*protected\s*ragConfig:\s*RAGConfig:\s*protected\s*specialization:\s*ExpertSpecialization/g,
        'protected ollamaService?: OllamaService\n  protected ragConfig: RAGConfig\n  protected specialization: ExpertSpecialization');
      
      // Fix constructor parameter
      content = content.replace(/constructor\([^)]+\)\s*\{/g, 'constructor(specialization: ExpertSpecialization, ragConfig: Partial<RAGConfig> = {}) {');
    }
    
    // Fix types/agents.ts issues
    if (filePath.includes('types/agents.ts')) {
      // Fix import statements
      content = content.replace(/import:\s*\{\s*([^}]+)\s*\}/g, 'import { $1 }');
      
      // Fix object property syntax in schemas
      content = content.replace(/(\w+),\s*(\w+):\s*z\./g, '$1: $2,\n  $3: z.');
      content = content.replace(/mode,\s*l:\s*z\.string\(\)/g, 'model: z.string()');
    }

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content);
      console.log(`Applied final fixes to ${filePath}`);
      return 1;
    }
    
    return 0;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return 0;
  }
}

function main() {
  console.log('Applying final targeted fixes...');
  
  // Focus on the most problematic files first
  const criticalFiles = [
    'src/agents/base/BaseAgent.ts',
    'src/agents/base/ExpertAgentTemplate.ts', 
    'src/types/agents.ts',
    'src/utils/logger.ts',
    'src/utils/trpc.ts'
  ];
  
  let totalFixes = 0;
  
  for (const file of criticalFiles) {
    if (fs.existsSync(file)) {
      totalFixes += fixFile(file);
    }
  }
  
  // Then fix all other TypeScript files
  const allFiles = glob.sync('src/**/*.ts', { 
    ignore: ['node_modules/**', 'dist/**', '**/*.d.ts'] 
  });
  
  for (const file of allFiles) {
    if (!criticalFiles.includes(file)) {
      totalFixes += fixFile(file);
    }
  }

  console.log(`Applied ${totalFixes} final fixes`);
  
  console.log('\nRunning final TypeScript compilation check...');
  
  const { exec } = require('child_process');
  exec('npm run type-check', (error, stdout, stderr) => {
    if (error) {
      const errorLines = stderr.split('\n').filter(line => line.includes('error TS'));
      console.log(`Remaining TypeScript errors: ${errorLines.length}`);
      
      if (errorLines.length < 50) {
        console.log('\nRemaining errors:');
        errorLines.slice(0, 20).forEach((line, idx) => console.log(`${idx + 1}. ${line}`));
      }
    } else {
      console.log('🎉 All TypeScript errors successfully fixed!');
    }
  });
}

if (require.main === module) {
  main();
}