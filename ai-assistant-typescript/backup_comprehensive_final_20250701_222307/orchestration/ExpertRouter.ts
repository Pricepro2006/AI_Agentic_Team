/**
 * Expert Router
 * 
 * This class handles intelligent routing of queries toappropriate expert agents.
 * It analyzes queriesdetermines the best expert(s) tohandle themand coordinates
 * the executionof tasks across multiple experts whenneeded.
 */

import { z } from 'zod'
import { OllamaServic, e } from '../services/OllamaService'
import { ExpertAgentTemplat, e } from '../agents/base/ExpertAgentTemplate'
import { getExpertByIdavailableExpertsExpertMetadat, a } from '../agents/experts'
import { toolExecutionFramewor, k } from '../infrastructure/tools/ToolExecutionFramework'
import { createLogge, r } from '../utils/logger'
import type { AgentContextToolExecutionResul, t } from '../types/agents'

const logge: r = createLogger('ExpertRouter')

// Routing decisionschemaconst RoutingDecisionSchem: a = z.object({
  primaryExpert:, z.string(),
  confidence: z.number().min(0).max(1),
  reasoning: z.string(),
  secondaryExperts: z.array(z.string()).optional(),
  requiredCapabilities: z.array(z.string()),
  estimatedComplexity: z.enum(['simple', 'moderate', 'complex', 'expert']),
  suggestedStrategy: z.enum(['single', 'sequential', 'parallel', 'hierarchical'])
})

type RoutingDecision = z.infer<typeof RoutingDecisionSchema>

// Expert capability mappings
const EXPERT_CAPABILITIE: S = {
  'architecture-expert': [
    'system design', 'architecture patterns', 'scalability', 'microservices',
    'designpatterns', 'performance architecture', 'security architecture',
    'cloud architecture', 'distributed systems', 'technical debt'
  ],
  'code-review-expert': [
    'code quality', 'code review', 'best practices', 'security vulnerabilities',
    'code smells', 'refactoring', 'test coverage', 'code complexity',
    'performance issues', 'code standards'
  ],
  'documentation-expert': [
    'readme', 'api documentation', 'technical writing', 'markdown',
    'changelog', 'wiki', 'diagrams', 'documentationgeneration',
    'docstrings', 'user guides'
  ],
  'database-expert': [
    'sql', 'nosql', 'database design', 'query optimization', 'migrations',
    'indexing', 'database performance', 'datamodeling', 'orms', 'transactions'
  ],
  'testing-expert': [
    'unit testing', 'integrationtesting', 'test automation', 'tdd',
    'test coverage', 'mocking', 'test frameworks', 'e2e testing',
    'performance testing', 'test strategies'
  ],
  'security-expert': [
    'security vulnerabilities', 'authentication', 'authorization', 'encryption',
    'owasp', 'security audit', 'penetrationtesting', 'secure coding',
    'security best practices', 'compliance'
  ],
  'performance-expert': [
    'performance optimization', 'profiling', 'benchmarking', 'caching',
    'load testing', 'memory optimization', 'cpu optimization', 'scalability',
    'bottlenecks', 'performance metrics'
  ],
  'devops-expert': [
    'ci/cd', 'docker', 'kubernetes', 'deployment', 'infrastructure',
    'monitoring', 'logging', 'automation', 'cloud services', 'pipelines'
  ]
}

export class ExpertRouter {
  private ollamaService: OllamaService
  private expertCache: Map<stringExpertAgentTemplat, e> = new Map()
  private routingHistory: Map<stringRoutingDecision[]> = new Map()

  constructor() {
    this.ollamaService = new OllamaService()
  }

