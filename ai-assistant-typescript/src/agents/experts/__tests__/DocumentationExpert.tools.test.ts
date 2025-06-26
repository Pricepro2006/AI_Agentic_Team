// Direct tool tests for DocumentationExpert without BaseAgent dependencies

import { logger } from '@/infrastructure/logging/logger'

// Mock logger
jest.mock('@/infrastructure/logging/logger', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn()
  }
}))

// Import the expert class
const DocumentationExpert = jest.requireActual('../DocumentationExpert').DocumentationExpert

describe('DocumentationExpert Tools Direct Testing', () => {
  let expert: any

  beforeEach(() => {
    // Create expert without calling BaseAgent constructor
    expert = Object.create(DocumentationExpert.prototype)
    
    // Manually set the required properties
    expert.config = {
      id: 'test-expert',
      name: 'Test Expert',
      version: '1.0.0'
    }
  })

  describe('Tool Method Direct Calls', () => {
    it('should execute TypeDoc generator directly', async () => {
      const params = {
        source_path: './src',
        output_format: 'html',
        output_path: './docs',
        entry_strategy: 'expand',
        include_private: false,
        theme: 'default',
        watch_mode: false,
        validation_rules: ['require_docs']
      }

      const result = await expert.executeTypedocGenerator(params)

      expect(result).toBeDefined()
      expect(result.success).toBe(true)
      expect(result.retries).toBe(0)
      expect(result.data).toBeDefined()
      expect(result.data.config).toBeDefined()
      expect(result.data.command).toContain('typedoc')
      expect(result.data.setup_instructions).toEqual(expect.any(Array))
      expect(result.data.best_practices).toEqual(expect.any(Array))
      expect(result.metadata.source_path).toBe('./src')
      expect(result.metadata.output_format).toBe('html')
    })

    it('should execute TypeDoc generator with JSON output', async () => {
      const params = {
        source_path: './src',
        output_format: 'json',
        output_path: './docs'
      }

      const result = await expert.executeTypedocGenerator(params)

      expect(result).toBeDefined()
      expect(result.success).toBe(true)
      expect(result.retries).toBe(0)
      expect(result.data.config.json).toContain('documentation.json')
      expect(result.data.config.out).toBeUndefined()
    })

    it('should execute API extractor directly', async () => {
      const params = {
        project_path: './project',
        entry_point: './src/index.ts',
        api_review: true,
        doc_model: true,
        rollup_types: true,
        validation_level: 'moderate'
      }

      const result = await expert.executeApiExtractor(params)

      expect(result).toBeDefined()
      expect(result.success).toBe(true)
      expect(result.retries).toBe(0)
      expect(result.data).toBeDefined()
      expect(result.data.config).toBeDefined()
      expect(result.data.config.projectFolder).toBe('./project')
      expect(result.data.config.mainEntryPointFilePath).toBe('./src/index.ts')
      expect(result.data.setup_instructions).toEqual(expect.any(Array))
      expect(result.data.recommendations).toEqual(expect.any(Array))
      expect(result.metadata.validation_level).toBe('moderate')
    })

    it('should execute documentation quality analyzer directly', async () => {
      const params = {
        source_path: './src',
        doc_standard: 'tsdoc',
        coverage_threshold: 85,
        check_links: true,
        check_examples: true,
        report_format: 'detailed'
      }

      const result = await expert.executeDocQualityAnalyzer(params)

      expect(result).toBeDefined()
      expect(result.success).toBe(true)
      expect(result.retries).toBe(0)
      expect(result.data).toBeDefined()
      expect(result.data.coverage).toBeDefined()
      expect(result.data.standards).toBeDefined()
      expect(result.data.links).toBeDefined()
      expect(result.data.examples).toBeDefined()
      expect(result.data.quality).toBeDefined()
      expect(result.data.recommendations).toEqual(expect.any(Array))
      expect(result.data.report).toContain('Documentation Quality Report')
      expect(result.metadata.coverage_score).toEqual(expect.any(Number))
    })

    it('should execute documentation automation setup directly', async () => {
      const params = {
        platform: 'github-actions',
        trigger_events: ['push', 'pull-request'],
        deployment_target: 'github-pages',
        notification_channels: ['slack'],
        quality_gates: true,
        cache_strategy: 'moderate'
      }

      const result = await expert.executeDocAutomationSetup(params)

      expect(result).toBeDefined()
      expect(result.success).toBe(true)
      expect(result.retries).toBe(0)
      expect(result.data).toBeDefined()
      expect(result.data.workflow).toBeDefined()
      expect(result.data.deployment).toBeDefined()
      expect(result.data.quality).toBeDefined()
      expect(result.data.notifications).toBeDefined()
      expect(result.data.setup_instructions).toEqual(expect.any(Array))
      expect(result.data.best_practices).toEqual(expect.any(Array))
      expect(result.metadata.platform).toBe('github-actions')
      expect(result.metadata.has_quality_gates).toBe(true)
    })

    it('should execute multi-format converter directly', async () => {
      const params = {
        input_format: 'typedoc-json',
        input_path: './docs/documentation.json',
        output_formats: ['html', 'pdf', 'markdown'],
        output_directory: './output',
        enhance_features: ['search', 'navigation', 'code-highlighting'],
        branding: { 
          colors: { primary: '#007acc', secondary: '#f8f9fa' },
          logo: './assets/logo.png'
        },
        seo_optimization: true
      }

      const result = await expert.executeMultiFormatConverter(params)

      expect(result).toBeDefined()
      expect(result.success).toBe(true)
      expect(result.retries).toBe(0)
      expect(result.data).toBeDefined()
      expect(result.data.input_analysis).toBeDefined()
      expect(result.data.conversions).toBeDefined()
      expect(result.data.generated_files).toEqual(expect.any(Array))
      expect(result.data.enhancement_summary).toContain('3 interactive features')
      expect(result.data.deployment_instructions).toEqual(expect.any(Array))
      expect(result.data.maintenance_guide).toEqual(expect.any(Array))
      expect(result.metadata.output_formats).toEqual(['html', 'pdf', 'markdown'])
      expect(result.metadata.enhanced_features).toEqual(['search', 'navigation', 'code-highlighting'])
    })
  })

  describe('Tool Definition Validation', () => {
    it('should have properly defined tool schemas', () => {
      const toolDefinitions = expert.getToolDefinitions()
      
      expect(toolDefinitions).toHaveLength(5)
      
      const expectedTools = [
        'typedoc_generator',
        'api_extractor',
        'doc_quality_analyzer',
        'doc_automation_setup',
        'multi_format_converter'
      ]
      
      const actualToolNames = toolDefinitions.map((tool: any) => tool.name)
      expect(actualToolNames).toEqual(expectedTools)
      
      // Validate each tool has required structure
      toolDefinitions.forEach((tool: any) => {
        expect(tool.name).toBeTruthy()
        expect(tool.description).toBeTruthy()
        expect(tool.parameters).toEqual(expect.objectContaining({
          type: 'object',
          properties: expect.any(Object)
        }))
        expect(tool.execute).toEqual(expect.any(Function))
      })
    })

    it('should have proper parameter validation for TypeDoc generator', () => {
      const toolDefinitions = expert.getToolDefinitions()
      const typedocTool = toolDefinitions.find((tool: any) => tool.name === 'typedoc_generator')
      
      expect(typedocTool.parameters.properties.output_format.enum).toEqual(['html', 'json', 'markdown', 'multi'])
      expect(typedocTool.parameters.properties.entry_strategy.enum).toEqual(['expand', 'packages', 'resolve'])
      expect(typedocTool.parameters.properties.theme.enum).toEqual(['default', 'minimal', 'hierarchy'])
      expect(typedocTool.parameters.required).toEqual(['source_path', 'output_format', 'output_path'])
    })

    it('should have proper parameter validation for automation setup', () => {
      const toolDefinitions = expert.getToolDefinitions()
      const automationTool = toolDefinitions.find((tool: any) => tool.name === 'doc_automation_setup')
      
      expect(automationTool.parameters.properties.platform.enum).toEqual(['github-actions', 'gitlab-ci', 'jenkins', 'azure-devops'])
      expect(automationTool.parameters.properties.deployment_target.enum).toEqual(['github-pages', 'netlify', 'vercel', 's3', 'self-hosted'])
      expect(automationTool.parameters.required).toEqual(['platform', 'deployment_target'])
    })
  })

  describe('Error Handling', () => {
    it('should handle TypeDoc generation with missing source path', async () => {
      const params = {
        source_path: './nonexistent',
        output_format: 'html',
        output_path: './docs'
      }

      const result = await expert.executeTypedocGenerator(params)

      expect(result.success).toBe(false)
      expect(result.retries).toBe(0)
      expect(result.error).toContain('Source path does not exist')
    })

    it('should handle API extractor with missing project files', async () => {
      const params = {
        project_path: './nonexistent',
        entry_point: './src/index.ts'
      }

      const result = await expert.executeApiExtractor(params)

      expect(result.success).toBe(false)
      expect(result.retries).toBe(0)
      expect(result.error).toContain('Missing required files')
    })

    it('should handle invalid output formats gracefully', async () => {
      const params = {
        input_format: 'invalid-format' as any,
        input_path: './docs.json',
        output_formats: ['html'],
        output_directory: './output'
      }

      const result = await expert.executeMultiFormatConverter(params)

      expect(result.success).toBe(true) // Should handle gracefully
      expect(result.retries).toBe(0)
    })
  })

  describe('Helper Method Testing', () => {
    it('should generate correct TypeDoc config for HTML output', async () => {
      const params = {
        source_path: './src',
        output_format: 'html',
        output_path: './docs',
        theme: 'minimal',
        include_private: true
      }

      const config = await expert.generateTypedocConfig(params)
      
      expect(config.entryPoints).toEqual(['./src'])
      expect(config.out).toBe('./docs')
      expect(config.theme).toBe('minimal')
      expect(config.excludePrivate).toBe(false) // include_private is true
    })

    it('should generate correct TypeDoc config for JSON output', async () => {
      const params = {
        source_path: './src',
        output_format: 'json',
        output_path: './docs'
      }

      const config = await expert.generateTypedocConfig(params)
      
      expect(config.json).toBe('./docs/documentation.json')
      expect(config.out).toBeUndefined()
    })

    it('should build correct TypeDoc command', () => {
      const config = {
        entryPoints: ['./src'],
        out: './docs',
        theme: 'default',
        excludePrivate: true,
        includeVersion: true
      }

      const command = expert.buildTypedocCommand(config)
      
      expect(command).toContain('typedoc')
      expect(command).toContain('--entryPoints "./src"')
      expect(command).toContain('--out "./docs"')
      expect(command).toContain('--theme default')
      expect(command).toContain('--excludePrivate')
      expect(command).toContain('--includeVersion')
    })

    it('should calculate quality grade correctly', () => {
      expect(expert.calculateGrade(95)).toBe('A')
      expect(expert.calculateGrade(85)).toBe('B')
      expect(expert.calculateGrade(75)).toBe('C')
      expect(expert.calculateGrade(65)).toBe('D')
      expect(expert.calculateGrade(55)).toBe('F')
    })

    it('should generate appropriate quality recommendations', () => {
      const lowQuality = {
        coverage: 50,
        standards: 60,
        links: 80,
        examples: 70
      }

      const recommendations = expert.generateQualityRecommendations(lowQuality, 80)
      
      expect(recommendations.some(rec => rec.includes('Increase documentation coverage'))).toBe(true)
      expect(recommendations.some(rec => rec.includes('Improve adherence to documentation standards'))).toBe(true)
      expect(recommendations.some(rec => rec.includes('Validate and fix code examples'))).toBe(true)
    })

    it('should convert trigger events correctly', () => {
      const events = ['push', 'pull-request', 'release']
      const triggers = expert.convertTriggerEvents(events)
      
      expect(triggers.push).toEqual({ branches: ['main', 'master'] })
      expect(triggers.pull_request).toEqual({ branches: ['main', 'master'] })
      expect(triggers.release).toEqual({ types: ['published'] })
    })

    it('should generate feature configuration correctly', () => {
      const searchConfig = expert.getFeatureConfiguration('search')
      expect(searchConfig.provider).toBe('lunr')
      expect(searchConfig.indexing).toBe('full-text')
      
      const analyticsConfig = expert.getFeatureConfiguration('analytics')
      expect(analyticsConfig.provider).toBe('google-analytics')
      expect(analyticsConfig.events).toContain('page_view')
    })
  })

  describe('Configuration Generation', () => {
    it('should generate proper API-Extractor config', async () => {
      const params = {
        project_path: './project',
        entry_point: './src/index.ts',
        validation_level: 'strict'
      }

      const config = await expert.generateApiExtractorConfig(params)
      
      expect(config.projectFolder).toBe('./project')
      expect(config.mainEntryPointFilePath).toBe('./src/index.ts')
      expect(config.apiReport.enabled).toBe(true)
      expect(config.docModel.enabled).toBe(true)
      expect(config.dtsRollup.enabled).toBe(true)
      expect(config.messages.compilerMessageReporting.default.logLevel).toBe('error') // strict mode
    })

    it('should generate workflow configuration for different platforms', async () => {
      const params = {
        platform: 'github-actions',
        trigger_events: ['push'],
        deployment_target: 'netlify'
      }

      const workflow = await expert.generateWorkflowConfiguration(params)
      
      expect(workflow.name).toBe('Documentation Generation')
      expect(workflow.on.push).toEqual({ branches: ['main', 'master'] })
      expect(workflow.jobs.docs['runs-on']).toBe('ubuntu-latest')
      expect(workflow.jobs.docs.steps).toEqual(expect.any(Array))
    })

    it('should generate deployment step for different targets', () => {
      const githubStep = expert.generateDeploymentStep('github-pages')
      expect(githubStep.uses).toBe('peaceiris/actions-gh-pages@v3')
      
      const netlifyStep = expert.generateDeploymentStep('netlify')
      expect(netlifyStep.uses).toBe('nwtgck/actions-netlify@v2.0')
      
      const vercelStep = expert.generateDeploymentStep('vercel')
      expect(vercelStep.uses).toBe('amondnet/vercel-action@v25')
    })
  })

  describe('Quality Metrics', () => {
    it('should calculate quality metrics correctly', async () => {
      const mockData = {
        coverage: { overallCoverage: 85 },
        standards: { score: 90 },
        links: { validLinks: 95, totalLinks: 100 },
        examples: { validExamples: 18, totalExamples: 20 }
      }

      const quality = await expert.calculateQualityMetrics(
        mockData.coverage,
        mockData.standards,
        mockData.links,
        mockData.examples
      )
      
      expect(quality.coverage).toBe(85)
      expect(quality.standards).toBe(90)
      expect(quality.links).toBe(95)
      expect(quality.examples).toBe(90)
      expect(quality.overallScore).toBeCloseTo(90, 1)
      expect(quality.grade).toBe('A')
    })

    it('should generate quality reports in different formats', () => {
      const quality = {
        overallScore: 87.5,
        grade: 'B',
        coverage: 85,
        standards: 90,
        links: 95,
        examples: 80
      }

      const summaryReport = expert.generateQualityReport(quality, 'summary')
      expect(summaryReport).toBe('Documentation Quality: B (87.5%)')

      const ciReport = expert.generateQualityReport(quality, 'ci')
      expect(ciReport).toBe('quality_score=87.5;grade=B')

      const detailedReport = expert.generateQualityReport(quality, 'detailed')
      expect(detailedReport).toContain('Documentation Quality Report')
      expect(detailedReport).toContain('Overall Score: 87.5%')
      expect(detailedReport).toContain('Coverage: 85.0%')
    })
  })
})