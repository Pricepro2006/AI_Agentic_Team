import { ExpertAgentTemplate, ExpertSpecialization, RA, G, Config } from '../base/ExpertAgentTemplate'
import { AgentConfig, AgentTool, Tool, Execution, Result } from '../../types/agents'
import { OllamaServic } from '../../services/OllamaService'
import { z } from 'zod'

// Schema definitions for documentation structures
const ReadmeStructureSchema = z.object({
  title: z.string(),
  description: z.string(),
  badges: z.array(z.object({
    type: z.string(),
    url: z.string(),
    altText: z.string()
  })),
  sections: z.array(z.object({
    heading: z.string(),
    content: z.string(),
    subsections: z.array(z.object({
      heading: z.string(),
      content: z.string()
    })).optional()
  })),
  installation: z.string(),
  usage: z.string(),
  configuration: z.string().optional(),
  contributing: z.string().optional(),
  license: z.string()
})

const APIDocSchema = z.object({
  overview: z.string(),
  baseUrl: z.string(),
  authentication: z.object({
    type: z.string(),
    description: z.string(),
    example: z.string()
  }),
  endpoints: z.array(z.object({
    method: z.string(),
    path: z.string(),
    description: z.string(),
    parameters: z.array(z.object({
      name: z.string(),
      type: z.string(),
      required: z.boolean(),
      description: z.string(),
      example: z.any()
    })),
    requestBody: z.object({
      contentType: z.string(),
      schema: z.any(),
      example: z.any()
    }).optional(),
    responses: z.array(z.object({
      status: z.number(),
      description: z.string(),
      schema: z.any(),
      example: z.any()
    })),
    examples: z.array(z.object({
      title: z.string(),
      request: z.any(),
      response: z.any()
    }))
  })),
  errors: z.array(z.object({
    code: z.string(),
    description: z.string(),
    resolution: z.string()
  }))
})

const ChangelogEntrySchema = z.object({
  version: z.string(),
  date: z.string(),
  changes: z.object({
    added: z.array(z.string()),
    changed: z.array(z.string()),
    deprecated: z.array(z.string()),
    removed: z.array(z.string()),
    fixed: z.array(z.string()),
    security: z.array(z.string())
  }),
  breaking: z.boolean(),
  migration: z.string().optional()
})

const DiagramSchema = z.object({
  type: z.enum(['flowchart', 'sequence', 'class', 'state', 'entity-relationship', 'component', 'deployment']),
  title: z.string(),
  description: z.string(),
  mermaidCode: z.string(),
  elements: z.array(z.object({
    id: z.string(),
    label: z.string(),
    type: z.string(),
    properties: z.record(z.any()).optional()
  })),
  relationships: z.array(z.object({
    from: z.string(),
    to: z.string(),
    label: z.string().optional(),
    type: z.string()
  }))
})

export class DocumentationExpert extends ExpertAgentTemplate {
  protected ollamaService: OllamaService

  constructor() {
    const specialization: ExpertSpecialization = {
      domain: 'documentation_and_technical_writing',
      primaryExpertise: [
        'readme_creation',
        'api_documentation',
        'code_documentation',
        'technical_writing',
        'changelog_management',
        'wiki_creation',
        'diagram_generation',
        'style_guide_enforcement'
      ],
      secondarySkills: [
        'markdown_formatting',
        'documentation_tools',
        'version_control',
        'content_organization',
        'user_guides',
        'developer_guides',
        'reference_documentation',
        'tutorial_creation'
      ],
      knowledgeAreas: [
        'documentation_best_practices',
        'technical_writing_standards',
        'api_documentation_standards',
        'markdown_syntax',
        'documentation_generators',
        'diagramming_tools',
        'content_management',
        'information_architecture'
      ],
      limitations: [
        'Cannot generate visual assets directly',
        'Limited to text-based documentation',
        'Requires code context for accurate documentation',
        'Cannot validate external links automatically',
        'Language-specific nuances may vary'
      ],
      integrationPoints: [
        'Documentation generators',
        'Static site generators',
        'Wiki platforms',
        'Version control systems',
        'CI/CD pipelines',
        'API specification tools',
        'Diagramming tools',
        'Content management systems'
      ]
    }

    const ragConfig: Partial<RAGConfig> = {
      enabled: true,
      embeddingModel: 'mistral:latest',
      chunkSize: 2000,
      chunkOverlap: 300,
      topK: 20,
      scoreThreshold: 0.7,
      optimizationStrategy: 'documentation-focused',
      vectorStore: 'local',
      persistentStorage: true
    }

    super(specialization, ragConfig)

    // Initialize Ollama service with Documentation specific config
    this.ollamaService = new OllamaService({
      defaultModel: 'mistral:latest',
      timeout: 60000,
      retryAttempts: 3
    })
  }

