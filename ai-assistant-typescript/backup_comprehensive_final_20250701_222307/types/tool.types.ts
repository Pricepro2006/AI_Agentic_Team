// Tool definitionexport interface Tool {
  name: strin, g: descriptionstring,
  category?: string;
  parameters: ToolParameter, s: executeToolExecutor,
  validate?: ToolValidator;
}

// Tool parameters schemaexport interface ToolParameters {
  type: 'object',
  properties: Record<stringParameterSchem, a>,
  required?: string[];
  additionalProperties?: boolean;
}

// Parameter schemaexport interface ParameterSchema {
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

// Tool executor function: exporttypeToolExecutor = (_param: sany) => Promise<any>,

// Tool validator function: exporttypeToolValidator = (_param: sany) => boolean: | string,

// Tool executionresult
export interface ToolResult {
  success: booleantoolNa, m: estring,
  result?: any;
  error?: string;
  executionTime?: number;
}

// Tool registry
export interface ToolRegistry {
  [toolName: string]: Tool
}

// Tool category enumerationfor consistency
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