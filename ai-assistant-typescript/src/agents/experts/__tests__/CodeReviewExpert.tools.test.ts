// Direct tool tests for CodeReviewExpert without BaseAgent dependencies

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
const CodeReviewExpert = jest.requireActual('../CodeReviewExpert').CodeReviewExpert

describe('CodeReviewExpert Tools Direct Testing', () => {
  let expert: any

  beforeEach(() => {
    // Create expert without calling BaseAgent constructor
    expert = Object.create(CodeReviewExpert.prototype)
    
    // Manually set the required properties
    expert.config = {
      id: 'test-expert',
      name: 'Test Expert',
      version: '1.0.0'
    }
  })

  describe('Tool Method Direct Calls', () => {
    it('should execute automated code analyzer directly', async () => {
      const params = {
        source_path: './src',
        analysis_type: 'full',
        language: 'typescript',
        rule_sets: ['@typescript-eslint/recommended', 'airbnb-base'],
        exclude_patterns: ['node_modules', 'dist'],
        fix_automatically: false
      }

      const result = await expert.executeAutomatedCodeAnalyzer(params)

      expect(result).toBeDefined()
      expect(result.success).toBe(true)
      expect(result.retries).toBe(0)
      expect(result.data).toBeDefined()
      expect(result.data.analysis_type).toBe('full')
      expect(result.data.results).toBeDefined()
      expect(result.data.results.eslint).toBeDefined()
      expect(result.data.results.sonarqube).toBeDefined()
      expect(result.data.results.typescript).toBeDefined()
      expect(result.data.configurations).toBeDefined()
      expect(result.data.quality_score).toEqual(expect.any(Number))
      expect(result.metadata.language).toBe('typescript')
      expect(result.metadata.analysis_type).toBe('full')
    })

    it('should execute security vulnerability scanner directly', async () => {
      const params = {
        source_path: './src',
        scanners: ['snyk', 'semgrep', 'codeql'],
        severity_levels: ['critical', 'high', 'medium'],
        include_dependencies: true,
        auto_fix: true,
        output_format: 'json'
      }

      const result = await expert.executeSecurityVulnerabilityScanner(params)

      expect(result).toBeDefined()
      expect(result.success).toBe(true)
      expect(result.retries).toBe(0)
      expect(result.data).toBeDefined()
      expect(result.data.scan_results).toBeDefined()
      expect(result.data.scan_results.snyk).toBeDefined()
      expect(result.data.scan_results.semgrep).toBeDefined()
      expect(result.data.scan_results.codeql).toBeDefined()
      expect(result.data.auto_fix_suggestions).toBeDefined()
      expect(result.data.summary.total_vulnerabilities).toEqual(expect.any(Number))
      expect(result.metadata.scanners_used).toEqual(['snyk', 'semgrep', 'codeql'])
      expect(result.metadata.auto_fixable).toEqual(expect.any(Number))
    })

    it('should execute code quality metrics calculator directly', async () => {
      const params = {
        source_path: './src',
        metrics_types: ['complexity', 'maintainability', 'coverage', 'duplication', 'debt'],
        thresholds: {
          complexity: 10,
          maintainability: 70,
          coverage: 80,
          duplication: 5,
          debt_ratio: 15
        },
        report_format: 'detailed',
        include_suggestions: true
      }

      const result = await expert.executeCodeQualityMetricsCalculator(params)

      expect(result).toBeDefined()
      expect(result.success).toBe(true)
      expect(result.retries).toBe(0)
      expect(result.data).toBeDefined()
      expect(result.data.metrics).toBeDefined()
      expect(result.data.metrics.complexity).toBeDefined()
      expect(result.data.metrics.maintainability).toBeDefined()
      expect(result.data.metrics.coverage).toBeDefined()
      expect(result.data.quality_gates).toBeDefined()
      expect(result.data.overall_score).toEqual(expect.any(Number))
      expect(result.data.suggestions).toEqual(expect.any(Array))
      expect(result.metadata.metrics_calculated).toEqual(params.metrics_types)
    })

    it('should execute pull request reviewer directly', async () => {
      const params = {
        repository_url: 'https://github.com/user/repo',
        pr_number: '123',
        review_scope: 'full',
        quality_gates: {
          min_coverage: 80,
          max_complexity: 10,
          no_security_issues: true,
          no_lint_errors: true
        },
        auto_approve: false,
        ci_integration: 'github-actions'
      }

      const result = await expert.executePullRequestReviewer(params)

      expect(result).toBeDefined()
      expect(result.success).toBe(true)
      expect(result.retries).toBe(0)
      expect(result.data).toBeDefined()
      expect(result.data.pr_analysis).toBeDefined()
      expect(result.data.quality_gates).toBeDefined()
      expect(result.data.quality_gates.gates).toBeDefined()
      expect(result.data.ci_workflow).toBeDefined()
      expect(result.data.auto_approval).toBeDefined()
      expect(result.metadata.repository_url).toBe('https://github.com/user/repo')
      expect(result.metadata.review_scope).toBe('full')
    })

    it('should execute code style enforcer directly', async () => {
      const params = {
        source_path: './src',
        style_guide: 'airbnb',
        formatting_tools: ['prettier', 'eslint'],
        pre_commit_hooks: true,
        ci_enforcement: true,
        fix_on_save: true,
        custom_rules: {
          'max-len': ['error', { code: 120 }]
        }
      }

      const result = await expert.executeCodeStyleEnforcer(params)

      expect(result).toBeDefined()
      expect(result.success).toBe(true)
      expect(result.retries).toBe(0)
      expect(result.data).toBeDefined()
      expect(result.data.configurations).toBeDefined()
      expect(result.data.configurations.prettier).toBeDefined()
      expect(result.data.configurations.eslint).toBeDefined()
      expect(result.data.pre_commit_hooks).toBeDefined()
      expect(result.data.ci_configuration).toBeDefined()
      expect(result.data.style_analysis).toBeDefined()
      expect(result.metadata.style_guide).toBe('airbnb')
      expect(result.metadata.formatting_tools).toEqual(['prettier', 'eslint'])
    })
  })

  describe('Tool Definition Validation', () => {
    it('should have properly defined tool schemas', () => {
      const toolDefinitions = expert.getToolDefinitions()
      
      expect(toolDefinitions).toHaveLength(5)
      
      const expectedTools = [
        'automated_code_analyzer',
        'security_vulnerability_scanner',
        'code_quality_metrics_calculator',
        'pull_request_reviewer',
        'code_style_enforcer'
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

    it('should have proper parameter validation for code analyzer', () => {
      const toolDefinitions = expert.getToolDefinitions()
      const analyzerTool = toolDefinitions.find((tool: any) => tool.name === 'automated_code_analyzer')
      
      expect(analyzerTool.parameters.properties.analysis_type.enum).toEqual(['full', 'incremental', 'security-focused', 'performance-focused'])
      expect(analyzerTool.parameters.properties.language.enum).toEqual(['typescript', 'javascript', 'python', 'go'])
      expect(analyzerTool.parameters.required).toEqual(['source_path', 'language'])
    })

    it('should have proper parameter validation for security scanner', () => {
      const toolDefinitions = expert.getToolDefinitions()
      const scannerTool = toolDefinitions.find((tool: any) => tool.name === 'security_vulnerability_scanner')
      
      expect(scannerTool.parameters.properties.scanners.items.enum).toEqual(['snyk', 'semgrep', 'codeql', 'safety', 'bandit'])
      expect(scannerTool.parameters.properties.severity_levels.items.enum).toEqual(['critical', 'high', 'medium', 'low', 'info'])
      expect(scannerTool.parameters.required).toEqual(['source_path', 'scanners'])
    })
  })

  describe('Error Handling', () => {
    it('should handle code analyzer with missing source path', async () => {
      const params = {
        source_path: '',
        language: 'typescript'
      }

      const result = await expert.executeAutomatedCodeAnalyzer(params)

      expect(result.success).toBe(false)
      expect(result.retries).toBe(0)
      expect(result.error).toContain('Source path is required')
    })

    it('should handle security scanner with missing parameters', async () => {
      const params = {
        source_path: './src',
        scanners: []
      }

      const result = await expert.executeSecurityVulnerabilityScanner(params)

      expect(result.success).toBe(false)
      expect(result.retries).toBe(0)
      expect(result.error).toContain('at least one scanner are required')
    })

    it('should handle quality metrics with missing metrics types', async () => {
      const params = {
        source_path: './src',
        metrics_types: []
      }

      const result = await expert.executeCodeQualityMetricsCalculator(params)

      expect(result.success).toBe(false)
      expect(result.retries).toBe(0)
      expect(result.error).toContain('metrics types are required')
    })

    it('should handle PR reviewer with missing required params', async () => {
      const params = {
        repository_url: '',
        review_scope: 'full'
      }

      const result = await expert.executePullRequestReviewer(params)

      expect(result.success).toBe(false)
      expect(result.retries).toBe(0)
      expect(result.error).toContain('Repository URL and review scope are required')
    })

    it('should handle style enforcer with missing style guide', async () => {
      const params = {
        source_path: './src',
        style_guide: ''
      }

      const result = await expert.executeCodeStyleEnforcer(params)

      expect(result.success).toBe(false)
      expect(result.retries).toBe(0)
      expect(result.error).toContain('style guide are required')
    })
  })

  describe('Helper Method Testing', () => {
    it('should generate correct ESLint configuration', async () => {
      const params = {
        language: 'typescript',
        rule_sets: ['airbnb-base'],
        exclude_patterns: ['node_modules', 'dist']
      }

      const config = await expert.generateESLintConfig(params)
      
      expect(config.extends).toContain('@typescript-eslint/recommended')
      expect(config.extends).toContain('airbnb-base')
      expect(config.parser).toBe('@typescript-eslint/parser')
      expect(config.ignorePatterns).toEqual(['node_modules', 'dist'])
      expect(config.rules).toBeDefined()
    })

    it('should generate correct SonarQube configuration', async () => {
      const params = {
        projectKey: 'test-project',
        sources: './src',
        language: 'typescript'
      }

      const config = await expert.generateSonarConfig(params)
      
      expect(config['sonar.projectKey']).toBe('test-project')
      expect(config['sonar.sources']).toBe('./src')
      expect(config['sonar.sourceEncoding']).toBe('UTF-8')
      expect(config['sonar.typescript.lcov.reportPaths']).toBeDefined()
    })

    it('should calculate overall quality score correctly', () => {
      const results = {
        eslint: { errors: 5, warnings: 10 },
        sonarqube: { maintainability_rating: 'B' },
        typescript: { compilation_errors: 0 }
      }

      const score = expert.calculateOverallQualityScore(results)
      
      expect(score).toEqual(expect.any(Number))
      expect(score).toBeGreaterThanOrEqual(0)
      expect(score).toBeLessThanOrEqual(100)
    })

    it('should generate analysis recommendations', () => {
      const results = {
        eslint: { errors: 5, warnings: 10 },
        sonarqube: { vulnerabilities: 2, coverage: 65 },
        typescript: { unused_exports: 8 }
      }

      const recommendations = expert.generateAnalysisRecommendations(results, 'full')
      
      expect(recommendations).toEqual(expect.any(Array))
      expect(recommendations.some(rec => rec.includes('Fix 5 ESLint errors'))).toBe(true)
      expect(recommendations.some(rec => rec.includes('Address 2 security vulnerabilities'))).toBe(true)
      expect(recommendations.some(rec => rec.includes('Increase test coverage'))).toBe(true)
    })

    it('should filter security results by severity', () => {
      const results = {
        snyk: {
          vulnerabilities: [
            { severity: 'critical', title: 'Critical Issue' },
            { severity: 'low', title: 'Low Issue' }
          ]
        }
      }

      const filtered = expert.filterBySeverity(results, ['critical', 'high'])
      
      expect(filtered.snyk.vulnerabilities).toHaveLength(1)
      expect(filtered.snyk.vulnerabilities[0].severity).toBe('critical')
    })

    it('should count vulnerabilities by severity', () => {
      const results = {
        snyk: {
          vulnerabilities: [
            { severity: 'high' },
            { severity: 'medium' }
          ]
        },
        semgrep: {
          findings: [
            { severity: 'high' }
          ]
        }
      }

      const highCount = expert.countBySeverity(results, 'high')
      const mediumCount = expert.countBySeverity(results, 'medium')
      
      expect(highCount).toBe(2)
      expect(mediumCount).toBe(1)
    })
  })

  describe('Configuration Generation', () => {
    it('should generate style guide configurations correctly', async () => {
      const params = {
        style_guide: 'airbnb',
        formatting_tools: ['prettier', 'eslint'],
        custom_rules: { 'max-len': ['error', { code: 120 }] }
      }

      const configs = await expert.generateStyleConfigurations(params)
      
      expect(configs.prettier).toBeDefined()
      expect(configs.prettier.semi).toBe(true)
      expect(configs.prettier.singleQuote).toBe(true)
      
      expect(configs.eslint).toBeDefined()
      expect(configs.eslint.extends).toContain('@typescript-eslint/recommended')
      expect(configs.eslint.rules['max-len']).toEqual(['error', { code: 120 }])
    })

    it('should generate pre-commit hooks configuration', async () => {
      const tools = ['prettier', 'eslint']
      const config = await expert.generatePreCommitHooks(tools)
      
      expect(config.repos).toHaveLength(1)
      expect(config.repos[0].hooks).toHaveLength(2)
      
      const prettierHook = config.repos[0].hooks.find(h => h.id === 'prettier')
      const eslintHook = config.repos[0].hooks.find(h => h.id === 'eslint')
      
      expect(prettierHook).toBeDefined()
      expect(eslintHook).toBeDefined()
    })

    it('should generate CI configuration for style checks', async () => {
      const tools = ['prettier', 'eslint']
      const config = await expert.generateStyleCIConfig(tools)
      
      expect(config.name).toBe('Style Check')
      expect(config.on).toEqual(['push', 'pull_request'])
      expect(config.jobs.style.steps).toEqual(expect.any(Array))
      
      const prettierStep = config.jobs.style.steps.find(step => step.run?.includes('prettier'))
      const eslintStep = config.jobs.style.steps.find(step => step.run?.includes('eslint'))
      
      expect(prettierStep).toBeDefined()
      expect(eslintStep).toBeDefined()
    })

    it('should generate IDE configuration', async () => {
      const tools = ['prettier', 'eslint']
      const config = await expert.generateIDEConfig(tools)
      
      expect(config.vscode).toBeDefined()
      expect(config.vscode.settings['editor.formatOnSave']).toBe(true)
      expect(config.vscode.settings['editor.defaultFormatter']).toBe('esbenp.prettier-vscode')
      expect(config.vscode.settings['editor.codeActionsOnSave']['source.fixAll.eslint']).toBe(true)
      
      expect(config.webstorm).toBeDefined()
      expect(config.webstorm['prettier-on-save']).toBe(true)
      expect(config.webstorm['eslint-on-save']).toBe(true)
    })
  })

  describe('Quality Gates and Metrics', () => {
    it('should evaluate quality gates correctly', () => {
      const metrics = {
        complexity: { cyclomatic_complexity: { average: 8 } },
        coverage: { line_coverage: 85 },
        duplication: { duplication_ratio: 3 }
      }
      
      const thresholds = {
        complexity: 10,
        coverage: 80,
        duplication: 5
      }

      const gates = expert.evaluateQualityGates(metrics, thresholds)
      
      expect(gates.gates.complexity_gate).toBe(true)
      expect(gates.gates.coverage_gate).toBe(true)
      expect(gates.gates.duplication_gate).toBe(true)
      expect(gates.all_passed).toBe(true)
      expect(gates.passed_gates).toBe(5) // All defined gates
    })

    it('should calculate quality score based on metrics', () => {
      const metrics = {
        complexity: { cyclomatic_complexity: { average: 15 } },
        coverage: { line_coverage: 65 },
        duplication: { duplication_ratio: 8 }
      }
      
      const thresholds = {
        complexity: 10,
        coverage: 80,
        duplication: 5
      }

      const score = expert.calculateQualityScore(metrics, thresholds)
      
      expect(score).toEqual(expect.any(Number))
      expect(score).toBeLessThan(100) // Should be penalized for failing thresholds
    })

    it('should generate quality improvement suggestions', () => {
      const metrics = {}
      const gates = {
        gates: {
          complexity_gate: false,
          coverage_gate: false,
          duplication_gate: false
        }
      }

      const suggestions = expert.generateQualityImprovementSuggestions(metrics, gates)
      
      expect(suggestions).toEqual(expect.any(Array))
      expect(suggestions.some(s => s.includes('complex functions'))).toBe(true)
      expect(suggestions.some(s => s.includes('unit tests'))).toBe(true)
      expect(suggestions.some(s => s.includes('common code'))).toBe(true)
    })
  })

  describe('PR Review and Workflow Generation', () => {
    it('should generate PR review comments based on analysis', () => {
      const analysis = {
        lint_errors: 5,
        lines_added: 350
      }
      
      const gates = {
        lint_gate: false,
        coverage_gate: false,
        size_gate: false
      }

      const comments = expert.generatePRReviewComments(analysis, gates, {})
      
      expect(comments).toEqual(expect.any(Array))
      expect(comments.some(c => c.includes('ESLint errors'))).toBe(true)
      expect(comments.some(c => c.includes('Test coverage'))).toBe(true)
      expect(comments.some(c => c.includes('Large PR'))).toBe(true)
    })

    it('should generate GitHub Actions workflow', async () => {
      const workflow = await expert.generateCIWorkflow('github-actions', {})
      
      expect(workflow).toBeDefined()
      expect(workflow.name).toBe('Code Review')
      expect(workflow.on).toEqual(['pull_request'])
      expect(workflow.jobs.review).toBeDefined()
      expect(workflow.jobs.review.steps).toEqual(expect.any(Array))
    })

    it('should generate notification payload', () => {
      const analysis = { files_changed: 5 }
      const gates = { lint_gate: true, coverage_gate: false }
      const channels = ['slack', 'email']

      const payload = expert.generateNotificationPayload(analysis, gates, channels)
      
      expect(payload.message).toContain('gates passed')
      expect(payload.channels).toEqual(channels)
      expect(payload.details).toBe(analysis)
    })
  })
})