  protected buildAgentConfig(): AgentConfig {
    return {
      id: 'documentation-expert',
      name: 'Documentation Expert',
      description: 'Specialized in creating and maintaining comprehensive technical documentation',
      version: '2.0.0',
      systemMessage: this.buildSystemMessage(),
      specialties: this.specialization.primaryExpertise,
      capabilities: [
        'readme-generation',
        'api-documentation',
        'code-commenting',
        'changelog-management',
        'technical-writing',
        'wiki-creation',
        'diagram-generation',
        'documentation-review'
      ],
      limitations: this.specialization.limitations,
      integrations: this.specialization.integrationPoints,
      tags: ['documentation', 'technical-writing', 'readme', 'api-docs', 'changelog'],
      priority: 'high',
      tools: this.getToolDefinitions().map(tool => tool.name),
      metadata: {
        expertType: 'documentation',
        ragEnabled: this.ragConfig.enabled,
        knowledgeDomains: this.ragConfig.knowledgeDomains
      },
      legacyModel: {
        model: 'mistral:latest',
        temperature: 0.3,
        maxTokens: 6000
      }
    }
  }

  protected getToolDefinitions(): AgentTool[] {
    return [
      this.createReadmeGeneratorTool(),
      this.createAPIDocumentationGeneratorTool(),
      this.createDocstringGeneratorTool(),
      this.createChangelogManagerTool(),
      this.createTechnicalWritingAssistantTool(),
      this.createMarkdownFormatterTool(),
      this.createWikiCreatorTool(),
      this.createDiagramGeneratorTool()
    ]
  }

  // Tool 1: README Generator
  private createReadmeGeneratorTool(): AgentTool {
    return {
      name: 'readme_generator',
      description: 'Generate comprehensive README files for projects',
      parameters: {
        type: 'object',
        properties: {
          projectName: { type: 'string', description: 'Name of the project' },
          projectDescription: { type: 'string', description: 'Brief description of the project' },
          projectPath: { type: 'string', description: 'Path to project for analysis' },
          features: { 
            type: 'array',
            items: { type: 'string' },
            description: 'Key features of the project' 
          },
          technologies: {
            type: 'array',
            items: { type: 'string' },
            description: 'Technologies used'
          },
          targetAudience: { type: 'string', description: 'Target audience (developers, users, etc.)' }
        },
        required: ['projectName', 'projectDescription']
      },
      execute: async (params: any): Promise<ToolExecutionResult> => {
        try {
          const { 
            projectName, 
            projectDescription, 
            projectPath = '.', 
            features = [], 
            technologies = [],
            targetAudience = 'developers' 
          } = params

          const prompt = `Generate a comprehensive README.md for the following project:

Project Name: ${projectName}
Description: ${projectDescription}
Project Path: ${projectPath}
Key Features: ${features.join(', ')}
Technologies: ${technologies.join(', ')}
Target Audience: ${targetAudience}

Create a professional README with:
1. Project title and description
2. Badges (build status, version, license, etc.)
3. Table of contents
4. Features section
5. Prerequisites
6. Installation instructions
7. Usage examples
8. Configuration options
9. API documentation (if applicable)
10. Contributing guidelines
11. Testing instructions
12. Deployment guide
13. Troubleshooting section
14. License information
15. Acknowledgments

Make it comprehensive, well-structured, and engaging.
Include code examples where appropriate.
Use proper Markdown formatting.

Respond in JSON format matching ReadmeStructureSchema.`

          const response = await this.ollamaService.analyze({
            prompt,
            responseFormat: 'json'
          })

          const readme: z.infer<typeof ReadmeStructureSchema> = {
            title: projectName,
            description: response.content.description || projectDescription,
            badges: response.content.badges || [],
            sections: response.content.sections || [],
            installation: response.content.installation || '```bash\nnpm install\n```',
            usager: esponse.content.usage || 'See documentation for usage examples',
            configuration: response.content.configuration,
            contributing: response.content.contributing,
            licenser: esponse.content.license || 'MIT'
          }

          // Convert to markdown
          const markdown = this.convertReadmeToMarkdown(readme)

          return {
            success: true,
            data: {
              structurer: eadme,
              markdown,
              wordCount: markdown.split(/\s+/).length,
              sections: readme.sections.length
            },
            metadata: {
              projectName,
              targetAudience,
              timestamp: new Date().toISOString()
            },
            retries: 0
          }
        } catch (error) {
          return {
            success: false,
            error: `Failed to generate README: ${error instanceof Error ? error.message : String(error)}`,
            retries: 0
          }
        }
      }
    }
  }

