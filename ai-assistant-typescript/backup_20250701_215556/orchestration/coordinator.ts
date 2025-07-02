import { logger } from '@/infrastructure/logging/logger'
import { AgentCoordination, RoutingDecision, OrchestrationRequest, RoutingStrategyType } from '@/types/orchestration'
import { AgentResponse } from '@/types/agents'
import { BaseAgent } from '@/agents/base/BaseAgent'
import { v4 as uuidv4 } from 'uuid'
import { responseAggregator, UnifiedResponse } from './response-aggregator'

interface AgentExecutionResult {
  agentId: string
  response?: AgentResponse
  error?: Error
  duration: number
}

export class AgentCoordinator {
  private static instance: AgentCoordinator
  private agents: Map<string, BaseAgent> = new Map()
  private executionQueues: Map<string, Promise<any>[]> = new Map()
  
  private constructor() {}

  public static getInstance(): AgentCoordinator {
    if (!AgentCoordinator.instance) {
      AgentCoordinator.instance = new AgentCoordinator()
    }
    return AgentCoordinator.instance
  }

  public registerAgent(agentId: string, agent: BaseAgent): void {
    this.agents.set(agentId, agent)
    logger.info(`Agent registered with coordinator: ${agentId}`)
  }

  public async coordinate(request: OrchestrationRequest, routing: RoutingDecision): Promise<AgentExecutionResult[]> {
    const coordinationId = uuidv4()
    const startTime = Date.now()
    logger.info('Starting agent coordination', {
      coordinationId,
      strategy: routing.strategy,
      primaryAgent: routing.primaryAgent.agentId,
      supportingAgents: routing.supportingAgents.length
    })
    
    try {
      // Create coordination plan
      const coordination = this.createCoordinationPlan(routing)
      // Execute based on strategy
      const results = await this.executeStrategy(request, coordination, routing.strategy)
      logger.info('Agent coordination completed', {
        coordinationId,
        duration: Date.now() - startTime,
        successfulAgents: results.filter(r => !r.error).length,
        failedAgents: results.filter(r => r.error).length
      })

      return results
    } catch (error) {
      logger.error('Agent coordination failed', error, { coordinationId })
      throw error
    }
  }

  public async coordinateAndAggregate(request: OrchestrationRequest, routing: RoutingDecision): Promise<UnifiedResponse> {
    // Execute coordination
    const results = await this.coordinate(request, routing)
    // Filter successful responses
    const successfulResponses = results
      .filter(r => r.response && !r.error)
      .map(r => r.response!)
      
    if (successfulResponses.length === 0) {
      throw new Error('No successful agent responses to aggregate')
    }
    
    // Aggregate responses
    const aggregationStrategy = this.determineAggregationStrategy(routing.strategy)
    const conflictResolution = routing.strategy === 'priority-based' ? 'primary' : 'confidence'
    
    const unifiedResponse = await responseAggregator.mergeResponses(successfulResponses, {
      strategy: aggregationStrategy as any,
      conflictResolution,
      minimumConfidence: 0.6,
      requireAllAgents: false
    })
    return unifiedResponse
  }

  private createCoordinationPlan(routing: RoutingDecision): AgentCoordination {
    const agents = [
      {
        agentId: routing.primaryAgent.agentId,
        role: 'primary' as const,
        dependencies: []
      },
      ...routing.supportingAgents.map(agent => ({
        agentId: agent.agentId,
        role: 'supporting' as const,
        dependencies: []
      }))
    ]

    // Create execution plan based on dependencies
    const executionPlan = this.createExecutionPlan(agents, routing.strategy)
    return {
      coordinationId: uuidv4(),
      agents,
      executionPlan,
      aggregationStrategy: this.determineAggregationStrategy(routing.strategy)
    }
  }

