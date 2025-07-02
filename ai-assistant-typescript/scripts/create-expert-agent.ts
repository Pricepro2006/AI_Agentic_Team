#!/usr/bin/env tsx
/**
 * Expert Agent Generator Script
 * 
 * Generates new expert agents based on the standardized template
 * with customizable domain expertise and RAG integration.
 * 
 * Usage:
 * ./scripts/create-expert-agent.ts --name "CloudArchitectureExpert" --domain "cloud_architecture" --rag-enabled
 */

import * as fs from 'fs'
import * as path from 'path'

interface AgentGeneratorConfig {
  name: string
  domain: string
  primaryExpertise: string[]
  secondarySkills: string[]
  knowledgeAreas: string[]
  limitations: string[]
  integrationPoints: string[]
  ragEnabled: boolean
  toolCategories: string[]
  outputDir: string
}

class ExpertAgentGenerator {
  private config: AgentGeneratorConfig

  constructor(config: AgentGeneratorConfig) {
    this.config = config
  }

  /**
   * Generate the complete expert agent implementation
   */
  async generateAgent(): Promise<void> {
    console.log(`🚀 Generating Expert Agent: ${this.config.name}`)
    
    try {
      // 1. Generate main agent class
      await this.generateAgentClass()
      
      // 2. Generate test suite
      await this.generateTestSuite()
      
      // 3. Generate documentation
      await this.generateDocumentation()
      
      // 4. Update agent registry
      await this.updateAgentRegistry()
      
      console.log(`✅ Expert Agent ${this.config.name} generated successfully!`)
      console.log(`📁 Location: ${this.config.outputDir}`)
      console.log(`🧪 Tests: ${this.config.outputDir}/__tests__/`)
      console.log(`📚 Docs: ${this.config.outputDir}/README.md`)
      
    } catch (error) {
      console.error(`❌ Failed to generate agent: ${error.message}`)
      throw error
    }
  }

  /**
   * Generate the main agent class file
   */
  private async generateAgentClass(): Promise<void> {
    const template = this.buildAgentClassTemplate()
    const filePath = path.join(this.config.outputDir, `${this.config.name}.ts`)
    
    await this.ensureDirectoryExists(path.dirname(filePath))
    await fs.promises.writeFile(filePath, template, 'utf8')
    
    console.log(`📝 Generated agent class: ${filePath}`)
  }

  /**
   * Generate comprehensive test suite
   */
  private async generateTestSuite(): Promise<void> {
    const template = this.buildTestSuiteTemplate()
    const testDir = path.join(this.config.outputDir, '__tests__')
    const filePath = path.join(testDir, `${this.config.name}.test.ts`)
    
    await this.ensureDirectoryExists(testDir)
    await fs.promises.writeFile(filePath, template, 'utf8')
    
    console.log(`🧪 Generated test suite: ${filePath}`)
  }

  /**
   * Generate documentation
   */
  private async generateDocumentation(): Promise<void> {
    const template = this.buildDocumentationTemplate()
    const filePath = path.join(this.config.outputDir, 'README.md')
    
    await fs.promises.writeFile(filePath, template, 'utf8')
    
    console.log(`📚 Generated documentation: ${filePath}`)
  }

  /**
   * Update the agent registry with new agent
   */
  private async updateAgentRegistry(): Promise<void> {
    const registryPath = path.join(this.config.outputDir, '..', 'index.ts')
    
    try {
      let registryContent = ''
      if (fs.existsSync(registryPath)) {
        registryContent = await fs.promises.readFile(registryPath, 'utf8')
      }
      
      const exportLine = `export { ${this.config.name} } from './${this.config.name}'`
      
      if (!registryContent.includes(exportLine)) {
        registryContent += `\n${exportLine}`
        await fs.promises.writeFile(registryPath, registryContent, 'utf8')
        console.log(`📋 Updated agent registry: ${registryPath}`)
      }
    } catch (error) {
      console.warn(`⚠️ Could not update agent registry: ${error.message}`)
    }
  }

