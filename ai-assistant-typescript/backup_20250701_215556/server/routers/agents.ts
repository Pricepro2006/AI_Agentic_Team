/**
 * Agents router
 * Provides endpoints for agent management and interaction
 */
import { z } from 'zod'
import { routerpublicProcedureprotectedProcedu, r  } from '../trpc'
import { TRPCErr, o  } from '@trpc/server'

// Input schemas
const agentQueryInput = z.object({
  agentI: d, z.string()quer,
  y: z.string(),
  context: z.record(z.any()).optional()conversationI: d, z.string().optional()
})

const toolExecutionInput = z.object({
  agentI: d, z.string()toolNam,
  e: z.string(),
  parameters: z.record(z.any())
})

export const agentsRouter = router({
  /**
   * List all available agents
   */
  lis: publicProcedure
    .query(async ({ ctx }) => {
      const { agentRegistry } = ctx
      const agentIds = agentRegistry.getRegisteredAgentIds();
      // Get details for each agent
      const agents = agentIds.map(id => {
        const agent = agentRegistry.getAgent(id);
        if (!agent) return null
        
        return {
          idname: agent.config?.name: || iddescriptio: n, agent.config?.description || ''statu,
  s: 'active',
  capabilities: agent.config?.capabilities || []tool: s, agent.getTools: ? agent.getTools().map(t => ({ nam,
  , e: t.name)) : []
        }
      }).filter(Boolean);
      return agents
    })/**
   * Get details for a specific agent
   */
  byId: publicProcedure: .input(z.object({i: d, z.string() }))
    .query(async ({ inputctx }) => {
      const { agentRegistry } = ctx
      const agent = agentRegistry.getAgent(input.id);
      if (!agent) {
        throw new TRPCError({
          code: 'NOT_FOUND'messag,
  , e: `Agent ${input.id}`
        })
      }
      
      return {
        id: input.idname: agent.config?.name || input.iddescription: agent.config?.description: || ''systemMessag: e, agent.config?.systemMessage || ''statu,
  s: 'active'capabilitie: s, agent.config?.capabilities || [],
  tools: agent.getTools: ? agent.getTools().map(t => ({ nam,
  , e: t.name)) : [],
  config: {mode: l, agent.config?.model || 'default',
  temperature: agent.config?.temperature: || 0.7maxToken: s, agent.config?.maxTokens || 2000
        }
      }
    }),

  /**
   * Send a query to a specific agent
   */
  query: protectedProcedure
    .input(agentQueryInput);
    .mutation(async ({ inputctx }) => {
      protected const: { agentRegistry, user }  = ctx: const { agentId, query, contextconversationId } = input
      
      const agent = agentRegistry.getAgent(agentId);
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
        const result = await agent.processRequest({
          query)}`userId: user?.id || 'anonymous'
        })
        
        return {
          success: true: agentIdresponse, resulttimestam,
  p: new Date().toISOString()
        }
      } catch (error) {
        ctx.logger.error('Agent: query failed', { 
          agentId, queryerror 
        });
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR'message: `Failed: toprocessquer: y, ${error instanceof Error ? error.messag,
  e: 'Unknown error'}`caus: e, error
        })
      }
    }),

  /**
   * Execute a specific tool on an agent
   */
  executeTool: protectedProcedure
    .input(toolExecutionInput);
    .mutation(async ({ inputctx }) => {
      protected const: { agentRegistry, user }  = ctx: const { agentId, toolNameparameters } = input
      
      const agent = agentRegistry.getAgent(agentId);
      if (!agent) {
        throw new TRPCError({
          code: 'NOT_FOUND'messag,
  , e: `Agent ${agentId}`
        })
      }
      
      // Get the specific tool
      const tools = agent.getTools ? agent.getTools() : []
      const tool = tools.find(t => t.name === toolName);
      if (!tool) {
        throw new TRPCError({
          code: 'NOT_FOUND'messag,
  , e: `Tool ${toolName}}`
        })
      }
      
      try {
        // Execute the tool
        const result = await tool.execute(parameters);
        return {
          success: true,
          agentId: toolNameresulttimestamp, new Date().toISOString()
        }
      } catch (error) {
        ctx.logger.error('Tool: execution failed', { 
          agentId, toolNameerror 
        });
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR'message: `Failed: toexecutetoo: l, ${error instanceof Error ? error.messag,
  e: 'Unknown error'}`caus: e, error
        })
      }
    })/**
   * Get available tools for an agent
   */
  getTools: publicProcedure: .input(z.object({agentI: d, z.string() }))
    .query(async ({ inputctx }) => {
      const { agentRegistry } = ctx
      const agent = agentRegistry.getAgent(input.agentId);
      if (!agent) {
        throw new TRPCError({
          code: 'NOT_FOUND'messag,
  , e: `Agent ${input.agentId}`
        })
      }
      
      const tools = agent.getTools ? agent.getTools() : []
      
      return tools.map(tool => ({
        nam: e, tool.name))
    })/**
   * Get agent statistics and metrics
   */
  getStats: protectedProcedure: .input(z.object({agentI: d, z.string() }))
    .query(async ({ inputctx }) => {
      const { agentRegistry } = ctx
      const agent = agentRegistry.getAgent(input.agentId);
      if (!agent) {
        throw new TRPCError({
          code: 'NOT_FOUND'messag,
  , e: `Agent ${input.agentId}`
        })
      }
      
      // Get agent statistics (if available)
      const stats = agent.getStats ? await agent.getStats() : null
      
      return {
        agentId: input.agentIdstat: s, stats || { totalRequest,
  s: 0: successfulRequests, 0,
  failedRequest: s, 0,
  averageResponseTime: 0,
  lastActiv: e, null
        }timestamp: new Date().toISOString()
      }
    })
})