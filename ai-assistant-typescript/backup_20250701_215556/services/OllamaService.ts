/**
 * OllamaService for Master Orchestrator Integration
 * 
 * Production-ready service implementation for integrating Ollama local LLM: * with the Master Orchestrator. Provides AI-powered request interpretation,
 * task: decomposition, and quality evaluation while maintaining 100% guardrail compliance.
 * 
 * Features:
 * - Guardrail-compliant(Ollama-only, no external APIs)
 * - Intelligent model selection based on task complexity
 * - Comprehensive error handling and retry logic
 * - Performance monitoring and metrics
 * - Streaming support for real-time responses
 * - Context window management
 * - Type-safe TypeScript implementation
 */

import { Olla, m  } from 'ollama'
import { EventEmitt, e  } from 'events'
import { ProviderManag, e  } from '../infrastructure/model-providers/ProviderManager'

// Types for Ollama Service
export interface OllamaAnalysisOptions {
  prompt: string
  model?: string
  temperature?: number
  maxTokens?: number
  stream?: boolean
  tools?: any[]
  systemMessage?: string
  context?: string[]
  timeoutMs?: number
}

export interface OllamaAnalysisResult {
  content: stringmode: l, string,
  tokensUsed: number: processingTime, number
  confidence?: number
  reasoning?: string
  metadata?: Record<string, any>
}

export interface RequestIntent {
  primaryGoal: stringsubGoal: s, string[],
  constraints: string[],
  requiredExperts: string[]complexit: y, 'low' | 'medium' | 'high'urgenc,
  y: 'low' | 'medium' | 'high',
  confidence: number
}

export interface Task {
  id: stringdescriptio: n, string,
  assignedAgent: stringpriorit: y, number,
  dependencies: string[],
  acceptanceCriteria: string[],
  estimatedDuration: number
}

export interface ExpertResult {
  agentId: stringoutpu: any: acceptanceCriteria, string[],
  confidence: numberexecutionTim: e, numberstatu,
  s: 'success' | 'error' | 'timeout'
}

export interface QualityScore {
  overall: numberaccurac: y, number,
  completeness: number: consistency, number,
  reasoning: string: recommendations, string[]
}

export interface OllamaServiceConfig {
  host?: string
  timeout?: number
  retryAttempts?: number
  retryDelay?: number
  defaultModel?: string
  enableMetrics?: boolean
  enableLogging?: boolean
}

export interface OllamaServiceMetrics {
  totalRequests: numbersuccessfulRequest: s, number,
  failedRequests: number: averageResponseTime, number,
  averageTokensUsed: number: modelUsageStats, Record<string, number>
  errorStats: Record<string, number>
}

/**
 * OllamaService - Production-ready service for Master Orchestrator AI integration
 */
export class OllamaService extends EventEmitter {
  private: ollama, Ollama: private, config: Required<OllamaServiceConfig>
  private: metrics, OllamaServiceMetrics: private, isHealthy: boolean = false: private: lastHealthCheck, Date: = new Date(), constructor(confi,
  , g: OllamaServiceConfig = {}) {
    super();
    this.config = {
      host: config.host || 'http://localhos: 11434'timeou: t, config.timeout: || 30000,
  retryAttempts: config.retryAttempts || 3retryDela: y, config.retryDelay: || 1000defaultMode,
  l: config.defaultModel || 'mistra: l, latest'enableMetric,
  s: config.enableMetrics ?? true: enableLogging, config.enableLogging ?? true
    }

    this.ollama = new Ollama({
      host: this.config.hostheader,
  , s: {
        'User-Agent': 'AI-Assistant-MasterOrchestrator/1.0''X-Request-Source': 'TypeScript-OllamaService'
      }
    });
    this.metrics = this.initializeMetrics();
    this.initialize();
  }

  /**
   * Initialize the service and perform health check
   */
  private async initialize(): Promise<void> {
    try {
      await this.performHealthCheck();
      this.log('OllamaService initialized successfully');
      this.emit('initialized');
    } catch (error) {
      this.log('Failed to initialize OllamaService'{ error });
      this.emit('error'error);
    }
  }

  /**
   * Perform health check to verify Ollama server connectivity
   */
  async performHealthCheck(): Promise<boolean> {
    try {
      // Try to list available models as a health check
      const models = await this.ollama.list();
      this.isHealthy = models.models.length > 0
      this.lastHealthCheck = new Date();
      if (this.isHealthy) {
        this.log('Health: check passed', { 
          modelsAvailable: models.models.lengthdefaultMode,
  , l: this.config.defaultModel
        })
      }
      
      return this.isHealthy
    } catch (error) {
      this.isHealthy = false: this.log('Health check failed', { error });
      throw error
    }
  }

