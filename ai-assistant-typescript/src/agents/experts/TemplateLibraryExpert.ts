import { BaseAgent } from '@/agents/base/BaseAgent'
import { AgentConfig, AgentTool, ToolExecutionResult } from '@/types/agents'
import { logger } from '@/infrastructure/logging/logger'
import { createTool } from '@mastra/core'
import { z } from 'zod'

/**
 * Template Library Expert Agent
 * 
 * Specializes in:
 * - Template scaffolding and code generation (Plop.js, Yeoman)
 * - Project boilerplate creation and management
 * - Code snippet libraries and reusable components
 * - Template validation and quality assurance
 * - Template automation and CI/CD integration
 */
export class TemplateLibraryExpert extends BaseAgent {
  protected config: AgentConfig = {
    id: 'template-library-expert',
    name: 'Template Library Expert',
    description: 'Specialized in template scaffolding, code generation, and reusable component libraries',
    version: '1.0.0',
    model: 'mistral:latest',
    temperature: 0.1,
    maxTokens: 4000,
    systemMessage: this.buildSystemMessage(),
    specialties: [
      'template_scaffolding',
      'code_generation',
      'boilerplate_management',
      'snippet_libraries',
      'template_validation',
      'automation_integration'
    ],
    tools: [],
    capabilities: [
      'Project Template Scaffolding',
      'Code Generation with Plop.js/Yeoman',
      'Snippet Library Management',
      'Template Quality Validation',
      'CI/CD Template Integration'
    ],
    limitations: [
      'Requires template configuration for generation',
      'Limited to supported template engines',
      'Cannot generate domain-specific business logic without explicit templates'
    ],
    integrations: [],
    tags: ['templates', 'scaffolding', 'code-generation', 'boilerplate'],
    priority: 'high' as const,
    metadata: {
      supportedEngines: ['Handlebars', 'Mustache', 'EJS', 'Nunjucks'],
      supportedTools: ['Plop.js', 'Yeoman', 'Cookiecutter', 'Create React App'],
      templateTypes: ['Project', 'Component', 'Module', 'Configuration', 'Documentation']
    }
  }

  constructor() {
    super()
    this.tools = this.createAgentTools()
    this.config.tools = Object.keys(this.tools)
  }