  /**
   * Build the main agent class template
   */
  private buildAgentClassTemplate(): string {
    const className = this.config.name
    const agentId = this.camelToKebab(className)
    const displayName = this.camelToTitle(className)

    return `/**
 * ${displayName} - AI Expert Agent
 * 
 * Specialized in ${this.config.domain} with comprehensive ${this.config.primaryExpertise.join(', ')} expertise.
 * Generated using standardized Expert Agent Template with RAG integration.
 */

import { ExpertAgentTemplate, ExpertSpecialization, RAGConfig, ToolCategory } from '../base/ExpertAgentTemplate'
import { AgentConfig, AgentTool, ToolExecutionResult } from '../../types/agents'

/**
 * ${displayName} Implementation
 * Domain: ${this.config.domain}
 */
export class ${className} extends ExpertAgentTemplate {
  
  constructor() {
    const specialization: ExpertSpecialization = {
      domain: '${this.config.domain}',
      primaryExpertise: ${JSON.stringify(this.config.primaryExpertise, null, 8)},
      secondarySkills: ${JSON.stringify(this.config.secondarySkills, null, 8)},
      knowledgeAreas: ${JSON.stringify(this.config.knowledgeAreas, null, 8)},
      limitations: ${JSON.stringify(this.config.limitations, null, 8)},
      integrationPoints: ${JSON.stringify(this.config.integrationPoints, null, 8)}
    }

    const ragConfig: Partial<RAGConfig> = {
      enabled: ${this.config.ragEnabled},
      embeddingModel: 'mistral:latest',
      chunkSize: 500,
      chunkOverlap: 50,
      topK: 5,
      scoreThreshold: 0.7,
      optimizationStrategy: 'hybrid',
      knowledgeDomains: specialization.knowledgeAreas,
      vectorStore: 'local',
      persistentStorage: true
    }

    super(specialization, ragConfig)
  }

  /**
   * Build ${this.config.domain} expert specific configuration
   */
  protected buildAgentConfig(): AgentConfig {
    return {
      id: '${agentId}',
      name: '${displayName}',
      description: 'Specialized in ${this.config.domain} with comprehensive ${this.config.primaryExpertise.join(', ')} expertise',
      version: '1.0.0',
      capabilities: [
        ${this.config.primaryExpertise.map(skill => `'${skill}'`).join(',\n        ')}
      ],
      legacyModel: {
        model: 'mistral:latest',
        temperature: 0.3,
        maxTokens: 4000
      },
      tags: ['${this.config.domain}', ...${JSON.stringify(this.config.primaryExpertise)}],
      systemMessage: this.buildSystemMessage(),
      specialties: ['${this.config.domain}', ...${JSON.stringify(this.config.primaryExpertise)}],
      tools: [
        ${this.generateToolNames().map(tool => `'${tool}'`).join(',\n        ')}
      ],
      limitations: this.specialization.limitations,
      integrations: this.specialization.integrationPoints,
      priority: 'high' as const,
      metadata: {
        native_typescript: true,
        rag_enhanced: ${this.config.ragEnabled},
        knowledge_domains: this.specialization.knowledgeAreas.length,
        generated: true,
        template_version: '1.0.0'
      }
    }
  }

  /**
   * Implement 8 standardized tools following the established categories
   */
  protected getToolDefinitions(): AgentTool[] {
    return [
      ${this.generateToolDefinitions()}
    ]
  }

  /**
   * Traditional processing implementation for ${this.config.domain} queries
   */
  protected async executeTraditionalProcessing(query: string, context: any): Promise<any> {
    const keywords = query.toLowerCase()
    let primaryTool = '${this.generateToolNames()[7]}' // default to helper tool
    
    ${this.generateTraditionalProcessingLogic()}

    return {
      recommendedTool: primaryTool,
      confidence: 0.7,
      reasoning: \`Selected \${primaryTool} based on keyword analysis\`,
      suggestedParameters: this.extractParameters(query),
      fallbackMode: true
    }
  }

  /**
   * Extract parameters from query for traditional processing
   */
  private extractParameters(query: string): any {
    const params: any = {}
    
    ${this.generateParameterExtractionLogic()}
    
    return params
  }

  // ========================================
  // Tool Implementation Methods
  // ========================================

  ${this.generateToolImplementations()}

  // ========================================
  // Helper Methods
  // ========================================

  private validateParams(params: any, requiredFields: string[]): void {
    for (const field of requiredFields) {
      if (!(field in params)) {
        throw new Error(\`Missing required parameter: \${field}\`)
      }
    }
  }

  private formatResponse(data: any, success: boolean = true, metadata: any = {}): ToolExecutionResult {
    return {
      success,
      data,
      metadata: {
        agentId: this.config.id,
        timestamp: new Date().toISOString(),
        ...metadata
      },
      ...(success ? {} : { error: 'Tool execution failed' })
    }
  }

  ${this.generateHelperMethods()}
}`
  }