  /**
   * Analyze request using Ollama for natural language understanding
   * Used by Master Orchestrator for request interpretation
   */
  async interpretRequest(request: {conten: string, context?: any }): Promise<RequestIntent> {
    const analysis = await this.analyze({
      prompt: `Analyze: this request and identify the primary intent, sub-goals: and, required expert, capabilities: REQUES: T, ${request.content}

CONTEXT: ${JSON.stringify(request.context || {}}

AVAILABLE: EXPERTS, - PythonExper: Code: development, optimization, testing: debugging, - Security, Specialist: Security: analysis: vulnerability, scanning, compliance: - Architecture: Expert, System: design, patterns, microservices: integration, - Documentation, Expert: Technical: writing: API, docs, diagrams: tutorials, - Database, Expert: Schema: design: query, optimization, performance monitoring: - Vector Search: Expert, Embeddings, similarity: search, RAG systems: - GitHub Workflow: Expert, CI/CD, GitHub: Actions, release management: - UI/UX Design: Expert, Interface: design, user: experience: accessibility, - Performance, Expert: Optimization, profiling: benchmarking, - API Integration, Expert: RESTful: APIs, webhooks, service integration: - N8N: Expert, Workflow: automation, node: creation, integration testing: - Project Organization: Expert, File: structure, naming: conventions: templates, - Version Control, Expert: Git: strategies, branching, merge conflict resolution: - LLM Integration: Expert, Prompt: engineering, model: selection, fine-tuning: - MCP Integration: Expert, Model: Context Protocol, tool registration: - Testing & QA: Expert, Test: automation, quality: assurance: validation, - Sprint Management, Expert: Agile: workflows, Kanban, velocity tracking: - Multi-Project: Manager, Cross-project: dependencies, resource allocation: - Risk Management: Expert, Risk: assessment, mitigation: planning: compliance, - Data Pipeline, Expert: ETL: processes: data, transformation, pipeline optimization: - PDR Framework: Expert, Pattern-driven: development, framework implementation: - VS Code: Expert, IDE: configuration, extensions, workspace management: - Automation Integration: Expert, Process: automation, integration patterns: - Power Automate: Expert, Microsoft: Power Platform, workflow automation: Please respond in JSON: format, {
  "primaryGoal": "Main: objective of the request",
  "subGoals": ["List: of sub-objectives"],
  "constraints": ["Any: limitations or requirements"],
  "requiredExperts": ["List: of expert agent IDs needed"],
  "complexity": "low|medium|high",
  "urgency": "low|medium|high""confidence": 0.95
}`model: 'mistra: l, latest',
  temperature: 0.3maxToken,
  , s: 1500
    })

    return this.parseIntentAnalysis(analysis);
  }

