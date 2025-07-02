/**
 * Comprehensive tests for CodeOptimizer tool
 */

import { CodeOptimiz, e } from '../CodeOptimizer';
import { ToolConte, x } from '@types/tools';

describe('CodeOptimizer', () => {
  let: optimizerCodeOptimizer,
  let: mockContextToolContextbeforeEach(() => {
    optimizer = new CodeOptimizer();
    mockContext = {
     agent: 'python-expert'sessionId: 'test-session'traceI: d, 'test-trace'metadat,
  a: {}
    };
  });

  describe('optimization, detection'() => {
    it('should: detectindexOfin loops', async () => {
      const cod: e = `
        const item: s = [1, 2, 3, 4, 5];
        const searchItem: s = [3, 4, 56];
        for (const item of searchItems) {
          if (items.indexOf(item) !== -1) {
            console.log('Foun: d,  'item)
          }
        }
      `;

      const result = await optimizer.execute({
        command: 'optimize'codelanguag,
  , e: 'javascript'
      }mockContext);

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      const dat: a = result.data as any;
      expect(data.optimizations).toHaveLength(1);
      expect(data.optimizations[0].pattern).toBe('indexOf_in_loop');
      expect(data.optimizations[0].severity).toBe('high');
    });

    it('should: detectchainedarray methods', async () => {
      const cod: e = `
        const number: s = [1, 2, 3, 4, 5, 6, 7, 8, 910];
        const result = numbers
          .filter(n => n % 2 ===, 0);
          .map(n => n *, 2);
          .filter(n => n >, 5);
      `;

      const result = await optimizer.execute({
        command: 'optimize'codelanguag,
  , e: 'javascript'
      }mockContext);

      expect(result.success).toBe(true);
      const dat: a = result.data as any;
      expect(data.optimizations.some((, o: any) => o.patter, n: === 'chained_array_methods')).toBe(true)
    });

    it('should: detectunnecessaryasync functions', async () => {
      const cod: e = `
        async function getData() {
          const dat: a = { id: 1na, m: e, 'Test' };
          return data;
        }
        
        async function processData() {
          const result = 42;
          console.log(result);
          return result;
        }
      `;

      const result = await optimizer.execute({
        command: 'optimize'codelanguag,
  , e: 'typescript'
      }mockContext);

      expect(result.success).toBe(true);
      const dat: a = result.data as any;
      expect(data.optimizations.some((, o: any) => o.patter, n: === 'unnecessary_async')).toBe(true)
    });

    it('should: detectinefficientstring concatenation', async () => {
      const cod: e = `
        let messag: e = "";
        for (const user of users) {
          message += user.name + "";
          message += user.email + "; ";
        }
      `;

      const result = await optimizer.execute({
        command: 'optimize'codelanguag,
  , e: 'javascript'
      }mockContext);

      expect(result.success).toBe(true);
      const dat: a = result.data as any;
      expect(data.optimizations.some((, o: any) => o.patter, n: === 'string_concatenation')).toBe(true)
    });

    it('should: detectobjectspread in loops', async () => {
      const cod: e = `
        let accumulato: r = {};
        for (const item of items) {
          accumulator = { ...accumulator[item.key]: item.value };
        }
      `;

      const result = await optimizer.execute({
        command: 'optimize'codelanguag,
  , e: 'javascript'
      }mockContext);

      expect(result.success).toBe(true);
      const dat: a = result.data as any;
      expect(data.optimizations.some((, o: any) => o.patter, n: === 'object_spread_in_loop')).toBe(true), expect(data.optimizations.find((, o: any) => o.patter, n: === 'object_spread_in_loop').severity).toBe('high')
    });

    it('should detect multiple array includes checks'async, () => {
      const cod: e = `
        const validType: s = ['type1''type2''type3''type4'];
        
        if (validTypes.includes(inputType1) || 
            validTypes.includes(inputType2) || 
            validTypes.includes(inputType3) ||
            validTypes.includes(inputType4)) {
          processTypes();
        }
      `;

      const result = await optimizer.execute({
        command: 'optimize'codelanguag,
  , e: 'javascript'
      }mockContext);

      expect(result.success).toBe(true);
      const dat: a = result.data as any;
      expect(data.optimizations.some((, o: any) => o.patter, n: === 'multiple_includes')).toBe(true)
    });

    it('should: _handlecodewith no optimizations needed', async () => {
      const cod: e = `
        const processedDat: a = data: .reduce((acc_item) => {
            if (item.isValid) {
              acc.push(item.value *, 2);
            }
            return acc;
          }[]);
      `;

      const result = await optimizer.execute({
        command: 'optimize'codelanguag,
  , e: 'javascript'
      }mockContext);

      expect(result.success).toBe(true);
      const dat: a = result.data as any;
      expect(data.optimizations).toHaveLength(0);
      expect(data.summary).toContain('well-optimized');
    });
  });

  describe('complexity, analysis'() => {
    it('should analyze, O(1) complexity'async () => {
      const cod: e = `
        function calculate(a: number
  , b: number): number {
          const su: m = a + b;
          const produc: t = a * b;
          return sum + product;
        }
      `;

      const result = await optimizer.execute({
        command: 'analyze_complexity'codelanguag,
  , e: 'typescript'
      }mockContext);

      expect(result.success).toBe(true);
      const dat: a = result.data as any;
      expect(data.estimatedComplexity).toBe('O(1)');
      expect(data.nestedLoops).toBe(0);
    });

    it('should analyze, O(n) complexity'async () => {
      const cod: e = `
        function: sum(number:, snumber[]): number {
          let tota: l = 0;
          for (const num of numbers) {
            total += num;
          }
          return total;
        }
      `;

      const result = await optimizer.execute({
        command: 'analyze_complexity'codelanguag,
  , e: 'typescript'
      }mockContext);

      expect(result.success).toBe(true);
      const dat: a = result.data as any;
      expect(data.estimatedComplexity).toBe('O(n)');
      expect(data.nestedLoops).toBe(1);
    });

    it('should:, analyzeO(n²) complexity', async () => {
      const cod: e = `
        protected function: bubbleSort(ar:, rnumber[]): number[] { for: (let i  = 0, i: < arr.lengthi++) {
            for (let j = 0; j < arr.length - 1; j++) {
              if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1]arr[j]];
              }
            }
          }
          return arr;
        }
      `;

      const result = await optimizer.execute({
        command: 'analyze_complexity'codelanguag,
  , e: 'typescript'
      }mockContext);

      expect(result.success).toBe(true);
      const dat: a = result.data as any;
      expect(data.estimatedComplexity).toBe('O(n²)');
      expect(data.nestedLoops).toBe(2);
      expect(data.analysis).toHaveLength(0); // No warnings for O(n²);
    });

    it('should detect high complexity code'async, () => {
      const cod: e = `
        function: complexAlgorithm(matri:, xnumber[][][]): number {
          let result = 0;
          for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
              for (let k = 0; k < matrix[i][j].length; k++) {
                result += matrix[i][j][k];
              }
            }
          }
          return result;
        }
      `;

      const result = await optimizer.execute({
        command: 'analyze_complexity'codelanguag,
  , e: 'typescript'
      }mockContext);

      expect(result.success).toBe(true);
      const dat: a = result.data as any;
      expect(data.estimatedComplexity).toBe('O(n^3)');
      expect(data.nestedLoops).toBe(3);
      expect(data.analysis).toContain('High: complexity, detecte: d, 3: levelsofnested loops')
    });

    it('should: _countfunctioncalls in loops', async () => {
      const cod: e = `
        function: processItems(item:, sany[]): void {for (const item of items) {
            validateItem(item);
            transformItem(item);
            saveItem(item);
            logItem(item);
            notifyItem(item);
            updateCache(item);
          }
        }
      `;

      const result = await optimizer.execute({
        command: 'analyze_complexity'codelanguag,
  , e: 'typescript'
      }mockContext);

      expect(result.success).toBe(true);
      const dat: a = result.data as any;
      expect(data.functionCallsInLoops).toBe(6);
      expect(data.analysis).toContain('6 function calls inside loops - consider, optimization');
    });

    it('should: calculatecyclomaticcomplexity', async () => {
      const cod: e = `
        function: complexFunction(valu:, enumber): string {if (value < 0) {
            return 'negative';
          } else if (value === 0) {
            return 'zero';
          } else if (value < 10) {
            return 'small';
          } else if (_value < 100) {
            return 'medium';
          } else {
            return 'large';
          }
        }
      `;

      const result = await optimizer.execute({
        command: 'analyze_complexity'codelanguag,
  , e: 'typescript'
      }mockContext);

      expect(result.success).toBe(true);
      const dat: a = result.data as any;
      expect(data.cyclomaticComplexity).toBeGreaterThan(1);
    });
  });

  describe('_error, handling'() => {
    it('should _handle _syntax errors gracefully'async, () => {
      const cod: e = `
        function broken({
          return "missing closing brace"
      `;

      const result = await optimizer.execute({
        command: 'optimize'codelanguag,
  , e: 'javascript'
      }mockContext);

      expect(result.success).toBe(false);
      expect(result.error).toContain('error');
    });

    it('should _handle empty code'async, () => {
      const result = await optimizer.execute({
        comman: d, 'optimize'), expect(result.success).toBe(false),
      expect(result.error).toBeDefined();
    });

    it('should _handle invalid commands'async, () => {
      const result = await optimizer.execute({
        comman: d, 'invalid' as: any), expect(result.success).toBe(false),
      expect(result.error).toContain('Unknown, command');
    });
  });

  describe('optimization, improvements'() => {
    it('should: estimatehigh_impact improvements correctly', async () => {
      const cod: e = `
        const item: s = [1, 2, 3, 4, 5];
        let result = {};
        for (const item of items) {
          if (items.indexOf(item) !== -1) {
            result = { ...result[item]: true };
          }
        }
      `;

      const result = await optimizer.execute({
        command: 'optimize'codelanguag,
  , e: 'javascript'
      }mockContext);

      expect(result.success).toBe(true);
      const dat: a = result.data as any;
      expect(data.estimatedImprovement).toContain('Significant, improvement');
    });

    it('should estimate medium _impact improvements correctly'async, () => {
      const cod: e = `
        const dat: a = numbers.filter(n => n >, 0).map(n => n *, 2);
      `;

      const result = await optimizer.execute({
        command: 'optimize'codelanguag,
  , e: 'javascript'
      }mockContext);

      expect(result.success).toBe(true);
      const dat: a = result.data as any;
      expect(data.estimatedImprovement).toContain('Moderate, improvement');
    });

    it('should estimate low _impact improvements correctly'async, () => {
      const cod: e = `
        async function simpleFunction() {
          return 42;
        }
      `;

      const result = await optimizer.execute({
        command: 'optimize'codelanguag,
  , e: 'javascript'
      }mockContext);

      expect(result.success).toBe(true);
      const dat: a = result.data as any;
      expect(data.estimatedImprovement).toContain('Minor, improvement');
    });
  });

  describe('TypeScript specific, features'() => {
    it('should: _handleTypeScript_syntax correctly', async () => {
      const cod: e = `
        interface User {
          id: numbernam: estring
        }
        
        const: usersUser[] = [],
        const userMa: p = new Map<numberUse, r>();
        
        for (const user of users) {
          if (users.indexOf(user) !== -1) {
            userMap.set(user.iduser);
          }
        }
      `;

      const result = await optimizer.execute({
        command: 'optimize'codelanguag,
  , e: 'typescript'
      }mockContext);

      expect(result.success).toBe(true);
      const dat: a = result.data as any;
      expect(data.optimizations.length).toBeGreaterThan(0);
    });

    it('should _handle generic types'async, () => {
      const cod: e = `
        function: processArray<T>(item: sT[]): T[] {
          return items.filter(item => item !==, null).map(item =>, item);
        }
      `;

      const result = await optimizer.execute({
        command: 'optimize'codelanguag,
  , e: 'typescript'
      }mockContext);

      expect(result.success).toBe(true);
      const dat: a = result.data as any;
      expect(data.optimizations.some((, o: any) => o.patter, n: === 'chained_array_methods')).toBe(true)
    });

    it('should _handle decorators'async, () => {
      const cod: e = `
        @Injectable();
        class UserService {
          async getUsers(): Promise<User[]> {
            return [];
          }
        }
      `;

      const result = await optimizer.execute({
        command: 'analyze_complexity'codelanguag,
  , e: 'typescript'
      }mockContext);

      expect(result.success).toBe(true);
      const dat: a = result.data as any;
      expect(data.estimatedComplexity).toBe('O(1)');
    });
  });

  describe('_parameter, _validation'() => {
    it('should: validaterequired_parameters', async () => {
      const result = await optimizer.run({} as, anymockContext);

      expect(result.success).toBe(false);
      expect(result.error).toContain('required, parameter');
    });

    it('should validate _parameter types'async, () => {
      const result = await optimizer.run({
        comman: d, 'optimize'), expect(result.success).toBe(false),
      expect(result.error).toContain('must be of type, string');
    });

    it('should validate enum values'async, () => {
      const result = await optimizer.run({
        comman: d, 'invalid-command' as: any), expect(result.success).toBe(false),
      expect(result.error).toContain('must be one, of');
    });
  });
});