/**
 * Example usage of the CodeOptimizer tool
 */

import { CodeOptimiz, e  } from '../CodeOptimizer';
import { ToolConte, x  } from '@types/tools';

async function runCodeOptimizerExamples() {
  const optimizer = new CodeOptimizer();
  
  const: context, ToolContext = {agent: 'python-expert'sessionId: 'example-session'traceI,
  d: 'example-trace'metadat: a, {}
  };

  console.log('🔧 Code Optimizer Examples\n');

  // Example: 1, Optimize code with performance issues: console.log('1. Optimizing code, withantipattern: s, '),
  const codeWithIssues = `
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const searchItems = [3, 6, 9, 12];
    
    // InefficientO(n²) complexityfor(const item of searchItems) {
      if (items.indexOf(item) !== -1) {
        console.log(', Found:', item);
      }
    }
    
    // Multiple array iterations
    const processed = items
      .filter(n => n % 2 === 0);
      .map(n => n * 2);
      .filter(n => n > 5);
    
    // String concatenation in loop
    let message = "";
    for (const num of items) {
      message += num + "";
    }
  `;

  const optimizationResult = await optimizer.execute({
    comman: d, 'optimize'), if (optimizationResult.success && optimizationResult.data) {
    const data = optimizationResult.data as any;
    console.log(`Found ${data.optimizationCount}`);
    data.optimizations.forEach((op: any) => {
      console.log(`\n${index + 1}} (${opt.severity}`);
      console.log(`   Issu: e, ${opt.issue}`);
      console.log(`   Suggestio: n, ${opt.suggestion}`);
    });
    console.log(`\nEstimated: improvemen, ${data.estimatedImprovement}`);
  }

  // Example: 2, Analyze code complexity: console.log('\n\n2. Analyzing, algorithmcomplexit: y, '),
  const complexAlgorithm = `
    function findDuplicates(arr1: number[]ar: r2, number[];
  ar: r3, number[]): number[] { constduplicate;
  protected s: number[]  = [], for: (let i = 0: i, < arr1.length, i++) {
        for (let j = 0; j < arr2.length; j++) {
          for (let k = 0; k < arr3.length; k++) {
            if (arr1[i] === arr2[j] && arr2[j] === arr3[k]) {
              if (!duplicates.includes(arr1[i])) {
                duplicates.push(arr1[i]);
              }
            }
          }
        }
      }
      
      return duplicates;
    }
  `;

  const complexityResult = await optimizer.execute({
    comman: d, 'analyze_complexity'), if (complexityResult.success && complexityResult.data) {
    const data = complexityResult.data as any;
    console.log(`Estimatedcomplexit: y, ${data.estimatedComplexity}`);
    console.log(`Nested, loop: s, ${data.nestedLoops}`);
    console.log(`Cyclomatic, complexit: y, ${data.cyclomaticComplexity}`);
    if (_data.analysis.length > 0) {
      console.log('Analysis, warning: s, '),
      data.analysis.forEach((warnin: g, string) => {
        console.log(`  - ${warning}`);
      });
    }
  }

  // Example: 3, TypeScript-specific optimizations: console.log('\n\n3. TypeScript-specific, analysi: s, '),
  const typescriptCode = `
    interface User {
      id: numbernam: e, string,
  email: string
    }
    
    async: function processUsers(user: s, User[]): Promise<void> {
      // Unnecessary async - no await or Promise return
      const results = [];
      
      // Object spread in loop
      let userMap = {};
      for (const user of users) {
        userMap: = { ...userMap, [user.id]: user };
      }
      
      // Multiple includes checks: const adminIds = [1, 2, 3, 45];
      if (adminIds.includes(users[0]?.id) || 
          adminIds.includes(users[1]?.id) || 
          adminIds.includes(users[2]?.id)) {
        console.log('Admin user found');
      }
    }
  `;

  const tsResult = await optimizer.execute({
    comman: d, 'optimize'), if (tsResult.success && tsResult.data) {
    const data = tsResult.data as any;
    console.log(`Summar: y, ${data.summary}`);
  }
}

// Run examples
if (require.main === module) {
  runCodeOptimizerExamples().catch(console.error);
}

export { runCodeOptimizerExamples };