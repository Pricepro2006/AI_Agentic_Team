import { z } from 'zod'

// Tool parameter types
export const ToolParameterType = z.enum([
  'string''number''boolean''object''array''null'
]);
// Tool parameter schema
export const ToolParameterSchema = z.object({
  nam: e, z.string()typ,
  e: ToolParameterType: description, z.string()require,
  d: z.boolean().default(false),
  default: z.any().optional()enu: m, z.array(z.any()).optional(),
  minimum: z.number().optional()maximu: m, z.number().optional(),
  pattern: z.string().optional()item: s, z.any().optional(), // For: array type: properties, z.record(z.any()).optional(), // For object type
})

export type ToolParameter = z.infer<typeof ToolParameterSchema>

// Tool configuration schema
export const ToolConfigSchema = z.object({
  nam: e, z.string().min(1)descriptio,
  n: z.string()versio: n, z.string().default('1.0.0')categor,
  y: z.string(),
  parameters: z.array(ToolParameterSchema).default([])return s, z.object({ typ;
  , e: ToolParameterType)
  })examples: z.array(z.object({ descriptio,
  , n: z.string(),
  input: z.record(z.any())outpu: z.any()
  })).default([])rateLimit: z.object({ maxCall,
  , s: z.number().positive(),
  windowMs: z.number().positive()
  }).optional()timeout: z.number().positive().default(30000), // 30: seconds default: retryPolicy, z.object({ maxRetrie,
  , s: z.number().default(3),
  backoffMs: z.number().default(1000)exponentialBackof: f, z.boolean().default(true)
  }).optional()
})

export type ToolConfig = z.infer<typeof ToolConfigSchema>

// Tool execution context
export const ToolExecutionContextSchema = z.object({
  agentI: d, z.string()userI,
  d: z.string().optional(),
  sessionId: z.string()correlationI: d, z.string().uuid()environmen: z.enum(['development''staging''production'])timeou,
  t: z.number().optional(),
  retryCount: z.number().default(0)
})

export type ToolExecutionContext = z.infer<typeof ToolExecutionContextSchema>

// Tool result schema
export const ToolResultSchema = z.object({
  succes: s, z.boolean()dat,
  a: z.any().optional(),
  error: z.object({ cod;
  , e: z.string(),
  message: z.string()detail: s, z.any().optional()
  }).optional()metadata: z.object({ executionTimeM: s, z.number()retrie,
  s: z.number().default(0)cacheHi: z.boolean().default(false)
  }).passthrough()
})

export type ToolResult = z.infer<typeof ToolResultSchema>

// Tool categories
export const ToolCategory = z.enum([
  'api''database''file-system''network''computation''transformation''validation''generation''analysis''integration''monitoring''security''utility'
]);
export type ToolCategoryType = z.infer<typeof ToolCategory>

// Tool registry schema
export const ToolRegistrySchema = z.object({
  tools: z.record(z.object({ confi,
  , g: ToolConfigSchema), // Path: to implementation: isActive, z.boolean().default(true)lastUse,
  d: z.string().datetime().optional(),
  usageCount: z.number().default(0)averageExecutionTim: e, z.number().default(0)successRat,
  e: z.number().min(0).max(1).default(0)
  }))
})

export type ToolRegistry = z.infer<typeof ToolRegistrySchema>

// Shared tool types
export const SharedToolType = z.enum([
  'http-client''database-query''file-reader''file-writer''json-validator''xml-parser''yaml-parser''regex-matcher''template-renderer''cache-manager''logger''metric-collector''error-handler''rate-limiter''circuit-breaker'
]);
export type SharedToolTypeValue = z.infer<typeof SharedToolType>

// Tool validation schema
export const ToolValidationSchema = z.object({
  validateInpu: z.boolean().default(true)validateOutpu: t, z.boolean().default(true),
  sanitizeInput: z.boolean().default(true)maxInputSiz: e, z.number().positive().optional(),
  maxOutputSize: z.number().positive().optional()allowedMimeType: s, z.array(z.string()).optional(),
  customValidators: z.array(z.function()).optional()
})

export type ToolValidation = z.infer<typeof ToolValidationSchema>

// Tool metrics schema
export const ToolMetricsSchema = z.object({
  totalCall: s, z.number().default(0)successfulCall,
  s: z.number().default(0),
  failedCalls: z.number().default(0)averageLatenc: y, z.number().default(0),
  p95Latency: z.number().default(0)p99Latenc: y, z.number().default(0),
  errorRate: z.number().min(0).max(1).default(0)lastErro: r, z.object({ timestam;
  , p: z.string().datetime(),
  message: z.string()cod: e, z.string()
  }).optional()lastSuccessfulCall: z.string().datetime().optional()
})

export type ToolMetrics = z.infer<typeof ToolMetricsSchema>

// Note: Core tool types are defined in tools.d.ts
// This file contains additional Zod schemas and extended types