  // Tool 2: API Documentation Generator
  private createAPIDocumentationGeneratorTool(): AgentTool {
    return {
      name: 'api_documentation_generator',
      description: 'Generate comprehensive API documentation from code or specifications',
      parameters: {
        type: 'object',
        properties: {
          apiName: { type: 'string', description: 'Name of the API' },
          apiSpec: { type: 'object', description: 'API specification (OpenAPI, code, etc.)' },
          format: {
            type: 'string',
            enum: ['openapi', 'markdown', 'html', 'postman'],
            description: 'Output format'
          },
          includeExamples: { type: 'boolean', description: 'Include request/response examples' },
          language: { type: 'string', description: 'Programming language for examples' }
        },
        required: ['apiName', 'apiSpec']
      },
      execute: async (params: any): Promise<ToolExecutionResult> => {
        try {
          const { 
            apiName, 
            apiSpec, 
            format = 'markdown', 
            includeExamples = true,
            language = 'javascript' 
          } = params

          const prompt = `Generate comprehensive API documentation for ${apiName}:

API Specification: ${JSON.stringify(apiSpec)}
Format: ${format}
Include Examples: ${includeExamples}
Example Language: ${language}

Create documentation including:
1. API Overview and introduction
2. Base URL and versioning
3. Authentication methods and examples
4. Complete endpoint documentation:
   - HTTP method and path
   - Description and purpose
   - Parameters (path, query, header, body)
   - Request body schema and examples
   - Response schemas for all status codes
   - Error responses
   - Rate limiting information
5. Common use cases with examples
6. Error codes and troubleshooting
7. SDKs and client libraries
8. Webhooks (if applicable)
9. Best practices
10. Migration guides

For each endpoint, provide:
- Clear description
- Parameter details with types and constraints
- Multiple examples showing different scenarios
- Common errors and solutions

Respond in JSON format matching APIDocSchema.`

          const response = await this.ollamaService.analyze({
            prompt,
            responseFormat: 'json'
          })

          const apiDoc: z.infer<typeof APIDocSchema> = {
            overview: response.content.overview || `${apiName} API Documentation`,
            baseUrl: response.content.baseUrl || 'https://api.example.com/v1',
            authentication: response.content.authentication || {
              type: 'Bearer Token',
              description: 'Use Authorization header',
              example: 'Authorization: Bearer YOUR_TOKEN'
            },
            endpoints: response.content.endpoints || [],
            errors: response.content.errors || []
          }

          // Convert to requested format
          let output
          switch (format) {
            case 'markdown':
              output = this.convertAPIDocToMarkdown(apiDoc)
              break
            case 'openapi':
              output = this.convertAPIDocToOpenAPI(apiDoc)
              break
            default:
              output = apiDoc
          }

          return {
            success: true,
            data: {
              documentation: apiDoc,
              formatted: output,
              endpointCount: apiDoc.endpoints.length,
              hasAuthentication: true,
              coverage: this.calculateAPICoverage(apiDoc)
            },
            metadata: {
              apiName,
              format,
              timestamp: new Date().toISOString()
            },
            retries: 0
          }
        } catch (error) {
          return {
            success: false,
            error: `Failed to generate API documentation: ${error instanceof Error ? error.message : String(error)}`,
            retries: 0
          }
        }
      }
    }
  }

  // Tool 3: Docstring Generator
  private createDocstringGeneratorTool(): AgentTool {
    return {
      name: 'docstring_generator',
      description: 'Generate comprehensive docstrings for functions, classes, and modules',
      parameters: {
        type: 'object',
        properties: {
          code: { type: 'string', description: 'Code to document' },
          language: { type: 'string', description: 'Programming language' },
          style: { 
            type: 'string',
            enum: ['google', 'numpy', 'sphinx', 'jsdoc', 'tsdoc'],
            description: 'Documentation style' 
          },
          includeExamples: { type: 'boolean', description: 'Include usage examples' },
          includeTypes: { type: 'boolean', description: 'Include type annotations' }
        },
        required: ['code', 'language']
      },
      execute: async (params: any): Promise<ToolExecutionResult> => {
        try {
          const { 
            code, 
            language, 
            style = 'google', 
            includeExamples = true,
            includeTypes = true 
          } = params

          const prompt = `Generate comprehensive docstrings for the following ${language} code:

Code:
\`\`\`${language}
${code}
\`\`\`

Documentation Style: ${style}
Include Examples: ${includeExamples}
Include Types: ${includeTypes}

For each function/class/module, generate:
1. Brief one-line description
2. Detailed description explaining purpose and behavior
3. Parameters with types and descriptions
4. Return values with types and descriptions
5. Exceptions/errors that may be raised
6. Usage examples (if requested)
7. Notes and warnings
8. References to related functions/classes
9. Version/author information where appropriate

Follow the ${style} documentation convention strictly.
Make descriptions clear, concise, and informative.
Include edge cases and important behaviors.

Respond in JSON format with documented code.`

          const response = await this.ollamaService.analyze({
            prompt,
            responseFormat: 'json'
          })

          const documentedElements = response.content.elements || []
          const documentedCode = response.content.documentedCode || code

          return {
            success: true,
            data: {
              documentedCode,
              elements: documentedElements,
              statistics: {
                totalElements: documentedElements.length,
                documentsAdded: documentedElements.filter((e: any) => e.hasDocstring).length,
                linesOfDocs: this.countDocstringLines(documentedCode),
                coverager: esponse.content.coverage || 0
              },
              improvements: response.content.improvements || []
            },
            metadata: {
              language,
              style,
              timestamp: new Date().toISOString()
            },
            retries: 0
          }
        } catch (error) {
          return {
            success: false,
            error: `Failed to generate docstrings: ${error instanceof Error ? error.message : String(error)}`,
            retries: 0
          }
        }
      }
    }
  }