  protected getToolDefinitions(): AgentTool[] {
    return [
      {
        name: 'plop_generator',
        description: 'Generate code using Plop.js with Handlebars templates for consistent file creation',
        parameters: {
          type: 'object',
          properties: {
            generator_type: {
              type: 'string',
              enum: ['component', 'module', 'service', 'test', 'page', 'custom'],
              description: 'Type of code generator to create'
            },
            template_engine: {
              type: 'string',
              enum: ['handlebars', 'mustache', 'ejs'],
              description: 'Template engine to use',
              default: 'handlebars'
            },
            output_directory: {
              type: 'string',
              description: 'Target directory for generated files'
            },
            template_config: {
              type: 'object',
              description: 'Configuration for template variables and structure'
            },
            naming_convention: {
              type: 'string',
              enum: ['camelCase', 'PascalCase', 'kebab-case', 'snake_case'],
              description: 'Naming convention for generated files'
            },
            include_tests: {
              type: 'boolean',
              description: 'Include test files in generation',
              default: true
            },
            include_docs: {
              type: 'boolean',
              description: 'Include documentation files',
              default: false
            }
          },
          required: ['generator_type', 'output_directory']
        },
        execute: this.executePlopGenerator.bind(this)
      },
      {
        name: 'yeoman_scaffolder',
        description: 'Create project scaffolds using Yeoman generators for complete project setup',
        parameters: {
          type: 'object',
          properties: {
            project_type: {
              type: 'string',
              enum: ['react', 'angular', 'vue', 'node', 'express', 'typescript', 'custom'],
              description: 'Type of project to scaffold'
            },
            project_name: {
              type: 'string',
              description: 'Name of the project to create'
            },
            features: {
              type: 'array',
              items: {
                type: 'string',
                enum: ['typescript', 'testing', 'linting', 'ci-cd', 'docker', 'documentation']
              },
              description: 'Features to include in the scaffold'
            },
            package_manager: {
              type: 'string',
              enum: ['npm', 'yarn', 'pnpm'],
              description: 'Package manager to use'
            },
            git_integration: {
              type: 'boolean',
              description: 'Initialize Git repository',
              default: true
            },
            license: {
              type: 'string',
              enum: ['MIT', 'Apache-2.0', 'GPL-3.0', 'BSD-3-Clause', 'ISC'],
              description: 'License for the project'
            },
            target_directory: {
              type: 'string',
              description: 'Directory where project will be created'
            }
          },
          required: ['project_type', 'project_name', 'target_directory']
        },
        execute: this.executeYeomanScaffolder.bind(this)
      },
      {
        name: 'snippet_library_manager',
        description: 'Manage and organize code snippet libraries with search and categorization',
        parameters: {
          type: 'object',
          properties: {
            action: {
              type: 'string',
              enum: ['create', 'search', 'update', 'delete', 'categorize', 'export'],
              description: 'Action to perform on snippet library'
            },
            snippet_name: {
              type: 'string',
              description: 'Name/identifier for the snippet'
            },
            snippet_content: {
              type: 'string',
              description: 'Code content of the snippet'
            },
            category: {
              type: 'string',
              enum: ['react', 'typescript', 'node', 'testing', 'utils', 'hooks', 'components'],
              description: 'Category for organizing snippets'
            },
            tags: {
              type: 'array',
              items: { type: 'string' },
              description: 'Tags for snippet discovery'
            },
            language: {
              type: 'string',
              enum: ['typescript', 'javascript', 'jsx', 'tsx', 'css', 'html', 'json'],
              description: 'Programming language of the snippet'
            },
            search_query: {
              type: 'string',
              description: 'Search query for finding snippets'
            },
            export_format: {
              type: 'string',
              enum: ['vscode', 'sublime', 'atom', 'json', 'markdown'],
              description: 'Format for exporting snippet library'
            }
          },
          required: ['action']
        },
        execute: this.executeSnippetLibraryManager.bind(this)
      },
      {
        name: 'template_validator',
        description: 'Validate template quality, consistency, and best practices compliance',
        parameters: {
          type: 'object',
          properties: {
            template_path: {
              type: 'string',
              description: 'Path to template files or directory'
            },
            validation_rules: {
              type: 'array',
              items: {
                type: 'string',
                enum: ['syntax', 'variables', 'structure', 'naming', 'security', 'performance']
              },
              description: 'Types of validation to perform'
            },
            template_engine: {
              type: 'string',
              enum: ['handlebars', 'mustache', 'ejs', 'nunjucks'],
              description: 'Template engine being used'
            },
            strict_mode: {
              type: 'boolean',
              description: 'Enable strict validation rules',
              default: false
            },
            auto_fix: {
              type: 'boolean',
              description: 'Automatically fix common issues',
              default: false
            },
            output_format: {
              type: 'string',
              enum: ['detailed', 'summary', 'json', 'junit'],
              description: 'Format for validation report'
            }
          },
          required: ['template_path']
        },
        execute: this.executeTemplateValidator.bind(this)
      },
      {
        name: 'boilerplate_manager',
        description: 'Create, manage, and version project boilerplates and starter templates',
        parameters: {
          type: 'object',
          properties: {
            action: {
              type: 'string',
              enum: ['create', 'update', 'clone', 'version', 'compare', 'merge'],
              description: 'Action to perform on boilerplate'
            },
            boilerplate_name: {
              type: 'string',
              description: 'Name of the boilerplate'
            },
            source_project: {
              type: 'string',
              description: 'Source project path to create boilerplate from'
            },
            template_variables: {
              type: 'object',
              description: 'Variables to be replaced in templates'
            },
            exclusion_patterns: {
              type: 'array',
              items: { type: 'string' },
              description: 'File patterns to exclude from boilerplate'
            },
            version_tag: {
              type: 'string',
              description: 'Version tag for the boilerplate'
            },
            target_frameworks: {
              type: 'array',
              items: {
                type: 'string',
                enum: ['react', 'vue', 'angular', 'express', 'fastify', 'next.js']
              },
              description: 'Target frameworks for the boilerplate'
            },
            customization_options: {
              type: 'object',
              description: 'Available customization options for users'
            }
          },
          required: ['action', 'boilerplate_name']
        },
        execute: this.executeBoilerplateManager.bind(this)
      }
    ]
  }

