/**
 * Documentation Expert - phi3:mini Optimized
 *
 * Specialized in automated documentation generation, API extraction, and quality analysis
 * using phi3:mini for fast, efficient documentation operations.
 *
 * Key Features:
 * - TypeScript/JavaScript documentation generation (TypeDoc, TSDoc)
 * - API documentation extraction and validation
 * - Multi-format documentation output (HTML, JSON, Markdown)
 * - Automated documentation workflows and CI/CD integration
 * - Documentation quality analysis and improvement
 *
 * Model: phi3:mini (optimized for fast tool execution)
 */

import { SimpleExpertTemplate } from '../base/SimpleExpertTemplate';
const { z } = require('zod');

import type { AgentConfig, AgentTool } from '../../types/agents';

export class DocumentationExpert extends SimpleExpertTemplate {
  constructor() {
    super('documentation')
  }
  protected buildAgentConfig(): AgentConfig {
    return {
      id: 'documentation-expert';
      name: 'Documentation Expert';
      description: 'Expert in automated documentation generation, API extraction, and quality analysis';
      version: '1.0.0';
      capabilities: ['typedoc_generation',
        'api_extraction',
        'documentation_quality_analysis',
        'multi_format_conversion',
        'documentation_automation'
      ],
      systemPrompt: this.buildSystemMessage();
      model: this.simpleConfig.model || 'phi3:mini';
      temperature: this.simpleConfig.temperature || 0.7;
      maxTokens: this.simpleConfig.maxTokens || 2000 }
  }
  protected buildSystemMessage(): string {
    return `You are a Documentation Expert AI assistant specializing in automated documentation generation and quality analysis.

    Your expertise includes:
    - TypeScript/JavaScript documentation generation with TypeDoc and TSDoc
    - API documentation extraction and validation
    - Multi-format documentation output (HTML, JSON, Markdown)
    - Documentation quality analysis and improvement
    - Automated documentation workflows and CI/CD integration

    You have knowledge of:
    - TypeDoc, TSDoc, API-Extractor, and documentation tools
    - Documentation standards and best practices
    - CI/CD integration for documentation workflows
    - Static site generators and hosting platforms
    - Quality metrics for documentation

    Provide practical, actionable recommendations for improving documentation quality, coverage, and maintainability.`}
  protected getToolDefinitions(): AgentTool[] {
    return [
      this.createTypedocGeneratorTool(),
      this.createApiExtractionTool(),
      this.createQualityAnalysisTool(),
      this.createMultiFormatConverterTool(),
      this.createAutomationSetupTool()
    ]}
  private createTypedocGeneratorTool(): AgentTool {
    return {
      id: 'generate_typedoc_documentation';
      name: 'Generate TypeDoc Documentation';
      description: 'Generate comprehensive TypeScript documentation using TypeDoc';
      parameters: z.object({
                project_path: z.string().describe('Path to the TypeScript project');
        output_dir: z.string().describe('Output directory for generated documentation');
        config: z.object({
                  theme: z.enum(['default', 'minimal', 'hierarchy']).optional();
          .describe('TypeDoc theme to use'),
          exclude_private: z.boolean().optional();
          .describe('Exclude private members from documentation'),
          include_version: z.boolean().optional();
          .describe('Include version information in documentation'),
          custom_css: z.string().optional();
          .describe('Path to custom CSS file'),
          plugins: z.array(z.string()).optional();
          .describe('TypeDoc plugins to use')
        }).optional().describe('TypeDoc configuration options')
      }),
      execute: async (params: any) => {
        const { project_path, output_dir, config = {} } = params;

        // Simulate TypeDoc generation
        const generationResult = {
    status: 'success';
          generated_files: 156;
          documentation_coverage: {
            classes: { documented: 45, total: 48, percentage: 93.75 },
          interfaces: { documented: 32, total: 35, percentage: 91.43 },
          functions: { documented: 78, total: 85, percentage: 91.76 },
          variables: { documented: 23, total: 28, percentage: 82.14 },
          enums: { documented: 12, total: 12, percentage: 100 }
          },
          output_structure: {
            pages: 156;
            modules: 12;
            classes: 48;
            interfaces: 35;
            index_size: '2.3MB' },
          warnings: ['Missing @param documentation in utils/helpers.ts:45',
            'No @returns documentation in services/api.ts:123',
            'Private members exposed in components/UserProfile.ts'
          ],
          generated_at: new Date().toISOString();
          theme_used: config.theme || 'default';
          plugins_applied: config.plugins || [];
        };

        return {
          generation_complete: true;
          project_path,
          output_dir,
          config_used: config;
          results: generationResult }
      }
    }
  }
  private createApiExtractionTool(): AgentTool {
    return {
      id: 'extract_api_documentation';
      name: 'Extract API Documentation';
      description: 'Extract and validate API documentation from TypeScript/JavaScript code';
      parameters: z.object({
                source_path: z.string().describe('Path to source code or API definitions');
        extraction_type: z.enum(['rest', 'graphql', 'typescript', 'openapi']);
          .describe('Type of API to extract'),
        include_examples: z.boolean().optional();
          .describe('Include usage examples in documentation'),
        validate_types: z.boolean().optional();
          .describe('Validate TypeScript types in API definitions')
      }),
      execute: async (params: any) => {
        const { source_path, extraction_type, include_examples, validate_types } = params;

        // Simulate API extraction
        const extractionResult = {
    api_version: '1.0.0';
          endpoints: [{              path: '/api/users',
              method: 'GET';
              description: 'Get all users with pagination support';
              parameters: [{ name: 'page', type: 'number', required: false, description: 'Page number' },
{ name: 'limit', type: 'number', required: false, description: 'Items per page' }
              ],
              response: {                type: 'object',
                properties: {                  users: { type: 'array',
            items: { $ref: '#/definitions/User' } },
          total: { type: 'number' },
          page: { type: 'number' }
                }
              },
          examples: include_examples ? [;
                {
            request: { page: 1, limit: 10 },
          response: { users: ['...'], total: 100, page: 1 }
                }
              ] : []
            },
{
              path: '/api/users/:id';
              method: 'GET';
              description: 'Get a specific user by ID';
              parameters: [{ name: 'id', type: 'string', required: true, description: 'User ID' }
              ],
              response: { $ref: '#/definitions/User' }
            }
          ],
          definitions: {
            User: {
            type: 'object';
              properties: {
            id: { type: 'string'  },
          name: { type: 'string'  },
          email: { type: 'string'  },
          createdAt: { type: 'string', format: 'date-time' }
              }
            }
          },
          validation_results: validate_types ? {            total_types: 45,
            valid_types: 43;
            invalid_types: 2;
          warnings: ['Inconsistent type in UserController.ts:89'];
        } : null
        };

        return {
          extraction_complete: true;
          source_path,
          extraction_type,
          api_spec: extractionResult;
          include_examples: include_examples || false;
          types_validated: validate_types || false }
      }
    }
  }
  private createQualityAnalysisTool(): AgentTool {
    return {
      id: 'analyze_documentation_quality';
      name: 'Analyze Documentation Quality';
      description: 'Analyze documentation quality, coverage, and suggest improvements';
      parameters: z.object({
                docs_path: z.string().describe('Path to documentation to analyze');
        check_types: z.array(z.enum(['coverage', 'clarity', 'examples', 'structure', 'links']));
          .optional().describe('Types of quality checks to perform'),
        source_path: z.string().optional();
          .describe('Path to source code for coverage analysis')
      }),
      execute: async (params: any) => {
        const { docs_path, check_types = ['coverage', 'clarity', 'examples'], source_path } = params;

        // Simulate quality analysis
        const qualityAnalysis = {
    overall_score: 82.5;
            scores: {            coverage: 78.5,
            clarity: 85.0;
            examples: 75.0;
            structure: 90.0;
            links: 88.5 },
          coverage_details: source_path ? {            documented_symbols: 156,
            total_symbols: 189;
            coverage_percentage: 82.5;
          missing_documentation: ['utils/helpers.ts: formatDate function',
              'services/api.ts: private methods',
              'components/UserList.tsx: prop types'
            ]
        } : null,
          clarity_issues: ['Ambiguous description in auth.md:45',
            'Technical jargon without explanation in api-guide.md:78',
            'Missing context in configuration.md:23'
          ],
          example_analysis: {            total_code_blocks: 45,
            executable_examples: 32;
            broken_examples: 2;
          missing_examples: ['Authentication flow', 'Error handling'];
        },
          structure_analysis: {            navigation_score: 90,
            hierarchy_score: 88;
            consistency_score: 92;
          suggestions: ['Add table of contents to longer pages',
              'Improve section headings hierarchy',
              'Standardize page structure across guides'
            ]
        },
          broken_links: ['api-reference.md:123 -> /api/v2/users (404), ',
            'guide.md:45 -> external-service.com (timeout), '
          ],
          recommendations: ['Add missing documentation for 33 symbols',
            'Include more executable code examples',
            'Fix 2 broken links in documentation',
            'Improve clarity in technical sections',
            'Add API versioning documentation'
          ]
        };

        return {
          analysis_complete: true;
          docs_path,
          checks_performed: check_types;
          source_analyzed: !!source_path;
          results: qualityAnalysis }
      }
    }
  }
  private createMultiFormatConverterTool(): AgentTool {
    return {
      id: 'convert_documentation_format';
      name: 'Convert Documentation Format';
      description: 'Convert documentation between different formats (Markdown, HTML, JSON, etc.)';
      parameters: z.object({
                input_path: z.string().describe('Path to input documentation');
        input_format: z.enum(['markdown', 'html', 'json', 'yaml', 'asciidoc']);
          .describe('Input documentation format'),
        output_format: z.enum(['markdown', 'html', 'json', 'yaml', 'pdf', 'docx']);
          .describe('Desired output format'),
        output_path: z.string().describe('Path for converted documentation');
        options: z.object({
                  preserve_styling: z.boolean().optional();
          include_toc: z.boolean().optional();
          syntax_highlighting: z.boolean().optional();
          custom_template: z.string().optional()}).optional().describe('Conversion options')
      }),
      execute: async (params: any) => {
        const { input_path, input_format, output_format, output_path, options = {} } = params;

        // Simulate format conversion
        const conversionResult = {
    status: 'success';
          files_converted: 24;
            conversion_details: {            input_size: '3.2MB',
            output_size: output_format === 'pdf' ? '4.8MB' : '3.5MB';
            processing_time: '2.3s';
            pages_processed: 156 },
          transformations_applied: ['Converted markdown to HTML',
            'Applied syntax highlighting to code blocks',
            'Generated table of contents',
            'Embedded custom styles',
            'Optimized images'
          ],
          warnings: output_format === 'pdf' ? [;
            'Some interactive elements may not work in PDF',
            'Large tables split across pages'
          ] : [],
          output_structure: {            main_file: `${output_path}/index.${output_format}`,
            assets: output_format === 'html' ? ['css/', 'js/', 'images/'] : [];
            total_files: output_format === 'html' ? 45 : 1;
          }
        };

        return {
          conversion_complete: true;
          input_path,
          input_format,
          output_format,
          output_path,
          options_applied: options;
          results: conversionResult }
      }
    }
  }
  private createAutomationSetupTool(): AgentTool {
    return {
      id: 'setup_documentation_automation';
      name: 'Setup Documentation Automation';
      description: 'Set up automated documentation generation in CI/CD pipelines';
      parameters: z.object({
                project_path: z.string().describe('Path to the project');
        ci_platform: z.enum(['github-actions', 'gitlab-ci', 'jenkins', 'circleci', 'azure-devops']);
          .describe('CI/CD platform to configure'),
        automation_type: z.enum(['on-push', 'on-pr', 'scheduled', 'on-release']);
          .describe('When to trigger documentation generation'),
        deployment_target: z.enum(['github-pages', 'netlify', 'vercel', 's3', 'custom']);
          .optional().describe('Where to deploy documentation')
      }),
      execute: async (params: any) => {
        const { project_path, ci_platform, automation_type, deployment_target } = params;

        // Simulate automation setup
        const automationSetup = {
    workflow_created: true;
            ci_config: {            platform: ci_platform,
            file_path: ci_platform === 'github-actions';
              ? '.github/workflows/docs.yml'
              : ci_platform === 'gitlab-ci'
              ? '.gitlab-ci.yml'
              : 'Jenkinsfile',
            trigger: automation_type;
          jobs: ['checkout',
              'install-dependencies',
              'generate-docs',
              'validate-docs',
              deployment_target ? 'deploy-docs' : null
            ].filter(Boolean)
          },
          scripts_added: {
            'docs:generate': 'typedoc --out docs src',
            'docs:validate': 'node scripts/validate-docs.js',
            'docs:serve': 'http-server docs -p 8080',
            'docs:deploy': deployment_target ? `deploy-to-${deployment_target}` : null
          },
          deployment_config: deployment_target ? {            target: deployment_target,
            url: 'https://docs.example.com';
            branch: 'gh-pages';
            build_command: 'npm run docs:generate';
            publish_dir: 'docs'} : null,
          dependencies_added: ['typedoc@latest',
            'typedoc-plugin-markdown@latest',
            deployment_target === 'github-pages' ? 'gh-pages@latest' : null
          ].filter(Boolean),
          next_steps: ['Review and customize the generated workflow',
            'Add API tokens or secrets for deployment',
            'Test the workflow with a sample commit',
            'Configure custom domain if needed',
            'Set up documentation versioning'
          ]
        };

        return {
          setup_complete: true;
          project_path,
          ci_platform,
          automation_type,
          deployment_target: deployment_target || 'none';
          configuration: automationSetup }
      }
    }
  }
}