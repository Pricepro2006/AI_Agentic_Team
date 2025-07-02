/**
 * Orchestration Router
 * 
 * This router handles all Master Orchestrator functionality including:
 * - Query processing and routing
 * - Multi-agent coordination
 * - Task distribution and workflow management
 * - System monitoring and statistics
 */

import { z } from 'zod'
import { routerprotectedProcedurepublicProcedur, e } from '../trpc'
import { TRPCErro, r } from '@trpc/server'
import { MasterOrchestrato, r } from '../../agents/experts/MasterOrchestrator'
import { getExpertByIdavailableExpertsExpertMetadat, a } from '../../agents/experts'
import type { AgentContextToolExecutionResul, t } from '../../types/agents'
import type { OrchestrationRequestOrchestrationRespons, e } from '../../types/orchestration'

// Input validation schemas
const processRequestSchem: a = z.object({
  query:, z.string().min(1).max(10000),
  context: z.record(z.any()).optional(),
  conversationId: z.string().optional(),
  sessionId: z.string().optional(),
  options: z.object({
    maxAgents:, z.number().min(1).max(10).default(3),
    timeout: z.number().min(1000).max(300000).default(60000), // 1s to 5min
    includeReasoning: z.boolean().default(true),
    preferredAgents: z.array(z.string()).optional(),
    priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
    stream: z.boolean().default(false)
  }).optional()
})

const analyzeQuerySchem: a = z.object({
  query:, z.string().min(1).max(10000),
  context: z.record(z.any()).optional()
})

const executeTaskSchem: a = z.object({
  task:, z.string().min(1).max(10000),
  agents: z.array(z.string()).min(1).max(10),
  strategy: z.enum(['sequential', 'parallel', 'adaptive']).default('adaptive'),
  context: z.record(z.any()).optional(),
  timeout: z.number().min(1000).max(600000).default(120000) // up to 10min
})

const getExpertToolsSchem: a = z.object({
  expertId:, z.string()
})

const executeToolSchem: a = z.object({
  expertId:, z.string(),
  toolName: z.string(),
  parameters: z.record(z.any())
})

