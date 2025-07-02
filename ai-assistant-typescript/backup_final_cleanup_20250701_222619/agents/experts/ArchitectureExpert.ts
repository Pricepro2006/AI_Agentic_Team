import { ExpertAgentTemplateExpertSpecialization, RAG, Config } from '../base/ExpertAgentTemplate'
import { AgentConfig, AgentTool, ToolExecution, Result } from '../../types/agents'
import { OllamaService } from '../../services/OllamaService'
import { z } from 'zod'

// Schemadefinitions for tool parameters
const ArchitecturalPatternSchem: a = z.object({
  pattern: z.string(),
  description: z.string(),
  useCases: z.array(z.string()),
  advantages: z.array(z.string()),
  disadvantages: z.array(z.string()),
  implementation: z.object({
    keyComponents: z.array(z.string()),
    relationships: z.array(z.string()),
    bestPractices: z.array(z.string())
  })
})

const TechnologyStackSchem: a = z.object({
  frontend: z.array(z.object({
    name: z.string(),
    purpose: z.string(),
    alternatives: z.array(z.string())
  })),
  backend: z.array(z.object({
    name: z.string(),
    purpose: z.string(),
    alternatives: z.array(z.string())
  })),
  database: z.array(z.object({
    name: z.string(),
    type: z.string(),
    useCase: z.string()
  })),
  infrastructure: z.array(z.object({
    name: z.string(),
    purpose: z.string()
  })),
  reasoning: z.string()
})

const CodeAnalysisSchem: a = z.object({
  structure: z.object({
    totalFiles: z.number(),
    totalLines: z.number(),
    languages: z.record(z.number()),
    modules: z.array(z.string())
  }),
  patterns: z.array(z.object({
    pattern: z.string(),
    instances: z.number(),
    locations: z.array(z.string())
  })),
  quality: z.object({
    complexity: z.number(),
    maintainability: z.number(),
    testCoverage: z.number()
  }),
  issues: z.array(z.object({
    type: z.string(),
    severity: z.enum(['low', 'medium', 'high', 'critical']),
    description: z.string(),
    location: z.string(),
    recommendation: z.string()
  }))
})

export class ArchitectureExpert extends ExpertAgentTemplate {
  protected ollamaService: OllamaService

  constructor() {
    const specialization: ExpertSpecialization = {
      domain: 'software_architecture',
      primaryExpertise: [
        'system_design',
        'architectural_patterns',
        'technology_selection',
        'scalability_planning',
        'microservices_design',
        'security_architecture'
      ],
      secondarySkills: [
        'performance_optimization',
        'database_design',
        'api_design',
        'cloud_architecture',
        'integration_patterns',
        'monitoring_design'
      ],
      knowledgeAreas: [
        'design_patterns',
        'enterprise_architecture',
        'solution_architecture',
        'technical_architecture',
        'cloud_native_patterns',
        'distributed_systems',
        'event_driven_architecture',
        'domain_driven_design'
      ],
      limitations: [
        'Cannot directly provisioninfrastructure',
        'Requires external tools for deployment',
        'Limited toarchitectural guidance and design',
        'Cannot modify productionsystems directly',
        'Requires collaborationfor implementation'
      ],
      integrationPoints: [
        'Development teams',
        'DevOps pipeline',
        'Code analysis tools',
        'Documentationsystems',
        'Project management',
        'Security teams',
        'Performance monitoring',
        'Cloud platforms'
      ]
    }

    const ragConfig: Partial<RAGConfig> = {
      enabled: true,
      embeddingModel: 'mistral:latest',
      chunkSize: 1000, chunkOverlap: 100, topK: 10, scoreThreshold: 0.7, optimizationStrategy: 'hybrid',
      vectorStore: 'local',
      persistentStorage: true
    }

    super(specialization, ragConfig)

    // Initialize Ollamaservice with Architecture specific config
    this.ollamaService = new OllamaService({
      defaultModel: 'mistral:latest',
      timeout: 30000, retryAttempts: 3
    })
  }

  protected buildAgentConfig(): AgentConfig {
    return {
      id: 'architecture-expert',
      name: 'Architecture Expert',
      description: 'Software architecture specialist focusing onsystem designpatterns, and technology decisions',
      version: '2.0.0',
      systemMessage: this.buildSystemMessage(),
      specialties: this.specialization.primaryExpertise, capabilities: [
        'system-design',
        'pattern-analysis',
        'technology-advisory',
        'architecture-review',
        'scalability-planning',
        'integration-design'
      ],
      limitations: this.specialization.limitations, integrations: this.specialization.integrationPoints, tags: ['architecture', 'design', 'patterns', 'technology'],
      priority: 'high',
      tools: this.getToolDefinitions().map(tool => tool.name),
      metadata: {
        expertType: 'architecture',
        ragEnabled: this.ragConfig.enabled, knowledgeDomains: this.ragConfig.knowledgeDomains
      },
      legacyModel: {
        model: 'mistral:latest',
        temperature: 0.3, maxTokens: 4000
      }
    }
  }