  /**
   * Generate tool names based on domain and categories
   */
  private generateToolNames(): string[] {
    const baseName = this.config.domain.replace('_', '')
    const categories = ['core', 'analyzer', 'generator', 'validator', 'integrator', 'optimizer', 'reporter', 'helper']
    
    return categories.map(category => `${baseName}_${category}`)
  }

  /**
   * Generate tool definitions
   */
  private generateToolDefinitions(): string {
    const toolNames = this.generateToolNames()
    const categories = [
      'CORE_DOMAIN', 'ANALYSIS', 'GENERATOR', 'VALIDATOR', 
      'INTEGRATION', 'OPTIMIZER', 'REPORTER', 'HELPER'
    ]

    return toolNames.map((toolName, index) => {
      const category = categories[index]
      const methodName = this.toCamelCase(`execute_${toolName}`)
      
      return `{
        name: '${toolName}',
        description: '${this.generateToolDescription(toolName, category)}',
        parameters: {
          type: 'object',
          properties: {
            ${this.generateToolParameters(toolName)}
          },
          required: ['input']
        },
        execute: this.${methodName}.bind(this)
      }`
    }).join(',\n      ')
  }

  /**
   * Generate tool description based on category
   */
  private generateToolDescription(toolName: string, category: string): string {
    const descriptions = {
      'CORE_DOMAIN': `Core ${this.config.domain} functionality with domain-specific expertise and best practices`,
      'ANALYSIS': `Comprehensive analysis and assessment capabilities for ${this.config.domain} scenarios`,
      'GENERATOR': `Generate ${this.config.domain} artifacts, configurations, and documentation`,
      'VALIDATOR': `Validate and verify ${this.config.domain} implementations against standards and best practices`,
      'INTEGRATION': `Integration capabilities with external ${this.config.domain} systems and tools`,
      'OPTIMIZER': `Performance optimization and efficiency improvements for ${this.config.domain}`,
      'REPORTER': `Reporting and monitoring capabilities for ${this.config.domain} metrics and status`,
      'HELPER': `Utility and support functions for ${this.config.domain} troubleshooting and assistance`
    }
    
    return descriptions[category] || `${this.config.domain} specialized tool functionality`
  }

  /**
   * Generate tool parameters
   */
  private generateToolParameters(toolName: string): string {
    return `input: { 
              type: 'string', 
              description: 'Input data or query for ${toolName}' 
            },
            options: { 
              type: 'object', 
              description: 'Additional configuration options',
              optional: true
            }`
  }

  /**
   * Generate tool implementations
   */
  private generateToolImplementations(): string {
    const toolNames = this.generateToolNames()
    const categories = [
      'CORE_DOMAIN', 'ANALYSIS', 'GENERATOR', 'VALIDATOR', 
      'INTEGRATION', 'OPTIMIZER', 'REPORTER', 'HELPER'
    ]

    return toolNames.map((toolName, index) => {
      const methodName = this.toCamelCase(`execute_${toolName}`)
      const category = categories[index]
      
      return `private async ${methodName}(params: any): Promise<ToolExecutionResult> {
    const startTime = Date.now()
    
    try {
      this.validateParams(params, ['input'])
      
      // ${category} implementation for ${this.config.domain}
      ${this.generateToolLogic(toolName, category)}
      
      const result = {
        output: \`Processed \${params.input} using ${toolName}\`,
        recommendations: [
          'Review implementation against best practices',
          'Consider performance implications',
          'Validate results in appropriate environment'
        ],
        bestPractices: [
          'Follow ${this.config.domain} standards',
          'Implement proper error handling',
          'Document implementation decisions'
        ],
        nextSteps: [
          'Test implementation thoroughly',
          'Monitor performance metrics',
          'Update documentation'
        ]
      }

      this.recordMetrics(true, 0.8, ${this.config.ragEnabled})

      return this.formatResponse(result, true, {
        category: ToolCategory.${category},
        processingTime: Date.now() - startTime,
        ragEnhanced: ${this.config.ragEnabled}
      })

    } catch (error) {
      this.recordMetrics(false, 0.3)
      return this.formatResponse(null, false, { error: error.message })
    }
  }`
    }).join('\n\n  ')
  }

