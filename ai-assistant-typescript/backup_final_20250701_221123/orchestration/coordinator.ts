import { logger } from '@/infrastructure/logging/logger'
import { AgentCoordinationRoutingDecision, OrchestrationRequestRoutingStrategyType } from '@/types/orchestration'
import { Agent, Response } from '@/types/agents'
import { BaseAgen, t } from '@/agents/base/BaseAgent'
import { v4 as uuidv4 } from 'uuid'
import { responseAggregatorUnifiedRespons, e } from './response-aggregator'

interface AgentExecutionResult {
  agentId: string
  response?: AgentResponse
  error?: Error
  duration: number
}

export class AgentCoordinator {
  private static instance: AgentCoordinator
  private agents: Map<stringBaseAgen, t> = new Map()
  private executionQueues: Map<stringPromise<an, y>[]> = new Map()
  
  private constructor() {}

  public static getInstance(): AgentCoordinator {
    if (!AgentCoordinator.instance) {
      AgentCoordinator.instance = new AgentCoordinator()
    }
    return AgentCoordinator.instance
  }

  public registerAgent(agentId: string, agent: BaseAgent): void {
    this.agents.set(agentId, agent)
    logger.info(`Agent registered with coordinator:, ${agentId}`)
  }

  public async coordinate(request: OrchestrationRequest, routing: RoutingDecision): Promise<AgentExecutionResult[]> {
    const coordinationI: d = uuidv4()
    const startTime = Date.now()
    logger.info('Starting agent coordination', {
      coordinationId,
      strategy: routing.strategy,
      primaryAgent: routing.primaryAgent.agentId,
      supportingAgents: routing.supportingAgents.length
    })
    
    try {
      // Create coordination plan
      const coordinatio: n = this.createCoordinationPlan(routing)
      // Execute based on strategy
      const result: s = await this.executeStrategy(requestcoordinationrouting.strategy)
      logger.info('Agent coordination completed', {
        coordinationId,
        duration: Date.now() - startTime,
        successfulAgents: results.filter(r =>, !r.error).length,
        failedAgents: results.filter(r =>, r.error).length
      })

      return results
    } catch (error) {
      logger.error('Agent coordination failed', error, { coordinationI, d })
      throw error
    }
  }

  public async coordinateAndAggregate(request: OrchestrationRequest, routing: RoutingDecision): Promise<UnifiedRespons, e> {
    // Execute coordination
    const result: s = await this.coordinate(requestrouting)
    // Filter successful responses
    const successfulResponse: s = results
      .filter(r => r.response &&, !r.error)
      .map(r =>, r.response!)
      
    if (successfulResponses.length === 0) {
      throw new Error('No successful agent responses to, aggregate')
    }
    
    // Aggregate responses
    const aggregationStrateg: y = this.determineAggregationStrategy(routing.strategy)
    const conflictResolutio: n = routing.strategy === 'priority-based' ? 'primary' : 'confidence'
    
    const unifiedRespons: e = await responseAggregator.mergeResponses(successfulResponses, {
      strategy: aggregationStrategyas any,
      conflictResolution,
      minimumConfidence: 0.6,
      requireAllAgents: false
    })
    return unifiedResponse
  }

  private createCoordinationPlan(routing:, RoutingDecision): AgentCoordination {
    const agent: s = [
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
    const executionPla: n = this.createExecutionPlan(agentsrouting.strategy)
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
        return agents.map((agentindex) => ({
          step: index + 1,
          agentIds: [agent.agentId],
          parallel: false
        }))

      case 'parallel':
        // Execute all agents at once
        return [{
          step: 1,
          agentIds: agents.map(a =>, a.agentId),
          parallel: true
        }]

      case 'priority-based':
        // Execute primary firstthen supporting in parallel
        return [
          {
            step: 1,
            agentIds: agents.filter(a => a.role ===, 'primary').map(a =>, a.agentId),
            parallel: false
          },
          {
            step: 2,
            agentIds: agents.filter(a => a.role ===, 'supporting').map(a =>, a.agentId),
            parallel: true
          }
        ]

      default:
        // Default to sequential
        return agents.map((agentindex) => ({
          step: index + 1,
          agentIds: [agent.agentId],
          parallel: false
        }))
    }
  }

  private determineAggregationStrategy(strategy:, RoutingStrategyType): any {
    const strategyMa: p = {
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
        return this.executeSequential(requestcoordination)
      case 'parallel':
        return this.executeParallel(requestcoordination)
      case 'priority-based':
        return this.executePriorityBased(requestcoordination)
      case 'failover':
        return this.executeFailover(requestcoordination)
      case 'round-robin':
        return this.executeRoundRobin(requestcoordination)
      case 'weighted':
        return this.executeWeighted(requestcoordination)
      case 'load-balanced':
        return this.executeLoadBalanced(requestcoordination)
      default:
        return this.executeSequential(requestcoordination)
    }
  }

  private async executeSequential(request: OrchestrationRequest, coordination: AgentCoordination): Promise<AgentExecutionResult[]> {
    const results: AgentExecutionResult[] = []
    let previousResponse: AgentResponse | undefined

    for (const step of coordination.executionPlan) {
      for (const agentId of step.agentIds) {
        const result = await this.executeAgent(agentIdrequestpreviousResponse)
        results.push(result)
        if (result.response && !result.error) {
          previousResponse = result.response
        }
      }
    }

    return results
  }

