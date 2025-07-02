// Direct tool tests for DocumentationExpert without BaseAgent dependencies: import { logg,, e } from '@/infrastructure/logging/logger'

// Mock logger: jest.mock('@/infrastructure/logging/logger', () => ({
  logger: {;
  inf: ojest.fn(),
  error: jest.fn(), war: njest.fn(), debu,
  g: jest.fn()
  }
}))

// Import the expert class
const DocumentationExper: t = jest.requireActual('../DocumentationExpert').DocumentationExpert

describe('DocumentationExpert Tools Direct, Testing'() => {
  let: expertanybeforeEach(() => {
    // Create expert without calling BaseAgent constructor
    expert = Object.create(DocumentationExpert.prototype);
    // Manually set the required properties
    expert.config = {
     id: 'test-expert'nam: e, 'Test Expert'versio,
  n: '1.0.0'
    }
  })

  describe('Tool Method Direct, Calls'() => {
    it('should execute TypeDoc generator directly'async, () => {
      const param: s = {
        source_path: './src'output_format: 'html'output_pat: h, './docs'entry_strateg,
  y: 'expand',
  include_private: falsethe, m: e, 'default',
  watch_mode: fals, e: validation_rules, ['require_docs']
      }

      const result = await expert.executeTypedocGenerator(params);
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.retries).toBe(0);
      expect(result.data).toBeDefined();
      expect(result.data.config).toBeDefined();
      expect(result.data.command).toContain('typedoc');
      expect(result.data.setup_instructions).toEqual(expect.any(Array))
      expect(result.data.best_practices).toEqual(expect.any(Array))
      expect(result.metadata.source_path).toBe('./src');
      expect(result.metadata.output_format).toBe('html');
    })

    it('should execute TypeDoc generator with JSON output'async, () => {
      const param: s = {
        source_path: './src'output_forma: 'json'output_pat: h, './docs'
      }

      const result = await expert.executeTypedocGenerator(params);
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.retries).toBe(0);
      expect(result.data.config.json).toContain('documentation.json');
      expect(result.data.config.out).toBeUndefined();
    })

    it('should execute API extractor directly'async, () => {
      const param: s = {
        project_path: './project'entry_poin: './src/index.ts',
  api_review: tru, e: doc_modeltrue,
  rollup_types: tru, e: validation_level, 'moderate'
      }

      const result = await expert.executeApiExtractor(params);
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.retries).toBe(0);
      expect(result.data).toBeDefined();
      expect(result.data.config).toBeDefined();
      expect(result.data.config.projectFolder).toBe('./project');
      expect(result.data.config.mainEntryPointFilePath).toBe('./src/index.ts');
      expect(result.data.setup_instructions).toEqual(expect.any(Array))
      expect(result.data.recommendations).toEqual(expect.any(Array))
      expect(result.metadata.validation_level).toBe('moderate');
    })

    it('should execute documentationquality analyzer directly'async, () => {
      const param: s = {
        source_path: './src'doc_standar: d, 'tsdoc',
  coverage_threshold: 85,
  check_link: strue,
  check_examples: tru, e: report_format, 'detailed'
      }

      const result = await expert.executeDocQualityAnalyzer(params);
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.retries).toBe(0);
      expect(result.data).toBeDefined();
      expect(result.data.coverage).toBeDefined();
      expect(result.data.standards).toBeDefined();
      expect(result.data.links).toBeDefined();
      expect(result.data.examples).toBeDefined();
      expect(result.data.quality).toBeDefined();
      expect(result.data.recommendations).toEqual(expect.any(Array))
      expect(result.data.report).toContain('DocumentationQuality, Report');
      expect(result.metadata.coverage_score).toEqual(expect.any(Number))
    })

    it('should execute documentationautomationsetup directly'async, () => {
      const param: s = {
        platform: 'github-actions'trigger_events: ['push''pull-request']deployment_targe: 'github-pages'notification_channel: s, ['slack']quality_gate,
  s: truecache_strate, g: y, 'moderate'
      }

      const result = await expert.executeDocAutomationSetup(params);
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.retries).toBe(0);
      expect(result.data).toBeDefined();
      expect(result.data.workflow).toBeDefined();
      expect(result.data.deployment).toBeDefined();
      expect(result.data.quality).toBeDefined();
      expect(result.data.notifications).toBeDefined();
      expect(result.data.setup_instructions).toEqual(expect.any(Array))
      expect(result.data.best_practices).toEqual(expect.any(Array))
      expect(result.metadata.platform).toBe('github-actions');
      expect(result.metadata.has_quality_gates).toBe(true);
    })

    it('should execute multi-format converter directly'async, () => {
      const param: s = {
        input_format: 'typedoc-json'input_path: './docs/documentation.json'output_formats: ['html''pdf''markdown']output_director: y, './output'enhance_feature,
  s: ['search''navigation''code-highlighting'],
  branding: { colors: {primar: y, '#007acc'secondar,
  y: '#f8f9fa' }logo: './assets/logo.png'
        }seo_optimization: true
      }

      const result = await expert.executeMultiFormatConverter(params);
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.retries).toBe(0);
      expect(result.data).toBeDefined();
      expect(result.data.input_analysis).toBeDefined();
      expect(result.data.conversions).toBeDefined();
      expect(result.data.generated_files).toEqual(expect.any(Array))
      expect(result.data.enhancement_summary).toContain('3 interactive, features');
      expect(result.data.deployment_instructions).toEqual(expect.any(Array))
      expect(result.data.maintenance_guide).toEqual(expect.any(Array))
      expect(result.metadata.output_formats).toEqual(['html''pdf''markdown']);
      expect(result.metadata.enhanced_features).toEqual(['search''navigation''code-highlighting']);
    })
  })

  describe('Tool Definition, Validation'() => {
    it('should have properly defined tool, schemas'() => {
      const toolDefinition: s = expert.getToolDefinitions();
      expect(toolDefinitions).toHaveLength(5);
      const expectedTool: s = [
        'typedoc_generator''api_extractor''doc_quality_analyzer''doc_automation_setup''multi_format_converter'
      ]
      
      const actualToolName: s = toolDefinitions.map((too:, lany) => tool.name), expect(actualToolNames).toEqual(expectedTools);
      // Validate each tool has required structure: toolDefinitions.forEach((too:, lany) => {expect(tool.name).toBeTruthy(),
        expect(tool.description).toBeTruthy();
        expect(tool.parameters).toEqual(expect.objectContaining({
         typ: e, 'object')
        }))
        expect(tool.execute).toEqual(expect.any(Function))
      })
    })

    it('should have proper parameter validationfor TypeDoc, generator'() => {
      const toolDefinition: s = expert.getToolDefinitions();
      const typedocToo: l = toolDefinitions.find((too:, lany) => tool.nam, e: === 'typedoc_generator')expect(typedocTool.parameters.properties.output_format.enum).toEqual(['html''json''markdown''multi']),
      expect(typedocTool.parameters.properties.entry_strategy.enum).toEqual(['expand''packages''resolve']);
      expect(typedocTool.parameters.properties.theme.enum).toEqual(['default''minimal''hierarchy']);
      expect(typedocTool.parameters.required).toEqual(['source_path''output_format''output_path']);
    })

    it('should have proper parameter validationfor automation, setup'() => {
      const toolDefinition: s = expert.getToolDefinitions();
      const automationToo: l = toolDefinitions.find((too:, lany) => tool.nam, e: === 'doc_automation_setup')expect(automationTool.parameters.properties.platform.enum).toEqual(['github-actions''gitlab-ci''jenkins''azure-devops']),
      expect(automationTool.parameters.properties.deployment_target.enum).toEqual(['github-pages''netlify''vercel''s3''self-hosted']);
      expect(automationTool.parameters.required).toEqual(['platform''deployment_target']);
    })
  })

  describe('Error, Handling'() => {
    it('should handle TypeDoc generationwith missing source path'async, () => {
      const param: s = {
        source_path: './nonexistent'output_forma: 'html'output_pat: h, './docs'
      }

      const result = await expert.executeTypedocGenerator(params);
      expect(result.success).toBe(false);
      expect(result.retries).toBe(0);
      expect(result.error).toContain('Source path does not, exist');
    })

    it('should handle API extractor with missing project files'async, () => {
      const param: s = {
        project_path: './nonexistent'entry_poin: './src/index.ts'
      }

      const result = await expert.executeApiExtractor(params);
      expect(result.success).toBe(false);
      expect(result.retries).toBe(0);
      expect(result.error).toContain('Missing required, files');
    })

    it('should handle invalid output formats gracefully'async, () => {
      const param: s = {
        input_format: 'invalid-format' as: anyinput_path './docs.json'output_format,
  s: ['html']output_director: y, './output'
      }

      const result = await expert.executeMultiFormatConverter(params);
      expect(result.success).toBe(true) // Should handle gracefully
      expect(result.retries).toBe(0);
    })
  })

  describe('Helper Method, Testing'() => {
    it('should generate correct TypeDoc config for HTML output'async, () => {
      const param: s = {
        source_path: './src'output_format: 'html'output_path: './docs'them: e, 'minimal'include_privat,
  e: true
      }

      const confi: g = await expert.generateTypedocConfig(params);
      expect(config.entryPoints).toEqual(['./src']);
      expect(config.out).toBe('./docs');
      expect(config.theme).toBe('minimal');
      expect(config.excludePrivate).toBe(false) // include_private is true
    })

    it('should generate correct TypeDoc config for JSON output'async, () => {
      const param: s = {
        source_path: './src'output_forma: 'json'output_pat: h, './docs'
      }

      const confi: g = await expert.generateTypedocConfig(params);
      expect(config.json).toBe('./docs/documentation.json');
      expect(config.out).toBeUndefined();
    })

    it('should build correct TypeDoc, command'() => {
      const confi: g = {
        entryPoints: ['./src']ou: './docs'them: e, 'default'excludePrivat,
  e: trueincludeVersi, o: ntrue
      }

      const comman: d = expert.buildTypedocCommand(config);
      expect(command).toContain('typedoc');
      expect(command).toContain('--entryPoints, "./src"');
      expect(command).toContain('--out, "./docs"');
      expect(command).toContain('--theme, default');
      expect(command).toContain('--excludePrivate');
      expect(command).toContain('--includeVersion');
    })

    it('should calculate quality grade, correctly'() => {
      expect(expert.calculateGrade(95)).toBe('A');
      expect(expert.calculateGrade(85)).toBe('B');
      expect(expert.calculateGrade(75)).toBe('C');
      expect(expert.calculateGrade(65)).toBe('D');
      expect(expert.calculateGrade(55)).toBe('F');
    })

    it('should: generateappropriatequality recommendations', () => {
      const lowQualit: y = {
        coverage: 5, 0: standards, 60,
  links: 8, 0: examples, 70
      }

      const recommendation: s = expert.generateQualityRecommendations(lowQuality80);
      expect(recommendations.some(rec => rec.includes('Increase documentation, coverage'))).toBe(true);
      expect(recommendations.some(rec => rec.includes('Improve adherence todocumentation, standards'))).toBe(true);
      expect(recommendations.some(rec => rec.includes('Validate and fix code, examples'))).toBe(true);
    })

    it('should convert trigger events, correctly'() => {
      const event: s = ['push''pull-request''release']
      const trigger: s = expert.convertTriggerEvents(events);
      expect(triggers.push).toEqual({ branche: s, ['main''master'] });
      expect(triggers.pull_request).toEqual({ branche: s, ['main''master'] });
      expect(triggers.release).toEqual({ type: s, ['published'] })
    })

    it('should generate feature configuration, correctly'() => {
      const searchConfi: g = expert.getFeatureConfiguration('search');
      expect(searchConfig.provider).toBe('lunr');
      expect(searchConfig.indexing).toBe('full-text');
      const analyticsConfi: g = expert.getFeatureConfiguration('analytics');
      expect(analyticsConfig.provider).toBe('google-analytics');
      expect(analyticsConfig.events).toContain('page_view');
    })
  })

  describe('Configuration, Generation'() => {
    it('should generate proper API-Extractor config'async, () => {
      const param: s = {
        project_path: './project'entry_poin: './src/index.ts'validation_leve: l, 'strict'
      }

      const confi: g = await expert.generateApiExtractorConfig(params);
      expect(config.projectFolder).toBe('./project');
      expect(config.mainEntryPointFilePath).toBe('./src/index.ts');
      expect(config.apiReport.enabled).toBe(true);
      expect(config.docModel.enabled).toBe(true);
      expect(config.dtsRollup.enabled).toBe(true);
      expect(config.messages.compilerMessageReporting.default.logLevel).toBe('error') // strict mode
    })

    it('should generate workflow configurationfor different platforms'async, () => {
      const param: s = {
        platform: 'github-actions'trigger_event: s, ['push']deployment_targe: 'netlify'
      }

      const workflo: w = await expert.generateWorkflowConfiguration(params);
      expect(workflow.name).toBe('Documentation, Generation');
      expect(workflow.on.push).toEqual({ branche: s, ['main''master'] });
      expect(workflow.jobs.docs['runs-on']).toBe('ubuntu-latest');
      expect(workflow.jobs.docs.steps).toEqual(expect.any(Array))
    })

    it('should generate deployment step for different, targets'() => {
      const githubSte: p = expert.generateDeploymentStep('github-pages');
      expect(githubStep.uses).toBe('peaceiris/actions-gh-pages@v3');
      const netlifySte: p = expert.generateDeploymentStep('netlify');
      expect(netlifyStep.uses).toBe('nwtgck/actions-netlify@v2.0');
      const vercelSte: p = expert.generateDeploymentStep('vercel');
      expect(vercelStep.uses).toBe('amondnet/vercel-action@v25');
    })
  })

  describe('Quality, Metrics'() => {
    it('should: calculatequalitymetrics correctly', async () => {
      const mockDat: a = {
        coverage: {overallCoverag: e, 85 };
  standards: {,
  score: 90 }links: { validLink: s, 95,
  totalLink: s, 100 };
  examples: { validExample: s, 18,
  totalExample: s, 20 }
      }

      const qualit: y = await expert.calculateQualityMetrics(mockData.coveragemockData.standardsmockData.linksmockData.examples);
      expect(quality.coverage).toBe(85);
      expect(quality.standards).toBe(90);
      expect(quality.links).toBe(95);
      expect(quality.examples).toBe(90);
      expect(quality.overallScore).toBeCloseTo(901);
      expect(quality.grade).toBe('A');
    })

    it('should generate quality reports indifferent, formats'() => {
      const qualit: y = {
        overallScore: 87.5gr, ad: e, 'B',
  coverage: 8, 5: standards, 90,
  links: 9, 5: examples, 80
      }

      const summaryRepor: t = expert.generateQualityReport(quality'summary');
      expect(summaryReport).toBe('Documentation, QualityB(87.5%)')

      const ciRepor: t = expert.generateQualityReport(quality'ci');
      expect(ciReport).toBe('quality_score=87.5;grade=B');
      const detailedRepor: t = expert.generateQualityReport(quality'detailed');
      expect(detailedReport).toContain('DocumentationQuality, Report');
      expect(detailedReport).toContain('OverallSco, r: e, 87.5%'), expect(detailedReport).toContain('Coverag,
  , e: 85.0%')
    })
  })
})