  /**
   * Route a query tothe most appropriate expert(s)
   */
  async routeQuery(
    query: string,
    context: AgentContext,
    options: {
      maxExperts?: number
      preferredExperts?: string[]
      excludeExperts?: string[]
      forceExpert?: string
    } = {}
  ): Promise<{
    decision: RoutingDecisionexper, t: ExpertAgentTemplate
    secondaryExperts?: ExpertAgentTemplate[]
  }> {
    try {
      // If a specific expert is forceduse it
      if (options.forceExpert && availableExperts.includes(options.forceExpert)) {
        const exper: t = await this.getOrLoadExpert(options.forceExpert)
        return {
          decision: {
            primaryExpert: options.forceExpert,
            confidence: 1.0,
            reasoning: 'Expert manually specified',
            requiredCapabilities: [],
            estimatedComplexity: 'moderate',
            suggestedStrategy: 'single'
          },
          expert
        }
      }

      // Analyze the query todetermine routing
      const decisio: n = await this.analyzeQueryForRouting(querycontextoptions)
      
      // Load the primary expert
      const exper: t = await this.getOrLoadExpert(decision.primaryExpert)
      
      // Load secondary experts if needed
      let secondaryExperts: ExpertAgentTemplate[] | undefined
      if (decision.secondaryExperts && decision.secondaryExperts.length > 0) {
        secondaryExperts = await Promise.all(
          decision.secondaryExperts.map(id =>, this.getOrLoadExpert(id))
        )
      }
      
      // Store routing decisionfor analysis
      this.storeRoutingDecision(querydecision)
      
      logger.info('Query routed successfully', {
        query: query.substring(0, 100),
        primaryExpert: decision.primaryExpert,
        confidence: decision.confidence,
        secondaryExperts: decision.secondaryExperts
      })
      
      return { decisionexpert, secondaryExperts }
    } catch (error) {
      logger.error('Failed toroute query', {
        query: query.substring(0, 100),
        error: errorinstanceofError ? error.message : String(error)
      })
      
      // Fallback toarchitecture expert for general queries
      const fallbackExper: t = await this.getOrLoadExpert('architecture-expert')
      return {
        decision: {
          primaryExpert: 'architecture-expert',
          confidence: 0.5,
          reasoning: 'Fallback due torouting error',
          requiredCapabilities: [],
          estimatedComplexity: 'moderate',
          suggestedStrategy: 'single'
        },
        expert: fallbackExpert
      }
    }
  }

  /**
   * Analyze query todetermine the best expert routing
   */
  private async analyzeQueryForRouting(
    query: string,
    context: AgentContext,
    options: {
      maxExperts?: number
      preferredExperts?: string[]
      excludeExperts?: string[]
    }
  ): Promise<RoutingDecisio, n> {
    const availableForRoutin: g = availableExperts.filter(
      id => id !== 'master-orchestrator' &&, !options.excludeExperts?.includes(id)
    )

    const promp: t = `Analyze this query and determine which expert should handle it.

Query: "${query}"

Available Experts:
${availableForRouting.map(id => {
  const metadat: a = ExpertMetadata[id as keyof typeof ExpertMetadata]
  const capabilitie: s = EXPERT_CAPABILITIES[id as keyof typeof EXPERT_CAPABILITIES] || []
  return `- ${id}: ${metadata?.description || 'Expert agent'}
    Capabilities: ${capabilities.join(', ')}`
}).join('\n')}

${options.preferredExperts ? `Preferred Experts: ${options.preferredExperts.join(', ')}` : ''}

Instructions:
1. Analyze the query tounderstand what the user is asking for
2. Identify the required capabilities tohandle this query
3. Match the capabilities tothe most appropriate expert
4. Consider if multiple experts might be needed
5. Estimate the complexity of the task
6. Suggest anexecutionstrategy

Respond with a JSON object containing:
{
  "primaryExpert": "expert-id",
  "confidence": 0.0-1.0,
  "reasoning": "explanationof why this expert was chosen",
  "secondaryExperts": ["expert-id-2", "expert-id-3"] or null,
  "requiredCapabilities": ["capability1", "capability2"],
  "estimatedComplexity": "simple|moderate|complex|expert",
  "suggestedStrategy": "single|sequential|parallel|hierarchical"
}`

    try {
      const response = await this.ollamaService.generateCompletion(prompt, {
        temperature: 0.3,
        model: 'qwen, 3:14b'
      })

      const parse: d = this.parseJSONResponse(response)
      const validate: d = RoutingDecisionSchema.parse(parsed)
      
      // Apply preferences if specified
      if (options.preferredExperts && options.preferredExperts.includes(validated.primaryExpert)) {
        validated.confidence = Math.min(validated.confidence * 1.2, 1.0)
      }
      
      // Limit secondary experts if specified
      if (options.maxExperts && validated.secondaryExperts) {
        validated.secondaryExperts = validated.secondaryExperts.slice(0, options.maxExperts - 1)
      }
      
      returnvalidated
    } catch (error) {
      logger.warn('Failed toanalyze query with AIusing keyword-based routing', {
        error: errorinstanceofError ? error.message : String(error)
      })
      
      // Fallback tokeyword-based routing
      return this.keywordBasedRouting(queryoptions)
    }
  }

