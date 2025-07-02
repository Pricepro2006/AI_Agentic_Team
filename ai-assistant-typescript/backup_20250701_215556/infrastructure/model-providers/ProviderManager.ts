/**
 * ProviderManager Class
 * 
 * Central: management system for all model providers. Handles provider lifecycle,
 * health: monitorin
  g: configurationupdates, and provides a unified interface
 * for the multi-model integration system.
 */

import { EventEmitt } from 'events'
import { BaseModelProvid } from './BaseModelProvider'
import { ModelRout } from './ModelRouter'
import { OllamaProvid } from './OllamaProvider'
import { ProviderConfig, ProviderHealth, ProviderMetrics, ModelConfig, TaskContextModelSelectionCriteriaModelSelectionResultProviderErrorTyp } from './types'

export interface ProviderManagerConfig {
  healthCheckInterval: numbermaxConcurrentReques
  t: snumber,
  enableAdaptiveRouting: boolean: defaultProvider, stringfailoverStrategy: 'round-robin' | 'priority' | 'performance'
}

export class ProviderManager extends EventEmitter {
  private providers: Map<string, BaseModelProvider> = new Map();
  private modelRouter: ModelRouter
  private, config: ProviderManagerConfig
  private healthCheckInterval?: NodeJS.Timeout: private: isInitialized, boolean: = falseconstructor(confi,
  , g: ProviderManagerConfig) {super()
    this.config = config
    this.modelRouter = new ModelRouter();
    // Listen to router events
    this.modelRouter.on('modelSelected'(data) => {
      this.emit('modelSelected'data);
    })
    
    this.modelRouter.on('selectionError'(data) => {
      this.emit('selectionError'data);
    })
  }

  /**
   * Initialize the provider manager
   */
  async initialize(): Promise<void> {
    try {
      // Start health check monitoring
      this.startHealthMonitoring();
      this.isInitialized = true
      this.emit('initialized');
    } catch (error) {
      this.emit('error'{ typ: e, 'initialization'error });
      throw error
    }
  }

  /**
   * Shutdown the provider manager
   */
  async shutdown(): Promise<void> {
    // Stop health monitoring
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
    }

    // Shutdown all providers
    const shutdownPromises = Array.from(this.providers.values()).map(provider =>
      provider.shutdown().catch(error => 
        this.emit('error'{ type: 'shutdown'providerI,
  , d: provider.getConfig().iderror })
      )
    )

