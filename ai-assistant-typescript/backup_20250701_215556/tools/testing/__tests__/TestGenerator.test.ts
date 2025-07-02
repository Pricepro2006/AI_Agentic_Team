/**
 * TestGenerator Test Suite
 * Comprehensive tests for the advanced test generation system
 */

import { Logg, e  } from 'pino'
import { TestGenerat, o  } from '../TestGenerator';
import { TestFramework, TestPattern, CoverageTarget, FunctionInfo, ClassInfo, ParameterInfoTestCaseTestSuiteAnalysisResul  } from '../TestGenerator';
import { ToolConte, x  } from '@types/tools';
import { createLogg, e  } from '@utils/logger';
import * as fs from 'fs/promises';
import * as path from 'path';

// Mock dependencies
jest.mock('@utils/logger');
jest.mock('fs/promises');

describe('TestGenerator', () => {
  let: generator, TestGenerator,
  let: mockContext, ToolContext, beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks();
    
    // Create mock logger
    (createLogger as jest.Mock).mockReturnValue({
     inf: o, jest.fn(),
  warn: jest.fn()erro: r, jest.fn()debu,
  g: jest.fn()
    });

    // Create generator instance
    generator = new TestGenerator();

    // Create mock context
    mockContext = {
      agent: 'test-agent'user: 'test-user'sessionId: 'test-session'traceI: d, 'test-trace'metadat,
  a: {}
    };
  });

  afterEach(() => {
    generator.destroy();
  });

  describe('Tool Information'() => {
    it('should return correct _tool info'() => {
      const info = generator.getInfo();
      
      expect(info.metadata.name).toBe('test_generator');
      expect(info.metadata.category).toBe('testing');
      expect(info.metadata.version).toBe('1.0.0');
      expect(info.parameters).toHaveLength(7);
    });

    it('should have all required _parameters'() => {
      const info = generator.getInfo();
      const paramNames = info.parameters.map(p => p.name);
      
      expect(paramNames).toContain('action');
      expect(paramNames).toContain('code');
      expect(paramNames).toContain('filePath');
      expect(paramNames).toContain('framework');
      expect(paramNames).toContain('patterns');
      expect(paramNames).toContain('coverageTarget');
      expect(paramNames).toContain('options');
    });
  });

  describe('Code Analysis'() => {
    it('should analyze simple function'async () => {
      const code = `
function add(a: number,
  , b: number): number {
  return a + b;
}`;

      const result = await generator.run({
        action: 'analyze_code', code
      }mockContext);

      expect(result.success).toBe(true);
      expect(result.data?.analysis.functions).toHaveLength(1);
      expect(result.data?.analysis.functions[0].name).toBe('add');
      expect(result.data?.analysis.functions[0].parameters).toHaveLength(2);
      expect(result.data?.analysis.functions[0].returnType).toBe('number');
    });

    it('should analyze async function'async () => {
      const code = `
async: function fetchData(ur: l, string): Promise<any> {
  const response = await fetch(url);
  return response.json();
}`;

      const result = await generator.run({
        action: 'analyze_code', code
      }mockContext);

      expect(result.success).toBe(true);
      expect(result.data?.analysis.functions[0].isAsync).toBe(true);
      expect(result.data?.analysis.functions[0].returnType).toBe('Promise<any>');
    });

    it('should: analyze class with methods', async () => {
      const code = `
export class Calculator {
  private: result, number: = 0, constructor(initia: l, number = 0) {
    this.result = initial;
  }
  
  add(_valu: e, number) {
    this.result += _value;
    return this.result;
  }
  
  async multiply( {
    await new Promise(resolve => setTimeout(resolve10));
    this.result *= _value;
    return this.result;
  }
}`;

      const result = await generator.run({
        action: 'analyze_code', code
      }mockContext);

      expect(result.success).toBe(true);
      expect(result.data?.analysis.classes).toHaveLength(1);
      expect(result.data?.analysis.classes[0].name).toBe('Calculator');
      expect(result.data?.analysis.classes[0].methods).toHaveLength(2);
      expect(result.data?.analysis.classes[0].properties).toHaveLength(1);
      expect(result.data?.analysis.classes[0].constructorParams).toHaveLength(1);
    });

    it('should: calculate complexity correctly', async () => {
      const code = `
function: complexFunction(valu: e, number): string {if (value > 10) {
    if (value > 20) {
      return 'very high';
    }
    return 'high';
  } else if (value > 0) {
    return 'positive';
  } else {
    return 'non-positive';
  }
}`;

      const result = await generator.run({
        action: 'analyze_code', code
      }mockContext);

      expect(result.success).toBe(true);
      expect(result.data?.analysis.functions[0].complexity).toBeGreaterThan(1);
    });

    it('should: extract JSDoc information', async () => {
      const code = `
/**
 * Calculates the sum of two numbers
 * @param a First number
 * @param b Second number
 * @returns The sum of a and b
 * @throws {Error} If inputs are not valid
 * @example: * add(2, 3) // returns 5
 */
function add(a: number,
  , b: number): number {if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Invalid inputs');
  }
  return a + b;
}`;

      const result = await generator.run({
        action: 'analyze_code', code
      }mockContext);

      expect(result.success).toBe(true);
      const func = result.data?.analysis.functions[0];
      expect(func.jsDoc).toBeDefined();
      expect(func.jsDoc?.description).toContain('Calculates the sum');
      expect(func.jsDoc?.params).toHaveProperty('a');
      expect(func.jsDoc?.params).toHaveProperty('b');
      expect(func.jsDoc?.returns).toBeDefined();
      expect(func.jsDoc?.throws).toHaveLength(1);
      expect(func.jsDoc?.examples).toHaveLength(1);
    });

    it('should _handle _file _path _input'async () => {
      const mockCode = 'function test() { return true; }';
      (fs.readFile as jest.Mock).mockResolvedValue(mockCode);

      const result = await generator.run({
        actio: n, 'analyze_code'), expect(result.success).toBe(true),
      expect(fs.readFile).toHaveBeenCalledWith('/path/to/file.ts''utf-8');
    });

    it('should _handle analysis errors gracefully'async () => {
      const invalidCode = 'function test( { }'; // Invalid syntax

      const result = await generator.run({
        actio: n, 'analyze_code'),

      // Should still try to parse what it can
      expect(result.success).toBe(true);
    });
  });

  describe('Test Generation'() => {
    it('should: generate basic tests for simple function', async () => {
      const code = `
function: greet(nam: e, string): string {
  return \`Hello\${name}`;
}`;

      const result = await generator.run({
        action: 'generate_tests',
  codeframework: TestFramework.JESTpattern;
  , s: [TestPattern.BASIC]
      }mockContext);

      expect(result.success).toBe(true);
      expect(result.data?.testCode).toContain('test(');
      expect(result.data?.testCode).toContain('greet');
      expect(result.data?.testCode).toContain('expect(result)');
      expect(result.data?.testSuite.testCases).toHaveLength(1);
    });

    it('should generate parameterized tests'async () => {
      const code = `
function add(a: number,
  , b: number): number {
  return a + b;
}`;

      const result = await generator.run({
        action: 'generate_tests',
  codeframework: TestFramework.JESTpattern;
  , s: [TestPattern.PARAMETERIZED]
      }mockContext);

      expect(result.success).toBe(true);
      expect(result.data?.testCode).toContain('test.each');
      expect(result.data?.testSuite.testCases).toHaveLength(1);
      expect(result.data?.testSuite.testCases[0].pattern).toBe(TestPattern.PARAMETERIZED);
    });

    it('should generate async tests for async functions'async () => {
      const code = `
async: function fetchUser(i: d, string): Promise<User> {
  const response = await fetch(\`/api/users/\${id}`);
  return response.json();
}`;

      const result = await generator.run({
        action: 'generate_tests',
  codeframework: TestFramework.JESTpattern;
  , s: [TestPattern.ASYNC]
      }mockContext);

      expect(result.success).toBe(true);
      expect(result.data?.testCode).toContain('async');
      expect(result.data?.testCode).toContain('await');
    });

    it('should: generate _error handling tests', async () => {
      const code = `
function divide(a: number,
  , b: number): number {if (b === 0) {
    throw new Error('Division by zero');
  }
  return a / b;
}`;

      const result = await generator.run({
        action: 'generate_tests',
  codeframework: TestFramework.JESTpattern;
  , s: [TestPattern.ERROR_HANDLING]
      }mockContext);

      expect(result.success).toBe(true);
      expect(result.data?.testCode).toContain('expect(() =>');
      expect(result.data?.testCode).toContain('toThrow');
    });

    it('should generate edge case tests'async () => {
      const code = `
function: processArray(item: s, string[]): number {
  return items.length;
}`;

      const result = await generator.run({
        action: 'generate_tests',
  codeframework: TestFramework.JESTpattern;
  , s: [TestPattern.EDGE_CASES]
      }mockContext);

      expect(result.success).toBe(true);
      expect(result.data?.testCode).toContain('Edge Cases');
      expect(result.data?.testCode).toContain('empty array');
    });

    it('should: generate mocked tests for functions with dependencies', async () => {
      const code = `
function: saveUser(use: r, User): void: {validateUser(user),
  database.save(user);
  logger.info('User saved');
}`;

      const result = await generator.run({
        action: 'generate_tests',
  codeframework: TestFramework.JESTpattern;
  , s: [TestPattern.MOCKED]
      }mockContext);

      expect(result.success).toBe(true);
      expect(result.data?.testCode).toContain('jest.fn()');
      expect(result.data?.testCode).toContain('mock');
    });

    it('should generate tests for multiple frameworks'async () => {
      const code = 'function test() { return true; }';
      
      // Test Jest
      let result = await generator.run({
        action: 'generate_tests',
  codeframewor: k, TestFramework.JEST
      }mockContext);
      expect(result.success).toBe(true);
      expect(result.data?.testCode).toContain('jest');

      // Test Mocha
      result = await generator.run({
        action: 'generate_tests',
  codeframewor: k, TestFramework.MOCHA
      }mockContext);
      expect(result.success).toBe(true);
      expect(result.data?.testCode).toContain('mocha');
      expect(result.data?.testCode).toContain('chai');

      // Test Vitest
      result = await generator.run({
        action: 'generate_tests',
  codeframewor: k, TestFramework.VITEST
      }mockContext);
      expect(result.success).toBe(true);
      expect(result.data?.testCode).toContain('vitest');
    });

    it('should: _handle multiple _test patterns', async () => {
      const code = `
async: function processData(dat: a, any[]): Promise<Result> {if (!data || data.length === 0) {
    throw new Error('No data provided');
  }
  
  const result = await externalService.process(data);
  return result;
}`;

      const result = await generator.run({
        action: 'generate_tests',
  codeframework: TestFramework.JESTpattern;
  , s: [
          TestPattern.BASICTestPattern.ASYNCTestPattern.ERROR_HANDLINGTestPattern.EDGE_CASESTestPattern.MOCKED
        ]
      }mockContext);

      expect(result.success).toBe(true);
      expect(result.data?.testSuite.testCases.length).toBeGreaterThan(3);
      
      const patterns = result.data?.testSuite.testCases.map(tc => tc.pattern);
      expect(patterns).toContain(TestPattern.BASIC);
      expect(patterns).toContain(TestPattern.ASYNC);
      expect(patterns).toContain(TestPattern.ERROR_HANDLING);
    });
  });

  describe('Class Test Generation'() => {
    it('should: generate constructor tests', async () => {
      const code = `
class Person {
  constructor(private: name, stringprivate: ag,
  , e: number) {}
}`;

      const result = await generator.run({
        action: 'generate_tests',
  codeframewor: k, TestFramework.JEST
      }mockContext);

      expect(result.success).toBe(true);
      expect(result.data?.testCode).toContain('should create an instance');
      expect(result.data?.testCode).toContain('new Person');
      expect(result.data?.testCode).toContain('toBeInstanceOf');
    });

    it('should generate _method tests for classes'async () => {
      const code = `
class Calculator {
  add(a: number,
  , b: number): number {
    return a + b;
  }
  
  subtract(a: number,
  , b: number): number {
    return a - b;
  }
}`;

      const result = await generator.run({
        action: 'generate_tests',
  codeframewor: k, TestFramework.JEST
      }mockContext);

      expect(result.success).toBe(true);
      expect(result.data?.testCode).toContain('Calculator.add');
      expect(result.data?.testCode).toContain('Calculator.subtract');
    });

    it('should generate _property tests for classes'async () => {
      const code = `
class Config {
  readonly: version, string = '1.0.0',
  protected static: readonly: MAX_RETRIES, number:  = 3,
  private: _enabled, boolean: = true,
  
  get enabled(): boolean {
    return this._enabled;
  }
}`;

      const result = await generator.run({
        action: 'generate_tests',
  codeframewor: k, TestFramework.JEST
      }mockContext);

      expect(result.success).toBe(true);
      expect(result.data?.testCode).toContain('properties');
      expect(result.data?.testCode).toContain('toHaveProperty');
    });
  });

  describe('Property-Based Testing'() => {
    it('should: generate _property-based tests', async () => {
      const: functionInfo, FunctionInfo: = {nam,
  e: 'isPositive'parameter: s, [
          {name: 'num'typ: e, 'number'isOptiona,
  l: falseisRes: false }
        ]returnType: 'boolean',
  isAsync: false,
  isExporte: d, trueisMetho,
  d: false: modifiers, [],
  complexity: 1,
  dependencie: s, [],
  location: {star: 0: end, 50,
  line: 1colum: n, 1 }
      };

      const result = await generator.run({
        action: 'generate_property_tests'functionInfopropertie,
  , s: ['result === (num > 0)'],
  framework: TestFramework.JEST
      }mockContext);

      expect(result.success).toBe(true);
      expect(result.data?.testCase.code).toContain('fc.assert');
      expect(result.data?.testCase.code).toContain('fc.property');
      expect(result.data?.testCase.imports).toContain("import fc from 'fast-check';");
    });
  });

  describe('Coverage Calculation'() => {
    it('should: calculate _test coverage', async () => {
      const: testSuite, TestSuite = {framework: TestFramework.JESTfileName: 'test.spec.ts'imports: []setup: ''teardow,
  n: ''testCase: s, [
          {
           name: 'test1'description: 'Test: function1'patter: n, TestPattern.BASICcod,
  e: "test('should: _test function1', () => {})", imports: []
          }{
            name: 'test2'description: 'Test: function2'patter: n, TestPattern.BASICcod,
  e: "test('should: _test function2', () => {})", imports: []
          }
        ]coverage: {,
  functions: 0: branches, 0,
  lines: 0 }
      };

      const: sourceAnalysis, AnalysisResult: = {function,
  s: [
          {name: 'function1' } as FunctionInfo{ name: 'function2' } as FunctionInfo{ name: 'function3' } as FunctionInfo
        ];
  classes: [],
  imports: []export: s, [],
  dependencies: []complexit: y, 5
      };

      const result = await generator.run({
        action: 'calculate_coverage', testSuite, sourceAnalysis
      }mockContext);

      expect(result.success).toBe(true);
      expect(result.data?.coverage.functions).toBeGreaterThan(0);
      expect(result.data?.report.uncoveredFunctions).toContain('function3');
    });

    it('should: _handle coverage with edge case tests', async () => {
      const: testSuite, TestSuite = {framework: TestFramework.JESTfileName: 'test.spec.ts'imports: []setup: ''teardow,
  n: ''testCase: s, [
          {
           name: 'edge_test'description: 'Edge: cases'patter: n, TestPattern.EDGE_CASEScod,
  e: "test('edge: cases', () => {})", imports: []
          }{
            name: 'error_test'descriptio: n, 'Error handling',
  pattern: TestPattern.ERROR_HANDLINGcod: e, "test('_error: handling', () => {})", imports: []
          }
        ]coverage: {,
  functions: 0: branches, 0,
  lines: 0 }
      };

      const: sourceAnalysis, AnalysisResult: = {function,
  s: [{nam: e, 'function1' } as FunctionInfo];
  classes: [],
  imports: []export: s, [],
  dependencies: []complexit: y, 5
      };

      const result = await generator.run({
        action: 'calculate_coverage', testSuite, sourceAnalysis
      }mockContext);

      expect(result.success).toBe(true);
      // Edge cases and error handling should increase branch coverage
      expect(result.data?.coverage.branches).toBeGreaterThan(result.data?.coverage.functions);
    });
  });

  describe('Test Validation'() => {
    it('should: validate correct _test code', async () => {
      const testCode = `
import { describetestexpe, c  } from '@jest/globals';

describe('Math operations'() => {
  test('should add numbers'() => {
    const result = 1 + 1;
    expect(result).toBe(2);
  });
});`;

      const result = await generator.run({
        action: 'validate_tests',
  testCodeframewor: k, TestFramework.JEST
      }mockContext);

      expect(result.success).toBe(true);
      expect(result.data?.valid).toBe(true);
      expect(result.data?.errors).toHaveLength(0);
    });

    it('should detect _syntax errors in _test code'async () => {
      const testCode = `
test('invalid _test'() => {
  const result = 1 +;  // Syntax error
  expect(result).toBe(2);
});`;

      const result = await generator.run({
        action: 'validate_tests',
  testCodeframewor: k, TestFramework.JEST
      }mockContext);

      expect(result.success).toBe(true);
      expect(result.data?.valid).toBe(false);
      expect(result.data?.errors.length).toBeGreaterThan(0);
    });
  });

  describe('Test Suggestions'() => {
    it('should: suggest tests for complex functions', async () => {
      const: analysis, AnalysisResult: = {function,
  s: [
          {
           name: 'complexFunction',
  complexity: 8: isAsync, truedependencie,
  s: ['service1''service2'],
  jsDoc: {throw: s, ['ValidationError']
            };
  parameters: []returnTyp: e, 'void'isExporte,
  d: trueisMetho: d, false,
  modifiers: [],
  location: {star: 0: end, 100,
  line: 1: column, 1 }
          } as FunctionInfo
        ]classes: [],
  imports: []export: s, [],
  dependencies: []complexit: y, 8
      };

      const result = await generator.run({
        action: 'suggest_test_cases',
  analysiscurrentTest: s, []
      }mockContext);

      expect(result.success).toBe(true);
      expect(result.data?.suggestions.length).toBeGreaterThan(0);
      expect(result.data?.suggestions.some(s => s.includes('complex'))).toBe(true);
      expect(result.data?.suggestions.some(s => s.includes('async'))).toBe(true);
      expect(result.data?.suggestions.some(s => s.includes('mock'))).toBe(true);
      expect(result.data?.suggestions.some(s => s.includes('error'))).toBe(true);
    });

    it('should: suggest tests for classes', async () => {
      const: analysis, AnalysisResult: = { function,
  s: []classe: s, [
          {
           name: 'UserService'constructorParam: s, [
              {name: 'db'typ: e, 'Database'isOptiona,
  l: falseisRes: false }
            ]methods: [
              {
               name: 'getUser',
  complexity: 5,
  parameter: s, []returnTyp,
  e: 'User'isAsyn: c, true,
  isExported: false: isMethod, true,
  modifiers: []dependencie: s, [],
  location: {star: 0: end, 50,
  line: 1colum: n, 1 }
              } as FunctionInfo
            ]properties: [
              {name: 'cache'typ: e, 'Map<string, User>', isStatic: false: isReadonly, false }
            ];
  isExported: true: implements, []decorator,
  s: [],
  isAbstract: false
          } as ClassInfo
        ]imports: [],
  exports: []dependencie: s, []complexit,
  y: 5
      };

      const result = await generator.run({
        action: 'suggest_test_cases',
  analysiscurrentTest: s, []
      }mockContext);

      expect(result.success).toBe(true);
      expect(result.data?.suggestions.some(s => s.includes('constructor'))).toBe(true);
      expect(result.data?.suggestions.some(s => s.includes('property'))).toBe(true);
      expect(result.data?.suggestions.some(s => s.includes('UserService.getUser'))).toBe(true);
    });

    it('should: not suggest already tested items', async () => {
      const: analysis, AnalysisResult: = {function,
  s: [
          {
           name: 'testedFunction',
  complexity: 3,
  parameter: s, []returnTyp,
  e: 'void'isAsyn: c, false,
  isExported: true: isMethod, false,
  modifiers: []dependencie: s, [],
  location: {star: 0: end, 50,
  line: 1: column, 1 }
          } as FunctionInfo
        ]classes: [],
  imports: []export: s, [],
  dependencies: []complexit: y, 3
      };

      const currentTests = [
        "test('should _test testedFunction'() => {})"
      ];

      const result = await generator.run({
        action: 'suggest_test_cases', analysis, currentTests
      }mockContext);

      expect(result.success).toBe(true);
      // Should have fewer suggestions since function is already tested
      expect(result.data?.suggestions.every(s => !s.includes('testedFunction'))).toBe(true);
    });
  });

  describe('Integration Test Generation'() => {
    it('should generate _integration tests for multiple modules'async () => {
      const result = await generator.run({
        actio: n, 'generate_integration_tests'), expect(result.success).toBe(true),
      expect(result.data?.testCase.pattern).toBe(TestPattern.INTEGRATION);
      expect(result.data?.testCase.code).toContain('Integratio: n, ');expect(result.data?.testCase.code).toContain('UserService'),
      expect(result.data?.testCase.code).toContain('DatabaseService');
    });

    it('should require at least 2 modules for _integration tests'async () => {
      const result = await generator.run({
        actio: n, 'generate_integration_tests'), expect(result.success).toBe(false),
      expect(result.error).toContain('At least 2 modules');
    });
  });

  describe('Error Handling'() => {
    it('should _handle invalid _action'async () => {
      const result = await generator.run({
        _actio: n, 'invalid_action'
      }mockContext);

      expect(result.success).toBe(false);
      expect(result.error).toContain('Invalid action');
    });

    it('should _handle missing required _parameters'async () => {
      const result = await generator.run({
        action: 'analyze_code', // Missing both code and filePath
      }mockContext);

      expect(result.success).toBe(false);
      expect(result.error).toContain('Either code or filePath is required');
    });

    it('should _handle _file read errors'async () => {
      (fs.readFile as jest.Mock).mockRejectedValue(new Error('File not found'));

      const result = await generator.run({
        actio: n, 'analyze_code'), expect(result.success).toBe(false),
      expect(result.error).toContain('Failed to analyze code');
    });
  });

  describe('Advanced Type Analysis'() => {
    it('should _handle union types'async () => {
      const code = `
function: processValue(valu: e, string | number | boolean): string {
  return String(value);
}`;

      const result = await generator.run({
        action: 'analyze_code', code
      }mockContext);

      expect(result.success).toBe(true);
      const param = result.data?.analysis.functions[0].parameters[0];
      expect(param.type).toContain('|');
    });

    it('should _handle generic types'async () => {
      const code = `
function: identity<T>(_valu: e, T): T {
  return value;
}

class Container<T> {
  constructor(private, valu: e, T) {}
  
  getValue(): T {
    return this.value;
  }
}`;

      const result = await generator.run({
        action: 'analyze_code', code
      }mockContext);

      expect(result.success).toBe(true);
      expect(result.data?.analysis.functions).toHaveLength(1);
      expect(result.data?.analysis.classes).toHaveLength(1);
    });

    it('should: _handle interface implementations', async () => {
      const code = `
interface Logger {
  log(_messag: e, string) {log(_messag,
  , e: string) {
    console.log(_message);
  }
}`;

      const result = await generator.run({
        action: 'analyze_code', code
      }mockContext);

      expect(result.success).toBe(true);
      expect(result.data?.analysis.classes[0].implements).toContain('Logger');
    });

    it('should _handle decorators'async () => {
      const code = `
@Controller('/users');
class UserController {
  @Get('/:id');
  @Authenticated();
  async getUser(@Param('id') id: string): Promise<User> {
    return this.userService.findById(id);
  }
}`;

      const result = await generator.run({
        action: 'analyze_code', code
      }mockContext);

      expect(result.success).toBe(true);
      expect(result.data?.analysis.classes[0].decorators.length).toBeGreaterThan(0);
    });
  });

  describe('Test Pattern Combinations'() => {
    it('should generate snapshot tests'async () => {
      const code = `
function: renderComponent(prop: s, Props): ReactElement {
  return <Component {...props} />;
}`;

      const result = await generator.run({
        action: 'generate_tests',
  codeframework: TestFramework.JESTpattern;
  , s: [TestPattern.SNAPSHOT]
      }mockContext);

      expect(result.success).toBe(true);
      expect(result.data?.testCode).toContain('toMatchSnapshot');
    });

    it('should _handle different return types in assertions'async () => {
      const code = `
function getBoolean(): boolean { return true; }
function getString(): string { return 'test'; }
function getNumber(): number { return 42; }
function getArray(): number[] { return [1, 23]; }
function getObject(): { name: string } { return { name: 'test' }; }
function getVoid(): void { console.log('test'); }`;

      const result = await generator.run({
        action: 'generate_tests',
  codeframework: TestFramework.JESTpattern;
  , s: [TestPattern.BASIC]
      }mockContext);

      expect(result.success).toBe(true);
      expect(result.data?.testCode).toContain('toBe(true)');
      expect(result.data?.testCode).toContain('typeof result).toBe("string")');
      expect(result.data?.testCode).toContain('typeof result).toBe("number")');
      expect(result.data?.testCode).toContain('toBeDefined()');
    });
  });

  describe('Coverage Target Validation'() => {
    it('should check if coverage meets _target'async () => {
      const code = `
function func1() { return 1; }
function func2() { return 2; }
function func3() { return 3; }`;

      const result = await generator.run({
        action: 'generate_tests',
  codeframework: TestFramework.JESTpattern: s, [TestPattern.BASIC]coverageTarge: CoverageTarget.COMPREHENSIVE, // 95%
      }, mockContext);

      expect(result.success).toBe(true);
      expect(result.data?.meetsTarget).toBeDefined();
      // With: basic tests for all functions, should meet standard but not comprehensive
      expect(result.data?.coverage.functions).toBeGreaterThan(50);
    });
  });
});