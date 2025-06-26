import { CodeReviewExpert } from '../CodeReviewExpert'
import { logger } from '@/infrastructure/logging/logger'

// Mock the logger to avoid console output during tests
jest.mock('@/infrastructure/logging/logger', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  }
}))

// Mock the BaseAgent class to avoid initialization issues
jest.mock('@/agents/base/BaseAgent', () => ({
  BaseAgent: class MockBaseAgent {
    protected config: any
    protected tools: any = {}
    protected status = 'ready'
    
    constructor() {
      // Empty constructor to avoid initialization issues
    }
    
    createAgentTools() {
      return {
        automated_code_analyzer: {},
        security_vulnerability_scanner: {},
        code_quality_metrics_calculator: {},
        pull_request_reviewer: {},
        code_style_enforcer: {}
      }
    }
  }
}))

// Mock Mastra core
jest.mock('@mastra/core', () => ({
  createTool: jest.fn(),
  Agent: jest.fn()
}))

describe('CodeReviewExpert Tools', () => {
  let codeReviewExpert: CodeReviewExpert
  const mockProjectPath = '/mock/project/path'

  beforeEach(() => {
    codeReviewExpert = new CodeReviewExpert()
    jest.clearAllMocks()
  })

  describe('Automated Code Analyzer Tool', () => {
    it('should perform comprehensive code analysis with enterprise configuration', async () => {
      const params = {
        project_path: mockProjectPath,
        analysis_scope: 'full' as const,
        eslint_config: 'enterprise' as const,
        sonarqube_integration: true,
        typescript_strict: true,
        include_performance: true,
        generate_report: true
      }

      const result = await codeReviewExpert['executeAutomatedCodeAnalyzer'](params)

      expect(result.success).toBe(true)
      expect(result.data).toHaveProperty('analysis_summary')
      expect(result.data).toHaveProperty('eslint_results')
      expect(result.data).toHaveProperty('typescript_results')
      expect(result.data).toHaveProperty('sonarqube_results')
      expect(result.data).toHaveProperty('performance_analysis')
      expect(result.data).toHaveProperty('configurations')
      expect(result.data).toHaveProperty('recommendations')
      expect(result.data).toHaveProperty('setup_instructions')
      expect(result.data).toHaveProperty('ci_integration')

      expect(result.data.configurations).toHaveProperty('eslint')
      expect(result.data.configurations).toHaveProperty('typescript')
      expect(result.data.configurations).toHaveProperty('sonarqube')

      expect(result.metadata).toHaveProperty('project_path', params.project_path)
      expect(result.metadata).toHaveProperty('analysis_scope', params.analysis_scope)

      expect(logger.info).toHaveBeenCalledWith('Executing automated code analysis', { params })
    })

    it('should handle analysis without SonarQube integration', async () => {
      const params = {
        project_path: mockProjectPath,
        analysis_scope: 'changed-files' as const,
        sonarqube_integration: false,
        include_performance: false
      }

      const result = await codeReviewExpert['executeAutomatedCodeAnalyzer'](params)

      expect(result.success).toBe(true)
      expect(result.data.sonarqube_results).toBeNull()
      expect(result.data.performance_analysis).toBeNull()
      expect(result.data.configurations.sonarqube).toBeNull()
    })

    it('should generate appropriate ESLint configurations for different levels', async () => {
      const enterpriseConfig = await codeReviewExpert['generateESLintConfig']('enterprise')
      const strictConfig = await codeReviewExpert['generateESLintConfig']('strict')
      const recommendedConfig = await codeReviewExpert['generateESLintConfig']('recommended')

      // Enterprise should have the most strict rules
      expect(enterpriseConfig.rules['@typescript-eslint/explicit-function-return-type']).toBe('error')
      expect(enterpriseConfig.rules['complexity']).toEqual(['error', 10])

      // All configs should extend prettier to avoid formatting conflicts
      expect(enterpriseConfig.extends).toContain('prettier')
      expect(strictConfig.extends).toContain('prettier')
      expect(recommendedConfig.extends).toContain('prettier')

      // Verify security plugin is included
      expect(enterpriseConfig.plugins).toContain('security')
    })
  })

  describe('Security Vulnerability Scanner Tool', () => {
    it('should perform comprehensive security scan with multiple scanners', async () => {
      const params = {
        project_path: mockProjectPath,
        scan_type: 'full' as const,
        severity_threshold: 'medium' as const,
        scanners: ['snyk', 'semgrep', 'npm-audit'] as const,
        include_licenses: true,
        auto_fix: true
      }

      const result = await codeReviewExpert['executeSecurityVulnerabilityScanner'](params)

      expect(result.success).toBe(true)
      expect(result.data).toHaveProperty('scan_summary')
      expect(result.data).toHaveProperty('vulnerability_details')
      expect(result.data).toHaveProperty('scanner_results')
      expect(result.data).toHaveProperty('license_compliance')
      expect(result.data).toHaveProperty('auto_fix_suggestions')
      expect(result.data).toHaveProperty('remediation_guide')

      expect(result.data.scan_summary).toHaveProperty('total_vulnerabilities')
      expect(result.data.scan_summary).toHaveProperty('critical')
      expect(result.data.scan_summary).toHaveProperty('scanners_used', params.scanners)

      expect(result.data.scanner_results).toHaveProperty('snyk')
      expect(result.data.scanner_results).toHaveProperty('semgrep')
      expect(result.data.scanner_results).toHaveProperty('npm_audit')

      expect(result.metadata).toHaveProperty('total_vulnerabilities')
      expect(result.metadata).toHaveProperty('critical_vulnerabilities')

      expect(logger.info).toHaveBeenCalledWith('Executing security vulnerability scan', { params })
    })

    it('should handle code-only security scans', async () => {
      const params = {
        project_path: mockProjectPath,
        scan_type: 'code' as const,
        scanners: ['semgrep', 'codeql'] as const,
        include_licenses: false
      }

      const result = await codeReviewExpert['executeSecurityVulnerabilityScanner'](params)

      expect(result.success).toBe(true)
      expect(result.data.license_compliance).toBeNull()
      expect(result.data.scanner_results.snyk).toBeNull()
      expect(result.data.scanner_results.semgrep).toBeTruthy()
      expect(result.data.scanner_results.codeql).toBeTruthy()
    })

    it('should generate security gates configuration', () => {
      const securityGates = codeReviewExpert['generateSecurityGatesConfig']()

      expect(securityGates).toHaveProperty('block_on_critical', true)
      expect(securityGates).toHaveProperty('block_on_high', true)
      expect(securityGates).toHaveProperty('license_compliance', true)
      expect(securityGates).toHaveProperty('fail_build', true)
    })
  })

  describe('Code Quality Metrics Calculator Tool', () => {
    it('should calculate comprehensive quality metrics', async () => {
      const params = {
        project_path: mockProjectPath,
        metrics_suite: 'enterprise' as const,
        complexity_threshold: 10,
        maintainability_threshold: 70,
        include_history: true,
        report_format: 'json' as const,
        baseline_comparison: true
      }

      const result = await codeReviewExpert['executeCodeQualityMetricsCalculator'](params)

      expect(result.success).toBe(true)
      expect(result.data).toHaveProperty('metrics_summary')
      expect(result.data).toHaveProperty('complexity_metrics')
      expect(result.data).toHaveProperty('maintainability_metrics')
      expect(result.data).toHaveProperty('size_metrics')
      expect(result.data).toHaveProperty('duplication_metrics')
      expect(result.data).toHaveProperty('coverage_metrics')
      expect(result.data).toHaveProperty('trend_analysis')
      expect(result.data).toHaveProperty('baseline_comparison')
      expect(result.data).toHaveProperty('quality_gates')
      expect(result.data).toHaveProperty('recommendations')

      // Verify cyclomatic complexity metrics
      expect(result.data.complexity_metrics.cyclomatic_complexity).toHaveProperty('average')
      expect(result.data.complexity_metrics.cyclomatic_complexity).toHaveProperty('maximum')
      expect(result.data.complexity_metrics.cyclomatic_complexity).toHaveProperty('threshold', 10)
      expect(result.data.complexity_metrics.cyclomatic_complexity).toHaveProperty('violations')

      // Verify maintainability metrics
      expect(result.data.maintainability_metrics.maintainability_index).toHaveProperty('average')
      expect(result.data.maintainability_metrics.maintainability_index).toHaveProperty('threshold', 70)
      expect(result.data.maintainability_metrics.technical_debt).toHaveProperty('ratio')

      expect(result.metadata).toHaveProperty('overall_score')
      expect(result.metadata).toHaveProperty('quality_grade')

      expect(logger.info).toHaveBeenCalledWith('Calculating code quality metrics', { params })
    })

    it('should calculate quality grade correctly', () => {
      expect(codeReviewExpert['calculateQualityGrade'](95)).toBe('A')
      expect(codeReviewExpert['calculateQualityGrade'](85)).toBe('B')
      expect(codeReviewExpert['calculateQualityGrade'](75)).toBe('C')
      expect(codeReviewExpert['calculateQualityGrade'](65)).toBe('D')
      expect(codeReviewExpert['calculateQualityGrade'](55)).toBe('F')
    })

    it('should generate different report formats', () => {
      const mockMetrics = { overall_score: 85.5, cyclomatic_complexity: { average: 4.2 }, coverage: { line_coverage: 87.3 } }

      const jsonReport = codeReviewExpert['generateQualityReport'](mockMetrics, 'json')
      const markdownReport = codeReviewExpert['generateQualityReport'](mockMetrics, 'markdown')
      const sonarReport = codeReviewExpert['generateQualityReport'](mockMetrics, 'sonar')
      const csvReport = codeReviewExpert['generateQualityReport'](mockMetrics, 'csv')

      expect(typeof jsonReport).toBe('string')
      expect(markdownReport).toContain('# Code Quality Report')
      expect(sonarReport).toContain('sonar.quality.score=85.5')
      expect(csvReport).toContain('metric,value')
    })
  })

  describe('Pull Request Reviewer Tool', () => {
    it('should perform comprehensive pull request review', async () => {
      const params = {
        repository_url: 'https://github.com/test/repo',
        pr_number: 123,
        review_level: 'comprehensive' as const,
        auto_approve: false,
        quality_gates: ['tests', 'coverage', 'security'] as const,
        notification_channels: ['slack', 'email'],
        integration_tests: true,
        performance_benchmark: true
      }

      const result = await codeReviewExpert['executePullRequestReviewer'](params)

      expect(result.success).toBe(true)
      expect(result.data).toHaveProperty('pr_summary')
      expect(result.data).toHaveProperty('analysis_results')
      expect(result.data).toHaveProperty('review_decision')
      expect(result.data).toHaveProperty('feedback_summary')
      expect(result.data).toHaveProperty('automation_config')
      expect(result.data).toHaveProperty('next_steps')

      expect(result.data.pr_summary).toHaveProperty('repository', params.repository_url)
      expect(result.data.pr_summary).toHaveProperty('pr_number', params.pr_number)

      expect(result.data.analysis_results).toHaveProperty('quality_checks')
      expect(result.data.analysis_results).toHaveProperty('security_checks')
      expect(result.data.analysis_results).toHaveProperty('performance_checks')

      expect(result.data.review_decision).toHaveProperty('recommendation')
      expect(result.data.review_decision).toHaveProperty('auto_approved')
      expect(result.data.review_decision).toHaveProperty('confidence_score')

      expect(result.metadata).toHaveProperty('repository_url', params.repository_url)
      expect(result.metadata).toHaveProperty('pr_number', params.pr_number)

      expect(logger.info).toHaveBeenCalledWith('Executing pull request review', { params })
    })

    it('should handle basic pull request review without performance benchmarks', async () => {
      const params = {
        repository_url: 'https://github.com/test/repo',
        pr_number: 456,
        review_level: 'basic' as const,
        performance_benchmark: false
      }

      const result = await codeReviewExpert['executePullRequestReviewer'](params)

      expect(result.success).toBe(true)
      expect(result.data.analysis_results.performance_checks).toBeNull()
    })

    it('should generate GitHub Actions workflow for PR automation', () => {
      const workflow = codeReviewExpert['generatePRWorkflow']({})

      expect(workflow).toHaveProperty('name', 'PR Review Automation')
      expect(workflow).toHaveProperty('on')
      expect(workflow.on).toHaveProperty('pull_request')
      expect(workflow).toHaveProperty('jobs')
      expect(workflow.jobs).toHaveProperty('review')
    })
  })

  describe('Code Style Enforcer Tool', () => {
    it('should enforce enterprise code style standards', async () => {
      const params = {
        project_path: mockProjectPath,
        style_guide: 'enterprise-custom' as const,
        auto_fix: true,
        file_extensions: ['.ts', '.tsx', '.js', '.jsx'],
        pre_commit_setup: true,
        ci_integration: true
      }

      const result = await codeReviewExpert['executeCodeStyleEnforcer'](params)

      expect(result.success).toBe(true)
      expect(result.data).toHaveProperty('style_analysis')
      expect(result.data).toHaveProperty('configurations')
      expect(result.data).toHaveProperty('auto_fix_results')
      expect(result.data).toHaveProperty('pre_commit_setup')
      expect(result.data).toHaveProperty('ci_integration')
      expect(result.data).toHaveProperty('setup_instructions')
      expect(result.data).toHaveProperty('package_json_scripts')
      expect(result.data).toHaveProperty('best_practices')

      expect(result.data.configurations).toHaveProperty('prettier')
      expect(result.data.configurations).toHaveProperty('eslint')
      expect(result.data.configurations).toHaveProperty('ignore_files')
      expect(result.data.configurations).toHaveProperty('editor_config')

      expect(result.data.style_analysis).toHaveProperty('compliance_score')
      expect(result.data.style_analysis).toHaveProperty('total_files')
      expect(result.data.style_analysis).toHaveProperty('total_issues')

      expect(result.metadata).toHaveProperty('compliance_score')

      expect(logger.info).toHaveBeenCalledWith('Executing code style enforcement', { params })
    })

    it('should generate Prettier configurations for different style guides', async () => {
      const airbnbConfig = await codeReviewExpert['generatePrettierConfig']('airbnb')
      const googleConfig = await codeReviewExpert['generatePrettierConfig']('google')
      const enterpriseConfig = await codeReviewExpert['generatePrettierConfig']('enterprise-custom')

      expect(airbnbConfig).toHaveProperty('singleQuote', true)
      expect(airbnbConfig).toHaveProperty('trailingComma', 'all')

      expect(googleConfig).toHaveProperty('singleQuote', false)
      expect(googleConfig).toHaveProperty('printWidth', 80)

      expect(enterpriseConfig).toHaveProperty('printWidth', 120)
      expect(enterpriseConfig).toHaveProperty('tabWidth', 2)
    })

    it('should generate ESLint config that excludes formatting rules', async () => {
      const eslintConfig = await codeReviewExpert['generateESLintStyleConfig']('standard')

      expect(eslintConfig.extends).toContain('prettier')
      expect(eslintConfig.rules).toHaveProperty('@typescript-eslint/no-unused-vars', 'error')
      expect(eslintConfig.rules).toHaveProperty('prefer-const', 'error')
      expect(eslintConfig.rules).toHaveProperty('no-var', 'error')
    })

    it('should setup pre-commit hooks configuration', async () => {
      const preCommitConfig = await codeReviewExpert['setupPreCommitHooks'](mockProjectPath)

      expect(preCommitConfig).toHaveProperty('husky_config')
      expect(preCommitConfig).toHaveProperty('lint_staged_config')
      expect(preCommitConfig).toHaveProperty('package_json_additions')

      expect(preCommitConfig.husky_config).toHaveProperty('pre-commit', 'lint-staged')
      expect(preCommitConfig.lint_staged_config['*.{ts,tsx,js,jsx}']).toEqual(['prettier --write', 'eslint --fix'])
      expect(preCommitConfig.lint_staged_config['*.{json,md}']).toEqual(['prettier --write'])
      expect(preCommitConfig.package_json_additions.scripts).toHaveProperty('prepare', 'husky install')
    })

    it('should generate proper .editorconfig', () => {
      const editorConfig = codeReviewExpert['generateEditorConfig']('enterprise-custom')

      expect(editorConfig).toContain('root = true')
      expect(editorConfig).toContain('charset = utf-8')
      expect(editorConfig).toContain('end_of_line = lf')
      expect(editorConfig).toContain('indent_style = space')
      expect(editorConfig).toContain('indent_size = 2')
    })
  })

  describe('Agent Configuration', () => {
    it('should have correct agent configuration', () => {
      expect(codeReviewExpert.config.id).toBe('code-review-expert')
      expect(codeReviewExpert.config.name).toBe('Code Review Expert')
      expect(codeReviewExpert.config.version).toBe('1.0.0')
      expect(codeReviewExpert.config.temperature).toBe(0.1)
      expect(codeReviewExpert.config.priority).toBe('high')
      
      expect(codeReviewExpert.config.specialties).toContain('static_code_analysis')
      expect(codeReviewExpert.config.specialties).toContain('security_vulnerability_scanning')
      expect(codeReviewExpert.config.specialties).toContain('code_quality_metrics')
      expect(codeReviewExpert.config.specialties).toContain('pull_request_automation')
      expect(codeReviewExpert.config.specialties).toContain('code_style_enforcement')

      expect(codeReviewExpert.config.capabilities).toContain('ESLint & SonarQube Integration')
      expect(codeReviewExpert.config.capabilities).toContain('Security Scanning (Snyk, Semgrep, CodeQL)')
      expect(codeReviewExpert.config.capabilities).toContain('Quality Metrics (Cyclomatic Complexity, Maintainability)')
      expect(codeReviewExpert.config.capabilities).toContain('GitHub Actions PR Automation')
      expect(codeReviewExpert.config.capabilities).toContain('Prettier & Code Style Enforcement')
      
      expect(codeReviewExpert.config.tags).toContain('code-review')
      expect(codeReviewExpert.config.tags).toContain('static-analysis')
      expect(codeReviewExpert.config.tags).toContain('security')
      expect(codeReviewExpert.config.tags).toContain('quality')
    })

    it('should have correct metadata configuration', () => {
      expect(codeReviewExpert.config.metadata.supportedLanguages).toContain('TypeScript')
      expect(codeReviewExpert.config.metadata.supportedLanguages).toContain('JavaScript')
      expect(codeReviewExpert.config.metadata.supportedLanguages).toContain('React')
      expect(codeReviewExpert.config.metadata.supportedLanguages).toContain('Node.js')

      expect(codeReviewExpert.config.metadata.analysisTools).toContain('ESLint')
      expect(codeReviewExpert.config.metadata.analysisTools).toContain('SonarQube')
      expect(codeReviewExpert.config.metadata.analysisTools).toContain('Snyk')
      expect(codeReviewExpert.config.metadata.analysisTools).toContain('Semgrep')
      expect(codeReviewExpert.config.metadata.analysisTools).toContain('CodeQL')
      expect(codeReviewExpert.config.metadata.analysisTools).toContain('Prettier')

      expect(codeReviewExpert.config.metadata.cicdPlatforms).toContain('GitHub Actions')
      expect(codeReviewExpert.config.metadata.cicdPlatforms).toContain('GitLab CI')
      expect(codeReviewExpert.config.metadata.cicdPlatforms).toContain('Azure DevOps')
      expect(codeReviewExpert.config.metadata.cicdPlatforms).toContain('Jenkins')

      expect(codeReviewExpert.config.metadata.qualityMetrics).toContain('Cyclomatic Complexity')
      expect(codeReviewExpert.config.metadata.qualityMetrics).toContain('Maintainability Index')
      expect(codeReviewExpert.config.metadata.qualityMetrics).toContain('Code Coverage')
      expect(codeReviewExpert.config.metadata.qualityMetrics).toContain('Technical Debt')
    })

    it('should initialize with all required tools', () => {
      expect(codeReviewExpert.config.tools).toHaveLength(5)
      expect(codeReviewExpert.config.tools).toContain('automated_code_analyzer')
      expect(codeReviewExpert.config.tools).toContain('security_vulnerability_scanner')
      expect(codeReviewExpert.config.tools).toContain('code_quality_metrics_calculator')
      expect(codeReviewExpert.config.tools).toContain('pull_request_reviewer')
      expect(codeReviewExpert.config.tools).toContain('code_style_enforcer')
    })
  })

  describe('Error Handling', () => {
    it('should handle errors gracefully in code analysis', async () => {
      // Mock the helper method to throw an error
      const originalMethod = codeReviewExpert['performCodeAnalysis']
      codeReviewExpert['performCodeAnalysis'] = jest.fn().mockRejectedValue(new Error('Mocked analysis error'))

      const params = {
        project_path: '/mock/project/path',
        analysis_scope: 'full' as const
      }

      const result = await codeReviewExpert['executeAutomatedCodeAnalyzer'](params)

      expect(result.success).toBe(false)
      expect(result.error).toContain('Code analysis failed')
      expect(logger.error).toHaveBeenCalled()

      // Restore original method
      codeReviewExpert['performCodeAnalysis'] = originalMethod
    })

    it('should handle errors gracefully in security scanning', async () => {
      // Mock the helper method to throw an error
      const originalMethod = codeReviewExpert['performSecurityScan']
      codeReviewExpert['performSecurityScan'] = jest.fn().mockRejectedValue(new Error('Mocked security scan error'))

      const params = {
        project_path: '/mock/project/path',
        scan_type: 'full' as const
      }

      const result = await codeReviewExpert['executeSecurityVulnerabilityScanner'](params)

      expect(result.success).toBe(false)
      expect(result.error).toContain('Security scan failed')

      // Restore original method
      codeReviewExpert['performSecurityScan'] = originalMethod
    })
  })
})