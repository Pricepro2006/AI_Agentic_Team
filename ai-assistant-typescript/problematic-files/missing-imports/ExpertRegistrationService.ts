/**
 * ExpertRegistrationService - Automatic Registration of Existing Experts
 * 
 * Provides automated registration of all existing BaseAgent-based experts
 * with the new ExpertRegistry system, ensuring seamless integration and
 * backward compatibility while enabling enhanced discovery capabilities.
 * 
 * Key Features:
 * - Automatic discovery and registration of all existing experts
 * - Validation and capability mapping for each expert
 * - Health monitoring and registration status tracking
 * - Batch registration with error handling and retry logic
 * - Registration metrics and reporting
 */

import { ExpertRegistry } from './ExpertRegistry'
import { ExpertSystemIntegration } from './ExpertSystemIntegration'
import { BaseAgent } from '../../agents/base/BaseAgent'
import { 
  ExpertValidationResult, 
  ExpertMetadata, 
  ExpertRegistrationRequest 
} from './ExpertRegistry.interface'
import { logger } from '../../utils/logger'

// Import all existing experts
import { DatabaseExpert } from '../../agents/experts/DatabaseExpert'
import { SecurityExpert } from '../../agents/experts/SecurityExpert'
import { CodeReviewExpert } from '../../agents/experts/CodeReviewExpert'
import { DocumentationExpert } from '../../agents/experts/DocumentationExpert'
import { TestingAndQAExpert } from '../../agents/experts/TestingAndQAExpert'
import { GitHubIntegrationExpert } from '../../agents/experts/GitHubIntegrationExpert'
import { TemplateLibraryExpert } from '../../agents/experts/TemplateLibraryExpert'

interface RegistrationResult {
  expertId: string
  success: boolean
  result?: ExpertValidationResult
  error?: string
  registrationTime: number
}

interface RegistrationSummary {
  totalExperts: number
  successfulRegistrations: number
  failedRegistrations: number
  registrationTime: number
  expertResults: RegistrationResult[]
  warnings: string[]
  recommendations: string[]
}

interface ExpertClass {
  new(): BaseAgent
}

/**
 * Service for registering existing experts with ExpertRegistry
 */
export class ExpertRegistrationService {
  private expertRegistry: ExpertRegistry
  private integration: ExpertSystemIntegration
  private registeredExperts: Map<string, ExpertValidationResult> = new Map()
  private registrationMetrics: {
    totalAttempts: number
    successfulRegistrations: number
    failedRegistrations: number
    averageRegistrationTime: number
  } = {
    totalAttempts: 0,
    successfulRegistrations: 0,
    failedRegistrations: 0,
    averageRegistrationTime: 0
  }

  // Registry of all available expert classes
  private expertClasses: Record<string, ExpertClass> = {
    'database-expert': DatabaseExpert,
    'security-expert': SecurityExpert,
    'code-review-expert': CodeReviewExpert,
    'documentation-expert': DocumentationExpert,
    'testing-qa-expert': TestingAndQAExpert,
    'github-integration-expert': GitHubIntegrationExpert,
    'template-library-expert': TemplateLibraryExpert
  }

  constructor(expertRegistry: ExpertRegistry, integration: ExpertSystemIntegration) {
    this.expertRegistry = expertRegistry
    this.integration = integration

    logger.info('ExpertRegistrationService initialized', {
      availableExperts: Object.keys(this.expertClasses).length,
      expertRegistry: !!expertRegistry,
      integration: !!integration
    })
  }

