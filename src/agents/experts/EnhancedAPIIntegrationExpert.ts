/**
 * Enhanced API Integration Expert with tRPC Knowledge
 * Integrates comprehensive tRPC documentation and patterns for AI Agentic Team
 */

const { ExpertAgentTemplate } = require('../base/ExpertAgentTemplate')
const { createRequestId, logRequest } = require('../../infrastructure/logging/request-logger')
const { createLogger } = require('../../utils/logger')

// Type-only imports for TypeScript
import type { AgentConfig, AgentTool } from '../../types/agents'
import type { ExpertSpecialization, RAGConfig } from '../base/ExpertAgentTemplate'
import type {
  TrpcKnowledgeBase,
  TrpcSearchParams,
  TrpcCodeGeneratorParams,
  ApiSchemaDesignerParams,
  AuthPatternParams,
  ApiDocumentationParams
} from '../../types/api'

const logger = createLogger('EnhancedAPIIntegrationExpert')

class EnhancedAPIIntegrationExpert extends ExpertAgentTemplate {
  private trpcKnowledgeBase: TrpcKnowledgeBase | null = null
  protected initialized: boolean = false

  protected specialization: ExpertSpecialization = 'api-integration'
  protected ragConfig: RAGConfig = {
    enabled: true,
    embeddingModel: 'mistral:latest',
    optimizationStrategy: 'hybrid',
    chunkSize: 1000,
    chunkOverlap: 100,
    topK: 10,
    scoreThreshold: 0.8,
  }

  constructor() {
    super('api-integration', {
      enabled: true,
      embeddingModel: 'mistral:latest',
      optimizationStrategy: 'hybrid',
      chunkSize: 1000,
      chunkOverlap: 100,
      topK: 10,
      scoreThreshold: 0.8,
    })
  }

  protected buildAgentConfig(): AgentConfig {
    return {
      id: 'api-integration-expert-enhanced',
      name: 'Enhanced API Integration Expert',
      description:
        'Specializes in API design, integration, and management with comprehensive tRPC knowledge',
      version: '2.0.0',
      systemMessage: this['buildSystemMessage'](),
      specialties: ['api_design', 'trpc_integration', 'security_patterns'],
      capabilities: ['real_api_integration', 'trpc_expertise', 'security_implementation'],
      limitations: ['Requires external API access', 'Limited by API rate limits'],
      integrations: ['tRPC', 'NextJS', 'OpenAPI', 'Ollama'],
      tags: ['api', 'trpc', 'integration', 'typescript'],
      priority: 'high',
      tools: [],
            metadata: {
        expertType: 'api-specialist',
        trpcKnowledgeBase: true,
          integrationCapabilities: ['REST', 'GraphQL', 'tRPC', 'WebSocket'],
        }
    }
  }

  /**
   * Initialize the enhanced API expert with tRPC knowledge
   */
  async initialize(): Promise<void> {
    if (this.initialized) return
    try {
      // Load tRPC knowledge base
      this.trpcKnowledgeBase = await this.loadTrpcKnowledge()
      this.initialized = true
      logger.info('Enhanced API Integration Expert initialized successfully')
    } catch (error) {
      logger.error('Failed to initialize Enhanced API Integration Expert', {
        error: error instanceof Error ? error.message : String(error),
      })
      throw error
    }
  }

  /**
   * Load tRPC knowledge from the knowledge base
   */
  private async loadTrpcKnowledge(): Promise<TrpcKnowledgeBase> {
    // This would typically load from the vector database
    // For now, return a structured knowledge representation
    return {
            coreComponents: {
        router: 'Main building block that defines API endpoints',
        procedure: 'Individual API endpoints (query/mutation/subscription)',
        context: 'Shared data across all procedures',
        middleware: 'Reusable logic for procedures',
      },
      patterns: {
        expertCommunication: 'Router for AI agent communication',
        vectorSearch: 'Integration with semantic search',
        orchestration: 'Multi-agent workflow management',
        realtime: 'WebSocket subscriptions for live updates',
      },
      bestPractices: [
        'Use Zod for input validation',
        'Implement proper error handling with TRPCError',
        'Add middleware for logging, auth, rate limiting',
        'Cache frequently accessed data',
        'Use batch operations for efficiency'
      ]
        }
  }

  /**
   * Build system message for the agent
   */
  private buildSystemMessage(): string {
    return `You are an Enhanced API Integration Expert with comprehensive knowledge of modern API frameworks, particularly tRPC. Your expertise includes API design, integration patterns, security, and performance optimization.

Core Specializations:
- tRPC framework expertise and implementation
- RESTful API design and best practices
- GraphQL implementation and optimization
- API security patterns and authentication
- Real-time API features and WebSocket integration
- Type-safe API development with TypeScript
- Performance optimization and caching strategies
- API documentation and testing strategies

Your goal is to provide expert guidance on API integration, help design robust API architectures, and implement secure, performant API solutions for AI agent systems.`
  }