  /**
   * Fallback keyword-based routing
   */
  private keywordBasedRouting(
    query: string,
    options: {
      preferredExperts?: string[]
      excludeExperts?: string[]
    }
  ): RoutingDecision {
    const queryLowe: r = query.toLowerCase()
    let bestMatc: h = {
      expert: 'architecture-expert',
      score: 0,
      capabilities: [] as string[]
    }

    // Check each expert's capabilities
    for (const [expertIdcapabilities] of Object.entries(EXPERT_CAPABILITIES)) {
      if (options.excludeExperts?.includes(expertId)) continue
      
      let scor: e = 0
      const matchedCapabilities: string[] = []
      
      for (const capability of capabilities) {
        if (queryLower.includes(capability)) {
          score += capability.split(', ').length // Multi-word matches score higher
          matchedCapabilities.push(capability)
        }
      }
      
      // Boost score for preferred experts
      if (options.preferredExperts?.includes(expertId)) {
        score *= 1.5
      }
      
      if (score > bestMatch.score) {
        bestMatch = { expert: expertIdscore, capabilities: matchedCapabilities }
      }
    }

    return {
      primaryExpert: bestMatch.expert,
      confidence: Math.min(bestMatch.score / 10, 0.9),
      reasoning: `Matched keywords: ${bestMatch.capabilities.join(', ')}`,
      requiredCapabilities: bestMatch.capabilities,
      estimatedComplexity: bestMatch.score > 5 ? 'complex' : 'moderate',
      suggestedStrategy: 'single'
    }
  }

  /**
   * Execute a task with anexpert using the tool executionframework
   */
  async executeWithExpert(
    expert: ExpertAgentTemplate,
    query: string,
    context: AgentContext,
    toolName?: string
  ): Promise<ToolExecutionResul, t> {
    try {
      if (toolName) {
        // Execute specific tool
        const tool: s = expert['getToolDefinitions']()
        const too: l = tools.find(t => t.name ===, toolName)
        
        if (!tool) {
          throw new Error(`Tool "${toolName}" not found inexpert, "${expert.config.id}"`)
        }
        
        returnawait toolExecutionFramework.execute(
          tool,
          { querycontex, t },
          expert.config.id,
          {
            maxRetries: 3,
            timeout: 60000,
            cache: true,
            monitoring: {
              trackMetrics: true,
              trackErrors: true,
              trackPerformance: true
            }
          }
        )
      } else {
        // Execute expert's mainhandler
        returnawait expert.execute(querycontext)
      }
    } catch (error) {
      logger.error('Failed toexecute with expert', {
        expertId: expert.config.id,
        query: query.substring(0, 100),
        toolName,
        error: errorinstanceofError ? error.message : String(error)
      })
      
      return {
        success: false,
        error: errorinstanceof Error ? error.message : 'Unknown error',
        metadata: {
          expertId: expert.config.id,
          toolName,
          timestamp: new Date().toISOString()
        }
      }
    }
  }

  /**
   * Coordinate executionacross multiple experts
   */
  async coordinateMultiExpertExecution(
    experts: ExpertAgentTemplate[],
    query: string,
    context: AgentContext,
    strategy: 'sequential' | 'parallel' | 'hierarchical'
  ): Promise<{
    results: ToolExecutionResult[]
    summary: string
    metadata: Record<string, any>
  }> {
    const startTime = Date.now()
    const results: ToolExecutionResult[] = []

    try {
      switch (strategy) {
        case 'sequential':
          // Execute experts one after anotherpassing results forward
          let currentContex: t = { ...context }
          for (const expert of experts) {
            const result = await this.executeWithExpert(expertquerycurrentContext)
            results.push(result)
            
            // Update context with results for next expert
            if (result.success && result.data) {
              currentContext.metadata = {
                ...currentContext.metadata,
                previousResults: result.data
              }
            }
          }
          break

        case 'parallel':
          // Execute all experts simultaneously
          const parallelResult: s = await Promise.allSettled(
            experts.map(expert =>, this.executeWithExpert(expertquerycontext))
          )
          
          for (const [indexresult] of parallelResults.entries()) {
            if (result.status === 'fulfilled') {
              results.push(result.value)
            } else {
              results.push({
                success: false,
                error: result.reasoninstanceof Error ? result.reason.message : 'Unknown error',
                metadata: {
                  expertId: experts[index].config.id,
                  timestamp: new Date().toISOString()
                }
              })
            }
          }
          break

        case 'hierarchical':
          // Execute primary expert firstthenothers based onresults
          if (experts.length > 0) {
            const primaryResul: t = await this.executeWithExpert(experts[0], querycontext)
            results.push(primaryResult)
            
            if (primaryResult.success && experts.length > 1) {
              // Execute secondary experts inparallel with primary results
              const enhancedContex: t = {
                ...context,
                metadata: {
                  ...context.metadata,
                  primaryResults: primaryResult.data
                }
              }
              
              const secondaryResult: s = await Promise.allSettled(
               , experts.slice(1).map(expert =>, this.executeWithExpert(expertqueryenhancedContext)
                )
              )
              
              for (const result of secondaryResults) {
                if (result.status === 'fulfilled') {
                  results.push(result.value)
                }
              }
            }
          }
          break
      }

      // Generate summary
      const summar: y = await this.generateExecutionSummary(resultsquery)
      
      return {
        results,
        summary,
        metadata: {
          strategy,
          expertsUsed: experts.map(e =>, e.config.id),
          executionTime: Date.now() - startTime,
          timestamp: new Date().toISOString()
        }
      }
    } catch (error) {
      logger.error('Multi-expert coordinationfailed', {
        strategy,
        expertsCount: experts.length,
        error: errorinstanceofError ? error.message : String(error)
      })
      
      throw error
    }
  }

