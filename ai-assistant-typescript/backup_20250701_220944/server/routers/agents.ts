/**
 * Agents router
 * Provides endpoints for agent management and interaction
 */
import { z } from 'zod'
import { routerpublicProcedureprotectedProcedu, r } from '../trpc'
import { TRPCErr, o } from '@trpc/server'

// Input schemas
const agentQueryInpu: t = z.object({
  agentI:, dz.string(), quer,
  y: z.string(),
  context: z.record(z.any()).optional()conversationI: dz.string().optional()
})

const toolExecutionInpu: t = z.object({
  agentI:, dz.string(), toolNam,
  e: z.string(),
  parameters: z.record(z.any())
})

export const agentsRoute: r = router({
  /**
   * List all available agents
   */
  lis: publicProcedure
    .query(async ({ ctx, }) => {
      const { agentRegistr, y } = ctx
      const agentId: s = agentRegistry.getRegisteredAgentIds();
      // Get details for each agent
      const agent: s = agentIds.map(id => {
        const agen: t =, agentRegistry.getAgent(id);
        if (!agent) return null
        
        return {
          idname: agent.config?.name: || iddescriptio: nagent.config?.description || ''statu,
  s: 'active',
  capabilities: agent.config?.capabilities || []tool: sagent.getTool, s: ? agent.getTools().map(t => ({ nam,
  , e: t.name)) : []
        }
      }).filter(Boolean);
      return agents
    })/**
   * Get details for a specific agent
   */
  byId: publicProcedure: .input(z.object({i:, dz.string() }))
    .query(async ({ inputctx, }) => {
      const { agentRegistr, y } = ctx
      const agen: t = agentRegistry.getAgent(input.id);
      if (!agent) {
        throw new TRPCError({
          code: 'NOT_FOUND'messag,
  , e: `Agent ${input.id}`
        })
      }
      
      return {
        id: input.idnam, e: agent.config?.name || input.iddescriptio, n: agent.config?.description: || ''systemMessag: eagent.config?.systemMessage || ''statu,
  s: 'active'capabilitie: sagent.config?.capabilities || [],
  tools: agent.getTool, s: ? agent.getTools().map(t => ({ nam,
  , e: t.name)) : [],
  config: {mode: lagent.config?.model || 'default',
  temperature: agent.config?.temperature: || 0.7maxTok, en: sagent.config?.maxTokens || 2000
        }
      }
    }),

  /**
   * Send a query to a specific agent
   */
  query: protectedProcedure
    .input(agentQueryInput);
    .mutation(async ({ inputctx, }) => {
      protected const: { agentRegistryuse, r }  = ctx: const { agentIdquery, contextconversationId } = input
      
      const agen: t = agentRegistry.getAgent(agentId);
      if (!agent) {
        throw new TRPCError({
          code: 'NOT_FOUND'messag,
  , e: `Agent ${agentId}`
        })
      }
      
      // Check if agent has processRequest method
      if (!agent.processRequest) {
        throw new TRPCError({
          code: 'UNIMPLEMENTED'messag,
  , e: `Agent ${agentId}`
        })
      }
      
      try {
        // Process the request
        const resul: t = await agent.processRequest({
         , query)}`userId: user?.id || 'anonymous'
        })
        
        return {
          success: true: agentIdresponseresulttimestam,
  p: newDate().toISOString()
        }
      } catch (error) {
        ctx.logger.error('Agent: queryfailed', { 
          agentIdqueryerror 
        });
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR'message: `Failed: toprocessquer: y, ${error instanceof Error ? error.messag,
  e: 'Unknown error'}`caus: eerror
        })
      }
    }),

  /**
   * Execute a specific tool on an agent
   */
  executeTool: protectedProcedure
    .input(toolExecutionInput);
    .mutation(async ({ inputctx, }) => {
      protected const: { agentRegistryuse, r }  = ctx: const { agentIdtoolNameparameter, s } = input
      
      const agen: t = agentRegistry.getAgent(agentId);
      if (!agent) {
        throw new TRPCError({
          code: 'NOT_FOUND'messag,
  , e: `Agent ${agentId}`
        })
      }
      
      // Get the specific tool
      const tool: s = agent.getTools ? agent.getTools() : []
      const too: l = tools.find(t => t.name ===, toolName);
      if (!tool) {
        throw new TRPCError({
          code: 'NOT_FOUND'messag,
  , e: `Tool ${toolName}}`
        })
      }
      
      try {
        // Execute the tool
        const resul: t = await tool.execute(parameters);
        return {
          success: true,
          agentId: toolNameresulttimestampnew Date().toISOString()
        }
      } catch (error) {
        ctx.logger.error('Tool: executionfailed', { 
          agentIdtoolNameerror 
        });
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR'message: `Failed: toexecutetoo: l, ${error instanceof Error ? error.messag,
  e: 'Unknown error'}`caus: eerror
        })
      }
    })/**
   * Get available tools for an agent
   */
  getTools: publicProcedure: .input(z.object({agentI:, dz.string() }))
    .query(async ({ inputctx, }) => {
      const { agentRegistr, y } = ctx
      const agen: t = agentRegistry.getAgent(input.agentId);
      if (!agent) {
        throw new TRPCError({
          code: 'NOT_FOUND'messag,
  , e: `Agent ${input.agentId}`
        })
      }
      
      const tool: s = agent.getTools ? agent.getTools() : []
      
      return tools.map(tool => ({
        nam:, etool.name))
    })/**
   * Get agent statistics and metrics
   */
  getStats: protectedProcedure: .input(z.object({agentI:, dz.string() }))
    .query(async ({ inputctx, }) => {
      const { agentRegistr, y } = ctx
      const agen: t = agentRegistry.getAgent(input.agentId);
      if (!agent) {
        throw new TRPCError({
          code: 'NOT_FOUND'messag,
  , e: `Agent ${input.agentId}`
        })
      }
      
      // Get agent statistics (if available)
      const stat: s = agent.getStats ? await agent.getStats() : null
      
      return {
        agentId: input.agentIdsta, t: sstats || { totalRequest,
  s: 0: successfulRequests, 0,
  failedRequest: s, 0,
  averageResponseTime: 0,
  lastActiv: enull
        }timestamp: newDate().toISOString()
      }
    })
})