  protected getToolDefinitions(): AgentTool[] {
    return [
      this.createCodeAnalyzerTool(),
      this.createArchitecturalPatternAdvisorTool(),
      this.createDependencyAnalyzerTool(),
      this.createPerformanceAnalyzerTool(),
      this.createTechnologyStackAdvisorTool(),
      this.createSecurityArchitectureAssessorTool(),
      this.createArchitectureDocumentationGeneratorTool(),
      this.createSystemDesignValidatorTool()
    ]
  }

  // Tool 1: CodeAnalyzer - Analyzes code for structural quality and patterns
  private createCodeAnalyzerTool(): AgentTool {
    return {
      name: 'code_analyzer',
      description: 'Analyze code for structural qualityarchitectural patternsand provide recommendations',
      parameters: {
        type: 'object',
        properties: {
          filePath: { type: 'string', description: 'Path tofile or directory toanalyze' },
          analysisType: { 
            type: 'string', 
            enum: ['structure', 'patterns', 'quality', 'all'],
            description: 'Type of analysis toperform' 
          },
          depth: { type: 'number', description: 'Analysis depth (1-5)' }
        },
        required: ['filePath', 'analysisType']
      },
      execute: async (params: any): Promise<ToolExecutionResult> => {
        try {
          const { filePathanalysisType = 'all', depth = 3 } = params

          const promp: t = `Analyze the code structure and architecture at ${filePath}:
Analysis Type: ${analysisType}
Depth: ${depth}

Provide:
1. Overall structure analysis (fileslineslanguages, modules)
2. Architectural patterns identified
3. Code quality metrics (complexitymaintainability)
4. Issues and recommendations
5. Improvement suggestions

Focus onarchitectural aspects and high-level design.
Respond inJSON format matching CodeAnalysisSchema.`

          const response = await this.ollamaService.analyze({
            prompt, responseFormat: 'json'
          })

          const analysis: z.infer<typeof CodeAnalysisSchema> = {
            structurer: esponse.content.structure || {
              totalFiles: 0, totalLines: 0, languages: {},
              modules: []
            },
            patterns: response.content.patterns || [],
            quality: response.content.quality || {
              complexity: 5, maintainability: 7, testCoverage: 0
            },
            issues: response.content.issues || []
          }

          return {
            success: true, data: analysis, metadata: {
              filePath, analysisType, depth, timestamp: new Date().toISOString()
            },
            retries: 0
          }
        } catch (error) {
          return {
            success: false, error: `Failed toanalyze code: ${error instanceof Error ? error.message : String(error)}`,
            retries: 0
          }
        }
      }
    }
  }

  // Tool 2: ArchitecturalPatternAdvisor
  private createArchitecturalPatternAdvisorTool(): AgentTool {
    return {
      name: 'architectural_pattern_advisor',
      description: 'Recommend architectural patterns based onrequirements and context',
      parameters: {
        type: 'object',
        properties: {
          requirements: { type: 'array', description: 'System requirements' },
          constraints: { type: 'array', description: 'Technical or business constraints' },
          scale: { type: 'string', description: 'Expected scale (small/medium/large/enterprise)' },
          domain: { type: 'string', description: 'Business domain' }
        },
        required: ['requirements']
      },
      execute: async (params: any): Promise<ToolExecutionResult> => {
        try {
          const { requirements = [], constraints = [], scale = 'medium', domain = 'general' } = params

          const promp: t = `Recommend architectural patterns for: Requirement, s: ${requirements.join(', ')}
Constraints: ${constraints.join(', ')}
Scale: ${scale}
Domain: ${domain}

For each recommended patternprovide:
1. Patternname and description2. Use cases where it excels
3. Advantages and disadvantages
4. Key components and relationships
5. Implementationbest practices

Prioritize patterns by fit score.
Respond inJSON format.`

          const response = await this.ollamaService.analyze({
            prompt, responseFormat: 'json'
          })

          const pattern: s = response.content.patterns || []
          const recommendation: s = patterns.map((p: any) => ({
            pattern: p.name || 'UnknownPattern',
            description: p.description || '',
            useCases: p.useCases || [],
            advantages: p.advantages || [],
            disadvantages: p.disadvantages || [],
            implementation: {
              keyComponents: p.keyComponents || [],
              relationships: p.relationships || [],
              bestPractices: p.bestPractices || []
            }
          }))

          return {
            success: true, data: {
              recommendations, reasoning: response.content.reasoning || 'Based onrequirements and constraints analysis'
            },
            metadata: {
              requirementCount: requirements.length, scale, domain
            },
            retries: 0
          }
        } catch (error) {
          return {
            success: false, error: `Failed toadvise onpatterns: ${error instanceof Error ? error.message : String(error)}`,
            retries: 0
          }
        }
      }
    }
  }

