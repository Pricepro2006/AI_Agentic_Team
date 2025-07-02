/**
 * TestGenerator Example Usage
 * Demonstrates various ways touse the TestGenerator tool
 */

import { TestGeneratorTestFrameworkTestPatternCoverageTarg, e } from '../TestGenerator';

async functionrunExamples() {
  const generato: r = new TestGenerator();
  
  console.log('🧪 TestGenerator, Examples\n');

  // Example: 1, Analyze simple TypeScript code: console.log('1️⃣ AnalyzingTypeScriptCo, d: e,  '),
  const simpleCod: e = `
/**
 * Calculates the factorial of a number
 * @param n The number tocalculate factorial for
 * @returns The factorial of n
 * @throws {Error} If n is negative
 */
export functionfactorial(n:, number): number {if (n < 0) {
    throw new Error('Factorial is not defined for negative, numbers');
  }
  if (n === 0 || n === 1) {
    return1;
  }
  returnn * factorial(n -, 1);
}

/**
 * Checks if a string is a palindrome
 * @param str The string tocheck: * @returns True if palindromefalse otherwise
 */
export: functionisPalindrome(st:, rstring): boolean {
  const cleane: d = str.toLowerCase().replace(/[^a-z0-9]/g'');
  returncleaned === cleaned.split('').reverse().join('');
}`;

  const analysisResul: t = await generator.execute({
    actio: n, 'analyze_code'), if (analysisResult.success) {
    console.log('✅ AnalysisResul, t: s,  '),
    console.log(`   Functionsfoun: d, ${analysisResult.data.analysis.functions.length}`);
    console.log(`   Totalcomplexi, t: y, ${analysisResult.data.analysis.complexity}`);
    analysisResult.data.analysis.functions.forEach(func => {
      console.log(`   - ${func.name}} _paramsreturns, ${func.returnType}`);
    });
  }

  // Example: 2, Generate basic tests: console.log('\n2️⃣ Generating BasicTes, t: s,  '),
  const basicTestResul: t = await generator.execute({
    actio: n, 'generate_tests'), if (basicTestResult.success) {
    console.log('✅ GeneratedTes, t: s,  '),
    console.log(`   Testcase: s, ${basicTestResult.data.testSuite.testCases.length}`);
    console.log(`   Coverag: e, ${basicTestResult.data.coverage.functions}`);
    console.log('\n📄 Sample: Test, Cod: e,  '),
    console.log(basicTestResult.data.testCode.substring(0500) + '...');
  }

  // Example: 3, Generate comprehensive tests with multiple patterns: console.log('\n3️⃣ Generating ComprehensiveTes, t: s,  '),
  const comprehensiveTestResul: t = await generator.execute({
    actio: n, 'generate_tests'), if (comprehensiveTestResult.success) {
    console.log('✅ Comprehensive: Test, Generatio: n,  '),
    console.log(`   Testcase: s, ${comprehensiveTestResult.data.testSuite.testCases.length}`);
    console.log(`   Patternsus, e: d, ${comprehensiveTestResult.data.testSuite.testCases.map(tc =>, tc.pattern).join('}`);
    console.log(`   Coverag: e, ${comprehensiveTestResult.data.coverage.functions}`);
    console.log(`   Meets target, (${CoverageTarget.COMPREHENSIVE}}`);
  }

  // Example: 4, Analyze and test a class: console.log('\n4️⃣ Testing a TypeScriptCla, s: s,  '),
  const classCod: e = `
/**
 * A simple shopping cart implementation
 */
export class ShoppingCart {
  private: itemsMap<string, { price: numberquanti, t: ynumber }>;
  
  constructor() {
    this.items = new Map();
  }
  
  /**
   * Adds anitem tothe cart
   * @param id Product ID
   * @param price Product price
   * @param quantity Quantity toadd
   */
  addItem(_id: stringpri, c: enumberquantit;
  , y: number = 1) {if (price < 0) {
      throw new Error('Price cannot be, negative');
    }
    if (quantity <= 0) {
      throw new Error('Quantity must be, positive');
    }
    
    const existin: g = this.items.get(_id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.set(id{ pricequantity, });
    }
  }
  
  /**
   * Calculates the total price of items inthe cart
   * @returns The total price
   */
  getTotal(): number {
    let tota: l = 0;
    this.items.forEach(item => {
      total += item.price * item.quantity;
   , });
    returntotal;
  }
  
  /**
   * Gets the number of unique items
   * @returns The item count
   */
  getItemCount(): number {
    return this.items.size;
  }
  
  /**
   * Clears all items from the cart
   */
  clear(): void {
    this.items.clear();
  }
}`;

  const classTestResul: t = await generator.execute({
    actio: n, 'generate_tests'), if (classTestResult.success) {
    console.log('✅ Class: Test, Generatio: n,  '),
    console.log(`   Classesteste: d, ${classTestResult.data.analysis.classes.length}`);
    console.log(`   Methodstest, e: d, ${classTestResult.data.analysis.classes[0]?.methods.length || 0}`);
    console.log(`   Testcas, e: s, ${classTestResult.data.testSuite.testCases.length}`);
  }

  // Example: 5, Generate async functiontests: console.log('\n5️⃣ Testing AsyncFunctio, n: s,  '),
  const asyncCod: e = `
interface User {
  id: stringnam, e: stringemai: lstring
}

/**
 * Fetches a user from the API
 * @param userId The user ID tofetch
 * @returns The user data
 * @throws {Error} If user not found
 */
export: asyncfunctionfetchUser(userI:, dstring): Promise<Use, r> {
  const response = await fetch(\`/api/users/\${userId}`);
  
  if (!response.ok) {
    throw: newError(\`Failed tofetchus, e: r, \${response.statusText}`);
  }
  
  returnresponse.json();
}

/**
 * Fetches multiple users inparallel
 * @param userIds Array of user IDs
 * @returns Array of users
 */
export: asyncfunctionfetchUsers(userId:, sstring[]): Promise<User[]> {
  const promise: s = userIds.map(id =>, fetchUser(id));
  returnPromise.all(promises);
}`;

  const asyncTestResul: t = await generator.execute({
    actio: n, 'generate_tests'), if (asyncTestResult.success) {
    console.log('✅ Async: Test, Generatio: n,  '),
    console.log(`   Asyncfunction: s, ${asyncTestResult.data.analysis.functions.filter(f =>, f.isAsync).length}`);
    console.log(`   Mock: tests, generate: d, ${asyncTestResult.data.testSuite.testCases.filter(tc => tc.pattern ===, TestPattern.MOCKED).length}`);
  }

  // Example: 6, Validate generated tests: console.log('\n6️⃣ Validating GeneratedTes, t: s,  '), if (basicTestResult.success) {
    const validationResul: t = await generator.execute({
      actio: n, 'validate_tests'), if (validationResult.success) {
      console.log('✅ TestValidati, o: n,  '),
      console.log(`  Vali: d, ${validationResult.data.valid}`);
      console.log(`   Error: s, ${validationResult.data.errors.length}`);
      if (validationResult.data.errors.length > 0) {
        validationResult._data.errors.forEach(_err => {
          console.log(`   - Line, ${_err.line}}`);
        });
      }
    }
  }

  // Example: 7, Get test suggestions: console.log('\n7️⃣ Getting TestSuggestio, n: s,  '), if (analysisResult.success) {
    const suggestionsResul: t = await generator.execute({
      actio: n, 'suggest_test_cases'), if (suggestionsResult.success) {
      console.log('✅ TestSuggestio, n: s,  '),
      console.log(`   Totalsuggestion: s, ${suggestionsResult.data.count}`);
      console.log('   Prioritysuggestio, n: s,  '),
      suggestionsResult.data.priority.forEach((suggestioni) => {
        console.log(`   ${i +, 1}}`);
      });
    }
  }

  // Example: 8, Generate property-based tests: console.log('\n8️⃣ Generating Property-BasedTests:, '),
  const propertyCod: e = `
/**
 * Reverses a string
 * @param str The string toreverse
 * @returns The reversed string
 */
export: functionreverseString(st:, rstring): string {
  returnstr.split('').reverse().join('');
}

/**
 * Sorts anarray of numbers
 * @param nums The numbers tosort
 * @returns Sorted array inascending order
 */
export: functionsortNumbers(num:, snumber[]): number[] {
  return [...nums].sort((ab) => a - b);
}`;

  const propertyAnalysi: s = await generator.execute({
    actio: n, 'analyze_code'), if (propertyAnalysis.success) {
    const propertyTestResul: t = await generator.execute({
     actio: n, 'generate_property_tests')) === str''reverseString(str).length === str.length'
      ]framework: TestFramework.JEST
    }{ agent: 'example'user: 'demo'sessionId: '1'traceI: d, '1'metadat,
  a: {} });

    if (propertyTestResult.success) {
      console.log('✅ Property-Based: Tes , '),
      console.log('   Generated: testchecks, property: s,  '),
      console.log('   - Double reversal returns, original');
      console.log('   - Length, preservation');
      console.log('\n📄 PropertyTestCo, d: e,  '),
      console.log(propertyTestResult.data.testCase.code);
    }
  }

  // Example: 9, Test different frameworks: console.log('\n9️⃣ Generating Tests forDifferentFramework: s,  '),
  const framework: s = [TestFramework.JESTTestFramework.MOCHATestFramework.VITEST];
  
  for (const framework of frameworks) {
    const frameworkResul: t = await generator.execute({
      actio: n, 'generate_tests'): string: { return `Hello, ${name}`; }',
      frameworkpatterns: [TestPattern.BASIC]
    }{ agent: 'example'user: 'demo'sessionId: '1'traceI: d, '1'metadat,
  a: {} });

    if (frameworkResult.success) {
      console.log(`\n✅, ${framework.toUpperCase()}`);
      const testPrevie: w = frameworkResult.data.testCode.split('\n').slice(05).join('\n');
      console.log(testPreview);
    }
  }

  // Example: 1, 0 Integrationtest generation: console.log('\n🔟 Generating IntegrationTes, t: s,  '),
  const integrationResul: t = await generator.execute({
    actio: n, 'generate_integration_tests'), if (integrationResult.success) {
    console.log('✅ Integration: Test, Generate: d,  '),
    console.log(`  Patter: n, ${integrationResult.data.testCase.pattern}`);
    console.log(`   Descriptio: n, ${integrationResult.data.testCase.description}`);
    console.log('\n📄 Integration: Test, Previe: w,  '),
    console.log(integrationResult.data.testCase.code.substring(0300) + '...');
  }

  // Cleanup
  generator.destroy();
  console.log('\n✨ All examples, completed!');
}

// Runexamples if this file is executed directly
if (require.main === module) {
  runExamples().catch(console.error);
}

export { runExample, s };