  // Tool 4: Changelog Manager
  private createChangelogManagerTool(): AgentTool {
    return {
      name: 'changelog_manager',
      description: 'Generate and manage changelog entries following keep-a-changelog format',
      parameters: {
        type: 'object',
        properties: {
          commits: { 
            type: 'array',
            items: { type: 'string' },
            description: 'Git commits or changes' 
          },
          version: { type: 'string', description: 'Version number' },
          previousVersion: { type: 'string', description: 'Previous version for comparison' },
          releaseDate: { type: 'string', description: 'Release date' },
          breakingChanges: { type: 'boolean', description: 'Contains breaking changes' }
        },
        required: ['commits', 'version']
      },
      execute: async (params: any): Promise<ToolExecutionResult> => {
        try {
          const { 
            commits = [], 
            version, 
            previousVersion = '',
            releaseDate = new Date().toISOString().split('T')[0],
            breakingChanges = false 
          } = params

          const prompt = `Generate a changelog entry for version ${version}:

Commits/Changes:
${commits.join('\n')}

Previous Version: ${previousVersion}
Release Date: ${releaseDate}
Breaking Changes: ${breakingChanges}

Analyze the commits and categorize them according to keep-a-changelog format:
- Added: New features
- Changed: Changes in existing functionality
- Deprecated: Soon-to-be removed features
- Removed: Now removed features
- Fixed: Bug fixes
- Security: Vulnerability fixes

For each change:
1. Write clear, user-focused descriptions
2. Group related changes
3. Highlight breaking changes prominently
4. Include migration instructions for breaking changes
5. Reference issue numbers where applicable
6. Make it scannable and easy to understand

Follow semantic versioning principles.
Write from the user's perspective.

Respond in JSON format matching ChangelogEntrySchema.`

          const response = await this.ollamaService.analyze({
            prompt,
            responseFormat: 'json'
          })

          const changelog: z.infer<typeof ChangelogEntrySchema> = {
            version,
            dater: eleaseDate,
            changes: {
              added: response.content.added || [],
              changed: response.content.changed || [],
              deprecated: response.content.deprecated || [],
              removed: response.content.removed || [],
              fixed: response.content.fixed || [],
              security: response.content.security || []
            },
            breaking: breakingChanges,
            migration: response.content.migration
          }

          // Generate markdown format
          const markdown = this.convertChangelogToMarkdown(changelog)

          return {
            success: true,
            data: {
              entry: changelog,
              markdown,
              changeCount: Object.values(changelog.changes).flat().length,
              categories: Object.keys(changelog.changes).filter(
                key => changelog.changes[key as keyof typeof changelog.changes].length > 0
              )
            },
            metadata: {
              version,
              releaseDate,
              breaking: breakingChanges,
              timestamp: new Date().toISOString()
            },
            retries: 0
          }
        } catch (error) {
          return {
            success: false,
            error: `Failed to manage changelog: ${error instanceof Error ? error.message : String(error)}`,
            retries: 0
          }
        }
      }
    }
  }

