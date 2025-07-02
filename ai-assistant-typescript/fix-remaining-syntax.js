#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Advanced syntax fixes for remaining corruption patterns
const advancedFixes = [
  // Fix malformed property declarations with comma separators
  {
    pattern: /(\w+): ([^,\n}]+),(\s*)(\w+):/g,
    replacement: '$1: $2;$3$4:'
  },
  
  // Fix object literal comma issues in declarations
  {
    pattern: /protected\s+(\w+): ([^=\n]+)= \{,/g,
    replacement: 'protected $1: $2 = {'
  },
  
  // Fix interface property separators
  {
    pattern: /(\w+): ([^,\n}]+),(\s*)(\w+):/g,
    replacement: '$1: $2;$3$4:'
  },
  
  // Fix malformed import statements with concatenated identifiers
  {
    pattern: /import\s*\{\s*([A-Za-z]+)([A-Za-z]+)\s*\}/g,
    replacement: 'import { $1, $2 }'
  },
  
  // Fix template literal syntax errors
  {
    pattern: /\$\{([^}]+)\}([A-Za-z_][A-Za-z0-9_]*)/g,
    replacement: '${$1} $2'
  },
  
  // Fix method parameter syntax with missing commas
  {
    pattern: /\(([^)]+)([A-Za-z_][A-Za-z0-9_]*): ([^,)]+)\)/g,
    replacement: '($1, $2: $3)'
  },
  
  // Fix enum value syntax
  {
    pattern: /([A-Z_]+)\s*=\s*'([^']+)'([A-Z_]+)\s*=/g,
    replacement: '$1 = \'$2\',\n  $3 ='
  },
  
  // Fix object property assignment with missing colons
  {
    pattern: /(\w+)\s+([^:,}\n]+),/g,
    replacement: '$1: $2,'
  },
  
  // Fix function return type syntax
  {
    pattern: /\): Promise<([^>]+)>([A-Za-z_][A-Za-z0-9_]*)/g,
    replacement: '): Promise<$1> {\n    $2'
  },
  
  // Fix class property declarations with missing access modifiers
  {
    pattern: /^(\s*)(\w+): ([^=\n]+)= /gm,
    replacement: '$1protected $2: $3 = '
  }
];

