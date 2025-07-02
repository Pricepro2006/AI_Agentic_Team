# Code Optimizer Tool

A TypeScript implementation of a code optimization tool that analyzes TypeScript/JavaScript code and suggests performance and readability improvements.

## Features

### 1. Code Optimization Analysis
- **Pattern Detection**: Identifies common antipatterns and inefficiencies
- **Performance Suggestions**: Provides specific recommendations for improving code performance
- **Readability Improvements**: Suggests cleaner, more maintainable code patterns
- **Example-Based Learning**: Each suggestion includes bad/good examples

### 2. Supported Optimization Patterns

#### High Severity
- **indexOf in loops**: O(n²) complexity - suggests using Set/Map for O(1) lookups
- **Object spread in loops**: Creates unnecessary intermediate objects - suggests more efficient alternatives

#### Medium Severity  
- **Chained array methods**: Multiple iterations can be combined into single pass
- **String concatenation**: Inefficient string building - suggests template literals or array.join()

#### Low Severity
- **Unnecessary async**: Functions marked async without await or Promise returns
- **Multiple includes checks**: Repeated array.includes() calls - suggests Set usage

### 3. Complexity Analysis
- **Big-O Notation**: Estimates algorithmic complexity (O(1), O(n), O(n²), etc.)
- **Nested Loop Detection**: Counts maximum loop nesting depth
- **Cyclomatic Complexity**: Measures code branching complexity
- **Function Calls in Loops**: Identifies potentially expensive operations
- **Analysis Recommendations**: Provides specific warnings for high complexity code

### 4. ESLint Integration
- Built-in linting capabilities
- TypeScript and JavaScript support
- Configurable rules for best practices

## Usage

```typescript
import { CodeOptimizer } from './tools/pythonExpert/CodeOptimizer';

const optimizer = new CodeOptimizer();

// Optimize code
const optimizationResult = await optimizer.execute({
  command: 'optimize',
  code: `
    const items = [1, 2, 3, 4, 5];
    for (let i = 0; i < items.length; i++) {
      if ([1, 2, 3].indexOf(items[i]) !== -1) {
        console.log(items[i]);
      }
    }
  `,
  language: 'javascript'
}, context);

// Analyze complexity
const complexityResult = await optimizer.execute({
  command: 'analyze_complexity',
  code: `
    function bubbleSort(arr) {
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1; j++) {
          if (arr[j] > arr[j + 1]) {
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          }
        }
      }
      return arr;
    }
  `,
  language: 'javascript'
}, context);
```

## API

### Parameters

- **command** (required): `'optimize' | 'analyze_complexity' | 'lint'`
- **code** (required): The TypeScript or JavaScript code to analyze
- **language** (optional): `'typescript' | 'javascript'` (default: 'typescript')
- **targetES** (optional): Target ECMAScript version (default: 'ES2022')
- **includeESLint** (optional): Include ESLint recommendations (default: true)

### Response Format

#### Optimization Response
```typescript
{
  success: boolean;
  data: {
    originalCode: string;
    optimizations: Array<{
      pattern: string;
      severity: 'high' | 'medium' | 'low';
      issue: string;
      suggestion: string;
      exampleBad: string;
      exampleGood: string;
      benefit: string;
    }>;
    optimizedCode: string;
    optimizationCount: number;
    estimatedImprovement: string;
    summary: string;
  };
}
```

#### Complexity Analysis Response
```typescript
{
  success: boolean;
  data: {
    nestedLoops: number;
    functionCallsInLoops: number;
    estimatedComplexity: string;
    cyclomaticComplexity: number;
    analysis: string[];
  };
}
```

## Implementation Details

### Technologies Used
- **TypeScript Compiler API**: For AST parsing and code analysis
- **ESLint**: For additional code quality checks
- **Pattern Matching**: Regex and AST-based pattern detection

### Architecture
- Extends `BaseTool` for consistent tool interface
- Modular pattern detection system
- Extensible optimization rules
- Comprehensive error handling

## Testing

The tool includes 20+ comprehensive test cases covering:
- All optimization patterns
- Complexity analysis scenarios
- Error handling
- TypeScript-specific features
- Parameter validation

Run tests with:
```bash
npm test -- CodeOptimizer.test.ts
```

## Future Enhancements

1. **Additional Patterns**
   - Memory leak detection
   - Promise antipatterns
   - React/Vue specific optimizations

2. **Advanced Analysis**
   - Data flow analysis
   - Dead code elimination
   - Bundle size impact estimation

3. **Auto-fix Capabilities**
   - Safe automatic code transformations
   - Git integration for changes
   - Rollback support

4. **Performance Metrics**
   - Benchmark generation
   - Before/after comparisons
   - Real-world performance impact

## Contributing

To add new optimization patterns:

1. Add pattern detection in `optimizeCode()` method
2. Create optimization suggestion object
3. Implement code transformation (if safe)
4. Add test cases
5. Update documentation

## License

Part of the AI Assistant project - see project license for details.