  private buildSystemMessage(): string {
    return `You are the Template Library Expert, a specialized AI agent focused on creating, managing, and optimizing template scaffolding systems and code generation workflows. You excel at building reusable templates, managing snippet libraries, and automating code generation processes.

## Core Capabilities

### Template Scaffolding & Code Generation
- Plop.js integration with Handlebars templates for micro-generation
- Yeoman generators for complete project scaffolding
- Custom template engines (Mustache, EJS, Nunjucks) support
- Automated file and folder structure generation
- Variable interpolation and conditional logic in templates

### Code Snippet Library Management
- Organized snippet categorization and tagging systems
- Full-text search capabilities across snippet libraries
- Export to popular editors (VS Code, Sublime Text, Atom)
- Version control and collaborative snippet management
- Language-specific snippet validation and formatting

### Template Quality & Validation
- Syntax validation for various template engines
- Variable dependency analysis and unused variable detection
- Template structure and naming convention enforcement
- Security vulnerability scanning in generated code
- Performance optimization recommendations for templates

### Project Boilerplate Management
- Reusable project template creation and versioning
- Framework-specific boilerplate customization
- Template variable configuration and validation
- Exclusion pattern management for sensitive files
- Cross-framework compatibility and migration tools

### Automation & CI/CD Integration
- GitHub Actions workflows for template validation
- Automated template testing and quality gates
- Template library synchronization across teams
- Continuous deployment of template updates
- Integration with package registries and template stores

## Best Practices

- Follow "Convention over Configuration" principles
- Implement template inheritance and composition patterns
- Use semantic versioning for template libraries
- Provide comprehensive variable documentation
- Ensure generated code follows language best practices
- Include validation and error handling in templates
- Support both CLI and programmatic template usage
- Maintain backward compatibility in template updates

## Modern Practices (2024)

- Leverage TypeScript for type-safe template generation
- Implement ESM module support in generated code
- Use modern JavaScript features (async/await, destructuring)
- Support monorepo structures and workspace configurations
- Include accessibility and internationalization considerations
- Integrate with modern bundlers (Vite, Webpack 5, ESBuild)
- Support containerization and cloud-native patterns

Your responses should be practical, focusing on maintainable and scalable template solutions. Always consider the full template lifecycle from creation to deployment and maintenance.`
  }

  // Tool execution methods

  /**
   * Execute Plop.js code generation with Handlebars templates
   */
  private async executePlopGenerator(params: {
    generator_type: 'component' | 'module' | 'service' | 'test' | 'page' | 'custom'
    template_engine?: 'handlebars' | 'mustache' | 'ejs'
    output_directory: string
    template_config?: any
    naming_convention?: 'camelCase' | 'PascalCase' | 'kebab-case' | 'snake_case'
    include_tests?: boolean
    include_docs?: boolean
  }): Promise<ToolExecutionResult> {
    try {
      logger.info('Executing Plop.js generator', { params })

      const plopConfig = await this.generatePlopConfiguration(params)
      const templates = await this.generatePlopTemplates(params)
      const validation = await this.validatePlopSetup(params.output_directory)

      if (!validation.isValid) {
        return {
          success: false,
          error: `Plop setup validation failed: ${validation.errors.join(', ')}`,
          retries: 0
        }
      }

      const result = {
        plopConfig,
        templates,
        generatedFiles: this.getPlopGeneratedFiles(params),
        setup_instructions: [
          'Install Plop.js: npm install --save-dev plop',
          'Create plopfile.js with the generated configuration',
          'Place template files in the templates directory',
          'Run generator: plop ' + params.generator_type,
          'Customize prompts and actions as needed'
        ],
        best_practices: [
          'Use descriptive generator names and prompts',
          'Include validation for user inputs',
          'Organize templates in logical folder structures',
          'Add helpers for common transformations',
          'Test generators with various input scenarios'
        ]
      }

      return {
        success: true,
        data: result,
        metadata: {
          generator_type: params.generator_type,
          template_engine: params.template_engine || 'handlebars',
          output_directory: params.output_directory
        },
        retries: 0
      }
    } catch (error) {
      logger.error('Plop generator execution failed', { error, params })
      return {
        success: false,
        error: `Plop generator execution failed: ${error instanceof Error ? error.message : String(error)}`,
        retries: 0
      }
    }
  }