// Specific fixes for different corruption patterns
const specificFixes = [
  // Fix BaseAgent.ts specific issues
  {
    filePattern: '**/BaseAgent.ts',
    fixes: [
      {
        pattern: /protected abstract, config: AgentConfig/g,
        replacement: 'protected abstract config: AgentConfig'
      },
      {
        pattern: /protected, agent: Agent/g,
        replacement: 'protected agent: Agent'
      },
      {
        pattern: /protected, tools: Record/g,
        replacement: 'protected tools: Record'
      },
      {
        pattern: /protected, status: AgentStatus/g,
        replacement: 'protected status: AgentStatus'
      },
      {
        pattern: /protected, performanceMetrics: PerformanceMetrics = \{,/g,
        replacement: 'protected performanceMetrics: PerformanceMetrics = {'
      },
      {
        pattern: /const, fallbacks: string\[\] = \[\]/g,
        replacement: 'const fallbacks: string[] = []'
      },
      {
        pattern: /const, messages: CoreMessage\[\] = \[\]/g,
        replacement: 'const messages: CoreMessage[] = []'
      },
      {
        pattern: /tokenUsage: \{,/g,
        replacement: 'tokenUsage: {'
      },
      {
        pattern: /metadata: \{,/g,
        replacement: 'metadata: {'
      }
    ]
  },
  
  // Fix ExpertAgentTemplate.ts specific issues
  {
    filePattern: '**/ExpertAgentTemplate.ts',
    fixes: [
      {
        pattern: /enabled: boolean,,/g,
        replacement: 'enabled: boolean;'
      },
      {
        pattern: /domain: string,,/g,
        replacement: 'domain: string;'
      },
      {
        pattern: /primaryExpertise: string\[\],/g,
        replacement: 'primaryExpertise: string[];'
      },
      {
        pattern: /routingDecision: \(intent: any\) => Promise<number>,,/g,
        replacement: 'routingDecision: (intent: any) => Promise<number>;'
      },
      {
        pattern: /protected declare, config: AgentConfig/g,
        replacement: 'protected declare config: AgentConfig'
      },
      {
        pattern: /protected, ragConfig: RAGConfig/g,
        replacement: 'protected ragConfig: RAGConfig'
      },
      {
        pattern: /protected, specialization: ExpertSpecialization/g,
        replacement: 'protected specialization: ExpertSpecialization'
      },
      {
        pattern: /'mistra,,\s*l: latest'/g,
        replacement: '\'mistral:latest\''
      },
      {
        pattern: /timeou,\s*t: 30000,,/g,
        replacement: 'timeout: 30000,'
      }
    ]
  },
  
  // Fix types/agents.ts specific issues
  {
    filePattern: '**/types/agents.ts',
    fixes: [
      {
        pattern: /model: z\.string\(\)\.default\('mistra,,\s*l: latest'\)/g,
        replacement: 'model: z.string().default(\'mistral:latest\')'
      },
      {
        pattern: /temperatur,\s*e: z\.number\(\)/g,
        replacement: 'temperature: z.number()'
      },
      {
        pattern: /id: z\.string\(\)\.min\(1\)name: z\.string\(\)\.min\(1\)descriptio,,/g,
        replacement: 'id: z.string().min(1),\n  name: z.string().min(1),\n  description:'
      },
      {
        pattern: /n: z\.string\(\)versio,/g,
        replacement: 'n: z.string(),\n  version:'
      },
      {
        pattern: /response: z\.string\(\)agentI,,/g,
        replacement: 'response: z.string(),\n  agentId:'
      },
      {
        pattern: /name: z\.string\(\)descriptio,,/g,
        replacement: 'name: z.string(),\n  description:'
      }
    ]
  }
];

function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    let fixesApplied = 0;

    // Apply general advanced fixes
    for (const fix of advancedFixes) {
      const beforeLength = content.length;
      content = content.replace(fix.pattern, fix.replacement);
      if (content.length !== beforeLength) {
        fixesApplied++;
      }
    }

    // Apply file-specific fixes
    for (const specificFix of specificFixes) {
      if (filePath.includes(specificFix.filePattern.replace('**/', ''))) {
        for (const fix of specificFix.fixes) {
          const beforeLength = content.length;
          content = content.replace(fix.pattern, fix.replacement);
          if (content.length !== beforeLength) {
            fixesApplied++;
          }
        }
      }
    }

    // Additional cleanup passes
    
    // Fix multiple comma issues
    content = content.replace(/,,+/g, ',');
    
    // Fix trailing commas in interfaces
    content = content.replace(/,(\s*})/g, '$1');
    
    // Fix semicolon vs comma in object literals
    content = content.replace(/(\w+): ([^,;\n}]+);(\s*\w+:)/g, '$1: $2,$3');
    
    // Fix missing spaces after commas
    content = content.replace(/,(\w)/g, ', $1');
    
    // Fix import statement formatting
    content = content.replace(/import\s*\{\s*([^}]+)\s*\}\s*from/g, (match, imports) => {
      const cleanImports = imports.split(/\s+/).filter(imp => imp && imp !== ',').join(', ');
      return `import { ${cleanImports} } from`;
    });

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content);
      console.log(`Fixed ${fixesApplied} advanced syntax errors in ${filePath}`);
      return fixesApplied;
    }
    
    return 0;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return 0;
  }
}

function main() {
  console.log('Starting advanced TypeScript syntax fixes...');
  
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

  console.log(`\nAdvanced syntax fix summary:`);
  console.log(`- Files processed: ${files.length}`);
  console.log(`- Files fixed: ${filesFixed}`);
  console.log(`- Total fixes applied: ${totalFixes}`);
  
  console.log('\nRunning TypeScript compilation to check progress...');
  
  const { exec } = require('child_process');
  exec('npm run type-check', (error, stdout, stderr) => {
    if (error) {
      const errorLines = stderr.split('\n').filter(line => line.includes('error TS'));
      console.log(`Remaining TypeScript errors: ${errorLines.length}`);
      
      if (errorLines.length < 50) {
        console.log('\nRemaining errors (showing all):');
        errorLines.forEach((line, idx) => console.log(`${idx + 1}. ${line}`));
      } else {
        console.log('\nRemaining errors (sample of first 20):');
        errorLines.slice(0, 20).forEach((line, idx) => console.log(`${idx + 1}. ${line}`));
      }
    } else {
      console.log('🎉 All TypeScript errors fixed!');
    }
  });
}

if (require.main === module) {
  main();
}