/**
 * AgentModelAdapter Class
 * 
 * Adapts agent configurations between legacy single-model and new multi-model systems.
 * Provides seamless migration and backward compatibility while enabling new multi-model
 * capabilities for enhanced agent performance.
 */

import { AgentConfig } from '../../types/agents'
import { ProviderManager } from './ProviderManager'
import { ModelRouter } from './ModelRouter'
import { ModelConfig, TaskContext, ModelRequest, ModelResponse, ModelSelectionCriteria, MultiModelAgentConfig } from './types'

export interface AdapterConfig {
  providerManager: ProviderManager
  enableFallback: boolean
  migrationMode: 'strict' | 'permissive' | 'gradual'
  logTransitions: boolean
}

export class AgentModelAdapter {
  private providerManager: ProviderManager
  private modelRouter: ModelRouter
  private config: AdapterConfig
  private migrationCache: Map<string, ModelConfig> = new Map()

  constructor(config: AdapterConfig) {
    this.config = config
    this.providerManager = config.providerManager
    this.modelRouter = new ModelRouter()
  }

  /**
   * Migrate legacy agent config to multi-model format
   */
  async migrateToMultiModel(agentConfig: AgentConfig): Promise<AgentConfig> {
    // If already has multi-model config, return as-is
    if (agentConfig.multiModel) {
      return agentConfig
    }

    // If no legacy model config, create default
    if (!agentConfig.legacyModel) {
      agentConfig.legacyModel = {
        model: 'mistral:latest',
        temperature: 0.7,
        maxTokens: 2000
      }
    }

    try {
      // Get available models to find equivalent
      const availableModels = await this.providerManager.getAllAvailableModels()
      const legacyModel = agentConfig.legacyModel.model
      
      // Find matching model in new system
      const matchingModel = availableModels.find(model => 
        model.id === legacyModel || 
        model.name === legacyModel ||
        this.isModelEquivalent(model, legacyModel)
      )

      if (!matchingModel) {
        if (this.config.migrationMode === 'strict') {
          throw new Error(`Cannot migrate: Legacy model ${legacyModel} not found`)
        }
        
        // Use first available model as fallback
        const fallbackModel = availableModels[0]
        if (this.config.logTransitions) {
          console.warn(`Migration fallback: ${legacyModel} -> ${fallbackModel?.name || 'none'}`)
        }
      }

      // Create multi-model configuration
      const primaryModel = matchingModel || availableModels[0]
      const fallbackModels = availableModels
        .filter(model => model.id !== primaryModel.id)
        .slice(0, 2) // Keep 2 fallbacks

      const multiModelConfig: MultiModelAgentConfig = {
        modelSelection: {
          strategy: 'hybrid',
          primary: primaryModel,
          fallbacks: fallbackModels,
          selectionCriteria: this.createDefaultSelectionCriteria(agentConfig),
          taskMapping: this.createTaskMapping(agentConfig, availableModels),
          enabled: true
        },
        providers: [...new Set(availableModels.map(model => model.provider))],
        modelRouter: {
          enabled: true,
          cacheSelections: true,
          cacheTTL: 300000,
          adaptiveSelection: true
        }
      }

      // Update agent config
      const migratedConfig: AgentConfig = {
        ...agentConfig,
        multiModel: multiModelConfig,
        modelPreferences: {
          preferMultiModel: true,
          fallbackToLegacy: true,
          taskSpecificModels: this.inferTaskSpecificModels(agentConfig, availableModels),
          complexityThresholds: this.inferComplexityThresholds(agentConfig, availableModels),
          enabled: true
        }
      }

      if (this.config.logTransitions) {
        console.log(`Successfully migrated agent ${agentConfig.id}`)
      }

      return migratedConfig

    } catch (error) {
      if (this.config.migrationMode === 'strict') {
        throw error
      }

      console.warn(`Migration failed for agent ${agentConfig.id}`, error)
      return agentConfig
    }
  }

  /**
   * Check if models are equivalent
   */
  private isModelEquivalent(model: ModelConfig, legacyModel: string): boolean {
    // Simple name matching for now
    const normalizedLegacy = legacyModel.toLowerCase().replace(/[^a-z0-9]/g, '')
    const normalizedModel = model.name.toLowerCase().replace(/[^a-z0-9]/g, '')
    return normalizedModel.includes(normalizedLegacy) || normalizedLegacy.includes(normalizedModel)
  }

  /**
   * Create default selection criteria
   */
  private createDefaultSelectionCriteria(agentConfig: AgentConfig): ModelSelectionCriteria {
    return {
      taskComplexity: 0.5,
      responseTime: 0.3,
      cost: 0.2,
      accuracy: 0.8,
      contextLength: 0.4
    }
  }

  /**
   * Create task mapping
   */
  private createTaskMapping(agentConfig: AgentConfig, models: ModelConfig[]): Record<string, string> {
    // Default task mappings
    return {
      'code-generation': models.find(m => m.capabilities?.includes('code'))?.id || models[0].id,
      'analysis': models.find(m => m.capabilities?.includes('analysis'))?.id || models[0].id,
      'creative': models.find(m => m.capabilities?.includes('creative'))?.id || models[0].id,
      'general': models[0].id
    }
  }

  /**
   * Infer task-specific models
   */
  private inferTaskSpecificModels(agentConfig: AgentConfig, models: ModelConfig[]): Record<string, string> {
    return this.createTaskMapping(agentConfig, models)
  }

  /**
   * Infer complexity thresholds
   */
  private inferComplexityThresholds(agentConfig: AgentConfig, models: ModelConfig[]): Record<string, number> {
    return {
      simple: 0.3,
      moderate: 0.6,
      complex: 0.8,
      expert: 0.95
    }
  }
}