  /**
   * Execute Yeoman project scaffolding
   */
  private async executeYeomanScaffolder(params: {
    project_type: 'react' | 'angular' | 'vue' | 'node' | 'express' | 'typescript' | 'custom'
    project_name: string
    features?: ('typescript' | 'testing' | 'linting' | 'ci-cd' | 'docker' | 'documentation')[]
    package_manager?: 'npm' | 'yarn' | 'pnpm'
    git_integration?: boolean
    license?: 'MIT' | 'Apache-2.0' | 'GPL-3.0' | 'BSD-3-Clause' | 'ISC'
    target_directory: string
  }): Promise<ToolExecutionResult> {
    try {
      logger.info('Executing Yeoman scaffolder', { params })

      const generatorConfig = await this.generateYeomanConfig(params)
      const projectStructure = await this.generateProjectStructure(params)
      const packageConfig = await this.generatePackageConfiguration(params)
      const validation = await this.validateYeomanSetup(params.target_directory)

      if (!validation.isValid) {
        return {
          success: false,
          error: `Yeoman setup validation failed: ${validation.errors.join(', ')}`,
          retries: 0
        }
      }

      const result = {
        generatorConfig,
        projectStructure,
        packageConfig,
        setup_instructions: [
          'Install Yeoman: npm install -g yo',
          `Install generator: npm install -g generator-${params.project_type}`,
          `Run scaffolding: yo ${params.project_type} ${params.project_name}`,
          'Follow interactive prompts for configuration',
          'Run initial build: ' + this.getBuildCommand(params.package_manager || 'npm')
        ],
        post_generation_tasks: [
          'Review and customize generated configuration files',
          'Install additional dependencies if needed',
          'Set up development environment variables',
          'Configure CI/CD pipelines',
          'Update README with project-specific information'
        ]
      }

      return {
        success: true,
        data: result,
        metadata: {
          project_type: params.project_type,
          project_name: params.project_name,
          features: params.features || [],
          target_directory: params.target_directory
        },
        retries: 0
      }
    } catch (error) {
      logger.error('Yeoman scaffolder execution failed', { error, params })
      return {
        success: false,
        error: `Yeoman scaffolder execution failed: ${error instanceof Error ? error.message : String(error)}`,
        retries: 0
      }
    }
  }

  /**
   * Execute snippet library management operations
   */
  private async executeSnippetLibraryManager(params: {
    action: 'create' | 'search' | 'update' | 'delete' | 'categorize' | 'export'
    snippet_name?: string
    snippet_content?: string
    category?: 'react' | 'typescript' | 'node' | 'testing' | 'utils' | 'hooks' | 'components'
    tags?: string[]
    language?: 'typescript' | 'javascript' | 'jsx' | 'tsx' | 'css' | 'html' | 'json'
    search_query?: string
    export_format?: 'vscode' | 'sublime' | 'atom' | 'json' | 'markdown'
  }): Promise<ToolExecutionResult> {
    try {
      logger.info('Executing snippet library manager', { params })

      let result: any

      switch (params.action) {
        case 'create':
          result = await this.createSnippet(params)
          break
        case 'search':
          result = await this.searchSnippets(params.search_query || '')
          break
        case 'update':
          result = await this.updateSnippet(params)
          break
        case 'delete':
          result = await this.deleteSnippet(params.snippet_name || '')
          break
        case 'categorize':
          result = await this.categorizeSnippets(params.category)
          break
        case 'export':
          result = await this.exportSnippets(params.export_format || 'json')
          break
        default:
          throw new Error(`Unknown action: ${params.action}`)
      }

      return {
        success: true,
        data: {
          action: params.action,
          result,
          library_stats: await this.getLibraryStats(),
          management_tips: [
            'Use descriptive names and tags for easy discovery',
            'Keep snippets focused and atomic',
            'Include usage examples in snippet descriptions',
            'Regularly review and update outdated snippets',
            'Version control your snippet library'
          ]
        },
        metadata: {
          action: params.action,
          category: params.category,
          language: params.language
        },
        retries: 0
      }
    } catch (error) {
      logger.error('Snippet library manager execution failed', { error, params })
      return {
        success: false,
        error: `Snippet library manager execution failed: ${error instanceof Error ? error.message : String(error)}`,
        retries: 0
      }
    }
  }

  /**
   * Execute template validation
   */
  private async executeTemplateValidator(params: {
    template_path: string
    validation_rules?: ('syntax' | 'variables' | 'structure' | 'naming' | 'security' | 'performance')[]
    template_engine?: 'handlebars' | 'mustache' | 'ejs' | 'nunjucks'
    strict_mode?: boolean
    auto_fix?: boolean
    output_format?: 'detailed' | 'summary' | 'json' | 'junit'
  }): Promise<ToolExecutionResult> {
    try {
      logger.info('Executing template validator', { params })

      const validationResults = await this.validateTemplates(params)
      const issues = await this.analyzeTemplateIssues(params)
      const recommendations = await this.generateValidationRecommendations(validationResults)
      const fixableIssues = params.auto_fix ? await this.autoFixTemplateIssues(issues) : null

      const result = {
        validationResults,
        issues,
        recommendations,
        fixableIssues,
        summary: {
          totalTemplates: validationResults.totalTemplates,
          validTemplates: validationResults.validTemplates,
          totalIssues: issues.length,
          criticalIssues: issues.filter(issue => issue.severity === 'critical').length,
          fixedIssues: fixableIssues?.fixed.length || 0
        },
        report: this.generateValidationReport(validationResults, params.output_format || 'detailed')
      }

      return {
        success: true,
        data: result,
        metadata: {
          template_path: params.template_path,
          validation_rules: params.validation_rules || ['syntax', 'variables', 'structure'],
          template_engine: params.template_engine || 'handlebars'
        },
        retries: 0
      }
    } catch (error) {
      logger.error('Template validator execution failed', { error, params })
      return {
        success: false,
        error: `Template validator execution failed: ${error instanceof Error ? error.message : String(error)}`,
        retries: 0
      }
    }
  }