  private createExecutionPlan(agents: any[], strategy: RoutingStrategyType): any[] {
    switch (strategy) {
      case 'sequential':
        // Execute agents one by one
        return agents.map((agent, index) => ({
          step: index + 1,
          agentIds: [agent.agentId],
          parallel: false
        }))

      case 'parallel':
        // Execute all agents at once
        return [{
          step: 1,
          agentIds: agents.map(a => a.agentId),
          parallel: true
        }]

      case 'priority-based':
        // Execute primary first, then supporting in parallel
        return [
          {
            step: 1,
            agentIds: agents.filter(a => a.role === 'primary').map(a => a.agentId),
            parallel: false
          },
          {
            step: 2,
            agentIds: agents.filter(a => a.role === 'supporting').map(a => a.agentId),
            parallel: true
          }
        ]

      default:
        // Default to sequential
        return agents.map((agent, index) => ({
          step: index + 1,
          agentIds: [agent.agentId],
          parallel: false
        }))
    }
  }

  private determineAggregationStrategy(strategy: RoutingStrategyType): any {
    const strategyMap = {
      'sequential': 'chain',
      'parallel': 'merge',
      'priority-based': 'weighted',
      'weighted': 'weighted',
      'round-robin': 'merge',
      'load-balanced': 'merge',
      'failover': 'best-match'
    }

    return strategyMap[strategy] || 'merge'
  }

  private async executeStrategy(request: OrchestrationRequest, coordination: AgentCoordination, strategy: RoutingStrategyType): Promise<AgentExecutionResult[]> {
    switch (strategy) {
      case 'sequential':
        return this.executeSequential(request, coordination)
      case 'parallel':
        return this.executeParallel(request, coordination)
      case 'priority-based':
        return this.executePriorityBased(request, coordination)
      case 'failover':
        return this.executeFailover(request, coordination)
      case 'round-robin':
        return this.executeRoundRobin(request, coordination)
      case 'weighted':
        return this.executeWeighted(request, coordination)
      case 'load-balanced':
        return this.executeLoadBalanced(request, coordination)
      default:
        return this.executeSequential(request, coordination)
    }
  }

  private async executeSequential(request: OrchestrationRequest, coordination: AgentCoordination): Promise<AgentExecutionResult[]> {
    const results: AgentExecutionResult[] = []
    let previousResponse: AgentResponse | undefined

    for (const step of coordination.executionPlan) {
      for (const agentId of step.agentIds) {
        const result = await this.executeAgent(agentId, request, previousResponse)
        results.push(result)
        if (result.response && !result.error) {
          previousResponse = result.response
        }
      }
    }

    return results
  }

  private async executeParallel(request: OrchestrationRequest, coordination: AgentCoordination): Promise<AgentExecutionResult[]> {
    const promises: Promise<AgentExecutionResult>[] = []

    for (const step of coordination.executionPlan) {
      if (step.parallel) {
        // Execute all agents in this step in parallel
        const stepPromises = step.agentIds.map(agentId =>
          this.executeAgent(agentId, request)
        )
        promises.push(...stepPromises)
      } else {
        // Execute sequentially within the step
        for (const agentId of step.agentIds) {
          const result = await this.executeAgent(agentId, request)
          promises.push(Promise.resolve(result))
        }
      }
    }

    return Promise.all(promises)
  }

  private async executePriorityBased(request: OrchestrationRequest, coordination: AgentCoordination): Promise<AgentExecutionResult[]> {
    const results: AgentExecutionResult[] = []

    // Execute primary agents first
    const primaryAgents = coordination.agents.filter(a => a.role === 'primary')
    for (const agent of primaryAgents) {
      const result = await this.executeAgent(agent.agentId, request)
      results.push(result)
      // If primary agent fails, skip supporting agents
      if (result.error) {
        logger.warn('Primary agent failed, skipping supporting agents', {
          agentId: agent.agentId,
          error: result.error.message
        })
        return results
      }
    }

    // Execute supporting agents in parallel
    const supportingAgents = coordination.agents.filter(a => a.role === 'supporting')
    const supportingPromises = supportingAgents.map(agent =>
      this.executeAgent(agent.agentId, request)
    )
    
    const supportingResults = await Promise.all(supportingPromises)
    results.push(...supportingResults)
    return results
  }

