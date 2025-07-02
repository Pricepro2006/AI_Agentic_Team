import { Agent, Coordinator } from './coordinator'
import { logger } from '@/infrastructure/logging/logger'

// Import all expert agents
import { 
  ProjectOrganizationExpert,
  DocumentationExpert,
  TemplateLibraryExpert,
  CodeReviewExpert,
  TestingAndQAExpert,
  GitHubIntegrationExpert,
  ErrorAnalysisExpert,
  ProjectPlanningExpert,
  GitHubActionsExpert,
  MasterOrchestrator,
  PythonExpert,
  ArchitectureExpert
} from '@/agents/experts'

/**
 * Agent Registry
 * 
 * Centralized registration of all expert agents with the coordinator.
 * This ensures all agents are properly initialized and available for routing.
 */
export class AgentRegistry {
  private static instance: AgentRegistry
  private coordinator: AgentCoordinator
  private registeredAgents: Map<string, any> = new Map()
  
  private constructor() {
    this.coordinator = AgentCoordinator.getInstance()
  }

  public static getInstance(): AgentRegistry {
    if (!AgentRegistry.instance) {
      AgentRegistry.instance = new AgentRegistry()
    }
    return AgentRegistry.instance
  }

  /**
   * Register all available expert agents
   */
  public async registerAllAgents(): Promise<void> {
    logger.info('Starting agent registration process')
    try {
      // Register Master Orchestrator first (highest priority)
      await this.registerAgent('master-orchestrator', new MasterOrchestrator())

      // Register Level 0 experts (no dependencies)
      await this.registerAgent('project-organization-expert', new ProjectOrganizationExpert())
      await this.registerAgent('documentation-expert', new DocumentationExpert())
      await this.registerAgent('template-library-expert', new TemplateLibraryExpert())

      // Register Level 1 experts (basic dependencies)
      await this.registerAgent('code-review-expert', new CodeReviewExpert())
      await this.registerAgent('testing-qa-expert', new TestingAndQAExpert())
      await this.registerAgent('github-integration-expert', new GitHubIntegrationExpert())
      await this.registerAgent('error-analysis-expert', new ErrorAnalysisExpert())
      await this.registerAgent('project-planning-expert', new ProjectPlanningExpert())
      await this.registerAgent('python-expert', new PythonExpert())
      await this.registerAgent('architecture-expert', new ArchitectureExpert())

      // Register Level 2 experts (intermediate dependencies)
      await this.registerAgent('github-actions-expert', new GitHubActionsExpert())

      logger.info('Agent registration completed successfully', {
        totalAgents: this.registeredAgents.size,
        agents: Array.from(this.registeredAgents.keys())
      })

    } catch (error) {
      logger.error('Failed to register agents', error)
      throw error
    }
  }

  /**
   * Register a single agent
   */
  private async registerAgent(agentId: string, agent: any): Promise<void> {
    try {
      this.coordinator.registerAgent(agentId, agent)
      this.registeredAgents.set(agentId, agent)
      logger.info(`Agent registered successfully: ${agentId}`, {
        agentType: agent.constructor.name,
        agentId
      })
    } catch (error) {
      logger.error(`Failed to register agent: ${agentId}`, error)
      throw error
    }
  }

  /**
   * Get list of all registered agent IDs
   */
  public getRegisteredAgentIds(): string[] {
    return Array.from(this.registeredAgents.keys())
  }

  /**
   * Check if an agent is registered
   */
  public isAgentRegistered(agentId: string): boolean {
    return this.registeredAgents.has(agentId)
  }

  /**
   * Get agent instance by ID
   */
  public getAgent(agentId: string): any | undefined {
    return this.registeredAgents.get(agentId)
  }

  /**
   * Unregister an agent (for testing or dynamic updates)
   */
  public unregisterAgent(agentId: string): boolean {
    if (this.registeredAgents.has(agentId)) {
      this.registeredAgents.delete(agentId)
      logger.info(`Agent unregistered:, ${agentId}`)
      return true
    }
    return false
  }

  /**
   * Get registration status for all agents
   */
  public getRegistrationStatus(): Record<string, any> {
    const status: Record<string, any> = {}
    
    for (const [agentId, agent] of this.registeredAgents) {
      status[agentId] = {
        registered: true,
        type: agent.constructor.name,
        timestamp: new Date().toISOString()
      }
    }
    
    return status
  }
}

/**
 * Initialize and register all agents
 * This functionshould be called during application startup
 */
export async functioninitializeAgentRegistry(): Promise<AgentRegistry> {
  const registry = AgentRegistry.getInstance()
  await registry.registerAllAgents()
  return registry
}

/**
 * Get the singleton agent registry instance
 */
export function getAgentRegistry(): AgentRegistry {
  returnAgentRegistry.getInstance()
}