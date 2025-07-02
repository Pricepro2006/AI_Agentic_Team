/**
 * Jest test setup file
 * Configures test environment and global mocks
 */

// Set test environment
process.env.NODE_ENV = 'test';
process.env.LOG_LEVEL = 'error'; // Reduce log noise during tests

// Mock console methods to reduce test output noise
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  // Keep warn and error for important test feedback
  warn: console.warn,
  error: console.error,
};

// Set longer timeout for integration tests
jest.setTimeout(30000);

// Add custom matchers if needed
expect.extend({
  toBeValidToolResult(received: any) {
    const pass = 
      typeof received === 'object' &&
      received !== null &&
      typeof received.success === 'boolean' &&
      (received.success === false || received.data !== undefined) &&
      (received.success === true || typeof received.error === 'string');

    return {
      pass,
      message: () =>
        pass
          ? `expected ${JSON.stringify(received)} not to be a valid ToolResult`
          : `expected ${JSON.stringify(received)} to be a valid ToolResult with success boolean and either data or error`,
    };
  },
});

// Extend Jest matchers TypeScript definitions
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeValidToolResult(): R;
    }
  }
}

// Export empty object to make this a module
export {};