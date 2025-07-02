/**
 * Standardized Expert Agent Template with RAG Integration
 * 
 * This template provides a standardized foundation for creating expert agents
 * with built-in RAG integration, MO coordination interface, and comprehensive
 * tool implementation patterns.
 * 
 * Usage:
 * 1. Extend this class for your specific expert agent
 * 2. Implement the abstract methods with domain-specific logic
 * 3. Configure RAG integration for your knowledge domain
 * 4. Implement 8 standardized tools following the established patterns
 */

import { BaseAgen } from './BaseAgent'
import { AgentConfig, AgentTool, Tool, Execution, Result } from '../../types/agents'
import { OllamaServic } from '../../services/OllamaService'
import { getErrorMessage, logError } from '../../utils/error.utils'

/**
 * RAG Integration Configuration Interface
 */
export interface RAGConfig {
  enabled: boolean
  embeddingModel: string
  chunkSize: number
  chunkOverlap: number
  topK: number
  scoreThreshold: number
  optimizationStrategy: 'semantic' | 'keyword' | 'hybrid'
  knowledgeDomains: string[]
  vectorStore: string
  persistentStorage: boolean
}

/**
 * Expert Agent Specialization Configuration
 */
export interface ExpertSpecialization {
  domain: string
  primaryExpertise: string[]
  secondarySkills: string[]
  knowledgeAreas: string[]
  limitations: string[]
  integrationPoints: string[]
}

/**
 * Tool Category Definitions for Standardized Implementation
 */
export enum ToolCategory {
  CORE_DOMAIN = 'core_domain',
  ANALYSIS = 'analysis',
  GENERATOR = 'generator',
  VALIDATOR = 'validator',
  INTEGRATION = 'integration',
  OPTIMIZER = 'optimizer',
  REPORTER = 'reporter',
  HELPER = 'helper'
}

/**
 * MO Coordination Interface for Expert-Orchestrator Communication
 */
export interface MOCoordinationInterface {
  queryAnalysis: (query: string, context?: any) => Promise<any>
  routingDecision: (intent: any) => Promise<number>
  responseFormat: (results: any) => Promise<any>
  contextSharing: (context: any) => Promise<void>
  taskValidation: (task: any) => Promise<boolean>
  progressReporting: (progress: any) => Promise<void>
}

/**
 * Abstract Expert Agent Template
 * 
 * Provides standardized foundation for all expert agents with:
 * - RAG integration capabilities
 * - MO coordination interface
 * - Standardized tool patterns
 * - Performance monitoring
 * - Error handling and resilience
 */
export abstract class ExpertAgentTemplate extends BaseAgent implements MOCoordinationInterface {
  // Use 'declare' to tell TypeScript this will be initialized
  protected declare config: AgentConfig
  
  protected ollamaService?: OllamaService
  protected ragConfig: RAGConfig
  protected specialization: ExpertSpecialization
  
  // Performance and monitoring
  protected metrics = {
    totalRequests: 0,
    successfulRequests: 0,
    averageResponseTime: 0,
    ragQueries: 0,
    confidenceScores: [] as number[]
  }

  constructor(specialization: ExpertSpecialization, ragConfig: Partial<RAGConfig> = {}) {
    super()
    this.specialization = specialization
    this.ragConfig = {
      enabled: true,
      embeddingModel: 'mistral:latest',
      chunkSize: 500,
      chunkOverlap: 50,
      topK: 5,
      scoreThreshold: 0.7,
      optimizationStrategy: 'hybrid',
      knowledgeDomains: specialization.knowledgeAreas,
      vectorStore: 'local',
      persistentStorage: true,
      ...ragConfig
    }

    // Initialize agent configuration - this will set the config property
    this.config = this.buildAgentConfig()
  }

  /**
   * Abstract method to build domain-specific agent configuration
   */
  protected abstract buildAgentConfig(): AgentConfig

  /**
   * Abstract method to implement domain-specific tools
   * Must implement exactly 8 tools following the standardized categories
   */
  protected abstract getToolDefinitions(): AgentTool[]