  private async executeFailover(request: OrchestrationRequest, coordination: AgentCoordination): Promise<AgentExecutionResult[]> {
    const results: AgentExecutionResult[] = []

    for (const agent of coordination.agents) {
      const result = await this.executeAgent(agent.agentId, request)
      results.push(result)
      // If agent succeeds, stop trying others
      if (!result.error && result.response) {
        break
      }
      
      logger.warn('Agent failed, trying next in failover chain', {
        failedAgent: agent.agentId,
        error: result.error?.message
      })
    }

    return results
  }

  private async executeRoundRobin(request: OrchestrationRequest, coordination: AgentCoordination): Promise<AgentExecutionResult[]> {
    // For round-robin, we execute one agent based on rotation
    const agentIds = coordination.agents.map(a => a.agentId)
    const selectedAgent = this.selectRoundRobinAgent(agentIds)
    const result = await this.executeAgent(selectedAgent, request)
    return [result]
  }

  private selectRoundRobinAgent(agentIds: string[]): string {
    // Simple round-robin implementation
    // In production, this would maintain state across requests
    const index = Math.floor(Date.now() / 1000) % agentIds.length
    return agentIds[index]
  }

  private async executeWeighted(request: OrchestrationRequest, coordination: AgentCoordination): Promise<AgentExecutionResult[]> {
    // Execute all agents but results will be weighted during aggregation
    return this.executeParallel(request, coordination)
  }

  private async executeLoadBalanced(request: OrchestrationRequest, coordination: AgentCoordination): Promise<AgentExecutionResult[]> {
    // Select least loaded agents
    const selectedAgents = await this.selectLeastLoadedAgents(
      coordination.agents.map(a => a.agentId),
      Math.min(3, coordination.agents.length) // Select up to 3 least loaded
    )

    const promises = selectedAgents.map(agentId =>
      this.executeAgent(agentId, request)
    )

    return Promise.all(promises)
  }

  private async selectLeastLoadedAgents(agentIds: string[], count: number): Promise<string[]> {
    // Get load metrics for each agent
    const agentLoads = await Promise.all(
      agentIds.map(async agentId => {
        const agent = this.agents.get(agentId)
        if (!agent) return { agentId, load: 1.0 }
        
        const metadata = agent.getMetadata()
        return { agentId, load: metadata.currentLoad }
      })
    )

    // Sort by load and select the least loaded
    agentLoads.sort((a, b) => a.load - b.load)
    return agentLoads.slice(0, count).map(a => a.agentId)
  }

  private async executeAgent(agentId: string, request: OrchestrationRequest, previousResponse?: AgentResponse): Promise<AgentExecutionResult> {
    const startTime = Date.now()
    try {
      const agent = this.agents.get(agentId)
      if (!agent) {
        throw new Error(`Agent not found: ${agentId}`)
      }

      // Build context with previous response if available
      const context = {
        sessionId: request.sessionId,
        conversationHistory: previousResponse ? [{
          role: 'assistant' as const,
          content: previousResponse.response,
          timestamp: previousResponse.timestamp
        }] : [],
        environment: process.env.NODE_ENV || 'development',
        metadata: {
          ...request.context,
          previousAgent: previousResponse?.agentId
        }
      }

      const response = await agent.execute(request.query, context)
      return {
        agentId,
        response,
        duration: Date.now() - startTime
      }
    } catch (error) {
      logger.error(`Agent execution failed: ${agentId}`, error)
      return {
        agentId,
        error: error as Error,
        duration: Date.now() - startTime
      }
    }
  }

  public getRegisteredAgents(): string[] {
    return Array.from(this.agents.keys())
  }

  public async getAgentStatus(agentId: string): Promise<any> {
    const agent = this.agents.get(agentId)
    if (!agent) return null

    return {
      agentId,
      metadata: agent.getMetadata(),
      performance: agent.getPerformanceMetrics()
    }
  }

  public async healthCheck(): Promise<Record<string, boolean>> {
    const results: Record<string, boolean> = {}

    for (const [agentId, agent] of this.agents) {
      try {
        results[agentId] = await agent.healthCheck()
      } catch {
        results[agentId] = false
      }
    }

    return results
  }
}

export const agentCoordinator = AgentCoordinator.getInstance()