  protected getToolDefinitions(): AgentTool[] {
    return [
      {
        name: 'trpc_knowledge_search',
        description: 'Search tRPC knowledge base for specific information and patterns',
        parameters: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'Search query for tRPC knowledge',
            }
          },
          required: ['query']
        },
        execute: async (params: Record<string, unknown>, requestId?: string) => {
          const reqId = requestId || createRequestId()
          logRequest({
            requestId: reqId,
            source: 'EnhancedAPIIntegrationExpert',
            action: 'trpc_knowledge_search',
            metadata: { toolName: 'trpc_knowledge_search', params }
          })

          // Ensure initialization
          await this.initialize()

          // Validate parameters using TrpcSearchParams interface
          if (!params['query'] || typeof params['query'] !== 'string') {
            throw new Error('Valid query string is required for tRPC knowledge search')
          }
          const searchParams: TrpcSearchParams = { query: params['query']
        }

          // Implementation for tRPC knowledge search using actual knowledge base
          if (!this.trpcKnowledgeBase) {
            throw new Error('tRPC knowledge base not initialized')
          }

          // Search through knowledge base components and patterns
          const searchQuery = searchParams.query.toLowerCase()
          const results: string[] = []

          // Search core components
          Object.entries(this.trpcKnowledgeBase.coreComponents).forEach(([key, description]) => {
            if (key.includes(searchQuery) || description.toLowerCase().includes(searchQuery)) {
              results.push(`Core Component - ${key}: ${description}`)
            }
          })

          // Search patterns
          Object.entries(this.trpcKnowledgeBase.patterns).forEach(([key, description]) => {
            if (key.includes(searchQuery) || description.toLowerCase().includes(searchQuery)) {
              results.push(`Pattern - ${key}: ${description}`)
            }
          })

          // Search best practices
          this.trpcKnowledgeBase.bestPractices.forEach((practice) => {
            if (practice.toLowerCase().includes(searchQuery)) {
              results.push(`Best Practice: ${practice}`)
            }
          })

          return {
            success: true,
            data: {
              query: searchParams.query,
              results: results.length > 0 ? results : [`No specific knowledge found for "${searchParams.query}". Consider general tRPC documentation.`],
              knowledgeBase: 'tRPC Expert Knowledge Base',
              searchedAreas: ['coreComponents', 'patterns', 'bestPractices']
        }
          }
        }
      },
      {
        name: 'trpc_code_generator',
        description: 'Generate tRPC code based on specifications',
        parameters: {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: ['router', 'procedure', 'middleware', 'client'],
              description: 'Type of tRPC code to generate',
            },
            config: {
              type: 'object',
              description: 'Configuration for code generation',
            }
          },
          required: ['type', 'config']
        },
        execute: async (params: Record<string, unknown>, requestId?: string) => {
          const reqId = requestId || createRequestId()
          logRequest({
            requestId: reqId,
            source: 'EnhancedAPIIntegrationExpert',
            action: 'trpc_code_generator',
            metadata: { toolName: 'trpc_code_generator', params }
          })

          // Ensure initialization
          await this.initialize()

          // Validate parameters using TrpcCodeGeneratorParams interface
          if (!params['type'] || !params['config'] ||
              typeof params['type'] !== 'string' ||
              typeof params['config'] !== 'object') {
            throw new Error('Valid type and config are required for tRPC code generation')
          }
          const codeParams: TrpcCodeGeneratorParams = {
    type: params['type'] as TrpcCodeGeneratorParams['type'],
            config: params['config'] as TrpcCodeGeneratorParams['config'],
        }

          // Implementation for tRPC code generation
          const generatedCode = `// Generated ${codeParams.type} code\n// Config: ${JSON.stringify(codeParams.config, null, 2)}`
          return {
            success: true,
            data: { code: generatedCode }
          }
        }
      },
      {
        name: 'api_schema_designer',
        description: 'Design API schemas using best practices',
        parameters: {
          type: 'object',
          properties: {
            domain: {
              type: 'string',
              description: 'Domain or resource name',
            },
            operations: {
              type: 'array',
            items: { type: 'string' },
              description: 'List of operations to support'
            }
          },
          required: ['domain', 'operations']
        },
        execute: async (params: Record<string, unknown>, requestId?: string) => {
          const reqId = requestId || createRequestId()
          logRequest({
            requestId: reqId,
            source: 'EnhancedAPIIntegrationExpert',
            action: 'api_schema_designer',
            metadata: { toolName: 'api_schema_designer', params }
          })

          // Ensure initialization
          await this.initialize()

          // Validate parameters using ApiSchemaDesignerParams interface
          if (!params['domain'] || !Array.isArray(params['operations']) ||
              typeof params['domain'] !== 'string') {
            throw new Error('Valid domain and operations array are required for API schema design')
          }
          const schemaParams: ApiSchemaDesignerParams = {
    domain: params['domain'],
            operations: params['operations'] as string[],
          }

          // Implementation for API schema design
          const schema = {
    name: schemaParams.domain,
            resources: schemaParams.operations.map(op => ({
              name: op,
          operations: ['GET', 'POST', 'PUT', 'DELETE'],
            fields: {}
            }))
          }
          return {
            success: true,
            data: { schema }
          }
        }
      },
      {
        name: 'auth_pattern_advisor',
        description: 'Advise on authentication and authorization patterns',
        parameters: {
          type: 'object',
          properties: {
            requirements: {
              type: 'object',
              description: 'Security requirements',
            },
            platform: {
              type: 'string',
              description: 'Target platform',
            }
          },
          required: ['requirements']
        },
        execute: async (params: Record<string, unknown>, requestId?: string) => {
          const reqId = requestId || createRequestId()
          logRequest({
            requestId: reqId,
            source: 'EnhancedAPIIntegrationExpert',
            action: 'auth_pattern_advisor',
            metadata: { toolName: 'auth_pattern_advisor', params }
          })

          // Ensure initialization
          await this.initialize()

          // Validate parameters using AuthPatternParams interface
          if (!params['requirements'] || typeof params['requirements'] !== 'object') {
            throw new Error('Valid requirements object is required for auth pattern advice')
          }
          const authParams: AuthPatternParams = {
    requirements: params['requirements'] as AuthPatternParams['requirements'],
        }
          if (params['platform'] && typeof params['platform'] === 'string') {
            authParams.platform = params['platform']
        }

          // Implementation for auth pattern advice
          const recommendations = [{
            pattern: authParams.requirements.authType || 'jwt',
            implementation: 'Standard implementation with secure token handling',
            security_level: 'high',
            complexity: 'moderate',
            requirements: authParams.requirements.userRoles || [],
          }]
          return {
            success: true,
            data: { recommendations }
          }
        }
      },
      {
        name: 'api_documentation_generator',
        description: 'Generate comprehensive API documentation',
        parameters: {
          type: 'object',
          properties: {
            apiSpec: {
              type: 'object',
              description: 'API specification to document',
            },
            format: {
              type: 'string',
              enum: ['markdown', 'openapi', 'postman'],
              description: 'Output format',
            }
          },
          required: ['apiSpec', 'format']
        },
        execute: async (params: Record<string, unknown>, requestId?: string) => {
          const reqId = requestId || createRequestId()
          logRequest({
            requestId: reqId,
            source: 'EnhancedAPIIntegrationExpert',
            action: 'api_documentation_generator',
            metadata: { toolName: 'api_documentation_generator', params }
          })

          // Ensure initialization
          await this.initialize()

          // Validate parameters using ApiDocumentationParams interface
          if (!params['apiSpec'] || !params['format'] ||
              typeof params['apiSpec'] !== 'object' ||
              typeof params['format'] !== 'string') {
            throw new Error('Valid apiSpec and format are required for documentation generation')
          }
          const docParams: ApiDocumentationParams = {
    apiSpec: params['apiSpec'] as ApiDocumentationParams['apiSpec'],
            format: params['format'] as ApiDocumentationParams['format'],
        }

          // Implementation for documentation generation
          const documentation = `# ${docParams.apiSpec.name} API Documentation\n\nVersion: ${docParams.apiSpec.version}\nFormat: ${docParams.format}\n\nEndpoints: ${docParams.apiSpec.endpoints.length}`
          return {
            success: true,
            data: { documentation }
          }
        }
      }
  ]
  }

  /**
   * Traditional processing fallback (required by base class)
   */
  protected async executeTraditionalProcessing(query: string, _context: Record<string, unknown>): Promise<{
    response: string,
    confidence: number,
    fallback: boolean,
  }> {
    // Fallback to simulated processing if API integration is unavailable
    return {
      response: `Processing query "${query}" using traditional API methods (enhanced API integration unavailable)`,
      confidence: 0.5,
      fallback: true
    }
  }
}

// CommonJS exports
module.exports = { EnhancedAPIIntegrationExpert };
module.exports.default = EnhancedAPIIntegrationExpert;