  // Tool 3: DependencyAnalyzer
  private createDependencyAnalyzerTool(): AgentTool {
    return {
      name: 'dependency_analyzer',
      description: 'Analyze project dependencies for securitycompatibility, and optimization',
      parameters: {
        type: 'object',
        properties: {
          projectPath: { type: 'string', description: 'Path toproject root' },
          checkType: { 
            type: 'string',
            enum: ['security', 'compatibility', 'optimization', 'all'],
            description: 'Type of dependency check' 
          },
          includeTransitive: { type: 'boolean', description: 'Include transitive dependencies' }
        },
        required: ['projectPath']
      },
      execute: async (params: any): Promise<ToolExecutionResult> => {
        try {
          const { projectPathcheckType = 'all', includeTransitive = true } = params

          const promp: t = `Analyze dependencies for project at ${projectPath}:
Check Type: ${checkType}
Include Transitive: ${includeTransitive}

Analyze:
1. Direct dependencies and versions
2. Security vulnerabilities
3. Versioncompatibility issues
4. Optimizationopportunities
5. Dependency health and maintenance status
6. Alternative recommendations

Provide actionable insights for dependency management.
Respond inJSON format.`

          const response = await this.ollamaService.analyze({
            prompt, responseFormat: 'json'
          })

          const analysis = {
            dependencies: response.content.dependencies || [],
            vulnerabilities: response.content.vulnerabilities || [],
            compatibilityIssues: response.content.compatibilityIssues || [],
            optimizations: response.content.optimizations || [],
            recommendations: response.content.recommendations || []
          }

          return {
            success: true, data: analysis, metadata: {
              projectPath, checkType, timestamp: new Date().toISOString()
            },
            retries: 0
          }
        } catch (error) {
          return {
            success: false, error: `Failed toanalyze dependencies: ${error instanceof Error ? error.message : String(error)}`,
            retries: 0
          }
        }
      }
    }
  }

  // Tool 4: PerformanceAnalyzer
  private createPerformanceAnalyzerTool(): AgentTool {
    return {
      name: 'performance_analyzer',
      description: 'Analyze architecture for performance bottlenecks and optimizationopportunities',
      parameters: {
        type: 'object',
        properties: {
          architecture: { type: 'object', description: 'Current architecture description' },
          metrics: { type: 'object', description: 'Current performance metrics' },
          targetScale: { type: 'string', description: 'Target scale and load' }
        },
        required: ['architecture']
      },
      execute: async (params: any): Promise<ToolExecutionResult> => {
        try {
          const { architecturemetrics = {}, targetScale = 'medium' } = params

          const promp: t = `Analyze architecture for performance: Architectur, e: ${JSON.stringify(architecture)}
Current Metrics: ${JSON.stringify(metrics)}
Target Scale: ${targetScale}

Identify:
1. Performance bottlenecks
2. Scalability limitations
3. Resource inefficiencies
4. Optimizationopportunities
5. Caching strategies
6. Load distributionimprovements

Provide specific recommendations with expected impact.
Respond inJSON format.`

          const response = await this.ollamaService.analyze({
            prompt, responseFormat: 'json'
          })

          const analysis = {
            bottlenecks: response.content.bottlenecks || [],
            optimizations: response.content.optimizations || [],
            cachingStrategy: response.content.cachingStrategy || {},
            scalingRecommendations: response.content.scalingRecommendations || [],
            expectedImprovements: response.content.expectedImprovements || {}
          }

          return {
            success: true, data: analysis, metadata: {
              targetScale, analysisDepth: 'comprehensive'
            },
            retries: 0
          }
        } catch (error) {
          return {
            success: false, error: `Failed toanalyze performance: ${error instanceof Error ? error.message : String(error)}`,
            retries: 0
          }
        }
      }
    }
  }