  /**
   * Build system message with domain expertise and coordination capabilities
   */
  protected buildSystemMessage(): string {
    return `You are a ${this.specialization.primaryExpertise[0]} expert.

Domain Expertise:
- Primary: ${this.specialization.primaryExpertise.join(', ')}
- Secondary: ${this.specialization.secondarySkills.join(', ')}
- Knowledge Areas: ${this.specialization.knowledgeAreas.join(', ')}

Capabilities:
- Domain-specific analysis and implementation
- RAG-enhanced knowledge retrieval from ${this.specialization.knowledgeAreas.length} domains
- Cross-agent coordination with Master Orchestrator
- Production-ready tool execution with comprehensive error handling
- Quality validation and performance optimization

Coordination Protocol:
1. Receive tasks from Master Orchestrator with clear acceptance criteria
2. Execute domain-specific analysis using RAG-enhanced knowledge base
3. Implement solutions following established patterns and best practices
4. Validate outputs against quality standards and acceptance criteria
5. Report progress and results with confidence scores and recommendations
6. Collaborate with other experts when cross-domain expertise is required

Limitations:
${this.specialization.limitations.map(limitation => `- ${limitation}`).join('\n')}

Integration Points:
${this.specialization.integrationPoints.map(integration => `- ${integration}`).join('\n')}

Always provide:
- Clear actionable recommendations
- Evidence-based analysis from knowledge base
- Quality validation with confidence scores
- Next steps and best practices
- Error handling and fallback options`
  }

  /**
   * Initialize Ollama service for AI-enhanced capabilities
   */
  protected async initializeOllamaService(): Promise<void> {
    if (!this.ollamaService) {
      this.ollamaService = new OllamaService({
        defaultModel: this.config.legacyModel?.model || 'mistral:latest',
        timeout: 30000,
        retryAttempts: 3
      })
      try {
        await this.ollamaService.performHealthCheck()
      } catch (error) {
        logError(`ExpertAgentTemplate.initializeOllamaService[${this.config.name}]`, error)
        console.warn(`Expert ${this.config.name}:`, getErrorMessage(error))
        // Continue without AI enhancement - fallback to traditional tools
      }
    }
  }

  /**
   * Enhanced RAG-powered query processing
   */
  protected async processWithRAG(_query: string, context: any = {}, _knowledgeDomain?: string): Promise<any> {
    const startTime = Date.now()
    try {
      // Initialize Ollama service if needed
      await this.initializeOllamaService()
      if (!this.ragConfig.enabled || !this.ollamaService) {
        throw new Error('RAG processing unavailable')
      }

      // RAG processing steps:
      // 1. Generate embeddings for _query
      // 2. Perform similarity search in knowledge domain
      // 3. Retrieve relevant context
      // 4. Generate enhanced response with context
      const relevantContext = await this.retrieveRelevantContext(_query, _knowledgeDomain)
      const enhancedQuery = this.buildEnhancedQuery(_query, relevantContext, context)
      const response = await this.ollamaService.analyze({
        prompt: enhancedQuery
      })
      
      this.metrics.ragQueries++
      this.metrics.averageResponseTime = this.updateAverageResponseTime(Date.now() - startTime)
      
      return {
        responser: esponse.content,
        ragSources: relevantContext.sources,
        confidencer: esponse.confidence || relevantContext.confidence,
        processingTime: Date.now() - startTime
      }

    } catch (error) {
      console.warn(`RAG processing failed for ${this.config.name}`, error)
      // Fallback to traditional processing
      return this.processWithoutRAG(_query, context)
    }
  }

  /**
   * Fallback processing without RAG enhancement
   */
  protected async processWithoutRAG(query: string, context: any = {}): Promise<any> {
    const startTime = Date.now()
    // Traditional query processing using deterministic rules and patterns
    const response = await this.executeTraditionalProcessing(query, context)
    this.metrics.averageResponseTime = this.updateAverageResponseTime(Date.now() - startTime)
    
    return {
      response,
      ragSources: [],
      confidence: 0.7, // Default confidence for traditional processing
      processingTime: Date.now() - startTime,
      fallbackMode: true
    }
  }

  /**
   * Retrieve relevant context from RAG knowledge base
   */
  protected async retrieveRelevantContext(_query: string, _knowledgeDomain?: string): Promise<{ sources: any[], confidence: number }> {
    // Implementation would integrate with vector search tools
    // This is a placeholder for the actual RAG retrieval logic
    return {
      sources: [],
      confidence: 0.8
    }
  }

  /**
   * Build enhanced query with RAG context
   */
  protected buildEnhancedQuery(originalQuery: string, ragContext: any, additionalContext: any = {}): string {
    return `Context from knowledge base:
${ragContext.sources.map((source: any) => `- ${source.content}`).join('\n')}

User Query: ${originalQuery}

Additional Context: ${JSON.stringify(additionalContext)}

Please provide a comprehensive response based on the above context and your expertise in ${this.specialization.domain}.`
  }

  /**
   * Traditional processing implementation (domain-specific)
   */
  protected abstract executeTraditionalProcessing(query: string, context: any): Promise<any>

