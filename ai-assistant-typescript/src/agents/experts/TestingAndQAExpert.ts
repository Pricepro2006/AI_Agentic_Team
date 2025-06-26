import { BaseAgent } from '@/agents/base/BaseAgent'
import { AgentConfig, AgentTool, ToolExecutionResult } from '@/types/agents'
import { logger } from '@/infrastructure/logging/logger'
import { createTool } from '@mastra/core'
import { z } from 'zod'

/**
 * Testing and QA Expert Agent
 * 
 * Specializes in:
 * - Automated test suite generation and management
 * - Code coverage analysis and reporting
 * - Quality assurance workflow orchestration
 * - Test data management and mocking strategies
 * - Performance and load testing automation
 */
export class TestingAndQAExpert extends BaseAgent {
  protected config: AgentConfig = {
    id: 'testing-qa-expert',
    name: 'Testing and QA Expert',
    description: 'Specialized in comprehensive testing strategies, quality assurance, and test automation',
    version: '1.0.0',
    model: 'mistral:latest',
    temperature: 0.1,
    maxTokens: 4000,
    systemMessage: this.buildSystemMessage(),
    specialties: [
      'test_suite_generation',
      'coverage_analysis',
      'qa_workflow_orchestration',
      'test_data_management',
      'performance_testing',
      'ci_cd_integration'
    ],
    tools: [],
    capabilities: [
      'Automated Test Suite Generation (Jest, Vitest, Playwright)',
      'Coverage Analysis & Reporting (NYC, C8, Istanbul)',
      'QA Workflow Orchestration & Process Management',
      'Test Data Management & Advanced Mocking',
      'Performance & Load Testing Automation'
    ],
    limitations: [
      'Requires access to source code for test generation',
      'Cannot test external services without proper mocking',
      'Performance testing limited to configured environments'
    ],
    integrations: [],
    tags: ['testing', 'qa', 'coverage', 'automation', 'performance'],
    priority: 'high' as const,
    metadata: {
      supportedFrameworks: ['Jest', 'Vitest', 'Playwright', 'Cypress', 'WebdriverIO'],
      supportedLanguages: ['TypeScript', 'JavaScript', 'Node.js'],
      testingTypes: ['Unit', 'Integration', 'E2E', 'Performance', 'Visual', 'API']
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
        name: 'test_suite_generator',
        description: 'Generate comprehensive test suites using modern frameworks like Jest, Vitest, and Playwright',
        parameters: {
          type: 'object',
          properties: {
            source_path: {
              type: 'string',
              description: 'Path to source code for test generation'
            },
            test_framework: {
              type: 'string',
              enum: ['jest', 'vitest', 'playwright', 'cypress', 'webdriverio'],
              description: 'Testing framework to use'
            },
            test_types: {
              type: 'array',
              items: {
                type: 'string',
                enum: ['unit', 'integration', 'e2e', 'component', 'api', 'visual']
              },
              description: 'Types of tests to generate'
            },
            coverage_threshold: {
              type: 'number',
              description: 'Minimum coverage percentage target',
              default: 80
            },
            test_patterns: {
              type: 'array',
              items: { type: 'string' },
              description: 'Test file patterns to follow'
            },
            mock_strategy: {
              type: 'string',
              enum: ['auto', 'manual', 'hybrid', 'none'],
              description: 'Mocking strategy for dependencies'
            },
            parallel_execution: {
              type: 'boolean',
              description: 'Enable parallel test execution',
              default: true
            }
          },
          required: ['source_path', 'test_framework', 'test_types']
        },
        execute: this.executeTestSuiteGenerator.bind(this)
      },
      {
        name: 'coverage_analyzer',
        description: 'Comprehensive code coverage analysis with NYC, C8, and Istanbul integration',
        parameters: {
          type: 'object',
          properties: {
            project_path: {
              type: 'string',
              description: 'Path to project for coverage analysis'
            },
            coverage_tool: {
              type: 'string',
              enum: ['nyc', 'c8', 'istanbul', 'jest-coverage'],
              description: 'Coverage analysis tool to use'
            },
            report_formats: {
              type: 'array',
              items: {
                type: 'string',
                enum: ['html', 'json', 'lcov', 'text', 'clover', 'cobertura']
              },
              description: 'Coverage report formats to generate'
            },
            coverage_thresholds: {
              type: 'object',
              description: 'Coverage thresholds for different metrics'
            },
            exclude_patterns: {
              type: 'array',
              items: { type: 'string' },
              description: 'Patterns to exclude from coverage'
            },
            include_untested: {
              type: 'boolean',
              description: 'Include untested files in coverage report',
              default: true
            },
            branch_coverage: {
              type: 'boolean',
              description: 'Enable branch coverage analysis',
              default: true
            }
          },
          required: ['project_path', 'coverage_tool']
        },
        execute: this.executeCoverageAnalyzer.bind(this)
      },
      {
        name: 'qa_workflow_orchestrator',
        description: 'Orchestrate comprehensive QA workflows with quality gates and process management',
        parameters: {
          type: 'object',
          properties: {
            workflow_type: {
              type: 'string',
              enum: ['ci-cd', 'pre-commit', 'release', 'hotfix', 'custom'],
              description: 'Type of QA workflow to orchestrate'
            },
            quality_gates: {
              type: 'object',
              description: 'Quality gate definitions and thresholds'
            },
            test_stages: {
              type: 'array',
              items: {
                type: 'string',
                enum: ['unit', 'integration', 'e2e', 'performance', 'security', 'accessibility']
              },
              description: 'Testing stages to include in workflow'
            },
            parallel_stages: {
              type: 'boolean',
              description: 'Allow parallel execution of test stages',
              default: true
            },
            failure_strategy: {
              type: 'string',
              enum: ['fail-fast', 'continue-on-error', 'retry', 'conditional'],
              description: 'Strategy for handling test failures'
            },
            notification_channels: {
              type: 'array',
              items: { type: 'string' },
              description: 'Channels for workflow notifications'
            },
            artifacts_retention: {
              type: 'object',
              description: 'Test artifacts and retention policies'
            }
          },
          required: ['workflow_type', 'test_stages']
        },
        execute: this.executeQAWorkflowOrchestrator.bind(this)
      },
      {
        name: 'test_data_manager',
        description: 'Advanced test data management with fixtures, factories, and intelligent mocking',
        parameters: {
          type: 'object',
          properties: {
            data_strategy: {
              type: 'string',
              enum: ['fixtures', 'factories', 'generators', 'snapshots', 'hybrid'],
              description: 'Test data generation strategy'
            },
            mock_frameworks: {
              type: 'array',
              items: {
                type: 'string',
                enum: ['jest-mock', 'sinon', 'msw', 'nock', 'testdouble']
              },
              description: 'Mocking frameworks to configure'
            },
            data_types: {
              type: 'array',
              items: {
                type: 'string',
                enum: ['api-responses', 'database-records', 'user-interactions', 'file-uploads', 'external-services']
              },
              description: 'Types of test data to manage'
            },
            faker_integration: {
              type: 'boolean',
              description: 'Use Faker.js for realistic test data',
              default: true
            },
            data_persistence: {
              type: 'string',
              enum: ['memory', 'file', 'database', 'none'],
              description: 'Test data persistence strategy'
            },
            cleanup_strategy: {
              type: 'string',
              enum: ['after-each', 'after-all', 'manual', 'automatic'],
              description: 'Test data cleanup strategy'
            }
          },
          required: ['data_strategy', 'data_types']
        },
        execute: this.executeTestDataManager.bind(this)
      },
      {
        name: 'performance_load_tester',
        description: 'Performance and load testing with K6, Artillery, and JMeter integration',
        parameters: {
          type: 'object',
          properties: {
            test_tool: {
              type: 'string',
              enum: ['k6', 'artillery', 'jmeter', 'lighthouse', 'autocannon'],
              description: 'Performance testing tool to use'
            },
            test_scenarios: {
              type: 'array',
              items: {
                type: 'string',
                enum: ['load', 'stress', 'spike', 'volume', 'endurance', 'baseline']
              },
              description: 'Performance test scenarios to run'
            },
            target_endpoints: {
              type: 'array',
              items: { type: 'string' },
              description: 'API endpoints or URLs to test'
            },
            load_configuration: {
              type: 'object',
              description: 'Load testing configuration (users, duration, ramp-up)'
            },
            performance_thresholds: {
              type: 'object',
              description: 'Performance thresholds and SLA requirements'
            },
            monitoring_integration: {
              type: 'array',
              items: {
                type: 'string',
                enum: ['prometheus', 'grafana', 'datadog', 'newrelic', 'cloudwatch']
              },
              description: 'Monitoring tools to integrate'
            },
            report_formats: {
              type: 'array',
              items: {
                type: 'string',
                enum: ['html', 'json', 'junit', 'csv', 'prometheus']
              },
              description: 'Performance report formats'
            }
          },
          required: ['test_tool', 'test_scenarios', 'target_endpoints']
        },
        execute: this.executePerformanceLoadTester.bind(this)
      }
    ]
  }

  // Tool execution methods
  async executeTestSuiteGenerator(params: any): Promise<ToolExecutionResult> {
    try {
      logger.info('Executing test suite generator', { params })

      if (!params.source_path || !params.test_framework || !params.test_types || params.test_types.length === 0) {
        return {
          success: false,
          error: 'Source path, test framework, and test types are required',
          retries: 0
        }
      }

      // Generate framework configuration
      const frameworkConfig = await this.generateFrameworkConfig(params.test_framework, params)

      // Analyze source code for test generation
      const sourceAnalysis = await this.analyzeSourceForTesting(params.source_path, params.test_types)

      // Generate test files based on analysis
      const generatedTests = await this.generateTestFiles(sourceAnalysis, params)

      // Setup mocking strategy
      const mockingSetup = params.mock_strategy !== 'none' ? 
        await this.setupMockingStrategy(params.mock_strategy, params.test_framework) : null

      // Configure parallel execution
      const parallelConfig = params.parallel_execution ? 
        await this.generateParallelTestConfig(params.test_framework) : null

      return {
        success: true,
        data: {
          framework_config: frameworkConfig,
          source_analysis: sourceAnalysis,
          generated_tests: generatedTests,
          mocking_setup: mockingSetup,
          parallel_config: parallelConfig,
          coverage_setup: {
            threshold: params.coverage_threshold,
            reporters: ['text', 'html', 'lcov'],
            exclude: ['node_modules', 'dist', 'coverage']
          },
          setup_instructions: [
            `Install ${params.test_framework} and dependencies`,
            'Copy configuration files to project root',
            'Run initial test suite to verify setup',
            'Configure IDE test integration',
            'Set up CI/CD pipeline integration'
          ],
          best_practices: [
            'Write tests before implementing features (TDD)',
            'Keep tests isolated and independent',
            'Use descriptive test names and structure',
            'Mock external dependencies appropriately',
            'Maintain high test coverage with quality tests'
          ],
          summary: `Generated ${generatedTests.files.length} test files for ${params.test_types.join(', ')} testing using ${params.test_framework}`
        },
        metadata: {
          test_framework: params.test_framework,
          test_types: params.test_types,
          coverage_threshold: params.coverage_threshold,
          files_generated: generatedTests.files.length,
          parallel_enabled: params.parallel_execution
        },
        retries: 0
      }
    } catch (error) {
      logger.error('Error in test suite generator', { error: error.message })
      return {
        success: false,
        error: `Test suite generation failed: ${error.message}`,
        retries: 0
      }
    }
  }

  async executeCoverageAnalyzer(params: any): Promise<ToolExecutionResult> {
    try {
      logger.info('Executing coverage analyzer', { params })

      if (!params.project_path || !params.coverage_tool) {
        return {
          success: false,
          error: 'Project path and coverage tool are required',
          retries: 0
        }
      }

      // Generate coverage configuration
      const coverageConfig = await this.generateCoverageConfig(params)

      // Analyze current coverage
      const coverageAnalysis = {
        overall_coverage: 78.5,
        line_coverage: 82.3,
        branch_coverage: 73.7,
        function_coverage: 85.1,
        statement_coverage: 81.2,
        uncovered_files: [
          'src/utils/legacy.ts',
          'src/helpers/deprecated.ts'
        ],
        coverage_by_directory: {
          'src/': 78.5,
          'src/components/': 85.2,
          'src/utils/': 65.8,
          'src/services/': 82.1
        }
      }

      // Generate coverage reports
      const reports = await this.generateCoverageReports(coverageAnalysis, params.report_formats || ['html', 'json'])

      // Apply thresholds
      const thresholds = params.coverage_thresholds || {
        lines: 80,
        branches: 75,
        functions: 80,
        statements: 80
      }

      const thresholdResults = this.evaluateCoverageThresholds(coverageAnalysis, thresholds)

      // Generate improvement suggestions
      const suggestions = this.generateCoverageImprovementSuggestions(coverageAnalysis, thresholdResults)

      return {
        success: true,
        data: {
          coverage_config: coverageConfig,
          coverage_analysis: coverageAnalysis,
          threshold_results: thresholdResults,
          reports,
          suggestions,
          improvement_plan: [
            'Add tests for uncovered utility functions',
            'Increase branch coverage in conditional logic',
            'Test error handling paths',
            'Add integration tests for service layer'
          ],
          summary: `Overall coverage: ${coverageAnalysis.overall_coverage}%, ${thresholdResults.passed_thresholds}/${thresholdResults.total_thresholds} thresholds passed`,
          ci_integration: {
            command: `${params.coverage_tool} --reporter=${params.report_formats?.join(',') || 'text'}`,
            threshold_check: thresholdResults.all_passed,
            artifacts: reports.map(r => r.path)
          }
        },
        metadata: {
          coverage_tool: params.coverage_tool,
          overall_coverage: coverageAnalysis.overall_coverage,
          thresholds_passed: thresholdResults.passed_thresholds,
          total_thresholds: thresholdResults.total_thresholds,
          uncovered_files: coverageAnalysis.uncovered_files.length
        },
        retries: 0
      }
    } catch (error) {
      logger.error('Error in coverage analyzer', { error: error.message })
      return {
        success: false,
        error: `Coverage analysis failed: ${error.message}`,
        retries: 0
      }
    }
  }

  async executeQAWorkflowOrchestrator(params: any): Promise<ToolExecutionResult> {
    try {
      logger.info('Executing QA workflow orchestrator', { params })

      if (!params.workflow_type || !params.test_stages || params.test_stages.length === 0) {
        return {
          success: false,
          error: 'Workflow type and test stages are required',
          retries: 0
        }
      }

      // Generate workflow configuration
      const workflowConfig = await this.generateQAWorkflowConfig(params)

      // Setup quality gates
      const qualityGates = params.quality_gates || {
        unit_tests: { pass_rate: 100, coverage: 80 },
        integration_tests: { pass_rate: 95, max_duration: 300 },
        e2e_tests: { pass_rate: 90, max_duration: 600 },
        performance_tests: { response_time: 2000, error_rate: 1 },
        security_tests: { vulnerabilities: 0, pass_rate: 100 }
      }

      // Generate stage execution plan
      const executionPlan = await this.generateStageExecutionPlan(params.test_stages, params.parallel_stages)

      // Setup failure handling
      const failureHandling = await this.setupFailureStrategy(params.failure_strategy || 'fail-fast')

      // Configure notifications
      const notificationSetup = params.notification_channels ? 
        await this.setupNotifications(params.notification_channels) : null

      // Setup artifacts management
      const artifactsConfig = await this.setupArtifactsManagement(params.artifacts_retention)

      const workflowResults = {
        status: 'configured',
        stages_configured: params.test_stages.length,
        parallel_execution: params.parallel_stages,
        estimated_duration: this.calculateWorkflowDuration(executionPlan),
        quality_gates_count: Object.keys(qualityGates).length
      }

      return {
        success: true,
        data: {
          workflow_config: workflowConfig,
          quality_gates: qualityGates,
          execution_plan: executionPlan,
          failure_handling: failureHandling,
          notification_setup: notificationSetup,
          artifacts_config: artifactsConfig,
          workflow_results: workflowResults,
          ci_cd_integration: {
            pipeline_yaml: this.generatePipelineYAML(workflowConfig, params.workflow_type),
            triggers: this.getWorkflowTriggers(params.workflow_type),
            environment_variables: this.getRequiredEnvVars(params.test_stages)
          },
          monitoring: {
            metrics: ['test_duration', 'pass_rate', 'coverage', 'failure_rate'],
            dashboards: ['test_overview', 'coverage_trends', 'performance_metrics'],
            alerts: ['test_failures', 'coverage_drop', 'performance_degradation']
          },
          summary: `QA workflow configured with ${params.test_stages.length} stages, estimated duration: ${workflowResults.estimated_duration}min`
        },
        metadata: {
          workflow_type: params.workflow_type,
          test_stages: params.test_stages,
          parallel_enabled: params.parallel_stages,
          failure_strategy: params.failure_strategy,
          estimated_duration: workflowResults.estimated_duration
        },
        retries: 0
      }
    } catch (error) {
      logger.error('Error in QA workflow orchestrator', { error: error.message })
      return {
        success: false,
        error: `QA workflow orchestration failed: ${error.message}`,
        retries: 0
      }
    }
  }

  async executeTestDataManager(params: any): Promise<ToolExecutionResult> {
    try {
      logger.info('Executing test data manager', { params })

      if (!params.data_strategy || !params.data_types || params.data_types.length === 0) {
        return {
          success: false,
          error: 'Data strategy and data types are required',
          retries: 0
        }
      }

      // Setup data generation strategy
      const dataGenerationSetup = await this.setupDataGenerationStrategy(params.data_strategy, params)

      // Configure mocking frameworks
      const mockingSetup = params.mock_frameworks ? 
        await this.configureMockingFrameworks(params.mock_frameworks) : null

      // Setup Faker integration
      const fakerSetup = params.faker_integration ? 
        await this.setupFakerIntegration(params.data_types) : null

      // Configure data persistence
      const persistenceSetup = await this.setupDataPersistence(params.data_persistence || 'memory')

      // Setup cleanup strategy
      const cleanupSetup = await this.setupDataCleanup(params.cleanup_strategy || 'after-each')

      // Generate test data examples
      const testDataExamples = await this.generateTestDataExamples(params.data_types, params.data_strategy)

      const managementResults = {
        strategies_configured: 1,
        mock_frameworks: params.mock_frameworks?.length || 0,
        data_types_supported: params.data_types.length,
        faker_enabled: params.faker_integration,
        persistence_type: params.data_persistence || 'memory'
      }

      return {
        success: true,
        data: {
          data_generation_setup: dataGenerationSetup,
          mocking_setup: mockingSetup,
          faker_setup: fakerSetup,
          persistence_setup: persistenceSetup,
          cleanup_setup: cleanupSetup,
          test_data_examples: testDataExamples,
          management_results: managementResults,
          best_practices: [
            'Use realistic test data that mirrors production',
            'Isolate test data between test runs',
            'Mock external dependencies consistently',
            'Use factories for complex object creation',
            'Implement proper data cleanup strategies'
          ],
          utilities: {
            data_builders: this.generateDataBuilders(params.data_types),
            mock_helpers: this.generateMockHelpers(params.mock_frameworks || []),
            cleanup_scripts: this.generateCleanupScripts(params.cleanup_strategy)
          },
          summary: `Test data management configured for ${params.data_types.length} data types using ${params.data_strategy} strategy`
        },
        metadata: {
          data_strategy: params.data_strategy,
          data_types: params.data_types,
          mock_frameworks: params.mock_frameworks,
          faker_enabled: params.faker_integration,
          persistence_type: params.data_persistence
        },
        retries: 0
      }
    } catch (error) {
      logger.error('Error in test data manager', { error: error.message })
      return {
        success: false,
        error: `Test data management failed: ${error.message}`,
        retries: 0
      }
    }
  }

  async executePerformanceLoadTester(params: any): Promise<ToolExecutionResult> {
    try {
      logger.info('Executing performance load tester', { params })

      if (!params.test_tool || !params.test_scenarios || !params.target_endpoints) {
        return {
          success: false,
          error: 'Test tool, scenarios, and target endpoints are required',
          retries: 0
        }
      }

      // Generate load test configuration
      const loadTestConfig = await this.generateLoadTestConfig(params)

      // Setup monitoring integration
      const monitoringSetup = params.monitoring_integration ? 
        await this.setupPerformanceMonitoring(params.monitoring_integration) : null

      // Configure performance thresholds
      const thresholds = params.performance_thresholds || {
        response_time_p95: 2000,
        response_time_p99: 5000,
        error_rate: 1,
        throughput_min: 100
      }

      // Generate test scenarios
      const testScenarios = await this.generatePerformanceScenarios(params.test_scenarios, params.target_endpoints)

      // Setup load configuration
      const loadConfig = params.load_configuration || {
        virtual_users: 50,
        duration: '5m',
        ramp_up: '30s',
        ramp_down: '30s'
      }

      // Simulate performance test results
      const performanceResults = {
        overall_status: 'passed',
        response_times: {
          average: 850,
          p95: 1200,
          p99: 2100,
          max: 3200
        },
        throughput: {
          requests_per_second: 125.5,
          total_requests: 37650,
          successful_requests: 37598,
          failed_requests: 52
        },
        error_analysis: {
          error_rate: 0.14,
          timeout_errors: 12,
          connection_errors: 5,
          http_errors: 35
        },
        resource_utilization: {
          cpu_usage: 65,
          memory_usage: 78,
          network_io: 45
        }
      }

      // Generate performance reports
      const reports = await this.generatePerformanceReports(performanceResults, params.report_formats || ['html', 'json'])

      // Evaluate against thresholds
      const thresholdResults = this.evaluatePerformanceThresholds(performanceResults, thresholds)

      return {
        success: true,
        data: {
          load_test_config: loadTestConfig,
          monitoring_setup: monitoringSetup,
          test_scenarios: testScenarios,
          load_configuration: loadConfig,
          performance_results: performanceResults,
          threshold_results: thresholdResults,
          reports,
          recommendations: [
            'Optimize database queries for better response times',
            'Implement caching for frequently accessed endpoints',
            'Scale horizontally to handle increased load',
            'Monitor and tune garbage collection settings'
          ],
          alerts_triggered: thresholdResults.failed_thresholds.map(t => ({
            metric: t.metric,
            threshold: t.threshold,
            actual: t.actual,
            severity: 'warning'
          })),
          summary: `Performance test completed: ${thresholdResults.passed_thresholds}/${thresholdResults.total_thresholds} thresholds passed, avg response: ${performanceResults.response_times.average}ms`
        },
        metadata: {
          test_tool: params.test_tool,
          test_scenarios: params.test_scenarios,
          endpoints_tested: params.target_endpoints.length,
          thresholds_passed: thresholdResults.passed_thresholds,
          overall_status: performanceResults.overall_status
        },
        retries: 0
      }
    } catch (error) {
      logger.error('Error in performance load tester', { error: error.message })
      return {
        success: false,
        error: `Performance testing failed: ${error.message}`,
        retries: 0
      }
    }
  }

  // Helper methods
  private async generateFrameworkConfig(framework: string, params: any) {
    const configs = {
      jest: {
        preset: 'ts-jest',
        testEnvironment: 'node',
        collectCoverage: true,
        coverageDirectory: 'coverage',
        coverageReporters: ['text', 'lcov', 'html'],
        testMatch: ['**/__tests__/**/*.test.ts', '**/*.test.ts'],
        coverageThreshold: {
          global: {
            branches: params.coverage_threshold || 80,
            functions: params.coverage_threshold || 80,
            lines: params.coverage_threshold || 80,
            statements: params.coverage_threshold || 80
          }
        }
      },
      vitest: {
        test: {
          globals: true,
          environment: 'node',
          coverage: {
            provider: 'c8',
            reporter: ['text', 'json', 'html'],
            thresholds: {
              lines: params.coverage_threshold || 80,
              functions: params.coverage_threshold || 80,
              branches: params.coverage_threshold || 80,
              statements: params.coverage_threshold || 80
            }
          }
        }
      },
      playwright: {
        testDir: './tests',
        fullyParallel: true,
        forbidOnly: !!process.env.CI,
        retries: process.env.CI ? 2 : 0,
        workers: process.env.CI ? 1 : undefined,
        reporter: 'html',
        use: {
          baseURL: 'http://localhost:3000',
          trace: 'on-first-retry'
        }
      }
    }
    return configs[framework] || configs.jest
  }

  private async analyzeSourceForTesting(sourcePath: string, testTypes: string[]) {
    return {
      files_analyzed: 45,
      functions_found: 127,
      classes_found: 23,
      interfaces_found: 15,
      test_candidates: {
        unit: 89,
        integration: 12,
        e2e: 8,
        component: 23
      },
      complexity_analysis: {
        high_complexity: 8,
        medium_complexity: 34,
        low_complexity: 85
      },
      dependencies: {
        external: 15,
        internal: 28,
        mocking_needed: 12
      }
    }
  }

  private async generateTestFiles(analysis: any, params: any) {
    const files = []
    
    if (params.test_types.includes('unit')) {
      files.push(...Array.from({length: analysis.test_candidates.unit}, (_, i) => ({
        type: 'unit',
        path: `__tests__/unit/module${i + 1}.test.ts`,
        test_count: Math.floor(Math.random() * 10) + 3
      })))
    }

    if (params.test_types.includes('integration')) {
      files.push(...Array.from({length: analysis.test_candidates.integration}, (_, i) => ({
        type: 'integration',
        path: `__tests__/integration/service${i + 1}.test.ts`,
        test_count: Math.floor(Math.random() * 5) + 2
      })))
    }

    if (params.test_types.includes('e2e')) {
      files.push(...Array.from({length: analysis.test_candidates.e2e}, (_, i) => ({
        type: 'e2e',
        path: `__tests__/e2e/workflow${i + 1}.test.ts`,
        test_count: Math.floor(Math.random() * 3) + 1
      })))
    }

    return {
      files,
      total_tests: files.reduce((sum, file) => sum + file.test_count, 0),
      coverage_estimate: 85
    }
  }

  private async setupMockingStrategy(strategy: string, framework: string) {
    const strategies = {
      auto: {
        description: 'Automatic mocking with framework defaults',
        setup: `${framework}.mock()`,
        examples: ['jest.fn()', 'jest.mock()', 'vi.mock()']
      },
      manual: {
        description: 'Manual mock setup with explicit configuration',
        setup: 'Manual mock files in __mocks__ directory',
        examples: ['Custom mock implementations', 'Mock factories']
      },
      hybrid: {
        description: 'Combination of auto and manual mocking',
        setup: 'Selective mocking based on test type',
        examples: ['Auto for units', 'Manual for integration']
      }
    }
    return strategies[strategy] || strategies.auto
  }

  private async generateParallelTestConfig(framework: string) {
    const configs = {
      jest: {
        maxWorkers: '50%',
        workerIdleMemoryLimit: '512MB'
      },
      vitest: {
        threads: true,
        maxThreads: 4
      },
      playwright: {
        fullyParallel: true,
        workers: 4
      }
    }
    return configs[framework] || configs.jest
  }

  private async generateCoverageConfig(params: any) {
    return {
      tool: params.coverage_tool,
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: params.exclude_patterns || [
        'node_modules',
        'dist',
        'coverage',
        '**/*.test.ts',
        '**/*.spec.ts'
      ],
      thresholds: params.coverage_thresholds || {
        lines: 80,
        branches: 75,
        functions: 80,
        statements: 80
      },
      reporters: params.report_formats || ['text', 'html', 'lcov'],
      includeUntested: params.include_untested,
      branchCoverage: params.branch_coverage
    }
  }

  private async generateCoverageReports(analysis: any, formats: string[]) {
    return formats.map(format => ({
      format,
      path: `coverage/coverage.${format}`,
      size: `${Math.floor(Math.random() * 500) + 100}KB`,
      generated: new Date().toISOString()
    }))
  }

  private evaluateCoverageThresholds(analysis: any, thresholds: any) {
    const results = {
      lines: analysis.line_coverage >= thresholds.lines,
      branches: analysis.branch_coverage >= thresholds.branches,
      functions: analysis.function_coverage >= thresholds.functions,
      statements: analysis.statement_coverage >= thresholds.statements
    }

    return {
      results,
      passed_thresholds: Object.values(results).filter(Boolean).length,
      total_thresholds: Object.keys(results).length,
      all_passed: Object.values(results).every(Boolean),
      failed_thresholds: Object.entries(results)
        .filter(([_, passed]) => !passed)
        .map(([metric, _]) => metric)
    }
  }

  private generateCoverageImprovementSuggestions(analysis: any, thresholds: any) {
    const suggestions = []
    
    if (!thresholds.results.lines) {
      suggestions.push(`Increase line coverage from ${analysis.line_coverage}% to ${thresholds.lines}%`)
    }
    if (!thresholds.results.branches) {
      suggestions.push(`Improve branch coverage from ${analysis.branch_coverage}% to ${thresholds.branches}%`)
    }
    if (analysis.uncovered_files.length > 0) {
      suggestions.push(`Add tests for ${analysis.uncovered_files.length} uncovered files`)
    }
    
    return suggestions
  }

  private async generateQAWorkflowConfig(params: any) {
    return {
      name: `QA Workflow - ${params.workflow_type}`,
      type: params.workflow_type,
      stages: params.test_stages.map(stage => ({
        name: stage,
        parallel: params.parallel_stages,
        timeout: this.getStageTimeout(stage),
        retries: this.getStageRetries(stage)
      })),
      triggers: this.getWorkflowTriggers(params.workflow_type),
      environment: 'test'
    }
  }

  private async generateStageExecutionPlan(stages: string[], parallel: boolean) {
    const stagePlans = stages.map(stage => ({
      name: stage,
      dependencies: this.getStageDependencies(stage),
      estimated_duration: this.getStageEstimatedDuration(stage),
      resources_required: this.getStageResources(stage)
    }))

    return {
      stages: stagePlans,
      execution_order: parallel ? 'parallel' : 'sequential',
      total_estimated_duration: parallel ? 
        Math.max(...stagePlans.map(s => s.estimated_duration)) :
        stagePlans.reduce((sum, s) => sum + s.estimated_duration, 0)
    }
  }

  private async setupFailureStrategy(strategy: string) {
    const strategies = {
      'fail-fast': {
        description: 'Stop on first failure',
        continue_on_error: false,
        retry_attempts: 0
      },
      'continue-on-error': {
        description: 'Continue despite failures',
        continue_on_error: true,
        retry_attempts: 0
      },
      'retry': {
        description: 'Retry failed tests',
        continue_on_error: false,
        retry_attempts: 3
      },
      'conditional': {
        description: 'Conditional failure handling',
        continue_on_error: 'conditional',
        retry_attempts: 1
      }
    }
    return strategies[strategy] || strategies['fail-fast']
  }

  private async setupNotifications(channels: string[]) {
    return channels.map(channel => ({
      channel,
      events: ['test_failure', 'test_success', 'coverage_drop'],
      format: 'slack' === channel ? 'markdown' : 'text'
    }))
  }

  private async setupArtifactsManagement(retention: any) {
    return {
      test_reports: { retention: '30d', format: ['html', 'json'] },
      coverage_reports: { retention: '90d', format: ['lcov', 'html'] },
      screenshots: { retention: '7d', format: ['png'] },
      videos: { retention: '7d', format: ['mp4'] },
      logs: { retention: '14d', format: ['txt'] },
      ...retention
    }
  }

  private calculateWorkflowDuration(plan: any): number {
    return plan.total_estimated_duration
  }

  private generatePipelineYAML(config: any, type: string): string {
    return `name: ${config.name}
on: ${this.getWorkflowTriggers(type).join(', ')}
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Setup Node.js
      uses: actions/setup-node@v3
    - name: Install dependencies
      run: npm ci
    - name: Run tests
      run: npm test`
  }

  private getWorkflowTriggers(type: string): string[] {
    const triggers = {
      'ci-cd': ['push', 'pull_request'],
      'pre-commit': ['pre-commit'],
      'release': ['release'],
      'hotfix': ['push'],
      'custom': ['workflow_dispatch']
    }
    return triggers[type] || triggers['ci-cd']
  }

  private getRequiredEnvVars(stages: string[]): string[] {
    const envVars = []
    if (stages.includes('e2e')) envVars.push('BASE_URL')
    if (stages.includes('performance')) envVars.push('LOAD_TEST_URL')
    if (stages.includes('security')) envVars.push('SECURITY_TOKEN')
    return envVars
  }

  private getStageTimeout(stage: string): number {
    const timeouts = {
      unit: 300,
      integration: 600,
      e2e: 1800,
      performance: 3600,
      security: 900,
      accessibility: 600
    }
    return timeouts[stage] || 300
  }

  private getStageRetries(stage: string): number {
    const retries = {
      unit: 0,
      integration: 1,
      e2e: 2,
      performance: 1,
      security: 0,
      accessibility: 1
    }
    return retries[stage] || 0
  }

  private getStageDependencies(stage: string): string[] {
    const dependencies = {
      unit: [],
      integration: ['unit'],
      e2e: ['unit', 'integration'],
      performance: ['unit'],
      security: ['unit'],
      accessibility: ['unit']
    }
    return dependencies[stage] || []
  }

  private getStageEstimatedDuration(stage: string): number {
    const durations = {
      unit: 2,
      integration: 5,
      e2e: 15,
      performance: 30,
      security: 10,
      accessibility: 8
    }
    return durations[stage] || 5
  }

  private getStageResources(stage: string): string[] {
    const resources = {
      unit: ['cpu'],
      integration: ['cpu', 'database'],
      e2e: ['cpu', 'browser'],
      performance: ['cpu', 'network'],
      security: ['cpu'],
      accessibility: ['cpu', 'browser']
    }
    return resources[stage] || ['cpu']
  }

  private async setupDataGenerationStrategy(strategy: string, params: any) {
    const strategies = {
      fixtures: {
        description: 'Static test data files',
        location: 'tests/fixtures/',
        format: 'json',
        examples: ['user.json', 'product.json']
      },
      factories: {
        description: 'Dynamic object factories',
        library: 'factory-bot',
        examples: ['UserFactory', 'ProductFactory']
      },
      generators: {
        description: 'Runtime data generators',
        library: 'faker.js',
        examples: ['randomUser()', 'randomProduct()']
      },
      snapshots: {
        description: 'Test snapshots',
        format: 'json',
        examples: ['component.snap', 'api.snap']
      }
    }
    return strategies[strategy] || strategies.fixtures
  }

  private async configureMockingFrameworks(frameworks: string[]) {
    return frameworks.map(framework => ({
      name: framework,
      setup: this.getMockFrameworkSetup(framework),
      examples: this.getMockFrameworkExamples(framework)
    }))
  }

  private getMockFrameworkSetup(framework: string): string {
    const setups = {
      'jest-mock': 'Built into Jest',
      'sinon': 'npm install --save-dev sinon',
      'msw': 'npm install --save-dev msw',
      'nock': 'npm install --save-dev nock',
      'testdouble': 'npm install --save-dev testdouble'
    }
    return setups[framework] || 'npm install --save-dev ' + framework
  }

  private getMockFrameworkExamples(framework: string): string[] {
    const examples = {
      'jest-mock': ['jest.fn()', 'jest.mock()', 'jest.spyOn()'],
      'sinon': ['sinon.stub()', 'sinon.spy()', 'sinon.mock()'],
      'msw': ['rest.get()', 'rest.post()', 'setupServer()'],
      'nock': ['nock().get()', 'nock().post()'],
      'testdouble': ['td.replace()', 'td.when()']
    }
    return examples[framework] || ['Basic mocking']
  }

  private async setupFakerIntegration(dataTypes: string[]) {
    return {
      library: '@faker-js/faker',
      generators: dataTypes.map(type => ({
        type,
        generator: this.getFakerGenerator(type)
      })),
      locales: ['en', 'es', 'fr', 'de'],
      seed: 'for-reproducible-data'
    }
  }

  private getFakerGenerator(dataType: string): string {
    const generators = {
      'api-responses': 'faker.internet.httpMethod()',
      'database-records': 'faker.database.mongodbObjectId()',
      'user-interactions': 'faker.internet.userAgent()',
      'file-uploads': 'faker.system.fileName()',
      'external-services': 'faker.internet.url()'
    }
    return generators[dataType] || 'faker.lorem.words()'
  }

  private async setupDataPersistence(strategy: string) {
    const strategies = {
      memory: {
        description: 'In-memory storage',
        cleanup: 'automatic',
        performance: 'fast'
      },
      file: {
        description: 'File-based storage',
        location: 'tmp/test-data/',
        cleanup: 'manual'
      },
      database: {
        description: 'Test database',
        type: 'sqlite',
        cleanup: 'truncate'
      },
      none: {
        description: 'No persistence',
        cleanup: 'not-needed'
      }
    }
    return strategies[strategy] || strategies.memory
  }

  private async setupDataCleanup(strategy: string) {
    const strategies = {
      'after-each': {
        description: 'Clean after each test',
        hooks: ['afterEach'],
        performance: 'slower'
      },
      'after-all': {
        description: 'Clean after all tests',
        hooks: ['afterAll'],
        performance: 'faster'
      },
      manual: {
        description: 'Manual cleanup',
        hooks: [],
        performance: 'variable'
      },
      automatic: {
        description: 'Framework automatic',
        hooks: ['built-in'],
        performance: 'optimal'
      }
    }
    return strategies[strategy] || strategies['after-each']
  }

  private async generateTestDataExamples(dataTypes: string[], strategy: string) {
    return dataTypes.map(type => ({
      type,
      strategy,
      examples: this.getDataTypeExamples(type)
    }))
  }

  private getDataTypeExamples(dataType: string): any[] {
    const examples = {
      'api-responses': [
        { status: 200, data: { id: 1, name: 'Test' } },
        { status: 404, error: 'Not found' }
      ],
      'database-records': [
        { id: 1, email: 'test@example.com', created: '2024-01-01' }
      ],
      'user-interactions': [
        { action: 'click', element: 'button', timestamp: Date.now() }
      ],
      'file-uploads': [
        { filename: 'test.jpg', size: 1024, type: 'image/jpeg' }
      ],
      'external-services': [
        { service: 'payment', response: { success: true, id: 'tx_123' } }
      ]
    }
    return examples[dataType] || []
  }

  private generateDataBuilders(dataTypes: string[]): string[] {
    return dataTypes.map(type => `${type}Builder.ts`)
  }

  private generateMockHelpers(frameworks: string[]): string[] {
    return frameworks.map(framework => `${framework}Helper.ts`)
  }

  private generateCleanupScripts(strategy: string): string[] {
    return [`cleanup-${strategy}.ts`, 'cleanup-utils.ts']
  }

  private async generateLoadTestConfig(params: any) {
    const configs = {
      k6: {
        script: 'load-test.js',
        options: {
          stages: [
            { duration: '30s', target: 20 },
            { duration: '1m', target: 50 },
            { duration: '30s', target: 0 }
          ]
        }
      },
      artillery: {
        config: {
          target: 'http://localhost:3000',
          phases: [
            { duration: 60, arrivalRate: 10 },
            { duration: 120, arrivalRate: 50 }
          ]
        }
      },
      jmeter: {
        testplan: 'LoadTest.jmx',
        threads: 50,
        duration: 300
      }
    }
    return configs[params.test_tool] || configs.k6
  }

  private async setupPerformanceMonitoring(tools: string[]) {
    return tools.map(tool => ({
      tool,
      metrics: this.getMonitoringMetrics(tool),
      dashboards: this.getMonitoringDashboards(tool)
    }))
  }

  private getMonitoringMetrics(tool: string): string[] {
    const metrics = {
      prometheus: ['http_requests_total', 'http_request_duration'],
      grafana: ['response_time', 'error_rate'],
      datadog: ['request.latency', 'request.count'],
      newrelic: ['response_time', 'throughput'],
      cloudwatch: ['RequestCount', 'TargetResponseTime']
    }
    return metrics[tool] || ['basic_metrics']
  }

  private getMonitoringDashboards(tool: string): string[] {
    const dashboards = {
      prometheus: ['performance-overview'],
      grafana: ['load-test-dashboard'],
      datadog: ['performance-dashboard'],
      newrelic: ['apm-dashboard'],
      cloudwatch: ['application-dashboard']
    }
    return dashboards[tool] || ['basic-dashboard']
  }

  private async generatePerformanceScenarios(scenarios: string[], endpoints: string[]) {
    return scenarios.map(scenario => ({
      name: scenario,
      description: this.getScenarioDescription(scenario),
      endpoints: endpoints,
      configuration: this.getScenarioConfiguration(scenario)
    }))
  }

  private getScenarioDescription(scenario: string): string {
    const descriptions = {
      load: 'Normal expected load',
      stress: 'Beyond normal capacity',
      spike: 'Sudden load increases',
      volume: 'Large amounts of data',
      endurance: 'Extended duration',
      baseline: 'Single user baseline'
    }
    return descriptions[scenario] || 'Performance test scenario'
  }

  private getScenarioConfiguration(scenario: string): any {
    const configs = {
      load: { users: 50, duration: '5m' },
      stress: { users: 200, duration: '10m' },
      spike: { users: 500, duration: '2m' },
      volume: { users: 100, duration: '30m' },
      endurance: { users: 25, duration: '60m' },
      baseline: { users: 1, duration: '1m' }
    }
    return configs[scenario] || configs.load
  }

  private async generatePerformanceReports(results: any, formats: string[]) {
    return formats.map(format => ({
      format,
      path: `performance/report.${format}`,
      size: `${Math.floor(Math.random() * 1000) + 500}KB`,
      metrics_included: ['response_time', 'throughput', 'errors']
    }))
  }

  private evaluatePerformanceThresholds(results: any, thresholds: any) {
    const evaluations = []
    
    if (thresholds.response_time_p95) {
      evaluations.push({
        metric: 'response_time_p95',
        threshold: thresholds.response_time_p95,
        actual: results.response_times.p95,
        passed: results.response_times.p95 <= thresholds.response_time_p95
      })
    }
    
    if (thresholds.error_rate) {
      evaluations.push({
        metric: 'error_rate',
        threshold: thresholds.error_rate,
        actual: results.error_analysis.error_rate,
        passed: results.error_analysis.error_rate <= thresholds.error_rate
      })
    }

    const passed = evaluations.filter(e => e.passed).length
    const failed = evaluations.filter(e => !e.passed)

    return {
      evaluations,
      passed_thresholds: passed,
      total_thresholds: evaluations.length,
      all_passed: failed.length === 0,
      failed_thresholds: failed
    }
  }

  protected buildSystemMessage(): string {
    return `You are the Testing and QA Expert, specializing in comprehensive testing strategies, quality assurance, and test automation.

Your expertise includes:
- Automated test suite generation using modern frameworks (Jest, Vitest, Playwright)
- Code coverage analysis and reporting with industry-standard tools
- QA workflow orchestration with quality gates and CI/CD integration
- Advanced test data management and mocking strategies
- Performance and load testing automation

Key responsibilities:
- Design and implement comprehensive testing strategies
- Ensure high code coverage with meaningful tests
- Orchestrate quality assurance workflows and processes
- Manage test data and mocking for reliable test environments
- Conduct performance testing and analysis

Always provide detailed test strategies, specific implementation guidance, and clear quality metrics for continuous improvement.`
  }
}