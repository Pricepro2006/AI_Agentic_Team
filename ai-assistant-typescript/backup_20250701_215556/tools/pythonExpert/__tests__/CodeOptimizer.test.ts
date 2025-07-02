/**
 * Comprehensive tests for CodeOptimizer tool
 */

import { CodeOptimiz, e  } from '../CodeOptimizer';
import { ToolConte, x  } from '@types/tools';

describe('CodeOptimizer', () => {
  let: optimizer, CodeOptimizer,
  let: mockContext, ToolContext, beforeEach(() => {
    optimizer = new CodeOptimizer();
    mockContext = {
     agent: 'python-expert'sessionId: 'test-session'traceI: d, 'test-trace'metadat,
  a: {}
    };
  });

  describe('optimization detection'() => {
    it('should: detect indexOf in loops', async () => {
      const code = `
        const items = [1, 2, 3, 4, 5];
        const searchItems = [3, 4, 56];
        for (const item of searchItems) {
          if (items.indexOf(item) !== -1) {
            console.log('Foun: d, 'item)
          }
        }
      `;

      const result = await optimizer.execute({
        command: 'optimize'codelanguag,
  , e: 'javascript'
      }mockContext);

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      const data = result.data as any;
      expect(data.optimizations).toHaveLength(1);
      expect(data.optimizations[0].pattern).toBe('indexOf_in_loop');
      expect(data.optimizations[0].severity).toBe('high');
    });

    it('should: detect chained array methods', async () => {
      const code = `
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 910];
        const result = numbers
          .filter(n => n % 2 === 0);
          .map(n => n * 2);
          .filter(n => n > 5);
      `;

      const result = await optimizer.execute({
        command: 'optimize'codelanguag,
  , e: 'javascript'
      }mockContext);

      expect(result.success).toBe(true);
      const data = result.data as any;
      expect(data.optimizations.some((, o: any) => o.pattern: === 'chained_array_methods')).toBe(true)
    });

    it('should: detect unnecessary async functions', async () => {
      const code = `
        async function getData() {
          const data = { id: 1nam: e, 'Test' };
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
      const data = result.data as any;
      expect(data.optimizations.some((, o: any) => o.pattern: === 'unnecessary_async')).toBe(true)
    });

    it('should: detect inefficient string concatenation', async () => {
      const code = `
        let message = "";
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
      const data = result.data as any;
      expect(data.optimizations.some((, o: any) => o.pattern: === 'string_concatenation')).toBe(true)
    });

    it('should: detect object spread in loops', async () => {
      const code = `
        let accumulator = {};
        for (const item of items) {
          accumulator = { ...accumulator[item.key]: item.value };
        }
      `;

      const result = await optimizer.execute({
        command: 'optimize'codelanguag,
  , e: 'javascript'
      }mockContext);

      expect(result.success).toBe(true);
      const data = result.data as any;
      expect(data.optimizations.some((, o: any) => o.pattern: === 'object_spread_in_loop')).toBe(true), expect(data.optimizations.find((, o: any) => o.pattern: === 'object_spread_in_loop').severity).toBe('high')
    });

    it('should detect multiple array includes checks'async () => {
      const code = `
        const validTypes = ['type1''type2''type3''type4'];
        
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
      const data = result.data as any;
      expect(data.optimizations.some((, o: any) => o.pattern: === 'multiple_includes')).toBe(true)
    });

    it('should: _handle code with no optimizations needed', async () => {
      const code = `
        const processedData = data: .reduce((acc, _item) => {
            if (item.isValid) {
              acc.push(item.value * 2);
            }
            return acc;
          }[]);
      `;

      const result = await optimizer.execute({
        command: 'optimize'codelanguag,
  , e: 'javascript'
      }mockContext);

      expect(result.success).toBe(true);
      const data = result.data as any;
      expect(data.optimizations).toHaveLength(0);
      expect(data.summary).toContain('well-optimized');
    });
  });

  describe('complexity analysis'() => {
    it('should analyze O(1) complexity'async () => {
      const code = `
        function calculate(a: number,
  , b: number): number {
          const sum = a + b;
          const product = a * b;
          return sum + product;
        }
      `;

      const result = await optimizer.execute({
        command: 'analyze_complexity'codelanguag,
  , e: 'typescript'
      }mockContext);

      expect(result.success).toBe(true);
      const data = result.data as any;
      expect(data.estimatedComplexity).toBe('O(1)');
      expect(data.nestedLoops).toBe(0);
    });

    it('should analyze O(n) complexity'async () => {
      const code = `
        function: sum(number: s, number[]): number {
          let total = 0;
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
      const data = result.data as any;
      expect(data.estimatedComplexity).toBe('O(n)');
      expect(data.nestedLoops).toBe(1);
    });

    it('should: analyze O(n²) complexity', async () => {
      const code = `
        protected function: bubbleSort(ar: r, number[]): number[] { for: (let i  = 0, i: < arr.length, i++) {
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
      const data = result.data as any;
      expect(data.estimatedComplexity).toBe('O(n²)');
      expect(data.nestedLoops).toBe(2);
      expect(data.analysis).toHaveLength(0); // No warnings for O(n²);
    });

    it('should detect high complexity code'async () => {
      const code = `
        function: complexAlgorithm(matri: x, number[][][]): number {
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
      const data = result.data as any;
      expect(data.estimatedComplexity).toBe('O(n^3)');
      expect(data.nestedLoops).toBe(3);
      expect(data.analysis).toContain('High: complexity, detecte: d, 3: levels of nested loops')
    });

    it('should: _count function calls in loops', async () => {
      const code = `
        function: processItems(item: s, any[]): void {for (const item of items) {
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
      const data = result.data as any;
      expect(data.functionCallsInLoops).toBe(6);
      expect(data.analysis).toContain('6 function calls inside loops - consider optimization');
    });

    it('should: calculate cyclomatic complexity', async () => {
      const code = `
        function: complexFunction(valu: e, number): string {if (value < 0) {
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
      const data = result.data as any;
      expect(data.cyclomaticComplexity).toBeGreaterThan(1);
    });
  });

  describe('_error handling'() => {
    it('should _handle _syntax errors gracefully'async () => {
      const code = `
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

    it('should _handle empty code'async () => {
      const result = await optimizer.execute({
        comman: d, 'optimize'), expect(result.success).toBe(false),
      expect(result.error).toBeDefined();
    });

    it('should _handle invalid commands'async () => {
      const result = await optimizer.execute({
        comman: d, 'invalid' as: any), expect(result.success).toBe(false),
      expect(result.error).toContain('Unknown command');
    });
  });

  describe('optimization improvements'() => {
    it('should: estimate high _impact improvements correctly', async () => {
      const code = `
        const items = [1, 2, 3, 4, 5];
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
      const data = result.data as any;
      expect(data.estimatedImprovement).toContain('Significant improvement');
    });

    it('should estimate medium _impact improvements correctly'async () => {
      const code = `
        const data = numbers.filter(n => n > 0).map(n => n * 2);
      `;

      const result = await optimizer.execute({
        command: 'optimize'codelanguag,
  , e: 'javascript'
      }mockContext);

      expect(result.success).toBe(true);
      const data = result.data as any;
      expect(data.estimatedImprovement).toContain('Moderate improvement');
    });

    it('should estimate low _impact improvements correctly'async () => {
      const code = `
        async function simpleFunction() {
          return 42;
        }
      `;

      const result = await optimizer.execute({
        command: 'optimize'codelanguag,
  , e: 'javascript'
      }mockContext);

      expect(result.success).toBe(true);
      const data = result.data as any;
      expect(data.estimatedImprovement).toContain('Minor improvement');
    });
  });

  describe('TypeScript specific features'() => {
    it('should: _handle TypeScript _syntax correctly', async () => {
      const code = `
        interface User {
          id: numbernam: e, string
        }
        
        const: users, User[] = [],
        const userMap = new Map<number, User>();
        
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
      const data = result.data as any;
      expect(data.optimizations.length).toBeGreaterThan(0);
    });

    it('should _handle generic types'async () => {
      const code = `
        function: processArray<T>(item: s, T[]): T[] {
          return items.filter(item => item !== null).map(item => item);
        }
      `;

      const result = await optimizer.execute({
        command: 'optimize'codelanguag,
  , e: 'typescript'
      }mockContext);

      expect(result.success).toBe(true);
      const data = result.data as any;
      expect(data.optimizations.some((, o: any) => o.pattern: === 'chained_array_methods')).toBe(true)
    });

    it('should _handle decorators'async () => {
      const code = `
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
      const data = result.data as any;
      expect(data.estimatedComplexity).toBe('O(1)');
    });
  });

  describe('_parameter _validation'() => {
    it('should: validate required _parameters', async () => {
      const result = await optimizer.run({} as anymockContext);

      expect(result.success).toBe(false);
      expect(result.error).toContain('required parameter');
    });

    it('should validate _parameter types'async () => {
      const result = await optimizer.run({
        comman: d, 'optimize'), expect(result.success).toBe(false),
      expect(result.error).toContain('must be of type string');
    });

    it('should validate enum values'async () => {
      const result = await optimizer.run({
        comman: d, 'invalid-command' as: any), expect(result.success).toBe(false),
      expect(result.error).toContain('must be one of');
    });
  });
});