  // Tool 5: Technical Writing Assistant
  private createTechnicalWritingAssistantTool(): AgentTool {
    return {
      name: 'technical_writing_assistant',
      description: 'Improve technical documentation clarity, consistency, and effectiveness',
      parameters: {
        type: 'object',
        properties: {
          content: { type: 'string', description: 'Content to improve' },
          documentType: { 
            type: 'string',
            enum: ['tutorial', 'guide', 'reference', 'api', 'readme'],
            description: 'Type of documentation' 
          },
          targetAudience: { type: 'string', description: 'Target audience' },
          tone: {
            type: 'string',
            enum: ['formal', 'conversational', 'technical', 'beginner-friendly'],
            description: 'Desired tone'
          },
          improvements: {
            type: 'array',
            items: { type: 'string' },
            description: 'Specific improvements to focus on'
          }
        },
        required: ['content', 'documentType']
      },
      execute: async (params: any): Promise<ToolExecutionResult> => {
        try {
          const { 
            content, 
            documentType, 
            targetAudience = 'developers',
            tone = 'technical',
            improvements = ['clarity', 'structure', 'completeness'] 
          } = params

          const prompt = `Improve the following ${documentType} documentation:

Original Content:
${content}

Document Type: ${documentType}
Target Audience: ${targetAudience}
Desired Tone: ${tone}
Focus Areas: ${improvements.join(', ')}

Improve the documentation by:
1. Enhancing clarity and readability
2. Improving structure and organization
3. Ensuring completeness and accuracy
4. Maintaining consistent tone and style
5. Adding missing information
6. Removing redundancy
7. Improving examples and explanations
8. Fixing grammar and spelling
9. Ensuring technical accuracy
10. Making it more engaging

Specific improvements:
- Use active voice
- Write clear, concise sentences
- Define technical terms on first use
- Use consistent terminology
- Add helpful examples
- Include visual cues (bold, italics, lists)
- Improve transitions between sections
- Ensure logical flow

Respond in JSON format with improved content and analysis.`

          const response = await this.ollamaService.analyze({
            prompt,
            responseFormat: 'json'
          })

          const improved = response.content.improvedContent || content
          const analysis = response.content.analysis || {}
          const suggestions = response.content.suggestions || []

          return {
            success: true,
            data: {
              original: content,
              improved,
              analysis: {
                readabilityScore: analysis.readabilityScore || 0,
                clarityScore: analysis.clarityScore || 0,
                completenessScore: analysis.completenessScore || 0,
                technicalAccuracy: analysis.technicalAccuracy || 0
              },
              changes: response.content.changes || [],
              suggestions,
              metrics: {
                originalWordCount: content.split(/\s+/).length,
                improvedWordCount: improved.split(/\s+/).length,
                sentenceCount: improved.split(/[.!?]+/).length,
                averageWordsPerSentence: improved.split(/\s+/).length / improved.split(/[.!?]+/).length
              }
            },
            metadata: {
              documentType,
              targetAudience,
              tone,
              timestamp: new Date().toISOString()
            },
            retries: 0
          }
        } catch (error) {
          return {
            success: false,
            error: `Failed to improve documentation: ${error instanceof Error ? error.message : String(error)}`,
            retries: 0
          }
        }
      }
    }
  }

