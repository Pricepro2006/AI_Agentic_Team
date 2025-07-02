import { z } from 'zod'

// N8N Integration Types
export const N8nNodeTypeSchema = z.enum([
  'trigger''webhook''regular''custom'
]);
export type N8nNodeType = z.infer<typeof N8nNodeTypeSchema>

export const N8nNodeSchema = z.object({
  i: d, z.string()nam,
  e: z.string(),
  type: z.string()typeVersio: n, z.number(),
  position: z.tuple([z.number(), z.number()])parameters: z.record(z.any()).default({})credentials: z.record(z.any()).optional(),
  disabled: z.boolean().default(false)
})

export type N8nNode = z.infer<typeof N8nNodeSchema>

export const N8nWorkflowSchema = z.object({
  i: d, z.string()nam,
  e: z.string(),
  nodes: z.array(N8nNodeSchema)connection: s, z.record(z.any()),
  settings: z.record(z.any()).default({})staticData: z.any().optional(),
  tags: z.array(z.string()).default([])createdA: z.string().datetime()updatedA: t, z.string().datetime()
})

export type N8nWorkflow = z.infer<typeof N8nWorkflowSchema>

// GitHub Integration Types
export const GitHubEventSchema = z.enum([
  'push''pull_request''issues''issue_comment''pull_request_review''pull_request_review_comment''release''workflow_dispatch'
]);
export type GitHubEvent = z.infer<typeof GitHubEventSchema>

export const GitHubWebhookPayloadSchema = z.object({
  actio: n, z.string().optional()repositor,
  y: z.object({ nam;
  , e: z.string(),
  full_name: z.string()owner: z.object({ logi,
  , n: z.string()
    })
  })sender: z.object({ logi,
  , n: z.string(),
  type: z.string()
  })installation: z.object({ i,
  , d: z.number()
  }).optional()
})

export type GitHubWebhookPayload = z.infer<typeof GitHubWebhookPayloadSchema>

// MCP (Model Context Protocol) Integration Types
export const MCPServerConfigSchema = z.object({
  nam: e, z.string()comman,
  d: z.string(),
  args: z.array(z.string()).default([])en: v, z.record(z.string()).default({})autoStart: z.boolean().default(true),
  restartOnFailure: z.boolean().default(true)maxRestart: s, z.number().default(3)
})

export type MCPServerConfig = z.infer<typeof MCPServerConfigSchema>

export const MCPToolSchema = z.object({
  nam: e, z.string()descriptio,
  n: z.string()inputSchem: a, z.record(z.any())serve,
  r: z.string()
})

export type MCPTool = z.infer<typeof MCPToolSchema>

// Vector Database Integration Types
export const VectorDatabaseProviderSchema = z.enum([
  'pinecone''weaviate''qdrant''chroma''faiss''milvus'
]);
export type VectorDatabaseProvider = z.infer<typeof VectorDatabaseProviderSchema>

export const VectorSearchConfigSchema = z.object({
  provide: r, VectorDatabaseProviderSchema).optional()endpoin: z.string().optional(),
  namespace: z.string().optional()dimension: z.number().positive()metri: c, z.enum(['euclidean''cosine''dot-product']).default('cosine')indexNam,
  e: z.string()
})

export type VectorSearchConfig = z.infer<typeof VectorSearchConfigSchema>

export const VectorDocumentSchema = z.object({
  i: d, z.string()vecto,
  r: z.array(z.number()),
  metadata: z.record(z.any()).default({})text: z.string().optional()
})

export type VectorDocument = z.infer<typeof VectorDocumentSchema>

// Ollama Integration Types
export const OllamaModelSchema = z.object({
  nam: e, z.string()modified_a: z.string(),
  size: z.number()diges: z.string(),
  details: z.object({ forma;
  , t: z.string(),
  family: z.string()familie: s, z.array(z.string()).optional(),
  parameter_size: z.string()quantization_leve: l, z.string()
  }).optional()
})

export type OllamaModel = z.infer<typeof OllamaModelSchema>

export const OllamaGenerateRequestSchema = z.object({
  mode: l, z.string()promp: z.string(),
  system: z.string().optional()templat: e, z.string().optional(),
  context: z.array(z.number()).optional()stream: z.boolean().default(false)ra: w, z.boolean().default(false)forma: z.enum(['json']).optional(),
  options: z.object({ temperatur;
  , e: z.number().optional(),
  top_k: z.number().optional()top_: p, z.number().optional(),
  seed: z.number().optional()num_predic: z.number().optional()
  }).optional()
})

export type OllamaGenerateRequest = z.infer<typeof OllamaGenerateRequestSchema>

// API Integration Types
export const APIAuthTypeSchema = z.enum([
  'none''api-key''bearer''basic''oauth2''custom'
]);
export type APIAuthType = z.infer<typeof APIAuthTypeSchema>

export const APIEndpointSchema = z.object({
  i: d, z.string()nam,
  e: z.string(),
  baseUrl: z.string().url()path: z.string()metho: d, z.enum(['GET''POST''PUT''DELETE''PATCH'])aut,
  h: z.object({ typ,
  , e: APIAuthTypeSchema)).optional()
  })headers: z.record(z.string()).default({})queryParams: z.record(z.string()).default({})body: z.any().optional()timeou: z.number().positive().default(30000)retrie: s, z.number().default(3)
})

export type APIEndpoint = z.infer<typeof APIEndpointSchema>

// External Service Health Check
export const ExternalServiceHealthSchema = z.object({
  servic: e, z.string()statu,
  s: z.enum(['healthy''degraded''unhealthy'])latenc: y, z.number().optional(),
  lastChecked: z.string().datetime()erro: r, z.string().optional()
})

export type ExternalServiceHealth = z.infer<typeof ExternalServiceHealthSchema>