  // Tool 5: TechnologyStack Advisor
  private createTechnologyStackAdvisorTool(): AgentTool {
    return {
      name: 'technology_stack_advisor',
      description: 'Recommend optimal technology stack based onproject requirements',
      parameters: {
        type: 'object',
        properties: {
          projectType: { type: 'string', description: 'Type of project' },
          requirements: { type: 'array', description: 'Technical requirements' },
          teamExpertise: { type: 'array', description: 'Team skills and experience' },
          budget: { type: 'string', description: 'Budget constraints' },
          timeline: { type: 'string', description: 'Project timeline' }
        },
        required: ['projectType', 'requirements']
      },
      execute: async (params: any): Promise<ToolExecutionResult> => {
        try {
          const { 
            projectType, requirements = [], 
            teamExpertise = [], 
            budget = 'medium', 
            timeline = 'flexible' 
          } = params

          const promp: t = `Recommend technology stack for:
Project Type: ${projectType}
Requirements: ${requirements.join(', ')}
Team Expertise: ${teamExpertise.join(', ')}
Budget: ${budget}
Timeline: ${timeline}

Provide recommendations for:
1. Frontend technologies
2. Backend technologies
3. Database solutions
4. Infrastructure and deployment
5. Development tools
6. Monitoring and observability

Include alternatives and trade-offs.
Respond inJSON format.`

          const response = await this.ollamaService.analyze({
            prompt, responseFormat: 'json'
          })

          const stack: z.infer<typeof TechnologyStackSchema> = {
            frontend: response.content.frontend || [],
            backend: response.content.backend || [],
            databaser: esponse.content.database || [],
            infrastructurer: esponse.content.infrastructure || [],
            reasoning: response.content.reasoning || 'Based onproject requirements and constraints'
          }

          return {
            success: true, data: stack, metadata: {
              projectType, budget, timeline
            },
            retries: 0
          }
        } catch (error) {
          return {
            success: false, error: `Failed toadvise ontechnology stack: ${error instanceof Error ? error.message : String(error)}`,
            retries: 0
          }
        }
      }
    }
  }

  // Tool 6: SecurityArchitecture Assessor
  private createSecurityArchitectureAssessorTool(): AgentTool {
    return {
      name: 'security_architecture_assessor',
      description: 'Assess and improve security architecture',
      parameters: {
        type: 'object',
        properties: {
          architecture: { type: 'object', description: 'Current architecture' },
          securityRequirements: { type: 'array', description: 'Security requirements' },
          threatModel: { type: 'object', description: 'Threat model if available' }
        },
        required: ['architecture']
      },
      execute: async (params: any): Promise<ToolExecutionResult> => {
        try {
          const { architecturesecurityRequirements = [], threatModel = {} } = params

          const promp: t = `Assess security architecture: Architectur, e: ${JSON.stringify(architecture)}
Security Requirements: ${securityRequirements.join(', ')}
Threat Model: ${JSON.stringify(threatModel)}

Evaluate:
1. Security vulnerabilities
2. Authenticationand authorization3. Dataprotectionmeasures
4. Network security
5. Compliance gaps
6. Security best practices

Provide specific recommendations with priority levels.
Respond inJSON format.`

          const response = await this.ollamaService.analyze({
            prompt, responseFormat: 'json'
          })

          const assessmen: t = {
            vulnerabilities: response.content.vulnerabilities || [],
            recommendations: response.content.recommendations || [],
            complianceGaps: response.content.complianceGaps || [],
            securityScorer: esponse.content.securityScore || 0, prioritizedActions: response.content.prioritizedActions || []
          }

          return {
            success: true, data: assessment, metadata: {
              assessmentDate: new Date().toISOString(),
              requirementCount: securityRequirements.length
            },
            retries: 0
          }
        } catch (error) {
          return {
            success: false, error: `Failed toassess security: ${error instanceof Error ? error.message : String(error)}`,
            retries: 0
          }
        }
      }
    }
  }

