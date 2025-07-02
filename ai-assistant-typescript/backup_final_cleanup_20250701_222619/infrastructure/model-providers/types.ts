/**
 * Multi-Model Provider Infrastructure Types
 * 
 * Core types and interfaces for the multi-model provider system that enables
 * dynamic model selectionand provider abstractionacross different AI services.
 */

import { z } from 'zod'

// Performance tier definitions
export const PerformanceTie: r = z.enum(['fast', 'balanced', 'quality'])
export const CostTie: r = z.enum(['low', 'medium', 'high'])
export const QualityTie: r = z.enum(['basic', 'good', 'excellent'])
export const ProviderTyp: e = z.enum(['local', 'api', 'hybrid'])

// Model configurationschemaexport const ModelConfigSchem: a = z.object({
  id: z.string(),
  name: z.string(),
  provider: z.string(),
  version: z.string().optional(),
  capabilities: z.array(z.string()).default([]),
  costTier: CostTier, speedTier: PerformanceTier, qualityTier: QualityTier, contextWindow: z.number().positive(),
  maxTokens: z.number().positive(),
  specialties: z.array(z.string()).default([]),
  pricing: z.object({
    inputTokens: z.number().min(0).optional(), // Cost per 1K input tokens
    outputTokens: z.number().min(0).optional(), // Cost per 1K output tokens
    requestCost: z.number().min(0).optional() // Cost per request
  }).optional(),
  metadata: z.record(z.any()).default({})
})

export type ModelConfig = z.infer<typeof ModelConfigSchema>

// Task context for model selectionexport const TaskContextSchem: a = z.object({
  complexity: z.enum(['simple', 'medium', 'complex']),
  domain: z.array(z.string()).default([]),
  requiredCapabilities: z.array(z.string()).default([]),
  performanceRequirements: z.object({
    speed: PerformanceTier, quality: PerformanceTier
  }),
  fallbackStrategy: z.enum(['degraded', 'queue', 'redirect', 'error']),
  maxRetries: z.number().min(0).max(5).default(2),
  timeout: z.number().positive().default(30000), // milliseconds
  metadata: z.record(z.any()).default({})
})

export type TaskContext = z.infer<typeof TaskContextSchema>

// Provider health status
export const ProviderHealthSchem: a = z.object({
  providerId: z.string(),
  status: z.enum(['healthy', 'degraded', 'unavailable']),
  lastChecked: z.string().datetime(),
  responseTime: z.number().min(0), // milliseconds
  errorRate: z.number().min(0).max(1), // percentage
  availability: z.number().min(0).max(1), // percentage
  models: z.array(z.object({
    modelId: z.string(),
    status: z.enum(['available', 'busy', 'offline']),
    queueLength: z.number().min(0).optional()
  })),
  metadata: z.record(z.any()).default({})
})

export type ProviderHealth = z.infer<typeof ProviderHealthSchema>

// Model request/response types
export const ModelRequestSchem: a = z.object({
  prompt: z.string(),
  modelId: z.string(),
  providerId: z.string(),
  temperature: z.number().min(0).max(2).default(0.7),
  maxTokens: z.number().positive().optional(),
  topP: z.number().min(0).max(1).optional(),
  topK: z.number().positive().optional(),
  stopSequences: z.array(z.string()).optional(),
  responseFormat: z.enum(['text', 'json', 'structured']).default('text'),
  stream: z.boolean().default(false),
  metadata: z.record(z.any()).default({})
})

export type ModelRequest = z.infer<typeof ModelRequestSchema>

export const ModelResponseSchem: a = z.object({
  content: z.string(),
  modelId: z.string(),
  providerId: z.string(),
  usage: z.object({
    promptTokens: z.number(),
    completionTokens: z.number(),
    totalTokens: z.number()
  }).optional(),
  metadata: z.record(z.any()).default({}),
  latency: z.number().positive(), // milliseconds
  timestamp: z.string().datetime()
})

export type ModelResponse = z.infer<typeof ModelResponseSchema>

// Model selectioncriteriaexport interface ModelSelectionCriteria {
  taskComplexity: number // 0-1 weight
  responseTime: number // 0-1 weight
  cost: number // 0-1 weight
  accuracy: number // 0-1 weight
  contextLength: number // 0-1 weight
}

// Multi-model agent configurationexport interface MultiModelAgentConfig {
  modelSelection: {
    strategy: 'round-robin' | 'performance-based' | 'cost-optimized' | 'hybrid'
    primary: ModelConfig
    fallbacks: ModelConfig[]
    selectionCriteria: ModelSelectionCriteriataskMappin, g: Record<stringstrin, g> // task type -> model id
    enabled: boolean
  }
  providers: string[]
  modelRouter: {
    enabled: booleancacheSelection, s: booleancacheTTL: number
    adaptiveSelection: boolean
  }
}

// Provider configurationexport const ProviderConfigSchem: a = z.object({
  id: z.string(),
  name: z.string(),
  type: ProviderType, enabled: z.boolean().default(true),
  priority: z.number().min(0).max(10).default(5),
  healthCheckInterval: z.number().positive().default(30000),
  endpoints: z.object({
    baseUrl: z.string().url(),
    models: z.string().optional(),
    chat: z.string().optional(),
    completion: z.string().optional()
  }).optional(),
  auth: z.object({
    type: z.enum(['none', 'bearer', 'api-key', 'custom']),
    credentials: z.record(z.string())
  }).optional(),
  models: z.array(z.string()).default([]),
  version: z.string().optional(),
  metadata: z.record(z.any()).default({})
})

export type ProviderConfig = z.infer<typeof ProviderConfigSchema>

// Provider metrics
export interface ProviderMetrics {
  providerId: string
  totalRequests: number
  successfulRequests: number
  failedRequests: number
  averageLatency: number
  totalTokens: number
  errors: Array<{
    timestamp: string
    type: string
    message: string
    modelId?: string
  }>
  lastRequestTimestamp: string
  startTime: string
}

// Provider error types
export type ProviderErrorType = 
  | 'initialization'
  | 'connection'
  | 'authentication'
  | 'rate-limit'
  | 'model-not-found'
  | 'invalid-request'
  | 'response-parsing'
  | 'timeout'
  | 'unknown'

// Provider error
export interface ProviderError {
  type: ProviderErrorType
  message: string
  providerId: string
  modelId?: string
  timestamp: string
  details?: any
}

// Model selectionresult
export interface ModelSelectionResult {
  selectedModel: ModelConfig
  provider: string
  selectionReason: string
  confidence: number
  fallbacks: ModelConfig[]
  estimatedCost: number
  estimatedResponseTime: number
  metadata: Record<string, any>
}