  /**
   * Generate domain-specific tool logic
   */
  private generateToolLogic(toolName: string, category: string): string {
    const ragLogic = this.config.ragEnabled ? `
      // Enhanced processing with RAG if available
      const ragResponse = await this.processWithRAG(
        \`Process \${params.input} using ${toolName} for ${this.config.domain}\`,
        params,
        '${this.config.domain}'
      )` : ''

    return `${ragLogic}
      
      // ${category} specific logic for ${this.config.domain}
      // TODO: Implement domain-specific logic for ${toolName}
      
      // Placeholder implementation - replace with actual logic
      const processedData = this.process${this.capitalize(category)}(params.input, params.options)`
  }

  /**
   * Generate traditional processing logic
   */
  private generateTraditionalProcessingLogic(): string {
    const toolNames = this.generateToolNames()
    const keywords = this.config.primaryExpertise.concat(this.config.secondarySkills)
    
    return keywords.map((keyword, index) => {
      const toolIndex = index % toolNames.length
      return `if (keywords.includes('${keyword}')) {
      primaryTool = '${toolNames[toolIndex]}'
    } else`
    }).join(' ') + ` {
      // Default case handled above
    }`
  }

  /**
   * Generate parameter extraction logic
   */
  private generateParameterExtractionLogic(): string {
    return `// Extract domain-specific parameters from query
    ${this.config.primaryExpertise.map(skill => 
      `if (query.includes('${skill}')) params.skill = '${skill}'`
    ).join('\n    ')}
    
    // Add common parameters
    if (query.includes('optimize')) params.optimization = true
    if (query.includes('analyze')) params.analysis_type = 'comprehensive'`
  }

  /**
   * Generate helper methods
   */
  private generateHelperMethods(): string {
    const categories = ['CORE_DOMAIN', 'ANALYSIS', 'GENERATOR', 'VALIDATOR', 'INTEGRATION', 'OPTIMIZER', 'REPORTER', 'HELPER']
    
    return categories.map(category => 
      `private process${this.capitalize(category)}(input: string, options: any = {}): any {
    // TODO: Implement ${category.toLowerCase()} processing logic for ${this.config.domain}
    return {
      processed: true,
      input,
      options,
      category: '${category}',
      timestamp: new Date().toISOString()
    }
  }`
    ).join('\n\n  ')
  }

