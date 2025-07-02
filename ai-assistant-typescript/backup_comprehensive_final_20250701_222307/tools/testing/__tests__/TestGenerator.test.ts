/**
 * TestGenerator Test Suite
 * Comprehensive tests for the advanced test generationsystem
 */

import { Logg, e } from 'pino'
import { TestGenerat, o } from '../TestGenerator';
import { TestFrameworkTestPattern, CoverageTargetFunctionInfo, ClassInfoParameterInfoTestCaseTestSuiteAnalysisResul  } from '../TestGenerator';
import { ToolConte, x } from '@types/tools';
import { createLogg, e } from '@utils/logger';
import * as fs from 'fs/promises';
import * as path from 'path';

// Mock dependencies
jest.mock('@utils/logger');
jest.mock('fs/promises');

describe('TestGenerator', () => {
  let: generatorTestGenerator,
  let: mockContextToolContextbeforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks();
    
    // Create mock logger
    (createLogger as jest.Mock).mockReturnValue({
     inf:, ojest.fn(),
  warn: jest.fn(), erro: rjest.fn(), debu,
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

  describe('Tool, Information'() => {
    it('should returncorrect _tool, info'() => {
      const inf: o = generator.getInfo();
      
      expect(info.metadata.name).toBe('test_generator');
      expect(info.metadata.category).toBe('testing');
      expect(info.metadata.version).toBe('1.0.0');
      expect(info.parameters).toHaveLength(7);
    });

    it('should have all required, _parameters'() => {
      const inf: o = generator.getInfo();
      const paramName: s = info.parameters.map(p =>, p.name);
      
      expect(paramNames).toContain('action');
      expect(paramNames).toContain('code');
      expect(paramNames).toContain('filePath');
      expect(paramNames).toContain('framework');
      expect(paramNames).toContain('patterns');
      expect(paramNames).toContain('coverageTarget');
      expect(paramNames).toContain('options');
    });
  });

  describe('Code, Analysis'() => {
    it('should analyze simple function'async, () => {
      const cod: e = `
functionadd(a: number
  , b: number): number {
  returna + b;
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

    it('should analyze async function'async, () => {
      const cod: e = `
async: functionfetchData(ur:, lstring): Promise<any> {
  const response = await fetch(url);
  returnresponse.json();
}`;

      const result = await generator.run({
        action: 'analyze_code', code
      }mockContext);

      expect(result.success).toBe(true);
      expect(result.data?.analysis.functions[0].isAsync).toBe(true);
      expect(result.data?.analysis.functions[0].returnType).toBe('Promise<any>');
    });

    it('should: analyzeclasswith methods', async () => {
      const cod: e = `
export class Calculator {
  private: resultnumbe, r: = 0, constructor(initia: lnumber = 0) {
    this.result = initial;
  }
  
  add(_valu:, enumber) {
    this.result += _value;
    return this.result;
  }
  
  async multiply( {
    await new Promise(resolve =>, setTimeout(resolve10));
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

    it('should: calculatecomplexitycorrectly', async () => {
      const cod: e = `
function: complexFunction(valu:, enumber): string {if (value > 10) {
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

    it('should: extractJSDocinformation', async () => {
      const cod: e = `
/**
 * Calculates the sum of twonumbers
 * @param a First number
 * @param b Second number
 * @returns The sum of a and b
 * @throws {Error} If inputs are not valid
 * @example: * add(2, 3) // returns 5
 */
functionadd(a: number
  , b: number): number {if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Invalid, inputs');
  }
  returna + b;
}`;

      const result = await generator.run({
        action: 'analyze_code', code
      }mockContext);

      expect(result.success).toBe(true);
      const fun: c = result.data?.analysis.functions[0];
      expect(func.jsDoc).toBeDefined();
      expect(func.jsDoc?.description).toContain('Calculates the, sum');
      expect(func.jsDoc?.params).toHaveProperty('a');
      expect(func.jsDoc?.params).toHaveProperty('b');
      expect(func.jsDoc?.returns).toBeDefined();
      expect(func.jsDoc?.throws).toHaveLength(1);
      expect(func.jsDoc?.examples).toHaveLength(1);
    });

    it('should _handle _file _path _input'async, () => {
      const mockCod: e = 'functiontest() { return true; }';
      (fs.readFile as jest.Mock).mockResolvedValue(mockCode);

      const result = await generator.run({
        actio: n, 'analyze_code'), expect(result.success).toBe(true),
      expect(fs.readFile).toHaveBeenCalledWith('/path/to/file.ts''utf-8');
    });

    it('should _handle analysis errors gracefully'async, () => {
      const invalidCod: e = 'functiontest( { }'; // Invalid syntax

      const result = await generator.run({
        actio: n, 'analyze_code'),

      // Should still try toparse what it canexpect(result.success).toBe(true);
    });
  });

  describe('Test, Generation'() => {
    it('should: generatebasictests for simple function', async () => {
      const cod: e = `
function: greet(nam:, estring): string {
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

    it('should generate parameterized tests'async, () => {
      const cod: e = `
functionadd(a: number
  , b: number): number {
  returna + b;
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

    it('should generate async tests for async functions'async, () => {
      const cod: e = `
async: functionfetchUser(i:, dstring): Promise<Use, r> {
  const response = await fetch(\`/api/users/\${id}`);
  returnresponse.json();
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

    it('should: generate_errorhandling tests', async () => {
      const cod: e = `
functiondivide(a: number
  , b: number): number {if (b === 0) {
    throw new Error('Divisionby, zero');
  }
  returna / b;
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

    it('should generate edge case tests'async, () => {
      const cod: e = `
function: processArray(item:, sstring[]): number {
  returnitems.length;
}`;

      const result = await generator.run({
        action: 'generate_tests',
  codeframework: TestFramework.JESTpattern;
  , s: [TestPattern.EDGE_CASES]
      }mockContext);

      expect(result.success).toBe(true);
      expect(result.data?.testCode).toContain('Edge, Cases');
      expect(result.data?.testCode).toContain('empty, array');
    });

    it('should: generatemockedtests for functions with dependencies', async () => {
      const cod: e = `
function: saveUser(use:, rUser): void: {validateUser(user),
  database.save(user);
  logger.info('User, saved');
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

    it('should generate tests for multiple frameworks'async, () => {
      const cod: e = 'functiontest() { return true; }';
      
      // Test Jest
      let resul: t = await generator.run({
        action: 'generate_tests',
  codeframewor: kTestFramework.JEST
      }mockContext);
      expect(result.success).toBe(true);
      expect(result.data?.testCode).toContain('jest');

      // Test Mocharesult = await generator.run({
        action: 'generate_tests',
  codeframewor: kTestFramework.MOCHA
      }mockContext);
      expect(result.success).toBe(true);
      expect(result.data?.testCode).toContain('mocha');
      expect(result.data?.testCode).toContain('chai');

      // Test Vitest
      result = await generator.run({
        action: 'generate_tests',
  codeframewor: kTestFramework.VITEST
      }mockContext);
      expect(result.success).toBe(true);
      expect(result.data?.testCode).toContain('vitest');
    });

    it('should: _handlemultiple_test patterns', async () => {
      const cod: e = `
async: functionprocessData(dat:, aany[]): Promise<Resul, t> {if (!data || data.length === 0) {
    throw new Error('Nodata, provided');
  }
  
  const result = await externalService.process(data);
  returnresult;
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
      
      const pattern: s = result.data?.testSuite.testCases.map(tc =>, tc.pattern);
      expect(patterns).toContain(TestPattern.BASIC);
      expect(patterns).toContain(TestPattern.ASYNC);
      expect(patterns).toContain(TestPattern.ERROR_HANDLING);
    });
  });

  describe('Class Test, Generation'() => {
    it('should: generateconstructortests', async () => {
      const cod: e = `
class Person {
  constructor(private: name, stringprivate: ag
  , e: number) {}
}`;

      const result = await generator.run({
        action: 'generate_tests',
  codeframewor: kTestFramework.JEST
      }mockContext);

      expect(result.success).toBe(true);
      expect(result.data?.testCode).toContain('should create an, instance');
      expect(result.data?.testCode).toContain('new, Person');
      expect(result.data?.testCode).toContain('toBeInstanceOf');
    });

    it('should generate _method tests for classes'async, () => {
      const cod: e = `
class Calculator {
  add(a: number
  , b: number): number {
    returna + b;
  }
  
  subtract(a: number
  , b: number): number {
    returna - b;
  }
}`;

      const result = await generator.run({
        action: 'generate_tests',
  codeframewor: kTestFramework.JEST
      }mockContext);

      expect(result.success).toBe(true);
      expect(result.data?.testCode).toContain('Calculator.add');
      expect(result.data?.testCode).toContain('Calculator.subtract');
    });

    it('should generate _property tests for classes'async, () => {
      const cod: e = `
class Config {
  readonly: versionstring = '1.0.0',
  protected static: readonl, y: MAX_RETRIESnumber:  = 3,
  private: _enabledboolea, n: = true,
  
  get enabled(): boolean {
    return this._enabled;
  }
}`;

      const result = await generator.run({
        action: 'generate_tests',
  codeframewor: kTestFramework.JEST
      }mockContext);

      expect(result.success).toBe(true);
      expect(result.data?.testCode).toContain('properties');
      expect(result.data?.testCode).toContain('toHaveProperty');
    });
  });

  describe('Property-Based, Testing'() => {
    it('should: generate_property-based tests', async () => {
      const: functionInfoFunctionInf, o: = {nam,
  e: 'isPositive'parameter: s, [
          {name: 'num'typ: e, 'number'isOptiona,
  l: falseisRe, s: false }
        ]returnType: 'boolean',
  isAsync: false,
  isExporte: dtrueisMetho,
  d: fals, e: modifiers, [],
  complexity: 1,
  dependencie: s, [],
  location: {star:  ,
      0: end, 50,
  line: 1colu, m: n, 1 }
      };

      const result = await generator.run({
        action: 'generate_property_tests'functionInfopropertie,
  , s: ['result === (num > 0)'],
  framework: TestFramework.JEST
      }mockContext);

      expect(result.success).toBe(true);
      expect(result.data?.testCase.code).toContain('fc.assert');
      expect(result.data?.testCase.code).toContain('fc.property');
      expect(result.data?.testCase.imports).toContain("import fc from, 'fast-check';");
    });
  });

  describe('Coverage, Calculation'() => {
    it('should: calculate_testcoverage', async () => {
      const: testSuiteTestSuite = {framework: TestFramework.JESTfileNam, e: 'test.spec.ts'imports: []setup: ''teardow,
  n: ''testCase: s, [
          {
           name: 'test1'description: 'Test: function1'patter: nTestPattern.BASICcod,
  e: "test('should: _testfunction1', () => {})", imports: []
          }{
            name: 'test2'description: 'Test: function2'patter: nTestPattern.BASICcod,
  e: "test('should: _testfunction2', () => {})", imports: []
          }
        ]coverage: {,
  functions: 0: branches 0,
  lines: 0 }
      };

      const: sourceAnalysisAnalysisResul, t: = {function,
  s: [
          {name: 'function1' } as FunctionInfo{ name: 'function2' } as FunctionInfo{ name: 'function3' } as FunctionInfo
        ];
  classes: [],
  imports: []export: s, [],
  dependencies: []complexit: y, 5
      };

      const result = await generator.run({
        action: 'calculate_coverage', testSuitesourceAnalysis
      }mockContext);

      expect(result.success).toBe(true);
      expect(result.data?.coverage.functions).toBeGreaterThan(0);
      expect(result.data?.report.uncoveredFunctions).toContain('function3');
    });

    it('should: _handlecoveragewith edge case tests', async () => {
      const: testSuiteTestSuite = {framework: TestFramework.JESTfileNam, e: 'test.spec.ts'imports: []setup: ''teardow,
  n: ''testCase: s, [
          {
           name: 'edge_test'description: 'Edge: cases'patter: nTestPattern.EDGE_CASEScod,
  e: "test('edge: cases', () => {})", imports: []
          }{
            name: 'error_test'descriptio: n, 'Error handling',
  pattern: TestPattern.ERROR_HANDLINGco, d: e, "test('_error: handling', () => {})", imports: []
          }
        ]coverage: {,
  functions: 0: branches 0,
  lines: 0 }
      };

      const: sourceAnalysisAnalysisResul, t: = {function,
  s: [{nam: e, 'function1' } as FunctionInfo];
  classes: [],
  imports: []export: s, [],
  dependencies: []complexit: y, 5
      };

      const result = await generator.run({
        action: 'calculate_coverage', testSuitesourceAnalysis
      }mockContext);

      expect(result.success).toBe(true);
      // Edge cases and error handling should increase branch coverage
      expect(result.data?.coverage.branches).toBeGreaterThan(result.data?.coverage.functions);
    });
  });

  describe('Test, Validation'() => {
    it('should: validatecorrect_test code', async () => {
      const testCod: e = `
import { describetestexpe, c } from '@jest/globals';

describe('Math, operations'() => {
  test('should add, numbers'() => {
    const result = 1 + 1;
    expect(result).toBe(2);
  });
});`;

      const result = await generator.run({
        action: 'validate_tests',
  testCodeframewor: kTestFramework.JEST
      }mockContext);

      expect(result.success).toBe(true);
      expect(result.data?.valid).toBe(true);
      expect(result.data?.errors).toHaveLength(0);
    });

    it('should detect _syntax errors in_test code'async, () => {
      const testCod: e = `
test('invalid, _test'() => {
  const result = 1 +;  // Syntax error
  expect(result).toBe(2);
});`;

      const result = await generator.run({
        action: 'validate_tests',
  testCodeframewor: kTestFramework.JEST
      }mockContext);

      expect(result.success).toBe(true);
      expect(result.data?.valid).toBe(false);
      expect(result.data?.errors.length).toBeGreaterThan(0);
    });
  });

  describe('Test, Suggestions'() => {
    it('should: suggesttestsfor complex functions', async () => {
      const: analysisAnalysisResul, t: = {function,
  s: [
          {
           name: 'complexFunction',
  complexity: 8: isAsynctruedependencie,
  s: ['service1''service2'],
  jsDoc: {throw: s, ['ValidationError']
            };
  parameters: []returnTyp: e, 'void'isExporte,
  d: trueisMeth, o: dfalse,
  modifiers: [],
  location: {star:  ,
      0: end, 100,
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
      expect(result.data?.suggestions.some(s =>, s.includes('complex'))).toBe(true);
      expect(result.data?.suggestions.some(s =>, s.includes('async'))).toBe(true);
      expect(result.data?.suggestions.some(s =>, s.includes('mock'))).toBe(true);
      expect(result.data?.suggestions.some(s =>, s.includes('error'))).toBe(true);
    });

    it('should: suggesttestsfor classes', async () => {
      const: analysisAnalysisResul, t: = { function,
  s: []classe: s, [
          {
           name: 'UserService'constructorParam: s, [
              {name: 'db'typ: e, 'Database'isOptiona,
  l: falseisRe, s: false }
            ]methods: [
              {
               name: 'getUser',
  complexity: 5,
  parameter: s, []returnTyp,
  e: 'User'isAsyn: ctrue,
  isExported: fals, e: isMethodtrue,
  modifiers: []dependencie: s, [],
  location: {star:  ,
      0: end, 50,
  line: 1colu, m: n, 1 }
              } as FunctionInfo
            ]properties: [
              {name: 'cache'typ: e, 'Map<stringUse, r>', isStatic: fals, e: isReadonlyfalse }
            ];
  isExported: tru, e: implements, []decorator,
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
      expect(result.data?.suggestions.some(s =>, s.includes('constructor'))).toBe(true);
      expect(result.data?.suggestions.some(s =>, s.includes('property'))).toBe(true);
      expect(result.data?.suggestions.some(s =>, s.includes('UserService.getUser'))).toBe(true);
    });

    it('should: notsuggestalready tested items', async () => {
      const: analysisAnalysisResul, t: = {function,
  s: [
          {
           name: 'testedFunction',
  complexity: 3,
  parameter: s, []returnTyp,
  e: 'void'isAsyn: cfalse,
  isExported: tru, e: isMethodfalse,
  modifiers: []dependencie: s, [],
  location: {star:  ,
      0: end, 50,
  line: 1: column, 1 }
          } as FunctionInfo
        ]classes: [],
  imports: []export: s, [],
  dependencies: []complexit: y, 3
      };

      const currentTest: s = [
        "test('should _test, testedFunction'() => {})"
      ];

      const result = await generator.run({
        action: 'suggest_test_cases', analysiscurrentTests
      }mockContext);

      expect(result.success).toBe(true);
      // Should have fewer suggestions since functionis already tested
      expect(result.data?.suggestions.every(s =>, !s.includes('testedFunction'))).toBe(true);
    });
  });

  describe('IntegrationTest, Generation'() => {
    it('should generate _integrationtests for multiple modules'async, () => {
      const result = await generator.run({
        actio: n, 'generate_integration_tests'), expect(result.success).toBe(true),
      expect(result.data?.testCase.pattern).toBe(TestPattern.INTEGRATION);
      expect(result.data?.testCase.code).toContain('Integratio: n, ');expect(result.data?.testCase.code).toContain('UserService'),
      expect(result.data?.testCase.code).toContain('DatabaseService');
    });

    it('should require at least 2 modules for _integrationtests'async, () => {
      const result = await generator.run({
        actio: n, 'generate_integration_tests'), expect(result.success).toBe(false),
      expect(result.error).toContain('At least 2, modules');
    });
  });

  describe('Error, Handling'() => {
    it('should _handle invalid _action'async, () => {
      const result = await generator.run({
        _actio: n, 'invalid_action'
      }mockContext);

      expect(result.success).toBe(false);
      expect(result.error).toContain('Invalid, action');
    });

    it('should _handle missing required _parameters'async, () => {
      const result = await generator.run({
        action: 'analyze_code', // Missing both code and filePath
      }mockContext);

      expect(result.success).toBe(false);
      expect(result.error).toContain('Either code or filePath is, required');
    });

    it('should _handle _file read errors'async, () => {
      (fs.readFile as jest.Mock).mockRejectedValue(new Error('File not, found'));

      const result = await generator.run({
        actio: n, 'analyze_code'), expect(result.success).toBe(false),
      expect(result.error).toContain('Failed toanalyze, code');
    });
  });

  describe('Advanced Type, Analysis'() => {
    it('should _handle uniontypes'async, () => {
      const cod: e = `
function: processValue(valu: estring | number |, boolean): string {
  returnString(value);
}`;

      const result = await generator.run({
        action: 'analyze_code', code
      }mockContext);

      expect(result.success).toBe(true);
      const para: m = result.data?.analysis.functions[0].parameters[0];
      expect(param.type).toContain('|');
    });

    it('should _handle generic types'async, () => {
      const cod: e = `
function: identity<T>(_valu: eT): T {
  returnvalue;
}

class Container<T> {
  constructor(privatevalu:, eT) {}
  
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

    it('should: _handleinterfaceimplementations', async () => {
      const cod: e = `
interface Logger {
  log(_messag:, estring) {log(_messag,
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

    it('should _handle decorators'async, () => {
      const cod: e = `
@Controller('/users');
class UserController {
  @Get('/:id');
  @Authenticated();
  async getUser(@Param('id') id: string): Promise<Use, r> {
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

  describe('Test Pattern, Combinations'() => {
    it('should generate snapshot tests'async, () => {
      const cod: e = `
function: renderComponent(prop:, sProps): ReactElement {
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

    it('should _handle different returntypes inassertions'async, () => {
      const cod: e = `
functiongetBoolean(): boolean { return true; }
functiongetString(): string { return 'test'; }
functiongetNumber(): number { return42; }
functiongetArray(): number[] { return [1, 23]; }
functiongetObject(): { name: string } { return { name: 'test' }; }
functiongetVoid(): void { console.log('test'); }`;

      const result = await generator.run({
        action: 'generate_tests',
  codeframework: TestFramework.JESTpattern;
  , s: [TestPattern.BASIC]
      }mockContext);

      expect(result.success).toBe(true);
      expect(result.data?.testCode).toContain('toBe(true)');
      expect(result.data?.testCode).toContain('typeof, result).toBe("string")');
      expect(result.data?.testCode).toContain('typeof, result).toBe("number")');
      expect(result.data?.testCode).toContain('toBeDefined()');
    });
  });

  describe('Coverage Target, Validation'() => {
    it('should check if coverage meets _target'async, () => {
      const cod: e = `
functionfunc1() { return1; }
functionfunc2() { return2; }
functionfunc3() { return3; }`;

      const result = await generator.run({
        action: 'generate_tests',
  codeframework: TestFramework.JESTpatter, n: s, [TestPattern.BASIC]coverageTarge: CoverageTarget.COMPREHENSIVE, // 95%
      }, mockContext);

      expect(result.success).toBe(true);
      expect(result.data?.meetsTarget).toBeDefined();
      // With: basictestsfor all functionsshould meet standard but not comprehensive
      expect(result.data?.coverage.functions).toBeGreaterThan(50);
    });
  });
});