  // Tool 6: Markdown Formatter
  private createMarkdownFormatterTool(): AgentTool {
    return {
      name: 'markdown_formatter',
      description: 'Format and validate markdown documents with consistent styling',
      parameters: {
        type: 'object',
        properties: {
          markdown: { type: 'string', description: 'Markdown content to format' },
          style: {
            type: 'object',
            properties: {
              headingStyle: { type: 'string', enum: ['atx', 'setext'] },
              listStyle: { type: 'string', enum: ['dash', 'asterisk', 'plus'] },
              codeBlockStyle: { type: 'string', enum: ['fenced', 'indented'] },
              lineLength: { type: 'number' }
            },
            description: 'Formatting preferences'
          },
          validateLinks: { type: 'boolean', description: 'Validate markdown links' },
          addToc: { type: 'boolean', description: 'Add table of contents' }
        },
        required: ['markdown']
      },
      execute: async (params: any): Promise<ToolExecutionResult> => {
        try {
          const { 
            markdown, 
            style = {},
            validateLinks = true,
            addToc = false 
          } = params

          const prompt = `Format and improve the following markdown document:

Markdown:
${markdown}

Style Preferences: ${JSON.stringify(style)}
Validate Links: ${validateLinks}
Add TOC: ${addToc}

Tasks:
1. Apply consistent heading styles
2. Format lists consistently
3. Ensure proper spacing between sections
4. Format code blocks properly
5. Fix broken markdown syntax
6. Add or improve alt text for images
7. Ensure consistent link formatting
8. Add table of contents if requested
9. Validate and fix internal links
10. Improve table formatting

Additional improvements:
- Add missing line breaks
- Fix nested list indentation
- Ensure code blocks have language specifiers
- Convert inline HTML to markdown where possible
- Add horizontal rules between major sections
- Ensure front matter is properly formatted

Respond in JSON format with formatted markdown and issues found.`

          const response = await this.ollamaService.analyze({
            prompt,
            responseFormat: 'json'
          })

          const formatted = response.content.formattedMarkdown || markdown
          const issues = response.content.issues || []
          const toc = response.content.tableOfContents || ''

          return {
            success: true,
            data: {
              original: markdown,
              formatted,
              tableOfContents: toc,
              issues,
              improvements: response.content.improvements || [],
              statistics: {
                headingCount: (formatted.match(/^#+\s/gm) || []).length,
                linkCount: (formatted.match(/\[([^\]]+)\]\(([^)]+)\)/g) || []).length,
                codeBlockCount: (formatted.match(/```/g) || []).length / 2,
                imageCount: (formatted.match(/!\[([^\]]*)\]\(([^)]+)\)/g) || []).length
              }
            },
            metadata: {
              style,
              validateLinks,
              addToc,
              timestamp: new Date().toISOString()
            },
            retries: 0
          }
        } catch (error) {
          return {
            success: false,
            error: `Failed to format markdown: ${error instanceof Error ? error.message : String(error)}`,
            retries: 0
          }
        }
      }
    }
  }

  // Tool 7: Wiki Creator
  private createWikiCreatorTool(): AgentTool {
    return {
      name: 'wiki_creator',
      description: 'Create comprehensive wiki documentation for projects',
      parameters: {
        type: 'object',
        properties: {
          projectName: { type: 'string', description: 'Project name' },
          topics: { 
            type: 'array',
            items: { type: 'string' },
            description: 'Wiki topics to cover' 
          },
          structure: {
            type: 'string',
            enum: ['hierarchical', 'flat', 'category-based'],
            description: 'Wiki structure'
          },
          format: {
            type: 'string',
            enum: ['markdown', 'mediawiki', 'confluence'],
            description: 'Wiki format'
          },
          includeSearch: { type: 'boolean', description: 'Include search functionality' }
        },
        required: ['projectName', 'topics']
      },
      execute: async (params: any): Promise<ToolExecutionResult> => {
        try {
          const { 
            projectName, 
            topics = [], 
            structure = 'hierarchical',
            format = 'markdown',
            includeSearch = true 
          } = params

          const prompt = `Create a comprehensive wiki structure for ${projectName}:

Topics to Cover: ${topics.join(', ')}
Structure: ${structure}
Format: ${format}
Include Search: ${includeSearch}

Create a wiki with:
1. Home page with project overview
2. Getting Started guide
3. Installation and setup
4. Core concepts explanation
5. Feature documentation
6. API reference (if applicable)
7. Configuration guide
8. Troubleshooting section
9. FAQ page
10. Contributing guidelines
11. Architecture documentation
12. Best practices
13. Examples and tutorials
14. Glossary of terms
15. Version history

For each page:
- Clear navigation structure
- Cross-references to related pages
- Search-friendly content
- Consistent formatting
- Code examples where relevant
- Visual aids descriptions
- External resource links

Organize content logically based on ${structure} structure.

Respond in JSON format with wiki structure and content.`

          const response = await this.ollamaService.analyze({
            prompt,
            responseFormat: 'json'
          })

          const wikiStructure = {
            homePager: esponse.content.homePage || {},
            pages: response.content.pages || [],
            navigation: response.content.navigation || {},
            categories: response.content.categories || [],
            searchIndex: includeSearch ? response.content.searchIndex || [] : []
          }

          return {
            success: true,
            data: {
              structure: wikiStructure,
              pageCount: wikiStructure.pages.length,
              format,
              navigation: wikiStructure.navigation,
              content: this.formatWikiContent(wikiStructure, format)
            },
            metadata: {
              projectName,
              structure,
              format,
              timestamp: new Date().toISOString()
            },
            retries: 0
          }
        } catch (error) {
          return {
            success: false,
            error: `Failed to create wiki: ${error instanceof Error ? error.message : String(error)}`,
            retries: 0
          }
        }
      }
    }
  }

  // Tool 8: Diagram Generator
  private createDiagramGeneratorTool(): AgentTool {
    return {
      name: 'diagram_generator',
      description: 'Generate technical diagrams using Mermaid syntax',
      parameters: {
        type: 'object',
        properties: {
          diagramType: { 
            type: 'string',
            enum: ['flowchart', 'sequence', 'class', 'state', 'entity-relationship', 'gantt', 'pie'],
            description: 'Type of diagram' 
          },
          title: { type: 'string', description: 'Diagram title' },
          description: { type: 'string', description: 'What to diagram' },
          elements: {
            type: 'array',
            items: { type: 'object' },
            description: 'Elements to include in diagram'
          },
          style: {
            type: 'string',
            enum: ['default', 'dark', 'forest', 'neutral'],
            description: 'Diagram theme'
          }
        },
        required: ['diagramType', 'description']
      },
      execute: async (params: any): Promise<ToolExecutionResult> => {
        try {
          const { 
            diagramType, 
            title = 'Diagram',
            description,
            elements = [],
            style = 'default' 
          } = params

          const prompt = `Generate a ${diagramType} diagram using Mermaid syntax:

Title: ${title}
Description: ${description}
Elements: ${JSON.stringify(elements)}
Style: ${style}

Create a comprehensive diagram that:
1. Clearly represents the described system/process
2. Uses appropriate Mermaid syntax for ${diagramType}
3. Includes all relevant elements and relationships
4. Has clear labels and descriptions
5. Follows logical flow and organization
6. Uses proper styling and formatting
7. Includes legends or notes where helpful
8. Shows all important connections
9. Groups related elements
10. Maintains visual clarity

For ${diagramType} diagrams specifically:
${this.getDiagramSpecificGuidelines(diagramType)}

Generate both:
- Mermaid code for the diagram
- Structured data describing elements and relationships
- Description of what the diagram shows

Respond in JSON format matching DiagramSchema.`

          const response = await this.ollamaService.analyze({
            prompt,
            responseFormat: 'json'
          })

          const diagram: z.infer<typeof DiagramSchema> = {
            type: diagramType as any,
            title,
            description: response.content.description || description,
            mermaidCoder: esponse.content.mermaidCode || '',
            elements: response.content.elements || [],
            relationships: response.content.relationships || []
          }

          return {
            success: true,
            data: {
              diagram,
              mermaidCode: diagram.mermaidCode,
              preview: `\`\`\`mermaid\n${diagram.mermaidCode}\n\`\`\``,
              elementCount: diagram.elements.length,
              relationshipCount: diagram.relationships.length
            },
            metadata: {
              diagramType,
              style,
              timestamp: new Date().toISOString()
            },
            retries: 0
          }
        } catch (error) {
          return {
            success: false,
            error: `Failed to generate diagram: ${error instanceof Error ? error.message : String(error)}`,
            retries: 0
          }
        }
      }
    }
  }

  // Helper methods
  private convertReadmeToMarkdown(readme: z.infer<typeof ReadmeStructureSchema>): string {
    let markdown = `# ${readme.title}\n\n${readme.description}\n\n`
    
    // Add badges
    if (readme.badges.length > 0) {
      readme.badges.forEach(badge => {
        markdown += `![${badge.altText}](${badge.url}) `
      })
      markdown += '\n\n'
    }

    // Add sections
    readme.sections.forEach(section => {
      markdown += `## ${section.heading}\n\n${section.content}\n\n`
      if (section.subsections) {
        section.subsections.forEach(sub => {
          markdown += `### ${sub.heading}\n\n${sub.content}\n\n`
        })
      }
    })

    // Add standard sections
    markdown += `## Installation\n\n${readme.installation}\n\n`
    markdown += `## Usage\n\n${readme.usage}\n\n`
    
    if (readme.configuration) {
      markdown += `## Configuration\n\n${readme.configuration}\n\n`
    }
    
    if (readme.contributing) {
      markdown += `## Contributing\n\n${readme.contributing}\n\n`
    }
    
    markdown += `## License\n\n${readme.license}\n`

    return markdown
  }

  private convertAPIDocToMarkdown(apiDoc: z.infer<typeof APIDocSchema>): string {
    let markdown = `# ${apiDoc.overview}\n\n`
    markdown += `**Base URL:** ${apiDoc.baseUrl}\n\n`
    
    // Authentication
    markdown += `## Authentication\n\n`
    markdown += `**Type:** ${apiDoc.authentication.type}\n\n`
    markdown += `${apiDoc.authentication.description}\n\n`
    markdown += `\`\`\`\n${apiDoc.authentication.example}\n\`\`\`\n\n`
    
    // Endpoints
    markdown += `## Endpoints\n\n`
    apiDoc.endpoints.forEach(endpoint => {
      markdown += `### ${endpoint.method} ${endpoint.path}\n\n`
      markdown += `${endpoint.description}\n\n`
      
      if (endpoint.parameters.length > 0) {
        markdown += `**Parameters:**\n\n`
        markdown += `| Name | Type | Required | Description |\n`
        markdown += `|------|------|----------|-------------|\n`
        endpoint.parameters.forEach(param => {
          markdown += `| ${param.name} | ${param.type} | ${param.required ? 'Yes' : 'No'} | ${param.description} |\n`
        })
        markdown += '\n'
      }
      
      // Add more endpoint details...
    })
    
    return markdown
  }

  private convertAPIDocToOpenAPI(apiDoc: z.infer<typeof APIDocSchema>): object {
    // Convert to OpenAPI 3.0 format
    return {
      openapi: '3.0.0',
      info: {
        title: apiDoc.overview,
        version: '1.0.0'
      },
      servers: [{ url: apiDoc.baseUrl }],
      // ... more OpenAPI conversion
    }
  }

  private convertChangelogToMarkdown(changelog: z.infer<typeof ChangelogEntrySchema>): string {
    let markdown = `## [${changelog.version}] - ${changelog.date}\n\n`
    
    if (changelog.breaking) {
      markdown += `### ⚠️ BREAKING CHANGES\n\n`
      if (changelog.migration) {
        markdown += `${changelog.migration}\n\n`
      }
    }
    
    const sections = [
      { key: 'added', title: '### Added' },
      { key: 'changed', title: '### Changed' },
      { key: 'deprecated', title: '### Deprecated' },
      { key: 'removed', title: '### Removed' },
      { key: 'fixed', title: '### Fixed' },
      { key: 'security', title: '### Security' }
    ]
    
    sections.forEach(section => {
      const items = changelog.changes[section.key as keyof typeof changelog.changes]
      if (items.length > 0) {
        markdown += `${section.title}\n\n`
        items.forEach(item => {
          markdown += `- ${item}\n`
        })
        markdown += '\n'
      }
    })
    
    return markdown
  }

  private calculateAPICoverage(apiDoc: z.infer<typeof APIDocSchema>): number {
    let score = 0
    let total = 0
    
    // Check various aspects of documentation completeness
    apiDoc.endpoints.forEach(endpoint => {
      total += 5 // 5 points per endpoint
      if (endpoint.description) score += 1
      if (endpoint.parameters.length > 0) score += 1
      if (endpoint.responses.length > 0) score += 1
      if (endpoint.examples.length > 0) score += 2
    })
    
    return total > 0 ? (score / total) * 100 : 0
  }

  private countDocstringLines(code: string): number {
    const docstringMatches = code.match(/"""[\s\S]*?"""|'''[\s\S]*?'''|\/\*\*[\s\S]*?\*\/|\/\/\/.*$/gm)
    if (!docstringMatches) return 0
    
    return docstringMatches.reduce((count, match) => {
      return count + match.split('\n').length
    }, 0)
  }

  private formatWikiContent(structure: any, format: string): string {
    // Format wiki content based on the specified format
    switch (format) {
      case 'markdown':
        return this.formatWikiAsMarkdown(structure)
      case 'mediawiki':
        return this.formatWikiAsMediaWiki(structure)
      case 'confluence':
        return this.formatWikiAsConfluence(structure)
      default:
        return JSON.stringify(structure, null, 2)
    }
  }

  private formatWikiAsMarkdown(structure: any): string {
    // Convert wiki structure to markdown format
    let content = `# ${structure.homePage.title || 'Home'}\n\n`
    content += `${structure.homePage.content || ''}\n\n`
    
    // Add navigation
    content += `## Navigation\n\n`
    structure.pages.forEach((page: any) => {
      content += `- [${page.title}](${page.path})\n`
    })
    
    return content
  }

  private formatWikiAsMediaWiki(structure: any): string {
    // Convert to MediaWiki format
    return `{{${structure.homePage.title}}}\n\n${structure.homePage.content}`
  }

  private formatWikiAsConfluence(structure: any): string {
    // Convert to Confluence format
    return `h1. ${structure.homePage.title}\n\n${structure.homePage.content}`
  }

  private getDiagramSpecificGuidelines(diagramType: string): string {
    const guidelines: Record<string, string> = {
      flowchart: 'Use clear start/end nodes, decision diamonds, and process rectangles. Show flow direction clearly.',
      sequence: 'Show actors, messages, activations, and return messages. Include loops and conditionals where needed.',
      class: 'Include class names, attributes, methods, and relationships (inheritance, composition, aggregation).',
      state: 'Show states, transitions, initial/final states, and transition conditions.',
      'entity-relationship': 'Include entities, attributes, relationships, and cardinality.',
      gantt: 'Show tasks, durations, dependencies, and milestones.',
      pie: 'Include data labels, percentages, and legend.'
    }
    
    return guidelines[diagramType] || 'Follow standard diagramming best practices.'
  }

  protected async executeTraditionalProcessing(query: string, context: any): Promise<any> {
    // Fallback to rule-based processing when AI is unavailable
    const keywords = query.toLowerCase()
    
    if (keywords.includes('readme')) {
      return {
        response: 'README best practices: Include project description, installation, usage, contributing guidelines, and license.',
        method: 'traditional',
        context
      }
    } else if (keywords.includes('api')) {
      return {
        response: 'API documentation should include endpoints, parameters, responses, authentication, and examples.',
        method: 'traditional',
        context
      }
    } else if (keywords.includes('changelog')) {
      return {
        response: 'Changelog format: Added, Changed, Deprecated, Removed, Fixed, Security sections following semantic versioning.',
        method: 'traditional',
        context
      }
    } else if (keywords.includes('diagram')) {
      return {
        response: 'Diagrams can be created using Mermaid syntax for flowcharts, sequence diagrams, class diagrams, and more.',
        method: 'traditional',
        context
      }
    }

    return {
      response: `Creating documentation for: ${query}`,
      method: 'traditional',
      context
    }
  }
}
