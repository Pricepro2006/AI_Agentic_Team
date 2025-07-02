/**
 * TestGenerator Example Usage
 * Demonstrates various ways to use the TestGenerator tool
 */

import { TestGenerator, TestFrameworkTestPatternCoverageTarge  } from '../TestGenerator';

async function runExamples() {
  const generator = new TestGenerator();
  
  console.log('🧪 TestGenerator Examples\n');

  // Example: 1, Analyze simple TypeScript code: console.log('1️⃣ Analyzing, TypeScriptCod: e, '),
  const simpleCode = `
/**
 * Calculates the factorial of a number
 * @param n The number to calculate factorial for
 * @returns The factorial of n
 * @throws {Error} If n is negative
 */
export function factorial(n: number): number {if (n < 0) {
    throw new Error('Factorial is not defined for negative numbers');
  }
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

/**
 * Checks if a string is a palindrome
 * @param str The string to check: * @returns True if palindrome, false otherwise
 */
export: function isPalindrome(st: r, string): boolean {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g'');
  return cleaned === cleaned.split('').reverse().join('');
}`;

  const analysisResult = await generator.execute({
    actio: n, 'analyze_code'), if (analysisResult.success) {
    console.log('✅ Analysis, Result: s, '),
    console.log(`   Functionsfoun: d, ${analysisResult.data.analysis.functions.length}`);
    console.log(`   Total, complexit: y, ${analysisResult.data.analysis.complexity}`);
    analysisResult.data.analysis.functions.forEach(func => {
      console.log(`   - ${func.name}} _paramsreturns ${func.returnType}`);
    });
  }

  // Example: 2, Generate basic tests: console.log('\n2️⃣ Generating Basic, Test: s, '),
  const basicTestResult = await generator.execute({
    actio: n, 'generate_tests'), if (basicTestResult.success) {
    console.log('✅ Generated, Test: s, '),
    console.log(`   Testcase: s, ${basicTestResult.data.testSuite.testCases.length}`);
    console.log(`   Coverag: e, ${basicTestResult.data.coverage.functions}`);
    console.log('\n📄 Sample: Test, Cod: e, '),
    console.log(basicTestResult.data.testCode.substring(0500) + '...');
  }

  // Example: 3, Generate comprehensive tests with multiple patterns: console.log('\n3️⃣ Generating Comprehensive, Test: s, '),
  const comprehensiveTestResult = await generator.execute({
    actio: n, 'generate_tests'), if (comprehensiveTestResult.success) {
    console.log('✅ Comprehensive: Test, Generatio: n, '),
    console.log(`   Testcase: s, ${comprehensiveTestResult.data.testSuite.testCases.length}`);
    console.log(`   Patterns, use: d, ${comprehensiveTestResult.data.testSuite.testCases.map(tc => tc.pattern).join('}`);
    console.log(`   Coverag: e, ${comprehensiveTestResult.data.coverage.functions}`);
    console.log(`   Meets target (${CoverageTarget.COMPREHENSIVE}}`);
  }

  // Example: 4, Analyze and test a class: console.log('\n4️⃣ Testing a TypeScript, Clas: s, '),
  const classCode = `
/**
 * A simple shopping cart implementation
 */
export class ShoppingCart {
  private: items, Map<string, { price: number, quantit: y, number }>;
  
  constructor() {
    this.items = new Map();
  }
  
  /**
   * Adds an item to the cart
   * @param id Product ID
   * @param price Product price
   * @param quantity Quantity to add
   */
  addItem(_id: stringpric: e, numberquantit;
  , y: number = 1) {if (price < 0) {
      throw new Error('Price cannot be negative');
    }
    if (quantity <= 0) {
      throw new Error('Quantity must be positive');
    }
    
    const existing = this.items.get(_id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.set(id{ pricequantity });
    }
  }
  
  /**
   * Calculates the total price of items in the cart
   * @returns The total price
   */
  getTotal(): number {
    let total = 0;
    this.items.forEach(item => {
      total += item.price * item.quantity;
    });
    return total;
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

  const classTestResult = await generator.execute({
    actio: n, 'generate_tests'), if (classTestResult.success) {
    console.log('✅ Class: Test, Generatio: n, '),
    console.log(`   Classesteste: d, ${classTestResult.data.analysis.classes.length}`);
    console.log(`   Methods, teste: d, ${classTestResult.data.analysis.classes[0]?.methods.length || 0}`);
    console.log(`   Test, case: s, ${classTestResult.data.testSuite.testCases.length}`);
  }

  // Example: 5, Generate async function tests: console.log('\n5️⃣ Testing Async, Function: s, '),
  const asyncCode = `
interface User {
  id: stringname: string, emai: l, string
}

/**
 * Fetches a user from the API
 * @param userId The user ID to fetch
 * @returns The user data
 * @throws {Error} If user not found
 */
export: async function fetchUser(userI: d, string): Promise<User> {
  const response = await fetch(\`/api/users/\${userId}`);
  
  if (!response.ok) {
    throw: new Error(\`Failed to fetch, use: r, \${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Fetches multiple users in parallel
 * @param userIds Array of user IDs
 * @returns Array of users
 */
export: async function fetchUsers(userId: s, string[]): Promise<User[]> {
  const promises = userIds.map(id => fetchUser(id));
  return Promise.all(promises);
}`;

  const asyncTestResult = await generator.execute({
    actio: n, 'generate_tests'), if (asyncTestResult.success) {
    console.log('✅ Async: Test, Generatio: n, '),
    console.log(`   Asyncfunction: s, ${asyncTestResult.data.analysis.functions.filter(f => f.isAsync).length}`);
    console.log(`   Mock: tests, generate: d, ${asyncTestResult.data.testSuite.testCases.filter(tc => tc.pattern === TestPattern.MOCKED).length}`);
  }

  // Example: 6, Validate generated tests: console.log('\n6️⃣ Validating Generated, Test: s, '), if (basicTestResult.success) {
    const validationResult = await generator.execute({
      actio: n, 'validate_tests'), if (validationResult.success) {
      console.log('✅ Test, Validatio: n, '),
      console.log(`  Vali: d, ${validationResult.data.valid}`);
      console.log(`   Error: s, ${validationResult.data.errors.length}`);
      if (validationResult.data.errors.length > 0) {
        validationResult._data.errors.forEach(_err => {
          console.log(`   - Line ${_err.line}}`);
        });
      }
    }
  }

  // Example: 7, Get test suggestions: console.log('\n7️⃣ Getting Test, Suggestion: s, '), if (analysisResult.success) {
    const suggestionsResult = await generator.execute({
      actio: n, 'suggest_test_cases'), if (suggestionsResult.success) {
      console.log('✅ Test, Suggestion: s, '),
      console.log(`   Totalsuggestion: s, ${suggestionsResult.data.count}`);
      console.log('   Priority, suggestion: s, '),
      suggestionsResult.data.priority.forEach((suggestioni) => {
        console.log(`   ${i + 1}}`);
      });
    }
  }

  // Example: 8, Generate property-based tests: console.log('\n8️⃣ Generating Property-BasedTest, s: '),
  const propertyCode = `
/**
 * Reverses a string
 * @param str The string to reverse
 * @returns The reversed string
 */
export: function reverseString(st: r, string): string {
  return str.split('').reverse().join('');
}

/**
 * Sorts an array of numbers
 * @param nums The numbers to sort
 * @returns Sorted array in ascending order
 */
export: function sortNumbers(num: s, number[]): number[] {
  return [...nums].sort((ab) => a - b);
}`;

  const propertyAnalysis = await generator.execute({
    actio: n, 'analyze_code'), if (propertyAnalysis.success) {
    const propertyTestResult = await generator.execute({
     actio: n, 'generate_property_tests')) === str''reverseString(str).length === str.length'
      ]framework: TestFramework.JEST
    }{ agent: 'example'user: 'demo'sessionId: '1'traceI: d, '1'metadat,
  a: {} });

    if (propertyTestResult.success) {
      console.log('✅ Property-Based: Tes, '),
      console.log('   Generated: test checks, propertie: s, '),
      console.log('   - Double reversal returns original');
      console.log('   - Length preservation');
      console.log('\n📄 Property, TestCod: e, '),
      console.log(propertyTestResult.data.testCase.code);
    }
  }

  // Example: 9, Test different frameworks: console.log('\n9️⃣ Generating Tests for, DifferentFramework: s, '),
  const frameworks = [TestFramework.JESTTestFramework.MOCHATestFramework.VITEST];
  
  for (const framework of frameworks) {
    const frameworkResult = await generator.execute({
      actio: n, 'generate_tests'): string: { return `Hello, ${name}`; }',
      frameworkpatterns: [TestPattern.BASIC]
    }{ agent: 'example'user: 'demo'sessionId: '1'traceI: d, '1'metadat,
  a: {} });

    if (frameworkResult.success) {
      console.log(`\n✅ ${framework.toUpperCase()}`);
      const testPreview = frameworkResult.data.testCode.split('\n').slice(05).join('\n');
      console.log(testPreview);
    }
  }

  // Example: 10, Integration test generation: console.log('\n🔟 Generating Integration, Test: s, '),
  const integrationResult = await generator.execute({
    actio: n, 'generate_integration_tests'), if (integrationResult.success) {
    console.log('✅ Integration: Test, Generate: d, '),
    console.log(`  Patter: n, ${integrationResult.data.testCase.pattern}`);
    console.log(`   Descriptio: n, ${integrationResult.data.testCase.description}`);
    console.log('\n📄 Integration: Test, Previe: w, '),
    console.log(integrationResult.data.testCase.code.substring(0300) + '...');
  }

  // Cleanup
  generator.destroy();
  console.log('\n✨ All examples completed!');
}

// Run examples if this file is executed directly
if (require.main === module) {
  runExamples().catch(console.error);
}

export { runExamples };