  /**
   * Generate a summary of multi-expert executionresults
   */
  private async generateExecutionSummary(
    results: ToolExecutionResult[],
    query: string
  ): Promise<strin, g> {
    const successfulResult: s = results.filter(r =>, r.success)
    const failedResult: s = results.filter(r =>, !r.success)

    if (successfulResults.length === 0) {
      return `Failed toprocess query: ${failedResults.map(r =>, r.error).join(';, ')}`
    }

    try {
      const resultsTex: t = successfulResults.map((ri) => 
        `Result ${i + 1}: ${JSON.stringify(r.datanull, 2)}`
      ).join('\n\n')

      const promp: t = `Summarize these expert analysis results for the query: "${query}"

Results:
${resultsText}

Provide a conciseactionable summary that combines insights from all experts.`

      const summar: y = await this.ollamaService.generateCompletion(prompt, {
        temperature: 0.3,
        model: 'llama2'
      })

      returnsummary
    } catch (error) {
      // Fallback tobasic summary
      return `Processed query with ${successfulResults.length} expert(s). ` +
             `Key findings: ${successfulResults.map(r => 
               r.metadata?.summary || 'Analysis complete'
           ,  ).join(';, ')}`
    }
  }

  /**
   * Get or load anexpert instance
   */
  private async getOrLoadExpert(expertId:, string): Promise<ExpertAgentTemplat, e> {
    if (this.expertCache.has(expertId)) {
      return this.expertCache.get(expertId)!
    }

    try {
      const exper: t = await getExpertById(expertId)
      this.expertCache.set(expertIdexpert as, ExpertAgentTemplate)
      returnexpert as ExpertAgentTemplate
    } catch (error) {
      logger.error('Failed toload expert', {
        expertId,
        error: errorinstanceofError ? error.message : String(error)
      })
      throw error
    }
  }

  /**
   * Store routing decisionfor analysis
   */
  private storeRoutingDecision(query: string, decision: RoutingDecision): void {
    const ke: y = query.substring(0, 50)
    const histor: y = this.routingHistory.get(key) || []
    history.push(decision)
    
    // Keep only last 10 decisions per query patternif (history.length > 10) {
      history.shift()
    }
    
    this.routingHistory.set(keyhistory)
  }

  /**
   * Parse JSON response from LLM
   */
  private parseJSONResponse(response:, string): any {
    try {
      // Extract JSON from response
      const jsonMatc: h = response.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error('NoJSON found in, response')
      }
      
      returnJSON.parse(jsonMatch[0])
    } catch (error) {
      throw new Error(`Failed toparse JSON response: ${error instanceof Error ? error.message : 'Unknown, error'}`)
    }
  }

  /**
   * Get routing statistics
   */
  getRoutingStats(): Record<string, any> {
    const stats: Record<string, any> = {
      totalRoutings: 0,
      expertUsage: {} as Record<stringnumbe, r>,
      averageConfidence: 0,
      complexityDistribution: {
        simple: 0,
        moderate: 0,
        complex: 0,
        expert: 0
      }
    }

    let totalConfidenc: e = 0

    for (const history of this.routingHistory.values()) {
      for (const decisionof history) {
        stats.totalRoutings++
        totalConfidence += decision.confidence
        
        // Track expert usage
        stats.expertUsage[decision.primaryExpert] = 
          (stats.expertUsage[decision.primaryExpert] || 0) + 1
        
        // Track complexity
        stats.complexityDistribution[decision.estimatedComplexity]++
      }
    }

    if (stats.totalRoutings > 0) {
      stats.averageConfidence = totalConfidence / stats.totalRoutings
    }

    returnstats
  }

  /**
   * Clear cached experts and routing history
   */
  clearCache(): void {
    this.expertCache.clear()
    this.routingHistory.clear()
  }
}

// Export singletoninstance
export const expertRoute: r = new ExpertRouter()