  /**
   * Build test suite template
   */
  private buildTestSuiteTemplate(): string {
    const className = this.config.name
    const toolNames = this.generateToolNames()

    return `/**
 * Test Suite for ${className}
 * 
 * Comprehensive tests for ${this.config.domain} expert agent
 * Generated using standardized Expert Agent Template
 */

import { ${className} } from '../${className}'

describe('${className}', () => {
  let agent: ${className}

  beforeEach(() => {
    agent = new ${className}()
  })

  describe('Agent Configuration', () => {
    test('should have correct configuration', () => {
      const config = agent['config']
      
      expect(config.id).toBe('${this.camelToKebab(className)}')
      expect(config.name).toBe('${this.camelToTitle(className)}')
      expect(config.description).toContain('${this.config.domain}')
      expect(config.tools).toHaveLength(8)
      expect(config.capabilities).toContain('${this.config.primaryExpertise[0]}')
    })

    test('should have all required tools', () => {
      const tools = agent['getToolDefinitions']()
      const expectedTools = [${toolNames.map(tool => `'${tool}'`).join(', ')}]
      
      expect(tools).toHaveLength(8)
      expectedTools.forEach(toolName => {
        expect(tools.find(t => t.name === toolName)).toBeDefined()
      })
    })
  })

  describe('Tool Execution', () => {
    ${toolNames.map(toolName => `
    test('should execute ${toolName} successfully', async () => {
      const tools = agent['getToolDefinitions']()
      const tool = tools.find(t => t.name === '${toolName}')
      
      expect(tool).toBeDefined()
      
      const result = await tool!.execute({
        input: 'test input for ${toolName}',
        options: { test: true }
      })
      
      expect(result.success).toBe(true)
      expect(result.data).toBeDefined()
      expect(result.metadata).toBeDefined()
      expect(result.metadata.category).toBeDefined()
    })`).join('\n')}
  })

  describe('RAG Integration', () => {
    test('should support RAG processing when enabled', async () => {
      const ragConfig = agent['ragConfig']
      
      expect(ragConfig.enabled).toBe(${this.config.ragEnabled})
      
      if (ragConfig.enabled) {
        expect(ragConfig.knowledgeDomains).toContain('${this.config.knowledgeAreas[0]}')
        expect(ragConfig.embeddingModel).toBeDefined()
        expect(ragConfig.chunkSize).toBeGreaterThan(0)
      }
    })
  })

  describe('MO Coordination Interface', () => {
    test('should implement query analysis', async () => {
      const result = await agent.queryAnalysis('test ${this.config.domain} query')
      
      expect(result.domainRelevance).toBeGreaterThan(0)
      expect(result.expertiseRequired).toBeDefined()
      expect(result.complexity).toBeDefined()
      expect(result.confidence).toBeGreaterThan(0)
    })

    test('should provide routing decisions', async () => {
      const intent = {
        query: 'help with ${this.config.primaryExpertise[0]}',
        requiredSkills: ['${this.config.primaryExpertise[0]}'],
        complexity: 'medium'
      }
      
      const score = await agent.routingDecision(intent)
      
      expect(score).toBeGreaterThanOrEqual(0)
      expect(score).toBeLessThanOrEqual(1)
    })

    test('should format responses correctly', async () => {
      const mockResults = {
        response: 'test response',
        confidence: 0.8,
        processingTime: 100
      }
      
      const formatted = await agent.responseFormat(mockResults)
      
      expect(formatted.agentId).toBe('${this.camelToKebab(className)}')
      expect(formatted.agentName).toBe('${this.camelToTitle(className)}')
      expect(formatted.confidence).toBe(0.8)
      expect(formatted.metadata).toBeDefined()
    })

    test('should validate tasks correctly', async () => {
      const validTask = {
        domain: '${this.config.domain}',
        acceptanceCriteria: ['test criteria'],
        timeline: 30
      }
      
      const isValid = await agent.taskValidation(validTask)
      expect(isValid).toBe(true)
    })
  })

  describe('Performance and Metrics', () => {
    test('should track performance metrics', () => {
      const metrics = agent.getMetrics()
      
      expect(metrics.totalRequests).toBeGreaterThanOrEqual(0)
      expect(metrics.successRate).toBeGreaterThanOrEqual(0)
      expect(metrics.averageConfidence).toBeGreaterThanOrEqual(0)
    })

    test('should calculate domain relevance correctly', () => {
      const relevance1 = agent['calculateDomainRelevance']('${this.config.primaryExpertise[0]} optimization')
      const relevance2 = agent['calculateDomainRelevance']('completely unrelated query')
      
      expect(relevance1).toBeGreaterThan(relevance2)
    })
  })

  describe('Error Handling', () => {
    test('should handle missing parameters gracefully', async () => {
      const tools = agent['getToolDefinitions']()
      const tool = tools[0]
      
      const result = await tool.execute({}) // Missing required parameters
      
      expect(result.success).toBe(false)
      expect(result.error).toContain('Missing required parameter')
    })

    test('should handle traditional processing fallback', async () => {
      const result = await agent['executeTraditionalProcessing']('test query', {})
      
      expect(result.recommendedTool).toBeDefined()
      expect(result.confidence).toBeGreaterThan(0)
      expect(result.fallbackMode).toBe(true)
    })
  })
})`
  }