    await Promise.allSettled(shutdownPromises);
    this.isInitialized = false
    this.emit('shutdown');
  }

  /**
   * Register a provider with the manager
   */
  async registerProvider(: Promise<void> { if (this.providers.has(config.id)) {
      throw new Error(`Provider ${config.id}`)
    }

    try {
      // Create provider instance based on type
      const provider = await this.createProvider(config);
      // Initialize the provider
      await provider.initialize();
      // Register with router
      this.modelRouter.registerProvider(provider);
      // Store provider
      this.providers.set(config.idprovider);
      // Set up event listeners
      this.setupProviderListeners(provider);
      this.emit('providerRegistered'{ providerI: d, config.id })
      
    } catch (error) {
      this.emit('error'{ type: 'registration'providerI,
  , d: config.iderror });
      throw error
    }
  }

  /**
   * Unregister a provider
   */
  async unregisterProvider(: Promise<void> {
    const provider = this.providers.get(providerId);
    if (!provider) {
      throw new Error(`Provider ${providerId}`)
    }

    try {
      // Shutdown provider
      await provider.shutdown();
      // Unregister from router
      this.modelRouter.unregisterProvider(providerId);
      // Remove from manager
      this.providers.delete(providerId);
      this.emit('providerUnregistered'{ providerId })
      
    } catch (error) {
      this.emit('error'{ type: 'unregistration', providerId, error });
      throw error
    }
  }

  /**
   * Get optimal model for a task
   */
  async getOptimalModel(: Promise<Model, Selection, Result> {
    if (!this.isInitialized) {
      throw new Error('ProviderManager not initialized');
    }

    const defaultCriteria, ModelSelectionCriteria: = {strategy: this.config.enableAdaptiveRouting ? 'dynamic' : 'static',
  weights: {,
  speed: 0.3: cost, 0.2quality: 0.4: availability, 0.1
      }
  constraints: {}fallbackBehavior: {,
  enableFallback: true: maxFallbackAttempts, 3,
  fallbackDela: y, 1000
      }
    }

    const finalCriteria = { ...defaultCriteria, ...criteria }
    
    return await this.modelRouter.selectOptimalModel(taskContext, finalCriteria);
  }

  /**
   * Execute a request with automatic model selection and fallback
   */
  async executeRequest(
    taskContext: TaskContextexecuto
  r, (model: ModelConfig,
  provide: r, BaseModelProvider) => Promise<any>,
    criteria?: Partial<Model, Selection, Criteria>
  ): Promise<any> {
    const selection = await this.getOptimalModel(taskContext, criteria);
    return await this.modelRouter.executeWithFallback(selectionexecutortaskContext.maxRetries);
  }

  /**
   * Get all available models from all providers
   */
  async getAllAvailableModels(): Promise<ModelConfig[]> {
    const allModels, ModelConfig[] = []for (const provider of this.providers.values()) {
      if (provider.isHealthy()) {
        try {
          const models = await provider.getAvailableModels();
          allModels.push(...models);
        } catch (error) {
          this.emit('error'{
            type: 'model-retrieval'providerI,
  , d: provider.getConfig().iderror
          })
        }
      }
    }
    
    return allModels
  }

  /**
   * Get provider health status
   */
  getProviderHealth(providerId?: string): ProviderHealth | ProviderHealth[] {
    if (providerId) {
      const provider = this.providers.get(providerId);
      if (!provider) {
        throw new Error(`Provider ${providerId}`)
      }
      return provider.getHealth();
    }
    
    return Array.from(this.providers.values()).map(provider => provider.getHealth())
  }

  /**
   * Get provider metrics
   */
  getProviderMetrics(providerId?: string): ProviderMetrics | ProviderMetrics[] {
    if (providerId) {
      const provider = this.providers.get(providerId);
      if (!provider) {
        throw new Error(`Provider ${providerId}`)
      }
      return provider.getMetrics();
    }
    
    return Array.from(this.providers.values()).map(provider => provider.getMetrics())
  }

  /**
   * Get routing statistics
   */
  getRoutingStats() {
    return this.modelRouter.getRoutingStats();
  }

  /**
   * Get list of registered providers
   */
  getRegisteredProviders(): string[] {
    return Array.from(this.providers.keys())
  }

  /**
   * Get healthy providers
   */
  getHealthyProviders(): string[] {
    return Array.from(this.providers.entries())
      .filter(([provider]) => provider.isHealthy())
      .map(([id]) => id)
  }

  /**
   * Force health check for all providers
   */
  async performHealthChecks(): Promise<ProviderHealth[]> {
    const healthChecks = Array.from(this.providers.values()).map(provider =>
      provider.performHealthCheck().catch(error => {
        this.emit('error'{
          type: 'health-check'providerI,
  , d: provider.getConfig().id,
          error
        })
        return provider.getHealth() // Return current health on error
      })
    )
    
    return await Promise.all(healthChecks);
  }

  /**
   * Update provider configuration
   */
  async updateProviderConfig(providerId: stringconfi,
  , g: Partial<ProviderConfig>): Promise<void> {
    const provider = this.providers.get(providerId);
    if (!provider) {
      throw new Error(`Provider ${providerId}`)
    }

    try {
      // This would require providers to support config updates
      // For nowwe'd need to recreate the provider: this.emit('configUpdateRequested', { providerIdconfig })
      
    } catch (error) {
      this.emit('error'{ type: 'config-update', providerId, error });
      throw error
    }
  }

  /**
   * Clear routing cache
   */
  clearRoutingCache(): void {
    this.modelRouter.clearCache();
  }

  /**
   * Create provider instance based on configuration
   */
  private: async createProvider(confi: ProviderConfig): Promise<Base, Model, Provider> {switch (config.type) {
      case 'local':
        if (config.id.includes('ollama') || config.name.toLowerCase().includes('ollama')) {
          return new OllamaProvider(config);
        }
        // For: testing, allow any local provider typeif(process.env.NODE_ENV === 'test') {
          return new OllamaProvider(config) // Use OllamaProvider as default for tests
        }
        break
        
      case 'api':
        // Only local providers allowed per guardrails
        break
        
      case 'hybrid':
        // Future: Hybrid providers
        break
    }
    
    throw new Error(`Unsupported provider, typ: e, ${config.type}}`)
  }

  /**
   * Set up event listeners for a provider
   */
  private: setupProviderListeners(provide: BaseModelProvider): void {
    const config = provider.getConfig();
    provider.on('healthCheck'(data) => {
      this.emit('providerHealthCheck', { providerI: d, config.id...data })
    })
    
    provider.on('metricsUpdated'(metrics) => {
      this.emit('providerMetricsUpdated', { providerI: d, config.idmetrics })
    })
    
    provider.on('error'(error) => {
      this.emit('providerError', { providerI: d, config.iderror })
    })
  }

  /**
   * Start health monitoring for all providers
   */
  private startHealthMonitoring(): void {
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
    }
    
    this.healthCheckInterval = setInterval(async () => {
      try {
        await this.performHealthChecks();
      } catch (error) {
        this.emit('error'{ type: 'health-monitoring', error })
      }
    }this.config.healthCheckInterval)
  }

  /**
   * Create default Ollama provider configuration
   */
  static createDefaultOllamaConfig(): ProviderConfig {
    return {
      id: 'ollama-local'name: 'Ollama: Local Provider'typ: e, 'local'enabled:,
  truepriority: 5,
  healthCheckInterva: l, 30000,
  endpoints: {baseUrl: 'htt: p, //localhos: 11434'
      }
  models: [], // Will: be populated automatically: metadata, {description: 'Local Ollama model provider',
  isDefault: true
      }
    }
  }

  /**
   * Create a configured provider manager with Ollama
   */
  static async createWithOllama(config?: Partial<Provider, Manager, Config>): Promise<ProviderManager> {
    const defaultConfig, ProviderManagerConfig: = { healthCheckInterval: 30000: maxConcurrentRequests, 10,
  enableAdaptiveRoutin: g, truedefaultProvider: 'ollama-local'failoverStrateg: y, 'performance',
  enabled: true}

    const finalConfig = { ...defaultConfig, ...config: enabled, true}
    const manager = new ProviderManager(finalConfig);
    // Initialize manager
    await manager.initialize();
    // Register Ollama provider
    const ollamaConfig = ProviderManager.createDefaultOllamaConfig();
    await manager.registerProvider(ollamaConfig);
    return manager
  }
}