  /**
   * Register all available experts with the ExpertRegistry
   */
  async registerAllExperts(): Promise<RegistrationSummary> {
    const startTime = Date.now()
    const results: RegistrationResult[] = []
    const warnings: string[] = []
    const recommendations: string[] = []

    logger.info('Starting batch registration of all experts', {
      expertCount: Object.keys(this.expertClasses).length
    })

    // Register each expert class
    for (const [expertId, ExpertClass] of Object.entries(this.expertClasses)) {
      try {
        const result = await this.registerExpert(expertId, ExpertClass)
        results.push(result)

        if (result.success) {
          this.registrationMetrics.successfulRegistrations++
          logger.info('Expert registered successfully', {
            expertId,
            registrationTime: result.registrationTime
          })
        } else {
          this.registrationMetrics.failedRegistrations++
          warnings.push(`Failed to register ${expertId}: ${result.error}`)
          logger.warn('Expert registration failed', {
            expertId,
            error: result.error
          })
        }

      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        const result: RegistrationResult = {
          expertId,
          success: false,
          error: errorMessage,
          registrationTime: Date.now() - startTime
        }
        
        results.push(result)
        this.registrationMetrics.failedRegistrations++
        warnings.push(`Exception during registration of ${expertId}: ${errorMessage}`)
        
        logger.error('Expert registration exception', {
          expertId,
          error: errorMessage
        })
      }

      this.registrationMetrics.totalAttempts++
    }

    // Calculate metrics
    const totalTime = Date.now() - startTime
    this.registrationMetrics.averageRegistrationTime = 
      totalTime / Math.max(1, results.length)

    // Generate recommendations
    if (this.registrationMetrics.failedRegistrations > 0) {
      recommendations.push('Review failed registrations and check expert configurations')
    }

    if (this.registrationMetrics.successfulRegistrations === Object.keys(this.expertClasses).length) {
      recommendations.push('All experts registered successfully - ExpertRegistry is ready for use')
    }

    const summary: RegistrationSummary = {
      totalExperts: Object.keys(this.expertClasses).length,
      successfulRegistrations: this.registrationMetrics.successfulRegistrations,
      failedRegistrations: this.registrationMetrics.failedRegistrations,
      registrationTime: totalTime,
      expertResults: results,
      warnings,
      recommendations
    }

    logger.info('Batch expert registration completed', {
      totalExperts: summary.totalExperts,
      successful: summary.successfulRegistrations,
      failed: summary.failedRegistrations,
      duration: totalTime
    })

    return summary
  }

