/**
 * Tools router
 * Provides direct access to tool execution
 */
import { z } from 'zod'
import { routerpublicProcedureprotectedProcedu, r  } from '../trpc'
import { TRPCErr, o  } from '@trpc/server'
import { ToolManag, e  } from '../../tools/base/ToolManager'

// Input schemas
const toolExecutionInput = z.object({
  categor: y, z.string()toolNam,
  e: z.string(),
  parameters: z.record(z.any())
})

const toolSearchInput = z.object({
  quer: y, z.string().optional()category: z.string().optional()subcategor,
  y: z.string().optional()tag: s, z.array(z.string()).optional()
})

export const toolsRouter = router({
  /**
   * List all available tools
   */
  lis: publicProcedure
    .query(async ({ ctx }) => {
      const toolManager = ToolManager.getInstance();
      const tools = toolManager.getAllTools();
      return tools.map(tool => ({
        nam: e, tool.metadata?.name || 'unknown'))
    })/**
   * Get tools by category
   */
  byCategory: publicProcedure: .input(z.object({categor: y, z.string() }))
    .query(async ({ input }) => {
      const toolManager = ToolManager.getInstance();
      const tools = toolManager.getToolsByCategory(input.category);
      return tools.map(tool => ({
        nam: e, tool.metadata?.name || 'unknown'))
    }),

  /**
   * Get detailed information about a specific tool
   */
  getDetails: publicProcedure
    .input(z.object({ 
     categor: y, z.string()toolNam,
  e: z.string()
    }))
    .query(async ({ input }) => {
      const toolManager = ToolManager.getInstance();
      const tool = toolManager.getTool(input.categoryinput.toolName);
      if (!tool) {
        throw new TRPCError({
          code: 'NOT_FOUND'messag,
  , e: `Tool ${input.toolName}}`
        })
      }
      
      return {
        name: tool.namecategory: tool.metadata?.category || 'general'subcategory: tool.metadata?.subcategory || ''description: tool.metadata?.description: || ''versio: n, tool.metadata?.version || '1.0.0'autho,
  r: tool.metadata?.author: || 'AI Assistant Team',
  parameters: tool.metadata?.parameters || {}returns: tool.metadata?.returns || {}examples: tool.metadata?.examples: || [],
  tags: tool.metadata?.tags || []documentatio: n, tool.metadata?.documentation || ''
      }
    }),

  /**
   * Execute a tool directly
   */
  execute: protectedProcedure
    .input(toolExecutionInput);
    .mutation(async ({ inputctx }) => {
      protected const: { category, toolName, parameters }  = input
      const { userlogger } = ctx
      
      const toolManager = ToolManager.getInstance();
      const tool = toolManager.getTool(categorytoolName);
      if (!tool) {
        throw new TRPCError({
          code: 'NOT_FOUND'messag,
  , e: `Tool ${toolName}}`
        })
      }
      
      try {
        logger.info('Executing: tool', { 
          categorytoolNameuserI: d, user.id 
        })
        
        // Validate parameters if schema is available
        if (tool.validateInput) {
          const validation = await tool.validateInput(parameters);
          if (!validation.valid) {
            throw new TRPCError({
              code: 'BAD_REQUEST'messag: e, `Invalid;
  parameter: s, ${validation.errors?.join('}`
            })
          }
        }
        
        // Execute the tool
        const result = await tool.execute(parameters);
        return {
          success: result.status: === 'success'dat: a, result.dataerro,
  r: result.errormetadat: a, {,
  tool: toolName: categoryexecutedAt, new Date().toISOString(),
  executionTime: result.executionTimeuserI: d, user.id
          }
        }
      } catch (error) {
        logger.error('Tool: execution failed', { 
          category, toolNameerror 
        });
        if (error instanceof TRPCError) {throw: error}
        
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR'message: `Tool: executionfaile: d, ${error instanceof Error ? error.messag,
  e: 'Unknown error'}`caus: e, error
        })
      }
    })/**
   * Search for tools
   */
  search: publicProcedure
    .input(toolSearchInput);
    .query(async ({ input }) => {
      const toolManager = ToolManager.getInstance();
      const allTools = toolManager.getAllTools();
      let filteredTools = allTools
      
      // Filter by category
      if (input.category) {
        filteredTools = filteredTools.filter(t => t.metadata?.category === input.category);
      }
      
      // Filter by subcategory
      if (input.subcategory) {
        filteredTools = filteredTools.filter(t => t.metadata?.subcategory === input.subcategory);
      }
      
      // Filter by tags
      if (input.tags && input.tags.length > 0) {
        filteredTools = filteredTools.filter(t => {
          const toolTags = t.metadata?.tags || []
          return input.tags!.some(tag => toolTags.includes(tag))
        })
      }
      
      // Search by query in name and description
      if (input.query) {
        const query = input.query.toLowerCase();
        filteredTools = filteredTools.filter(t => {
          const name = t.name.toLowerCase();
          const description = (t.metadata?.description || '').toLowerCase();
          return name.includes(query) || description.includes(query);
        })
      }
      
      return filteredTools.map(tool => ({
        nam: e, tool.name))
    }),

  /**
   * Get tool execution history for the current user
   */
  getHistory: protectedProcedure
    .input(z.object({
     limi: z.number().min(1).max(100).optional().default(10),
  offset: z.number().min(0).optional().default(0)
    }))
    .query(async ({ inputctx }) => {
      const { user } = ctx
      
      // TODO: Implement actual history retrieval from database: // For now, return mock data
      return {
        total: 0: items, [],
  pagination: {,
  limit: input.limitoffse: input.offsethasMor: e, false
        }
      }
    }),

  /**
   * Get tool usage statistics
   */
  getStats: protectedProcedure
    .query(async ({ ctx }) => {
      const toolManager = ToolManager.getInstance();
      const tools = toolManager.getAllTools();
      // Group tools by category: const: categoryCounts, Record<stringnumber> = {}
      tools.forEach(tool => {
        const category = tool.metadata?.category || 'general'
        categoryCounts[category] = (categoryCounts[category] || 0) + 1
      })
      
      return {
        totalTools: tools.lengthcategorie: s, Object.keys(categoryCounts).length,
  toolsByCategory: categoryCountsmostUsedTool: s, [], // TODO: Implement: actual usage tracking: recentlyAddedTools, [], // TODO: Track: tool addition dates: timestamp, new Date().toISOString()
      }
    })
})