  /**
   * Update average response time metric
   */
  protected updateAverageResponseTime(newTime: number): number {
    const totalTime = this.metrics.averageResponseTime * this.metrics.totalRequests + newTime
    return totalTime / (this.metrics.totalRequests + 1)
  }

  // ========================================
  // MO Coordination Interface Implementation
  // ========================================

  /**
   * Analyze query for domain relevance and extract requirements
   */
  async queryAnalysis(query: string, context?: any) {
    const startTime = Date.now()
    try {
      const analysis = await this.processWithRAG(`Analyze this query for ${this.specialization.domain}`, context, this.specialization.domain)
      return {
        domainRelevance: this.calculateDomainRelevance(query),
        expertiseRequired: this.identifyRequiredExpertise(query),
        complexity: this.assessComplexity(query),
        estimatedDuration: this.estimateDuration(query),
        requirements: analysis.response,
        confidence: analysis.confidence,
        processingTime: Date.now() - startTime
      }
    } catch (error) {
      return {
        domainRelevance: 0.5,
        expertiseRequired: this.specialization.primaryExpertise,
        complexity: 'medium',
        estimatedDuration: 30,
        requirements: 'Analysis failed - using fallback assessment',
        confidence: 0.3,
        error: getErrorMessage(error)
      }
    }
  }

  /**
   * Determine suitability score for routing decisions
   */
  async routingDecision(intent: any): Promise<number> {
    const relevanceFactors = [
      this.calculateDomainRelevance(intent.query || ''),
      this.assessSkillAlignment(intent.requiredSkills || []),
      this.evaluateComplexityFit(intent.complexity || 'medium'),
      this.checkResourceAvailability()
    ]

    // Calculate weighted average
    const weights = [0.4, 0.3, 0.2, 0.1]
    const weightedScore = relevanceFactors.reduce((sum, factor, index) => 
      sum + (factor * weights[index]), 0
    )

    return Math.min(1.0, Math.max(0.0, weightedScore))
  }

  /**
   * Format response according to MO coordination standards
   */
  async responseFormat(results: any): Promise<any> {
    return {
      agentId: this.config.id,
      agentName: this.config.name,
      executionTimer: esults.processingTime || 0,
      confidencer: esults.confidence || 0.7,
      success: results.success !== false,
      data: results.response || results.data,
      metadata: {
        ragEnhanced: results.ragSources?.length > 0,
        domainSpecific: true,
        qualityValidated: true,
        recommendations: results.recommendations || [],
        nextSteps: results.nextSteps || [],
        bestPractices: results.bestPractices || []
      },
      ragSources: results.ragSources || [],
      error: results.error
    }
  }

  /**
   * Share context with other agents in coordination
   */
  async contextSharing(context: any): Promise<void> {
    // Implementation for sharing relevant context with other experts
    // This could include domain-specific insights, partial results, or coordination requirements
  }

  /**
   * Validate task requirements and acceptance criteria
   */
  async taskValidation(task: any): Promise<boolean> {
    const validationChecks = [
      this.validateDomainAlignment(task),
      this.validateResourceRequirements(task),
      this.validateAcceptanceCriteria(task),
      this.validateTimelineRealistic(task)
    ]

    return validationChecks.every(check => check === true)
  }

  /**
   * Report progress to Master Orchestrator
   */
  async progressReporting(progress: any): Promise<void> {
    const report = {
      agentId: this.config.id,
      timestamp: new Date().toISOString(),
      progress: progress,
      metrics: this.metrics,
      status: 'active',
      nextUpdate: Date.now() + (5 * 60 * 1000) // 5 minutes
    }

    // Send progress report to MO (implementation would use actual communication channel)
    console.log(`Progress Report from ${this.config.name}`, report)
  }

  // ========================================
  // Helper Methods for Domain Assessment
  // ========================================

  protected calculateDomainRelevance(query: string): number {
    const domainKeywords = [
      ...this.specialization.primaryExpertise,
      ...this.specialization.secondarySkills,
      ...this.specialization.knowledgeAreas
    ]

    const queryLower = query.toLowerCase()
    const matches = domainKeywords.filter(keyword => 
      queryLower.includes(keyword.toLowerCase())
    )

    return Math.min(1.0, matches.length / domainKeywords.length * 2)
  }

  protected assessSkillAlignment(requiredSkills: string[]): number {
    if (requiredSkills.length === 0) return 0.5

    const availableSkills = [
      ...this.specialization.primaryExpertise,
      ...this.specialization.secondarySkills
    ]

    const alignedSkills = requiredSkills.filter(skill =>
      availableSkills.some(available => 
        available.toLowerCase().includes(skill.toLowerCase())
      )
    )

    return alignedSkills.length / requiredSkills.length
  }