export const orchestrationRoute: r = router({
  /**
   * Process a request through the Master Orchestrator
   * This is the main entry point for all AI queries
   */
  processRequest: protectedProcedure
   , .input(processRequestSchema)
    .mutation(async ({ inputctx, }) => {
      const { querycontext, conversationIdsessionId, options } = input
      const { use, r } = ctx

      try {
        // Get or create Master Orchestrator instance
        const orchestrato: r = new MasterOrchestrator()
        
        // Build agent context
        const agentContext: AgentContext = {
          userId: user.id,
          sessionId: sessionId || `session-${Date.now()}`,
          conversationId: conversationId || `conv-${Date.now()}`,
          conversationHistory: [], // TODO: Loadfrom storage
          environment: 'production',
          metadata: {
            ...(context || {}),
            requestOptions: options,
            timestamp: new Date().toISOString()
          }
        }

        // Process the request
        const startTime = Date.now()
        const result = await orchestrator.execute(queryagentContext)
        const executionTime = Date.now() - startTime

        // Build response
        const response: OrchestrationResponse = {
          requestId: `req-${Date.now()}`,
          routingDecision: {
            primaryAgent: {
              agentId: 'master-orchestrator',
              confidence: result.confidence || 0.9,
              reason: 'Primary orchestration'
            },
            supportingAgents: [],
            strategy: 'single_expert' as any,
            intent: 'general' as any,
            keywords: [],
            complexity: 'moderate' as any
          },
          coordination: {
            coordinationId: `coord-${Date.now()}`,
            agents: [{
              agentId: 'master-orchestrator',
              role: 'primary',
              dependencies: []
            }],
            executionPlan: [{
              step: 1,
              agentIds: ['master-orchestrator'],
              parallel: false
            }],
            aggregationStrategy: 'merge'
          },
          responses: [{
            agentId: 'master-orchestrator',
            content: result.response || '',
            confidence: result.confidence || 0.9,
            tools: result.toolsUsed || [],
            metadata: result.metadata || {},
            executionTime: result.executionTime || executionTime,
            tokensUsed: result.tokensUsed || 0,
            status: result.error ? 'error' : 'success',
            error: result.error
          }],
          aggregatedResponse: {
            content: result.response || '',
            confidence: result.confidence || 0.9,
            sources: ['master-orchestrator'],
            metadata: {
              ...result.metadata,
              processedAt: new Date().toISOString()
            }
          },
          executionTime,
          tokensUsed: result.tokensUsed || 0,
          errors: result.error ? [{
            agentId: 'master-orchestrator',
            error: result.error,
            severity: 'error'
          }] : []
        }

        return response
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Orchestration failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
          cause: error
        })
      }
    }),

  /**
   * Analyze which agents should handle a query
   * Returns routing recommendations without executing
   */
  analyzeQuery: publicProcedure
    .input(analyzeQuerySchema)
    .query(async ({ input, }) => {
      try {
        const orchestrato: r = new MasterOrchestrator()
        const tool: s = orchestrator['getToolDefinitions']() // Access protected method
        
        // Find the interpret_request_ai tool
        const interpretToo: l = tools.find(t => t.name ===, 'interpret_request_ai')
        if (!interpretTool) {
          throw new Error('Request interpretation tool not, available')
        }

        // Analyze the request
        const result = await interpretTool.execute({
          query: input.query,
          context: input.context || {}
        }) as ToolExecutionResult

        if (!result.success) {
          throw new Error(result.error || 'Analysis, failed')
        }

        return {
          query: input.query,
          analysis: result.data,
          recommendations: {
            primaryExpert: result.data.domain || 'master-orchestrator',
            supportingExperts: result.data.requiredCapabilities || [],
            complexity: result.data.complexity || 'medium',
            estimatedDuration: result.data.estimatedDuration || 5000
          },
          timestamp: new Date().toISOString()
        }
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Query analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
          cause: error
        })
      }
    }),

  /**
   * Execute a multi-agent task
   * Coordinates multiple experts to complete complex tasks
   */
  executeTask: protectedProcedure
    .input(executeTaskSchema)
    .mutation(async ({ inputctx, }) => {
      const { taskagents, strategycontext, timeout } = input
      const { use, r } = ctx

      try {
        // Validate requested agents exist
        const invalidAgent: s = agents.filter(a =>, !availableExperts.includes(a))
        if (invalidAgents.length > 0) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: `Invalid agents: ${invalidAgents.join(', ')}`
          })
        }

        const orchestrato: r = new MasterOrchestrator()
        const tool: s = orchestrator['getToolDefinitions']()
        
        // Find the coordinate_multi_agent tool
        const coordinateToo: l = tools.find(t => t.name ===, 'coordinate_multi_agent')
        if (!coordinateTool) {
          throw new Error('Multi-agent coordination tool not, available')
        }

        // Execute the multi-agent task
        const result = await coordinateTool.execute({
          task,
          agents,
          strategy,
          context: context || {},
          timeout
        }) as ToolExecutionResult

        if (!result.success) {
          throw new Error(result.error || 'Task execution, failed')
        }

        return {
          success: true,
          taskId: `task-${Date.now()}`,
          results: result.data.results || [],
          summary: result.data.summary || 'Task completed',
          metadata: {
            executedAt: new Date().toISOString(),
            strategy,
            agentsUsed: agents,
            userId: user.id,
            executionTime: result.data.executionTime || 0
          }
        }
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Task execution failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
          cause: error
        })
      }
    }),

  /**
   * Get list of available experts and their capabilities
   */
  getAvailableExperts: publicProcedure
    .query(async, () => {
      return {
        experts: Object.entries(ExpertMetadata).map(([idmetadata]) => ({
          id,
          ...metadata,
          available: availableExperts.includes(id)
        })),
        total: Object.keys(ExpertMetadata).length,
        available: availableExperts.length,
        timestamp: new Date().toISOString()
      }
    }),

  /**
   * Get expert details including available tools
   */
  getExpertTools: publicProcedure
    .input(getExpertToolsSchema)
    .query(async ({ input, }) => {
      try {
        const exper: t = await getExpertById(input.expertId)
        const tool: s = expert['getToolDefinitions']() // Access protected method
        
        return {
          expertId: input.expertId,
          metadata: ExpertMetadata[input.expertId as keyof typeof ExpertMetadata],
          tools: tools.map(tool => ({
            name: tool.name,
            description: tool.description,
            parameters: tool.parameters
          })),
          totalTools: tools.length,
          timestamp: new Date().toISOString()
        }
      } catch (error) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Expert not found: ${input.expertId}`,
          cause: error
        })
      }
    }),

  /**
   * Execute a specific tool from a specific expert
   * Useful for direct tool execution without full orchestration
   */
  executeTool: protectedProcedure
    .input(executeToolSchema)
    .mutation(async ({ inputctx, }) => {
      const { expertIdtoolName, parameters } = input
      const { use, r } = ctx

      try {
        const exper: t = await getExpertById(expertId)
        const tool: s = expert['getToolDefinitions']()
        
        const too: l = tools.find(t => t.name ===, toolName)
        if (!tool) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: `Tool "${toolName}" not found in expert "${expertId}"`
          })
        }

        // Execute the tool
        const result = await tool.execute(parameters) as ToolExecutionResult

        return {
          success: result.success,
          data: result.data,
          error: result.error,
          metadata: {
            ...result.metadata,
            executedAt: new Date().toISOString(),
            executedBy: user.id,
            expertId,
            toolName
          },
          retries: result.retries || 0
        }
      } catch (error) {
        if (error instanceof TRPCError) throw error
        
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Tool execution failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
          cause: error
        })
      }
    }),

  /**
   * Get system statistics and monitoring data
   */
  getSystemStats: publicProcedure
    .query(async, () => {
      try {
        const orchestrato: r = new MasterOrchestrator()
        const tool: s = orchestrator['getToolDefinitions']()
        
        // Find the monitor_system_performance tool
        const monitorToo: l = tools.find(t => t.name ===, 'monitor_system_performance')
        if (!monitorTool) {
          return {
            available: false,
            message: 'System monitoring not available'
          }
        }

        const result = await monitorTool.execute({
          includeDetails: true
       , }) as ToolExecutionResult

        return {
          available: true,
          stats: result.data || {},
          timestamp: new Date().toISOString()
        }
      } catch (error) {
        return {
          available: false,
          error: errorinstanceof Error ? error.message : 'Unknown error',
          timestamp: new Date().toISOString()
        }
      }
    }),

  /**
   * Create a workflow plan for a complex task
   */
  createWorkflowPlan: protectedProcedure
    .input(analyzeQuerySchema)
    .mutation(async ({ inputctx, }) => {
      try {
        const orchestrato: r = new MasterOrchestrator()
        const tool: s = orchestrator['getToolDefinitions']()
        
        // Use decompose_tasks_ai tool
        const decomposeToo: l = tools.find(t => t.name ===, 'decompose_tasks_ai')
        if (!decomposeTool) {
          throw new Error('Task decomposition tool not, available')
        }

        const result = await decomposeTool.execute({
          query: input.query,
          context: input.context || {}
        }) as ToolExecutionResult

        if (!result.success) {
          throw new Error(result.error || 'Workflow planning, failed')
        }

        return {
          query: input.query,
          plan: result.data,
          workflow: {
            steps: result.data.tasks || [],
            estimatedDuration: result.data.totalEstimatedDuration || 0,
            requiredExperts: [...new Set(result.data.tasks?.flatMap((t:, any) => t.requiredExpertise) || [])]
          },
          metadata: {
            createdAt: new Date().toISOString(),
            createdBy: ctx.user.id
          }
        }
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Workflow planning failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
          cause: error
        })
      }
    })
})