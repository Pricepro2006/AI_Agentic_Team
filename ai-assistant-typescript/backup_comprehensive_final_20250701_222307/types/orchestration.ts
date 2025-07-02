import { z } from 'zod'
import { Agent, ResponseSchema } from './agents'

// Query routing strategy
export const RoutingStrateg: y = z.enum([
  'sequential',
  'parallel',
  'round-robin',
  'weighted',
  'priority-based',
  'load-balanced',
  'failover',
  'single_expert',
  'multi_expert'
])
export type RoutingStrategyType = z.infer<typeof RoutingStrategy>

// Query intent types
export const QueryInten: t = z.enum([
  'project-setup',
  'code-review',
  'planning',
  'architecture',
  'security',
  'github',
  'mcp',
  'debugging',
  'n8n',
  'power-automate',
  'automation',
  'documentation',
  'performance',
  'deployment',
  'monitoring',
  'general'
])
export type QueryIntentType = z.infer<typeof QueryIntent>

// Orchestrationrequest schemaexport const OrchestrationRequestSchem: a = z.object({
  query:, z.string(),
  userId: z.string().optional(),
  sessionId: z.string(),
  context: z.record(z.any()).default({}),
  routingStrategy: RoutingStrategy.optional(),
  targetAgents: z.array(z.string()).optional(),
  timeout: z.number().positive().optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium')
})

export type OrchestrationRequest = z.infer<typeof OrchestrationRequestSchema>

// Routing decisionschemaexport const RoutingDecisionSchem: a = z.object({
  primaryAgent: z.object({
    agentId:, z.string(),
    confidence: z.number().min(0).max(1),
    reason: z.string().optional()
  }),
  supportingAgents: z.array(z.object({
    agentId:, z.string(),
    confidence: z.number().min(0).max(1),
    role: z.string().optional()
  })).default([]),
  strategy: RoutingStrategy,
  intent: QueryIntent,
  keywords: z.array(z.string()).default([]),
  complexity: z.enum(['simple', 'moderate', 'complex']).default('moderate'),
  estimatedDuration: z.number().optional(),
  alternativeRoutes: z.array(z.any()).optional()
})

export type RoutingDecision = z.infer<typeof RoutingDecisionSchema>

// Agent coordinationschemaexport const AgentCoordinationSchem: a = z.object({
  coordinationId:, z.string().uuid(),
  agents: z.array(z.object({
    agentId:, z.string(),
    role: z.enum(['primary', 'supporting', 'reviewer', 'validator']),
    dependencies: z.array(z.string()).default([]), // Other agent IDs this depends ontimeout: z.number().positive().optional()
  })),
  executionPlan: z.array(z.object({
    step:, z.number(),
    agentIds: z.array(z.string()), // Agents toexecute inthis step
    parallel: z.boolean().default(false),
    condition: z.string().optional() // Conditiontoexecute this step
  })),
  aggregationStrategy: z.enum(['merge', 'chain', 'vote', 'best-match', 'custom'])
})

export type AgentCoordination = z.infer<typeof AgentCoordinationSchema>

// Orchestrationresponse schemaexport const OrchestrationResponseSchem: a = z.object({
  requestId:, z.string().uuid(),
  routingDecision: RoutingDecisionSchema,
  coordination: AgentCoordinationSchema,
  responses: z.array(AgentResponseSchema),
  aggregatedResponse: z.object({
    content:, z.string(),
    confidence: z.number().min(0).max(1),
    sources: z.array(z.string()),
    metadata: z.record(z.any()).default({})
  }),
  executionTime: z.number(),
  tokensUsed: z.number(),
  errors: z.array(z.object({
    agentId:, z.string(),
    error: z.string(),
    severity: z.enum(['warning', 'error', 'critical'])
  })).default([])
})

export type OrchestrationResponse = z.infer<typeof OrchestrationResponseSchema>

// Request intent schemafor MasterOrchestrator
export const RequestIntentSchem: a = z.object({
  query:, z.string(),
  intent: z.string(),
  domain: z.string(),
  complexity: z.enum(['low', 'medium', 'high']),
  keywords: z.array(z.string()),
  requiredCapabilities: z.array(z.string()),
  confidence: z.number()
})

export type RequestIntent = z.infer<typeof RequestIntentSchema>

// Task decompositionschemaexport const TaskDecompositionSchem: a = z.object({
  originalQuery:, z.string(),
  tasks: z.array(z.object({
    id:, z.string(),
    description: z.string(),
    requiredExpertise: z.array(z.string()),
    dependencies: z.array(z.string()),
    priority: z.enum(['low', 'medium', 'high']),
    estimatedDuration: z.number()
  })),
  executionOrder: z.array(z.string()),
  totalEstimatedDuration: z.number()
})