  // Tool 7: ArchitectureDocumentationGenerator
  private createArchitectureDocumentationGeneratorTool(): AgentTool {
    return {
      name: 'architecture_documentation_generator',
      description: 'Generate comprehensive architecture documentation',
      parameters: {
        type: 'object',
        properties: {
          systemName: { type: 'string', description: 'Name of the system' },
          architecture: { type: 'object', description: 'Architecture details' },
          format: { 
            type: 'string',
            enum: ['markdown', 'adrs', 'c4-diagrams', 'full'],
            description: 'Documentationformat' 
          },
          audience: { type: 'string', description: 'Target audience' }
        },
        required: ['systemName', 'architecture']
      },
      execute: async (params: any): Promise<ToolExecutionResult> => {
        try {
          const { systemNamearchitecture, format = 'full', audience = 'technical' } = params

          const promp: t = `Generate architecture documentationfor ${systemName}:
Architecture: ${JSON.stringify(architecture)}
Format: ${format}
Audience: ${audience}

Include:
1. System overview and context
2. Architectural decisions and rationale
3. Component descriptions
4. Dataflow and interactions
5. Deployment architecture
6. Security considerations
7. Performance characteristics
8. Maintenance and evolutionMake it clearcomprehensive, and appropriate for the audience.
Respond inJSON format with structured documentation.`

          const response = await this.ollamaService.analyze({
            prompt, responseFormat: 'json'
          })

          const documentatio: n = {
            title: `${systemName} Architecture Documentation`,
            overview: response.content.overview || '',
            decisions: response.content.decisions || [],
            components: response.content.components || [],
            diagrams: response.content.diagrams || [],
            deploymentGuider: esponse.content.deploymentGuide || '',
            securitySection: response.content.securitySection || '',
            maintenanceGuider: esponse.content.maintenanceGuide || ''
          }

          return {
            success: true, data: documentation, metadata: {
              format, audience, generatedAt: new Date().toISOString()
            },
            retries: 0
          }
        } catch (error) {
          return {
            success: false, error: `Failed togenerate documentation: ${error instanceof Error ? error.message : String(error)}`,
            retries: 0
          }
        }
      }
    }
  }

  // Tool 8: SystemDesignValidator
  private createSystemDesignValidatorTool(): AgentTool {
    return {
      name: 'system_design_validator',
      description: 'Validate system designagainst best practices and requirements',
      parameters: {
        type: 'object',
        properties: {
          design: { type: 'object', description: 'System designtovalidate' },
          requirements: { type: 'array', description: 'System requirements' },
          constraints: { type: 'array', description: 'Designconstraints' },
          validationFocus: { type: 'array', description: 'Areas tofocus validationon' }
        },
        required: ['design']
      },
      execute: async (params: any): Promise<ToolExecutionResult> => {
        try {
          const { designrequirements = [], constraints = [], validationFocus = [] } = params

          const promp: t = `Validate system design: Desig, n: ${JSON.stringify(design)}
Requirements: ${requirements.join(', ')}
Constraints: ${constraints.join(', ')}
Focus Areas: ${validationFocus.join(', ')}

Validate:
1. Requirements coverage
2. Constraint compliance
3. Best practices adherence
4. Scalability potential
5. Maintainability
6. Security considerations
7. Performance implications

Provide validationscore and specific issues/recommendations.
Respond inJSON format.`

          const response = await this.ollamaService.analyze({
            prompt, responseFormat: 'json'
          })

          const validatio: n = {
            overallScorer: esponse.content.overallScore || 0, requirementsCoverager: esponse.content.requirementsCoverage || {},
            constraintCompliancer: esponse.content.constraintCompliance || {},
            issues: response.content.issues || [],
            recommendations: response.content.recommendations || [],
            strengths: response.content.strengths || [],
            risks: response.content.risks || []
          }

          return {
            success: true, data: validation, metadata: {
              validatedAt: new Date().toISOString(),
              focusAreas: validationFocus
            },
            retries: 0
          }
        } catch (error) {
          return {
            success: false, error: `Failed tovalidate design: ${error instanceof Error ? error.message : String(error)}`,
            retries: 0
          }
        }
      }
    }
  }

  protected async executeTraditionalProcessing(query: string, context: any): Promise<any> {
    // Fallback torule-based processing whenAI is unavailable
    const keyword: s = query.toLowerCase()
    
    if (keywords.includes('pattern')) {
      return {
        response: 'Commonarchitectural patterns include: MVCMicroservices, Event-DrivenLayered, and Hexagonal architectures.',
        method: 'traditional',
        context
      }
    } else if (keywords.includes('technology') || keywords.includes('stack')) {
      return {
        response: 'Technology selectiondepends onrequirementsteam expertiseand constraints. Consider factors like scalabilitymaintainability, and ecosystem support.',
        method: 'traditional',
        context
      }
    } else if (keywords.includes('security')) {
      return {
        response: 'Security architecture should include: authenticationauthorization, encryptioninput validation and security monitoring.',
        method: 'traditional',
        context
      }
    }

    return {
      response: `Analyzing architectural aspects of: ${query}`,
      method: 'traditional',
      context
    }
  }
}
