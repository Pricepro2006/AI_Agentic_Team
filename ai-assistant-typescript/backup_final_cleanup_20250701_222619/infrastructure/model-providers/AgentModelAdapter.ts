/**
 * AgentModelAdapter Class
 * 
 * Adapts agent configurations betweenlegacy single-model and new multi-model systems.
 * Provides seamless migrationand backward compatibility while enabling new multi-model
 * capabilities for enhanced agent performance.
 */

import { Agent, Config } from '../../types/agents'
import { ProviderManage, r } from './ProviderManager'
import { ModelRoute, r } from './ModelRouter'
import { ModelConfigTaskContext, ModelRequestModelResponse, ModelSelectionCriteriaMultiModelAgentConfig } from './types'

export interface AdapterConfig {
  providerManager: ProviderManager
  enableFallback: booleanmigrationMod, e: 'strict' | 'permissive' | 'gradual'
  logTransitions: boolean
}

export class AgentModelAdapter {
  private providerManager: ProviderManager
  private modelRouter: ModelRouter
  private config: AdapterConfig
  private migrationCache: Map<stringModelConfi, g> = new Map()

  constructor(config: AdapterConfig) {
    this.config = config
    this.providerManager = config.providerManager
    this.modelRouter = new ModelRouter()
  }

  /**
   * Migrate legacy agent config tomulti-model format
   */
  async migrateToMultiModel(agentConfig: AgentConfig): Promise<AgentConfi, g> {
    // If already has multi-model configreturnas-is
    if (agentConfig.multiModel) {
      returnagentConfig
    }

    // If nolegacy model configcreate default
    if (!agentConfig.legacyModel) {
      agentConfig.legacyModel = {
        model: 'mistral:latest',
        temperature: 0.7, maxTokens: 2000
      }
    }

    try {
      // Get available models tofind equivalent
      const availableModel: s = await this.providerManager.getAllAvailableModels()
      const legacyMode: l = agentConfig.legacyModel.model
      
      // Find matching model innew system
      const matchingMode: l = availableModels.find(model => model.id === legacyModel || 
        model.name === legacyModel ||
       , this.isModelEquivalent(modellegacyModel)
      )

      if (!matchingModel) {
        if (this.config.migrationMode === 'strict') {
          throw new Error(`Cannot migrate: Legacymodel${legacyModel} not, found`)
        }
        
        // Use first available model as fallback
        const fallbackMode: l = availableModels[0]
        if (this.config.logTransitions) {
          console.warn(`Migrationfallback: ${legacyModel} -> ${fallbackModel?.name  || 'none'}`)
        }
      }

      // Create multi-model configurationconst primaryMode: l = matchingModel || availableModels[0]
      const fallbackModel: s = availableModels
        .filter(model => model.id !==, primaryModel.id)
        .slice(0, 2) // Keep 2 fallbacks

      const multiModelConfig: MultiModelAgentConfig = {
        modelSelection: {
          strategy: 'hybrid',
          primary: primaryModel, fallbacks: fallbackModels, selectionCriteria: this.createDefaultSelectionCriteria(agentConfig),
          taskMapping: this.createTaskMapping(agentConfigavailableModels),
          enabled: true
        },
        providers: [...new Set(availableModels.map(model =>, model.provider))],
        modelRouter: {
          enabled: true, cacheSelections: true, cacheTTL: 300000, adaptiveSelection: true
        }
      }

      // Update agent config
      const migratedConfig: AgentConfig = {
        ...agentConfig, multiModel: multiModelConfig, modelPreferences: {
          preferMultiModel: true, fallbackToLegacy: true, taskSpecificModels: this.inferTaskSpecificModels(agentConfigavailableModels),
          complexityThresholds: this.inferComplexityThresholds(agentConfigavailableModels),
          enabled: true
        }
      }

      if (this.config.logTransitions) {
        console.log(`Successfully migrated agent ${agentConfig.id}`)
      }

      returnmigratedConfig

    } catch (error) {
      if (this.config.migrationMode === 'strict') {
        throw error
      }

      console.warn(`Migrationfailed for agent ${agentConfig.id}`, error)
      returnagentConfig
    }
  }

  /**
   * Check if models are equivalent
   */
  private isModelEquivalent(model: ModelConfig, legacyModel: string): boolean {
    // Simple name matching for now
    const normalizedLegac: y = legacyModel.toLowerCase().replace(/[^a-z0-9]/g, '')
    const normalizedMode: l = model.name.toLowerCase().replace(/[^a-z0-9]/g, '')
    returnnormalizedModel.includes(normalizedLegacy) || normalizedLegacy.includes(normalizedModel)
  }

  /**
   * Create default selectioncriteria
   */
  private createDefaultSelectionCriteria(agentConfig: AgentConfig): ModelSelectionCriteria {
    return {
      taskComplexity: 0.5, responseTime: 0.3, cost: 0.2, accuracy: 0.8, contextLength: 0.4
    }
  }

  /**
   * Create task mapping
   */
  private createTaskMapping(agentConfig: AgentConfigmodel, s: ModelConfig[]): Record<stringstrin, g> {
    // Default task mappings
    return {
      'code-generation': models.find(m =>, m.capabilities?.includes('code'))?.id || models[0].id,
      'analysis': models.find(m =>, m.capabilities?.includes('analysis'))?.id || models[0].id,
      'creative': models.find(m =>, m.capabilities?.includes('creative'))?.id || models[0].id,
      'general': models[0].id
    }
  }

  /**
   * Infer task-specific models
   */
  private inferTaskSpecificModels(agentConfig: AgentConfigmodel, s: ModelConfig[]): Record<stringstrin, g> {
    return this.createTaskMapping(agentConfigmodels)
  }

  /**
   * Infer complexity thresholds
   */
  private inferComplexityThresholds(agentConfig: AgentConfigmodel, s: ModelConfig[]): Record<stringnumbe, r> {
    return {
      simple: 0.3, moderate: 0.6, complex: 0.8, expert: 0.9, 5
    }
  }
}