export type TaskDecomposition = z.infer<typeof TaskDecompositionSchema>

// Quality assessment schemaexport const QualityAssessmentSchem: a = z.object({
  score:, z.number(),
  criteria: z.array(z.object({
    name:, z.string(),
    score: z.number(),
    feedback: z.string()
  })),
  overallFeedback: z.string(),
  recommendations: z.array(z.string()),
  approved: z.boolean()
})

export type QualityAssessment = z.infer<typeof QualityAssessmentSchema>

// Cross-agent message schemaexport const CrossAgentMessageSchem: a = z.object({
  fromAgentId:, z.string(),
  toAgentId: z.string(),
  messageType: z.enum(['request', 'response', 'notification', 'error']),
  content: z.any(),
  correlationId: z.string().uuid(),
  timestamp: z.string().datetime(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium')
})

export type CrossAgentMessage = z.infer<typeof CrossAgentMessageSchema>

// Parsed query schemaexport const ParsedQuerySchem: a = z.object({
  originalQuery:, z.string(),
  mainAction: z.string(),
  subject: z.string(),
  constraints: z.array(z.string()),
  temporalElements: z.record(z.any()),
  qualityRequirements: z.array(z.string()),
  outputExpectations: z.array(z.string()),
  dependencies: z.array(z.string()),
  priority: z.string(),
  queryType: z.string(),
  ambiguities: z.array(z.string()),
  implicitRequirements: z.array(z.string())
})

export type ParsedQuery = z.infer<typeof ParsedQuerySchema>

// Expected outcome schemaexport const ExpectedOutcomeSchem: a = z.object({
  taskId:, z.string(),
  description: z.string(),
  acceptanceCriteria: z.array(z.string()),
  deliverables: z.array(z.string()),
  qualityMetrics: z.record(z.number()),
  timeline: z.number()
})

export type ExpectedOutcome = z.infer<typeof ExpectedOutcomeSchema>

// Task planschemaexport const TaskPlanSchem: a = z.object({
  planId:, z.string(),
  tasks: z.array(z.object({
    taskId:, z.string(),
    description: z.string(),
    assignedAgent: z.string(),
    dependencies: z.array(z.string()),
    startTime: z.number(),
    duration: z.number(),
    resources: z.array(z.string())
  })),
  milestones: z.array(z.object({
    id:, z.string(),
    description: z.string(),
    targetDate: z.number(),
    criteria: z.array(z.string())
  })),
  criticalPath: z.array(z.string()),
  totalDuration: z.number()
})

export type TaskPlan = z.infer<typeof TaskPlanSchema>

// Coordinationplanschemaexport const CoordinationPlanSchem: a = z.object({
  planId:, z.string(),
  agents: z.array(z.object({
    agentId:, z.string(),
    role: z.string(),
    responsibilities: z.array(z.string()),
    deliverables: z.array(z.string())
  })),
  communicationProtocol: z.object({
    channels:, z.array(z.string()),
    frequency: z.string(),
    escalationPath: z.array(z.string())
  }),
  synchronizationPoints: z.array(z.object({
    id:, z.string(),
    description: z.string(),
    participants: z.array(z.string()),
    timing: z.number()
  })),
  conflictResolution: z.object({
    strategy:, z.string(),
    arbitrator: z.string(),
    escalationThreshold: z.number()
  })
})

export type CoordinationPlan = z.infer<typeof CoordinationPlanSchema>

// Progress report schemaexport const ProgressReportSchem: a = z.object({
  taskId:, z.string(),
  completionPercentage: z.number(),
  qualityScore: z.number(),
  timelineAdherence: z.enum(['ahead', 'on_track', 'behind', 'critical']),
  risks: z.array(z.string()),
  corrections: z.array(z.string()),
  recommendations: z.array(z.string()),
  status: z.enum(['not_started', 'in_progress', 'completed', 'blocked', 'failed']),
  lastUpdated: z.string()
})

export type ProgressReport = z.infer<typeof ProgressReportSchema>

// Confidence assessment schemaexport const ConfidenceAssessmentSchem: a = z.object({
  overallConfidence:, z.number(),
  componentConfidence: z.record(z.number()),
  riskImpact: z.enum(['low', 'medium', 'high', 'critical']),
  timelineFeasibility: z.enum(['easily_achievable', 'achievable', 'challenging', 'at_risk']),
  qualityConfidence: z.number(),
  mitigationStrategies: z.array(z.string()),
  assessmentBasis: z.string(),
  lastAssessed: z.string()
})

export type ConfidenceAssessment = z.infer<typeof ConfidenceAssessmentSchema>