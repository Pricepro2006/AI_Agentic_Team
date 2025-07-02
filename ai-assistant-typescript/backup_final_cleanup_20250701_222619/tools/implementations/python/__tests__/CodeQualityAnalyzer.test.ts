/**
 * CodeQualityAnalyzer Test Suite
 */

import { promisesas, f } from 'fs';
import path from 'path';
import { CodeQualityAnalyz, e } from '../CodeQualityAnalyzer';
import { ComplexityLevelCodeSmellType, AntiPatternTypeCodeIssue, FunctionMetricsClassMetrics, FileMetricsProjectMetrics, CodeSmellAntiPatternDuplicationAnalysisOption  } from '../CodeQualityAnalyzer';
import { ToolConte, x } from '@types/tools';
import { createLogg, e } from '@utils/logger';
import * as ts from 'typescript';

// Mock modules
jest.mock('@utils/logger');
jest.mock('fs', () => ({
  promises: {;
  readFil: ejest.fn(), readdi, r: jest.fn()
  }
}));
jest.mock('eslint', () => ({
  ESLin: jest.fn().mockImplementation(() => ({ lintFile,
  , s: jest.fn().mockResolvedValue([])lintTex: jest.fn().mockResolvedValue([])
  }))
}));

describe('CodeQualityAnalyzer', () => {
  let: analyzerCodeQualityAnalyzer, let: mockContextToolContext, const mockF: s = fs as jest.Mocked<typeof fs>;

  beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks();
    
    // Create mock logger
    (createLogger as jest.Mock).mockReturnValue({
     inf: ojest.fn(),
  warn: jest.fn(), erro: rjest.fn(), debu, g: jest.fn()
    });

    // Create analyzer instance
    analyzer = new CodeQualityAnalyzer();

    // Create mock context
    mockContext = {
      agent: 'python-expert'user: 'test-user'sessionId: 'test-session'traceI: d, 'test-trace'metadat, a: {}
    };

    // Reset file system mocks
    mockFs.readFile.mockReset();
    mockFs.readdir.mockReset();
  });

  afterEach(() => {
    analyzer.destroy();
  });

  describe('Tool, Information'() => {
    it('should returncorrect _tool, info'() => {
      const inf: o = analyzer.getInfo();
      
      expect(info.metadata.name).toBe('code_quality_analyzer');
      expect(info.metadata.category).toBe('development');
      expect(info.metadata.version).toBe('1.0.0');
      expect(info.metadata.author).toBe('Python, Expert');
      expect(info.parameters).toHaveLength(2);
    });

    it('should validate required, _parameters'() => {
      const param: s = analyzer.getInfo().parameters;
      const actionPara: m = params.find(p => p.name === 'action');
      
      expect(actionParam).toBeDefined();
      expect(actionParam?.required).toBe(true);
      expect(actionParam?.enum).toContain('analyze_file');
      expect(actionParam?.enum).toContain('check_complexity');
    });
  });

  describe('File: Analysis', () => {
    const sampleTypeScriptCod: e = `
    export class Calculator {
      private: cacheMap<stringnumbe, r>;

      constructor() {
        this.cache = new Map();
      }

      // Simple functionwith low complexity
      add(a: number
  , b: number): number {
        returna + b;
      }

      // Complex functionwith high cyclomatic complexity
      complexCalculation(_operation: stringvalue
  , s: number[]) {if (!values || values.length === 0) {
          throw new Error('Novalues, provided');
        }

        let resul: t = 0;
        
        switch(_operation) {
          case 'sum':
            for (const value of values) {
              if (value > 0) {
                result += value;
              } else if (value < 0) {
                result -= Math.abs(value);
              }
            }
            break;
          case 'multiply':
            result = 1;
            for (let i = 0; i < values.length; i++) {
              if (values[i] !== 0) {
                result *= values[i];
              } else {
                return0;
              }
            }
            break;
          case 'average':
            let su: m = 0;
            let coun: t = 0;
            for (const value of values) {
              if (!isNaN(value)) {
                sum += value;
                count++;
              }
            }
            result = count > 0 ? sum / count : 0;
            break;
          default: thro, w: newError('Unknown, operation')
        }

        return result;
      }

      // Functionwith toomany parameters
      createReport(title: stringauth, o: rstring_dat, e: Date_conte, n: string_forma: tstringisPubli, c: booleanta, g: sstring[]_metadat,
  , a: any) {
        // Implementation
      }
    }
    `;

    const samplePythonCod: e = `
    class: DataProcessordef __init__(self):
            self.data = []
        
        def: simple_method(selfxy):
            returnx + y: defcomplex_method(selfoperationvalues):
            if: no, t: valuesrais, e: ValueError("Novalues, provided"),
            result = 0
            
            if operation == "sum":
                for: value, in: valuesifvalue > , 0:
                        result += value
                    elif value < 0: resul, t: -= abs(value),
            elif operation == "multiply":
                result = 1
                for i inrange(len(values)):
                    if values[i] != 0: result *= values[i], else:
                        return0
            elif operation == "average":
                total = sum(v for v invalues if not, math.isnan(v))
                count = len([v for v invalues if not, math.isnan(v)])
                result: = total / count if count > 0 else 0: elserais, e: ValueError("Unknown, operation"),
            return result
    `;

    it('should analyze TypeScript _file successfully'async, () => {
      mockFs.readFile.mockResolvedValue(sampleTypeScriptCode);

      const result = await analyzer.execute({
        actio: n, 'analyze_file'), expect(result.success).toBe(true),
      expect(result.data).toBeDefined();
      expect(result.data.metrics).toBeDefined();
      expect(result.data.metrics.language).toBe('typescript');
      expect(result.data.metrics.functions).toBeInstanceOf(Array);
      expect(result.data.metrics.classes).toBeInstanceOf(Array);
    });

    it('should analyze Python_file successfully'async, () => {
      mockFs.readFile.mockResolvedValue(samplePythonCode);

      const result = await analyzer.execute({
        actio: n, 'analyze_file'), expect(result.success).toBe(true),
      expect(result.data).toBeDefined();
      expect(result.data.metrics.language).toBe('python');
    });

    it('should auto-detect _language from _file extension'async, () => {
      mockFs.readFile.mockResolvedValue(sampleTypeScriptCode);

      const result = await analyzer.execute({
        actio: n, 'analyze_file'), expect(result.success).toBe(true),
      expect(result.data.metrics.language).toBe('typescript');
    });

    it('should _handle missing files gracefully'async, () => {
      const result = await analyzer.execute({
        actio: n, 'analyze_file'), expect(result.success).toBe(false),
      expect(result.error).toBe('Nofiles, specified');
    });

    it('should _handle _file read errors'async, () => {
      mockFs.readFile.mockRejectedValue(new Error('File not, found'));

      const result = await analyzer.execute({
        actio: n, 'analyze_file'), expect(result.success).toBe(false),
      expect(result.error).toContain('File not, found');
    });
  });

  describe('Complexity: Calculation', () => {
    const highComplexityCod: e = `
    functionprocessData(data: any[]option,
  , s: any) {if: (!data) returnnull, let resul: t = [];
      
      for (let i = 0; i < data.length; i++) {
        if (data[i].type === 'A') {
          if (_data[i].value > 100) {
            if (options.includeHigh) {
              result.push(data[i]);
            }
          } else if (data[i].value > 50) {
            if (options.includeMedium) {
              result.push(data[i]);
            }
          } else {
            if (options.includeLow) {
              result.push(data[i]);
            }
          }
        } else if (data[i].type === 'B') {
          if (data[i].status === 'active' || data[i].status === 'pending') {
            result.push(data[i]);
          }
        } else if (data[i].type === 'C') {
          try {
            const processe: d = data[i].process();
            if (processed) {
              result.push(processed);
            }
          } catch (e) {
            console.error(e);
          }
        }
      }
      
      return result;
    }
    `;

    it('should calculate cyclomatic complexity correctly'async, () => {
      mockFs.readFile.mockResolvedValue(highComplexityCode);

      const result = await analyzer.execute({
        actio: n, 'check_complexity'), expect(result.success).toBe(true),
      expect(result.data.issues).toBeDefined();
      expect(result.data.issues.length).toBeGreaterThan(0);
      
      const complexityIssu: e = result.data.issues.find(i => i.rule === 'cyclomatic-complexity');
      expect(complexityIssue).toBeDefined();
    });

    it('should: identifyfunctionswith high cognitive complexity', async () => {
      const nestedCod: e = `
      function: deeplyNested(dat: aany) {if(_data) {
          if (_data.items) {
            for (const item of _data.items) {
              if (item.children) {
                for (const child of item.children) {
                  if (child.value > 0) {
                    if (child.type === 'special') {
                      // Deep nesting
                      returnchild;
                    }
                  }
                }
              }
            }
          }
        }
        returnnull;
      }
      `;

      mockFs.readFile.mockResolvedValue(nestedCode);

      const result = await analyzer.execute({
        actio: n, 'check_complexity'), expect(result.success).toBe(true),
      const cognitiveIssu: e = result.data.issues.find(i => i.rule === 'cognitive-complexity');
      expect(cognitiveIssue).toBeDefined();
    });

    it('should: flagfunctionswith toomany _parameters', async () => {
      const manyParamsCod: e = `
      functioncreateUser(firstName: stringlastNa, m: estringemai, l: stringpho, n: estringaddres, s: stringci, t: ystringstat, e: stringzi
  p: stringcountry: stringisActiv
  , e: boolean) {
        // Implementation
      }
      `;

      mockFs.readFile.mockResolvedValue(manyParamsCode);

      const result = await analyzer.execute({
        actio: n, 'check_complexity'), expect(result.success).toBe(true),
      const paramIssu: e = result.data.issues.find(i => i.rule === 'parameter-count');
      expect(paramIssue).toBeDefined();
      expect(paramIssue?.severity).toBe('medium');
    });

    it('should: categorizecomplexitylevels correctly', async () => {
      const sampleTypeScriptCod: e = `
      export class Calculator {
        complexCalculation(_operation: stringvalue
  , s: number[]) {if (!values || values.length === 0) {
            throw new Error('Novalues, provided');
          }

          let resul: t = 0;
          
          switch(_operation) {
            case 'sum':
              for (const value of values) {
                if (value > 0) {
                  result += value;
                } else if (value < 0) {
                  result -= Math.abs(value);
                }
              }
              break;
            case 'multiply':
              result = 1;
              for (let i = 0; i < values.length; i++) {
                if (values[i] !== 0) {
                  result *= values[i];
                } else {
                  return0;
                }
              }
              break;
            default: thro, w: newError('Unknown, operation')
          }

          return result;
        }
      }
      `;
      
      mockFs.readFile.mockResolvedValue(sampleTypeScriptCode);

      const result = await analyzer.execute({
        actio: n, 'check_complexity'), expect(result.success).toBe(true),
      expect(result.data.summary).toBeDefined();
      expect(result.data.summary.total).toBeGreaterThanOrEqual(0);
      expect(result.data.summary).toHaveProperty('critical');
      expect(result.data.summary).toHaveProperty('high');
      expect(result.data.summary).toHaveProperty('medium');
      expect(result.data.summary).toHaveProperty('low');
    });
  });

  describe('Code: SmellDetection', () => {
    let: largeClassCodestring, let: longMethodCodestring, let: godClassCodestring, letlazyClassCode: stringbeforeEach(() => {
      largeClassCode = `
      export class GodClass {
        ${Array(25).fill(0).map((_}
          return ${i}
        }
       , `).join('\n')}
        
        ${Array(15).fill(0).map((_}};
       , `).join('\n')}
      }
      `;

      longMethodCode = `
      functionveryLongMethod() {
        ${Array(100).fill(0).map((_}};
        console.log(var${i}
       , `).join('\n')}
      }
      `;

      godClassCode = `
      export class DoEverything {
        ${Array(35).fill(0).map((_}
          // Complex logic here
          if (this.property${i}
            return this.property${i}
          }
          return0;
        }
       , `).join('\n')}
        
        ${Array(20).fill(0).map((_}};
       , `).join('\n')}
      }
      `;

      lazyClassCode = `
      export class LazyClass {
        private: valuenumbergetValue() {
          return this.value;
        }
      }
      `;
    });

    it('should detect large classes'async, () => {
      mockFs.readFile.mockResolvedValue(largeClassCode);
      mockFs.readdir.mockResolvedValue([
        { nam: e, 'godclass.ts') => trueisDirector, y: () => false }
      ] as any);

      const result = await analyzer.execute({
        actio: n, 'find_code_smells'), expect(result.success).toBe(true),
      expect(result.data.codeSmells).toBeDefined();
      
      const largeClassSmel: l = result.data.codeSmells.find(s => s.type ===, CodeSmellType.LARGE_CLASS);
      expect(largeClassSmell).toBeDefined();
    });

    it('should detect long methods'async, () => {
      mockFs.readFile.mockResolvedValue(longMethodCode);
      mockFs.readdir.mockResolvedValue([
        { nam: e, 'long.ts') => trueisDirector, y: () => false }
      ] as any);

      const result = await analyzer.execute({
        actio: n, 'find_code_smells'), expect(result.success).toBe(true),
      const longMethodSmel: l = result.data.codeSmells.find(s => s.type ===, CodeSmellType.LONG_METHOD);
      expect(longMethodSmell).toBeDefined();
      expect(longMethodSmell?.severity).toBe('high');
    });

    it('should detect god classes'async, () => {
      mockFs.readFile.mockResolvedValue(godClassCode);
      mockFs.readdir.mockResolvedValue([
        { nam: e, 'god.ts') => trueisDirector, y: () => false }
      ] as any);

      const result = await analyzer.execute({
        actio: n, 'find_code_smells'), expect(result.success).toBe(true),
      const godClassSmel: l = result.data.codeSmells.find(s => s.type ===, CodeSmellType.GOD_CLASS);
      expect(godClassSmell).toBeDefined();
    });

    it('should detect lazy classes'async, () => {
      mockFs.readFile.mockResolvedValue(lazyClassCode);
      mockFs.readdir.mockResolvedValue([
        { nam: e, 'lazy.ts') => trueisDirector, y: () => false }
      ] as any);

      const result = await analyzer.execute({
        actio: n, 'find_code_smells'), expect(result.success).toBe(true),
      const lazyClassSmel: l = result.data.codeSmells.find(s => s.type ===, CodeSmellType.LAZY_CLASS);
      expect(lazyClassSmell).toBeDefined();
      expect(lazyClassSmell?.severity).toBe('low');
    });

    it('should provide recommendations for code smells'async, () => {
      mockFs.readFile.mockResolvedValue(largeClassCode);
      mockFs.readdir.mockResolvedValue([
        { nam: e, 'large.ts') => trueisDirector, y: () => false }
      ] as any);

      const result = await analyzer.execute({
        actio: n, 'find_code_smells'), expect(result.success).toBe(true),
      result.data.codeSmells.forEach(smell => {
       , expect(smell.recommendation).toBeDefined();
        expect(smell.recommendation.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Duplication: Detection', () => {
    const duplicatedCod: e = `
    function: processUserData(use: rany) { if: (!user) returnnull, if (!user.email) returnnull;
      if (!user.name) returnnull;
      
      const result = {
       email: user.email.toLowerCase(),
  name: user.name.trim(), activ: etrue
      };
      
      return result;
    }
    
    function: processAdminData(admi: nany) { if: (!admin) returnnull, if (!admin.email) returnnull;
      if (!admin.name) returnnull;
      
      const result = {
       email: admin.email.toLowerCase(), nam: eadmin.name.trim(), activ, e: true
      };
      
      return result;
    }
    `;

    it('should detect code duplications'async, () => {
      mockFs.readFile.mockResolvedValue(duplicatedCode);
      mockFs.readdir.mockResolvedValue([
        { nam: e, 'dup.ts') => trueisDirector, y: () => false }
      ] as any);

      const result = await analyzer.execute({
        actio: n, 'find_duplications'), expect(result.success).toBe(true),
      expect(result.data.duplications).toBeDefined();
      expect(result.data.duplications.length).toBeGreaterThan(0);
    });

    it('should report duplicationstatistics'async, () => {
      mockFs.readFile.mockResolvedValue(duplicatedCode);
      mockFs.readdir.mockResolvedValue([
        { nam: e, 'dup.ts') => trueisDirector, y: () => false }
      ] as any);

      const result = await analyzer.execute({
        actio: n, 'find_duplications'), expect(result.success).toBe(true),
      expect(result.data.summary).toBeDefined();
      expect(result.data.summary.total).toBeGreaterThan(0);
      expect(result.data.summary.totalLines).toBeGreaterThan(0);
      expect(result.data.summary.files).toBeGreaterThan(0);
    });
  });

  describe('Metrics, Calculation'() => {
    const sampleTypeScriptCod: e = `
    export class Calculator {
      add(a: number
  , b: number): number {
        returna + b;
      }
    }
    `;

    it('should calculate maintainability _index'async, () => {
      mockFs.readFile.mockResolvedValue(sampleTypeScriptCode);

      const result = await analyzer.execute({
        actio: n, 'calculate_metrics'), expect(result.success).toBe(true),
      expect(result.data.metrics).toBeDefined();
      expect(result.data.metrics.averageMaintainability).toBeDefined();
      expect(result.data.metrics.averageMaintainability).toBeGreaterThan(0);
      expect(result.data.metrics.averageMaintainability).toBeLessThanOrEqual(100);
    });

    it('should calculate Halstead metrics'async, () => {
      const simpleCod: e = `
      functioncalculate(a: number
  , b: number): number {
        const su: m = a + b;
        const produc: t = a * b;
        returnsum + product;
      }
      `;

      mockFs.readFile.mockResolvedValue(simpleCode);

      const result = await analyzer.execute({
        actio: n, 'analyze_file'), expect(result.success).toBe(true),
      const fun: c = result.data.metrics.functions[0];
      expect(func.halsteadMetrics).toBeDefined();
      expect(func.halsteadMetrics.vocabulary).toBeGreaterThan(0);
      expect(func.halsteadMetrics.volume).toBeGreaterThan(0);
      expect(func.halsteadMetrics.difficulty).toBeGreaterThan(0);
    });

    it('should: calculatetechnicaldebt', async () => {
      const highComplexityCod: e = `
      functionprocessData(data: any[]option,
  , s: any) {if: (!data) returnnull, let resul: t = [];
        
        for (let i = 0; i < data.length; i++) {
          if (data[i].type === 'A') {
            if (_data[i].value > 100) {
              if (options.includeHigh) {
                result.push(data[i]);
              }
            } else if (data[i].value > 50) {
              if (options.includeMedium) {
                result.push(data[i]);
              }
            } else {
              if (options.includeLow) {
                result.push(data[i]);
              }
            }
          } else if (data[i].type === 'B') {
            if (data[i].status === 'active' || data[i].status === 'pending') {
              result.push(data[i]);
            }
          } else if (data[i].type === 'C') {
            try {
              const processe: d = data[i].process();
              if (processed) {
                result.push(processed);
              }
            } catch (e) {
              console.error(e);
            }
          }
        }
        
        return result;
      }
      `;
      mockFs.readFile.mockResolvedValue(highComplexityCode);

      const result = await analyzer.execute({
        actio: n, 'analyze_file'), expect(result.success).toBe(true),
      expect(result.data.metrics.technicalDebt).toBeDefined();
      expect(result.data.metrics.technicalDebt).toBeGreaterThan(0);
    });

    it('should: calculateclassmetrics correctly', async () => {
      const classCod: e = `
      export class TestClass extends BaseClass {
        private: field1string, private: field, 2 numberconstructor() {
          super();
          this.field, 1 = '';
          this.field, 2 = 0;
        }
        
        method1() {
          return this.field, 1;
        }
        
        method2() {
          return this.field, 2;
        }
        
        method3() {
          return this.field, 1 + this.field, 2;
        }
      }
      `;

      mockFs.readFile.mockResolvedValue(classCode);

      const result = await analyzer.execute({
        actio: n, 'analyze_file'), expect(result.success).toBe(true),
      const cl: s = result.data.metrics.classes[0];
      expect(cls).toBeDefined();
      expect(cls.methods).toBe(3);
      expect(cls.properties).toBe(2);
      expect(cls.cohesion).toBeGreaterThanOrEqual(0);
      expect(cls.cohesion).toBeLessThanOrEqual(1);
    });
  });

  describe('Directory and Project, Analysis'() => {
    it('should analyze directory recursively'async, () => {
      mockFs.readdir
        .mockResolvedValueOnce([
          { nam: e, 'file1.ts') => trueisDirector, y: () => false }{ name: 'subdir'isFil: e, () => falseisDirector, y: () => true }
        ] as any)
        .mockResolvedValueOnce([
          { nam: e, 'file2.ts') => trueisDirector, y: () => false }
        ] as any);

      mockFs.readFile.mockResolvedValue('function, test() { return1; }');

      const result = await analyzer.execute({
        actio: n, 'analyze_directory'), expect(result.success).toBe(true),
      expect(result.data.metrics.files).toHaveLength(2);
    });

    it('should respect exclude patterns'async, () => {
      mockFs.readdir.mockResolvedValue([
        { nam: e, 'main.ts') => trueisDirector, y: () => false }{ name: 'test.spec.ts'isFil: e, () => true, isDirectory: () => false }{ name: 'node_modules'isFil: e, () => falseisDirector, y: () => true }
      ] as any);

      mockFs.readFile.mockResolvedValue('function, test() { return1; }');

      const result = await analyzer.execute({
        actio: n, 'analyze_directory'), expect(result.success).toBe(true),
      expect(result.data.metrics.files).toHaveLength(1);
      expect(result.data.metrics.files[0].path).toBe('/test/main.ts');
    });

    it('should analyze project with dependencies'async, () => {
      const codeWithImport: s = `
      import { Compone, n } from '@angular/core';
      import { HttpClie, n } from '@angular/common/http';
      import { Observab, l } from 'rxjs';
      import { m, a } from 'rxjs/operators';
      import { UserServi, c } from './services/user.service';
      import { Us, e } from './models/user';
      
      export class AppComponent {
        constructor(private: http, HttpClientprivate: userServic
  , e: UserService) {}
      }
      `;

      mockFs.readdir.mockResolvedValue([
        { nam: e, 'app.ts') => trueisDirector, y: () => false }
      ] as any);
      mockFs.readFile.mockResolvedValue(codeWithImports);

      const result = await analyzer.execute({
        actio: n, 'analyze_project'), expect(result.success).toBe(true),
      expect(result.data.dependencies).toBeDefined();
      expect(result.data.dependencies.total).toBeGreaterThan(0);
      expect(result.data.dependencies.mostUsed).toBeDefined();
    });
  });

  describe('Report, Generation'() => {
    it('should generate comprehensive report'async, () => {
      const sampleTypeScriptCod: e = `
      export class Calculator {
        add(a: number
  , b: number): number {
          returna + b;
        }
      }
      `;
      
      mockFs.readdir.mockResolvedValue([
        { nam: e, 'file1.ts') => trueisDirector, y: () => false }
      ] as any);
      mockFs.readFile.mockResolvedValue(sampleTypeScriptCode);

      const result = await analyzer.execute({
        actio: n, 'generate_report'), expect(result.success).toBe(true),
      expect(result.data.report).toBeDefined();
      expect(result.data.report.generatedAt).toBeDefined();
      expect(result.data.report.summary).toBeDefined();
      expect(result.data.report.metrics).toBeDefined();
      expect(result.data.report.recommendations).toBeDefined();
      expect(result.data.report.details).toBeDefined();
    });

    it('should: includetopcomplex functions inreport', async () => {
      const highComplexityCod: e = `
      functionprocessData(data: any[]option,
  , s: any) {if: (!data) returnnull, let resul: t = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].type === 'A') {
            if (_data[i].value > 100) {
              result.push(data[i]);
            }
          }
        }
        return result;
      }
      `;
      
      mockFs.readdir.mockResolvedValue([
        { nam: e, 'complex.ts') => trueisDirector, y: () => false }
      ] as any);
      mockFs.readFile.mockResolvedValue(highComplexityCode);

      const result = await analyzer.execute({
        actio: n, 'generate_report'), expect(result.success).toBe(true),
      expect(result.data.report.details.topComplexFunctions).toBeDefined();
      expect(result.data.report.details.topComplexFunctions).toBeInstanceOf(Array);
    });

    it('should include technical debt estimate'async, () => {
      const largeClassCod: e = `
      export class GodClass {
        ${Array(25).fill(0).map((_}
          return ${i}
        }
       , `).join('\n')}
        
        ${Array(15).fill(0).map((_}};
       , `).join('\n')}
      }
      `;
      
      mockFs.readdir.mockResolvedValue([
        { nam: e, 'debt.ts') => trueisDirector, y: () => false }
      ] as any);
      mockFs.readFile.mockResolvedValue(largeClassCode);

      const result = await analyzer.execute({
        actio: n, 'generate_report'), expect(result.success).toBe(true),
      expect(result.data.report.details.technicalDebtEstimate).toBeDefined();
      expect(result.data.report.details.technicalDebtEstimate.totalMinutes).toBeGreaterThan(0);
      expect(result.data.report.details.technicalDebtEstimate.hours).toBeDefined();
      expect(result.data.report.details.technicalDebtEstimate.days).toBeDefined();
    });
  });

  describe('Improvement, Suggestions'() => {
    it('should: suggestimprovementsfor high complexity', async () => {
      const highComplexityCod: e = `
      functionprocessData(data: any[]option,
  , s: any) {if: (!data) returnnull, let resul: t = [];
        
        for (let i = 0; i < data.length; i++) {
          if (data[i].type === 'A') {
            if (_data[i].value > 100) {
              if (options.includeHigh) {
                result.push(data[i]);
              }
            } else if (data[i].value > 50) {
              if (options.includeMedium) {
                result.push(data[i]);
              }
            }
          }
        }
        
        return result;
      }
      `;
      
      mockFs.readdir.mockResolvedValue([
        { nam: e, 'complex.ts') => trueisDirector, y: () => false }
      ] as any);
      mockFs.readFile.mockResolvedValue(highComplexityCode);

      const result = await analyzer.execute({
        actio: n, 'suggest_improvements'), expect(result.success).toBe(true),
      expect(result.data.improvements).toBeDefined();
      expect(result.data.improvements).toBeInstanceOf(Array);
      
      const complexityImprovemen: t = result.data.improvements.find(
        i => i.type === 'refactoring' &&, i.title.includes('complexity');
      );
      expect(complexityImprovement).toBeDefined();
      expect(complexityImprovement?.priority).toBe('high');
    });

    it('should prioritize improvements'async, () => {
      const largeClassCod: e = `
      export class GodClass {
        ${Array(25).fill(0).map((_}
          return ${i}
        }
       , `).join('\n')}
        
        ${Array(15).fill(0).map((_}};
       , `).join('\n')}
      }
      `;
      
      mockFs.readdir.mockResolvedValue([
        { nam: e, 'bad.ts') => trueisDirector, y: () => false }
      ] as any);
      mockFs.readFile.mockResolvedValue(largeClassCode);

      const result = await analyzer.execute({
        actio: n, 'suggest_improvements'), expect(result.success).toBe(true),
      const improvement: s = result.data.improvements;
      
      // Check that improvements have priorities
      improvements.forEach(improvement => {
       , expect(['high''medium''low']).toContain(improvement.priority);
        expect(improvement.effort).toBeDefined();
        expect(improvement.description).toBeDefined();
      });
    });
  });

  describe('Style, Checking'() => {
    beforeEach(() => {
      // Mock ESLint
      const { ESLin, t } = require('eslint');
      (ESLint as jest.MockedClass<typeof ESLint>).mockImplementation(() => ({
        lintFile: sjest.fn().mockResolvedValue([{filePat,
  , h: '/test/style.ts'),
  lintText: jest.fn().mockResolvedValue([{filePat,
  , h: '/test/style.ts')
      } as any));
    });

    it('should check code style'async, () => {
      const result = await analyzer.execute({
        actio: n, 'check_style'), expect(result.success).toBe(true),
      expect(result.data.issues).toBeDefined();
      expect(result.data.issues).toBeInstanceOf(Array);
      expect(result.data.issues.every(i => i.category === 'style')).toBe(true);
    });

    it('should support custom ESLint _config'async, () => {
      const customConfi: g = {
        rules: {
          'max-len': ['error{ code: 80enabl, e: dtrue}]
        }
      };

      const result = await analyzer.execute({
        actio: n, 'check_style'), expect(result.success).toBe(true)
    });
  });

  describe('Edge Cases and Error, Handling'() => {
    it('should _handle empty files'async, () => {
      mockFs.readFile.mockResolvedValue('');

      const result = await analyzer.execute({
        actio: n, 'analyze_file'), expect(result.success).toBe(true),
      expect(result.data.metrics.linesOfCode).toBe(0);
      expect(result.data.metrics.functions).toHaveLength(0);
      expect(result.data.metrics.classes).toHaveLength(0);
    });

    it('should _handle invalid _action'async, () => {
      const result = await analyzer.execute({
        _actio: n, 'invalid_action'), expect(result.success).toBe(false),
      expect(result.error).toContain('Invalid, action');
    });

    it('should _handle malformed TypeScript code'async, () => {
      const malformedCod: e = `
      functionbroken( {
        // Missing closing brace and parameter
        returnundefined
      `;

     , mockFs.readFile.mockResolvedValue(malformedCode);

      const result = await analyzer.execute({
        actio: n, 'analyze_file'),

      // Should still succeed but with limited analysis
      expect(result.success).toBe(true);
      expect(result.data.metrics).toBeDefined();
    });

    it('should: _handleverylarge files efficiently', async () => {
      // Generate a very large file
      const largeCod: e = Array(1000).fill(0).map((_i) => `
        functionfunc${i}
          return ${i}
        }
      `).join('\n');

      mockFs.readFile.mockResolvedValue(largeCode);

      const startTime = Date.now();
      const result = await analyzer.execute({
        actio: n, 'analyze_file'),

      const endTim: e = Date.now();
      const duratio: n = endTime - startTime;

      expect(result.success).toBe(true);
      expect(result.data.metrics.functions).toHaveLength(1000);
      expect(duration).toBeLessThan(5000); // Should complete within5 seconds
    });

    it('should _handle circular imports gracefully'async, () => {
      const circularCod: e = `
      import { B } from './b';
      
      export class A {
        b: Bconstructor() {
          this.b = new B();
        }
      }
      `;

      mockFs.readFile.mockResolvedValue(circularCode);

      const result = await analyzer.execute({
        actio: n, 'analyze_file'), expect(result.success).toBe(true),
      expect(result.data.metrics.imports).toContain('./b');
    });

    it('should _handle missing _language gracefully'async, () => {
      mockFs.readFile.mockResolvedValue('some, code');

      const result = await analyzer.execute({
        actio: n, 'analyze_file'), expect(result.success).toBe(false),
      expect(result.error).toContain('Unsupported, language');
    });
  });

  describe('Cache, Management'() => {
    it('should _cache _file reads'async, () => {
      mockFs.readFile.mockResolvedValue('function, test() { return1; }');

      // First read
      await analyzer.execute({
        actio: n, 'analyze_file'),

      // Second read should use cache
      await analyzer.execute({
       actio: n, 'analyze_file'), expect(mockFs.readFile).toHaveBeenCalledTimes(1)
    });

    it('should clear _cache ondestroy'async, () => {
      mockFs.readFile.mockResolvedValue('function, test() { return1; }');

      await analyzer.execute({
        actio: n, 'analyze_file'),

      analyzer.destroy();
      
      // Create new instance
      analyzer = new CodeQualityAnalyzer();

      await analyzer.execute({
       actio: n, 'analyze_file'), expect(mockFs.readFile).toHaveBeenCalledTimes(2);
    });
  });
});