  /**
   * Register a single expert with the ExpertRegistry
   */
  async registerExpert(expertId: string, ExpertClass: ExpertClass): Promise<RegistrationResult> {
    const startTime = Date.now()

    try {
      // Create expert instance
      const expertInstance = new ExpertClass()
      
      // Wait for initialization (expert configs are set asynchronously)
      await this.waitForExpertInitialization(expertInstance, expertId)

      // Validate expert configuration
      if (!this.validateExpertInstance(expertInstance, expertId)) {
        return {
          expertId,
          success: false,
          error: 'Expert instance validation failed',
          registrationTime: Date.now() - startTime
        }
      }

      // Register with ExpertRegistry through integration layer
      const validationResult = await this.integration.registerExistingExpert(expertInstance)

      if (validationResult.isValid) {
        this.registeredExperts.set(expertId, validationResult)
        
        // Verify registration by attempting discovery
        const discoveryTest = await this.integration.discoverExperts(
          `test query for ${expertId}`, 
          { maxExperts: 1, confidenceThreshold: 0.1 }
        )

        logger.debug('Expert registration verified', {
          expertId,
          discoverable: discoveryTest.length > 0,
          registrationTime: Date.now() - startTime
        })
      }

      return {
        expertId,
        success: validationResult.isValid,
        result: validationResult,
        error: validationResult.isValid ? undefined : validationResult.errors.join('; '),
        registrationTime: Date.now() - startTime
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      
      return {
        expertId,
        success: false,
        error: errorMessage,
        registrationTime: Date.now() - startTime
      }
    }
  }

  /**
   * Wait for expert initialization to complete
   */
  private async waitForExpertInitialization(
    expertInstance: BaseAgent, 
    expertId: string,
    maxWaitTime: number = 5000
  ): Promise<void> {
    const startTime = Date.now()
    const checkInterval = 100

    while (Date.now() - startTime < maxWaitTime) {
      try {
        // Check if expert is properly initialized by accessing config
        const config = (expertInstance as any).config
        if (config && config.id && config.name) {
          logger.debug('Expert initialization completed', {
            expertId,
            initTime: Date.now() - startTime
          })
          return
        }
      } catch (error) {
        // Expert not yet initialized
      }

      await this.sleep(checkInterval)
    }

    logger.warn('Expert initialization timeout', {
      expertId,
      maxWaitTime,
      actualWaitTime: Date.now() - startTime
    })
  }

  /**
   * Validate expert instance before registration
   */
  private validateExpertInstance(expertInstance: BaseAgent, expertId: string): boolean {
    try {
      // Check if expert has required configuration
      const config = (expertInstance as any).config
      if (!config) {
        logger.error('Expert missing configuration', { expertId })
        return false
      }

      if (!config.id || !config.name || !config.description) {
        logger.error('Expert missing required config fields', {
          expertId,
          hasId: !!config.id,
          hasName: !!config.name,
          hasDescription: !!config.description
        })
        return false
      }

      // Check if expert has tools
      const tools = (expertInstance as any).getToolDefinitions?.()
      if (!tools || !Array.isArray(tools) || tools.length === 0) {
        logger.warn('Expert has no tools defined', { expertId })
        // Not a fatal error, but worth noting
      }

      // Check if expert can perform basic operations
      if (typeof expertInstance.execute !== 'function') {
        logger.error('Expert missing execute method', { expertId })
        return false
      }

      if (typeof expertInstance.getPerformanceMetrics !== 'function') {
        logger.error('Expert missing getPerformanceMetrics method', { expertId })
        return false
      }

      return true

    } catch (error) {
      logger.error('Expert validation exception', {
        expertId,
        error: error instanceof Error ? error.message : 'Unknown error'
      })
      return false
    }
  }

  /**
   * Get registration status for a specific expert
   */
  getExpertRegistrationStatus(expertId: string): ExpertValidationResult | null {
    return this.registeredExperts.get(expertId) || null
  }

  /**
   * Get list of all registered expert IDs
   */
  getRegisteredExpertIds(): string[] {
    return Array.from(this.registeredExperts.keys())
  }

  /**
   * Check if all experts are registered
   */
  areAllExpertsRegistered(): boolean {
    const availableExperts = Object.keys(this.expertClasses).length
    const registeredExperts = this.registeredExperts.size
    return registeredExperts === availableExperts && registeredExperts > 0
  }

  /**
   * Get registration metrics
   */
  getRegistrationMetrics(): typeof this.registrationMetrics {
    return { ...this.registrationMetrics }
  }

  /**
   * Test vector-based discovery with registered experts
   */
  async testVectorDiscovery(testQueries: string[] = []): Promise<{
    testResults: Array<{
      query: string
      discoveredExperts: number
      topMatch?: string
      confidence?: number
    }>
    overallSuccess: boolean
    recommendations: string[]
  }> {
    const defaultQueries = [
      'database schema design',
      'security vulnerability scan',
      'code review analysis',
      'documentation generation',
      'test automation',
      'github integration',
      'template management'
    ]

    const queries = testQueries.length > 0 ? testQueries : defaultQueries
    const testResults = []
    const recommendations = []

    for (const query of queries) {
      try {
        const discoveryResults = await this.integration.discoverExperts(query, {
          maxExperts: 5,
          confidenceThreshold: 0.3
        })

        testResults.push({
          query,
          discoveredExperts: discoveryResults.length,
          topMatch: discoveryResults[0]?.expertId,
          confidence: discoveryResults[0]?.confidence
        })

        if (discoveryResults.length === 0) {
          recommendations.push(`No experts found for query: "${query}" - check capability mapping`)
        }

      } catch (error) {
        testResults.push({
          query,
          discoveredExperts: 0
        })
        recommendations.push(`Discovery failed for query: "${query}" - ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    }

    const successfulQueries = testResults.filter(result => result.discoveredExperts > 0).length
    const overallSuccess = successfulQueries / queries.length >= 0.7 // 70% success rate

    if (overallSuccess) {
      recommendations.push('Vector-based discovery is working well for most queries')
    } else {
      recommendations.push('Vector-based discovery needs improvement - consider updating capability mappings')
    }

    logger.info('Vector discovery test completed', {
      totalQueries: queries.length,
      successful: successfulQueries,
      successRate: (successfulQueries / queries.length * 100).toFixed(1) + '%'
    })

    return {
      testResults,
      overallSuccess,
      recommendations
    }
  }

  /**
   * Add a new expert class to the registry
   */
  addExpertClass(expertId: string, ExpertClass: ExpertClass): void {
    this.expertClasses[expertId] = ExpertClass
    logger.info('Expert class added to registry', {
      expertId,
      totalClasses: Object.keys(this.expertClasses).length
    })
  }

  /**
   * Remove an expert class from the registry
   */
  removeExpertClass(expertId: string): boolean {
    if (expertId in this.expertClasses) {
      delete this.expertClasses[expertId]
      this.registeredExperts.delete(expertId)
      logger.info('Expert class removed from registry', {
        expertId,
        totalClasses: Object.keys(this.expertClasses).length
      })
      return true
    }
    return false
  }

  /**
   * Get health status of all registered experts
   */
  async getExpertHealthStatus(): Promise<{
    healthy: string[]
    unhealthy: string[]
    unknown: string[]
    summary: {
      total: number
      healthyCount: number
      unhealthyCount: number
      unknownCount: number
    }
  }> {
    const healthy: string[] = []
    const unhealthy: string[] = []
    const unknown: string[] = []

    for (const expertId of this.registeredExperts.keys()) {
      try {
        const expertMetadata = await this.integration.getExpert(expertId)
        if (expertMetadata) {
          const healthResult = await this.integration.getExpertPerformance(expertId)
          if (healthResult && healthResult.successRate > 0.8) {
            healthy.push(expertId)
          } else {
            unhealthy.push(expertId)
          }
        } else {
          unknown.push(expertId)
        }
      } catch (error) {
        unknown.push(expertId)
      }
    }

    return {
      healthy,
      unhealthy,
      unknown,
      summary: {
        total: this.registeredExperts.size,
        healthyCount: healthy.length,
        unhealthyCount: unhealthy.length,
        unknownCount: unknown.length
      }
    }
  }

  /**
   * Generate comprehensive registration report
   */
  async generateRegistrationReport(): Promise<{
    registrationStatus: RegistrationSummary
    discoveryTest: any
    healthStatus: any
    recommendations: string[]
  }> {
    const startTime = Date.now()

    // Get current registration status
    const registrationStatus = await this.registerAllExperts()
    
    // Test vector discovery
    const discoveryTest = await this.testVectorDiscovery()
    
    // Check health status
    const healthStatus = await this.getExpertHealthStatus()
    
    // Generate comprehensive recommendations
    const recommendations = [
      ...registrationStatus.recommendations,
      ...discoveryTest.recommendations
    ]

    if (healthStatus.summary.unhealthyCount > 0) {
      recommendations.push(`${healthStatus.summary.unhealthyCount} experts have health issues - investigate performance metrics`)
    }

    if (healthStatus.summary.unknownCount > 0) {
      recommendations.push(`${healthStatus.summary.unknownCount} experts have unknown health status - check expert availability`)
    }

    logger.info('Registration report generated', {
      duration: Date.now() - startTime,
      registeredExperts: registrationStatus.successfulRegistrations,
      healthyExperts: healthStatus.summary.healthyCount,
      discoverySuccessRate: (discoveryTest.testResults.filter(r => r.discoveredExperts > 0).length / discoveryTest.testResults.length * 100).toFixed(1) + '%'
    })

    return {
      registrationStatus,
      discoveryTest,
      healthStatus,
      recommendations
    }
  }

  /**
   * Sleep utility function
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  /**
   * Cleanup resources
   */
  cleanup(): void {
    this.registeredExperts.clear()
    this.registrationMetrics = {
      totalAttempts: 0,
      successfulRegistrations: 0,
      failedRegistrations: 0,
      averageRegistrationTime: 0
    }
    logger.info('ExpertRegistrationService cleaned up')
  }
}

/**
 * Factory function to create and initialize ExpertRegistrationService
 */
export async function createExpertRegistrationService(
  expertRegistry: ExpertRegistry,
  integration: ExpertSystemIntegration
): Promise<ExpertRegistrationService> {
  const service = new ExpertRegistrationService(expertRegistry, integration)
  
  logger.info('ExpertRegistrationService created and ready for use')
  
  return service
}