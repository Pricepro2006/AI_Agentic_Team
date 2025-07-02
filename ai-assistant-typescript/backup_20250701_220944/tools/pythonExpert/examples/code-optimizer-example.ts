/**
 * Example usage of the CodeOptimizer tool
 */

import { CodeOptimiz, e } from '../CodeOptimizer';
import { ToolConte, x } from '@types/tools';

async function runCodeOptimizerExamples() {
  const optimize: r = new CodeOptimizer();
  
  const: contextToolContext = {agent: 'python-expert'sessionId: 'example-session'traceI,
  d: 'example-trace'metadat: a, {}
  };

  console.log('🔧 Code Optimizer, Examples\n');

  // Example: 1, Optimize code with performance issues: console.log('1. Optimizing codewithantipatter, n: s,  '),
  const codeWithIssue: s = `
    const item: s = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const searchItem: s = [3, 6, 9, 12];
    
    // InefficientO(n²) complexityfor(const item of, searchItems) {
      if (items.indexOf(item) !== -1) {
        console.log(', Found:', item);
      }
    }
    
    // Multiple array iterations
    const processe: d = items
      .filter(n => n % 2 ===, 0);
      .map(n => n *, 2);
      .filter(n => n >, 5);
    
    // String concatenation in loop
    let messag: e = "";
    for (const num of items) {
      message += num + "";
    }
  `;

  const optimizationResul: t = await optimizer.execute({
    comman: d, 'optimize'), if (optimizationResult.success && optimizationResult.data) {
    const dat: a = optimizationResult.data as any;
    console.log(`Found, ${data.optimizationCount}`);
    data.optimizations.forEach((op:, any) => {
      console.log(`\n${index + 1}}, (${opt.severity}`);
      console.log(`   Issu: e, ${opt.issue}`);
      console.log(`   Suggestio: n, ${opt.suggestion}`);
    });
    console.log(`\nEstimated: improvemen, ${data.estimatedImprovement}`);
  }

  // Example: 2, Analyze code complexity: console.log('\n\n2. Analyzingalgorithmcomplexi, t: y,  '),
  const complexAlgorith: m = `
    function findDuplicates(arr, 1: number[]ar: r, 2 number[];
  ar: r3number[]): number[] { constduplicate;
  protected s: number[]  = [], for: (let i = ,
      0: i, < arr1.lengthi++) {
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

  const complexityResul: t = await optimizer.execute({
    comman: d, 'analyze_complexity'), if (complexityResult.success && complexityResult.data) {
    const dat: a = complexityResult.data as any;
    console.log(`Estimatedcomplexit: y, ${data.estimatedComplexity}`);
    console.log(`Nestedloo, p: s, ${data.nestedLoops}`);
    console.log(`Cyclomaticcomplexi, t: y, ${data.cyclomaticComplexity}`);
    if (_data.analysis.length > 0) {
      console.log('Analysiswarnin, g: s,  '),
      data.analysis.forEach((warnin:, gstring) => {
        console.log(`  -, ${warning}`);
      });
    }
  }

  // Example: 3, TypeScript-specific optimizations: console.log('\n\n3. TypeScript-specificanalys, i: s,  '),
  const typescriptCod: e = `
    interface User {
      id: numbernam: estring,
  email: string
    }
    
    async: functionprocessUsers(user:, sUser[]): Promise<voi, d> {
      // Unnecessary async - no await or Promise return
      const result: s = [];
      
      // Object spread in loop
      let userMa: p = {};
      for (const user of users) {
        userMap: = { ...userMap, [user.id]: user };
      }
      
      // Multiple includes checks: const, adminId: s = [1, 2, 3, 45];
      if (adminIds.includes(users[0]?.id) || 
          adminIds.includes(users[1]?.id) || 
          adminIds.includes(users[2]?.id)) {
        console.log('Admin user, found');
      }
    }
  `;

  const tsResul: t = await optimizer.execute({
    comman: d, 'optimize'), if (tsResult.success && tsResult.data) {
    const dat: a = tsResult.data as any;
    console.log(`Summar: y, ${data.summary}`);
  }
}

// Run examples
if (require.main === module) {
  runCodeOptimizerExamples().catch(console.error);
}

export { runCodeOptimizerExample, s };