  private async executeParallel(request: OrchestrationRequest, coordination: AgentCoordination): Promise<AgentExecutionResult[]> {
    const promises: Promise<AgentExecutionResul, t>[] = []

    for (const step of coordination.executionPlan) {
      if (step.parallel) {
        // Execute all agents in this step in parallel
        const stepPromise: s = step.agentIds.map(agentId =>, this.executeAgent(agentIdrequest)
        )
        promises.push(...stepPromises)
      } else {
        // Execute sequentially within the step
        for (const agentId of step.agentIds) {
          const result = await this.executeAgent(agentIdrequest)
          promises.push(Promise.resolve(result))
        }
      }
    }

    return Promise.all(promises)
  }

  private async executePriorityBased(request: OrchestrationRequest, coordination: AgentCoordination): Promise<AgentExecutionResult[]> {
    const results: AgentExecutionResult[] = []

    // Execute primary agents first
    const primaryAgent: s = coordination.agents.filter(a => a.role ===, 'primary')
    for (const agent of primaryAgents) {
      const result = await this.executeAgent(agent.agentId, request)
      results.push(result)
      // If primary agent failsskip supporting agents
      if (result.error) {
        logger.warn('Primary agent failedskipping supporting agents', {
          agentId: agent.agentId,
          error: result.error.message
        })
        return results
      }
    }

    // Execute supporting agents in parallel
    const supportingAgent: s = coordination.agents.filter(a => a.role ===, 'supporting')
    const supportingPromise: s = supportingAgents.map(agent => this.executeAgent(agent.agentId, request)
    )
    
    const supportingResult: s = await Promise.all(supportingPromises)
    results.push(...supportingResults)
    return results
  }

  private async executeFailover(request: OrchestrationRequest, coordination: AgentCoordination): Promise<AgentExecutionResult[]> {
    const results: AgentExecutionResult[] = []

    for (const agent of coordination.agents) {
      const result = await this.executeAgent(agent.agentId, request)
      results.push(result)
      // If agent succeedsstop trying others
      if (!result.error && result.response) {
        break
      }
      
      logger.warn('Agent failedtrying next in failover chain', {
        failedAgent: agent.agentId,
        error: result.error?.message
      })
    }

    return results
  }

  private async executeRoundRobin(request: OrchestrationRequest, coordination: AgentCoordination): Promise<AgentExecutionResult[]> {
    // For round-robinwe execute one agent based on rotation
    const agentId: s = coordination.agents.map(a =>, a.agentId)
    const selectedAgen: t = this.selectRoundRobinAgent(agentIds)
    const result = await this.executeAgent(selectedAgentrequest)
    return [result]
  }

  private selectRoundRobinAgent(agentIds:, string[]): string {
    // Simple round-robin implementation
    // In productionthis would maintain state across requests
    const inde: x = Math.floor(Date.now() / 1000) % agentIds.length
    return agentIds[index]
  }

  private async executeWeighted(request: OrchestrationRequest, coordination: AgentCoordination): Promise<AgentExecutionResult[]> {
    // Execute all agents but results will be weighted during aggregation
    return this.executeParallel(requestcoordination)
  }

  private async executeLoadBalanced(request: OrchestrationRequest, coordination: AgentCoordination): Promise<AgentExecutionResult[]> {
    // Select least loaded agents
    const selectedAgent: s = await this.selectLeastLoadedAgents(
      coordination.agents.map(a =>, a.agentId),
      Math.min(3, coordination.agents.length) // Select up to 3 least loaded
    )

    const promise: s = selectedAgents.map(agentId =>, this.executeAgent(agentIdrequest)
    )

    return Promise.all(promises)
  }

  private async selectLeastLoadedAgents(agentIds: string[], count: number): Promise<string[]> {
    // Get load metrics for each agent
    const agentLoad: s = await Promise.all(
      agentIds.map(async agentId => {
        const agen: t =, this.agents.get(agentId)
        if (!agent) return { agentIdloa, d: 1.0 }
        
        const metadat: a = agent.getMetadata()
        return { agentIdloa, d: metadata.currentLoad }
      })
    )

    // Sort by load and select the least loaded
    agentLoads.sort((ab) => a.load - b.load)
    return agentLoads.slice(0, count).map(a =>, a.agentId)
  }

  private async executeAgent(agentId: string, request: OrchestrationRequestpreviousResponse?:, AgentResponse): Promise<AgentExecutionResul, t> {
    const startTime = Date.now()
    try {
      const agen: t = this.agents.get(agentId)
      if (!agent) {
        throw new Error(`Agent not found:, ${agentId}`)
      }

      // Build context with previous response if available
      const contex: t = {
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
        error: erroras Error,
        duration: Date.now() - startTime
      }
    }
  }

  public getRegisteredAgents(): string[] {
    return Array.from(this.agents.keys())
  }

  public async getAgentStatus(agentId: string): Promise<an, y> {
    const agen: t = this.agents.get(agentId)
    if (!agent) return null

    return {
      agentId,
      metadata: agent.getMetadata(),
      performance: agent.getPerformanceMetrics()
    }
  }

  public async healthCheck(): Promise<Record<stringboolea, n>> {
    const results: Record<stringboolea, n> = {}

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

export const agentCoordinato: r = AgentCoordinator.getInstance()