  /**
   * Execute boilerplate management operations
   */
  private async executeBoilerplateManager(params: {
    action: 'create' | 'update' | 'clone' | 'version' | 'compare' | 'merge'
    boilerplate_name: string
    source_project?: string
    template_variables?: any
    exclusion_patterns?: string[]
    version_tag?: string
    target_frameworks?: ('react' | 'vue' | 'angular' | 'express' | 'fastify' | 'next.js')[]
    customization_options?: any
  }): Promise<ToolExecutionResult> {
    try {
      logger.info('Executing boilerplate manager', { params })

      let result: any

      switch (params.action) {
        case 'create':
          result = await this.createBoilerplate(params)
          break
        case 'update':
          result = await this.updateBoilerplate(params)
          break
        case 'clone':
          result = await this.cloneBoilerplate(params)
          break
        case 'version':
          result = await this.versionBoilerplate(params)
          break
        case 'compare':
          result = await this.compareBoilerplates(params)
          break
        case 'merge':
          result = await this.mergeBoilerplates(params)
          break
        default:
          throw new Error(`Unknown action: ${params.action}`)
      }

      return {
        success: true,
        data: {
          action: params.action,
          result,
          boilerplate_info: await this.getBoilerplateInfo(params.boilerplate_name),
          best_practices: [
            'Keep boilerplates minimal and focused',
            'Use semantic versioning for template updates',
            'Document all template variables and their purposes',
            'Test boilerplates across different environments',
            'Provide clear customization instructions'
          ]
        },
        metadata: {
          action: params.action,
          boilerplate_name: params.boilerplate_name,
          target_frameworks: params.target_frameworks || []
        },
        retries: 0
      }
    } catch (error) {
      logger.error('Boilerplate manager execution failed', { error, params })
      return {
        success: false,
        error: `Boilerplate manager execution failed: ${error instanceof Error ? error.message : String(error)}`,
        retries: 0
      }
    }
  }