  /**
   * Build documentation template
   */
  private buildDocumentationTemplate(): string {
    const className = this.config.name
    const displayName = this.camelToTitle(className)
    const toolNames = this.generateToolNames()

    return `# ${displayName}

AI Expert Agent specialized in ${this.config.domain} with comprehensive ${this.config.primaryExpertise.join(', ')} expertise.

## Overview

The ${displayName} is a standardized expert agent built using the ExpertAgentTemplate with RAG integration and Master Orchestrator coordination capabilities.

### Domain Expertise
- **Primary**: ${this.config.primaryExpertise.join(', ')}
- **Secondary**: ${this.config.secondarySkills.join(', ')}
- **Knowledge Areas**: ${this.config.knowledgeAreas.join(', ')}

### Configuration
- **Agent ID**: \`${this.camelToKebab(className)}\`
- **RAG Enabled**: ${this.config.ragEnabled}
- **Model**: mistral:latest
- **Temperature**: 0.3
- **Max Tokens**: 4000

## Tools

The agent implements 8 standardized tools following established categories:

${toolNames.map((tool, index) => {
  const categories = ['Core Domain', 'Analysis', 'Generator', 'Validator', 'Integration', 'Optimizer', 'Reporter', 'Helper']
  return `### ${index + 1}. ${tool}
**Category**: ${categories[index]}
**Description**: ${this.generateToolDescription(tool, categories[index].toUpperCase().replace(' ', '_'))}

\`\`\`typescript
const result = await agent.execute('${tool}', {
  input: 'your input here',
  options: { /* additional options */ }
})
\`\`\``
}).join('\n\n')}

## Usage Examples

### Basic Usage
\`\`\`typescript
import { ${className} } from './agents/experts/${className}'

const agent = new ${className}()

// Execute a tool
const result = await agent.execute('${toolNames[0]}', {
  input: 'your ${this.config.domain} query',
  options: { detailed: true }
})

console.log(result.data)
\`\`\`

### RAG-Enhanced Processing
${this.config.ragEnabled ? `\`\`\`typescript
// RAG processing is automatically enabled
const result = await agent.processWithRAG(
  'complex ${this.config.domain} query',
  { context: 'additional context' },
  '${this.config.domain}'
)

console.log(result.ragSources) // Retrieved knowledge sources
console.log(result.confidence) // Confidence score
\`\`\`` : 'RAG integration is disabled for this agent.'}

### MO Coordination
\`\`\`typescript
// Query analysis for routing
const analysis = await agent.queryAnalysis('help with ${this.config.primaryExpertise[0]}')

// Routing decision
const score = await agent.routingDecision({
  query: 'optimize ${this.config.domain} performance',
  requiredSkills: ['${this.config.primaryExpertise[0]}'],
  complexity: 'medium'
})

// Response formatting
const formatted = await agent.responseFormat(results)
\`\`\`

## Limitations

${this.config.limitations.map(limitation => `- ${limitation}`).join('\n')}

## Integration Points

${this.config.integrationPoints.map(integration => `- ${integration}`).join('\n')}

## Testing

Run the test suite:
\`\`\`bash
npm test -- ${className}.test.ts
\`\`\`

## Performance Metrics

The agent tracks comprehensive performance metrics:
- Request count and success rate
- Average response times
- Confidence scores
- RAG utilization${this.config.ragEnabled ? ' (enabled)' : ' (disabled)'}

## Generated Configuration

This agent was generated using the Expert Agent Template with the following configuration:

\`\`\`json
${JSON.stringify(this.config, null, 2)}
\`\`\`

## Next Steps

1. **Implement Tool Logic**: Replace placeholder implementations with domain-specific logic
2. **Enhance RAG Integration**: ${this.config.ragEnabled ? 'Configure knowledge sources and embeddings' : 'Enable RAG integration if needed'}
3. **Add Domain Knowledge**: Populate knowledge base with ${this.config.domain} expertise
4. **Test Thoroughly**: Run comprehensive tests and validate functionality
5. **Optimize Performance**: Profile and optimize tool execution times
6. **Document Usage**: Add specific usage examples and best practices

## Support

For questions or issues with this expert agent, please refer to:
- Expert Agent Template documentation
- Master Orchestrator coordination guides
- RAG integration best practices`
  }

  /**
   * Utility methods for string transformation
   */
  private camelToKebab(str: string): string {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()
  }

  private camelToTitle(str: string): string {
    return str.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim()
  }

  private toCamelCase(str: string): string {
    return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
  }

  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  }

  private async ensureDirectoryExists(dir: string): Promise<void> {
    try {
      await fs.promises.access(dir)
    } catch {
      await fs.promises.mkdir(dir, { recursive: true })
    }
  }
}

