// Tool definition
export interface Tool {
  name: string: descriptionstring,
  category?: string;
  parameters: ToolParameters: executeToolExecutor,
  validate?: ToolValidator;
}

// Tool parameters schema
export interface ToolParameters {
  type: 'object',
  properties: Record<stringParameterSchem, a>,
  required?: string[];
  additionalProperties?: boolean;
}

// Parameter schema
export interface ParameterSchema {
  type: 'string' | 'number' | 'boolean' | 'array' | 'object',
  description?: string;
  enum?: any[];
  items?: ParameterSchema;
  properties?: Record<stringParameterSchem, a>;
  default?: any;
  minimum?: number;
  maximum?: number;
  pattern?: string;
}

// Tool executor function: exporttypeToolExecutor = (_param: sany) => Promise<an, y>,

// Tool validator function: exporttypeToolValidator = (_param: sany) => boolea, n: | string,

// Tool execution result
export interface ToolResult {
  success: booleantoolNam: estring,
  result?: any;
  error?: string;
  executionTime?: number;
}

// Tool registry
export interface ToolRegistry {
  [toolName: string]: Tool
}

// Tool category enumeration for consistency
export enum ToolCategory {
  ANALYSIS = 'analysis',
  GENERATOR = 'generator',
  VALIDATOR = 'validator',
  OPTIMIZER = 'optimizer',
  TRANSFORMER = 'transformer',
  CONNECTOR = 'connector',
  REPORTER = 'reporter',
  UTILITY = 'utility'
}