# TestGenerator Tool

Advanced test generation system for TypeScript/JavaScript code with AST analysis, multiple test framework support, and intelligent test pattern generation.

## Features

- **TypeScript AST Analysis**: Deep code analysis using TypeScript compiler API
- **Multi-Framework Support**: Jest, Mocha, Vitest, and Jasmine
- **Comprehensive Test Patterns**:
  - Basic functionality tests
  - Parameterized tests (data-driven)
  - Async/await tests
  - Error handling tests
  - Edge case tests
  - Mocked dependency tests
  - Property-based tests (with fast-check)
  - Snapshot tests
  - Integration tests
- **Intelligent Test Generation**:
  - Automatic type inference
  - JSDoc parsing for better test context
  - Complexity-based test suggestions
  - Coverage estimation
- **Class Testing**: Constructor, method, and property tests
- **Test Validation**: Syntax and semantic validation of generated tests
- **Coverage Analysis**: Function, branch, and line coverage estimation

## Installation

```bash
npm install --save-dev @babel/parser @typescript-eslint/parser fast-check
```

## Usage

### Basic Test Generation

```typescript
import { TestGenerator, TestFramework, TestPattern } from '@tools/testing';

const generator = new TestGenerator();

// Generate tests for TypeScript code
const result = await generator.execute({
  action: 'generate_tests',
  code: `
    export function calculateArea(width: number, height: number): number {
      if (width <= 0 || height <= 0) {
        throw new Error('Dimensions must be positive');
      }
      return width * height;
    }
  `,
  framework: TestFramework.JEST,
  patterns: [TestPattern.BASIC, TestPattern.ERROR_HANDLING, TestPattern.EDGE_CASES],
}, context);

console.log(result.data.testCode);
```

### Analyzing Code Before Test Generation

```typescript
// First analyze the code structure
const analysisResult = await generator.execute({
  action: 'analyze_code',
  filePath: './src/utils/math.ts',
}, context);

// Then generate tests based on analysis
const testResult = await generator.execute({
  action: 'generate_tests',
  code: analysisResult.data.sourceCode,
  framework: TestFramework.JEST,
  patterns: [TestPattern.BASIC, TestPattern.PARAMETERIZED],
  coverageTarget: 80, // Target 80% coverage
}, context);
```

### Property-Based Testing

```typescript
const functionInfo = {
  name: 'reverseArray',
  parameters: [{ name: 'arr', type: 'T[]', isOptional: false, isRest: false }],
  returnType: 'T[]',
  // ... other properties
};

const propertyResult = await generator.execute({
  action: 'generate_property_tests',
  functionInfo,
  properties: [
    'reverseArray(reverseArray(arr)).length === arr.length',
    'reverseArray([]).length === 0',
  ],
  framework: TestFramework.JEST,
}, context);
```

### Test Validation

```typescript
const validationResult = await generator.execute({
  action: 'validate_tests',
  testCode: generatedTestCode,
  framework: TestFramework.JEST,
}, context);

if (!validationResult.data.valid) {
  console.error('Test validation errors:', validationResult.data.errors);
}
```

### Getting Test Suggestions

```typescript
const suggestionsResult = await generator.execute({
  action: 'suggest_test_cases',
  analysis: codeAnalysis,
  currentTests: existingTests,
}, context);

console.log('Priority suggestions:', suggestionsResult.data.priority);
```

## Test Patterns

### Basic Tests
Simple functionality tests with arrange-act-assert pattern.

### Parameterized Tests
Data-driven tests with multiple input/output combinations.

### Async Tests
Tests for async functions with proper await handling.

### Error Handling Tests
Tests that verify proper error throwing and handling.

### Edge Case Tests
Tests for boundary conditions (empty arrays, zero values, etc.).

### Mocked Tests
Tests with mocked dependencies using framework-specific mocking.

### Property-Based Tests
Tests that verify properties hold for all possible inputs using fast-check.

### Snapshot Tests
Tests that capture and compare component output.

### Integration Tests
Tests that verify multiple modules working together.

## Framework-Specific Features

### Jest
- Uses `@jest/globals` imports
- Supports `jest.fn()` for mocking
- Includes snapshot testing with `toMatchSnapshot()`

### Mocha
- Uses Mocha's `describe/it` with Chai assertions
- Sinon for mocking and stubbing
- Supports async tests with `done` callback or promises

### Vitest
- Jest-compatible API with better performance
- Uses `vi.fn()` for mocking
- Native ESM support

### Jasmine
- Classic BDD-style testing
- Built-in spies for mocking
- Supports custom matchers

## Advanced Features

### Complexity Analysis
The tool analyzes cyclomatic complexity to suggest appropriate test coverage:
- Functions with complexity > 5: Suggests additional test cases
- Functions with complexity > 10: Recommends property-based testing

### JSDoc Integration
Parses JSDoc comments to:
- Extract parameter descriptions for better test names
- Identify thrown exceptions for error tests
- Use examples for test case generation

### Type-Aware Generation
- Generates appropriate test data based on TypeScript types
- Handles union types, generics, and interfaces
- Creates type-safe test assertions

### Coverage Estimation
Provides estimated coverage metrics:
- Function coverage: Based on tested vs total functions
- Branch coverage: Estimated from test patterns used
- Line coverage: Approximated from test comprehensiveness

## Configuration Options

```typescript
interface TestGenerationOptions {
  // Target test framework
  framework: TestFramework;
  
  // Test patterns to generate
  patterns: TestPattern[];
  
  // Target coverage percentage (60, 80, or 95)
  coverageTarget: number;
  
  // Additional options
  options?: {
    // Include integration tests
    includeIntegration?: boolean;
    
    // Generate tests for private methods
    testPrivateMethods?: boolean;
    
    // Maximum test cases per function
    maxTestsPerFunction?: number;
    
    // Custom test data generators
    customGenerators?: Record<string, () => any>;
  };
}
```

## Best Practices

1. **Start with Analysis**: Always analyze code first to understand its structure
2. **Use Multiple Patterns**: Combine different test patterns for comprehensive coverage
3. **Validate Generated Tests**: Always validate generated tests before using
4. **Review and Customize**: Generated tests are a starting point - review and enhance them
5. **Property-Based for Complex Logic**: Use property-based testing for algorithm-heavy code
6. **Mock External Dependencies**: Always mock external services and APIs
7. **Test Edge Cases**: Don't forget empty arrays, null values, and boundary conditions

## Limitations

- Generated tests require manual review and enhancement
- Complex business logic may need custom test scenarios
- Mock implementations are basic and may need refinement
- Property-based tests require careful property definition
- Integration tests are framework-specific

## Examples

See the `examples/TestGenerator.example.ts` file for comprehensive usage examples.

## Performance Considerations

- Large files may take longer to analyze
- Complex type inference can impact generation speed
- Use targeted generation for specific functions when possible
- Cache analysis results when generating multiple test variations