/**
 * CLI Interface
 */
async function main() {
  const args = process.argv.slice(2)
  
  if (args.includes('--help') || args.length === 0) {
    console.log(`
Expert Agent Generator

Usage: ./scripts/create-expert-agent.ts [options]

Options:
  --name <AgentName>              Agent class name (required)
  --domain <domain_name>          Domain expertise (required)
  --expertise <skill1,skill2>     Primary expertise areas (comma-separated)
  --skills <skill1,skill2>        Secondary skills (comma-separated)
  --knowledge <area1,area2>       Knowledge areas (comma-separated)
  --limitations <limit1,limit2>   Agent limitations (comma-separated)
  --integrations <int1,int2>      Integration points (comma-separated)
  --rag-enabled                   Enable RAG integration (default: true)
  --output-dir <path>             Output directory (default: src/agents/experts)
  --help                          Show this help

Example:
  ./scripts/create-expert-agent.ts \\
    --name "CloudArchitectureExpert" \\
    --domain "cloud_architecture" \\
    --expertise "aws_design,azure_deployment,kubernetes_orchestration" \\
    --skills "cost_optimization,security_assessment" \\
    --knowledge "cloud_platforms,containerization,microservices" \\
    --rag-enabled
`)
    process.exit(0)
  }

  try {
    const config = parseArgs(args)
    const generator = new ExpertAgentGenerator(config)
    await generator.generateAgent()
    
  } catch (error) {
    console.error(`❌ Error: ${error.message}`)
    process.exit(1)
  }
}

/**
 * Parse command line arguments
 */
function parseArgs(args: string[]): AgentGeneratorConfig {
  const config: Partial<AgentGeneratorConfig> = {
    ragEnabled: true,
    toolCategories: ['core', 'analysis', 'generator', 'validator', 'integration', 'optimizer', 'reporter', 'helper'],
    outputDir: path.join(__dirname, '..', 'src', 'agents', 'experts')
  }

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    const nextArg = args[i + 1]

    switch (arg) {
      case '--name':
        config.name = nextArg
        i++
        break
      case '--domain':
        config.domain = nextArg
        i++
        break
      case '--expertise':
        config.primaryExpertise = nextArg.split(',').map(s => s.trim())
        i++
        break
      case '--skills':
        config.secondarySkills = nextArg.split(',').map(s => s.trim())
        i++
        break
      case '--knowledge':
        config.knowledgeAreas = nextArg.split(',').map(s => s.trim())
        i++
        break
      case '--limitations':
        config.limitations = nextArg.split(',').map(s => s.trim())
        i++
        break
      case '--integrations':
        config.integrationPoints = nextArg.split(',').map(s => s.trim())
        i++
        break
      case '--rag-enabled':
        config.ragEnabled = true
        break
      case '--no-rag':
        config.ragEnabled = false
        break
      case '--output-dir':
        config.outputDir = nextArg
        i++
        break
    }
  }

  // Validate required fields
  if (!config.name) {
    throw new Error('Agent name is required (--name)')
  }
  if (!config.domain) {
    throw new Error('Domain is required (--domain)')
  }

  // Set defaults
  config.primaryExpertise = config.primaryExpertise || [config.domain + '_expertise']
  config.secondarySkills = config.secondarySkills || ['analysis', 'optimization']
  config.knowledgeAreas = config.knowledgeAreas || [config.domain, 'best_practices']
  config.limitations = config.limitations || [
    'Cannot execute system-level operations',
    'Requires domain-specific context for optimal results'
  ]
  config.integrationPoints = config.integrationPoints || ['external_apis', 'monitoring_tools']

  return config as AgentGeneratorConfig
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error)
}