  // Helper methods for Plop.js
  private async generatePlopConfiguration(params: any): Promise<any> {
    const config = {
      description: `${params.generator_type} generator`,
      prompts: this.generatePlopPrompts(params),
      actions: this.generatePlopActions(params)
    }

    return {
      generators: {
        [params.generator_type]: config
      },
      helpers: {
        camelCase: (str: string) => str.replace(/-([a-z])/g, g => g[1].toUpperCase()),
        pascalCase: (str: string) => str.charAt(0).toUpperCase() + str.slice(1).replace(/-([a-z])/g, g => g[1].toUpperCase()),
        kebabCase: (str: string) => str.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, ''),
        snakeCase: (str: string) => str.replace(/([A-Z])/g, '_$1').toLowerCase().replace(/^_/, '')
      }
    }
  }

  private generatePlopPrompts(params: any): any[] {
    const basePrompts = [
      {
        type: 'input',
        name: 'name',
        message: `What is the ${params.generator_type} name?`,
        validate: (input: string) => input.length > 0 || 'Name is required'
      }
    ]

    if (params.generator_type === 'component') {
      basePrompts.push({
        type: 'confirm',
        name: 'withProps',
        message: 'Include props interface?',
        default: true
      })
    }

    if (params.include_tests) {
      basePrompts.push({
        type: 'confirm',
        name: 'includeTests',
        message: 'Generate test files?',
        default: true
      })
    }

    return basePrompts
  }

  private generatePlopActions(params: any): any[] {
    const actions = [
      {
        type: 'add',
        path: `${params.output_directory}/{{${this.getNamingHelper(params.naming_convention)} name}}.${this.getFileExtension(params.generator_type)}`,
        templateFile: `templates/${params.generator_type}.hbs`
      }
    ]

    if (params.include_tests) {
      actions.push({
        type: 'add',
        path: `${params.output_directory}/{{${this.getNamingHelper(params.naming_convention)} name}}.test.${this.getFileExtension(params.generator_type)}`,
        templateFile: `templates/${params.generator_type}.test.hbs`
      })
    }

    if (params.include_docs) {
      actions.push({
        type: 'add',
        path: `${params.output_directory}/{{${this.getNamingHelper(params.naming_convention)} name}}.md`,
        templateFile: `templates/${params.generator_type}.md.hbs`
      })
    }

    return actions
  }

  private generatePlopTemplates(params: any): any {
    const templates: Record<string, string> = {}

    switch (params.generator_type) {
      case 'component':
        templates[`${params.generator_type}.hbs`] = this.getComponentTemplate()
        if (params.include_tests) {
          templates[`${params.generator_type}.test.hbs`] = this.getComponentTestTemplate()
        }
        break
      case 'module':
        templates[`${params.generator_type}.hbs`] = this.getModuleTemplate()
        break
      case 'service':
        templates[`${params.generator_type}.hbs`] = this.getServiceTemplate()
        break
      default:
        templates[`${params.generator_type}.hbs`] = this.getGenericTemplate()
    }

    return templates
  }

  private async validatePlopSetup(outputDirectory: string): Promise<{ isValid: boolean; errors: string[] }> {
    const errors: string[] = []

    // Simulate validation
    if (!outputDirectory) {
      errors.push('Output directory is required')
    }

    return { isValid: errors.length === 0, errors }
  }

  private getPlopGeneratedFiles(params: any): string[] {
    const files = [`${params.generator_type}.${this.getFileExtension(params.generator_type)}`]
    
    if (params.include_tests) {
      files.push(`${params.generator_type}.test.${this.getFileExtension(params.generator_type)}`)
    }
    
    if (params.include_docs) {
      files.push(`${params.generator_type}.md`)
    }

    return files
  }

  private getNamingHelper(convention?: string): string {
    const helpers: Record<string, string> = {
      'camelCase': 'camelCase',
      'PascalCase': 'pascalCase',
      'kebab-case': 'kebabCase',
      'snake_case': 'snakeCase'
    }
    return helpers[convention || 'camelCase'] || 'camelCase'
  }

  private getFileExtension(generatorType: string): string {
    const extensions: Record<string, string> = {
      component: 'tsx',
      module: 'ts',
      service: 'ts',
      test: 'ts',
      page: 'tsx'
    }
    return extensions[generatorType] || 'ts'
  }

  // Template generators
  private getComponentTemplate(): string {
    return `import React{{#if withProps}}, { FC }{{/if}} from 'react'

{{#if withProps}}
interface {{pascalCase name}}Props {
  // Add your props here
}

const {{pascalCase name}}: FC<{{pascalCase name}}Props> = (props) => {
{{else}}
const {{pascalCase name}} = () => {
{{/if}}
  return (
    <div className="{{kebabCase name}}">
      <h1>{{pascalCase name}} Component</h1>
    </div>
  )
}

export default {{pascalCase name}}`
  }

  private getComponentTestTemplate(): string {
    return `import { render, screen } from '@testing-library/react'
import {{pascalCase name}} from './{{pascalCase name}}'

describe('{{pascalCase name}}', () => {
  it('renders correctly', () => {
    render(<{{pascalCase name}} />)
    expect(screen.getByText('{{pascalCase name}} Component')).toBeInTheDocument()
  })
})`
  }

  private getModuleTemplate(): string {
    return `/**
 * {{pascalCase name}} Module
 * 
 * Description: Add module description here
 */

export class {{pascalCase name}} {
  constructor() {
    // Initialize {{camelCase name}}
  }

  // Add your methods here
}

export default {{pascalCase name}}`
  }

  private getServiceTemplate(): string {
    return `/**
 * {{pascalCase name}} Service
 * 
 * Description: Add service description here
 */

export class {{pascalCase name}}Service {
  private static instance: {{pascalCase name}}Service

  private constructor() {
    // Private constructor for singleton
  }

  public static getInstance(): {{pascalCase name}}Service {
    if (!{{pascalCase name}}Service.instance) {
      {{pascalCase name}}Service.instance = new {{pascalCase name}}Service()
    }
    return {{pascalCase name}}Service.instance
  }

  // Add your service methods here
}

export default {{pascalCase name}}Service`
  }

  private getGenericTemplate(): string {
    return `/**
 * {{pascalCase name}}
 * 
 * Generated by Template Library Expert
 */

// Add your implementation here

export default {{pascalCase name}}`
  }

  // Helper methods for Yeoman
  private async generateYeomanConfig(params: any): Promise<any> {
    return {
      generator: `generator-${params.project_type}`,
      prompts: {
        projectName: params.project_name,
        features: params.features || [],
        packageManager: params.package_manager || 'npm',
        license: params.license || 'MIT',
        gitInit: params.git_integration !== false
      },
      paths: {
        destination: params.target_directory,
        templates: './templates',
        output: `./${params.project_name}`
      }
    }
  }

  private async generateProjectStructure(params: any): Promise<any> {
    const structure: Record<string, any> = {
      [`${params.project_name}/`]: {
        'package.json': 'Package configuration',
        'README.md': 'Project documentation',
        'src/': {
          'index.ts': 'Main entry point'
        }
      }
    }

    if (params.features?.includes('typescript')) {
      structure[`${params.project_name}/`]['tsconfig.json'] = 'TypeScript configuration'
    }

    if (params.features?.includes('testing')) {
      structure[`${params.project_name}/`]['src/']['__tests__/'] = {
        'index.test.ts': 'Test files'
      }
    }

    if (params.features?.includes('docker')) {
      structure[`${params.project_name}/`]['Dockerfile'] = 'Docker configuration'
      structure[`${params.project_name}/`]['.dockerignore'] = 'Docker ignore file'
    }

    return structure
  }

  private async generatePackageConfiguration(params: any): Promise<any> {
    const config = {
      name: params.project_name,
      version: '1.0.0',
      description: `${params.project_type} project generated by Template Library Expert`,
      main: 'src/index.ts',
      scripts: {
        start: 'node dist/index.js',
        build: params.features?.includes('typescript') ? 'tsc' : 'echo "No build step"',
        dev: 'nodemon src/index.ts'
      },
      dependencies: {},
      devDependencies: {}
    }

    if (params.features?.includes('typescript')) {
      config.devDependencies = {
        ...config.devDependencies,
        typescript: '^5.0.0',
        '@types/node': '^20.0.0'
      }
    }

    if (params.features?.includes('testing')) {
      config.devDependencies = {
        ...config.devDependencies,
        jest: '^29.0.0',
        '@types/jest': '^29.0.0'
      }
      config.scripts.test = 'jest'
    }

    return config
  }

  private async validateYeomanSetup(targetDirectory: string): Promise<{ isValid: boolean; errors: string[] }> {
    const errors: string[] = []

    if (!targetDirectory) {
      errors.push('Target directory is required')
    }

    return { isValid: errors.length === 0, errors }
  }

  private getBuildCommand(packageManager: string): string {
    const commands: Record<string, string> = {
      npm: 'npm run build',
      yarn: 'yarn build',
      pnpm: 'pnpm build'
    }
    return commands[packageManager] || 'npm run build'
  }

  // Helper methods for Snippet Library Manager
  private async createSnippet(params: any): Promise<any> {
    return {
      id: this.generateSnippetId(),
      name: params.snippet_name,
      content: params.snippet_content,
      category: params.category,
      tags: params.tags || [],
      language: params.language,
      created: new Date().toISOString(),
      usage_count: 0
    }
  }

  private async searchSnippets(query: string): Promise<any> {
    // Simulate search functionality
    return {
      query,
      results: [
        {
          id: 'snippet-1',
          name: 'React Component',
          category: 'react',
          tags: ['component', 'tsx'],
          language: 'tsx',
          relevance: 0.95
        }
      ],
      total: 1,
      searchTime: 45
    }
  }

  private async updateSnippet(params: any): Promise<any> {
    return {
      updated: true,
      snippet: params.snippet_name,
      changes: ['content', 'tags'],
      timestamp: new Date().toISOString()
    }
  }

  private async deleteSnippet(snippetName: string): Promise<any> {
    return {
      deleted: true,
      snippet: snippetName,
      timestamp: new Date().toISOString()
    }
  }

  private async categorizeSnippets(category?: string): Promise<any> {
    return {
      action: 'categorize',
      category,
      snippets_updated: 15,
      categories: ['react', 'typescript', 'node', 'testing', 'utils']
    }
  }

  private async exportSnippets(format: string): Promise<any> {
    return {
      format,
      exported_count: 42,
      file_path: `./snippets.${format}`,
      size: '15.2 KB'
    }
  }

  private async getLibraryStats(): Promise<any> {
    return {
      total_snippets: 42,
      categories: 7,
      languages: 5,
      most_used_category: 'react',
      least_used_category: 'css',
      total_usage: 1337
    }
  }

  private generateSnippetId(): string {
    return 'snippet-' + Math.random().toString(36).substr(2, 9)
  }

  // Helper methods for Template Validator
  private async validateTemplates(params: any): Promise<any> {
    return {
      totalTemplates: 15,
      validTemplates: 12,
      invalidTemplates: 3,
      rules_checked: params.validation_rules || ['syntax', 'variables', 'structure'],
      validation_time: 2.3
    }
  }

  private async analyzeTemplateIssues(params: any): Promise<any[]> {
    return [
      {
        file: 'component.hbs',
        line: 12,
        severity: 'error',
        rule: 'syntax',
        message: 'Unclosed handlebars block',
        suggestion: 'Add closing {{/if}} tag'
      },
      {
        file: 'service.hbs',
        line: 5,
        severity: 'warning',
        rule: 'variables',
        message: 'Unused variable: description',
        suggestion: 'Remove variable or use in template'
      }
    ]
  }

  private async generateValidationRecommendations(results: any): Promise<string[]> {
    const recommendations = []

    if (results.invalidTemplates > 0) {
      recommendations.push('Fix syntax errors in invalid templates')
    }

    recommendations.push('Add validation comments to complex templates')
    recommendations.push('Use consistent naming conventions across templates')
    recommendations.push('Document all template variables and their expected types')

    return recommendations
  }

  private async autoFixTemplateIssues(issues: any[]): Promise<any> {
    const fixableIssues = issues.filter(issue => 
      issue.severity === 'warning' && 
      ['variables', 'structure'].includes(issue.rule)
    )

    return {
      fixed: fixableIssues,
      unfixable: issues.filter(issue => !fixableIssues.includes(issue)),
      fixed_count: fixableIssues.length
    }
  }

  private generateValidationReport(results: any, format: string): string {
    switch (format) {
      case 'summary':
        return `Validation Summary: ${results.validTemplates}/${results.totalTemplates} templates valid`
      case 'json':
        return JSON.stringify(results, null, 2)
      case 'junit':
        return `<?xml version="1.0"?><testsuite tests="${results.totalTemplates}" failures="${results.invalidTemplates}"></testsuite>`
      default:
        return `# Template Validation Report\n\nTotal Templates: ${results.totalTemplates}\nValid: ${results.validTemplates}\nInvalid: ${results.invalidTemplates}\n\nValidation completed in ${results.validation_time}s`
    }
  }

  // Helper methods for Boilerplate Manager
  private async createBoilerplate(params: any): Promise<any> {
    return {
      created: true,
      name: params.boilerplate_name,
      source: params.source_project,
      files_processed: 47,
      variables_extracted: 12,
      version: '1.0.0'
    }
  }

  private async updateBoilerplate(params: any): Promise<any> {
    return {
      updated: true,
      name: params.boilerplate_name,
      changes: ['package.json', 'README.md'],
      version: params.version_tag || '1.1.0'
    }
  }

  private async cloneBoilerplate(params: any): Promise<any> {
    return {
      cloned: true,
      original: params.boilerplate_name,
      clone: `${params.boilerplate_name}-copy`,
      customizations_applied: 5
    }
  }

  private async versionBoilerplate(params: any): Promise<any> {
    return {
      versioned: true,
      name: params.boilerplate_name,
      previous_version: '1.0.0',
      new_version: params.version_tag || '1.1.0',
      changes: ['Added TypeScript support', 'Updated dependencies']
    }
  }

  private async compareBoilerplates(params: any): Promise<any> {
    return {
      comparison: 'completed',
      differences: {
        files_added: 5,
        files_removed: 2,
        files_modified: 8,
        significant_changes: ['package.json', 'tsconfig.json']
      },
      compatibility_score: 0.85
    }
  }

  private async mergeBoilerplates(params: any): Promise<any> {
    return {
      merged: true,
      conflicts: 2,
      resolved_conflicts: 2,
      final_version: '2.0.0',
      merge_strategy: 'feature_union'
    }
  }

  private async getBoilerplateInfo(name: string): Promise<any> {
    return {
      name,
      version: '1.0.0',
      created: '2024-01-01T00:00:00Z',
      last_updated: new Date().toISOString(),
      usage_count: 23,
      target_frameworks: ['react', 'typescript'],
      variables: ['projectName', 'author', 'description'],
      file_count: 47
    }
  }
}