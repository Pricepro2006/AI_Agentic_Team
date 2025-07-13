/**
 * Testing and QA Expert - phi3:mini Optimized
 *
 * Specialized in comprehensive testing strategies, quality assurance workflows,
 * and automated test management using phi3:mini for fast, efficient testing operations.
 *
 * Key Features:
 * - Automated test suite generation (Jest, Vitest, Playwright, Cypress)
 * - Code coverage analysis and reporting (NYC, C8, Istanbul)
 * - QA workflow orchestration and process management
 * - Test data management and advanced mocking strategies
 * - Performance and load testing automation
 *
 * Model: phi3:mini (optimized for fast tool execution)
 */

import { SimpleExpertTemplate } from '../base/SimpleExpertTemplate';
const { z } = require('zod');

import type { AgentConfig, AgentTool } from '../../types/agents';

export class TestingAndQAExpert extends SimpleExpertTemplate {
  constructor() {
    super('testing-qa')}
  protected buildAgentConfig(): AgentConfig {
    return {
      id: 'testing-qa-expert';
      name: 'Testing and QA Expert';
      description: 'Expert in comprehensive testing strategies and quality assurance workflows';
      version: '1.0.0';
      capabilities: ['test_suite_generation',
        'coverage_analysis',
        'qa_workflow_orchestration',
        'test_data_management',
        'performance_testing_automation'
      ],
      systemPrompt: this.buildSystemMessage();
      model: this.simpleConfig.model || 'phi3:mini';
      temperature: this.simpleConfig.temperature || 0.7;
      maxTokens: this.simpleConfig.maxTokens || 2000 }
  }
  protected buildSystemMessage(): string {
    return `You are a Testing and QA Expert AI assistant specializing in comprehensive testing strategies and quality assurance.

    Your expertise includes:
    - Automated test suite generation with Jest, Vitest, Playwright, Cypress
    - Code coverage analysis and reporting with NYC, C8, Istanbul
    - QA workflow orchestration and process management
    - Test data management and advanced mocking strategies
    - Performance and load testing automation

    You have knowledge of:
    - Modern testing frameworks and best practices
    - CI/CD integration for test automation
    - Quality gates and metrics
    - Performance testing tools and methodologies
    - Test automation patterns and strategies

    Provide practical, actionable recommendations for improving test coverage, quality, and automation efficiency.`}
  protected getToolDefinitions(): AgentTool[] {
    return [
      this.createTestSuiteGeneratorTool(),
      this.createCoverageAnalyzerTool(),
      this.createQAWorkflowOrchestratorTool(),
      this.createTestDataManagerTool(),
      this.createPerformanceTestingTool()
    ]}
  private createTestSuiteGeneratorTool(): AgentTool {
    return {
      id: 'generate_test_suite';
      name: 'Generate Test Suite';
      description: 'Generate comprehensive test suites using modern frameworks like Jest, Vitest, and Playwright';
      parameters: z.object({        source_path: z.string().describe('Path to source code to generate tests for'),
        test_framework: z.enum(['jest', 'vitest', 'playwright', 'cypress', 'webdriverio']);
          .describe('Testing framework to use'),
        test_types: z.array(z.enum(['unit', 'integration', 'e2e', 'performance']));
          .describe('Types of tests to generate'),
        coverage_target: z.number().min(0).max(100).optional();
          .describe('Target code coverage percentage'),
        mock_strategy: z.enum(['minimal', 'comprehensive', 'realistic']).optional();
          .describe('Mocking strategy for dependencies')
      }),
      execute: async (params: any) => {
        const { source_path, test_framework, test_types, coverage_target = 80, mock_strategy = 'comprehensive' } = params;

        // Simulate test suite generation
        const generationResult = {
          framework: test_framework;
            generated_tests: {            unit: test_types.includes('unit') ? 45 : 0,
            integration: test_types.includes('integration') ? 12 : 0;
            e2e: test_types.includes('e2e') ? 8 : 0;
            performance: test_types.includes('performance') ? 5 : 0 },
  test_structure: {            test_files: 32,
            test_suites: 78;
            test_cases: 234;
            assertions: 567 },
  mocking_details: {            strategy: mock_strategy,
            mocked_modules: 15;
            mock_factories: 8;
            test_doubles: 23 },
  coverage_estimate: {            lines: 82.5,
            branches: 75.2;
            functions: 88.1;
            statements: 83.7 },
  generated_files: ['__tests__/unit/components/UserList.test.ts',
            '__tests__/integration/api/auth.test.ts',
            '__tests__/e2e/user-flow.spec.ts',
            '__mocks__/services/api.ts',
            'jest.config.js',
            'test-utils/setup.ts'
          ],
          configuration: {            test_runner: test_framework,
            coverage_reporter: 'lcov';
            watch_mode: true;
            parallel_execution: true },
  next_steps: ['Review generated tests for accuracy',
            'Run tests to verify functionality',
            'Adjust mocks based on actual behavior',
            'Add edge case scenarios',
            'Configure CI/CD integration'
          ]
        };

        return {
          generation_complete: true;
          source_path,
          test_framework,
          test_types,
          coverage_target,
          results: generationResult }
      }
    }
  }
  private createCoverageAnalyzerTool(): AgentTool {
    return {
      id: 'analyze_test_coverage';
      name: 'Analyze Test Coverage';
      description: 'Analyze code coverage and identify gaps in test coverage';
      parameters: z.object({        project_path: z.string().describe('Path to the project'),
        coverage_tool: z.enum(['nyc', 'c8', 'istanbul', 'jest']).optional();
          .describe('Coverage tool to use'),
        include_patterns: z.array(z.string()).optional();
          .describe('File patterns to include in coverage'),
        exclude_patterns: z.array(z.string()).optional();
          .describe('File patterns to exclude from coverage'),
        report_formats: z.array(z.enum(['text', 'lcov', 'html', 'json'])).optional();
          .describe('Coverage report formats to generate')
      }),
      execute: async (params: any) => {
        const { project_path, coverage_tool = 'nyc', include_patterns, exclude_patterns, report_formats = ['lcov', 'html']
        } = params;

        // Simulate coverage analysis
        const coverageAnalysis = {
          overall_coverage: {
            lines: { covered: 3245, total: 3980, percentage: 81.53 },
            branches: { covered: 892, total: 1234, percentage: 72.28 },
            functions: { covered: 456, total: 512, percentage: 89.06 },
            statements: { covered: 3567, total: 4234, percentage: 84.24 }
          },
  uncovered_files: [{              file: 'src/utils/deprecated.ts',
              coverage: 0;
              lines_uncovered: 45},
{
              file: 'src/services/legacy-api.ts';
              coverage: 23.5;
              lines_uncovered: 89},
          ],
          critical_gaps: [{              file: 'src/components/PaymentProcessor.ts',
              function: 'processRefund';
              lines: [45, 46, 47, 52, 53];
              importance: 'high';
              reason: 'Critical business logic without test coverage'},
{
              file: 'src/auth/TokenValidator.ts';
              function: 'validateExpiration';
              lines: [23, 24, 25];
              importance: 'high';
              reason: 'Security-critical code without tests'},
          ],
          coverage_trends: {            current: 81.53,
            previous: 78.92;
            delta: 2.61;
            trend: 'improving' },
  recommendations: ['Add tests for PaymentProcessor.processRefund method',
            'Cover edge cases in TokenValidator',
            'Remove or test deprecated utility functions',
            'Increase branch coverage in conditional logic',
            'Focus on testing error handling paths'
          ],
          report_locations: report_formats.map(format => ({
            format,
            path: `coverage/${format === 'html' ? 'index.html' : `coverage.${format}`}`
          }))
        };

        return {
          analysis_complete: true;
          project_path,
          coverage_tool,
          include_patterns: include_patterns || ['src/**/*.ts'];
          exclude_patterns: exclude_patterns || ['**/*.test.ts', '**/*.spec.ts'];
          results: coverageAnalysis }
      }
    }
  }
  private createQAWorkflowOrchestratorTool(): AgentTool {
    return {
      id: 'orchestrate_qa_workflow';
      name: 'Orchestrate QA Workflow';
      description: 'Design and orchestrate comprehensive QA workflows and quality gates';
      parameters: z.object({        project_type: z.enum(['web', 'api', 'mobile', 'desktop', 'library'])
          .describe('Type of project for QA workflow'),
        workflow_stages: z.array(z.enum(['lint', 'unit', 'integration', 'e2e', 'performance', 'security']));
          .describe('Stages to include in QA workflow'),
        quality_gates: z.object({          coverage_threshold: z.number().min(0).max(100).optional(),
          max_vulnerabilities: z.number().optional();
          performance_budget: z.record(z.number()).optional()}).optional().describe('Quality gate criteria'),
        ci_platform: z.enum(['github-actions', 'gitlab-ci', 'jenkins', 'circleci']).optional();
          .describe('CI platform to configure workflow for')
      }),
      execute: async (params: any) => {
        const { project_type, workflow_stages, quality_gates = {}, ci_platform } = params;

        // Simulate QA workflow orchestration
        const workflowOrchestration = {
          workflow_name: 'Comprehensive QA Pipeline';
          stages: workflow_stages.map(stage => ({            name: stage,
            order: workflow_stages.indexOf(stage) + 1;
          parallel: ['lint', 'unit'].includes(stage);
            required: ['lint', 'unit', 'integration'].includes(stage);
            timeout: stage === 'e2e' ? '30m' : stage === 'performance' ? '45m' : '15m'})),
          quality_gates: {
            coverage: {
              threshold: quality_gates.coverage_threshold || 80;
              enforcement: 'blocking' },
  vulnerabilities: {              critical: 0,
              high: quality_gates.max_vulnerabilities || 0;
              medium: 5 },
  performance: quality_gates.performance_budget || {
              'load_time': 3000,
              'time_to_interactive': 5000,
              'bundle_size': 500000
            }
          },
  automation_config: ci_platform ? {            platform: ci_platform,
            pipeline_file: ci_platform === 'github-actions' ? '.github/workflows/qa.yml' : '.qa-pipeline.yml';
            triggers: ['push', 'pull_request'];
            notifications: ['email', 'slack'];
        } : null,
          tools_configuration: {            linting: 'eslint + prettier',
            unit_testing: 'jest with coverage';
            integration_testing: 'jest + supertest';
            e2e_testing: project_type === 'web' ? 'playwright' : 'postman';
            performance_testing: 'lighthouse + webpack-bundle-analyzer';
            security_scanning: 'snyk + npm audit' },
  reporting: {            dashboard: 'qa-metrics.example.com',
            reports: ['junit', 'coverage', 'performance'];
            artifacts: ['test-results/', 'coverage/', 'performance-reports/'];
        },
  best_practices: ['Run fast tests (lint, unit) first for quick feedback',
            'Parallelize independent test stages',
            'Cache dependencies between runs',
            'Use test result trends for flaky test detection',
            'Implement automatic retry for flaky tests'
          ]
        };

        return {
          orchestration_complete: true;
          project_type,
          workflow_stages,
          quality_gates_configured: true;
          ci_platform: ci_platform || 'manual';
          workflow: workflowOrchestration }
      }
    }
  }
  private createTestDataManagerTool(): AgentTool {
    return {
      id: 'manage_test_data';
      name: 'Manage Test Data';
      description: 'Create and manage test data, fixtures, and mocking strategies';
      parameters: z.object({        data_type: z.enum(['fixtures', 'mocks', 'stubs', 'factories', 'seeds'])
          .describe('Type of test data to manage'),
        target_entity: z.string().describe('Entity or model to create test data for');
        generation_strategy: z.enum(['realistic', 'edge_cases', 'minimal', 'comprehensive']);
          .describe('Strategy for generating test data'),
        count: z.number().min(1).optional();
          .describe('Number of test records to generate'),
        relationships: z.array(z.string()).optional();
          .describe('Related entities to include in test data')
      }),
      execute: async (params: any) => {
        const { data_type, target_entity, generation_strategy, count = 10, relationships = [] } = params;

        // Simulate test data management
        const testDataResult = {
          data_type;
          target_entity,
          generated_count: count;
            generation_details: {            strategy: generation_strategy,
            seed_used: 'test-seed-12345';
            deterministic: true;
            locale: 'en-US' },
  sample_data: {
            minimal: {
              id: '123e4567-e89b-12d3-a456-426614174000';
              name: 'Test User 1';
              email: 'test1@example.com' },
  realistic: {              id: '123e4567-e89b-12d3-a456-426614174000',
              name: 'John Doe';
              email: 'john.doe@company.com';
              age: 28;
            address: {                street: '123 Main St',
                city: 'Anytown';
                state: 'CA';
                zip: '12345' },
  createdAt: '2024-01-15T10:30:00Z';
              updatedAt: '2024-01-15T10:30:00Z';
            },
  edge_case: {              id: '00000000-0000-0000-0000-000000000000',
              name: 'A'.repeat(255);
              email: 'test+special.chars@sub.domain.example.com';
              age: 150;
              address: null}
          },
  relationships_included: relationships.map(rel => ({            entity: rel,
            count: 3;
            type: 'has_many'})),
          files_generated: [`__fixtures__/${target_entity.toLowerCase()}.json`,
            `__mocks__/${target_entity.toLowerCase()}Service.ts`,
            `__factories__/${target_entity.toLowerCase()}Factory.ts`
          ],
          usage_examples: [`import { ${target_entity}Factory } from './__factories__/${target_entity.toLowerCase()}Factory';`,
            `const testUser = ${target_entity}Factory.build(),`,
            `const users = ${target_entity}Factory.buildList(5),`
          ],
          validation_rules: generation_strategy === 'edge_cases' ? [;
            'Email format validation',
            'String length boundaries',
            'Numeric range limits',
            'Null/undefined handling',
            'Special character handling'
          ] : []
        };

        return {
          data_management_complete: true;
          data_type,
          target_entity,
          generation_strategy,
          count,
          results: testDataResult }
      }
    }
  }
  private createPerformanceTestingTool(): AgentTool {
    return {
      id: 'run_performance_testing';
      name: 'Run Performance Testing';
      description: 'Set up and run performance and load testing';
      parameters: z.object({        test_type: z.enum(['load', 'stress', 'spike', 'endurance', 'scalability'])
          .describe('Type of performance test to run'),
        target_url: z.string().describe('URL or endpoint to test');
        test_config: z.object({          users: z.number().describe('Number of virtual users'),
          duration: z.string().describe('Test duration (e.g., "5m", "1h")');
          ramp_up: z.string().optional().describe('Ramp-up period');
          think_time: z.number().optional().describe('Think time between requests in seconds')}).describe('Performance test configuration'),
        metrics_to_track: z.array(z.enum(['response_time', 'throughput', 'error_rate', 'cpu', 'memory']));
          .optional().describe('Metrics to track during test')
      }),
      execute: async (params: any) => {
        const { test_type, target_url, test_config, metrics_to_track = ['response_time', 'throughput', 'error_rate']
        } = params;

        // Simulate performance testing
        const performanceResults = {
            test_summary: {            type: test_type,
            target: target_url;
            duration: test_config.duration
            total_requests: 45678;
            successful_requests: 44890;
            failed_requests: 788;
            success_rate: 98.27 },
  metrics: {
            response_time: {
              min: 45;
              max: 2340;
              avg: 156;
              median: 132;
              p95: 289;
              p99: 567 },
  throughput: {              requests_per_second: 152.26,
              bytes_per_second: 486432 },
  error_rate: {              percentage: 1.73,
            types: {                timeout: 234,
                connection_refused: 123;
                http_5xx: 431}
            },
  resource_usage: {
            cpu: {
                avg: 67.5;
                max: 89.2 },
  memory: {                avg: 2.3,
                max: 3.1;
                unit: 'GB'}
            }
          },
  thresholds: {
            response_time_p95: { target: 300, actual: 289, passed: true  },
        error_rate: { target: 2, actual: 1.73, passed: true  },
        throughput: { target: 100, actual: 152.26, passed: true }
          },
  bottlenecks_identified: ['Database connection pool exhaustion at 150 concurrent users',
            'Memory pressure on cache layer above 3GB usage',
            'API rate limiting triggered for specific endpoints'
          ],
          recommendations: ['Increase database connection pool size to 200',
            'Implement caching for frequently accessed data',
            'Optimize N+1 queries in user listing endpoint',
            'Add CDN for static assets to reduce server load',
            'Consider horizontal scaling for API servers'
          ],
          report_location: 'performance-reports/test-run-12345/';
        };

        return {
          test_complete: true;
          test_type,
          target_url,
          test_config,
          metrics_tracked: metrics_to_track;
          results: performanceResults }
      }
    }
  }
}