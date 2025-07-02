import { z } from 'zod'

// Legacy model configuration for backward compatibility
const LegacyModelConfigSchema = z.object({
  model: z.string().default('mistral:latest'),
  temperature: z.number().min(0).max(2).default(0.7),
  maxTokens: z.number().positive().default(2000)
})

// Agent configuration schema with multi-model support
export const AgentConfigSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string(),
  version: z.string().default('1.0.0'),
  systemMessage: z.string(),
  specialties: z.array(z.string()).default([]),
  tools: z.array(z.string()).default([]),
  capabilities: z.array(z.string()).default([]),
  limitations: z.array(z.string()).default([]),
  integrations: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
  metadata: z.record(z.any()).default({}),
  
  // Multi-model configuration (new approach)
  multiModel: z.any().optional(), // MultiModelAgentConfigSchema when available
  
  // Legacy single model configuration (for backward compatibility)
  legacyModel: LegacyModelConfigSchema.optional(),
  
  // Runtime model selection preferences
  modelPreferences: z.object({
    preferMultiModel: z.boolean().default(true),
    fallbackToLegacy: z.boolean().default(true),
    taskSpecificModels: z.record(z.string()).optional(), // task type -> model id
    complexityThresholds: z.object({
      simple: z.string().optional(), // model for simple tasks
      medium: z.string().optional(), // model for medium complexity
      complex: z.string().optional(), // model for complex tasks
    }).optional()
  }).default({
    preferMultiModel: true
  })
}).superRefine((data, ctx) => {
  // Ensure at least one model configuration is provided
  if (!data.multiModel && !data.legacyModel) {
    // Set default legacy model configuration
    data.legacyModel = {
      model: 'mistral:latest',
      temperature: 0.7,
      maxTokens: 2000
    }
  }
})

export type AgentConfig = z.infer<typeof AgentConfigSchema>

// Agent response schema
export const AgentResponseSchema = z.object({
  response: z.string(),
  agentId: z.string(),
  agentName: z.string(),
  confidence: z.number().min(0).max(1),
  tokenUsage: z.object({
    prompt: z.number(),
    completion: z.number(),
    total: z.number()
  }),
  toolsUsed: z.array(z.string()).default([]),
  executionTime: z.number(),
  timestamp: z.string().datetime(),
  metadata: z.record(z.any()).default({}),
  error: z.string().optional()
})

export type AgentResponse = z.infer<typeof AgentResponseSchema>

// Tool definition schema
export const AgentToolSchema = z.object({
  name: z.string(),
  description: z.string(),
  parameters: z.object({
    type: z.literal('object'),
    properties: z.record(z.any()),
    required: z.array(z.string()).default([])
  }),
  execute: z.function().args(z.any()).returns(z.promise(z.any()))
})

export type AgentTool = z.infer<typeof AgentToolSchema>

// Context schema
export const AgentContextSchema = z.object({
  user: z.string().optional(),
  sessionId: z.string(),
  conversationHistory: z.array(z.object({
    role: z.enum(['user', 'assistant', 'system']),
    content: z.string(),
    timestamp: z.string().datetime()
  })).default([]),
  environment: z.enum(['development', 'staging', 'production']).default('development'),
  metadata: z.record(z.any()).default({})
})

export type AgentContext = z.infer<typeof AgentContextSchema>

// Cross-agent communication schema
export const CrossAgentMessageSchema = z.object({
  fromAgentId: z.string(),
  toAgentId: z.string(),
  messageType: z.enum(['request', 'response', 'notification', 'error']),
  content: z.any(),
  correlationId: z.string().uuid(),
  timestamp: z.string().datetime(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium')
})

export type CrossAgentMessage = z.infer<typeof CrossAgentMessageSchema>

// Performance metrics schema
export const PerformanceMetricsSchema = z.object({
  totalExecutions: z.number().default(0),
  successfulExecutions: z.number().default(0),
  failedExecutions: z.number().default(0),
  averageExecutionTime: z.number().default(0),
  minExecutionTime: z.number().default(Infinity),
  maxExecutionTime: z.number().default(0),
  averageTokenUsage: z.number().default(0),
  totalTokensUsed: z.number().default(0),
  successRate: z.number().min(0).max(1).default(0),
  lastExecutionTime: z.string().datetime().optional(),
  errorCounts: z.record(z.number()).default({})
})

export type PerformanceMetrics = z.infer<typeof PerformanceMetricsSchema>

// Agent capability types
export const AgentCapability = z.enum([
  'code-generation',
  'code-review',
  'api-design',
  'database-design',
  'security-audit',
  'performance-optimization',
  'documentation',
  'testing',
  'debugging',
  'project-management',
  'risk-assessment',
  'workflow-automation',
  'ui-design',
  'data-analysis',
  'integration',
  'deployment',
  'monitoring',
  'version-control',
  'collaboration'
]);
export type AgentCapabilityType = z.infer<typeof AgentCapability>

// Agent status
export const AgentStatusSchema = z.enum([
  'ready',
  'busy',
  'error',
  'maintenance',
  'offline'
]);
export type AgentStatus = z.infer<typeof AgentStatusSchema>

// Agent metadata
export const AgentMetadataSchema = z.object({
  status: AgentStatusSchema,
  lastHealthCheck: z.string().datetime(),
  uptime: z.number(), // in seconds
  currentLoad: z.number().min(0).max(1), // 0-1 representing load percentage
  queueLength: z.number().default(0),
  version: z.string(),
  dependencies: z.array(z.string()).default([])
})

export type AgentMetadata = z.infer<typeof AgentMetadataSchema>

// Tool execution result
export const ToolExecutionResultSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  error: z.string().optional(),
  metadata: z.record(z.any()).optional(),
  toolName: z.string().optional(),
  executionTime: z.number().optional(),
  retries: z.number().default(0)
})

export type ToolExecutionResult = z.infer<typeof ToolExecutionResultSchema>

// Agent registry entry
export const AgentRegistryEntrySchema = z.object({
  agentId: z.string(),
  agentClass: z.string(),
  category: z.enum(['core', 'domain', 'specialized', 'management']),
  dependencies: z.array(z.string()).default([]),
  isActive: z.boolean().default(true),
  loadOrder: z.number().default(0)
})

export type AgentRegistryEntry = z.infer<typeof AgentRegistryEntrySchema>