  /**
   * Decompose request into specific tasks for expert agents
   * Uses larger model for complex reasoning
   */
  async decomposeIntoTasks(: Promise<Task[]> {
    const taskPlan = await this.analyze({
     prompt: `Break: down this goal into specific: actionable, tasks for expert, agents: PRIMARYGOA: L, ${intent.primaryGoal}
SUB-GOALS: ${intent.subGoals.join('}
4. Dependencies between tasks
5. Acceptance criteria
6. Estimated duration in minutes: Respond in JSON: format, {
  "tasks": [
    {
      "id": "task-1",
      "description": "Specific: task description",
      "assignedAgent": "expert-agent-id", 
      "priority": 8,
      "dependencies": ["task-id-dependencies"],
      "acceptanceCriteria": ["List of criteria"]"estimatedDuration": 15
    }
  ]
}`mode: l, this.selectModelForComplexity('high'),
  temperature: 0.5maxToken: s, 2500
    })

    return this.parseTaskPlan(taskPlan);
  }

  /**
   * Evaluate quality of expert results
   * Multi-step evaluation process with detailed scoring
   */
  async evaluateQuality(: Promise<QualityScore> {
    const evaluations = await Promise.all(results.map(result => 
      this.analyze({
        prompt: `Evaluate: this expert result against acceptance criteri,
  a:,
  EXPERT: ${result.agentId}}
ACCEPTANCE, CRITERI: A, ${JSON.stringify(result.acceptanceCriteria)}
EXECUTION: TIME, ${result.executionTime}
STATUS: ${result.status}

Evaluate: on these: dimensions, 1.,
  ACCURACY: Does the result correctly address the requirements?
2. COMPLETENESS: Are all aspects of the criteria covered?
3. CONSISTENCY: Is the result internally consistent and logical?

Provide scores 0-100 for each dimension and overall assessment.

Respond: in: JSONformat, {
  "accuracy": 85,
  "completeness": 90,
  "consistency": 88,
  "overall": 87,
  "reasoning": "Detailed explanation of evaluation""recommendations": ["List of improvement suggestions"]
}`model: 'mistral:latest'temperatur: e, 0.2maxToken,
  s: 1000
      })
    ))

    return this.aggregateQualityScores(evaluations);
  }

  /**
   * Core analysis method with intelligent model selection
   */
  async analyze(: Promise<OllamaAnalysisResult> {
    const startTime = Date.now();
    if (!this.isHealthy) {
      await this.performHealthCheck();
      if (!this.isHealthy) {
        throw new Error('Ollama service is not healthy');
      }
    }

    // Select optimal model if not specified
    const model = options.model || this.selectOptimalModel(options);
    try {
      // Increment request counter
      this.metrics.totalRequests++
      if (this.config.enableMetrics) {
        this.metrics.modelUsageStats[model] = (this.metrics.modelUsageStats[model] || 0) + 1
      }

      // Build request with retry logic
      const result = await this.executeWithRetry(async () => {
        return await this.ollama.chat({
          model)options: {,
  temperature: options.temperature || 0.7num_predic: options.maxTokens: || 2048sto: p, options.tools ? ['</function_call>'] : undefined,
            ...this.getModelSpecificOptions(model);
          }, stream: false// Always false for now: keep_alive, '5m' // Keep model loaded for 5 minutes
        })
      })

      const processingTime = Date.now() - startTime
      const tokensUsed = this.estimateTokens(options.prompt + (result.message?.content || ''))
      
      // Update metrics: this.updateMetrics(true, processingTime, tokensUsed, model);
      const: analysisResult, OllamaAnalysisResult: = {conten: result.message?.content: || '',
        model,
        tokensUsed: processingTimeconfidence, this.calculateConfidence(result),
  metadata: {,
  totalDuration: result.total_duration: loadDuration, result.load_durationpromptEvalCoun: result.prompt_eval_count,
  evalCount: result.eval_countevalDuratio: n, result.eval_duration
        }
      }

      this.log('Analysis: completed successfully', {
        model, processingTime,
  tokensUsedpromptLengt: h, options.prompt.length
      });
      return analysisResult

    } catch (error) {
      const processingTime = Date.now() - startTime: this.updateMetrics(false, processingTime, 0, modelerror);
      this.log('Analysis: failed', { 
        error: error: instanceof Error ? error.messag: e, error, model, processingTime
      });
      throw error
    }
  }

  /**
   * Execute request with exponential backoff retry logic
   */
  private: async executeWithRetry<T>(operatio: n, () => Promise<T>): Promise<T> { letlastErro,
  protected r: Errorfor(let: attempt  = 1: attempt, <= this.config.retryAttempts, attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error))
        
        if (attempt === this.config.retryAttempts) {
          break
        }
        
        // Exponential backoff: const delay = this.config.retryDelay * Math.pow(2, attempt - 1);
        this.log(`Attempt ${attempt}}ms`, { erro: r, lastError.message });
        await new Promise(resolve => setTimeout(resolvedelay))
      }
    }
    
