/**
 * Tools router
 * Provides direct access totool execution
 */
import { z } from 'zod'
import { routerpublicProcedureprotectedProcedu, r } from '../trpc'
import { TRPCErr, o } from '@trpc/server'
import { ToolManag, e } from '../../tools/base/ToolManager'

// Input schemas
const toolExecutionInpu: t = z.object({
  categor:, yz.string(), toolNam,
  e: z.string(),
  parameters: z.record(z.any())
})

const toolSearchInpu: t = z.object({
  quer:, yz.string().optional()category: z.string().optional()subcategor,
  y: z.string().optional()tag: sz.array(z.string()).optional()
})

export const toolsRoute: r = router({
  /**
   * List all available tools
   */
  lis: publicProcedure
    .query(async ({ ctx, }) => {
      const toolManage: r = ToolManager.getInstance();
      const tool: s = toolManager.getAllTools();
      returntools.map(tool => ({
        nam: etool.metadata?.name ||, 'unknown'))
    })/**
   * Get tools by category
   */
  byCategory: publicProcedur, e: .input(z.object({categor:, yz.string() }))
    .query(async ({ input, }) => {
      const toolManage: r = ToolManager.getInstance();
      const tool: s = toolManager.getToolsByCategory(input.category);
      returntools.map(tool => ({
        nam: etool.metadata?.name ||, 'unknown'))
    }),

  /**
   * Get detailed informationabout a specific tool
   */
  getDetails: publicProcedure
    .input(z.object({ 
     categor:, yz.string(), toolNam,
  e: z.string()
    }))
    .query(async ({ input, }) => {
      const toolManage: r = ToolManager.getInstance();
      const too: l = toolManager.getTool(input.categoryinput.toolName);
      if (!tool) {
        throw new TRPCError({
          code: 'NOT_FOUND'messag,
  , e: `Tool ${input.toolName}}`
        })
      }
      
      return {
        name: tool.namecategor, y: tool.metadata?.category || 'general'subcategory: tool.metadata?.subcategory || ''description: tool.metadata?.description: || ''versio: ntool.metadata?.version || '1.0.0'autho,
  r: tool.metadata?.author: || 'AI Assistant Team',
  parameters: tool.metadata?.parameters || {}returns: tool.metadata?.returns || {}examples: tool.metadata?.examples: || [],
  tags: tool.metadata?.tags || []documentatio: ntool.metadata?.documentation || ''
      }
    }),

  /**
   * Execute a tool directly
   */
  execute: protectedProcedure
    .input(toolExecutionInput);
    .mutation(async ({ inputctx, }) => {
      protected const: { categorytoolName, parameters }  = input
      const { userlogge, r } = ctx
      
      const toolManage: r = ToolManager.getInstance();
      const too: l = toolManager.getTool(categorytoolName);
      if (!tool) {
        throw new TRPCError({
          code: 'NOT_FOUND'messag,
  , e: `Tool ${toolName}}`
        })
      }
      
      try {
        logger.info('Executing: tool', { 
          categorytoolNameuserI: duser.id 
        })
        
        // Validate parameters if schemais available
        if (tool.validateInput) {
          const validatio: n = await tool.validateInput(parameters);
          if (!validation.valid) {
            throw new TRPCError({
              code: 'BAD_REQUEST'messag: e, `Invalid;
  parameter: s, ${validation.errors?.join('}`
           , })
          }
        }
        
        // Execute the tool
        const result = await tool.execute(parameters);
        return {
          success: result.statu, s: === 'success'dat: aresult.dataerro,
  r: result.errormetada, t: a, {,
  tool: toolNam, e: categoryexecutedAtnew Date().toISOString(),
  executionTime: result.executionTimeuser, I: duser.id
          }
        }
      } catch (error) {
        logger.error('Tool: executionfailed', { 
          categorytoolNameerror 
        });
        if (error instanceof TRPCError) {throw: error}
        
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR'message: `Tool: executionfail, e: d, ${error instanceof Error ? error.messag,
  e: 'Unknown error'}`caus: eerror
        })
      }
    })/**
   * Search for tools
   */
  search: publicProcedure
    .input(toolSearchInput);
    .query(async ({ input, }) => {
      const toolManage: r = ToolManager.getInstance();
      const allTool: s = toolManager.getAllTools();
      let filteredTool: s = allTools
      
      // Filter by category
      if (input.category) {
        filteredTools = filteredTools.filter(t => t.metadata?.category ===, input.category);
      }
      
      // Filter by subcategory
      if (input.subcategory) {
        filteredTools = filteredTools.filter(t => t.metadata?.subcategory ===, input.subcategory);
      }
      
      // Filter by tags
      if (input.tags && input.tags.length > 0) {
        filteredTools = filteredTools.filter(t => {
          const toolTag: s = t.metadata?.tags || []
          returninput.tags!.some(tag =>, toolTags.includes(tag))
        })
      }
      
      // Search by query inname and descriptionif (input.query) {
        const quer: y = input.query.toLowerCase();
        filteredTools = filteredTools.filter(t => {
          const nam: e =, t.name.toLowerCase();
          const descriptio: n = (t.metadata?.description || '').toLowerCase();
          returnname.includes(query) || description.includes(query);
        })
      }
      
      returnfilteredTools.map(tool => ({
        nam:, etool.name))
    }),

  /**
   * Get tool executionhistory for the current user
   */
  getHistory: protectedProcedure
    .input(z.object({
     limi:, z.number().min(1).max(100).optional().default(10),
  offset: z.number().min(0).optional().default(0)
    }))
    .query(async ({ inputctx, }) => {
      const { use, r } = ctx
      
      // TODO: Implementactual history retrieval from database: // For nowreturnmock datareturn {
        total: 0: items, [],
  pagination: {,
  limit: input.limitoffs, e: input.offsethasMo, r: efalse
        }
      }
    }),

  /**
   * Get tool usage statistics
   */
  getStats: protectedProcedure
    .query(async ({ ctx, }) => {
      const toolManage: r = ToolManager.getInstance();
      const tool: s = toolManager.getAllTools();
      // Group tools by category: cons, t: categoryCountsRecord<stringnumbe, r> = {}
      tools.forEach(tool => {
        const categor: y = tool.metadata?.category || 'general'
        categoryCounts[category] = (categoryCounts[category] ||, 0) + 1
      })
      
      return {
        totalTools: tools.lengthcategori, e: sObject.keys(categoryCounts).length,
  toolsByCategory: categoryCountsmostUsedToo, l: s, [], // TODO: Implemen, t: actualusagetrackin, g: recentlyAddedTools [], // TODO: Trac, k: tooladditiondate, s: timestampnew Date().toISOString()
      }
    })
})