  protected evaluateComplexityFit(complexity: string): number {
    // Domain experts can handle varying complexity levels
    const complexityScores = {
      'simple': 1.0,
      'low': 1.0,
      'medium': 0.9,
      'moderate': 0.9,
      'high': 0.8,
      'complex': 0.7
    }

    return complexityScores[complexity as keyof typeof complexityScores] || 0.5
  }

  protected checkResourceAvailability(): number {
    // Check current load and resource availability
    // This is a simplified implementation
    return this.metrics.totalRequests < 100 ? 1.0 : 0.7
  }

  protected identifyRequiredExpertise(query: string): string[] {
    // Identify what expertise areas are needed for this query
    return this.specialization.primaryExpertise
  }

  protected assessComplexity(query: string): string {
    // Assess query complexity based on domain knowledge
    if (query.length < 50) return 'simple'
    if (query.length < 200) return 'medium'
    return 'complex'
  }

  protected estimateDuration(query: string): number {
    // Estimate processing duration in minutes
    const complexity = this.assessComplexity(query)
    const durations = {
      simple: 5,
      medium: 15,
      complex: 30
    }
    return durations[complexity as keyof typeof durations] || 15
  }

  protected validateDomainAlignment(task: any): boolean {
    return task.domain === this.specialization.domain || 
           this.specialization.knowledgeAreas.includes(task.domain)
  }

  protected validateResourceRequirements(task: any): boolean {
    // Check if agent has resources to complete task
    return true // Simplified implementation
  }

  protected validateAcceptanceCriteria(task: any): boolean {
    // Validate that acceptance criteria are achievable
    return task.acceptanceCriteria && Array.isArray(task.acceptanceCriteria)
  }

  protected validateTimelineRealistic(task: any): boolean {
    // Check if timeline is realistic for task complexity
    const estimatedDuration = this.estimateDuration(task.description || '')
    return !task.timeline || task.timeline >= estimatedDuration
  }

  // ========================================
  // Performance and Monitoring
  // ========================================

  /**
   * Get agent performance metrics
   */
  getMetrics() {
    return {
      ...this.metrics,
      successRate: this.metrics.totalRequests > 0 ? 
        this.metrics.successfulRequests / this.metrics.totalRequests : 0,
      averageConfidence: this.metrics.confidenceScores.length > 0 ?
        this.metrics.confidenceScores.reduce((a, b) => a + b, 0) / this.metrics.confidenceScores.length : 0,
      ragUtilization: this.metrics.totalRequests > 0 ?
        this.metrics.ragQueries / this.metrics.totalRequests : 0
    }
  }

  /**
   * Record request metrics
   */
  protected recordMetrics(success: boolean, confidence: number, ragUsed: boolean = false) {
    this.metrics.totalRequests++
    if (success) this.metrics.successfulRequests++
    this.metrics.confidenceScores.push(confidence)
    if (ragUsed) this.metrics.ragQueries++

    // Keep only last 100 confidence scores for memory efficiency
    if (this.metrics.confidenceScores.length > 100) {
      this.metrics.confidenceScores = this.metrics.confidenceScores.slice(-100)
    }
  }
}

/**
 * Utility function to create expert agent with standardized configuration
 */
export function createExpertAgent(
  agentClass: new(specialization: ExpertSpecialization, ragConfig?: Partial<RAGConfig>) => ExpertAgentTemplate,
  specialization: ExpertSpecialization,
  ragConfig: Partial<RAGConfig> = {}
): ExpertAgentTemplate {
  return new agentClass(specialization, ragConfig)
}

/**
 * Standard tool implementation helper
 */
export abstract class StandardTool {
  abstract category: ToolCategory
  abstract name: string
  abstract description: string
  abstract execute(params: any): Promise<ToolExecutionResult>
  
  protected validateParams(params: any, requiredFields: string[]): void {
    for (const field of requiredFields) {
      if (!(field in params)) {
        throw new Error(`Missing required parameter: ${field}`)
      }
    }
  }
  
  protected formatResponse(data: any, success: boolean = true, metadata: any = {}): ToolExecutionResult {
    return {
      success,
      data,
      retries: 0, // Add required retries property
      metadata: {
        category: this.category,
        toolName: this.name,
        timestamp: new Date().toISOString(),
        ...metadata
      },
      ...(success ? {} : { error: 'Tool execution failed' })
    }
  }
}