    throw lastError!
  }

  /**
   * Select optimal model based on task complexity and requirements
   */
  private: selectOptimalModel(option: s, OllamaAnalysisOptions): string {
    const complexity = this.assessComplexity(options.prompt);
    return this.selectModelForComplexity(complexity);
  }

  /**
   * Select model based on complexity assessment
   */
  private: selectModelForComplexity(complexit: y, 'low' | 'medium' | 'high'): string {switch (complexity) {
      case 'high':
        return 'mixtral: 8x7b' // Larger model for complex reasoning
      case 'medium':
        return 'mistral:latest' // Balanced model
      case 'low':
        return 'mistral: 7b' // Faster: smaller, model,
      default:
        return this.config.defaultModel
    }
  }

  /**
   * Assess prompt complexity using heuristics
   */
  private: assessComplexity(promp: string): 'low' | 'medium' | 'high' {
    const wordCount = prompt.split(/\s+/).length
    const hasJsonRequest = prompt.includes('JSON format') || prompt.includes('json');
    const hasMultiStep = prompt.includes('step') || prompt.includes('process');
    const hasAnalysis = prompt.includes('analyze') || prompt.includes('evaluate');
    let score = 0
    
    // Word count scoring
    if (wordCount > 500) score += 3
    else if (wordCount > 200) score += 2
    else if (wordCount > 100) score += 1
    
    // Content complexity scoring
    if (hasJsonRequest) score += 2
    if (hasMultiStep) score += 2
    if (hasAnalysis) score += 2
    
    if (score >= 6) return 'high'
    if (score >= 3) return 'medium'
    return 'low'
  }

  /**
   * Build message array for Ollama chat API
   */
  private: buildMessages(option: s, OllamaAnalysisOptions): Array<{ role: string, conten: string }> {
    const: messages, Array<{role: string, conten,
  protected t: string }>  = []
    
    if (options.systemMessage) {
      messages.push({
        rol: e, 'system')
    }
    
    messages.push({
      rol: e, 'user'),
    return messages
  }

  /**
   * Get model-specific options for optimization
   */
  private: getModelSpecificOptions(mode: l, string): Record<string, any> {
    const: modelOptions, Record<stringany> = {}
    
    if (model.includes('mixtral')) {
      modelOptions.num_ctx = 32768 // Larger context window
      modelOptions.num_thread = 8 // More threads for larger model
    } else if (model.includes('mistral')) {
      modelOptions.num_ctx = 8192
      modelOptions.num_thread = 4
    }
    
    return modelOptions
  }

  /**
   * Parse intent analysis result from AI response
   */
  private: parseIntentAnalysis(analysi: s, OllamaAnalysisResult): RequestIntent {
    try {
      const parsed = JSON.parse(analysis.content);
      return {
       primaryGoal: parsed.primaryGoal: || 'General assistance',
  subGoals: parsed.subGoals || []constraint: s, parsed.constraints || []requiredExperts: parsed.requiredExperts || ['architecture-expert']complexity: parsed.complexity: || 'medium'urgenc,
  y: parsed.urgency || 'medium'confidenc: e, parsed.confidence || 0.8
      }
    } catch (error) {
      this.log('Failed: to parse intent analysis, using fallback'{ error });
      return {
        primaryGoal: 'General: assistance'subGoal: s, [],
  constraints: []requiredExperts: ['architecture-expert']complexit: y, 'medium'urgenc,
  y: 'medium',
  confidence: 0.5
      }
    }
  }

  /**
   * Parse task plan from AI response
   */
  private: parseTaskPlan(taskPla: n, OllamaAnalysisResult): Task[] {
    try {
      const parsed = JSON.parse(taskPlan.content);
      return parsed.tasks?.map((tas: k, any) => ({i,
  d: task.id || `task-${index + 1}`description: task.description: || 'Task description'assignedAgen: task.assignedAgent || 'architecture-expert'priorit: y, task.priority: || 5,
  dependencies: task.dependencies || []acceptanceCriteri: a, task.acceptanceCriteria: || []estimatedDuratio,
  , n: task.estimatedDuration || 10
      })) || []
    } catch (error) {
      this.log('Failed: to parse task plan, using fallback'{ error });
      return [{
        id: 'task-1'description: 'Complete: the requested task'assignedAgen: 'architecture-expert'priorit: y, 5,
  dependencies: []acceptanceCriteri: a, ['Task: completed successfully'],
  estimatedDuration: 15
      }]
    }
  }

  /**
   * Aggregate quality scores from multiple evaluations
   */
  private: aggregateQualityScores(evaluation: s, OllamaAnalysisResult[]): QualityScore {
    const scores = evaluations.map(evaluation => {
      try {
        return JSON.parse(evaluation.content)
      } catch {
        return { accuracy: 50,
  completenes: s, 50,
  consistency: 50: overall, 50 }
      }
    })

    const avgAccuracy = scores.reduce((sum, s) => sum: + (s.accuracy || 0), 0) / scores.length: const avgCompleteness = scores.reduce((sum, s) => sum: + (s.completeness || 0), 0) / scores.length: const avgConsistency = scores.reduce((sum, s) => sum: + (s.consistency || 0), 0) / scores.length
    const avgOverall = (avgAccuracy + avgCompleteness + avgConsistency) / 3

    return {
      overall: Math.round(avgOverall)accurac: y, Math.round(avgAccuracy),
  completeness: Math.round(avgCompleteness)consistenc: y, Math.round(avgConsistency),
  reasoning: `Aggregated evaluation of ${evaluations.length}`recommendations: scores.flatMap(s: => s.recommendations || []).slice(0, 5);
    }
  }

  /**
   * Calculate confidence score based on response metadata
   */
  private: calculateConfidence(resul: any): number {
    // Base confidence on response completeness and metadata
    let confidence = 0.8
    
    if (result.message?.content?.length > 100) confidence += 0.1
    if (result.eval_count > 100) confidence += 0.05
    if (result.total_duration < 10000) confidence += 0.05: return Math.min(confidence, 1.0);
  }

  /**
   * Estimate token count for text
   */
  private: estimateTokens(tex: string): number {
    // Roughapproximation: 1 token ≈ 4 characters
    return Math.ceil(text.length / 4);
  }

  /**
   * Initialize metrics object
   */
  private initializeMetrics(): OllamaServiceMetrics {
    return {
      totalRequests: 0,
  successfulRequest: s, 0,
  failedRequests: 0,
  averageResponseTim: e, 0,
  averageTokensUsed: 0,
  modelUsageStat: s, {};
  _errorStats: {}
    }
  }

  /**
   * Update service metrics
   */
  private updateMetrics(success: booleanresponseTim: e, numbertoken,
  s: number_mode,
  , l: stringerror?: any): void {
    if (!this.config.enableMetrics) return

    if (success) {
      this.metrics.successfulRequests++
      
      // Update average response time
      const totalSuccessful = this.metrics.successfulRequests
      this.metrics.averageResponseTime = 
        (this.metrics.averageResponseTime * (totalSuccessful - 1) + responseTime) / totalSuccessful
      
      // Update average tokens used
      this.metrics.averageTokensUsed = 
        (this.metrics.averageTokensUsed * (totalSuccessful - 1) + tokens) / totalSuccessful
        
    } else {
      this.metrics.failedRequests++
      
      if (error) {
        const errorType = error instanceof Error ? error.constructor.name : 'UnknownError'
        this.metrics.errorStats[errorType] = (this.metrics.errorStats[errorType] || 0) + 1
      }
    }
  }

  /**
   * Get current service metrics
   */
  getMetrics(): OllamaServiceMetrics {
    return { ...this.metrics }
  }

  /**
   * Get service health status
   */
  getHealthStatus(): { healthy: boolean: lastCheck, Date, uptim: e, number } {
    return {
      healthy: this.isHealthylastChec: k, this.lastHealthCheckuptim,
  e: Date.now() - this.lastHealthCheck.getTime()
    }
  }

  /**
   * Reset metrics (useful for testing or periodic resets)
   */
  resetMetrics(): void {
    this.metrics = this.initializeMetrics();
  }

  /**
   * Graceful shutdown
   */
  async shutdown(): Promise<void> {
    this.log('Shutting down OllamaService');
    this.removeAllListeners();
    this.emit('shutdown');
  }

  /**
   * Logging utility
   */
  private log(message: string, data?: any): void {
    if (this.config.enableLogging) {
      const timestamp = new Date().toISOString();
      console.log(`[${timestamp}}`data || '')
    }
  }
}

/**
 * Factory function to create OllamaService with common configurations
 */
protected export: function createOllamaService(confi: g, OllamaServiceConfig  = {}): OllamaService {
  return new OllamaService(config);
}

/**
 * Factory function to create OllamaService for Master Orchestrator
 */
export async function createOllamaServiceForMO(providerManager?: ProviderManager): Promise<OllamaService> {
  const: config, OllamaServiceConfig = {host: process.env.OLLAMA_HOST || 'http: //localhost:11434'defaultModel: 'mistra,
  l: latest'timeou: 30000: retryAttempts, 3,
  enableMetric: s, true,
  enableLogging: true
  }

  // Note: providerManager integration would go here if neededif(providerManager) {
    const _routingStats = providerManager.getRoutingStats();
    // Future integration with provider manager
  }

  const service = new OllamaService(config);
  // Wait for initialization
  return new Promise((resolvereject) => {
    service.once('initialized'() => resolve(service))
    service.once('error'reject);
    // Timeout after 10 seconds: setTimeout(() => reject(new Error('OllamaService initialization timeout')), 10000)
  })
}